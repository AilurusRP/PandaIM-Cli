import { getCookie, setCookie } from "./cookie.js";
import { inquirer } from "./definitionFile.js";
import { post } from "./request.js";
import { LoginInfo, LoginResponse, LoginReqConfig } from "./interfaces";

async function getLoginInfo(): Promise<LoginInfo> {
    const info = await inquirer.prompt([
        { name: "uname", message: "Your USERNAME: " },
        { type: "password", name: "passwd", message: "Your PASSWORD: " },
    ]);
    return { uname: info.uname, passwd: info.passwd };
}

function loginReqConfig(loginInfo: LoginInfo): LoginReqConfig {
    return {
        hostname: "127.0.0.1",
        port: 3080,
        path: "/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify(loginInfo).length,
        },
    };
}

async function handleResponse(res: LoginResponse) {
    if (res.success === true) {
        await setCookie("token", res.token);
        console.log(await getCookie("token"));
    } else if (res.success === false) {
        console.error(res.err);
    } else {
        console.log(res);
    }
}

async function login() {
    const info = await getLoginInfo();
    const conf = loginReqConfig(info);
    handleResponse(await post(conf, JSON.stringify(info)));
}

function main() {
    login();
}

main();
