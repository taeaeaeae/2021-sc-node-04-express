const bcrypt = require("bcrypt");

const pass = "1234";
const salt = "3hfd23j$23WdsREwaDF23@$%TSGF"
const pass2 = "1234";

async function genPass() {
    //암호화
    const encrypt = await bcrypt.hash(pass + salt, 7);
    //디비저장

    //로그인시도
    const compare = await bcrypt.compare(pass2 +salt, encrypt);
    console.log(compare);
}
genPass();