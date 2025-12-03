document.getElementById('year').textContent = new Date().getFullYear();

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

// collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
