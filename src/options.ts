const main = () => {
  const input = document.getElementById("token") as HTMLInputElement | null;
  const status = document.getElementById("status");
  const saveBtn = document.getElementById("save");

  if (!input || !status || !saveBtn) return

  chrome.storage.local.get(["githubToken"], (result) => {
    if (typeof result.githubToken === "string") {
      input.value = result.githubToken;
    }
  });

  saveBtn.addEventListener("click", () => {
    const token = input.value.trim();
    chrome.storage.local.set({ githubToken: token }, () => {
      status.textContent = "Saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
}

main()