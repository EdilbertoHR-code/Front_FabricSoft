const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  sourceSection:   { type: String, default: '' },
  interactionType: { type: String, default: '' },
  pagePath:        { type: String, default: '' },
  referrer:        { type: String, default: '' },
  utm_source:      { type: String, default: '' },
  utm_medium:      { type: String, default: '' },
  utm_campaign:    { type: String, default: '' },
  utm_term:        { type: String, default: '' },
  utm_content:     { type: String, default: '' },
  locale:          { type: String, default: '' },
}, { _id: false });

module.exports = trackingSchema;
