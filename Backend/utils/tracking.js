const TRACKING_FIELDS = [
  'sourceSection',
  'interactionType',
  'pagePath',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'locale',
];

function clean(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, 500);
}

function sanitizeTracking(input) {
  const tracking = input && typeof input === 'object' ? input : {};
  return TRACKING_FIELDS.reduce((acc, field) => {
    acc[field] = clean(tracking[field]);
    return acc;
  }, {});
}

module.exports = { sanitizeTracking };
