import { fsPromises } from "./definitionFile.js";

function setCookie(key: string, value: any): Promise<any> {
    return fsPromises.writeFile(`storage/${key}.cookie`, JSON.stringify(value)).catch(async err => {
        if (err?.code === "ENOENT") {
            await fsPromises.mkdir("storage").catch(err => console.error("mkdir:", err));
            await fsPromises.appendFile(`storage/${key}.cookie`, JSON.stringify(value)).catch(err => console.error("append", err));
        } else if (err) {
            console.error(err);
        }
    });
}

function getCookie(key: string): Promise<any> {
    return fsPromises.readFile(`storage/${key}.cookie`, "utf-8").catch(err => console.error("read", err));
}

export { setCookie, getCookie };
