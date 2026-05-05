const fs = require("node:fs/promises");

const USERNAME = "AyaNaimi";
const README_PATH = "README.md";
const START = "<!-- AUTO-PROJECTS:START -->";
const END = "<!-- AUTO-PROJECTS:END -->";

const languageColors = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  PHP: "#777BB4",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Blade: "#F7523F",
  Vue: "#41B883",
  Python: "#3776AB",
  Java: "#007396",
};

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function languageDot(language) {
  if (!language) return "";
  const color = languageColors[language] || "#94A3B8";
  return `<span><svg width="10" height="10"><circle cx="5" cy="5" r="5" fill="${color}" /></svg> ${escapeHtml(language)}</span>`;
}

function repoCard(repo) {
  const description = repo.description || "Public repository by Aya Naimi.";
  const homepage = repo.homepage
    ? ` | <a href="${escapeHtml(repo.homepage)}">Live</a>`
    : "";
  const topics = repo.topics && repo.topics.length
    ? `<br /><sub>${repo.topics.slice(0, 4).map((topic) => `#${escapeHtml(topic)}`).join(" ")}</sub>`
    : "";

  return [
    `<td width="50%" valign="top">`,
    `  <h3><a href="${escapeHtml(repo.html_url)}">${escapeHtml(repo.name)}</a></h3>`,
    `  <p>${escapeHtml(description)}</p>`,
    `  <p>${languageDot(repo.language)} | Stars: ${repo.stargazers_count} | Updated: ${formatDate(repo.pushed_at)}${homepage}</p>`,
    `  ${topics}`,
    `</td>`,
  ].join("\n");
}

function makeTable(repos) {
  const rows = [];
  for (let i = 0; i < repos.length; i += 2) {
    const left = repoCard(repos[i]);
    const right = repos[i + 1] ? repoCard(repos[i + 1]) : '<td width="50%" valign="top"></td>';
    rows.push(`<tr>\n${left}\n${right}\n</tr>`);
  }

  return `<table>\n${rows.join("\n")}\n</table>`;
}

async function fetchRepos() {
  const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?type=public&sort=pushed&per_page=100`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "AyaNaimi-profile-readme-updater",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
  }

  const repos = await response.json();
  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => repo.name.toLowerCase() !== USERNAME.toLowerCase())
    .sort((a, b) => {
      const stars = b.stargazers_count - a.stargazers_count;
      if (stars !== 0) return stars;
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    })
    .slice(0, 6);
}

async function main() {
  const readme = await fs.readFile(README_PATH, "utf8");
  const repos = await fetchRepos();
  const projects = repos.length
    ? makeTable(repos)
    : "No public repositories found yet.";

  const startIndex = readme.indexOf(START);
  const endIndex = readme.indexOf(END);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Auto project markers were not found in README.md");
  }

  const nextReadme = `${readme.slice(0, startIndex + START.length)}\n${projects}\n${readme.slice(endIndex)}`;
  await fs.writeFile(README_PATH, nextReadme, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
