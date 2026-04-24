PT-BR
# OCP 17 — Simulador de Certificação Java

Um simulador de exame completo e offline para a certificação **Oracle Certified Professional: Java SE 17 Developer (1Z0-829)**. Sem backend, sem dependências, sem necessidade de conta — um único arquivo HTML que funciona em qualquer navegador moderno.

---

## O que é

O simulador replica a experiência do exame OCP 17 da forma mais fiel possível:

- **50 questões** selecionadas aleatoriamente do banco de questões em cada sessão
- **Cronômetro regressivo de 90 minutos** com um aviso visual nos últimos 10 minutos
- **Limite de aprovação de 68%** — o mesmo exigido no exame real
- **Navegação livre** — acesse qualquer questão a qualquer momento usando os indicadores de ponto na parte inferior
- **Revisão completa após o envio** — cada questão mostra a resposta correta e uma explicação detalhada
- **Análise de desempenho por tópico** — barras com código de cores para que você possa identificar instantaneamente suas áreas de dificuldade
- Todo o conteúdo está em **inglês americano**, correspondendo ao idioma do exame de certificação real

O objetivo do projeto é familiarizá-lo com a API Java 17 e com o vocabulário, a linguagem e as armadilhas que a Oracle usa nas questões do exame real.

---

## Arquivos do projeto

```
ocp17-simulator-en.html ← O simulador (abra em um navegador)
questions-pack-en-11.js ← Questões 501–550
questions-pack-en-12.js ← Questões 551–600
questions-pack-en-13.js ← Questões 601–650
questions-pack-en-14.js ← Questões 651–700
questions-pack-en-15.js ← Questões 701–750
questions-pack-en-16.js ← Questões 751–800
questions-pack-en-17.js ← Questões 801–850
questions-pack-en-18.js ← Questões 851–900
questions-pack-en-19.js ← Perguntas 901–950
questions-pack-en-20.js ← Perguntas 951–1000
```

O simulador é fornecido com 50 perguntas integradas (IDs 1–50). Cada arquivo de pacote é um array JavaScript independente que você cola no simulador para expandir o conjunto de perguntas.

---

## Como adicionar mais perguntas

Cada arquivo de pacote segue a mesma estrutura:

```js
const QUESTIONS_PACK_EN_XX = [
{ id: 501, topic: "Streams", text: "...", code: `...`, options: [...], answer: 0, explanation: "..." },

{ id: 502, ... },

...
];

```

Para integrar um pacote ao simulador:

**Passo 1.** Abra o arquivo `ocp17-simulator-en.html` em um editor de texto.

**Passo 2.** Localize o array `ALL_QUESTIONS`. Ele termina assim:

```js
const ALL_QUESTIONS = [
{ id: 1, ... },

...

{ id: 50, ... } // ← última pergunta existente — SEM vírgula final ainda
]; // ← colchete de fechamento
```

**Passo 3.** Abra um arquivo de pacote (por exemplo, `questions-pack-en-11.js`) e copie todo o conteúdo **entre** (mas não incluindo) os colchetes `[` e `]` externos do array.

**Passo 4.** No simulador, adicione uma vírgula após o último objeto de pergunta existente e, em seguida, cole o conteúdo copiado:

```js
const ALL_QUESTIONS = [
{ id: 1, ... },

...
{ id: 50, ... }, // ← adicione uma vírgula aqui
{ id: 501, ... }, // ← o conteúdo do pacote colado começa aqui

...
{ id: 550, ... } // ← último objeto do pacote — sem vírgula final
];

```

**Passo 5.** Repita para cada pacote adicional, sempre adicionando ao final de `ALL_QUESTIONS`.

**Passo 6.** Salve o arquivo e abra-o em um navegador. O simulador embaralha automaticamente o conjunto de perguntas e seleciona 50 perguntas por sessão — nenhuma outra configuração é necessária.

> **Dica:** Quanto mais perguntas no conjunto, menor a chance de ver a mesma sessão duas vezes. Com 1.000 questões carregadas, cada exame é um sorteio único.

