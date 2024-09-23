class TabMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
            *{margin:0;padding:0;box-sizing: border-box; list-style: none;color:inherit;font-weight: normal;text-decoration: none;font-family: 'SpoqaHanSansNeo-Regular';color:#767676;}    
            :host{background:white;}
            ul{display:flex;align-items: center;justify-content: space-between;height:100%;}
            ul li{font-size:10px;padding:10px 0 5px;flex:1;}
            ul li + li{margin-left:3.5%;}
            ul li span{max-width:24px;max-height:24px;margin:0 0 3px;}
            ul li img{height:100%;width:100%;}
            ul li img.fill{display:none;}
            ul li.active img.origin{display:none;}
            ul li.active img.fill{display:block;}
            ul li a{height:100%;width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;}
            ul li.active a{color:#F26E22}
        </style>
        <ul>
            <li class="home active">
                <a href="./">
                    <span><img src="./img/icon/icon-home.png" class="origin" alt="home"><img src="./img/icon/icon-home-fill.png" class="fill" alt="home"></span>홈
                </a>
            </li>
            <li class="chat">
                <a href="./pages/chat/chatList.html">
                    <span><img src="./img/icon/icon-message-circle.png" class="origin" alt="chat"><img src="./img/icon/icon-message-circle-fill.png" class="fill" alt="chat"></span>채팅
                </a>
            </li>
            <li class="post">
                <a href="./pages/board/boardUpload.html">
                    <span><img src="./img/icon/icon-edit.png" alt="post"></span>게시물 작성
                </a>
            </li>
            <li class="profile">
                <a href="./pages/profile/index.html">
                    <span><img src="./img/icon/icon-user.png" class="origin" alt="profile"><img src="./img/icon/icon-user-fill.png" class="fill" alt="profile"></span>프로필
                </a>
            </li>
        </ul>
      `;
    }
}
customElements.define('custom-tab', TabMenu);