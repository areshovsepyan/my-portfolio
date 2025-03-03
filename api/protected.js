import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export default function handler(request, response) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return response.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return response.status(200).json({ message: 'Your access has been granted.', decoded });
  } catch (error) {
    return response.status(403).json({ error: error?.message && 'Invalid or expired token.' });
  }
}
