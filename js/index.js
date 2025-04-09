function toggleMenu() {
    const menu = document.querySelector('.menu');
    const navOptions = document.querySelector('.nav-options');
    menu.classList.toggle('active');
    navOptions.classList.toggle('active');
}

function toggleColorMode(mode) {
    const body = document.body;
    const lightModeImg = document.querySelector('.color-mode-img');
    const darkModeImg = document.querySelectorAll('.color-mode-img')[1];

    lightModeImg.classList.remove('active');
    darkModeImg.classList.remove('active');

    if (mode === 'dark') {
        darkModeImg.classList.add('active');
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        lightModeImg.classList.add('active');
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
}