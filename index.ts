import axios from 'axios';
import inquirer from 'inquirer';

interface LoginInfo {
    uname: String;
    passwd: String;
}

async function getLoginInfo(): Promise<LoginInfo> {
    let info = await inquirer.prompt([
        {
            name: 'uname',
            message: 'Your USERNAME: ',
        },
        {
            type: 'password',
            name: 'passwd',
            message: 'Your PASSWORD: ',
        },
    ]);
    return {
        uname: info.uname,
        passwd: info.passwd,
    };
}

function loginReqConfig(loginInfo: LoginInfo): Object {
    return {
        method: 'POST',
        url: 'http://127.0.0.1:3080/login',
        headers: {
            'Content-Type': "application/json",
        },
        data: JSON.stringify(loginInfo),
    };
}

async function login() {
    let conf = loginReqConfig(await getLoginInfo());
    let res = await axios(conf);
    console.log(res.data);
}

function main() {
    login();
}

main();
