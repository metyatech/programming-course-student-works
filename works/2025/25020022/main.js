/* =========================================
   1. ローディング (KICK OFF)
   ========================================= */
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('loaded');
    }
}

window.addEventListener('load', () => {
    setTimeout(hideLoading, 1000); // 1秒キックオフ表示
});
setTimeout(hideLoading, 3000); // 安全装置


/* =========================================
   2. ボールカーソル (ドリブルするような遅延追従)
   ========================================= */
const cursor = document.getElementById('cursor-ball');

if (cursor) {
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;

    // マウス位置取得
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // アニメーションループ (慣性をつける)
    function animateCursor() {
        // 現在地と目標値の差分を少しずつ埋める（0.1の係数で遅延させる）
        ballX += (mouseX - ballX) * 0.15;
        ballY += (mouseY - ballY) * 0.15;

        cursor.style.left = `${ballX}px`;
        cursor.style.top = `${ballY}px`;
        
        // ボールが転がるように回転させる（移動距離に応じて）
        cursor.style.transform = `translate(-50%, -50%) rotate(${ballX * 2}deg)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ホバーエフェクト
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}


/* =========================================
   3. スクロールアニメーション & スタッツバー
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // スキルバーの場合、中のfill要素の幅をアニメーション
            if (entry.target.classList.contains('stat-item')) {
                // CSS transitionに任せるため、ここではクラス付与のみ
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up, .stat-item').forEach(el => {
    observer.observe(el);
});