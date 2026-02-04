// ハンバーガーボタンの要素を取得
let hamBtnYoso = document.querySelector('.ham-btn');
// ドロワーの要素を取得
let drawerYoso = document.querySelector('.drawer');

let overlayYoso = document.querySelector('.overlay');

let hamIconYoso = document.querySelector('.ham-icon');

// ハンバーガーボタンがクリックされたときの処理
hamBtnYoso.addEventListener('click', () => {
  // ドロワー要素に対して、open クラスの付け外しを行う
  drawerYoso.classList.toggle('open');
  overlayYoso.classList.toggle('open');
  hamIconYoso.classList.toggle('open'); // ハンバーガーアイコン部分も open クラスの付け外しを行う
});

// オーバーレイ部分がクリックされたときの処理
overlayYoso.addEventListener('click', () => {
  drawerYoso.classList.remove('open'); // メニューを閉じる
  overlayYoso.classList.remove('open'); // オーバーレイ部分も閉じる
  hamIconYoso.classList.remove('open'); // ハンバーガーアイコン部分も open クラスを外す
});
