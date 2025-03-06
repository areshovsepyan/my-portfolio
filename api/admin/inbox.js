import axios from 'axios';
import logger from '../../utils/logger.js';

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.1/history';

export default async function handler({ method, query }, response) {
  try {
    const params = {
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_ID,
      page: query.page,
      count: query.qty,
    };

    const { data } = await axios.get(EMAILJS_API_URL, { params });

    const structuredData = {
      is_last_page: data.is_last_page,
      rows: data.rows.map((row) => {
        return {
          id: row.id,
          created_at: row.created_at,
          template: JSON.parse(row.template_params),
        };
      }),
    };

    if (method === 'GET') {
      return response.status(200).json(structuredData);
    }

    return response.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    logger.error(`Failed to fetch inbox: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
