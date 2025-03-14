import { admin } from './axios.js';
import logger from './logger.js';

export const fetchData = async (file) => {
  try {
    const { data } = await admin.get('/github');

    return JSON.parse(data.files[`${file}.json`].content) || [];
  } catch (error) {
    logger.error(`Failed to fetch ${file} data: ${error.message}`);
    return [];
  }
};

export const updateData = async (file, data) => {
  try {
    await admin.patch('/github', {
      files: { [`${file}.json`]: { content: JSON.stringify(data, null, 2) } },
    });
  } catch (error) {
    logger.error(`Failed to update ${file} data: ${error.message}`);
  }
};

export default { fetchData, updateData };
