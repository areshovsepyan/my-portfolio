import axios from 'axios';

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: { name, email, message },
    accessToken: process.env.EMAILJS_PRIVATE_ID,
  };

  const options = {
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await axios.post(EMAILJS_API_URL, payload, options);

    if (response.status === 200) {
      return res.status(200).json({ message: 'Email sent successfully!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
}
