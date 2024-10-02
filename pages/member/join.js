//  [Convention] 🎨 : Fetch API
const fetchURL = "https://estapi.mandarin.weniv.co.kr";

// 가입 step1 -----------------------------------------------------
if(document.querySelector("#joinStep1")){
    const emailLabel = document.querySelector('.joinForm .email');
    const emailInput = document.querySelector('.joinForm #email');
    const pwLabel = document.querySelector('.joinForm .pw');
    const pwInput = document.querySelector('.joinForm #pw');
    const btnJoinNext = document.querySelector('.joinForm .btnNext');
    let emailPassed = emailInput.getAttribute('data-true');
    let pwPassed = pwInput.getAttribute('data-true');

    // valid
    function validate(){
        // email
        emailInput.addEventListener('blur',function(e){
            let thisValue = e.target.value;
            fetchEmailValid(thisValue);
        });
        // password
        pwInput.addEventListener('blur',function(e){
            let thisValue = e.target.value.trim();
            if(thisValue.length < 6){
                showErrText(pwLabel,pwInput,"비밀번호는 6자 이상이어야 합니다.");
                btnJoinNext.disabled = true;
            }else{
                trueValid(pwLabel,pwInput);
                passValid();
            }
        });
    }
    validate();

    // 이메일 유효성 에러메세지
    function emailValid(datas){
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        let message = 'message' in datas;
        if(message){
            if(datas.message !== "사용 가능한 이메일 입니다."){
                showErrText(emailLabel,emailInput,datas.message);
                btnJoinNext.disabled = true;
            }else{
                if(emailCheck.test(emailInput.value) == false){
                    showErrText(emailLabel,emailInput,"유효한 이메일을 입력해주세요.");
                }else{
                    trueValid(emailLabel,emailInput);
                    passValid();
                }
            }
        }
    }

    // 유효성확인 후 다음 버튼활성화
    function passValid(){
        emailPassed = emailInput.getAttribute('data-true');
        pwPassed = pwInput.getAttribute('data-true');
        if(emailPassed == "true" && pwPassed == "true"){
            btnJoinNext.disabled = false;
        }else{
            btnJoinNext.disabled = true;
        }
    }
    emailInput.addEventListener('change',(e) => {passValid();});
    pwInput.addEventListener('change',(e) => {passValid();});

    // 다음버튼 유효성검사
    btnJoinNext.addEventListener('click',function(e){
        // const emailCheck = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const pwCheck = /^.{6,}$/;
        validate();
        if(emailCheck.test(emailInput.value) == true && pwCheck.test(pwInput.value) == true){
            btnJoinNext.disabled = false;
            console.log()
            sessionStorage.setItem('userEmail',emailInput.value);
            sessionStorage.setItem('userPw',pwInput.value);
            setTimeout(function(){
                location.href ="./joinProfile.html";
            },300);
        }else{
            btnJoinNext.disabled = true;
        }
    });
}

