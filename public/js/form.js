let logIn = document.getElementById("loginForm");
let passBtn = document.getElementById("passShown");
let togglePass = document.getElementById("togglePass");
passBtn.addEventListener('click', function passShown(event) {
    event.preventDefault();
    let passInput = document.getElementById("pass");
    const tipo = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', tipo);
    togglePass.style.opacity = 0; 
    setTimeout(() => {
        const cambiarImg = tipo === 'password' ? './imgs/seePass.png' : './imgs/hidePass.png';
        togglePass.setAttribute('src', cambiarImg);
        togglePass.style.opacity = 1; 
    }, 300); 
});