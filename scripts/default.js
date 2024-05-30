function abrirMenu () {
    const menu = document.querySelector('.sidebar');
    menu.classList.remove('close');
    const main = document.querySelector('main');
    main.classList.toggle('opacity');
}

function fecharMenu () {
    const menu = document.querySelector('.sidebar');
    menu.classList.toggle('close');
    const main = document.querySelector('main');
    main.classList.remove('opacity');
}

function redirectPage(pageRedirect, index = false) {
    directory = './'
    if(!index && pageRedirect == 'index') {
        directory = '../' 
    } else if(index && pageRedirect != 'index') {
        directory = 'pages/'
    } 
    window.location.assign(directory + pageRedirect + '.html');
}