// index.js

// フェードインさせたい要素をすべて取得
const fadeElements = document.querySelectorAll('.js-fade');

// 要素が画面に入ってきたら実行する処理
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 画面内に入ったら 'is-visible' クラスを付与
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1 // 10%が見えたら実行
});


fadeElements.forEach(el => {
  observer.observe(el);
});