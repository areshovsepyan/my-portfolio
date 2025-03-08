import { admin } from '../utils/axios.js';
import logger from '../utils/logger.js';

export default async function handler({ method }, response) {
  try {
    const { data } = await admin.get('/github');

    if (method === 'GET') {
      return response.status(200).json(JSON.parse(data.files['experience.json'].content) || []);
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to fetch experience data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
