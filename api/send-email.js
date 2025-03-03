import axios from 'axios';
import { admin } from '../utils/axios.js';
import { LRUCache } from 'lru-cache';
import logger from '../utils/logger.js';

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

    try {
      const { data } = await admin.get('banned-ips');
      bannedIPs.push(...data.bannedIPs);
    } catch (error) {
      logger.error(`Failed to fetch banned IPs: ${error.message}`);
    }

    if (bannedIPs.includes(clientIP)) {
      logger.warn(`Blocked request from banned IP: ${clientIP}`);
      return response
        .status(403)
        .json({ error: 'You have been banned due to excessive requests.' });
    }

    const requestCount = (rateLimit.get(clientIP) || 0) + 1;
    rateLimit.set(clientIP, requestCount, { ttl: 60 * 1000 });

    if (requestCount >= MAX_REQUESTS) {
      if (requestCount >= BAN_THRESHOLD) {
        await admin.patch(`banned-ips?ip=${clientIP}`);
        logger.warn(`Banned IP: ${clientIP} (Exceeded ${BAN_THRESHOLD} requests)`);
        return response
          .status(403)
          .json({ error: 'You have been banned due to excessive requests.' });
      }
      logger.warn(`Too many requests from IP: ${clientIP} (Exceeded ${MAX_REQUESTS} requests)`);
      return response.status(429).json({ error: 'Too many requests. Try again later.' });
    }

    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      logger.warn(`Missing fields from ${clientIP}: ${JSON.stringify(request.body)}`);
      return response.status(400).json({ error: 'Missing required fields' });
    }

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: { name, email, message },
      accessToken: process.env.EMAILJS_PRIVATE_ID,
    };

    try {
      await axios.post(EMAILJS_API_URL, payload);
      logger.info(`Email sent from ${clientIP}: ${JSON.stringify(request.body)}`);
      return response.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      logger.error(`Email sending failed from ${clientIP}: ${error.message}`);
    }
  } catch (error) {
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
