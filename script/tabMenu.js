class TabMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let imgSrc = "/projectMarketM/"
        console.log(location.pathname)
        if(location.pathname == "/projectMarketM/" || location.pathname == "/projectMarketM/index.html"){
            // imgSrc = "./";
            this.shadowRoot.innerHTML = tabSrc(imgSrc, "active");
        }else if(location.pathname == "/projectMarketM/pages/chat/chatList.html"){
            // imgSrc = "../../";
            this.shadowRoot.innerHTML = tabSrc(imgSrc,"","active");
        }else if(location.pathname == "/projectMarketM/pages/profile/follow.html" || location.pathname == "/projectMarketM/pages/profile/index.html"){
            // 관리자, 회원, 비회원 쪼개기
            // imgSrc = "../../";
            this.shadowRoot.innerHTML = tabSrc(imgSrc,"","","","active");
        }else{
            // imgSrc = "../../";
            this.shadowRoot.innerHTML = tabSrc(imgSrc, "active");
        }
    }
}

function tabSrc(imgSrc, home, chat, post, profile){
    return `
<style>
    *{margin:0;padding:0;box-sizing: border-box; list-style: none;color:inherit;font-weight: normal;text-decoration: none;color:#767676;font-family: 'Spoqa Han Sans Neo', 'sans-serif';-webkit-tap-highlight-color : transparent !important;}    
    :host{background:white;}
    ul{display:flex;align-items: center;justify-content: space-between;height:100%;}
    ul li{font-size:10px;padding:8px 0 5px;flex:1;}
    ul li + li{margin-left:3.5%;}
    ul li span{max-width:24px;max-height:24px;margin:0 0 5px;}
    ul li img{height:100%;width:100%;}
    ul li img.fill{display:none;}
    ul li.active img.origin{display:none;}
    ul li.active img.fill{display:block;}
    ul li a{height:100%;width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;}
    ul li.active a{color:#F26E22}
</style>
        <ul>
            <li class="home ${home}">
                <a href="${imgSrc}">
                    <span><img src="${imgSrc}img/icon/icon-home.png" class="origin" alt="home"><img src="${imgSrc}img/icon/icon-home-fill.png" class="fill" alt="home"></span>홈
                </a>
            </li>
            <li class="chat ${chat}">
                <a href="${imgSrc}pages/chat/chatList.html">
                    <span><img src="${imgSrc}img/icon/icon-message-circle.png" class="origin" alt="chat"><img src="${imgSrc}img/icon/icon-message-circle-fill.png" class="fill" alt="chat"></span>채팅
                </a>
            </li>
            <li class="post ${post}">
                <a href="${imgSrc}pages/board/boardUpload.html">
                    <span><img src="${imgSrc}img/icon/icon-edit.png" alt="post"></span>게시물 작성
                </a>
            </li>
            <li class="profile ${profile}">
                <a href="${imgSrc}pages/profile/index.html">
                    <span><img src="${imgSrc}img/icon/icon-user.png" class="origin" alt="profile"><img src="${imgSrc}img/icon/icon-user-fill.png" class="fill" alt="profile"></span>프로필
                </a>
            </li>
        </ul>
    `;
}

customElements.define('custom-tab', TabMenu);