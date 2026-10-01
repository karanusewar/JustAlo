const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');
const path = require('path');

const url = "https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.29.0-stable.zip";
const zipPath = path.join(process.env.USERPROFILE || 'C:\\Users\\HP', 'flutter.zip');
const destDir = 'C:\\flutter';

console.log(`Downloading Flutter SDK from ${url} to ${zipPath}...`);

if (fs.existsSync(destDir) && fs.existsSync(path.join(destDir, 'bin', 'flutter.bat'))) {
  console.log("Flutter SDK already exists at C:\\flutter!");
  process.exit(0);
}

const file = fs.createWriteStream(zipPath);
https.get(url, (res) => {
  if (res.statusCode === 302 || res.statusCode === 301) {
    https.get(res.headers.location, handleResponse);
  } else {
    handleResponse(res);
  }
}).on('error', (err) => {
  console.error("Download failed:", err);
});

function handleResponse(res) {
  const total = parseInt(res.headers['content-length'], 10);
  let downloaded = 0;
  let lastLog = 0;

  res.on('data', (chunk) => {
    downloaded += chunk.length;
    const now = Date.now();
    if (now - lastLog > 5000) {
      console.log(`Downloaded ${(downloaded / (1024 * 1024)).toFixed(1)} MB / ${(total / (1024 * 1024)).toFixed(1)} MB (${((downloaded / total) * 100).toFixed(1)}%)`);
      lastLog = now;
    }
  });

  res.pipe(file);

  file.on('finish', () => {
    file.close(() => {
      console.log("Download complete. Unzipping to C:\\ ...");
      try {
        execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath 'C:\\' -Force"`, { stdio: 'inherit' });
        console.log("Flutter SDK extracted successfully to C:\\flutter");
      } catch (e) {
        console.error("Extraction error:", e);
      }
    });
  });
}
