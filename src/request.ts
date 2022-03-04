import { http } from "./definitionFile.js";
import { LoginResponse, LoginReqConfig } from "./interfaces";

async function post(options: LoginReqConfig, data: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        let req = http.request(options, res => {
            res.setEncoding("utf-8");
            res.on("data", d => resolve(JSON.parse(d)));
        });
        req.on("error", err => reject(err));
        req.write(data);
        req.end();
    });
}

export { post };
