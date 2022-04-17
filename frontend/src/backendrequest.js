export async function backendrequest(request, info) {
    let env = process.env.NODE_ENV;
    let result = null;

    if (env === "development") {
        result = (await fetch("http://localhost:5000" + request, info)).json();
    } else if (env === "production") {
        result = (
            await fetch("https://game-reach.herokuapp.com" + request, info)
        ).json();
    } else {
        console.log(env + " environment error");
    }

    console.log(await result);
    return result;
}
