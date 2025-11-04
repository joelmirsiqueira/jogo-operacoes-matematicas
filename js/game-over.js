const nivel = sessionStorage.getItem('nivel');
const resultados = sessionStorage.getItem('resultados');
if (!nivel || !resultados) {
    window.location.href = 'index.html';
}
const listaResultados = JSON.parse(resultados);
let vencedor;


window.addEventListener('load', main)


function main() {
    processarResultados();
    atualizarRecordes();
    voltar();
}

function processarResultados() {
    if (listaResultados.length === 1) {
        atualizarMensagem('game over');
    } else {
        listaResultados.sort((a, b) => b.pontos - a.pontos)
        if (listaResultados[0].pontos === listaResultados[1].pontos) {
            atualizarMensagem('empate');
        } else {
            vencedor = listaResultados[0];
            atualizarMensagem(`${vencedor.nome} venceu!`);
        }
    }
    exibirResultados();
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

function atualizarRecordes() {
    const recordesAtuais = localStorage.getItem('recordes');
    const nivel = sessionStorage.getItem('nivel');
    const maiorPontuacao = listaResultados[0];
    let recordes;
    if (listaResultados.length > 1 && !vencedor) {
        maiorPontuacao.nome = '';
    }
    if (recordesAtuais === null) {
        const recordesNovos = {
            Fácil: {},
            Médio: {},
            Difícil: {}
        }
        for (const item in recordesNovos) {
            recordesNovos[item] = {
                nome: '',
                pontos: 0
            }
        }
        recordesNovos[nivel] = maiorPontuacao;
        recordes = recordesNovos;
    } else {
        recordes = JSON.parse(recordesAtuais);
        if (maiorPontuacao.pontos > recordes[nivel].pontos) {
            recordes[nivel] = maiorPontuacao;
        }
    }
    localStorage.setItem('recordes', JSON.stringify(recordes));
    exibirRecordes(recordes[nivel]);
}

function exibirRecordes(item) {
    const nivelElement = document.getElementById('nivel');
    const nome = document.getElementById('nome');
    const pontos = document.getElementById('pontos');
    nivelElement.textContent = nivel.at(0).toUpperCase() + nivel.slice(1);
    nome.textContent = item.nome;
    pontos.textContent = item.pontos;
}

function voltar() {
    const btSair = document.getElementById('bt-sair');
    btSair.addEventListener('click', () => {
        sessionStorage.removeItem('resultados');
        window.location.href = 'index.html';
    });
}