---

## Referência do formato da questão

Cada objeto de questão deve seguir este esquema:

```js
{

id: 501, // Número inteiro único — não deve entrar em conflito com IDs existentes

topic: "Streams", // Rótulo exibido na revisão. Use nomes consistentes (veja abaixo)

texto: "Qual é a saída de...", // Enunciado da pergunta — texto simples

código: `<span class="kw">var</span> x = ...`, // Código destacado (veja as regras de sintaxe) OU nulo se não houver código

opções: [ // Exatamente 4 opções como strings simples
"Opção A",

"Opção B",

"Opção C",

"Opção D"

],

resposta: 0, // Índice baseado em zero da opção correta (0=A, 1=B, 2=C, 3=D)

explicação: "..." // Explicação detalhada de por que a resposta está correta
}
```

### Classes de realce de sintaxe

O campo `code` usa tags `<span>` embutidas para colorir:

| Classe | Aplica-se a |

|-------|-----------|

| `kw` | Palavras-chave (`class`, `if`, `return`, `new`, `var`, etc.) |

| `cls` | Nomes de classes e interfaces (`String`, `List`, `Stream`, etc.) |
| `str` | Literais de string (`"hello"`) |

| `num` | Literais numéricos (`42`, `3.14`) |

| `cm` | Comentários (`// linha A`) |

| `ann` | Anotações (`@Override`, `@Retention`) |

Exemplo:
```js
código: `<span class="kw">var</span> x = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt;();`
```

### Nomes de tópicos padrão

Use estas strings exatas no campo `topic` para que a análise de desempenho agrupe as perguntas corretamente:

```
Registros Classes Seladas Correspondência de Padrões
Streams, Coletores, Opcional
Lambdas, Interfaces Funcionais, Referências de Métodos
Concorrência, CompletableFuture, API de Data e Hora
Coleções, Genéricos, Módulos (JPMS)
Exceções, E/S e NIO, Serialização
POO, Classes Abstratas, Interfaces
Enums, Switch, Expressões, Blocos de Texto
Strings, var, JVM e Memória
Anotações, Reflexão, Padrões de Projeto
Localização, BigDecimal, Herança
Classes Internas, Comparable Bitwise
```

---

## Prompt para gerar novos pacotes de perguntas

Use o seguinte prompt com Claude (ou qualquer LLM compatível) para gerar pacotes de perguntas adicionais exatamente no mesmo formato:

---
> **PROMPT — Gerador de Pacote de Perguntas OCP 17**
>
> Gere um arquivo JavaScript chamado `questions-pack-en-XX.js` contendo um array constante chamado `QUESTIONS_PACK_EN_XX` com exatamente **50 novas perguntas de simulação do exame Java OCP 17** em inglês americano. Todas as questões devem ser diferentes dos pacotes já gerados (IDs 1–1000).

>
> **Regras obrigatórias:**
>
> 1. **Idioma:** Todos os enunciados das questões, opções de resposta e explicações devem ser escritos em inglês americano fluente e formal — exatamente como apareceriam no exame real da Oracle.

>
> 2. **IDs das questões:** Comece com o próximo número inteiro disponível (por exemplo, 1001 se os IDs 1–1000 já existirem). Cada ID deve ser único.

>
> 3. **Estrutura:** Todo objeto deve seguir este esquema exato (sem campos extras, sem campos ausentes):
> ```js
> {
> id: 1001,
> topic: "Streams",
> text: "Qual é a saída do seguinte código?",
> code: `...código destacado...` ​​ou null,
> options: ["Opção A", "Opção B", "Opção C", "Opção D"],
> answer: 0,
> explanation: "Explicação detalhada da resposta correta..."
> }
> ```
>
> 4. **Destaque de sintaxe:** Use estas classes `<span>` no campo `code`:
> - `kw` → palavras-chave (class, void, return, var, new, if, for, etc.)
> - `cls` → nomes de classe/interface/registro/enumeração
> - `str` → literais de string
> - `num` → literais numéricos
> - `cm` → comentários
> - `ann` → anotações
> Use `&lt;` e `&gt;` para colchetes angulares em genéricos.

