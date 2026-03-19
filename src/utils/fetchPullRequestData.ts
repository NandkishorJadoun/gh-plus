import { getGithubToken } from "./getGithubToken";
import type { PrData } from "../types/PrData";

export const GITHUB_API = "https://api.github.com/repos";

export async function fetchPullRequestData({ org, repo, pullNumber }: PrData) {
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