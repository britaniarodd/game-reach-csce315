export function getBackendAddress() {
    let env = process.env.NODE_ENV;

    if (env === "development") {
        return "http://localhost:5000";
    } else if (env === "production") {
        return "https://game-reach.herokuapp.com";
    }
    return "";
}
