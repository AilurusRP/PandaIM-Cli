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
    console.log(JSON.stringify(loginInfo));
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(loginInfo),
    };
}

async function login() {
    let res = await axios(
        'http://127.0.0.1:3080/login',
        loginReqConfig(await getLoginInfo()),
    );
    console.log(res.data);
}

function main() {
    login();
}

main();
