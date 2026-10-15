import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

const angularNodeAppEngine = new AngularNodeAppEngine({
  trustProxyHeaders: true,
  allowedHosts: [
    'localhost',
    'localhost:4200',
    '127.0.0.1',
    '127.0.0.1:4200',
    '*.app.github.dev',
    'fuzzy-space-memory-v6p55wr7796726ppr-4200.app.github.dev'
  ]
});

app.set('trust proxy', true);
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and use as needed:
 *
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularNodeAppEngine
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);