import { parsePullRequestUrl } from "./parsePullRequestUrl";
import { fetchPullRequestData } from "./fetchPullRequestData";
import { createElement } from "./createElement";

export async function processCard(card: Element) {
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