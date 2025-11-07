window.addEventListener('load', main)
let quantidade;
const nomes = [];

function main() {
    const recordes = carregarRecordes();
    exibirRecordes(recordes);
    ativarBtIniciar();
    ativarBtsNivel();
    ativarBtsjogadores();
    ativarSalvaNome();
    ativarSalvaNomeEnter();
}

function carregarRecordes() {
    let recordes = localStorage.getItem('recordes');
    if (recordes) {
        return JSON.parse(recordes);
    } else {
        recordes = {
            Fácil: 'Sem recorde',
            Médio: 'Sem recorde',
            Difícil: 'Sem recorde'
        };
        localStorage.setItem('recordes', JSON.stringify(recordes));
        return recordes;
    }
}

function preencherRecorde(listaRecordes) {
    const recordeNivel = document.getElementById('recorde-nivel');
    const recordeConteudo = document.getElementById('recorde-conteudo');
    const recordeAtual = listaRecordes.shift();
    listaRecordes.push(recordeAtual);
    recordeNivel.textContent = recordeAtual[0];
    recordeConteudo.textContent = recordeAtual[1];
}

function exibirRecordes(recordes) {
    const listaRecordes = Object.entries(recordes);
    preencherRecorde(listaRecordes);
    setInterval(() => {
        preencherRecorde(listaRecordes);
    }, 3000);
}

function ativarBtIniciar() {
    sessionStorage.clear()
    const btIniciar = document.getElementById('bt-iniciar');
    const nivel = document.getElementById('nivel');
    const ilustracao = document.getElementById('ilustracao');
    btIniciar.addEventListener('click', () => {
        btIniciar.style.display = 'none';
        ilustracao.style.display = 'none';
        nivel.style.display = 'flex';
    });
}

function ativarBtsNivel() {
    const nivel = document.getElementById('nivel');
    const opcoes = document.getElementsByClassName('opcao-nivel');
    const jogadores = document.getElementById('jogadores');
    Array.from(opcoes).forEach(opcao => {
        opcao.addEventListener('click', () => {
            sessionStorage.setItem('nivel', opcao.textContent);
            nivel.style.display = 'none';
            jogadores.style.display = 'flex';
        });
    });
}

function ativarBtsjogadores() {
    const jogadores = document.getElementById('jogadores');
    const opcoes = document.getElementsByClassName('opcao-jogadores');
    const areaNome = document.getElementById('area-nome');
    const nome = document.getElementById('nome');
    Array.from(opcoes).forEach(opcao => {
        opcao.addEventListener('click', () => {
            jogadores.style.display = 'none';
            quantidade = +opcao.textContent.split(' ')[0];
            areaNome.style.display = 'flex';
            nome.focus();
        });
    });
}

function ativarSalvaNome() {
    const areaNome = document.getElementById('area-nome');
    const nome = document.getElementById('nome');
    const btOk = document.getElementById('bt-ok');
    const iterador = document.getElementById('iterador');
    iterador.textContent = 1;
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

function ativarSalvaNomeEnter() {
    const nome = document.getElementById('nome');
    const btOk = document.getElementById('bt-ok');
    nome.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            btOk.click();
        }
    });
}