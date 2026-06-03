// --- SISTEMA TÉCNICO E BANCO DE DADOS MOLECULAR ---

let textoUltimoAlerta = "";

// BANCO DE DADOS CIENTÍFICO (Nomes e Fórmulas)
const bancoQuimico = {
    "agua_sanitaria": { nome: "Hipoclorito de Sódio", formula: "NaClO" },
    "vinagre": { nome: "Ácido Acético", formula: "CH₃COOH" },
    "amonia": { nome: "Hidróxido de Amônio", formula: "NH₄OH" },
    "alcool": { nome: "Etanol", formula: "C₂H₅OH" },
    "detergente": { nome: "Tensoativos Aniônicos", formula: "Mistura Sintética Neutra" },
    "agua_oxigenada": { nome: "Peróxido de Hidrogênio", formula: "H₂O₂" },
    "bicarbonato": { nome: "Bicarbonato de Sódio", formula: "NaHCO₃" },
    "desinfetante_pinho": { nome: "Óleos de Pinho / Fenóis", formula: "Compostos Aromáticos" },
    "soda_caustica": { nome: "Hidróxido de Sódio", formula: "NaOH" },
    "sabao_po": { nome: "Alquilbenzeno Sulfonato de Sódio", formula: "Mistura Alcalina" },
    "removedor_ferrugem": { nome: "Ácido Oxálico / Fosfórico", formula: "H₂C₂O₄ / H₃PO₄" },
    "acetona": { nome: "Propanona", formula: "C₃H₆O" },
    "desengordurante": { nome: "Solventes + Alcalinizantes", formula: "Mistura Solúvel" },
    "limpador_aluminio": { nome: "Ácido Sulfúrico / Fluorídrico", formula: "H₂SO₄ / HF" },
    "querosene": { nome: "Hidrocarbonetos Alifáticos", formula: "Mistura (CnH2n+2)" },
    "alcool_isopropilico": { nome: "Isopropanol", formula: "C₃H₈O" }
};

function falarTexto(mensagem) {
    window.speechSynthesis.cancel();
    const falar = new SpeechSynthesisUtterance(mensagem);
    const vozes = window.speechSynthesis.getVoices();
    const vozPtBr = vozes.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR');
    if (vozPtBr) { falar.voice = vozPtBr; }
    falar.lang = 'pt-BR';
    falar.rate = 0.9;
    window.speechSynthesis.speak(falar);
}
window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };

