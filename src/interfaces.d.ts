interface LoginInfo {
    uname: String;
    passwd: String;
}

interface LoginResponse {
    success: boolean;
    token?: string;
    err?: string;
}

interface LoginReqConfig {
    hostname: string;
    port: number;
    path: string;
    method: string;
    headers: {
        "Content-Type": string;
        "Content-Length": number;
    };
}

export { LoginInfo, LoginResponse, LoginReqConfig };
