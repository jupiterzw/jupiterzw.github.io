import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const imageRoot = path.join(projectRoot, "assets", "img");
const outputRoot = path.join(imageRoot, "generated");
const manifestPath = path.join(
  projectRoot,
  "_data",
  "responsive_images.json",
);

const roles = {
  avatar: {
    widths: [112, 224],
    matches(relativePath) {
      return relativePath === "avatar.jpg";
    },
  },
  cover: {
    widths: [480, 800, 1200],
    matches(relativePath) {
      return /^.+\/cover\.(?:jpe?g|png)$/i.test(relativePath);
    },
  },
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "generated") {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function toPublicPath(filePath) {
  return `/${path.relative(projectRoot, filePath).split(path.sep).join("/")}`;
}

function orientedDimensions(metadata) {
  const swapsAxes = metadata.orientation >= 5 && metadata.orientation <= 8;

  return swapsAxes
    ? { width: metadata.height, height: metadata.width }
    : { width: metadata.width, height: metadata.height };
}

async function writeVariant(sourcePath, destinationPath, width, format) {
  await mkdir(path.dirname(destinationPath), { recursive: true });

  const image = sharp(sourcePath)
    .rotate()
    .resize({
      width,
      fit: "inside",
      withoutEnlargement: true,
    });

  if (format === "avif") {
    await image.avif({ quality: 55, effort: 4 }).toFile(destinationPath);
  } else {
    await image
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(destinationPath);
  }
}

async function optimizeImage(sourcePath, relativePath, role, settings) {
  const metadata = await sharp(sourcePath).metadata();
  const dimensions = orientedDimensions(metadata);

  if (!dimensions.width || !dimensions.height) {
    throw new Error(`Unable to read dimensions for ${relativePath}`);
  }

  const widths = [
    ...new Set(settings.widths.map((width) => Math.min(width, dimensions.width))),
  ];
  const extension = path.extname(relativePath);
  const stem = relativePath.slice(0, -extension.length);
  const variants = { avif: [], webp: [] };

  for (const width of widths) {
    for (const format of Object.keys(variants)) {
      const destinationPath = path.join(
        outputRoot,
        `${stem}-${width}.${format}`,
      );

      await writeVariant(sourcePath, destinationPath, width, format);
      variants[format].push({
        src: toPublicPath(destinationPath),
        width,
      });
    }
  }

  return {
    role,
    width: dimensions.width,
    height: dimensions.height,
    ...variants,
  };
}

async function main() {
  await rm(outputRoot, { recursive: true, force: true });

  const imagePaths = await walk(imageRoot);
  const manifest = {};
  let originalBytes = 0;
  let generatedBytes = 0;

  for (const sourcePath of imagePaths.sort()) {
    const relativePath = path.relative(imageRoot, sourcePath);
    const roleEntry = Object.entries(roles).find(([, settings]) =>
      settings.matches(relativePath),
    );

    if (!roleEntry) {
      continue;
    }

    const [role, settings] = roleEntry;
    const sourceStats = await stat(sourcePath);
    originalBytes += sourceStats.size;

    manifest[toPublicPath(sourcePath)] = await optimizeImage(
      sourcePath,
      relativePath,
      role,
      settings,
    );
  }

  const generatedPaths = await walk(outputRoot);

  for (const generatedPath of generatedPaths) {
    generatedBytes += (await stat(generatedPath)).size;
  }

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  const originalMiB = (originalBytes / 1024 / 1024).toFixed(2);
  const generatedMiB = (generatedBytes / 1024 / 1024).toFixed(2);

  console.log(
    `Generated ${generatedPaths.length} responsive images for ${Object.keys(manifest).length} sources ` +
      `(${originalMiB} MiB originals, ${generatedMiB} MiB variants).`,
  );
}

await main();