>
> 5. **Correção da resposta:** Cada questão deve ter exatamente UMA resposta inequivocamente correta. Verifique a saída mentalmente ou percorra o código antes de escolher o índice `answer`.

>
> 6. **Explicações:** Devem ser precisas e didáticas — explique POR QUE a resposta está correta (rastreamento passo a passo quando relevante) e por que as opções incorretas estão erradas. Mínimo de 2 frases.

>
> 7. **Distribuição dos tópicos:** Distribua as 50 questões em pelo menos 10 tópicos diferentes. Inclua uma combinação de questões conceituais ("Qual afirmação está CORRETA?"), questões de rastreamento de saída ("Qual é a saída?") e questões de compilação ("O código a seguir compila?").

>
> 8. **Calibração da dificuldade:** Misture os níveis de dificuldade proporcionalmente — aproximadamente 30% mais fácil (conhecimento da API, saída direta), 50% médio (comportamento não óbvio, casos extremos), 20% difícil (armadilhas, cenários complexos, regras menos conhecidas).

>
> 9. **Realismo do exame:** Use os mesmos padrões de fraseado do exame OCP real:
> - "Qual é a saída do seguinte código?"
> - "Qual afirmação sobre X está CORRETA/INCORRETA?"
> - "O seguinte código compila?"

> - "Qual das seguintes opções melhor descreve...?"

> - Use opções como "Erro de compilação", "Lança XxxException", "Não determinístico"
>
> 10. **Sem duplicatas:** Não repita perguntas de pacotes anteriores. Aborde os seguintes tópicos (priorize os menos abordados até o momento): Registros, Classes Seladas, Casamento de Padrões, Fluxos, Coletores, Opcional, Lambdas, Interfaces Funcionais, Referências de Métodos, Concorrência, CompletableFuture, API de Data e Hora, Coleções, Genéricos, Módulos (JPMS), Exceções, E/S e NIO, Serialização, POO, Classes Abstratas, Interfaces, Enums, Expressões Switch, Blocos de Texto, Strings, var, JVM e Memória, Anotações, Reflexão, Padrões de Projeto, Localização, BigDecimal, Herança, Classes Internas, Comparable, Bitwise.

>
> 11. **Autoverificação antes de finalizar:** Após escrever cada questão, verifique mentalmente:
> - O índice `answer` aponta para a opção correta?

> - O código é sintaticamente válido em Java?

> - A explicação corresponde à resposta selecionada?

> - Há alguma opção ambígua que também possa ser considerada correta? >
> Gere SOMENTE o arquivo JavaScript completo. Não adicione formatação Markdown, comentários antes ou depois do código, nem qualquer texto fora do próprio arquivo JS.

---

## Tópicos abordados

O banco atual de 1.000 questões abrange os seguintes domínios do exame OCP 17:

| Domínio | Principais subtópicos |

|--------|---------------|

| Recursos da linguagem Java SE 17 | Registros, Classes seladas, Correspondência de padrões, Blocos de texto, `var`, Expressões switch |

| Programação Orientada a Objetos | Herança, Polimorfismo, Classes abstratas, Interfaces, Classes internas/aninhadas, Enums |

| Genéricos e Coleções | Wildcards (PECS), Apagamento de tipo, Implementações de List/Set/Map/Deque, EnumSet/EnumMap |

| Programação Funcional | Lambdas, Referências de métodos, Interfaces funcionais, API Stream, Optional |

| Concorrência | Ciclo de vida de threads, Locks, Classes atômicas, CompletableFuture, Executors, BlockingQueue |

