import axios from 'axios';
import logger from '../utils/logger.js';

const GITHUB_GIST_TOKEN = process.env.GITHUB_GIST_TOKEN;
const GITHUB_EDUCATION_ID = process.env.GITHUB_EDUCATION_ID;

const github = axios.create({
  baseURL: 'https://api.github.com/gists/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${GITHUB_GIST_TOKEN}`,
  },
});

export default async function handler({ method }, response) {
  try {
    if (!GITHUB_GIST_TOKEN) return response.status(500).json({ error: 'GitHub token is missing' });
    if (!GITHUB_EDUCATION_ID) return response.status(500).json({ error: 'Gist ID is missing' });

    const { data } = await github({
      method,
      url: GITHUB_EDUCATION_ID || '',
    });

    if (method === 'GET') {
      return response.status(200).json(JSON.parse(data.files['education.json'].content) || []);
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to fetch education data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
