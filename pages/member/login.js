//  [Convention] 🎨 : Fetch API
const fetchURL = "https://estapi.mandarin.weniv.co.kr";

const emailLabel = document.querySelector('.logForm .email');
const emailInput = document.querySelector('.logForm #email');
const pwLabel = document.querySelector('.logForm .pw');
const pwInput = document.querySelector('.logForm #pw');
const btnLogin = document.querySelector('.logForm .btnLogin');

// input 입력완료 시 로그인버튼 활성화
emailInput.addEventListener('blur',function(e){
    emailInput.setAttribute('data-true', true);
    btnActive();
});
pwInput.addEventListener('blur',function(e){
    pwInput.setAttribute('data-true', true);
    btnActive();
});
function btnActive(){
    emailPassed = emailInput.getAttribute('data-true');
    pwPassed = pwInput.getAttribute('data-true');
    if(emailPassed == "true" && pwPassed == "true"){
        btnLogin.disabled = false;
    }else{
        btnLogin.disabled = true;
    }
}
btnActive();

// 로그인완료
btnLogin.addEventListener('click',function(e){
    let emailValue = emailInput.value;
    let pwValue = pwInput.value;
    fetchLogin(emailValue, pwValue);
});

// 로그인 에러메세지
function loginValid(datas){
    let logWarn = document.querySelector('.logwarn');
    logWarn.style.display = "block";
    logWarn.textContent = "*" + datas;

    let mes = 'message' in datas;
    if(mes){
        let text = JSON.stringify(datas.message).split('"')[1];
        logWarn.style.display = "block";
        logWarn.textContent = "*" + text;
    }

    let userInfo = 'user' in datas;
    if(userInfo){
        logWarn.style.display = "none";
        sessionStorage.setItem('userToken',datas.user.token);
        location.href ="/projectMarketM/index.html";
    }
}

// customFunc 유효성 오류
function showErrText(label,input,message){
    let makeP = document.createElement('p');
    label.classList.remove('warn');
    label.classList.add('warn');
    if(label.querySelector('.warning')){
        label.querySelectorAll('.warning').forEach((e) => e.remove());
    }
    label.append(makeP);
    makeP.classList.add('warning');
    makeP.textContent = "*"+message;
    input.setAttribute('data-true',false);
}
// customFunc 유효성 통과
function trueValid(label,input){
    label.classList.remove('warn');
    label.querySelectorAll('.warning').forEach((e) => e.remove());
    input.setAttribute('data-true',true);
}

// 🎨 로그인
async function fetchLogin(email, pw){
    const customURL = "/user/login";
    try{
        const fetchData = await fetch(`${fetchURL}${customURL}`,{
            method : "POST",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                "user": {
                    "email": email,
				    "password": pw
                }
            })
        })
        const datas = await fetchData.json();
        console.log(datas);
        loginValid(datas);
        return datas;
    }catch(error){
        // console.log(error);
    }
}