| E/S e NIO.2 | Caminho, Arquivos, WatchService, Serialização, try-with-resources |
| Módulos (JPMS) | requires, exports, opens, uses/provides, ServiceLoader |
| API de Data e Hora | LocalDate/Time/DateTime, ZonedDateTime, Instant, Duration, Period |

| Exceções | Hierarquia, multi-catch, exceções encadeadas, exceções suprimidas |
| Funcionamento Interno da JVM | Pilha/Heap/Metaspace, Gerações de GC, WeakReference, JIT |

| Localização | Locale, NumberFormat, DateTimeFormatter, ResourceBundle |

| Outros | BigDecimal, API Math, Reflexão, Anotações, Padrões de Projeto |

---

## Executando o simulador

1. Abra o arquivo `ocp17-simulator-en.html` diretamente em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
2. Não é necessária conexão com a internet após o primeiro carregamento (as fontes do Google são obtidas apenas uma vez).
3. Para uma configuração totalmente offline, baixe as duas fontes do Google Fonts e atualize o `<link>` no HTML.

---

## Licença

Este projeto destina-se a fins de estudo pessoal. Oracle, Java e OCP são marcas registradas da Oracle Corporation.

##########################################################
EN-US

# OCP 17 — Java Certification Simulator

A self-contained, offline-capable exam simulator for the **Oracle Certified Professional: Java SE 17 Developer (1Z0-829)** certification. No backend, no dependencies, no account required — a single HTML file that runs in any modern browser.

---

## What it is

The simulator replicates the OCP 17 exam experience as closely as possible:

- **50 questions** drawn randomly from the question pool on every session
- **90-minute countdown timer** with a visual warning in the last 10 minutes
- **68% passing threshold** — the same required by the real exam
- **Free navigation** — jump to any question at any time using the dot indicators at the bottom
- **Full review after submission** — every question shows the correct answer and a detailed explanation
- **Performance breakdown by topic** — color-coded bars so you can identify weak areas instantly
- All content is in **American English**, matching the language of the actual certification exam

The design goal is to familiarize you with both the Java 17 API and the vocabulary, phrasing, and trap patterns that Oracle uses in real exam questions.

---

## Project files

```
ocp17-simulator-en.html     ← The simulator (open this in a browser)
questions-pack-en-11.js     ← Questions 501–550
questions-pack-en-12.js     ← Questions 551–600
questions-pack-en-13.js     ← Questions 601–650
questions-pack-en-14.js     ← Questions 651–700
questions-pack-en-15.js     ← Questions 701–750
questions-pack-en-16.js     ← Questions 751–800
questions-pack-en-17.js     ← Questions 801–850
questions-pack-en-18.js     ← Questions 851–900
questions-pack-en-19.js     ← Questions 901–950
questions-pack-en-20.js     ← Questions 951–1000
```

The simulator ships with 50 built-in questions (IDs 1–50). Each pack file is a standalone JavaScript array that you paste into the simulator to expand the pool.

---

## How to add more questions

Every pack file follows the same structure:

```js
const QUESTIONS_PACK_EN_XX = [
  { id: 501, topic: "Streams", text: "...", code: `...`, options: [...], answer: 0, explanation: "..." },
  { id: 502, ... },
  ...
];
```

To integrate a pack into the simulator:

**Step 1.** Open `ocp17-simulator-en.html` in a text editor.

**Step 2.** Find the `ALL_QUESTIONS` array. It ends like this:

```js
const ALL_QUESTIONS = [
  { id: 1, ... },
  ...
  { id: 50, ... }   // ← last existing question — NO trailing comma yet
];                  // ← closing bracket
```

**Step 3.** Open a pack file (e.g. `questions-pack-en-11.js`) and copy everything **between** (but not including) the outer `[` and `]` of the array.

**Step 4.** In the simulator, add a comma after the last existing question object, then paste the copied content:

```js
const ALL_QUESTIONS = [
  { id: 1, ... },
  ...
  { id: 50, ... },   // ← add a comma here
  { id: 501, ... },  // ← pasted pack content starts here
  ...
  { id: 550, ... }   // ← last object of pack — no trailing comma
];
```

