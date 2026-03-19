import { parsePullRequestUrl } from "./parsePullRequestUrl";
import { fetchPullRequestData } from "./fetchPullRequestData";
import { createElement } from "./createElement";

export async function processCard(card: HTMLElement) {
  if (card.dataset.extensionProcessed === "true") return;
  card.dataset.extensionProcessed = "true";

  const linkElement = card.querySelector("a.js-navigation-open");
  const href = linkElement?.getAttribute("href");

  if (!href) return;

  const parsed = parsePullRequestUrl(href);
  if (!parsed) return;

  try {
    const data = await fetchPullRequestData(parsed);
    if (!data) return;

    const element = createElement(data, href);
    card.appendChild(element);
  } catch (err) {
    console.error("Failed to process PR card:", err);
    delete card.dataset.extensionProcessed;
  }
}