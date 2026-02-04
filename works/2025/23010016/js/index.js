// 監視対象の要素
const scrollElements = document.querySelectorAll(".fade-up");

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        // 要素が画面の下から100px入ったら表示
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            el.classList.add("in-view");
        }
    });
};

// スクロール時とロード時に実行
window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);