import * as esbuild from 'esbuild'
import http from 'node:http'
import { setup } from './websocket_server.mjs';


function transformPath(path) {
  const isNotHTML = ['.css', '.js', '.mjs'].some((extension) => path.endsWith(extension));
  const isTemplate = path.startsWith("/templates")
  if (isNotHTML || isTemplate) return path;
  return "/"
}

// Start esbuild's server on a random local port
let ctx = await esbuild.context({
  entryPoints: ['src/app.js'],
  outfile: 'public/app.js',
  bundle: true,
  target: ["es6"],
  minify: true
})

// The return value tells us where esbuild's local server is
let { host, port } = await ctx.serve({ servedir: 'public' })

// Then start a proxy server on port 3000
http.createServer((req, res) => {
  const options = {
    hostname: host,
    port: port,
    path: transformPath(req.url),
    method: req.method,
    headers: req.headers,
  }
  const reqString = `${req.method} ${req.url}`

  // Forward each incoming request to esbuild
  const proxyReq = http.request(options, proxyRes => {
    console.log(reqString, proxyRes.statusCode)

    // Otherwise, forward the response from esbuild to the client
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  // Forward the body of the request to esbuild
  req.pipe(proxyReq, { end: true })
}).listen(3000);
console.log(`Listening on "http://127.0.0.1:3000"`)

setup();