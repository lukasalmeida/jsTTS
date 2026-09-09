# jsTTS 🔊

**jsTTS** é uma biblioteca JavaScript leve e simplificada para conversão de texto em fala (Text-to-Speech), que faz a ponte direta com o motor de síntese de voz nativo do sistema operacional (como o Windows SAPI) através da **Web Speech API** nativa dos navegadores.

---

## 🚀 Tecnologias Utilizadas

- **JavaScript (ES6+)**: Manipulação do DOM, funções e controle da API de voz.
- **Web Speech API (`SpeechSynthesis`)**: Interface nativa dos navegadores web para síntese de voz.
- **Windows SAPI / System.Speech**: Motor nativo do sistema operacional executado em segundo plano.
- **HTML5 & CSS3**: Para páginas de demonstração e testes de interface.

---

## 🛠️ Como o Código Funciona

A função `lerElemento` localiza um elemento HTML através do seu seletor CSS, extrai a informação solicitada (o texto interno ou o valor de um atributo específico) e envia essa mensagem diretamente para o motor de áudio do sistema operacional.

### Fluxo de Execução:

1. **Seleção do Elemento**: Utiliza `document.querySelector` para encontrar a tag no DOM.
2. **Extração de Conteúdo**:
   - Se a propriedade informada for `"text"` ou `"innerText"`, captura o conteúdo textual visível do elemento (`innerText`).
   - Para qualquer outra propriedade (como `"alt"`, `"title"`, `"id"`, `"name"`, `"src"`), captura o valor do atributo via `getAttribute()`.
3. **Gerenciamento do Motor de Áudio**: Cancela leituras anteriores em andamento com `speechSynthesis.cancel()` para evitar sobreposição de vozes.
4. **Instanciação e Configuração**: Cria um objeto `SpeechSynthesisUtterance` com o texto extraído e aplica as configurações de idioma (`lang`), velocidade (`rate`) e tom (`pitch`).
5. **Execução**: Dispara a leitura com `window.speechSynthesis.speak()`.

---

## 📦 Código da Função

```javascript
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
```

---

## 💡 Exemplos de Uso

### 1. Lendo o texto de um parágrafo
```javascript
lerElemento("p", "text");
```

### 2. Lendo o atributo `alt` de uma imagem
```javascript
lerElemento("img.avatar", "alt");
```

### 3. Lendo o atributo `title` de um botão
```javascript
lerElemento("button#btn-salvar", "title");
```

### 4. Lendo o `name` de um campo de formulário
```javascript
lerElemento("input[type='text']", "name");
```

### 5. Customizando idioma, velocidade e tom da fala
```javascript
lerElemento("div.noticia", "text", {
  lang: "pt-BR",
  rate: 1.2,
  pitch: 0.9
});
```

---

## ⚙️ Propriedades e Opções

| Parâmetro | Tipo | Descrição | Padrão |
| :--- | :--- | :--- | :--- |
| `seletorTag` | `string` | Seletor CSS do elemento (`"p"`, `"#id"`, `".classe"`). | *Obrigatório* |
| `propriedade` | `string` | Atributo ou conteúdo a ser lido (`"text"`, `"alt"`, `"title"`, `"id"`, etc). | *Obrigatório* |
| `opcoes.lang` | `string` | Idioma da voz a ser utilizada pelo motor de fala. | `"pt-BR"` |
| `opcoes.rate` | `number` | Velocidade da fala (de `0.1` até `10`). | `1.0` |
| `opcoes.pitch` | `number` | Tom de frequência da voz (de `0` até `2`). | `1.0` |

---

## 📜 Selo de Autoria

```text
===================================================================
                         PROJETO jsTTS
             Módulo de Leitura Nativa via Web Speech API
===================================================================
  Desenvolvido por: LUKASALMEIDA
  Licença: MIT
  Compatibilidade: Navegadores Modernos (Chrome, Edge, Firefox, Safari)
  Motor de Voz: Nativo do Sistema Operacional (Windows/SAPI, macOS, Linux)
===================================================================
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.