import sharp from "sharp";
import { copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(PUBLIC, "logo.png");
const SOURCE_BACKUP = path.join(PUBLIC, "logo-source.png");

const TRIM_THRESHOLD = 50;
const BLACK_TO_ALPHA_THRESHOLD = 28;

// Convert raw rgb pixels: any pixel with r,g,b all below threshold → fully transparent.
function blackToAlphaBuffer(data, info, threshold) {
  const ch = info.channels;
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += ch, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = ch === 4 ? data[i + 3] : 255;
    const isBlackish = r < threshold && g < threshold && b < threshold;
    out[j] = r;
    out[j + 1] = g;
    out[j + 2] = b;
    out[j + 3] = isBlackish ? 0 : a;
  }
  return { buffer: out, width: info.width, height: info.height };
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Missing source: ${SRC}`);
    process.exit(1);
  }
  if (!existsSync(SOURCE_BACKUP)) {
    await copyFile(SRC, SOURCE_BACKUP);
    console.log(`Backed up original → ${path.relative(ROOT, SOURCE_BACKUP)}`);
  }

  const before = (await stat(SRC)).size;

  // 1. Trim the solid-black border off the source.
  const trimmedPng = await sharp(SOURCE_BACKUP)
    .trim({ background: "#000000", threshold: TRIM_THRESHOLD })
    .toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmedPng.info.width}×${trimmedPng.info.height}`);

  // 2. Convert remaining pure-black background to transparent so the wordmark
  // sits cleanly on any dark surface.
  const raw = await sharp(trimmedPng.data).raw().toBuffer({ resolveWithObject: true });
  const { buffer, width, height } = blackToAlphaBuffer(raw.data, raw.info, BLACK_TO_ALPHA_THRESHOLD);

  // 3. Wordmark logo — height 192px, width auto. Used in nav + footer.
  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .resize({ height: 192, withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(SRC);

  // 4. App icon — square 512×512, padded on solid black.
  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .resize({ width: 460, height: 460, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "icon.png"));

  // 5. OG share card 1200×630, logo centered on black.
  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .resize({ width: 800, height: 480, fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 75, bottom: 75, left: 200, right: 200, background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "og-image.png"));

  const afterLogo = (await stat(SRC)).size;
  const afterIcon = (await stat(path.join(PUBLIC, "icon.png"))).size;
  const afterOg = (await stat(path.join(PUBLIC, "og-image.png"))).size;
  const newMeta = await sharp(SRC).metadata();

  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  console.log(`logo.png:     ${kb(before)} → ${kb(afterLogo)}  (${newMeta.width}×${newMeta.height}, transparent bg)`);
  console.log(`icon.png:     ${kb(afterIcon)}`);
  console.log(`og-image.png: ${kb(afterOg)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
