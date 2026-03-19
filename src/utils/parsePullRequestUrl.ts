export function parsePullRequestUrl(url: string) {
    const parts = url.split("/");

    if (parts.length < 5) return null;

    const [, org, repo, , pullNumber] = parts;

    return { org, repo, pullNumber };
}