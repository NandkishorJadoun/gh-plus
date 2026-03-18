import "./main.css";
import { fetchPullRequestData } from "./utils/fetchPullRequestData";
import { createElement } from "./utils/createElement";

// Extract repo info from PR URL

function parsePullRequestUrl(url: string) {
  const parts = url.split("/");

  if (parts.length < 5) return null;

  const [, org, repo, , pullNumber] = parts;

  return { org, repo, pullNumber };
}

async function processCard(card: Element) {
  // prevent duplicate injection
  if ((card as HTMLElement).dataset.processed === "true") return;

  const linkElement = card.querySelector(`#${card.id}_link`);
  const href = linkElement?.getAttribute("href");

  if (!href) return;

  const parsed = parsePullRequestUrl(href);
  if (!parsed) return;

  const data = await fetchPullRequestData(parsed);
  if (!data) return;

  const element = createElement(data, href);
  card.appendChild(element);

  (card as HTMLElement).dataset.processed = "true";
}

// Main entry

async function main() {
  const cards = document.querySelectorAll(".js-issue-row");

  await Promise.all(
    Array.from(cards).map(card => processCard(card))
  );

  observeNewCards(); 
}

main();


function observeNewCards() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;

      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;

        if (node.matches(".js-issue-row")) {
          processCard(node);
        }
        const cards = node.querySelectorAll?.(".js-issue-row");
        cards?.forEach((card) => processCard(card));
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}