function questaoSoma() {
    const max = 99;
    const min = 12;
    const resultado = Math.floor(Math.random() * (max - min + 1) + min);
    const numero = Math.floor(Math.random() * (resultado - 8)) + 1;
    const resposta = resultado - numero;

    const opcoesSet = new Set();
    opcoesSet.add(resposta);

    while (opcoesSet.size < 4) {
        const max = resposta + 10;
        const min = resposta - 10;

        const opcao = Math.floor(Math.random() * (max - min + 1) + min);
        if (opcao === resposta || opcao < 1 || opcoesSet.has(opcao)) {
            continue;
        }
        opcoesSet.add(opcao);
    }

    const opcoes = Array.from(opcoesSet);
    opcoes.sort(() => Math.random() - 0.5);

    const questao = {
        numero: numero,
        operacao: '+',
        resultado: resultado,
        resposta: resposta,
        opcoes: opcoes
    };

    return questao;
}

function questaoSubtracao() {
    const maxNumero = 99;
    const minNumero = 20;
    const numero = Math.floor(Math.random() * (maxNumero - minNumero + 1) + minNumero);

    const maxResposta = numero - 5;
    const minResposta = 5;
    const resposta = Math.floor(Math.random() * (maxResposta - minResposta + 1) + minResposta);

    const resultado = numero - resposta;

    const opcoesSet = new Set();
    opcoesSet.add(resposta);

    while (opcoesSet.size < 4) {
        const max = resposta + 10;
        const min = resposta > 10 ? resposta - 10 : 1;
        const opcao = Math.floor(Math.random() * (max - min + 1) + min);
        if (opcao === resposta || opcao < 1 || opcoesSet.has(opcao)) {
            continue;
        }
        opcoesSet.add(opcao);
    }

    const opcoes = Array.from(opcoesSet).sort(() => Math.random() - 0.5);

    return {
        numero: numero,
        operacao: '-',
        resultado: resultado,
        resposta: resposta,
        opcoes: opcoes
    };
}

function questaoMultiplicacao() {
    const maxFator = 12;
    const minFator = 2;
    
    const numero = Math.floor(Math.random() * (maxFator - minFator + 1) + minFator);
    const resposta = Math.floor(Math.random() * (maxFator - minFator + 1) + minFator);
    
    const resultado = numero * resposta;
    
    const opcoesSet = new Set();
    opcoesSet.add(resposta);
    
    while (opcoesSet.size < 4) {
        const max = resposta + 5;
        const min = resposta > 5 ? resposta - 5 : 1;
        const opcao = Math.floor(Math.random() * (max - min + 1) + min);
        if (opcao === resposta || opcao < 1 || opcoesSet.has(opcao)) {
            continue;
        }
        opcoesSet.add(opcao);
    }
    
    const opcoes = Array.from(opcoesSet).sort(() => Math.random() - 0.5);
    
    return {
        numero: numero,
        operacao: 'x',
        resultado: resultado,
        resposta: resposta,
        opcoes: opcoes
    };
}

function questaoDivisao() {
    const minFator = 2;
    const maxFator = 12;

    const resposta = Math.floor(Math.random() * (maxFator - minFator + 1) + minFator);
    const resultado = Math.floor(Math.random() * (maxFator - minFator + 1) + minFator);

    const numero = resposta * resultado;

    const opcoesSet = new Set();
    opcoesSet.add(resposta);

    while (opcoesSet.size < 4) {
        const max = resposta + 5;
        const min = resposta > 5 ? resposta - 5 : 1;
        const opcao = Math.floor(Math.random() * (max - min + 1) + min);
        if (opcao === resposta || opcao < 1 || opcoesSet.has(opcao)) {
            continue;
        }
        opcoesSet.add(opcao);
    }

    const opcoes = Array.from(opcoesSet).sort(() => Math.random() - 0.5);

    return {
        numero: numero,
        operacao: '÷',
        resultado: resultado,
        resposta: resposta,
        opcoes: opcoes
    };
}
