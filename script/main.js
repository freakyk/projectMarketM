// 회원, 비회원 경로변경
let hasToken = sessionStorage.getItem('userToken');
if(!hasToken){
    location.href ="/projectMarketM/pages/member/login.html";
}