// --- SISTEMA TÉCNICO AVANÇADO DE ANÁLISE QUÍMICA ---

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

    if (!pA || !pB) {
        atualizarInterface("estado-espera", "🔬", "Aguardando Parâmetros", "Insira os dois compostos químicos no painel acima para iniciar o mapeamento molecular de riscos e reações.", []);
        window.speechSynthesis.cancel();
        return;
    }

    if (pA === pB) {
        atualizarInterface("seguro", "✓", "Mistura Estável (Mesmo Composto)", "A união de recipientes do mesmo composto químico não altera as propriedades moleculares primárias, expandindo unicamente o volume volumétrico disponível.", ["Luvas de Proteção"]);
        return;
    }

    const combinacao = [pA, pB].sort().join('_+_');

    switch(combinacao) {
        // --- CATEGORIA: PERIGO CRÍTICO (VERMELHO) ---
        case "agua_sanitaria_+_querosene":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Oxidação de Hidrocarbonetos", "A água sanitária reage de forma agressiva tentando oxidar o querosene. Esse processo gera energia térmica indesejada e libera vapores químicos pesados altamente tóxicos para o sistema respiratório e nervoso central.", ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara de Carvão Ativado"]);
            break;

        case "agua_sanitaria_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Liberação de Gás Cloro", "A decomposição do hipoclorito de sódio em meio ácido libera o Gás Cloro. Este gás é severamente asfixiante, corrosivo e causa danos graves e imediatos aos tecidos do trato respiratório superior.", ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara Respiratória"]);
            break;

        case "agua_sanitaria_+_limpador_aluminio":
        case "agua_sanitaria_+_removedor_ferrugem":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Emissão Violenta de Cloro Gasoso", "Limpadores de metal e antiferrugem contêm altas concentrações de ácidos fortes industriais. O contato com o cloro da água sanitária gera uma reação rápida que expele gases altamente corrosivos.", ["Óculos de Proteção", "Luvas de Borracha Longas", "Avental Impermeável"]);
            break;

        case "agua_sanitaria_+_amonia":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Síntese de Cloraminas", "A reação produz vapores irritantes chamados cloraminas. A inalação acidental provoca forte lacrimejamento, espasmos respiratórios severos e alto risco latente de edema pulmonar.", ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara Filtrante"]);
            break;

        case "agua_sanitaria_+_alcool":
        case "acetona_+_agua_sanitaria":
        case "agua_sanitaria_+_alcool_isopropilico":
            atualizarInterface("perigo", "🛑", "Perigo: Reação Halofórmica (Clorofórmio)", "A combinação de cloro ativo com solventes orgânicos gera vapores de clorofórmio. Em locais com pouca circulação de ar, a inalação deprime o sistema nervoso central, causando náuseas, tonturas e desmaios.", ["Óculos de Proteção", "Luvas Nitrílicas"]);
            break;

        case "agua_oxigenada_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Formação de Ácido Peracético", "A mistura estabelece um equilíbrio corrosivo que sintetiza o ácido peracético. Seus vapores são voláteis e causam fortes queimaduras químicas nas mucosas e na pele.", ["Óculos de Proteção", "Luvas de Látex"]);
            break;

        case "agua_sanitaria_+_desinfetante_pinho":
            atualizarInterface("perigo", "🛑", "Perigo: Subprodutos Organoclorados", "Os compostos fenólicos do desinfetante de pinho reagem com o hipoclorito, gerando subprodutos irritantes e nocivos à saúde sistêmica se expostos repetidamente.", ["Óculos de Proteção", "Luvas de Borracha"]);
            break;

        case "limpador_aluminio_+_soda_caustica":
        case "removedor_ferrugem_+_soda_caustica":
        case "soda_caustica_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Reação Exotérmica Violenta", "A neutralização rápida entre um ácido concentrado e uma base forte libera calor imediato. O líquido pode entrar em ebulição instantânea, projetando respingos extremamente corrosivos.", ["Protetor Facial", "Luvas de Borracha Grossas", "Avental de PVC"]);
            break;

        case "limpador_aluminio_+_querosene":
        case "querosene_+_removedor_ferrugem":
        case "querosene_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Instabilidade e Emissão de Vapores", "Substâncias ácidas quebram a estabilidade dos compostos do querosene, acelerando perigosamente a liberação de gases voláteis tóxicos e inflamáveis na atmosfera local.", ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara de Carvão Ativado"]);
            break;

        case "querosene_+_soda_caustica":
            atualizarInterface("perigo", "🛑", "Perigo: Degradação Estrutural Corrosiva", "A alcalinidade extrema da soda cáustica ataca quimicamente as cadeias do querosene, inutilizando ambos e gerando potencial para fragilizar embalagens plásticas frágeis.", ["Óculos de Proteção", "Luvas Nitrílicas"]);
            break;

        // --- CATEGORIA: ATENÇÃO (AMARELO) ---
        case "bicarbonato_+_vinagre":
        case "bicarbonato_+_limpador_aluminio":
        case "bicarbonato_+_removedor_ferrugem":
            atualizarInterface("atencao", "⚠️", "Atenção: Efervescência de Dióxido de Carbono", "Ocorre uma neutralização com liberação acelerada de gás carbônico. Em recipientes hermeticamente vedados, a pressão física pode estourar o frasco. Os reagentes se anulam mutuamente.", ["Luvas de Proteção"]);
            break;

        case "bicarbonato_+_soda_caustica":
            atualizarInterface("atencao", "⚠️", "Atenção: Saturação Alcalina", "A combinação de dois agentes básicos quebra o pH ideal do processo, inibindo o poder específico de saponificação necessário para a soda quebrar gorduras pesadas.", ["Luvas de Borracha"]);
            break;

        case "agua_sanitaria_+_sabao_po":
            atualizarInterface("atencao", "⚠️", "Atenção: Inativação de Agentes Ativos", "O forte poder oxidante do cloro destrói as propriedades ativas dos tensoativos e enzimas de limpeza do sabão em pó, diminuindo o rendimento final da lavagem.", ["Luvas de Proteção"]);
            break;

        case "acetona_+_alcool":
        case "acetona_+_alcool_isopropilico":
        case "alcool_+_querosene":
        case "alcool_isopropilico_+_querosene":
        case "acetona_+_querosene":
            atualizarInterface("atencao", "⚠️", "Atenção: Fluido Altamente Inflamável", "Combinar diferentes solventes orgânicos reduz o ponto de fulgor global do fluido. Isso eleva significativamente o risco de ignição gasosa em presença de faíscas ou calor.", ["Luvas Nitrílicas", "Ambiente Ventilado"]);
            break;

        case "desengordurante_+_querosene":
        case "detergente_+_querosene":
        case "querosene_+_sabao_po":
            atualizarInterface("atencao", "⚠️", "Atenção: Dispersão Atmosférica Nociva", "Os detergentes quebram o querosene em micropartículas. Isso facilita a remoção da barreira lipídica da pele (causando dermatite) e suspende pequenas gotículas de solvente nocivas no ar.", ["Luvas Nitrílicas"]);
            break;

        // --- CATEGORIA: COMPATÍVEL (VERDE) ---
        case "alcool_+_vinagre":
        case "alcool_isopropilico_+_vinagre":
        case "desengordurante_+_vinagre":
            atualizarInterface("seguro", "✓", "Combinação Segura", "Essa mistura é estável e amplamente utilizada para quebrar finas películas de gordura doméstica e conferir brilho estático em superfícies vitrificadas.", ["Luvas de Proteção"]);
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
            atualizarInterface("seguro", "✓", "Combinação Quimicamente Estável", "O detergente líquido atua como um surfactante molecularmente neutro. Ele estabiliza as tensões sem reagir ou gerar gases tóxicos com ácidos ou bases domésticas.", ["Luvas de Proteção"]);
            break;

        case "desengordurante_+_sabao_po":
        case "alcool_+_desengordurante":
        case "alcool_isopropilico_+_desengordurante":
            atualizarInterface("seguro", "✓", "Combinação Estável", "Otimiza a desagregação de gorduras saturadas sem originar subprodutos de risco. Recomenda-se o uso de luvas básicas para prevenir o ressecamento da epiderme.", ["Luvas de Proteção"]);
            break;

        default:
            atualizarInterface("seguro", "✓", "Compatibilidade Detectada", "Nenhum histórico de colisão molecular ou perigo reportado para esta combinação específica. Mantenha os procedimentos padrão de ventilação do recinto.", ["Luvas de Proteção"]);
    }
}

