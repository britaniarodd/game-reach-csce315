export let apiKey = "RGAPI-2253e6a5-31b7-4756-9c74-2cb377699762";
export let naApiRoute = "https://na1.api.riotgames.com";
export let americasApiRoute = "https://americas.api.riotgames.com";

function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(request, delay, tries) {
    function onError(err) {
        let triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }
        return wait(delay).then(() => fetchRetry(request, delay, triesLeft));
    }
    return fetch(request).catch(onError);
}

export async function apiRequest(request) {
    return (await fetchRetry(request, 1000, 5)).json();
}
