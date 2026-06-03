function calcularMistura() {
    const pA = document.getElementById('produtoA').value;
    const pB = document.getElementById('produtoB').value;
    const quadro = document.getElementById('quadroResultado');
    const titulo = document.getElementById('statusTitulo');
    const descricao = document.getElementById('statusDescricao');

    if (!pA || !pB) {
        quadro.className = "resultado-box";
        return;
    }

    if (pA === pB) {
        mostrarResposta("seguro", "✓ Mistura sem reação", "Misturar o mesmo produto não gera novos perigos químicos.");
        return;
    }

    const combinacao = [pA, pB].sort().join('_+_');

    switch(combinacao) {
        case "agua_sanitaria_+_vinagre":
            mostrarResposta("perigo", "✕ PERIGO EXTREMO: Gás Cloro", "A mistura de cloro com ácidos (como o vinagre) libera o Gás Cloro. Ele é altamente tóxico e causa queimaduras graves no sistema respiratório.");
            break;
        case "agua_sanitaria_+_amonia":
            mostrarResposta("perigo", "✕ PERIGO EXTREMO: Cloraminas", "Gera gases tóxicos chamados cloraminas. Podem causar graves danos pulmonares, falta de ar e dor no peito.");
            break;
        case "agua_sanitaria_+_alcool":
            mostrarResposta("perigo", "✕ PERIGO: Clorofórmio", "Esta mistura pode produzir clorofórmio, substância que ataca o sistema nervoso central, causando tonturas e desmaios.");
            break;
        case "alcool_+_vinagre":
            mostrarResposta("seguro", "✓ Mistura Segura", "Não gera gases tóxicos, mas um produto pode anular a eficácia de limpeza do outro.");
            break;
        case "agua_sanitaria_+_detergente":
        case "detergente_+_vinagre":
        case "alcool_+_detergente":
        case "amonia_+_detergente":
            mostrarResposta("seguro", "✓ Mistura Segura", "O detergente neutro é quimicamente estável e não reage de forma perigosa.");
            break;
        default:
            mostrarResposta("seguro", "✓ Sem riscos graves conhecidos", "Esta combinação específica não possui relatos de reações perigosas.");
    }
}

function mostrarResposta(tipo, textoTitulo, textoDescricao) {
    const quadro = document.getElementById('quadroResultado');
    const titulo = document.getElementById('statusTitulo');
    const descricao = document.getElementById('statusDescricao');

    quadro.className = `resultado-box ${tipo}`;
    titulo.innerText = textoTitulo;
    descricao.innerText = textoDescricao;
}