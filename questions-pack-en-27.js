// ═══════════════════════════════════════════════════════
//  PACK EN-28 — Questions 1351–1400  (English)
//  Topics: Sealed + generics, CompletableFuture deep,
//          Collectors partitioning/mapping combos,
//          Records hashCode/equals behavior, NIO.2
//          Files operations, Localization Locale.forLanguageTag,
//          BigDecimal comparison traps, ThreadLocal remove,
//          Lambda variable capture, Collections.synchronizedMap,
//          instanceof with generics, Switch null handling,
//          Comparator chaining, Stream.concat vs flatMap,
//          Exception message chains
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_28 = [
  {
    id: 1351, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Tag</span>(<span class="cls">String</span> name, <span class="cls">String</span> value) {}
<span class="cls">Set</span>&lt;<span class="cls">Tag</span>&gt; set = <span class="kw">new</span> <span class="cls">HashSet</span>&lt;&gt;();
set.add(<span class="kw">new</span> <span class="cls">Tag</span>(<span class="str">"env"</span>, <span class="str">"prod"</span>));
set.add(<span class="kw">new</span> <span class="cls">Tag</span>(<span class="str">"env"</span>, <span class="str">"prod"</span>));
set.add(<span class="kw">new</span> <span class="cls">Tag</span>(<span class="str">"env"</span>, <span class="str">"dev"</span>));
<span class="cls">System</span>.out.println(set.size());`,
    options: ["2", "3", "1", "Compilation error"],
    answer: 0,
    explanation: "Records auto-generate hashCode() and equals() based on all components. Tag('env','prod') equals another Tag('env','prod') → HashSet treats them as duplicate → size 1 from these two. Tag('env','dev') is different → set size = 2. Result: '2'."
  },
  {
    id: 1352, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; a = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">10</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; b = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">20</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; c = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">30</span>);
<span class="kw">int</span> sum = <span class="cls">Stream</span>.of(a, b, c)
    .mapToInt(<span class="cls">CompletableFuture</span>::join)
    .sum();
<span class="cls">System</span>.out.println(sum);`,
    options: ["60", "30", "Non-deterministic", "Compilation error"],
    answer: 0,
    explanation: "Three CompletableFutures run concurrently via supplyAsync. join() blocks until each completes. Stream.of processes in order a,b,c calling join() on each. sum=10+20+30=60. Always deterministic for the sum. Result: '60'."
  },
  {
    id: 1353, topic: "Collectors",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>)
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        n -> n % <span class="num">2</span> == <span class="num">0</span>,
        <span class="cls">Collectors</span>.mapping(<span class="cls">Object</span>::toString, <span class="cls">Collectors</span>.joining(<span class="str">","</span>))
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>));
<span class="cls">System</span>.out.println(r.get(<span class="kw">false</span>));`,
    options: ["2,4,6\n1,3,5", "1,3,5\n2,4,6", "2,4,6\n1,2,3", "Compilation error"],
    answer: 0,
    explanation: "partitioningBy even with mapping(toString, joining). true=[2,4,6] → '2,4,6'. false=[1,3,5] → '1,3,5'. Result: '2,4,6\\n1,3,5'."
  },
  {
    id: 1354, topic: "NIO.2",
    text: "What does the following code attempt to do and what is the likely output?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"test.txt"</span>);
<span class="cls">Files</span>.writeString(p, <span class="str">"Hello Java 17!"</span>);
<span class="cls">String</span> content = <span class="cls">Files</span>.readString(p);
<span class="cls">System</span>.out.println(content.length() + <span class="str">" "</span> + content.startsWith(<span class="str">"Hello"</span>));
<span class="cls">Files</span>.delete(p);`,
    options: [
      "14 true — Files.writeString and readString work with UTF-8 by default",
      "0 false — Files operations require absolute paths",
      "Throws IOException — readString is not a Files method",
      "Compilation error"
    ],
    answer: 0,
    explanation: "Files.writeString(Path, String) and Files.readString(Path) (Java 11+) use UTF-8 by default. 'Hello Java 17!' has 14 characters. content.startsWith('Hello')=true. Files.delete(p) cleans up. The relative path resolves to the current working directory. Result: '14 true'."
  },
  {
    id: 1355, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">Locale</span> l1 = <span class="cls">Locale</span>.forLanguageTag(<span class="str">"pt-BR"</span>);
<span class="cls">Locale</span> l2 = <span class="kw">new</span> <span class="cls">Locale</span>(<span class="str">"pt"</span>, <span class="str">"BR"</span>);
<span class="cls">System</span>.out.println(l1.equals(l2));
<span class="cls">System</span>.out.println(l1.getLanguage() + <span class="str">"-"</span> + l1.getCountry());`,
    options: ["true\npt-BR", "false\npt-BR", "true\nPT-BR", "Compilation error"],
    answer: 0,
    explanation: "Locale.forLanguageTag('pt-BR') creates locale for Brazilian Portuguese. new Locale('pt','BR') creates the same. equals() compares language and country: both 'pt' and 'BR' → true. getLanguage()='pt' (lowercase), getCountry()='BR' (uppercase). Result: 'true\\npt-BR'."
  },
  {
    id: 1356, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigDecimal</span> a = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"2.00"</span>);
<span class="cls">BigDecimal</span> b = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"2.0"</span>);
<span class="cls">BigDecimal</span> c = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"2"</span>);
<span class="cls">System</span>.out.println(a.equals(b));
<span class="cls">System</span>.out.println(a.compareTo(b) == <span class="num">0</span>);
<span class="cls">System</span>.out.println(a.compareTo(c) == <span class="num">0</span>);`,
    options: ["false\ntrue\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "Compilation error"],
    answer: 0,
    explanation: "BigDecimal.equals() considers BOTH value AND scale: 2.00 (scale=2) ≠ 2.0 (scale=1) → false. compareTo() ignores scale, compares numeric value: 2.00==2.0 → 0 → true. 2.00==2 → 0 → true. Always use compareTo() for BigDecimal numeric equality. Result: 'false\\ntrue\\ntrue'."
  },
  {
    id: 1357, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ThreadLocal</span>&lt;<span class="cls">Integer</span>&gt; tl = <span class="cls">ThreadLocal</span>.withInitial(() -> <span class="num">0</span>);
tl.set(<span class="num">5</span>);
<span class="cls">System</span>.out.println(tl.get());
tl.remove();
<span class="cls">System</span>.out.println(tl.get());
tl.set(<span class="num">10</span>);
<span class="cls">System</span>.out.println(tl.get());`,
    options: ["5\n0\n10", "5\nnull\n10", "5\n5\n10", "Compilation error"],
    answer: 0,
    explanation: "withInitial(()->0): initialValue=0. set(5): thread-local=5. get()=5. remove(): deletes the current thread's value. get(): initializer called again → 0. set(10): 10. get()=10. Result: '5\\n0\\n10'."
  },
  {
    id: 1358, topic: "Lambda",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>   base = <span class="num">10</span>;
<span class="cls">List</span>&lt;<span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt;&gt; suppliers = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">3</span>; i++) {
    <span class="kw">final int</span> fi = i;
    suppliers.add(() -> base + fi);
}
suppliers.forEach(s -> <span class="cls">System</span>.out.print(s.get() + <span class="str">" "</span>));`,
    options: ["11 12 13 ", "10 10 10 ", "13 13 13 ", "Compilation error"],
    answer: 0,
    explanation: "base=10 is effectively final. fi is declared final in each iteration, capturing the current value. Lambda 1: base+1=11. Lambda 2: base+2=12. Lambda 3: base+3=13. Each lambda captures its own fi. Result: '11 12 13 '."
  },
  {
    id: 1359, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; unsafe = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;(
    <span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>)
);
<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; safe = <span class="cls">Collections</span>.synchronizedMap(unsafe);
safe.put(<span class="str">"c"</span>, <span class="num">3</span>);
<span class="cls">System</span>.out.println(safe.size() + <span class="str">" "</span> + unsafe.size());`,
    options: ["3 3", "2 2", "3 2", "Compilation error"],
    answer: 0,
    explanation: "Collections.synchronizedMap wraps the original map — they share the same backing storage. Modifications via safe also modify unsafe. safe.put('c',3): both safe and unsafe now have 3 entries. safe.size()=3, unsafe.size()=3. Result: '3 3'."
  },
  {
    id: 1360, topic: "Generics",
    text: "Which of the following statements about generic type erasure is CORRECT?",
    code: null,
    options: [
      "Generic type information is preserved at runtime — List<String>.class returns String info",
      "Generic type parameters are erased at runtime; List<String> and List<Integer> both become List at runtime",
      "Type erasure only affects method parameters, not class-level generics",
      "Using var preserves generic type information at runtime"
    ],
    answer: 1,
    explanation: "Java uses type erasure: generic type parameters are removed during compilation and replaced by their bounds (usually Object). At runtime, List<String> and List<Integer> are both just List. This is why you can't do 'new T[]', 'instanceof List<String>', or 'T.class'. Raw types and unchecked warnings stem from this design choice for backward compatibility."
  },
  {
    id: 1361, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> o = <span class="kw">null</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(o) {
    <span class="kw">case null</span>    -> <span class="str">"null"</span>;
    <span class="kw">case</span> <span class="cls">String</span> s -> <span class="str">"str:"</span> + s;
    <span class="kw">default</span>      -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["null", "Throws NullPointerException", "other", "Compilation error"],
    answer: 0,
    explanation: "Java 21 (preview in earlier) allows 'case null' in pattern switch. When o=null, the 'case null' branch matches → returns 'null'. Without 'case null', a null selector would throw NPE. The explicit null case prevents the exception. Result: 'null'."
  },
  {
    id: 1362, topic: "Comparator",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Product</span>(<span class="cls">String</span> name, <span class="kw">int</span> price, <span class="kw">int</span> stock) {}
<span class="kw">var</span> products = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"A"</span>,<span class="num">100</span>,<span class="num">5</span>), <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"B"</span>,<span class="num">50</span>,<span class="num">10</span>),
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"C"</span>,<span class="num">100</span>,<span class="num">3</span>), <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"D"</span>,<span class="num">50</span>,<span class="num">7</span>)
);
products.stream()
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Product</span>::price)
        .reversed()
        .thenComparingInt(<span class="cls">Product</span>::stock))
    .forEach(p -> <span class="cls">System</span>.out.print(p.name() + <span class="str">" "</span>));`,
    options: ["C A D B ", "A C B D ", "B D A C ", "Compilation error"],
    answer: 0,
    explanation: "Sort: price descending (100 first), then stock ascending at same price. Price 100: C(stock=3), A(stock=5) → C before A. Price 50: B(stock=10), D(stock=7) → D before B. Wait: reversed() makes descending, thenComparingInt adds ascending stock for ties. Price 100: C(3<5) → C,A. Price 50: D(7<10) → D,B. Order: C A D B. Result: 'C A D B '."
  },
  {
    id: 1363, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="cls">Stream</span>&lt;<span class="cls">Integer</span>&gt; s1 = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>);
