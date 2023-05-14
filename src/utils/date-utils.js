export function getFormattedDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function getRelativeTimeString(date, locale) {
  const timeMs = typeof date === 'number' ? date : date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style: 'long',
    localeMatcher: 'best fit'
  });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
