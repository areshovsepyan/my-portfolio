import { admin } from '../../utils/axios.js';

const bannedIPs = [];

async function fetchBannedIPs() {
  try {
    const { data } = await admin.get('/github');

    return JSON.parse(data.files['banned-ips.json'].content) || [];
  } catch (error) {
    console.error('Error fetching banned IPs:', error.message);
    return [];
  }
}

async function updateBannedIPs(bannedIPs) {
  try {
    await admin.patch('github', {
      files: {
        'banned-ips.json': {
          content: JSON.stringify(bannedIPs, null, 2),
        },
      },
    });
  } catch (error) {
    console.error('Error updating banned IPs:', error.message);
  }
}

export default async function handler({ method, query }, response) {
  const data = await fetchBannedIPs();
  bannedIPs.push(...data);

  if (method === 'GET') {
    return response.status(200).json({ bannedIPs });
  }

  if (method === 'PATCH') {
    bannedIPs.push(query.ip);
    await updateBannedIPs(bannedIPs);
    return response.status(200).json({ message: 'IPS patched successfully.' });
  }

  if (method === 'DELETE') {
    bannedIPs.includes(query.ip) && bannedIPs.splice(bannedIPs.indexOf(query.ip), 1);
    await updateBannedIPs(bannedIPs);
    return response.status(200).json({ message: `IP ${query.ip} unbanned.`, bannedIPs });
  }

  return response.status(405).json({ error: 'Method Not Allowed' });
}