**Step 5.** Repeat for each additional pack, always appending to the end of `ALL_QUESTIONS`.

**Step 6.** Save the file and open it in a browser. The simulator automatically shuffles the pool and picks 50 questions per session — no other configuration needed.

> **Tip:** The more questions in the pool, the lower the chance of seeing the same session twice. With 1,000 questions loaded, every exam is a unique draw.

---

## Question format reference

Each question object must follow this schema:

```js
{
  id: 501,                          // Unique integer — must not collide with existing IDs
  topic: "Streams",                 // Label displayed in review. Use consistent names (see below)
  text: "What is the output of...", // Question stem — plain text
  code: `<span class="kw">var</span> x = ...`,  // Highlighted code (see syntax rules) OR null if no code
  options: [                        // Exactly 4 options as plain strings
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  answer: 0,                        // Zero-based index of the correct option (0=A, 1=B, 2=C, 3=D)
  explanation: "..."                // Detailed explanation of why the answer is correct
}
```

### Syntax highlighting classes

The `code` field uses inline `<span>` tags for coloring:

| Class | Applies to |
|-------|-----------|
| `kw` | Keywords (`class`, `if`, `return`, `new`, `var`, etc.) |
| `cls` | Class and interface names (`String`, `List`, `Stream`, etc.) |
| `str` | String literals (`"hello"`) |
| `num` | Numeric literals (`42`, `3.14`) |
| `cm` | Comments (`// line A`) |
| `ann` | Annotations (`@Override`, `@Retention`) |

Example:
```js
code: `<span class="kw">var</span> x = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt;();`
```

### Standard topic names

Use these exact strings in the `topic` field so the performance breakdown groups questions correctly:

```
Records              Sealed Classes        Pattern Matching
Streams              Collectors            Optional
Lambdas              Functional Interfaces Method References
Concurrency          CompletableFuture     Date & Time API
Collections          Generics              Modules (JPMS)
Exceptions           I/O & NIO             Serialization
OOP                  Abstract Classes      Interfaces
Enums                Switch Expressions    Text Blocks
Strings              var                   JVM & Memory
Annotations          Reflection            Design Patterns
Localization         BigDecimal            Inheritance
Inner Classes        Comparable            Bitwise
```

---

## Prompt to generate new question packs

Use the following prompt with Claude (or any capable LLM) to generate additional question packs in the exact same format:

---