<span class="cls">Stream</span>&lt;<span class="cls">Integer</span>&gt; s2 = <span class="cls">Stream</span>.of(<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>);
<span class="kw">long</span> count = <span class="cls">Stream</span>.concat(s1, s2)
    .filter(n -> n % <span class="num">2</span> != <span class="num">0</span>)
    .peek(n -> <span class="cls">System</span>.out.print(n + <span class="str">" "</span>))
    .count();
<span class="cls">System</span>.out.println(count);`,
    options: ["1 3 5 3", "1 2 3 4 5 6 3", "1 3 5 ", "Compilation error"],
    answer: 0,
    explanation: "concat(s1,s2)=[1,2,3,4,5,6]. filter(odd)=[1,3,5]. peek prints each: '1 3 5 '. count()=3. Then println(3). Total output: '1 3 5 3'. Result: '1 3 5 3'."
  },
  {
    id: 1364, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="cls">Throwable</span> root   = <span class="kw">new</span> <span class="cls">Exception</span>(<span class="str">"root"</span>);
<span class="cls">Throwable</span> middle = <span class="kw">new</span> <span class="cls">RuntimeException</span>(<span class="str">"middle"</span>, root);
<span class="cls">Throwable</span> top    = <span class="kw">new</span> <span class="cls">IllegalStateException</span>(<span class="str">"top"</span>, middle);
<span class="cls">System</span>.out.println(top.getMessage());
<span class="cls">System</span>.out.println(top.getCause().getMessage());
<span class="cls">System</span>.out.println(top.getCause().getCause().getMessage());`,
    options: ["top\nmiddle\nroot", "root\nmiddle\ntop", "top\nroot\nmiddle", "Compilation error"],
    answer: 0,
    explanation: "Exception chain: top wraps middle, middle wraps root. top.getMessage()='top'. top.getCause()=middle → getMessage()='middle'. top.getCause().getCause()=root → getMessage()='root'. Result: 'top\\nmiddle\\nroot'."
  },
  {
    id: 1365, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Lazy</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Supplier</span>&lt;T&gt; supplier;
    <span class="kw">private</span> T value;
    <span class="kw">private boolean</span> computed;
    <span class="cls">Lazy</span>(<span class="cls">Supplier</span>&lt;T&gt; s) { supplier = s; }
    T get() {
        <span class="kw">if</span> (!computed) { value = supplier.get(); computed = <span class="kw">true</span>; }
        <span class="kw">return</span> value;
    }
}
<span class="kw">int</span>[] calls = {<span class="num">0</span>};
<span class="cls">Lazy</span>&lt;<span class="cls">String</span>&gt; lazy = <span class="kw">new</span> <span class="cls">Lazy</span>&lt;&gt;(() -> { calls[<span class="num">0</span>]++; <span class="kw">return</span> <span class="str">"ok"</span>; });
<span class="cls">System</span>.out.print(lazy.get() + lazy.get() + <span class="str">" "</span>);
<span class="cls">System</span>.out.println(calls[<span class="num">0</span>]);`,
    options: ["okok 1", "okok 2", "ok 1", "Compilation error"],
    answer: 0,
    explanation: "First get(): computed=false → calls supplier (calls[0]=1) → value='ok'. Second get(): computed=true → returns cached 'ok'. lazy.get()+lazy.get()='ok'+'ok'='okok'. calls[0]=1. Result: 'okok 1'."
  },
  {
    id: 1366, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(
    <span class="cls">Optional</span>.of(<span class="num">1</span>),
    <span class="cls">Optional</span>.empty(),
    <span class="cls">Optional</span>.of(<span class="num">3</span>),
    <span class="cls">Optional</span>.empty(),
    <span class="cls">Optional</span>.of(<span class="num">5</span>)
).flatMap(<span class="cls">Optional</span>::stream)
 .mapToInt(<span class="cls">Integer</span>::intValue)
 .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["9", "15", "5", "Compilation error"],
    answer: 0,
    explanation: "Optional::stream (Java 9+): present → Stream.of(value); empty → Stream.empty(). flatMap flattens: [1,3,5]. sum()=9. Result: '9'."
  },
  {
    id: 1367, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; generate(<span class="kw">int</span> n, <span class="cls">Supplier</span>&lt;T&gt; s) {
    <span class="kw">return</span> <span class="cls">Stream</span>.generate(s).limit(n).collect(<span class="cls">Collectors</span>.toList());
}
<span class="kw">int</span>[] counter = {<span class="num">0</span>};
<span class="kw">var</span> r = generate(<span class="num">5</span>, () -> ++counter[<span class="num">0</span>]);
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 2, 3, 4, 5]", "[0, 0, 0, 0, 0]", "[5, 5, 5, 5, 5]", "Compilation error"],
    answer: 0,
    explanation: "Stream.generate calls supplier each time. counter[0] increments: 1,2,3,4,5. Collected: [1,2,3,4,5]. Result: '[1, 2, 3, 4, 5]'."
  },
  {
    id: 1368, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">ZonedDateTime</span> nyc = <span class="cls">ZonedDateTime</span>.of(
    <span class="num">2024</span>,<span class="num">6</span>,<span class="num">15</span>, <span class="num">12</span>,<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>, <span class="cls">ZoneId</span>.of(<span class="str">"America/New_York"</span>)
);
<span class="cls">ZonedDateTime</span> london = nyc.withZoneSameInstant(<span class="cls">ZoneId</span>.of(<span class="str">"Europe/London"</span>));
<span class="cls">System</span>.out.println(london.getHour());`,
    options: ["17", "12", "7", "Compilation error"],
    answer: 0,
    explanation: "June 15 2024: NYC is EDT (UTC-4). London is BST (UTC+1). Difference: 5 hours. NYC 12:00 EDT = 16:00 UTC = 17:00 BST. london.getHour()=17. Result: '17'."
  },
  {
    id: 1369, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Box</span>&lt;T&gt; {
    T value;
    <span class="cls">Box</span>(T v) { value = v; }
    <span class="cls">Box</span>&lt;T&gt; with(T newVal) { <span class="kw">return new</span> <span class="cls">Box</span>&lt;&gt;(newVal); }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="str">"Box["</span> + value + <span class="str">"]"</span>; }
}
<span class="cls">Box</span>&lt;<span class="cls">Integer</span>&gt; b1 = <span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="num">1</span>);
<span class="cls">Box</span>&lt;<span class="cls">Integer</span>&gt; b2 = b1.with(<span class="num">2</span>);
<span class="cls">Box</span>&lt;<span class="cls">Integer</span>&gt; b3 = b2.with(<span class="num">3</span>);
<span class="cls">System</span>.out.println(b1 + <span class="str">" "</span> + b2 + <span class="str">" "</span> + b3);`,
    options: ["Box[1] Box[2] Box[3]", "Box[3] Box[3] Box[3]", "Box[1] Box[1] Box[1]", "Compilation error"],
    answer: 0,
    explanation: "Each with() creates a new Box instance. b1=Box[1], b2=Box[2] (new), b3=Box[3] (new). They are independent. Result: 'Box[1] Box[2] Box[3]'."
  },
  {
    id: 1370, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"java"</span>,<span class="str">"python"</span>,<span class="str">"go"</span>,<span class="str">"rust"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        s -> s.length() >= <span class="num">4</span> ? <span class="str">"long"</span> : <span class="str">"short"</span>,
        <span class="cls">Collectors</span>.counting()
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k+<span class="str">"="</span>+v+<span class="str">" "</span>));`,
    options: ["long=3 short=1 ", "long=2 short=2 ", "long=4 short=0 ", "Compilation error"],
    answer: 0,
    explanation: "java(4>=4→long), python(6>=4→long), go(2<4→short), rust(4>=4→long). long=3: java,python,rust. short=1: go. TreeMap: long < short alphabetically. Result: 'long=3 short=1 '."
  },
  {
    id: 1371, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Planet</span> {
    EARTH(<span class="num">5.976e24</span>, <span class="num">6.37814e6</span>),
    MARS (<span class="num">6.421e23</span>, <span class="num">3.3972e6</span>);
    <span class="kw">final double</span> mass, radius;
    <span class="kw">static final double</span> G = <span class="num">6.67300E-11</span>;
    <span class="cls">Planet</span>(<span class="kw">double</span> m, <span class="kw">double</span> r) { mass=m; radius=r; }
    <span class="kw">double</span> gravity() { <span class="kw">return</span> G * mass / (radius * radius); }
}
<span class="cls">System</span>.out.println(<span class="cls">Planet</span>.EARTH.gravity() > <span class="cls">Planet</span>.MARS.gravity());`,
    options: ["true", "false", "Compilation error", "Throws ArithmeticException"],
    answer: 0,
    explanation: "Earth surface gravity ≈ 9.8 m/s², Mars ≈ 3.7 m/s². Earth gravity > Mars gravity → true. Result: 'true'."
  },
  {
    id: 1372, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">DoubleUnaryOperator</span> celsius2F = c -> c * <span class="num">9</span>/<span class="num">5</span> + <span class="num">32</span>;
<span class="cls">DoubleUnaryOperator</span> addOffset = f -> f + <span class="num">2.0</span>;
<span class="cls">DoubleUnaryOperator</span> composed = addOffset.compose(celsius2F);
<span class="cls">System</span>.out.printf(<span class="str">"%.1f%n"</span>, composed.applyAsDouble(<span class="num">100</span>));`,
    options: ["214.0", "212.0", "202.0", "Compilation error"],
    answer: 0,
    explanation: "compose(g): applies g first, then this. composed = addOffset.compose(celsius2F): first celsius2F(100)=212.0F, then addOffset(212.0)=214.0. printf('%.1f')='214.0'. Result: '214.0'."
  },
  {
    id: 1373, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Animal</span> {
    <span class="kw">String</span> sound() { <span class="kw">return</span> <span class="str">"..."</span>; }
}
<span class="kw">class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="kw">String</span> sound() { <span class="kw">return</span> <span class="str">"woof"</span>; }
    <span class="kw">String</span> fetch() { <span class="kw">return</span> <span class="str">"fetching"</span>; }
}
<span class="cls">Animal</span> a = <span class="kw">new</span> <span class="cls">Dog</span>();
<span class="cls">System</span>.out.println(a.sound());
<span class="kw">if</span> (a <span class="kw">instanceof</span> <span class="cls">Dog</span> d) {
    <span class="cls">System</span>.out.println(d.fetch());
}`,
    options: ["woof\nfetching", "...\nfetching", "woof\nfetching", "Compilation error"],
    answer: 0,
    explanation: "a.sound(): runtime type Dog → 'woof'. instanceof Dog d: true, d bound to Dog reference. d.fetch()='fetching'. Result: 'woof\\nfetching'."
  },
  {
    id: 1374, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .reduce(<span class="cls">StringBuilder</span>::<span class="kw">new</span>,
        (<span class="kw">sb</span>, n) -> { sb.append(n); <span class="kw">return</span> sb; },
        (<span class="kw">sb1</span>, <span class="kw">sb2</span>) -> sb1.append(sb2))
    .toString();
<span class="cls">System</span>.out.println(r);`,
    options: ["12345", "Compilation error — wrong reduce signature", "1\n2\n3\n4\n5", "54321"],
    answer: 0,
    explanation: "reduce(identity supplier, accumulator, combiner): used for mutable reduction. Sequential: identity creates new SB, accumulator appends each number. Combiner is for parallel (not used here). SB='12345'. toString()='12345'. Result: '12345'."
  },
  {
    id: 1375, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Enum</span>&lt;T&gt;&gt; T fromName(<span class="cls">Class</span>&lt;T&gt; type, <span class="cls">String</span> name) {
    <span class="kw">return</span> <span class="cls">Enum</span>.valueOf(type, name);
}
<span class="kw">enum</span> <span class="cls">Color</span> { RED, GREEN, BLUE }
<span class="cls">System</span>.out.println(fromName(<span class="cls">Color</span>.<span class="kw">class</span>, <span class="str">"GREEN"</span>).ordinal());`,
    options: ["1", "0", "2", "Compilation error"],
    answer: 0,
    explanation: "Enum.valueOf(Class<T>, String) returns the enum constant with the specified name. Color.GREEN.ordinal()=1 (RED=0, GREEN=1, BLUE=2). Result: '1'."
  },
  {
    id: 1376, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"abcde"</span>;
<span class="cls">System</span>.out.println(s.chars()
    .reduce(<span class="num">0</span>, (acc, c) -> acc + c - <span class="str">'a'</span>));`,
    options: ["10", "5", "485", "Compilation error"],
    answer: 0,
    explanation: "chars() gives: a=97,b=98,c=99,d=100,e=101. reduce: (0+97-97)=0, (0+98-97)=1, (1+99-97)=3, (3+100-97)=6, (6+101-97)=10. Sum of 0+1+2+3+4=10. Result: '10'."
  },
  {
    id: 1377, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="str">"hello"</span>)
        .thenApply(<span class="cls">String</span>::toUpperCase)
        .whenComplete((v, e) -> <span class="cls">System</span>.out.print(v + <span class="str">" "</span>));
