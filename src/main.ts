import "./main.css";
import { processCard } from "./utils/processCard";

function init() {
  const observer = new MutationObserver(() => {
    const cards = document.querySelectorAll(".js-issue-row:not([data-extension-processed='true'])");
    cards.forEach(card => processCard(card as HTMLElement));
  });

  const target = document.querySelector("#repo-content-turbo-frame") || document.body;

  observer.observe(target, {
    childList: true,
    subtree: true
  });

  const initialCards = document.querySelectorAll(".js-issue-row");
  initialCards.forEach(card => processCard(card as HTMLElement));
}

init();