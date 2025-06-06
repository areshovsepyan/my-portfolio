import axios from 'axios';
import { admin } from '../utils/axios.js';
import logger from '../utils/logger.js';
import { getGeoData } from '../utils/getGeoData.js';
import { LRUCache } from 'lru-cache';

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const bannedIPs = [];

const rateLimit = new LRUCache({ max: 100, ttl: 60 * 1000 });
const MAX_REQUESTS = 5;
const BAN_THRESHOLD = 10;

export default async function handler(request, response) {
  try {
    const clientIP =
      request.headers['x-forwarded-for']?.split(',')[0] ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      request.ip ||
      'Unknown IP';

    const geo = await getGeoData(clientIP);
    const geoString =
      [geo?.city, geo?.region, geo?.country].filter(Boolean).join(', ') || 'Unknown location.';
    const ipDisplay = geo?.ip || clientIP;

    try {
      const { data } = await admin.get('/data?category=banned-ips');
      bannedIPs.push(...data);
    } catch (error) {
      logger.error(`Failed to fetch banned IPs: ${error.message}`);
    }

    if (bannedIPs.includes(clientIP)) {
      logger.warn(`Blocked request from banned IP: ${ipDisplay} (${geoString})`);
      return response
        .status(403)
        .json({ error: 'You have been banned due to excessive requests.' });
    }

    const requestCount = (rateLimit.get(clientIP) || 0) + 1;
    rateLimit.set(clientIP, requestCount, { ttl: 60 * 1000 });

    if (requestCount >= MAX_REQUESTS) {
      if (requestCount >= BAN_THRESHOLD) {
        await admin.patch(`/data?category=banned-ips&ip=${clientIP}`);
        logger.warn(
          `Banned IP: ${ipDisplay} (${geoString}) - (Exceeded ${BAN_THRESHOLD} requests)`,
        );
        return response
          .status(403)
          .json({ error: 'You have been banned due to excessive requests.' });
      }

      logger.warn(
        `Rate limited IP: ${ipDisplay} (${geoString}) — Exceeded ${MAX_REQUESTS} requests`,
      );
      return response.status(429).json({ error: 'Too many requests. Try again later.' });
    }

    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    const template_params = {
      name,
      email,
      message,
      geo: geoString,
      ip: ipDisplay,
    };

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params,
      accessToken: process.env.EMAILJS_PRIVATE_ID,
    };

    try {
      await axios.post(EMAILJS_API_URL, payload);
      logger.info(`Email sent from ${ipDisplay} (${geoString})`);
      return response.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      logger.error(`Email sending failed from ${ipDisplay} (${geoString}): ${error.message}`);
      return response.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
  } catch (error) {
    logger.error(`Unhandled error in send-email | ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
