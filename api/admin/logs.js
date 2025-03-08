import { admin } from '../../utils/axios.js';

const logs = [];

async function fetchLogs() {
  try {
    const { data } = await admin.get('/github');

    return JSON.parse(data.files['logs.json'].content) || [];
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    return [];
  }
}

export default async function handler(request, response) {
  const data = await fetchLogs();
  logs.push(...data);

  if (request.method === 'GET') {
    return response.status(200).json({ logs });
  }

  return response.status(405).json({ error: 'Method Not Allowed' });
}