<span class="cls">System</span>.out.println(f.join());`,
    options: ["HELLO HELLO", "HELLO hello", "hello HELLO", "Compilation error"],
    answer: 0,
    explanation: "supplyAsync→'hello'. thenApply→'HELLO'. whenComplete: v='HELLO', prints 'HELLO '. whenComplete doesn't change the value — it returns a CompletableFuture with the SAME value 'HELLO'. f.join()='HELLO'. println: 'HELLO'. Total: 'HELLO HELLO'. Result: 'HELLO HELLO'."
  },
  {
    id: 1378, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Shape</span> {
    <span class="kw">double</span> area();
    <span class="kw">default</span> <span class="cls">String</span> summary() {
        <span class="kw">return</span> getClass().getSimpleName() + <span class="str">"="</span> + <span class="cls">String</span>.format(<span class="str">"%.2f"</span>, area());
    }
}
<span class="kw">record</span> <span class="cls">Square</span>(<span class="kw">double</span> side) <span class="kw">implements</span> <span class="cls">Shape</span> {
    <span class="kw">public double</span> area() { <span class="kw">return</span> side * side; }
}
<span class="cls">List</span>&lt;<span class="cls">Shape</span>&gt; shapes = <span class="cls">List</span>.of(<span class="kw">new</span> <span class="cls">Square</span>(<span class="num">3</span>), <span class="kw">new</span> <span class="cls">Square</span>(<span class="num">4</span>));
shapes.stream().map(<span class="cls">Shape</span>::summary).forEach(<span class="cls">System</span>.out::println);`,
    options: ["Square=9.00\nSquare=16.00", "Shape=9.00\nShape=16.00", "Square=9\nSquare=16", "Compilation error"],
    answer: 0,
    explanation: "summary() uses getClass().getSimpleName() → 'Square'. area(): Square(3)=9.0, Square(4)=16.0. format('%.2f'): 9.00, 16.00. Result: 'Square=9.00\\nSquare=16.00'."
  },
  {
    id: 1379, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; a = <span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>);
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; b = <span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>);
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; c = <span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">2</span>,<span class="num">1</span>);
<span class="cls">System</span>.out.println(a.equals(b));
<span class="cls">System</span>.out.println(a.equals(c));
<span class="cls">System</span>.out.println(a.hashCode() == b.hashCode());`,
    options: ["true\nfalse\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "true\nfalse\nfalse"],
    answer: 0,
    explanation: "List.equals() compares elements in order. a=[1,2,3]==b=[1,2,3] → true. a=[1,2,3]≠c=[3,2,1] → false. Equal lists must have equal hashCodes (contract). a.hashCode()==b.hashCode() → true. Result: 'true\\nfalse\\ntrue'."
  },
  {
    id: 1380, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"sun"</span>,<span class="str">"moon"</span>,<span class="str">"star"</span>,<span class="str">"sky"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">Function</span>.identity(),
        s -> (long) s.chars().filter(c -> <span class="str">"aeiou"</span>.indexOf(c) >= <span class="num">0</span>).count()
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["moon=2 sky=0 star=1 sun=1 ", "sun=1 moon=2 star=1 sky=0 ", "moon=2 star=1 sun=1 sky=0 ", "Compilation error"],
    answer: 0,
    explanation: "Count vowels: sun(u=1), moon(o,o=2), star(a=1), sky(0). toMap creates map. TreeMap sorted: moon < sky < star < sun. forEach: 'moon=2 sky=0 star=1 sun=1 '. Result: 'moon=2 sky=0 star=1 sun=1 '."
  },
  {
    id: 1381, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; repeat(<span class="cls">T</span> val, <span class="kw">int</span> times) {
    <span class="kw">return</span> <span class="cls">Collections</span>.nCopies(times, val);
}
<span class="kw">var</span> r = repeat(<span class="str">"x"</span>, <span class="num">3</span>);
<span class="cls">System</span>.out.println(r + <span class="str">" "</span> + r.size() + <span class="str">" "</span> + (r.get(<span class="num">0</span>) == r.get(<span class="num">1</span>)));`,
    options: ["[x, x, x] 3 true", "[x, x, x] 3 false", "[x] 1 true", "Compilation error"],
    answer: 0,
    explanation: "Collections.nCopies(3,'x'): a list of 3 references ALL pointing to the same 'x' string object. r.get(0)==r.get(1): same reference → true. size()=3. Result: '[x, x, x] 3 true'."
  },
  {
    id: 1382, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Counter</span> {
    <span class="kw">private int</span> n = <span class="num">0</span>;
    <span class="kw">int</span>  next()    { <span class="kw">return</span> ++n; }
    <span class="kw">void</span> reset()   { n = <span class="num">0</span>; }
    <span class="kw">static</span> <span class="cls">Counter</span> from(<span class="kw">int</span> start) {
        <span class="cls">Counter</span> c = <span class="kw">new</span> <span class="cls">Counter</span>(); c.n = start - <span class="num">1</span>; <span class="kw">return</span> c;
    }
}
<span class="cls">Counter</span> c = <span class="cls">Counter</span>.from(<span class="num">5</span>);
<span class="cls">System</span>.out.println(c.next() + <span class="str">" "</span> + c.next());
c.reset();
<span class="cls">System</span>.out.println(c.next());`,
    options: ["5 6\n1", "6 7\n1", "5 6\n0", "Compilation error"],
    answer: 0,
    explanation: "Counter.from(5): n=5-1=4. next(): n=5. next(): n=6. reset(): n=0. next(): n=1. Result: '5 6\\n1'."
  },
  {
    id: 1383, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .takeWhile(n -> n < <span class="num">4</span>)
    .reduce(<span class="num">1</span>, (a, b) -> a * b);
<span class="cls">System</span>.out.println(r);`,
    options: ["6", "24", "1", "120"],
    answer: 0,
    explanation: "takeWhile(n<4): takes 1,2,3 (stops when 4 is encountered, not included). reduce(1, *): 1*1=1, 1*2=2, 2*3=6. Result: '6'."
  },
  {
    id: 1384, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> date = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">2</span>, <span class="num">29</span>); <span class="cm">// leap year</span>
<span class="cls">System</span>.out.println(date.plusYears(<span class="num">1</span>));
<span class="cls">System</span>.out.println(date.plusYears(<span class="num">4</span>));`,
    options: ["2025-02-28\n2028-02-29", "2025-02-29\n2028-02-29", "Throws DateTimeException", "2025-03-01\n2028-02-29"],
    answer: 0,
    explanation: "Feb 29, 2024 + 1 year = Feb 29, 2025 — but 2025 is not a leap year! Java adjusts to the last valid day: Feb 28, 2025. + 4 years: Feb 29, 2028 — 2028 IS a leap year → valid. Result: '2025-02-28\\n2028-02-29'."
  },
  {
    id: 1385, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">void</span> go(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n == <span class="num">0</span>) <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"zero"</span>);
    <span class="kw">try</span> { go(n - <span class="num">1</span>); }
    <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
        <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"level-"</span>+n, e);
    }
}
<span class="kw">try</span> { go(<span class="num">2</span>); }
<span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.println(e.getMessage());
    <span class="cls">System</span>.out.println(e.getCause().getMessage());
    <span class="cls">System</span>.out.println(e.getCause().getCause().getMessage());
}`,
    options: ["level-2\nlevel-1\nzero", "zero\nlevel-1\nlevel-2", "level-1\nlevel-2\nzero", "Compilation error"],
    answer: 0,
    explanation: "go(2)→go(1)→go(0) throws 'zero'. go(1) catches and wraps: RuntimeException('level-1', cause='zero'). go(2) catches and wraps: RuntimeException('level-2', cause='level-1'). Top exception: e.getMessage()='level-2'. getCause()='level-1'. getCause().getCause()='zero'. Result: 'level-2\\nlevel-1\\nzero'."
  },
  {
    id: 1386, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Expr</span> {
    <span class="kw">abstract</span> <span class="kw">int</span> eval();
    <span class="cls">Expr</span> plus(<span class="cls">Expr</span> other) {
        <span class="cls">Expr</span> self = <span class="kw">this</span>;
        <span class="kw">return new</span> <span class="cls">Expr</span>() { <span class="kw">public int</span> eval() { <span class="kw">return</span> self.eval() + other.eval(); } };
    }
}
<span class="cls">Expr</span> three = <span class="kw">new</span> <span class="cls">Expr</span>() { <span class="kw">public int</span> eval() { <span class="kw">return</span> <span class="num">3</span>; } };
<span class="cls">Expr</span> four  = <span class="kw">new</span> <span class="cls">Expr</span>() { <span class="kw">public int</span> eval() { <span class="kw">return</span> <span class="num">4</span>; } };
<span class="cls">System</span>.out.println(three.plus(four).eval());`,
    options: ["7", "12", "3", "Compilation error"],
    answer: 0,
    explanation: "plus(four) creates anonymous Expr that returns self.eval()+other.eval()=3+4=7. eval()=7. Result: '7'."
  },
  {
    id: 1387, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">boolean</span> sameType(<span class="cls">T</span> a, <span class="cls">T</span> b) {
    <span class="kw">return</span> a.getClass() == b.getClass();
}
<span class="cls">System</span>.out.println(sameType(<span class="str">"hello"</span>, <span class="str">"world"</span>));
<span class="cls">System</span>.out.println(sameType(<span class="num">1</span>, <span class="num">2L</span>));
<span class="cls">System</span>.out.println(sameType(<span class="num">1</span>, <span class="str">"one"</span>));`,
    options: ["true\nfalse\nfalse", "true\ntrue\ntrue", "false\nfalse\nfalse", "Compilation error"],
    answer: 0,
    explanation: "sameType(String,String): same class → true. sameType(Integer,Long): 1 autoboxes to Integer, 2L to Long. Integer.class≠Long.class → false. sameType(Integer,String): different → false. Result: 'true\\nfalse\\nfalse'."
  },
  {
    id: 1388, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"alpha"</span>, <span class="str">"beta"</span>, <span class="str">"gamma"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s.charAt(<span class="num">0</span>),
        s -> s
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["a=alpha b=beta g=gamma ", "alpha=a beta=b gamma=g ", "a=alpha b=beta ", "Compilation error"],
    answer: 0,
    explanation: "toMap: key=first char, value=word. No collisions. TreeMap sorted by key (Character): a < b < g. forEach: 'a=alpha b=beta g=gamma '. Result: 'a=alpha b=beta g=gamma '."
  },
  {
    id: 1389, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Transformer</span>&lt;T, R&gt; {
    R transform(T input);
    <span class="kw">default</span> &lt;V&gt; <span class="cls">Transformer</span>&lt;T, V&gt; andThen(<span class="cls">Transformer</span>&lt;R, V&gt; after) {
        <span class="kw">return</span> input -> after.transform(<span class="kw">this</span>.transform(input));
    }
}
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; len = <span class="cls">String</span>::length;
<span class="cls">Transformer</span>&lt;<span class="cls">Integer</span>, <span class="cls">Boolean</span>&gt; even = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>, <span class="cls">Boolean</span>&gt; evenLen = len.andThen(even);
<span class="cls">System</span>.out.println(evenLen.transform(<span class="str">"hello"</span>));
<span class="cls">System</span>.out.println(evenLen.transform(<span class="str">"java"</span>));`,
    options: ["false\ntrue", "true\nfalse", "false\nfalse", "Compilation error"],
    answer: 0,
    explanation: "'hello'.length()=5, 5%2=1≠0 → false. 'java'.length()=4, 4%2=0 → true. Result: 'false\\ntrue'."
  },
  {
    id: 1390, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Deque</span>&lt;<span class="cls">String</span>&gt; stack = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
<span class="kw">for</span> (<span class="cls">String</span> word : <span class="str">"the quick brown"</span>.split(<span class="str">" "</span>)) {
    stack.push(word);
}
<span class="cls">StringBuilder</span> sb = <span class="kw">new</span> <span class="cls">StringBuilder</span>();
<span class="kw">while</span> (!stack.isEmpty()) {
    sb.append(stack.pop());
    <span class="kw">if</span> (!stack.isEmpty()) sb.append(<span class="str">" "</span>);
}
<span class="cls">System</span>.out.println(sb);`,
    options: ["brown quick the", "the quick brown", "quick brown the", "Compilation error"],
    answer: 0,
    explanation: "push (LIFO): pushes 'the', then 'quick', then 'brown' — top is 'brown'. pop order: brown, quick, the. joined with spaces: 'brown quick the'. Result: 'brown quick the'."
  },
  {
    id: 1391, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.counting(),
        <span class="cls">Collectors</span>.averagingInt(<span class="cls">Integer</span>::intValue),
        (cnt, avg) -> <span class="str">"n="</span> + cnt + <span class="str">" avg="</span> + avg
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["n=5 avg=3.0", "n=5 avg=15.0", "n=3 avg=3.0", "Compilation error"],
    answer: 0,
    explanation: "teeing: counting=5, averagingInt=(1+2+3+4+5)/5=3.0. Merger: 'n=5 avg=3.0'. Result: 'n=5 avg=3.0'."
  },
  {
    id: 1392, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">EventBus</span>&lt;T&gt; {
    <span class="kw">private final</span> <span class="cls">List</span>&lt;<span class="cls">Consumer</span>&lt;T&gt;&gt; handlers = <span class="kw">new</span> <span class="cls">CopyOnWriteArrayList</span>&lt;&gt;();
    <span class="kw">void</span> subscribe(<span class="cls">Consumer</span>&lt;T&gt; h)   { handlers.add(h); }
    <span class="kw">void</span> publish(T event) { handlers.forEach(h -> h.accept(event)); }
}
<span class="cls">EventBus</span>&lt;<span class="cls">String</span>&gt; bus = <span class="kw">new</span> <span class="cls">EventBus</span>&lt;&gt;();
<span class="kw">int</span>[] count = {<span class="num">0</span>};
bus.subscribe(e -> <span class="cls">System</span>.out.print(e.toUpperCase() + <span class="str">" "</span>));
bus.subscribe(e -> count[<span class="num">0</span>]++);
bus.publish(<span class="str">"hello"</span>);
bus.publish(<span class="str">"world"</span>);
<span class="cls">System</span>.out.println(count[<span class="num">0</span>]);`,
    options: ["HELLO WORLD 2", "HELLO WORLD 1", "hello world 2", "Compilation error"],
    answer: 0,
    explanation: "Two subscribers. publish('hello'): first prints 'HELLO ', second increments count=1. publish('world'): first prints 'WORLD ', second increments count=2. println(count[0])=2. Result: 'HELLO WORLD 2'."
  },
  {
    id: 1393, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;A, B&gt; <span class="cls">Function</span>&lt;A, B&gt; memoize(<span class="cls">Function</span>&lt;A, B&gt; fn) {
    <span class="cls">Map</span>&lt;A, B&gt; cache = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
    <span class="kw">return</span> a -> cache.computeIfAbsent(a, fn);
}
<span class="kw">int</span>[] calls = {<span class="num">0</span>};
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt; sq = memoize(n -> { calls[<span class="num">0</span>]++; <span class="kw">return</span> n*n; });
sq.apply(<span class="num">3</span>); sq.apply(<span class="num">4</span>); sq.apply(<span class="num">3</span>); sq.apply(<span class="num">4</span>); sq.apply(<span class="num">5</span>);
<span class="cls">System</span>.out.println(sq.apply(<span class="num">3</span>) + <span class="str">" calls="</span> + calls[<span class="num">0</span>]);`,
    options: ["9 calls=3", "9 calls=6", "9 calls=5", "Compilation error"],
    answer: 0,
    explanation: "memoize: computeIfAbsent only calls fn on cache miss. apply(3)→miss (calls=1,cache:{3=9}). apply(4)→miss (calls=2,cache:{3=9,4=16}). apply(3)→hit. apply(4)→hit. apply(5)→miss (calls=3). apply(3)→hit, returns 9. calls=3. Result: '9 calls=3'."
  },
  {
    id: 1394, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">6</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.groupingBy(
        n -> n % <span class="num">3</span>,
        <span class="cls">Collectors</span>.toList()
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">":"</span> + v + <span class="str">" "</span>));`,
    options: ["0:[3, 6] 1:[1, 4] 2:[2, 5] ", "1:[1, 4] 2:[2, 5] 0:[3, 6] ", "0:[6, 3] 1:[4, 1] 2:[5, 2] ", "Compilation error"],
    answer: 0,
    explanation: "Group by n%3: 0:{3,6}, 1:{1,4}, 2:{2,5}. TreeMap sorts by key: 0,1,2. Result: '0:[3, 6] 1:[1, 4] 2:[2, 5] '."
  },
  {
    id: 1395, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Result</span>&lt;T&gt; <span class="kw">permits</span> <span class="cls">Ok</span>, <span class="cls">Err</span> {}
<span class="kw">record</span> <span class="cls">Ok</span>&lt;T&gt;(T value)     <span class="kw">implements</span> <span class="cls">Result</span>&lt;T&gt; {}
<span class="kw">record</span> <span class="cls">Err</span>&lt;T&gt;(<span class="cls">String</span> msg) <span class="kw">implements</span> <span class="cls">Result</span>&lt;T&gt; {}
<span class="kw">static</span> &lt;T&gt; <span class="cls">String</span> describe(<span class="cls">Result</span>&lt;T&gt; r) {
    <span class="kw">return switch</span>(r) {
        <span class="kw">case</span> <span class="cls">Ok</span>&lt;T&gt;  ok  -> <span class="str">"ok:"</span>  + ok.value();
        <span class="kw">case</span> <span class="cls">Err</span>&lt;T&gt; err -> <span class="str">"err:"</span> + err.msg();
    };
}
<span class="cls">System</span>.out.println(describe(<span class="kw">new</span> <span class="cls">Ok</span>&lt;&gt;(<span class="num">42</span>)));
<span class="cls">System</span>.out.println(describe(<span class="kw">new</span> <span class="cls">Err</span>&lt;<span class="cls">Integer</span>&gt;(<span class="str">"oops"</span>)));`,
    options: ["ok:42\nerr:oops", "ok:oops\nerr:42", "42\noops", "Compilation error"],
    answer: 0,
    explanation: "Sealed Result with Ok and Err records. describe(Ok(42)): case Ok → 'ok:42'. describe(Err('oops')): case Err → 'err:oops'. Result: 'ok:42\\nerr:oops'."
  },
  {
    id: 1396, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"java17ocp"</span>;
<span class="cls">System</span>.out.println(s.replaceAll(<span class="str">"[0-9]+"</span>, <span class="str">"#"</span>));
<span class="cls">System</span>.out.println(s.replaceFirst(<span class="str">"[a-z]"</span>, <span class="str">"X"</span>));
<span class="cls">System</span>.out.println(s.matches(<span class="str">".*[0-9]+.*"</span>));`,
    options: ["java#ocp\nXava17ocp\ntrue", "java17ocp\nXava17ocp\nfalse", "java#ocp\njava17ocp\ntrue", "Compilation error"],
    answer: 0,
    explanation: "replaceAll('[0-9]+','#'): replaces '17' with '#' → 'java#ocp'. replaceFirst('[a-z]','X'): replaces first lowercase letter ('j') → 'Xava17ocp'. matches('.*[0-9]+.*'): contains digits → true. Result: 'java#ocp\\nXava17ocp\\ntrue'."
  },
  {
    id: 1397, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f1 = <span class="cls">CompletableFuture</span>.supplyAsync(() -> {
    <span class="kw">try</span> { <span class="cls">Thread</span>.sleep(<span class="num">100</span>); } <span class="kw">catch</span> (<span class="cls">Exception</span> e) {}
    <span class="kw">return</span> <span class="str">"slow"</span>;
});
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f2 =
    <span class="cls">CompletableFuture</span>.completedFuture(<span class="str">"fast"</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; first =
    f1.applyToEither(f2, s -> s.toUpperCase());
<span class="cls">System</span>.out.println(first.get());`,
    options: ["FAST", "SLOW", "Non-deterministic (FAST or SLOW)", "Compilation error"],
    answer: 0,
    explanation: "applyToEither: returns the result of the first to complete. f2 is already completed ('fast'). f1 takes 100ms. f2 wins → 'fast'.toUpperCase()='FAST'. In practice always 'FAST' because f2 is immediately done. Result: 'FAST'."
  },
  {
    id: 1398, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Circle</span>(<span class="kw">double</span> radius) {
    <span class="kw">double</span> area()         { <span class="kw">return</span> <span class="cls">Math</span>.PI * radius * radius; }
    <span class="kw">double</span> circumference(){ <span class="kw">return</span> <span class="num">2</span> * <span class="cls">Math</span>.PI * radius; }
    <span class="kw">boolean</span> containsPoint(<span class="kw">double</span> x, <span class="kw">double</span> y) {
        <span class="kw">return</span> x*x + y*y <= radius*radius;
    }
}
<span class="cls">Circle</span> c = <span class="kw">new</span> <span class="cls">Circle</span>(<span class="num">5</span>);
<span class="cls">System</span>.out.println(c.containsPoint(<span class="num">3</span>,<span class="num">4</span>));
<span class="cls">System</span>.out.println(c.containsPoint(<span class="num">4</span>,<span class="num">4</span>));`,
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "Compilation error"],
    answer: 0,
    explanation: "containsPoint(3,4): 3²+4²=9+16=25 <= 5²=25 → true (on boundary). containsPoint(4,4): 4²+4²=16+16=32 > 25 → false. Result: 'true\\nfalse'."
  },
  {
    id: 1399, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"bb"</span>,<span class="str">"ccc"</span>,<span class="str">"dddd"</span>,<span class="str">"eeeee"</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.maxBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)),
        <span class="cls">Collectors</span>.minBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)),
        (max, min) -> max.map(<span class="cls">String</span>::length).orElse(<span class="num">0</span>)
                   - min.map(<span class="cls">String</span>::length).orElse(<span class="num">0</span>)
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["4", "5", "1", "Compilation error"],
    answer: 0,
    explanation: "maxBy length: 'eeeee'(5). minBy length: 'a'(1). max.length=5, min.length=1. Difference=5-1=4. Result: '4'."
  },
  {
    id: 1400, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Map</span>&lt;<span class="cls">String</span>, T&gt; mapOf(<span class="cls">Object</span>... keyValues) {
    <span class="cls">Map</span>&lt;<span class="cls">String</span>, T&gt; m = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;();
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < keyValues.length; i += <span class="num">2</span>) {
        m.put((<span class="cls">String</span>)keyValues[i], (T)keyValues[i+<span class="num">1</span>]);
    }
    <span class="kw">return</span> m;
}
<span class="kw">var</span> m = mapOf(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">3</span>);
<span class="cls">System</span>.out.println(m);`,
    options: ["{a=1, b=2, c=3}", "{c=3, b=2, a=1}", "{a=1}", "Throws ClassCastException"],
    answer: 0,
    explanation: "mapOf uses varargs, iterates pairs: ('a',1),('b',2),('c',3). LinkedHashMap preserves insertion order. toString: '{a=1, b=2, c=3}'. Result: '{a=1, b=2, c=3}'."
  }
];
