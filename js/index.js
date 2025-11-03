window.addEventListener('load', main)

function main() {
    sessionStorage.removeItem('nivel');
    sessionStorage.removeItem('nomes');
    iniciar();
    nivel();
    jogadores();
}

function iniciar() {
    const btIniciar = document.getElementById('bt-iniciar');
    const nivel = document.getElementById('nivel');

    btIniciar.addEventListener('click', () => {
        btIniciar.style.display = 'none';
        nivel.style.display = 'flex';
    });
}

function nivel() {
    const nivel = document.getElementById('nivel');
    const opcoes = document.getElementsByClassName('opcao-nivel');
    const jogadores = document.getElementById('jogadores');

    Array.from(opcoes).forEach(opcao => {
        opcao.addEventListener('click', () => {
            sessionStorage.setItem('nivel', opcao.id);
            nivel.style.display = 'none';
            jogadores.style.display = 'flex';
        });
    });
}

function jogadores() {
    const jogadores = document.getElementById('jogadores');
    const opcoes = document.getElementsByClassName('opcao-jogadores');

    Array.from(opcoes).forEach(opcao => {
        opcao.addEventListener('click', () => {
            jogadores.style.display = 'none';
            const quantidade = opcao.textContent.split(' ')[0];
            capturarNome(+quantidade);
        });
    });
}

function capturarNome(quantidade) {
    const areaNome = document.getElementById('area-nome');
    const iterador = document.getElementById('iterador');
    const nome = document.getElementById('nome');
    const btOk = document.getElementById('bt-ok');

    iterador.textContent = 1;
    areaNome.style.display = 'flex';
    const nomes = [];
    nome.focus();
    btOk.addEventListener('click', () => {
        nomes.push(nome.value);
        if (nomes.length === quantidade) {
            areaNome.style.display = 'none';
            sessionStorage.setItem('nomes', nomes.join(', '));
            window.location.href = 'matematica.html';
        }
        iterador.textContent = +iterador.textContent + 1;
        nome.value = '';
        nome.focus();
    });
}