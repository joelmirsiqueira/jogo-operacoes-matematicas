window.addEventListener('load', main)

function main() {
    const { nivel, resultadosLista } = carregarResultados();
    const { vencedor, mensagem } = determinarVencedor(resultadosLista);
    atualizarMensagem(mensagem);
    exibirResultados(resultadosLista);
    atualizarRecordes(nivel, resultadosLista);
    voltar();
}

function carregarResultados() {
    const nivel = sessionStorage.getItem('nivel');
    const resultadosSession = sessionStorage.getItem('resultados');
    if (!nivel || !resultadosSession) {
        window.location.href = 'index.html';
        return;
    }
    const resultadosLista = JSON.parse(resultadosSession);    
    return {
        nivel: nivel,
        resultadosLista: resultadosLista
    }
}

function atualizarMensagem(texto) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto.toUpperCase();
}

function determinarVencedor(resultadosLista) {
    let vencedor;
    let mensagem;
    if (resultadosLista.length === 1) {
        mensagem = 'game over';
    } else {
        resultadosLista.sort((a, b) => b.pontos - a.pontos)
        if (resultadosLista[0].pontos === resultadosLista[1].pontos) {
            mensagem = 'empate';
        } else {
            vencedor = resultadosLista[0];
            mensagem = `${vencedor.nome} venceu!`;
        }
    }
    return {
        vencedor: vencedor,
        mensagem: mensagem
    }
}

function exibirResultados(listaResultados) {
    listaResultados.forEach(resultado => {
        const lista = document.getElementById('lista-result');
        const item = document.createElement('li');
        item.textContent = `${resultado.nome} - ${resultado.pontos} pontos`;
        lista.appendChild(item);
    });
}

function exibirRecorde(nivel, recorde) {
    const recordeNivel = document.getElementById('recorde-nivel');
    const recordeConteudo = document.getElementById('recorde-conteudo');
    recordeNivel.textContent = nivel;    
    recordeConteudo.textContent = `${recorde.nome} - ${recorde.pontos} pontos`;
}

function atualizarRecordes(nivel, resultadosLista) {
    const recordes = JSON.parse(localStorage.getItem('recordes'));
    const maiorPontuacao = resultadosLista[0];
    if (resultadosLista.length > 1 && !vencedor) {
        maiorPontuacao.nome = '';
    }
    if (maiorPontuacao.pontos > recordes[nivel].pontos) {
        recordes[nivel] = maiorPontuacao;
    }
    localStorage.setItem('recordes', JSON.stringify(recordes));
    exibirRecorde(nivel, recordes[nivel]);
}

function voltar() {
    const btSair = document.getElementById('bt-sair');
    btSair.addEventListener('click', () => {
        sessionStorage.removeItem('resultados');
        window.location.href = 'index.html';
    });
}