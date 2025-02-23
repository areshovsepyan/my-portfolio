import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return res.status(200).json({ message: 'Your access has been granted.', decoded });
  } catch (error) {
    return res.status(403).json({ error: error?.message && 'Invalid or expired token.' });
  }
}