function atualizarInterface(classeEstilo, icone, titulo, descricao, epis) {
    const quadro = document.getElementById('quadroResultado');
    const elementoIcone = document.getElementById('resultadoIcone');
    const elementoTitulo = document.getElementById('statusTitulo');
    const elementoDescricao = document.getElementById('statusDescricao');
    const blocoEpis = document.getElementById('blocoEpis');
    const listaEpis = document.getElementById('listaEpis');

    // Atualiza classes do card principal
    quadro.className = `resultado-card ${classeEstilo}`;
    elementoIcone.innerText = icone;
    elementoTitulo.innerText = titulo;
    elementoDescricao.innerText = descricao;

    // Gerenciador de exibição de EPIs
    listaEpis.innerHTML = "";
    if (epis.length > 0) {
        blocoEpis.style.display = "block";
        epis.forEach(epi => {
            const span = document.createElement('span');
            span.className = "epi-item";
            span.innerHTML = `🛡️ ${epi}`;
            listaEpis.appendChild(span);
        });
    } else {
        blocoEpis.style.display = "none";
    }

    // Dispara síntese de voz para estados ativos
    if (classeEstilo !== "estado-espera") {
        const textoParaFalar = `${titulo}. Explicação: ${descricao}`;
        falarTexto(textoParaFalar);
    }
}