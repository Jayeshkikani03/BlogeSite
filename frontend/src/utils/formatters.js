/**
 * Formats uptime seconds into a readable string (e.g. 2h 14m 10s)
 * @param {number} seconds - Server uptime seconds
 * @returns {string}
 */
export const formatUptime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0s';

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
};

/**
 * Formats ISO date timestamp into a localized readable date time.
 * @param {string} isoString
 * @returns {string}
 */
export const formatDateTime = (isoString) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch (err) {
    return isoString;
  }
};
