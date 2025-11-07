sessionStorage.removeItem('resultados')
const nivel = sessionStorage.getItem('nivel');
const nomes = sessionStorage.getItem('nomes');
if (nivel === null || nomes === null) {
    window.location.href = 'index.html';
}
const listaJogadores = [];
const resultados = [];
let listaGeradores = [];
let jogadorAtual;
let questaoAtual;
let contadorId;
const duracao = 30;


window.addEventListener('load', main)

function main() {
    criarJogadores();
    habilitarOpcoes();
    habilitarComecar();
    sair();
    proximoJogador();
}

function criarJogadores() {
    const nomesArray = nomes.split(', ');
    nomesArray.forEach(nome => {
        const jogador = {
            nome: nome,
            pontos: 0,
            vidas: 3
        }
        listaJogadores.push(jogador);
    })
    sessionStorage.removeItem('nomes');
}

function estabelecerDificuldade() {
    if (nivel === 'Fácil') {
        listaGeradores = [questaoSoma];
    } else if (nivel === 'Médio') {
        listaGeradores = [questaoSoma, questaoSubtracao];
    } else {
        listaGeradores = [questaoSoma, questaoSubtracao, questaoMultiplicacao, questaoDivisao];
    }
}

function habilitarOpcoes() {
    const opcoes = document.getElementsByClassName('opcao');
    const resposta = document.getElementById('resposta');
    Array.from(opcoes).forEach(opcao => {
        opcao.addEventListener('mouseover', () => {
            resposta.textContent = opcao.textContent;
            resposta.style.color = 'blue';
            opcao.style.backgroundColor = '#006cf8ff';
        })
        opcao.addEventListener('mouseleave', () => {
            resposta.textContent = '?';
            resposta.style.color = 'black';
            opcao.style.backgroundColor = '#e3e999';
        })
        opcao.addEventListener('click', () => {
            verificarResposta(+opcao.textContent);
        })
    })
}

function habilitarComecar() {
    const btComecar = document.getElementById('bt-comecar');
    btComecar.addEventListener('click', () => {
        btComecar.hidden = true;
        configuraExibicao('flex');
        iniciar();
    })
}

function proximoJogador() {
    estabelecerDificuldade();
    const btComecar = document.getElementById('bt-comecar');
    resetarContador();
    if (jogadorAtual === undefined) {
        jogadorAtual = listaJogadores.shift();
    } else {
        resultados.push({
            nome: jogadorAtual.nome,
            pontos: jogadorAtual.pontos,
        })
        if (listaJogadores.length > 0) {
            jogadorAtual = listaJogadores.shift();
        } else {
            encerrarJogo();
        }
    }
    configuraExibicao('none');
    atualizarJogador();
    btComecar.hidden = false;
}

function resetarContador() {
    clearInterval(contadorId);
    contadorId = undefined;
    const tempo = document.getElementById('tempo');
    tempo.textContent = duracao;
}

function configuraExibicao(display) {
    const campos = ['tempo', 'pergunta', 'opcoes', 'resultado']
    campos.forEach(campo => {
        document.getElementsByClassName(campo)[0].style.display = display;
    })
}

function iniciar() {
    GerarQuestao();
    contadorId = setInterval(() => {
        tempo.textContent = +tempo.textContent - 1;
        if (+tempo.textContent < 1) {
            atualizarMensagem('Seu tempo acabou!', 'blue');
        }
        if (+tempo.textContent < 0) {
            proximoJogador();
        }
    }, 1000);
}

function atualizarJogador() {
    const pontos = document.getElementById('pontos');
    const vidas = document.getElementById('vidas');
    const nome = document.getElementById('nome-jogador');
    pontos.textContent = jogadorAtual.pontos;
    vidas.textContent = jogadorAtual.vidas;
    nome.textContent = jogadorAtual.nome;
}

function GerarQuestao() {
    const numero = document.getElementById('numero');
    const operacao = document.getElementById('operacao');
    const resposta = document.getElementById('resposta');
    const resultado = document.getElementById('resultado');
    const opcoes = document.getElementsByClassName('opcao');
    const questao = proximaQuestao();

    numero.textContent = questao.numero;
    operacao.textContent = questao.operacao;
    resposta.textContent = '?';
    resposta.style.color = 'black';
    resultado.textContent = questao.resultado;

    Array.from(opcoes).forEach(opcao => {
        opcao.textContent = questao.opcoes.pop();
        opcao.style.backgroundColor = '#e3e999';
    })
    atualizarMensagem('', 'black');
    questaoAtual = questao;
}

function proximaQuestao() {
    const atual = listaGeradores.shift();
    listaGeradores.push(atual);
    return atual();
}

function verificarResposta(opcao) {
    const opcoes = document.getElementsByClassName('opcao');
    const respostaCorreta = questaoAtual.resposta;
    if (opcao === respostaCorreta) {
        atualizarMensagem('Resposta correta!', 'green');
        jogadorAtual.pontos += 10;
    } else {
        atualizarMensagem('Resposta incorreta!', 'red');
        if (jogadorAtual.pontos > 0) {
            jogadorAtual.pontos -= 2;
        }
        diminuirVidas();
    }
    atualizarJogador();
    Array.from(opcoes).forEach(opcao => {
        if (+opcao.textContent === respostaCorreta) {
            opcao.style.backgroundColor = 'green';
        }
    })
    setTimeout(() => {
        GerarQuestao();
    }, 1000);
}

function diminuirVidas() {
    const vidas = document.getElementById('vidas');
    vidas.textContent = +vidas.textContent - 1;
    jogadorAtual.vidas -= 1;
    if (jogadorAtual.vidas === 0) {
        proximoJogador();
    }
}

function atualizarMensagem(texto, cor) {
    const resposta = document.getElementById('resposta');
    const mensagem = document.getElementById('mensagem');
    resposta.style.color = cor;
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

function encerrarJogo() {
    sessionStorage.setItem('resultados', JSON.stringify(resultados));
    window.location.href = 'game-over.html';
}

function sair() {
    const btSair = document.getElementById('bt-sair');
    btSair.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
}