import axios from 'axios';
import logger from './logger.js';
import { isLocalIP } from './ipUtils.js';

export async function getGeoData(clientIP) {
  if (isLocalIP(clientIP)) {
    logger.info(`Skipping geo lookup for local IP: ${clientIP}`);
    return null;
  }

  try {
    const geoRes = await axios.get(`https://ipapi.co/${clientIP}/json/`);
    const geo = geoRes.data;

    if (geo.error || geo.reserved) {
      logger.warn(`Geo lookup failed for ${clientIP}: ${geo.reason || 'Reserved IP'}`);
      return null;
    }

    return {
      city: geo.city,
      region: geo.region,
      country: geo.country_name,
      ip: clientIP,
    };
  } catch (err) {
    logger.warn(`Geo lookup error for ${clientIP}: ${err.message}`);
    return null;
  }
}
