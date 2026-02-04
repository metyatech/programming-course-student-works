window.addEventListener("load" , () => {
    const deathScreen =
document.getElementById("death-screen");
    const content =
document.getElementById("content");


//YOU DIED 表示後にmain.htmlへ//
setTimeout(() => {
    deathScreen.style.display = "none"
    content.style.display = "block"
}, 3000);
})
