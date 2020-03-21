export default function bootStatus(app) {
  const api = app.loopback.Router();

  // DEBUG ROUTE
  api.get('/status/ping', (req, res) => {
    throw Error('debuging sentry');
  });
  app.use(api);
}
