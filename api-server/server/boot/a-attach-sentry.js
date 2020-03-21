const Sentry = require('@sentry/node');
const createDebugger = require('debug');
const { isHandledError } = require('../utils/create-handled-error.js');
const { sentry } = require('../../../config/secrets');

const log = createDebugger('fcc:sentry');

export default function attachSentry() {
  if (sentry.dns === 'dsn_from_sentry_dashboard') {
    log('Sentry reporting disabled unless DSN is provided.');
  } else {
    Sentry.init({
      dsn: sentry.dns,
      beforeSend(event, hint) {
        log('REPORTING TO SENTRY', hint.originalException.message);
        log('EVENT', event);
        log('ishandled?', isHandledError(hint.originalException));
        // DEBUG: returning null stops the event from being reported to Sentry
        return null;
        // DEBUG: use the next return to send to Sentry
        // return isHandledError(hint.originalException) ? null : event;
      }
    });
  }
}
