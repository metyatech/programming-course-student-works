// 送信ボタン押下時の動作
const form = document.getElementById('contactForm');
const resultPara = document.getElementById('formResult');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        resultPara.textContent = 'すべての項目を入力してください。';
        resultPara.style.color = 'red';
        return;
    }

    resultPara.textContent = `ありがとうございます、${name}さん！メッセージを受け取りました。`;
    resultPara.style.color = 'green';

    form.reset();
});