import { fetchData, updateData } from '../../utils/dataService.js';
import logger from '../../utils/logger.js';

export default async function handler({ method, query }, response) {
  try {
    const data = await fetchData(query.category);
    let message = '';

    if (method === 'GET') {
      return response.status(200).json(data);
    }

    if (method === 'PATCH') {
      if (query.category === 'banned-ips') {
        data.push(query.ip);
        await updateData(query.category, data);
        return response.status(200).json({ message: 'IPs patched successfully.' });
      }
    }

    if (method === 'DELETE') {
      if (query.category === 'banned-ips' && data.includes(query.ip)) {
        data.splice(data.indexOf(query.ip), 1);
        message = `IP ${query.ip} unbanned.`;
      }
      if (query.category === 'logs' && data.some((log) => log.timestamp === query.timestamp)) {
        data.splice(
          data.findIndex((log) => log.timestamp === query.timestamp),
          1,
        );
        message = 'Log deleted successfully.';
      }

      //  education and experience DELETE handle by provided ID (query.id)

      await updateData(query.category, data);
      return response.status(200).json({ message, data });
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to fetch ${query.category} data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
