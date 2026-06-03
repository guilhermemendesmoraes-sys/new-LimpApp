// --- SISTEMA DE VOZ E LÓGICA DE SIMULAÇÃO (JAVASCRIPT) ---

// Função responsável por fazer o navegador falar em português
function falarTexto(mensagem) {
    // Cancela qualquer fala anterior que esteja tocando para não encavalar as vozes
    window.speechSynthesis.cancel();
    
    const falar = new SpeechSynthesisUtterance(mensagem);
    falar.lang = 'pt-BR'; // Define o idioma para português do Brasil
    falar.rate = 1.1;     // Ajusta a velocidade para uma dicção mais natural
    window.speechSynthesis.speak(falar);
}

function calcularMistura() {
    const pA = document.getElementById('produtoA').value;
    const pB = document.getElementById('produtoB').value;
    const quadro = document.getElementById('quadroResultado');

    // Se um dos produtos não estiver selecionado, limpa a tela e para o áudio
    if (!pA || !pB) {
        quadro.className = "resultado-box";
        window.speechSynthesis.cancel();
        return;
    }

    // Se os produtos forem iguais
    if (pA === pB) {
        mostrarResposta("seguro", "Mistura sem reação", "Misturar compostos idênticos não altera as propriedades químicas originais, modificando apenas o volume do produto.");
        return;
    }

    // Organiza os itens selecionados em ordem alfabética para validação das chaves
    const combinacao = [pA, pB].sort().join('_+_');

    switch(combinacao) {
        // --- CATEGORIA: PERIGO EXTREMO (VERMELHO) ---
        case "agua_sanitaria_+_vinagre":
            mostrarResposta("perigo", "Perigo crítico: Gás Cloro", "A mistura de água sanitária com ácidos fracos como o vinagre libera o nocivo Gás Cloro. Ele é altamente asfixiante, tóxico e corrosivo para as vias aéreas.");
            break;
        case "agua_sanitaria_+_limpador_aluminio":
        case "agua_sanitaria_+_removedor_ferrugem":
            mostrarResposta("perigo", "Perigo crítico: Emissão violenta de Gás Cloro", "Limpadores de alumínio e removedores de ferrugem usam ácidos industriais concentrados. O contato com a Água Sanitária resulta em desprendimento imediato de Gás Cloro em níveis muito perigosos.");
            break;
        case "agua_sanitaria_+_amonia":
            mostrarResposta("perigo", "Perigo crítico: Vapores de Cloraminas", "Gera compostos gasosos tóxicos conhecidos como cloraminas. Provocam tosse severa, falta de ar incapacitante e sério risco de lesão pulmonar.");
            break;
        case "agua_sanitaria_+_alcool":
        case "acetona_+_agua_sanitaria":
        case "agua_sanitaria_+_alcool_isopropilico":
            mostrarResposta("perigo", "Perigo: Reação com produção de Clorofórmio", "A combinação de hipoclorito de sódio com álcoois ou acetona gera subprodutos voláteis tóxicos, como o Clorofórmio. Causa tonturas, náuseas e ataca o sistema nervoso.");
            break;
        case "agua_oxigenada_+_vinagre":
            mostrarResposta("perigo", "Perigo: Formação de Ácido Peracético", "A mistura gera o ácido peracético. Seus vapores são fortemente corrosivos para os olhos, pele e todo o trato respiratório.");
            break;
        case "agua_sanitaria_+_desinfetante_pinho":
            mostrarResposta("perigo", "Perigo: Reação com compostos fenólicos", "Os óleos vegetais de desinfetantes de pinho reagem com o cloro, produzindo gases organoclorados irritantes e nocivos à saúde.");
            break;
        case "limpador_aluminio_+_soda_caustica":
        case "removedor_ferrugem_+_soda_caustica":
        case "soda_caustica_+_vinagre":
            mostrarResposta("perigo", "Perigo: Neutralização exotérmica violenta", "A reação direta entre um ácido e uma base forte como a soda cáustica libera calor de forma abrupta, podendo ferver o líquido e causar respingos corrosivos.");
            break;

        // --- CATEGORIA: ATENÇÃO / INFLAMABILIDADE (AMARELO) ---
        case "bicarbonato_+_vinagre":
        case "bicarbonato_+_limpador_aluminio":
        case "bicarbonato_+_removedor_ferrugem":
            mostrarResposta("atencao", "Atenção: Desprendimento de Dióxido de Carbono", "Ocorre efervescência vigorosa com liberação de gás carbônico. Se fechada em recipientes, a pressão pode romper o frasco. Além disso, a reação neutraliza o poder de limpeza de ambos.");
            break;
        case "bicarbonato_+_soda_caustica":
            mostrarResposta("atencao", "Atenção: Saturação alcalina", "Ambos possuem propriedades básicas. A mistura altera o equilíbrio químico e reduz o potencial de remoção de gorduras pesadas da soda cáustica.");
            break;
        case "agua_sanitaria_+_sabao_po":
            mostrarResposta("atencao", "Atenção: Redução de eficácia", "O cloro degrada as enzimas presentes no sabão em pó, fazendo com que um anule a eficiência de lavagem do outro.");
            break;
        case "acetona_+_alcool":
        case "acetona_+_alcool_isopropilico":
        case "alcool_+_querosene":
        case "alcool_isopropilico_+_querosene":
        case "acetona_+_querosene":
            mostrarResposta("atencao", "Atenção: Mistura altamente inflamável", "Não gera gases tóxicos inéditos, mas a união de solventes orgânicos cria uma solução inflamável. Os vapores aumentam o risco de incêndios perto de calor.");
            break;

        // --- CATEGORIA: SEGURO (VERDE) ---
        case "alcool_+_vinagre":
        case "alcool_isopropilico_+_vinagre":
        case "desengordurante_+_vinagre":
            mostrarResposta("seguro", "Mistura segura", "Combinação muito utilizada em truques domésticos para a remoção de manchas e brilho em vidros e espelhos. Não gera riscos químicos.");
            break;
        case "agua_sanitaria_+_detergente":
        case "alcool_+_detergente":
        case "alcool_isopropilico_+_detergente":
        case "amonia_+_detergente":
        case "detergente_+_vinagre":
        case "agua_oxigenada_+_detergente":
        case "desengordurante_+_detergente":
        case "detergente_+_sabao_po":
        case "detergente_+_limpador_aluminio":
        case "detergente_+_querosene":
            mostrarResposta("seguro", "Mistura segura", "O detergente neutro atua apenas como um estabilizador. Ele se mistura bem com ácidos, bases ou solventes sem provocar reações perigosas.");
            break;
        case "desengordurante_+_sabao_po":
        case "alcool_+_desengordurante":
        case "alcool_isopropilico_+_desengordurante":
            mostrarResposta("seguro", "Mistura segura", "Otimiza a remoção de gordura acumulada sem desencadear reações perigosas secundárias. Recomenda-se o uso de luvas.");
            break;

        default:
            mostrarResposta("seguro", "Sem anomalias químicas registradas", "Esta combinação específica opera em faixas estáveis, sem histórico de acidentes. Mantenha os ambientes ventilados.");
    }
}

function mostrarResposta(tipo, textoTitulo, textoDescricao) {
    const quadro = document.getElementById('quadroResultado');
    const titulo = document.getElementById('statusTitulo');
    const descricao = document.getElementById('statusDescricao');

    // Altera a interface visual (CSS)
    quadro.className = `resultado-box ${tipo}`;
    titulo.innerText = tipo === "seguro" ? "✓ " + textoTitulo : textoTitulo;
    descricao.innerText = textoDescricao;

    // Dispara a voz: Fala o título e explica o motivo técnico
    const textoParaFalar = `${textoTitulo}. Motivo: ${textoDescricao}`;
    falarTexto(textoParaFalar);
}