> **PROMPT — OCP 17 Question Pack Generator**
>
> Generate a JavaScript file named `questions-pack-en-XX.js` containing a constant array called `QUESTIONS_PACK_EN_XX` with exactly **50 new Java OCP 17 exam simulation questions** in American English. All questions must be different from packs already generated (IDs 1–1000).
>
> **Mandatory rules:**
>
> 1. **Language:** All question stems, answer options, and explanations must be written in fluent, formal American English — exactly as they would appear in the real Oracle exam.
>
> 2. **Question IDs:** Start from the next available integer (e.g., 1001 if IDs 1–1000 already exist). Each ID must be unique.
>
> 3. **Structure:** Every object must follow this exact schema (no extra fields, no missing fields):
> ```js
> {
>   id: 1001,
>   topic: "Streams",
>   text: "What is the output of the following code?",
>   code: `...highlighted code...` or null,
>   options: ["Option A", "Option B", "Option C", "Option D"],
>   answer: 0,
>   explanation: "Detailed explanation of the correct answer..."
> }
> ```
>
> 4. **Syntax highlighting:** Use these `<span>` classes in the `code` field:
>    - `kw` → keywords (class, void, return, var, new, if, for, etc.)
>    - `cls` → class/interface/record/enum names
>    - `str` → string literals
>    - `num` → numeric literals
>    - `cm` → comments
>    - `ann` → annotations
>    Use `&lt;` and `&gt;` for angle brackets in generics.
>
> 5. **Answer correctness:** Every question must have exactly ONE unambiguously correct answer. Verify the output mentally or trace through the code before choosing the `answer` index.
>
> 6. **Explanations:** Must be precise and educational — explain WHY the answer is correct (step-by-step trace when relevant), and why the wrong options are wrong. Minimum 2 sentences.
>
> 7. **Topic distribution:** Spread the 50 questions across at least 10 different topics. Cover a mix of conceptual questions ("Which statement is CORRECT?"), output-tracing questions ("What is the output?"), and compilation questions ("Does the following code compile?").
>
> 8. **Difficulty calibration:** Mix difficulty levels proportionally — roughly 30% easier (API knowledge, straightforward output), 50% medium (non-obvious behavior, edge cases), 20% hard (traps, compound scenarios, less-known rules).
>
> 9. **Exam realism:** Use the same phrasing patterns as the real OCP exam:
>    - "What is the output of the following code?"
>    - "Which statement about X is CORRECT/INCORRECT?"
>    - "Does the following code compile?"
>    - "Which of the following best describes...?"
>    - Use options like "Compilation error", "Throws XxxException", "Non-deterministic"
>
> 10. **No duplicates:** Do not repeat questions from prior packs. Cover topics from this list (prioritize topics least covered so far): Records, Sealed Classes, Pattern Matching, Streams, Collectors, Optional, Lambdas, Functional Interfaces, Method References, Concurrency, CompletableFuture, Date & Time API, Collections, Generics, Modules (JPMS), Exceptions, I/O & NIO, Serialization, OOP, Abstract Classes, Interfaces, Enums, Switch Expressions, Text Blocks, Strings, var, JVM & Memory, Annotations, Reflection, Design Patterns, Localization, BigDecimal, Inheritance, Inner Classes, Comparable, Bitwise.
>
> 11. **Self-check before finalizing:** After writing each question, mentally verify:
>     - Is the `answer` index pointing to the correct option?
>     - Is the code syntactically valid Java?
>     - Does the explanation match the selected answer?
>     - Are there any ambiguous options that could also be considered correct?
>
> Output ONLY the complete JavaScript file. Do not add markdown fences, commentary before or after the code, or any text outside the JS file itself.

---

## Topics covered

The current bank of 1,000 questions covers the following OCP 17 exam domains:

| Domain | Key sub-topics |
|--------|---------------|
| Java SE 17 Language Features | Records, Sealed classes, Pattern matching, Text blocks, `var`, Switch expressions |
| Object-Oriented Programming | Inheritance, Polymorphism, Abstract classes, Interfaces, Inner/nested classes, Enums |
| Generics & Collections | Wildcards (PECS), Type erasure, List/Set/Map/Deque implementations, EnumSet/EnumMap |
| Functional Programming | Lambdas, Method references, Functional interfaces, Stream API, Optional |
| Concurrency | Thread lifecycle, Locks, Atomic classes, CompletableFuture, Executors, BlockingQueue |
| I/O & NIO.2 | Path, Files, WatchService, Serialization, try-with-resources |
| Modules (JPMS) | requires, exports, opens, uses/provides, ServiceLoader |
| Date & Time API | LocalDate/Time/DateTime, ZonedDateTime, Instant, Duration, Period |
| Exceptions | Hierarchy, multi-catch, chained exceptions, suppressed exceptions |
| JVM Internals | Stack/Heap/Metaspace, GC generations, WeakReference, JIT |
| Localization | Locale, NumberFormat, DateTimeFormatter, ResourceBundle |
| Other | BigDecimal, Math API, Reflection, Annotations, Design patterns |

---

## Running the simulator

1. Open `ocp17-simulator-en.html` directly in any modern browser (Chrome, Firefox, Edge, Safari)
2. No internet connection required after the first load (Google Fonts are fetched once)
3. For a fully offline setup, download the two fonts from Google Fonts and update the `<link>` in the HTML

---

## License

This project is for personal study purposes. Oracle, Java, and OCP are trademarks of Oracle Corporation.
