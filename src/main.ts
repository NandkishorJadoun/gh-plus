import "./main.css";

const GITHUB_API = "https://api.github.com/repos";

// Extract repo info from PR URL

function parsePullRequestUrl(url: string) {
  const parts = url.split("/");

  if (parts.length < 5) return null;

  const [, org, repo, , pullNumber] = parts;

  return { org, repo, pullNumber };
}

// Fetch PR data from GitHub API

async function getGithubToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["githubToken"], (result) => {
      resolve(result.githubToken || null);
    });
  });
}

async function fetchPullRequestData({ org, repo, pullNumber }: { org: string, repo: string, pullNumber: string }) {
  try {
    const token = await getGithubToken();
    
    let headers;

    if (token) {
      headers = { Authorization: `Bearer ${token}` }
    }

    const response = await fetch(
      `${GITHUB_API}/${org}/${repo}/pulls/${pullNumber}`,
      { headers }
    );

    if (!response.ok) {
      console.warn("GitHub API failed:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Create UI element

function createChangedFilesElement(count: number) {
  const span = document.createElement("span");
  span.textContent = `Files changed: ${count}`;
  span.classList.add("pr-changed-files");

  return span;
}

/**
 * Process a single card
 */
async function processCard(card: Element) {
  const linkElement = card.querySelector(`#${card.id}_link`);
  const href = linkElement?.getAttribute("href");

  if (!href) return;

  const parsed = parsePullRequestUrl(href);
  if (!parsed) return;

  const data = await fetchPullRequestData(parsed);
  if (!data) return;

  const element = createChangedFilesElement(data.changed_files);
  card.appendChild(element);
}

/**
 * Main entry
 */
async function main() {
  const cards = document.querySelectorAll(".js-issue-row");

  if (cards.length === 0) return;

  await Promise.all(
    Array.from(cards).map(card => processCard(card))
  );
}

main();