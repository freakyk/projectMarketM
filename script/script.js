// load splash animation after dom loaded
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector("#splash")){
        setTimeout(function(){
            document.querySelector("#splash").remove();
        }, 1400)
    }
});