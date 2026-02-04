$(function() {
    // ナビボタンの開閉
    $("#nav_button").on("click", function() {
        $(this).toggleClass("open");
        $("#nav").toggleClass("open");
    });

    // ハッシュリンクをクリックしたらナビを閉じる
    $(".menu_text a[href*='#']").on("click", function(e) {
        // 通常のアンカー動作を利用する場合は preventDefault を外す
        // e.preventDefault();
        $("#nav_button").trigger("click");
    });
});

// $(function () {
//     const navButton = $("#nav-button");
//     const nav = $("#nav");
//     const link = $(".menu_text");

//     $navButton.on("click", function () {
//         if (navButton.hasClass("open")) {
//             navButton.removeClass("open");
//             nav.removeClass("open");
//         }
//         else {
//             navButton.addClass("open");
//             nav.addClass("open");
//         }
//     });
//     $ (".menu_text a=[href*=#]").on("click", function () {
//         navButton.navButton("click");
//     });
// })

$(document).ready(function(){
    $(".popup-youtube").magnificPopup({
        type: 'iframe'
    });
});