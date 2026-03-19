import type { ApiResponse } from "../types/ApiResponse";

export function createElement(data: ApiResponse, href: string) {
  const { changed_files, commits, additions, deletions } = data;

  const container = document.createElement("div");
  container.className = "div-container";

  // ---- Commits ----
  const commitsLink = document.createElement("a");
  commitsLink.href = `${href}/commits`;
  commitsLink.className = "link";

  commitsLink.innerHTML = `
    <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
    </svg>
    Commits <span class="badge">${commits}</span>
  `;

  // ---- Files changed ----
  const filesLink = document.createElement("a");
  filesLink.href = `${href}/changes`;
  filesLink.className = "link";

  filesLink.innerHTML = `
    <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073ZM8 3.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0V7h-1.5a.75.75 0 0 1 0-1.5h1.5V4A.75.75 0 0 1 8 3.25Zm-3 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"/>
    </svg>
    Files changed <span class="badge">${changed_files}</span>
  `;

  // ---- Changes ----
  const changesSpan = document.createElement("span");
  changesSpan.className = "changes";

  const additionsText = document.createElement("span");
  additionsText.className = "additions";
  additionsText.textContent = `+${additions}`;

  const deletionsText = document.createElement("span");
  deletionsText.className = "deletions";
  deletionsText.textContent = `-${deletions}`;

  const blocksContainer = document.createElement("div");
  blocksContainer.className = "blocks";

  const total = additions + deletions || 1;
  const totalBlocks = 5;

  const greenBlocks = Math.round((additions / total) * totalBlocks);
  const redBlocks = Math.round((deletions / total) * totalBlocks);

  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement("div");
    block.className = "block";

    if (i < greenBlocks) {
      block.classList.add("block-green");
    } else if (i < greenBlocks + redBlocks) {
      block.classList.add("block-red");
    } else {
      block.classList.add("block-neutral");
    }

    blocksContainer.appendChild(block);
  }

  changesSpan.appendChild(additionsText);
  changesSpan.appendChild(deletionsText);
  changesSpan.appendChild(blocksContainer);

  container.appendChild(commitsLink);
  container.appendChild(filesLink);
  container.appendChild(changesSpan);

  return container;
}