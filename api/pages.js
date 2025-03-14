import { fetchData } from '../utils/dataService.js';
import logger from '../utils/logger.js';

export default async function handler({ method, query }, response) {
  try {
    const data = await fetchData(query.name);

    if (method === 'GET') {
      return response.status(200).json(data);
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to fetch ${query.name} data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
