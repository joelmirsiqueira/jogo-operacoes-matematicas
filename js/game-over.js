
const resultados = sessionStorage.getItem('resultados');
if (resultados === null) {
    // window.location.href = 'index.html';
}
// sessionStorage.removeItem('resultados');
const listaResultados = JSON.parse(resultados);

window.addEventListener('load', main)


function main() {
    // atualizarRecorde();
    sair();
}

function processarResultados() {
    if (listaResultados.length === 1) {
        atualizarMensagem('game over')
    } else {
        listaResultados.sort((a, b) => b.pontos - a.pontos)
        const vencedor = listaResultados[0];
        exibirResultados();
    }
}

function exibirResultados() {
    const lista = document.getElementById('lista-result');
    listaResultados.forEach(resultado => {
        const item = document.createElement('li');
        item.textContent = `${resultado.nome} => ${resultado.pontos}`;
        lista.appendChild(item);
    });
}

function atualizarMensagem(texto) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto.toUpperCase();
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