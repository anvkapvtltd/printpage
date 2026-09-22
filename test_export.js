const http = require('http');
const { exec, spawn } = require('child_process');
const fs = require('fs');

// Launch Edge with remote debugging
const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  'file:///c:/rjcoder/more_project/printpage/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const list = JSON.parse(data);
        const page = list.find(p => p.type === 'page');
        if (!page) {
          console.log('No page found');
          edge.kill();
          return;
        }
        const wsUrl = page.webSocketDebuggerUrl;
        console.log('Page found, wsUrl:', wsUrl);

        // Connect via WebSocket to evaluate getLabelImageDataUrl()
        const WebSocket = require('ws');
      } catch (e) {
        console.log('Error:', e.message);
        edge.kill();
      }
    });
  }).on('error', (e) => {
    console.log('HTTP error:', e.message);
    edge.kill();
  });
}, 1500);
