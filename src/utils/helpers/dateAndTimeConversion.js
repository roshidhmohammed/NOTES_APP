export function dateAndTimeConversion(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = (now - then) / 1000;

  if (diff < 60) return `${Math.floor(diff)} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} day ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} month ago`;
  return `${Math.floor(diff / 31536000)} year ago`;
}
