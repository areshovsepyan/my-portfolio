import { fetchData } from '../utils/dataService.js';
import logger from '../utils/logger.js';

export default async function handler({ method, query }, response) {
  try {
    const data = await fetchData('products');

    if (method !== 'GET') return response.status(405).json({ error: 'Method Not Allowed' });

    const product = data.find((item) => item.slug === query.slug);

    if (!product) return response.status(404).json({ error: 'Product Not Found' });

    return response.status(200).json(product);
  } catch (error) {
    logger.error(`Failed to fetch ${query.slug} data: ${error.message}`);
    return response
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
