import http from "node:http";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve("out");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain", ".xml": "application/xml" };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname); } catch { res.writeHead(400); return res.end(); }
  let target = path.resolve(root, "." + pathname);
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
  if (!fs.existsSync(target)) { res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }); return res.end(fs.readFileSync(path.join(root, "404.html"))); }
  res.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "X-Robots-Tag": "noindex, nofollow" });
  fs.createReadStream(target).pipe(res);
});
server.listen(3000, "127.0.0.1", () => console.log("Steady production preview: http://127.0.0.1:3000"));
