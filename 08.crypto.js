/*
암호화(encrypt)
복호화(decrypt)
단방향: 암호화 후 풀 수 없음(복호ㅗ하ㅗ 불가능)
양방향: 암호화 이후->kye->복호화

단방향: 사용자의 비밀번호 저장(SHA)
양방향: http(80) -> https(443)
*/

const crypto = require("crypto");
let pass = "123asdgrfdgvfdz!!!!!!!!!!!!!!!!!f4";
let pass2 = "123a";
let salt = "&n@1-#418G"
let encrypt = crypto.createHash("sha512").update(pass + salt).digest("base64");
let encrypt2 = crypto.createHash("sha512").update(pass2 + salt).digest("base64");
console.log(encrypt);
console.log(encrypt2);


