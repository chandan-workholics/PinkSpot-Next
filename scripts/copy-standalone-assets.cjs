const fs = require("fs");
const path = require("path");

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  process.exit(0);
}

const copies = [
  {
    from: path.join(root, ".next", "static"),
    to: path.join(standaloneDir, ".next", "static"),
  },
  {
    from: path.join(root, "public"),
    to: path.join(standaloneDir, "public"),
  },
];

for (const { from, to } of copies) {
  if (!fs.existsSync(from)) {
    continue;
  }

  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
}

console.log("Copied static assets into .next/standalone");
