import axios from 'axios';

const GITHUB_GIST_TOKEN = process.env.GITHUB_GIST_TOKEN;

const github = axios.create({
  baseURL: 'https://api.github.com/gists/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${GITHUB_GIST_TOKEN}`,
  },
});

export default async function handler({ method, body, query }, response) {
  try {
    if (!GITHUB_GIST_TOKEN) return response.status(500).json({ error: 'GitHub token is missing' });

    const gistId = query.id;

    const { data } = await github({
      method,
      url: gistId || '',
      data: body,
    });

    if (method === 'GET') {
      return response.status(200).json(data);
    }

    if (method === 'PATCH') {
      return response.status(200).json({ message: 'Gist patched successfully.' });
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    response
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'GitHub API error' });
  }
}
