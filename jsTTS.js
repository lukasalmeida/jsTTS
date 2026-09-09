function lerElemento(seletorTag, propriedade, opcoes = {}) {
    const elemento = document.querySelector(seletorTag);

    if (!elemento) {
        console.warn(`Elemento '${seletorTag}' não foi encontrado.`);
        return;
    }

    let textoParaLer = "";

    if (propriedade.toLowerCase() === "text" || propriedade.toLowerCase() === "innertext") {
        textoParaLer = elemento.innerText || elemento.textContent;
    } else {
        textoParaLer = elemento.getAttribute(propriedade);
    }

    if (!textoParaLer) {
        console.warn(`A propriedade/atributo '${propriedade}' não possui texto para leitura.`);
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const mensagem = new SpeechSynthesisUtterance(textoParaLer);

    mensagem.lang = opcoes.lang || "pt-BR";
    mensagem.rate = opcoes.rate || 1.0;
    mensagem.pitch = opcoes.pitch || 1.0;

    window.speechSynthesis.speak(mensagem);
}