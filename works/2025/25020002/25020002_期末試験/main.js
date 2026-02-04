/* =========================================
   1. ローディング画面の制御（安全装置付き）
   ========================================= */

// ローディングを消す関数
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('loaded');
    }
}

// ページが完全に読み込まれたら実行
window.addEventListener('load', () => {
    // 0.8秒待ってから消す
    setTimeout(hideLoading, 800);
});

// 【重要】万が一読み込みが止まっても、3秒後には強制的に表示させる
setTimeout(hideLoading, 3000);


/* =========================================
   2. スクロールアニメーション
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 監視対象の要素を登録
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});