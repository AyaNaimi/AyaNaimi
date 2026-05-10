const fs = require("node:fs/promises");

const USERNAME  = "AyaNaimi";
const README    = "README.md";
const START     = "<!-- AUTO-PROJECTS:START -->";
const END       = "<!-- AUTO-PROJECTS:END -->";

const LANG = {
  JavaScript: { logo: "javascript",  color: "F7DF1E" },
  TypeScript:  { logo: "typescript",  color: "3178C6" },
  PHP:         { logo: "php",          color: "8B5CF6" },
  HTML:        { logo: "html5",        color: "E34F26" },
  CSS:         { logo: "css3",         color: "38BDF8" },
  Vue:         { logo: "vue.js",       color: "41B883" },
  Python:      { logo: "python",       color: "3776AB" },
  Java:        { logo: "java",         color: "007396" },
  Blade:       { logo: "laravel",      color: "FF2D20" },
};

const esc = (s = "") => s
  .replaceAll("&","&amp;").replaceAll("<","&lt;")
  .replaceAll(">","&gt;").replaceAll('"',"&quot;");

const date = (v) => new Intl.DateTimeFormat("en",{
  year:"numeric", month:"short", day:"2-digit"
}).format(new Date(v));

function badge(lang) {
  if (!lang) return "";
  const b = LANG[lang] ?? { logo: "code", color: "94A3B8" };
  return `![${lang}](https://img.shields.io/badge/${encodeURIComponent(lang)}-0D1117?style=flat-square&logo=${encodeURIComponent(b.logo)}&logoColor=${b.color})`;
}

function card(repo) {
  const desc = esc(repo.description ?? "Public repository by Aya Naimi.");
  const live = repo.homepage
    ? `&ensp;[![Live ↗](https://img.shields.io/badge/↗%20Live-0D1117?style=flat-square&logo=vercel&logoColor=06B6D4)](${esc(repo.homepage)})`
    : "";
  const stars = repo.stargazers_count > 0
    ? `&ensp;![★ ${repo.stargazers_count}](https://img.shields.io/badge/★%20${repo.stargazers_count}-0D1117?style=flat-square&logoColor=F59E0B)`
    : "";
  const dateLabel = date(repo.pushed_at).replaceAll(" ", "%20");
  const topics = repo.topics?.length
    ? "\n\n" + repo.topics.slice(0,4).map(t=>`\`#${t}\``).join(" ")
    : "";

  return [
    `<td width="50%" valign="top">`,
    ``,
    `**[${esc(repo.name)}](${esc(repo.html_url)})**${live}`,
    ``,
    desc,
    topics,
    ``,
    `${badge(repo.language)}${stars}&ensp;![](https://img.shields.io/badge/${dateLabel}-0D1117?style=flat-square&logoColor=475569)`,
    ``,
    `</td>`,
  ].join("\n");
}

function table(repos) {
  const rows = [];
  for (let i = 0; i < repos.length; i += 2) {
    const l = card(repos[i]);
    const r = repos[i+1] ? card(repos[i+1]) : `<td width="50%"></td>`;
    rows.push(`<tr>\n${l}\n${r}\n</tr>`);
  }
  return `<table>\n${rows.join("\n")}\n</table>`;
}

async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?type=public&sort=pushed&per_page=100`,
    { headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": `${USERNAME}-readme-updater`,
    }}
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
  return (await res.json())
    .filter(r => !r.fork)
    .filter(r => /^[A-Z]/.test(r.name))               // ← capital-letter filter
    .filter(r => r.name.toLowerCase() !== USERNAME.toLowerCase())
    .sort((a,b) => b.stargazers_count - a.stargazers_count
                || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 6);
}

async function main() {
  const [src, repos] = await Promise.all([fs.readFile(README,"utf8"), fetchRepos()]);
  const block = repos.length
    ? table(repos)
    : `<p align="center"><sub>No featured projects yet.</sub></p>`;
  const si = src.indexOf(START), ei = src.indexOf(END);
  if (si < 0 || ei < 0) throw new Error("Markers not found in README");
  await fs.writeFile(README,
    src.slice(0, si + START.length) + "\n" + block + "\n" + src.slice(ei),
    "utf8"
  );
  console.log(`✓ ${repos.length} repo(s) — ${repos.map(r=>r.name).join(", ") || "none"}`);
}

main().catch(e => { console.error(e); process.exit(1); });
