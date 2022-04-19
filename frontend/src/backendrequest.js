export async function backendrequest(request, info) {
    let env = process.env.NODE_ENV;

    if (env === "development") {
        return fetch("http://localhost:5000" + request, info);
    } else if (env === "production") {
        return fetch("https://game-reach.herokuapp.com" + request, info);
    } else {
        console.log(env + " environment error");
    }

    return null;
}

export function getBackendAddress() {
    let env = process.env.NODE_ENV;

    if (env === "development") {
        return "http://localhost:5000";
    } else if (env === "production") {
        return "https://game-reach.herokuapp.com";
    }
    return "";
}
