window.addEventListener('load', main)

function main() {
    // atualizarRecorde();
    sair();
}

function atualizarRecorde() {
    const recorde = document.getElementById('recorde');
    const jogador = document.getElementById('jogador');

    const recordeAtual = sessionStorage.getItem('recorde');
    const jogadorAtual = sessionStorage.getItem('jogador');

    if (recordeAtual) {
        recorde.textContent = recordeAtual;
    }

    if (jogadorAtual) {
        jogador.textContent = jogadorAtual;
    }
}

function sair() {
    const btSair = document.getElementById('bt-sair');
    btSair.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
}