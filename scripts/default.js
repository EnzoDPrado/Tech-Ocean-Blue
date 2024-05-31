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

const header = document.querySelector('header');

// Função para adicionar ou remover a classe .header-scrolled com base no scroll da página
function handleScroll() {
    if (window.scrollY > window.innerHeight / 1.2) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

// Adiciona um event listener para o evento scroll
window.addEventListener('scroll', handleScroll);