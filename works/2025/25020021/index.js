document.addEventListener('DOMContentLoaded', () => {
    const ddMenuYoso = document.querySelector('.dd-menu');
    const submenu = ddMenuYoso.querySelector('.dd-submenu');

    ddMenuYoso.addEventListener('mouseenter', () => {
        submenu.classList.add('open');
    });

    ddMenuYoso.addEventListener('mouseleave', () => {
        submenu.classList.remove('open');
    });
});
