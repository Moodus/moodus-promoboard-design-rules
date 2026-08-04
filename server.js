const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PAGE = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Allow': 'GET, HEAD' });
    return res.end();
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('ok');
  }

  // The whole site is one self-contained page — everything else redirects to it.
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': PAGE.length,
    'Cache-Control': 'public, max-age=300',
  });
  res.end(req.method === 'HEAD' ? undefined : PAGE);
});

server.listen(PORT, () => {
  console.log(`Promoboard design rules listening on ${PORT}`);
});
