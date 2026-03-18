export async function getGithubToken() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["githubToken"], (result) => {
            resolve(result.githubToken || null);
        });
    });
}