function calcularMistura() {
    const elA = document.getElementById('produtoA');
    const elB = document.getElementById('produtoB');
    const pA = elA.value;
    const pB = elB.value;

    if (!pA || !pB) {
        resetarSimulador();
        return;
    }

    const nomeA = elA.options[elA.selectedIndex].text;
    const nomeB = elB.options[elB.selectedIndex].text;

    // Busca os dados científicos
    const dadosA = `${bancoQuimico[pA].nome} (${bancoQuimico[pA].formula})`;
    const dadosB = `${bancoQuimico[pB].nome} (${bancoQuimico[pB].formula})`;

    if (pA === pB) {
        const tit = "Mistura Estável";
        const desc = "A união de recipientes do mesmo composto químico não altera as propriedades moleculares primárias, expandindo unicamente o volume total disponível.";
        atualizarInterface("seguro", "✓", tit, desc, ["Luvas de Proteção"], dadosA, dadosB);
        adicionarAoHistorico(nomeA, nomeB, "seguro");
        acionarNarracao(tit, desc);
        return;
    }

    const combinacao = [pA, pB].sort().join('_+_');
    let tipo = "seguro", icone = "✓", titulo = "", descricao = "", epis = [];

    switch(combinacao) {
        case "agua_sanitaria_+_querosene":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo Crítico: Oxidação de Hidrocarbonetos";
            descricao = "A água sanitária reage de forma agressiva tentando oxidar o querosene. Esse processo gera energia térmica indesejada e libera vapores químicos pesados altamente tóxicos para o sistema respiratório e nervoso central.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara de Carvão Ativado"];
            break;
        case "agua_sanitaria_+_vinagre":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo Crítico: Liberação de Gás Cloro";
            descricao = "A decomposição do hipoclorito de sódio em meio ácido libera o Gás Cloro. Este gás é severamente asfixiante, corrosivo e causa danos graves e imediatos aos tecidos do trato respiratório superior.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara Respiratória"];
            break;
        case "agua_sanitaria_+_limpador_aluminio":
        case "agua_sanitaria_+_removedor_ferrugem":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo Crítico: Emissão Violenta de Cloro Gasoso";
            descricao = "Limpadores de metal e antiferrugem contêm altas concentrações de ácidos fortes industriais. O contato com o cloro da água sanitária gera uma reação rápida que expele gases altamente corrosivos.";
            epis = ["Óculos de Proteção", "Luvas de Borracha Longas", "Avental Impermeável"];
            break;
        case "agua_sanitaria_+_amonia":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo Crítico: Síntese de Cloraminas";
            descricao = "A reação produz vapores irritantes chamados cloraminas. A inalação acidental provoca forte lacrimejamento, espasmos respiratórios severos e alto risco latente de edema pulmonar.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara Filtrante"];
            break;
        case "agua_sanitaria_+_alcool":
        case "acetona_+_agua_sanitaria":
        case "agua_sanitaria_+_alcool_isopropilico":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Reação Halofórmica (Clorofórmio)";
            descricao = "A combinação de cloro ativo com solventes orgânicos gera vapores de clorofórmio. Em locais com pouca circulação de ar, a inalação deprime o sistema nervoso central, causando náuseas, tonturas e desmaios.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas"];
            break;
        case "agua_oxigenada_+_vinagre":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Formação de Ácido Peracético";
            descricao = "A mistura estabelece um equilíbrio corrosivo que sintetiza o ácido peracético. Seus vapores são voláteis e causam fortes queimaduras químicas nas mucosas e na pele.";
            epis = ["Óculos de Proteção", "Luvas de Látex"];
            break;
        case "agua_sanitaria_+_desinfetante_pinho":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Subprodutos Organoclorados";
            descricao = "Os compostos fenólicos do desinfetante de pinho reagem com o hipoclorito, gerando subprodutos irritantes e nocivos à saúde sistêmica se expostos repetidamente.";
            epis = ["Óculos de Proteção", "Luvas de Borracha"];
            break;
        case "limpador_aluminio_+_soda_caustica":
        case "removedor_ferrugem_+_soda_caustica":
        case "soda_caustica_+_vinagre":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Reação Exotérmica Violenta";
            descricao = "A neutralização rápida entre um ácido concentrado e uma base forte libera calor imediato. O líquido pode entrar em ebulição instantânea, projetando respingos extremamente corrosivos.";
            epis = ["Protetor Facial", "Luvas de Borracha Grossas", "Avental de PVC"];
            break;
        case "limpador_aluminio_+_querosene":
        case "querosene_+_removedor_ferrugem":
        case "querosene_+_vinagre":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Instabilidade e Emissão de Vapores";
            descricao = "Substâncias ácidas quebram a estabilidade dos compostos do querosene, acelerando perigosamente a liberação de gases voláteis tóxicos e inflamáveis na atmosfera local.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas", "Máscara de Carvão Ativado"];
            break;
        case "querosene_+_soda_caustica":
            tipo = "perigo"; icone = "🛑";
            titulo = "Perigo: Degradação Estrutural Corrosiva";
            descricao = "A alcalinidade extrema da soda cáustica ataca quimicamente as cadeias do querosene, inutilizando ambos e gerando potencial para fragilizar embalagens plásticas frágeis.";
            epis = ["Óculos de Proteção", "Luvas Nitrílicas"];
            break;

        case "bicarbonato_+_vinagre":
        case "bicarbonato_+_limpador_aluminio":
        case "bicarbonato_+_removedor_ferrugem":
            tipo = "atencao"; icone = "⚠️";
            titulo = "Atenção: Efervescência de Dióxido de Carbono";
            descricao = "Ocorre uma neutralização com liberação acelerada de gás carbônico. Em recipientes hermeticamente vedados, a pressão física pode estourar o frasco. Os reagentes se anulam mutuamente.";
            epis = ["Luvas de Proteção"];
            break;
        case "bicarbonato_+_soda_caustica":
            tipo = "atencao"; icone = "⚠️";
            titulo = "Atenção: Saturação Alcalina";
            descricao = "A combinação de dois agentes básicos quebra o pH ideal do processo, inibindo o poder específico de saponificação necessário para a soda quebrar gorduras pesadas.";
            epis = ["Luvas de Borracha"];
            break;
        case "agua_sanitaria_+_sabao_po":
            tipo = "atencao"; icone = "⚠️";
            titulo = "Atenção: Inativação de Agentes Ativos";
            descricao = "O forte poder oxidante do cloro destrói as propriedades ativas dos tensoativos e enzimas de limpeza do sabão em pó, diminuindo o rendimento final da lavagem.";
            epis = ["Luvas de Proteção"];
            break;
        case "acetona_+_alcool":
        case "acetona_+_alcool_isopropilico":
        case "alcool_+_querosene":
        case "alcool_isopropilico_+_querosene":
        case "acetona_+_querosene":
            tipo = "atencao"; icone = "⚠️";
            titulo = "Atenção: Fluido Altamente Inflamável";
            descricao = "Combinar diferentes solventes orgânicos reduz o ponto de fulgor global do fluido. Isso eleva significativamente o risco de ignição gasosa em presença de faíscas ou calor.";
            epis = ["Luvas Nitrílicas", "Ambiente Ventilado"];
            break;
        case "desengordurante_+_querosene":
        case "detergente_+_querosene":
        case "querosene_+_sabao_po":
            tipo = "atencao"; icone = "⚠️";
            titulo = "Atenção: Dispersão Atmosférica Nociva";
            descricao = "Os detergentes quebram o querosene em micropartículas. Isso facilita a remoção da barreira lipídica da pele (causando dermatite) e suspende pequenas gotículas de solvente nocivas no ar.";
            epis = ["Luvas Nitrílicas"];
            break;

        case "alcool_+_vinagre":
        case "alcool_isopropilico_+_vinagre":
        case "desengordurante_+_vinagre":
            titulo = "Combinação Segura";
            descricao = "Essa mistura é estável e amplamente utilizada para quebrar finas películas de gordura doméstica e conferir brilho estático em superfícies vitrificadas.";
            epis = ["Luvas de Proteção"];
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
            titulo = "Combinação Quimicamente Estável";
            descricao = "O detergente líquido atua como um surfactante molecularmente neutro. Ele estabiliza as tensões sem reagir ou gerar gases tóxicos com ácidos ou bases domésticas.";
            epis = ["Luvas de Proteção"];
            break;
        case "desengordurante_+_sabao_po":
        case "alcool_+_desengordurante":
        case "alcool_isopropilico_+_desengordurante":
            titulo = "Combinação Estável";
            descricao = "Otimiza a desagregação de gorduras saturadas sem originar subprodutos de risco. Recomenda-se o uso de luvas básicas para prevenir o ressecamento da epiderme.";
            epis = ["Luvas de Proteção"];
            break;
        default:
            titulo = "Compatibilidade Detectada";
            descricao = "Nenhum histórico de colisão molecular ou perigo reportado para esta combinação específica. Mantenha os procedimentos padrão de ventilação do recinto.";
            epis = ["Luvas de Proteção"];
    }

    atualizarInterface(tipo, icone, titulo, descricao, epis, dadosA, dadosB);
    adicionarAoHistorico(nomeA, nomeB, tipo);
    acionarNarracao(titulo, descricao);
}

