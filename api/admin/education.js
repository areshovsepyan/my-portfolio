import { admin } from '../utils/axios.js';
import logger from '../utils/logger.js';

const education = [];

async function fetchEducationData() {
  try {
    const { data } = await admin.get('/github');

    return JSON.parse(data.files['education.json'].content) || [];
  } catch (error) {
    console.error('Error fetching education data:', error.message);
    return [];
  }
}

async function updateEducationData() {}

export default async function handler({ method, body, query }, response) {
  try {
    const data = await fetchEducationData();
    education.push(...data);

    if (method === 'PATCH') {
      education.push(body);
      await updateEducationData();
      return response.status(200).json({ message: 'Education data patched successfully.' });
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to patch education data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
