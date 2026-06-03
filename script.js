// --- SISTEMA DE VOZ E LÓGICA DE SIMULAÇÃO BLINDADA (JAVASCRIPT) ---

function falarTexto(mensagem) {
    window.speechSynthesis.cancel();
    const falar = new SpeechSynthesisUtterance(mensagem);
    falar.lang = 'pt-BR';
    falar.rate = 1.1;
    window.speechSynthesis.speak(falar);
}

function calcularMistura() {
    const pA = document.getElementById('produtoA').value;
    const pB = document.getElementById('produtoB').value;
    const quadro = document.getElementById('quadroResultado');

    if (!pA || !pB) {
        quadro.className = "resultado-box";
        window.speechSynthesis.cancel();
        return;
    }

    if (pA === pB) {
        mostrarResposta("seguro", "Mistura sem reação", "Misturar compostos idênticos não altera as propriedades químicas originais, modificando apenas o volume do produto.");
        return;
    }

    // Organiza estritamente em ordem alfabética para bater com as chaves abaixo
    const combinacao = [pA, pB].sort().join('_+_');

    switch(combinacao) {
        // --- CATEGORIA: PERIGO EXTREMO (VERMELHO) ---
        
        // CORREÇÃO CRÍTICA: Querosene + Água Sanitária detectado perfeitamente!
        case "agua_sanitaria_+_querosene":
            mostrarResposta("perigo", "Perigo crítico: Oxidação de Solvente e Gases Tóxicos", "A água sanitária reage de forma extremamente agressiva tentando oxidar o querosene. Isso gera calor e libera vapores químicos combinados que são altamente tóxicos para o sistema respiratório e sistema nervoso.");
            break;

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

        case "limpador_aluminio_+_querosene":
        case "querosene_+_removedor_ferrugem":
        case "querosene_+_vinagre":
            mostrarResposta("perigo", "Perigo: Instabilidade Química e Vapores Tóxicos", "A mistura de querosene com ácidos fortes ou fracos quebra a estabilidade do solvente orgânico. Isso acelera a evaporação de gases tóxicos e altamente inflamáveis no ambiente.");
            break;

        case "querosene_+_soda_caustica":
            mostrarResposta("perigo", "Perigo: Reação Corrosiva e Degradação", "A soda cáustica reage de forma destrutiva com os hidrocarbonetos do querosene. Além de inutilizar as duas propriedades, a reação pode corroer embalagens plásticas rapidamente, causando vazamentos perigosos.");
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
            mostrarResposta("atencao", "Atenção: Mistura extremamente inflamável", "A união de múltiplos solventes orgânicos cria uma solução com altíssimo risco de incêndio. Os vapores acumulados podem se queimar com qualquer faísca ou calor no ambiente.");
            break;

        case "desengordurante_+_querosene":
        case "detergente_+_querosene":
        case "querosene_+_sabao_po":
            mostrarResposta("atencao", "Atenção: Inalação Nociva e Risco de Pele", "Embora não causem explosão imediata, misturar querosene com sabão ou detergente facilita a quebra das barreiras protetoras da pele, causando dermatite grave. Além disso, agitar essa mistura espalha gotículas de querosene no ar, perigosas para o pulmão.");
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

    quadro.className = `resultado-box ${tipo}`;
    titulo.innerText = tipo === "seguro" ? "✓ " + textoTitulo : textoTitulo;
    descricao.innerText = textoDescricao;

    const textoParaFalar = `${textoTitulo}. Motivo: ${textoDescricao}`;
    falarTexto(textoParaFalar);
}