function atualizarInterface(classeEstilo, icone, titulo, descricao, epis, dadoA = "", dadoB = "") {
    const quadro = document.getElementById('quadroResultado');
    const elementoIcone = document.getElementById('resultadoIcone');
    const elementoTitulo = document.getElementById('statusTitulo');
    const elementoDescricao = document.getElementById('statusDescricao');
    const blocoEpis = document.getElementById('blocoEpis');
    const listaEpis = document.getElementById('listaEpis');
    
    // Controles e Dados Científicos
    document.getElementById('btnRepetir').style.display = classeEstilo !== "estado-espera" ? "inline-block" : "none";
    document.getElementById('btnRelatorio').style.display = classeEstilo !== "estado-espera" ? "inline-block" : "none";
    
    const divDados = document.getElementById('dadosQuimicos');
    if (dadoA && dadoB) {
        divDados.style.display = "flex";
        document.getElementById('nomeCientificoA').innerText = dadoA;
        document.getElementById('nomeCientificoB').innerText = dadoB;
    } else {
        divDados.style.display = "none";
    }

    quadro.className = `resultado-card ${classeEstilo}`;
    elementoIcone.innerText = icone;
    elementoTitulo.innerText = titulo;
    elementoDescricao.innerText = descricao;

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
}

function acionarNarracao(titulo, descricao) {
    textoUltimoAlerta = `${titulo}. ... Análise técnica: ... ${descricao}`;
    falarTexto(textoUltimoAlerta);
}

function repetirAudio() {
    if (textoUltimoAlerta) { falarTexto(textoUltimoAlerta); }
}

function resetarSimulador() {
    document.getElementById('produtoA').value = "";
    document.getElementById('produtoB').value = "";
    textoUltimoAlerta = "";
    window.speechSynthesis.cancel();
    atualizarInterface("estado-espera", "🔬", "Aguardando Parâmetros", "Insira os dois compostos químicos no painel acima para iniciar o mapeamento molecular de riscos e reações.", []);
}

function adicionarAoHistorico(prod1, prod2, tipo) {
    const lista = document.getElementById('listaHistorico');
    const vazio = lista.querySelector('.historico-vazio');
    if (vazio) vazio.remove();
    const item = document.createElement('div');
    item.className = `historico-item p-${tipo}`;
    item.innerHTML = `<strong>${prod1}</strong> + <strong>${prod2}</strong>`;
    lista.insertBefore(item, lista.firstChild);
    if (lista.children.length > 5) { lista.removeChild(lista.lastChild); }
}