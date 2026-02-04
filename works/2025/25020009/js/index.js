//スライダー
$('.slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
});

// box1
let box1Yoso = document.querySelector(".box1");
box1Yoso.addEventListener("click", function() {
  box1Yoso.classList.toggle("big");
});
// box2
let box2Yoso = document.querySelector(".box2");
box2Yoso.addEventListener("click", function() {
  box2Yoso.classList.toggle("big");
});
// box3
let box3Yoso = document.querySelector(".box3");
box3Yoso.addEventListener("click", function() {
  box3Yoso.classList.toggle("big");
});
// box4
let box4Yoso = document.querySelector(".box4");
box4Yoso.addEventListener("click", function() {
  box4Yoso.classList.toggle("big");
});
// box5
let box5Yoso = document.querySelector(".box5");
box5Yoso.addEventListener("click", function() {
  box5Yoso.classList.toggle("big");
});
// box6
let box6Yoso = document.querySelector(".box6");
box6Yoso.addEventListener("click", function() {
  box6Yoso.classList.toggle("big");
});
