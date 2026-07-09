require('dotenv').config({ path: '/app/.env' });

const http = require('http');

const port = process.env.PORT || 4000;
const prefix = process.env.API_PREFIX ? `/${process.env.API_PREFIX}`.replace(/\/\//g, '/') : '';
const path = process.env.HEALTHCHECK_PATH || '/health';

const url = `http://127.0.0.1:${port}${prefix}${path}`;

const request = http.get(url, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    console.error(`Failed with status: ${res.statusCode} at ${url}`);
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error(`Connection error: ${err.message} at ${url}`);
  process.exit(1);
});

request.setTimeout(2000, () => {
  console.error(`Timeout reaching ${url}`);
  request.destroy();
  process.exit(1);
});