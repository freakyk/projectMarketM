// 게시판 코멘트 이미지 슬라이드
const board_swiper = new Swiper('.board_swiper', {
    pagination: {
        el: '.postPag',
    },
    slidesPerView: 1,
    spaceBetween: 15,
});