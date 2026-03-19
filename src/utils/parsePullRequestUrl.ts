export function parsePullRequestUrl(url: string) {
    const parts = url.split("/");
    const pathSegments = parts.filter(Boolean);

    if (pathSegments.length < 4) return null;

    const [org, repo, type, pullNumber] = pathSegments;
    if (type !== "pull") return null;

    return { org, repo, pullNumber };
}