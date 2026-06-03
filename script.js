// --- SISTEMA TÉCNICO DE ANÁLISE QUÍMICA E SÍNTESE DE VOZ ---

function falarTexto(mensagem) {
    window.speechSynthesis.cancel(); // Evita sobreposição de áudio
    const falar = new SpeechSynthesisUtterance(mensagem);
    falar.lang = 'pt-BR';
    falar.rate = 1.1; // Velocidade de fala fluida
    window.speechSynthesis.speak(falar);
}

function calcularMistura() {
    const pA = document.getElementById('produtoA').value;
    const pB = document.getElementById('produtoB').value;
    const quadro = document.getElementById('quadroResultado');

    // Se as opções estiverem incompletas, volta ao estado original de espera
    if (!pA || !pB) {
        atualizarInterface("estado-espera", "🔬", "Aguardando Seleção", "Escolha dois elementos acima para analisar a estabilidade e os riscos da mistura em tempo real.");
        window.speechSynthesis.cancel();
        return;
    }

    // Validação de redundância (elementos iguais)
    if (pA === pB) {
        atualizarInterface("seguro", "✓", "Mistura Estável", "Misturar compostos com a mesma fórmula molecular não gera novas reações, alterando unicamente o volume total da substância.");
        return;
    }

    // Organização em ordem alfabética para tratamento estrito das chaves do switch
    const combinacao = [pA, pB].sort().join('_+_');

    switch(combinacao) {
        // --- CLASSES DE ALTO RISCO QUÍMICO (PERIGO) ---
        case "agua_sanitaria_+_querosene":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Oxidação de Hidrocarbonetos", "A água sanitária reage de forma agressiva tentando oxidar o querosene. Esse processo gera energia térmica e libera vapores químicos pesados altamente tóxicos para o sistema respiratório e nervoso.");
            break;

        case "agua_sanitaria_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Liberação de Gás Cloro", "A dissociação do hipoclorito de sódio em meio ácido (vinagre) provoca a liberação imediata de Gás Cloro. Este gás é extremamente sufocante, corrosivo e causa danos severos e imediatos ao tecido pulmonar.");
            break;

        case "agua_sanitaria_+_limpador_aluminio":
        case "agua_sanitaria_+_removedor_ferrugem":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Emissão Violenta de Cloro Gasoso", "Limpadores de metal e antiferrugem contêm altas concentrações de ácidos fortes. O contato com o cloro da água sanitária gera uma reação em cadeia que expele nuvens de gás cloro altamente nocivas.");
            break;

        case "agua_sanitaria_+_amonia":
            atualizarInterface("perigo", "🛑", "Perigo Crítico: Síntese de Cloraminas", "A reação produz compostos altamente voláteis chamados cloraminas. A inalação provoca irritação ocular extrema, espasmos respiratórios e alto risco de edema pulmonar.");
            break;

        case "agua_sanitaria_+_alcool":
        case "acetona_+_agua_sanitaria":
        case "agua_sanitaria_+_alcool_isopropilico":
            atualizarInterface("perigo", "🛑", "Perigo: Reação Halofórmica (Clorofórmio)", "A combinação de cloro com compostos orgânicos como álcoois ou acetona gera vapores de clorofórmio. A exposição em ambientes confinados ataca o sistema nervoso central, provocando tonturas e desmaios.");
            break;

        case "agua_oxigenada_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Formação de Ácido Peracético", "A mistura estabelece um equilíbrio químico que sintetiza o ácido peracético. Seus vapores altamente voláteis têm ação severamente corrosiva nas mucosas nasais e nos olhos.");
            break;

        case "agua_sanitaria_+_desinfetante_pinho":
            atualizarInterface("perigo", "🛑", "Perigo: Subprodutos Organoclorados", "Os compostos fenólicos e óleos essenciais do desinfetante reagem com o hipoclorito, sintetizando gases irritantes e compostos nocivos à saúde a longo prazo.");
            break;

        case "limpador_aluminio_+_soda_caustica":
        case "removedor_ferrugem_+_soda_caustica":
        case "soda_caustica_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Reação Exotérmica Violenta", "A neutralização termodinâmica entre um ácido concentrado e uma base forte libera uma quantidade massiva de calor instantâneo, podendo projetar respingos ferventes e altamente corrosivos na pele.");
            break;

        case "limpador_aluminio_+_querosene":
        case "querosene_+_removedor_ferrugem":
        case "querosene_+_vinagre":
            atualizarInterface("perigo", "🛑", "Perigo: Instabilidade e Emissão de Vapores", "A adição de substâncias ácidas quebra a estabilidade dos compostos do querosene, acelerando a liberação de gases tóxicos e irritantes no ambiente.");
            break;

        case "querosene_+_soda_caustica":
            atualizarInterface("perigo", "🛑", "Perigo: Degradação Estrutural Corrosiva", "A alcalinidade extrema da soda cáustica ataca as cadeias de hidrocarboneto. Além de anular as funções de limpeza, essa reação destrutiva pode derreter embalagens plásticas finas.");
            break;

        // --- CLASSES DE ATENÇÃO / INCOMPATIBILIDADE (AMARELO) ---
        case "bicarbonato_+_vinagre":
        case "bicarbonato_+_limpador_aluminio":
        case "bicarbonato_+_removedor_ferrugem":
            atualizarInterface("atencao", "⚠️", "Atenção: Efervescência de Dióxido de Carbono", "Ocorre uma reação de neutralização rápida com desprendimento massivo de gás carbônico. Se enclausurada em frascos vedados, a pressão física causará o rompimento do recipiente. Quimicamente, as propriedades se anulam.");
            break;

        case "bicarbonato_+_soda_caustica":
            atualizarInterface("atencao", "⚠️", "Atenção: Saturação de Solução Alcalina", "A sobreposição de duas substâncias de pH alcalino anula o equilíbrio ideal, inibindo o processo de saponificação indispensável para a soda cáustica remover gorduras pesadas.");
            break;

        case "agua_sanitaria_+_sabao_po":
            atualizarInterface("atencao", "⚠️", "Atenção: Inativação de Agentes Ativos", "O poder oxidante do cloro destrói as propriedades dos tensoativos e enzimas de lavagem do sabão em pó, neutralizando o rendimento da limpeza.");
            break;

        case "acetona_+_alcool":
        case "acetona_+_alcool_isopropilico":
        case "alcool_+_querosene":
        case "alcool_isopropilico_+_querosene":
        case "acetona_+_querosene":
            atualizarInterface("atencao", "⚠️", "Atenção: Fluido Altamente Inflamável", "Unir múltiplos solventes voláteis diminui o ponto de fulgor da solução. Isso eleva significativamente o risco de ignição atmosférica e incêndios na presença de eletricidade estática ou calor.");
            break;

        case "desengordurante_+_querosene":
        case "detergente_+_querosene":
        case "querosene_+_sabao_po":
            atualizarInterface("atencao", "⚠️", "Atenção: Dispersão Atmosférica Nociva", "Os detergentes emulsificam o querosene. Isso facilita a quebra da oleosidade natural da pele (dermatite) e propaga microgotículas de solvente no ar, nocivas se inaladas.");
            break;

        // --- CLASSES QUIMICAMENTE COMPATÍVEIS (VERDE) ---
        case "alcool_+_vinagre":
        case "alcool_isopropilico_+_vinagre":
        case "desengordurante_+_vinagre":
            atualizarInterface("seguro", "✓", "Combinação Segura", "Essa mistura é quimicamente compatível. É muito comum em soluções domésticas para quebrar depósitos de gorduras leves e dar polimento em superfícies de vidro.");
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
            atualizarInterface("seguro", "✓", "Combinação Segura", "O detergente líquido neutro funciona como um surfactante molecularmente estável. Ele atua sem reagir ou gerar subprodutos nocivos com ácidos ou bases.");
            break;

        case "desengordurante_+_sabao_po":
        case "alcool_+_desengordurante":
        case "alcool_isopropilico_+_desengordurante":
            atualizarInterface("seguro", "✓", "Combinação Segura", "Potencializa a quebra de lipídios pesados sem reações secundárias perigosas. Recomenda-se o uso de luvas para evitar o ressecamento dermatológico.");
            break;

        default:
            atualizarInterface("seguro", "✓", "Estabilidade Química Detectada", "Nenhum histórico de colisão molecular violenta registrado para esta combinação. Mantenha os protocolos básicos de ventilação no ambiente.");
    }
}

function atualizarInterface(classeEstilo, icone, titulo, descricao) {
    const quadro = document.getElementById('quadroResultado');
    const elementoIcone = document.getElementById('resultadoIcone');
    const elementoTitulo = document.getElementById('statusTitulo');
    const elementoDescricao = document.getElementById('statusDescricao');

    // Substitui as classes do CSS de forma limpa
    quadro.className = `resultado-card ${classeEstilo}`;
    elementoIcone.innerText = icone;
    elementoTitulo.innerText = titulo;
    elementoDescricao.innerText = descricao;

    // Executa a narração técnica caso não seja o estado inicial de espera
    if (classeEstilo !== "estado-espera") {
        const textoParaFalar = `${titulo}. Explicação técnica: ${descricao}`;
        falarTexto(textoParaFalar);
    }
}