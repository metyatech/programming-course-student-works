document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. メニュー周りの制御
       ========================================= */
    const navItems = document.querySelectorAll('.menu > li');
    navItems.forEach(li => {
        const link = li.querySelector('a');
        if (li.querySelector('ul')) {
            link.addEventListener('click', () => {
                if (window.innerWidth > 768) {
                    li.classList.toggle('open');
                }
            });
        }
    });

    document.addEventListener('click', (e) => {
        navItems.forEach(li => {
            if (!li.contains(e.target)) {
                li.classList.remove('open');
            }
        });
    });

    const hamburger = document.getElementById('js-hamburger');
    const drawer = document.getElementById('js-drawer');
    const overlay = document.getElementById('js-overlay');

    if (hamburger && drawer && overlay) {
        const toggleMenu = () => {
            hamburger.classList.toggle('is-active');
            drawer.classList.toggle('is-open');
            overlay.classList.toggle('is-open');
        };

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        const drawerLinks = document.querySelectorAll('.drawer-list a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* =========================================
       2. モーダル制御（キャラ・マップ共通）
       ========================================= */
    const modal = document.getElementById('char-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close'); 
    
    const charCards = document.querySelectorAll('.char-card');
    charCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.querySelector('img').src;
            const jobTitle = card.querySelector('.job-title').innerText;
            const charName = card.dataset.name;
            const description = card.dataset.desc;

            const isGraveKeeper = card.querySelector('.char-img').classList.contains('grave-keeper-adjust');
            modalImg.classList.toggle('grave-focus', isGraveKeeper);

            modalImg.src = imgPath;
            modalName.innerHTML = `<span class="job-title">${jobTitle}</span><br><span class="char-name">${charName}</span>`; 
            modalDesc.innerText = description;
            modal.classList.add('is-visible');
        });
    });

    const mapCards = document.querySelectorAll('.map-card');
    mapCards.forEach(card => {
        card.addEventListener('click', () => {
            modalImg.classList.remove('grave-focus');
            modalImg.src = card.querySelector('img').src;
            modalName.innerHTML = `<span class="char-name" style="font-size:2rem; border-bottom:3px solid #ff4d4d; padding-bottom:10px; display:inline-block; margin-bottom:20px;">${card.dataset.name}</span>`; 
            modalDesc.innerText = card.dataset.desc;
            modal.classList.add('is-visible');
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('is-visible'));
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('is-visible');
        });
    }

    /* =========================================
       3. マップスライドの制御
       ========================================= */
    const slider = document.getElementById('js-slider');
    const prevBtn = document.getElementById('js-prev');
    const nextBtn = document.getElementById('js-next');
    
    let counter = 0; 
    let timer; 

    function getMaxCount() {
        const totalCards = document.querySelectorAll('.map-card').length;
        const isMobile = window.innerWidth <= 768;
        return isMobile ? totalCards - 1 : totalCards - 3;
    }

    function updateSlider() {
        const card = document.querySelector('.map-card');
        if (!card || !slider) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // スマホ版：％指定にすることで1pxの計算誤差（ズレ）を完全に防止
            slider.style.transform = `translateX(${-100 * counter}%)`;
        } else {
            // PC版：カード幅 + 隙間20px
            const cardWidth = card.getBoundingClientRect().width + 20; 
            slider.style.transform = `translateX(${-cardWidth * counter}px)`;
        }
    }

    function nextSlide() {
        const maxCount = getMaxCount();
        counter = (counter >= maxCount) ? 0 : counter + 1;
        updateSlider();
    }

    function prevSlide() {
        const maxCount = getMaxCount();
        counter = (counter <= 0) ? maxCount : counter - 1;
        updateSlider();
    }

    function startAutoPlay() {
        timer = setInterval(nextSlide, 3000);
    }

    function resetAutoPlay() {
        clearInterval(timer);
        startAutoPlay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            resetAutoPlay();
        });
    }

    window.addEventListener('resize', () => {
        counter = 0; 
        updateSlider();
    });

    startAutoPlay();

    /* =========================================
       4. スクロールアニメーション
       ========================================= */
    const reveal = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", reveal);
    reveal();
});