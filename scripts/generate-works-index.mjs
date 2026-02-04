import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const worksRoot = path.join(repoRoot, 'works');
const distRoot = path.join(repoRoot, 'dist');

const ignoredDirectories = new Set(['.git', 'node_modules']);
const normalizePath = (value) => value.split(path.sep).join('/');

const rmIfExists = (targetPath) => {
  fs.rmSync(targetPath, { recursive: true, force: true });
};

const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) {
      continue;
    }
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }
      copyDir(src, dst);
      continue;
    }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
};

const findIndexHtmlPath = (studentPath, basePath) => {
  if (!fs.existsSync(studentPath)) {
    return null;
  }

  let currentLevel = [studentPath];
  while (currentLevel.length > 0) {
    const matches = [];
    const nextLevel = [];

    for (const dir of currentLevel) {
      let entries;
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch (error) {
        console.warn(`Failed to read student work directory: ${dir}`, error);
        continue;
      }

      for (const entry of entries) {
        if (entry.isFile() && entry.name.toLowerCase() === 'index.html') {
          const filePath = path.join(dir, entry.name);
          const relativePath = path.relative(basePath, filePath);
          matches.push(normalizePath(relativePath));
          continue;
        }
        if (entry.isDirectory()) {
          if (entry.name.startsWith('.') || ignoredDirectories.has(entry.name)) {
            continue;
          }
          nextLevel.push(path.join(dir, entry.name));
        }
      }
    }

    if (matches.length > 0) {
      matches.sort((a, b) => a.localeCompare(b));
      return matches[0] ?? null;
    }

    currentLevel = nextLevel;
  }

  return null;
};

const buildIndex = (basePath) => {
  if (!fs.existsSync(basePath)) {
    return { years: {} };
  }

  const data = {};
  const years = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  for (const year of years) {
    const yearPath = path.join(basePath, year);
    const studentIds = fs
      .readdirSync(yearPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    data[year] = studentIds.map((studentId) => {
      const studentPath = path.join(yearPath, studentId);
      return {
        studentId,
        workPath: findIndexHtmlPath(studentPath, basePath),
      };
    });
  }

  return { years: data };
};

if (!fs.existsSync(worksRoot)) {
  throw new Error(`Missing works directory: ${worksRoot}`);
}

rmIfExists(distRoot);
fs.mkdirSync(distRoot, { recursive: true });

copyDir(worksRoot, distRoot);
fs.writeFileSync(path.join(distRoot, '.nojekyll'), '');

const index = buildIndex(worksRoot);
fs.writeFileSync(
  path.join(distRoot, 'works-index.json'),
  `${JSON.stringify(index, null, 2)}\n`
);

console.log(
  `Generated works-index.json (years=${Object.keys(index.years).length})`
);

