// load splash animation after dom loaded
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector("#splash")){
        setTimeout(function(){
            document.querySelector("#splash").remove();
        }, 1400)
    }
});

// textArea 높이조절
const $textArea = document.querySelector('.boardUpload .uploadDetail .txtArea')
if($textArea){
    $textArea.addEventListener('input',function(e){
        e.target.style.height = 0;
        e.target.style.height = e.target.scrollHeight + "px";
    })
}
const $textArea2 = document.querySelector('#chatDetail .sendArea .sendTxt')
if($textArea2){
    $textArea2.addEventListener('input',function(e){
        e.target.style.height = "17px";
        e.target.style.height = e.target.scrollHeight + "px";
    })
}
const $textArea3 = document.querySelector('#boardDetail .commentArea .commentTxt')
if($textArea3){
    $textArea3.addEventListener('input',function(e){
        e.target.style.height = "17px";
        e.target.style.height = e.target.scrollHeight + "px";
    })
}