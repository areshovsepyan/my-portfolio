export function isLocalIP(ip) {
  if (!ip) return true;

  return (
    ip === 'Unknown IP' ||
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.')
  );
}