// 가입 step2 -----------------------------------------------------
if(document.querySelector("#joinStep2")){
    const getEmail = sessionStorage.getItem('userEmail');
    const getPw = sessionStorage.getItem('userPw');
    const fileInput = document.querySelector('.joinForm #userimg[type="file"]');
    const fileImg = document.querySelector('.joinForm .userImg img');
    let fileName = "";
    const nameLabel = document.querySelector('.joinForm .username');
    const nameInput = document.querySelector('.joinForm #username');
    const idLabel = document.querySelector('.joinForm .id');
    const idInput = document.querySelector('.joinForm #id');
    // const introLabel = document.querySelector('.joinForm .intro');
    const introInput = document.querySelector('.joinForm #intro');
    const btnJoin = document.querySelector('.joinForm .btnJoin');
    let namePassed = nameInput.getAttribute('data-true');
    let idPassed = idInput.getAttribute('data-true');

    // valid
    function validate(){
        // username
        nameInput.addEventListener('input',function(e){
            let thisValue = e.target.value;
            if(thisValue.length > 10){
                e.target.value = thisValue.slice(0, 10);
            }else{
                e.target.value = thisValue;
            }
            btnActive();
        });
        nameInput.addEventListener('blur',function(e){
            let thisValue = e.target.value;
            if(thisValue.length < 2){
                showErrText(nameLabel,nameInput,"2글자 이상 입력해주세요.");
                idInput.setAttribute('data-true',false);
            }else{
                trueValid(nameLabel,nameInput);
                idInput.setAttribute('data-true',true);
            }
            btnActive();
        });

        // id (accountname)
        idInput.addEventListener('input',function(e){
            let idCheck = /^[a-zA-Z0-9_\.]+$/;
            let thisValue = e.target.value.trim();
            e.target.value = thisValue;
            if(idCheck.test(thisValue)){
                fetchIdValid(thisValue);
            }else{
                if(idInput.value == ""){
                    trueValid(idLabel,idInput);
                    idInput.setAttribute('data-true',false);
                }else{
                    showErrText(idLabel,idInput,"영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.");
                }
            }
            btnActive();
        });
        idInput.addEventListener('blur',function(e){
            if(idInput.value == ""){
                idInput.setAttribute('data-true',false);
                showErrText(idLabel,idInput,"계정 ID는 필수 입력사항 입니다.");
            }
            btnActive();
        });
    }
    validate();

    // id(accountname) 유효성 에러메세지
    function idValid(datas){
        let message = 'message' in datas;
        if(message){
            if(datas.message !== "사용 가능한 계정ID 입니다."){
                showErrText(idLabel,idInput,datas.message);
            }else{
                idInput.setAttribute('data-true',true);
                trueValid(idLabel,idInput);
            }
        }
    }

    // 버튼 활성화
    idInput.addEventListener('change',function(e){btnActive();});
    function btnActive(){
        namePassed = nameInput.getAttribute('data-true');
        idPassed = idInput.getAttribute('data-true');
        if(namePassed == "true" && idPassed == "true"){
            btnJoin.disabled = false;
            if(idInput.value == ""){
                idInput.setAttribute('data-true',false);
                showErrText(idLabel,idInput,"계정 ID는 필수 입력사항 입니다.");
                btnJoin.disabled = true;
            }
        }else{
            // validate();
            btnJoin.disabled = true;
        }
    }
    btnActive();

    // 프로필 업로드
    fileInput.addEventListener('change', function(e){
        // 프로필 이미지 업로드 (*.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif, *.heic)
        const file = fileInput.files[0];
        const preView = new FileReader();

        if(this.files && this.files[0]){
            preView.onload = function(e){
                fileImg.src = e.target.result;
                fileName = fetchUploadProfile(file);
            }
            let type = this.files[0].type;
            if(!type.includes('image/jpg') && !type.includes('image/gif') && !type.includes('image/png') && !type.includes('image/jpeg') && !type.includes('image/bmp') && !type.includes('image/tif') && !type.includes('image/heic')){
                alert('이미지 확장자는 *.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif, *.heic 만 가능합니다');
                this.value = "";
                fileImg.src = "../../img/basic-profile-img.png";
                return;
            }
            preView.readAsDataURL(this.files[0]);
        }else{
            this.value = "";
            fileImg.src = "../../img/basic-profile-img.png";
        }
    });

    // 회원가입완료
    btnJoin.addEventListener('click', async function(e){
        if(nameInput.value.length < 2){
            btnJoin.disabled = true;
        }else if(idInput.value == ""){
            idInput.setAttribute('data-true',false);
            showErrText(idLabel,idInput,"계정 ID는 필수 입력사항 입니다.");
            btnJoin.disabled = true;
        }else{
            let profileLength = await fileName;
            let profileImg = profileLength.filename;
            let imgName = "";
            if(profileImg == undefined){
                // 프로필 이미지 등록 x
            }else{
                // 프로필 이미지 등록 o
                imgName = profileImg;
            }
            setTimeout(function(){
                // email, pw, username, id, intro, image
                fetchJoinUser(getEmail,getPw,nameInput.value,idInput.value,introInput.value,`${fetchURL}/${imgName}`);
                location.href ="/projectMarketM/index.html";
            },300);
        }
    });
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

// 🎨 가입하기
async function fetchJoinUser(email,pw,username,id,intro,image){
    const customURL = "/user";
    try{
        const fetchData = await fetch(`${fetchURL}${customURL}`,{
            method : "POST",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                "user": {
                    "username": username,
                    "email": email,
                    "password": pw,
                    "accountname": id,
                    "intro": intro,
                    "image": image
                }
            })
        })
        const datas = await fetchData.json();
        console.log(datas);
        return datas;
    }catch(error){
        console.log(error);
    }
}

// 🎨 아이디 유효성
async function fetchIdValid(id){
    const customURL = "/user/accountnamevalid";
    try{
        const fetchData = await fetch(`${fetchURL}${customURL}`,{
            method : "POST",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                "user": {
                    "accountname": id,
                }
            })
        })
        const datas = await fetchData.json();
        idValid(datas);
        return datas;
    }catch(error){
        console.log(error);
    }
}

// 🎨 이메일 유효성
async function fetchEmailValid(email){
    const customURL = "/user/emailvalid";
    try{
        const fetchData = await fetch(`${fetchURL}${customURL}`,{
            method : "POST",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                "user": {
                    "email": email,
                }
            })
        })
        const datas = await fetchData.json();
        console.log(datas);
        emailValid(datas);
        return datas;
    }catch(error){
        console.log(error);
    }
}

// 🎨 프로필 등록
async function fetchUploadProfile(data){
    const customURL = "/image/uploadfile";
    const formData = new FormData();
    formData.append("image",data);

    try{
        const fetchData = await fetch(`${fetchURL}${customURL}`,{
            method : "POST",
            // headers : {
            //     "Content-type" : "multipart/form-data"
            // },
            body : formData
        })
        const datas = await fetchData.json();
        console.log(datas);
        // fileName = datas.filename;
        return datas;
    }catch(error){
        console.log(error);
    }
}