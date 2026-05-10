// Botão Menu
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');

btnMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('aberto');
});