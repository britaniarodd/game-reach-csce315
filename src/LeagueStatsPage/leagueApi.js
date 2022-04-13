export let apiKey = "RGAPI-ffabd4b2-3189-4e35-8855-d18b6ba8d945";
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
    let result = (await fetchRetry(request, 1000, 5)).json();
    console.log(await result);
    return result;
}
