import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 4175;
const LISTEN_HOST = process.env.PREVIEW_HOST || "::";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

function resolveFile(urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  const full = path.resolve(ROOT, rel.split("/").join(path.sep));
  const relToRoot = path.relative(ROOT, full);
  if (relToRoot.startsWith("..") || path.isAbsolute(relToRoot)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405).end();
    return;
  }

  const url = new URL(req.url || "/", "http://127.0.0.1");
  let filePath = resolveFile(url.pathname);
  if (!filePath) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, st) => {
    if (!err && st.isDirectory()) filePath = path.join(filePath, "index.html");
    fs.stat(filePath, (err2, st2) => {
      if (err2 || !st2.isFile()) {
        res.writeHead(404).end("Not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      fs.createReadStream(filePath).pipe(res);
    });
  });
});

const listenOpts =
  LISTEN_HOST === "::"
    ? { port: PORT, host: "::", ipv6Only: false }
    : { port: PORT, host: LISTEN_HOST };

server.listen(listenOpts, () => {
  console.log(`Dungeon's TV preview: http://127.0.0.1:${PORT}/`);
});
