// ═══════════════════════════════════════════════════════
//  PACK EN-25 — Questions 1201–1250  (English)
//  Topics: Records with interfaces + sealed, advanced
//          Stream collectors, switch exhaustiveness,
//          Generics type inference, Concurrency patterns,
//          String methods Java 17, NIO Path operations,
//          Functional composition, Collections advanced,
//          Exception handling patterns, OOP deep,
//          Date/Time advanced, Modules advanced,
//          Pattern matching complex, Annotations meta
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_25 = [
  {
    id: 1201, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,<span class="num">8</span>,<span class="num">9</span>,<span class="num">10</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        n -> n <= <span class="num">3</span> ? <span class="str">"low"</span> : n <= <span class="num">7</span> ? <span class="str">"mid"</span> : <span class="str">"high"</span>,
        <span class="cls">Collectors</span>.summingInt(<span class="cls">Integer</span>::intValue)
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["high=27 low=6 mid=22 ", "low=6 mid=22 high=27 ", "high=27 mid=22 low=6 ", "Compilation error"],
    answer: 0,
    explanation: "Group and sum: low=[1,2,3]→6, mid=[4,5,6,7]→22, high=[8,9,10]→27. TreeMap alphabetical: high < low < mid. Result: 'high=27 low=6 mid=22 '."
  },
  {
    id: 1202, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> words = <span class="cls">List</span>.of(<span class="str">"the"</span>,<span class="str">"quick"</span>,<span class="str">"brown"</span>,<span class="str">"fox"</span>,<span class="str">"jumps"</span>);
<span class="cls">Map</span>&lt;<span class="cls">Integer</span>,<span class="cls">String</span>&gt; r = words.stream()
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">String</span>::length,
        <span class="cls">String</span>::toUpperCase,
        (<span class="kw">String</span> a, <span class="kw">String</span> b) -> a + <span class="str">"|"</span> + b,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>
    ));
<span class="cls">System</span>.out.println(r.get(<span class="num">5</span>));`,
    options: ["QUICK|BROWN|JUMPS", "QUICK", "BROWN|JUMPS", "Compilation error"],
    answer: 0,
    explanation: "toMap with merge and TreeMap. Length 5: quick(5), brown(5), jumps(5). Merge: QUICK|BROWN, then QUICK|BROWN|JUMPS. r.get(5)='QUICK|BROWN|JUMPS'. Result: 'QUICK|BROWN|JUMPS'."
  },
  {
    id: 1203, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Expr</span> <span class="kw">permits</span> <span class="cls">Lit</span>, <span class="cls">Add</span>, <span class="cls">Mul</span> {}
<span class="kw">record</span> <span class="cls">Lit</span>(<span class="kw">int</span> n)               <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">record</span> <span class="cls">Add</span>(<span class="cls">Expr</span> l, <span class="cls">Expr</span> r)      <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">record</span> <span class="cls">Mul</span>(<span class="cls">Expr</span> l, <span class="cls">Expr</span> r)      <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">static int</span> eval(<span class="cls">Expr</span> e) {
    <span class="kw">return switch</span>(e) {
        <span class="kw">case</span> <span class="cls">Lit</span>(var n)       -> n;
        <span class="kw">case</span> <span class="cls">Add</span>(var l, var r) -> eval(l) + eval(r);
        <span class="kw">case</span> <span class="cls">Mul</span>(var l, var r) -> eval(l) * eval(r);
    };
}
<span class="cls">Expr</span> e = <span class="kw">new</span> <span class="cls">Mul</span>(<span class="kw">new</span> <span class="cls">Add</span>(<span class="kw">new</span> <span class="cls">Lit</span>(<span class="num">2</span>), <span class="kw">new</span> <span class="cls">Lit</span>(<span class="num">3</span>)), <span class="kw">new</span> <span class="cls">Lit</span>(<span class="num">4</span>));
<span class="cls">System</span>.out.println(eval(e));`,
    options: ["20", "24", "14", "Compilation error"],
    answer: 0,
    explanation: "eval(Mul(Add(Lit(2),Lit(3)), Lit(4))): eval(Add(2,3))=2+3=5. eval(Lit(4))=4. Mul: 5*4=20. Result: '20'."
  },
  {
    id: 1204, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Shape</span> <span class="kw">permits</span> <span class="cls">Circle</span>, <span class="cls">Rect</span> {}
<span class="kw">record</span> <span class="cls">Circle</span>(<span class="kw">double</span> r) <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="kw">record</span> <span class="cls">Rect</span>(<span class="kw">double</span> w, <span class="kw">double</span> h) <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="cls">List</span>&lt;<span class="cls">Shape</span>&gt; shapes = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Circle</span>(<span class="num">1</span>), <span class="kw">new</span> <span class="cls">Rect</span>(<span class="num">3</span>,<span class="num">4</span>), <span class="kw">new</span> <span class="cls">Circle</span>(<span class="num">2</span>)
);
<span class="kw">double</span> total = shapes.stream()
    .mapToDouble(s -> <span class="kw">switch</span>(s) {
        <span class="kw">case</span> <span class="cls">Circle</span> c -> <span class="cls">Math</span>.PI * c.r() * c.r();
        <span class="kw">case</span> <span class="cls">Rect</span>   r -> r.w() * r.h();
    })
    .sum();
<span class="cls">System</span>.out.printf(<span class="str">"%.2f%n"</span>, total);`,
    options: ["27.71", "25.00", "12.00", "Compilation error"],
    answer: 0,
    explanation: "Circle(1): Math.PI*1²≈3.1416. Rect(3,4): 3*4=12.0. Circle(2): Math.PI*2²≈12.5664. Total≈3.1416+12+12.5664=27.71. printf('%.2f')='27.71'. Result: '27.71'."
  },
  {
    id: 1205, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;A, B, C&gt; <span class="cls">Function</span>&lt;A, C&gt; pipe(
    <span class="cls">Function</span>&lt;A, B&gt; f,
    <span class="cls">Function</span>&lt;B, C&gt; g
) {
    <span class="kw">return</span> f.andThen(g);
}
<span class="kw">var</span> parse  = pipe(<span class="cls">String</span>::trim, <span class="cls">Integer</span>::parseInt);
<span class="kw">var</span> square = pipe(parse, n -> n * n);
<span class="cls">System</span>.out.println(square.apply(<span class="str">"  7  "</span>));`,
    options: ["49", "7", "Compilation error", "Throws NumberFormatException"],
    answer: 0,
    explanation: "parse = trim → parseInt. square = parse → n*n. square.apply('  7  '): trim→'7', parseInt→7, 7*7=49. Result: '49'."
  },
  {
    id: 1206, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">var</span> map = <span class="kw">new</span> <span class="cls">ConcurrentHashMap</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt;();
map.put(<span class="str">"a"</span>, <span class="num">1</span>); map.put(<span class="str">"b"</span>, <span class="num">2</span>); map.put(<span class="str">"c"</span>, <span class="num">3</span>);
map.forEachValue(<span class="num">1</span>, v -> <span class="cls">System</span>.out.print(v + <span class="str">" "</span>));`,
    options: ["1 2 3 in some order", "1 2 3 always in order", "Compilation error", "Throws ConcurrentModificationException"],
    answer: 0,
    explanation: "ConcurrentHashMap.forEachValue(parallelismThreshold, action) applies the action to each value. The order is non-deterministic (HashMap ordering). All three values will be printed but the order may vary between runs. Result: '1 2 3 ' in some order."
  },
  {
    id: 1207, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  OCP Java 17  "</span>;
<span class="cls">System</span>.out.println(s.strip());
<span class="cls">System</span>.out.println(s.strip().length());
<span class="cls">System</span>.out.println(<span class="str">""</span>.isEmpty() + <span class="str">" "</span> + <span class="str">"  "</span>.isBlank());`,
    options: ["OCP Java 17\n11\ntrue true", "OCP Java 17\n11\nfalse true", "OCP Java 17\n12\ntrue true", "Compilation error"],
    answer: 0,
    explanation: "strip() removes leading/trailing whitespace. 'OCP Java 17' has length 11. ''.isEmpty()=true. '  '.isBlank()=true. Result: 'OCP Java 17\\n11\\ntrue true'."
  },
  {
    id: 1208, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> csv = <span class="str">"1,2,,4,5"</span>;
<span class="cls">String</span>[] parts = csv.split(<span class="str">","</span>, -<span class="num">1</span>);
<span class="cls">System</span>.out.println(parts.length + <span class="str">" '"</span> + parts[<span class="num">2</span>] + <span class="str">"'"</span>);`,
    options: ["5 ''", "4 '4'", "5 '4'", "Compilation error"],
    answer: 0,
    explanation: "split(',', -1): negative limit means keep ALL trailing empty strings. '1,2,,4,5' splits into ['1','2','','4','5']. length=5. parts[2]='' (empty string between two commas). Result: \"5 ''\"."
  },
  {
    id: 1209, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> base = <span class="cls">Path</span>.of(<span class="str">"/projects"</span>);
<span class="cls">Path</span> full = <span class="cls">Path</span>.of(<span class="str">"/projects/myapp/src/Main.java"</span>);
<span class="cls">Path</span> rel  = base.relativize(full);
<span class="cls">System</span>.out.println(rel);
<span class="cls">System</span>.out.println(base.resolve(rel));`,
    options: ["myapp/src/Main.java\n/projects/myapp/src/Main.java", "Main.java\n/projects/Main.java", "/projects/myapp\n/projects/myapp", "Compilation error"],
    answer: 0,
    explanation: "relativize: path from /projects to /projects/myapp/src/Main.java = 'myapp/src/Main.java'. resolve: /projects.resolve('myapp/src/Main.java') = '/projects/myapp/src/Main.java'. Result as shown."
  },
  {
    id: 1210, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">int</span>  x    = <span class="num">1</span>;
    <span class="kw">void</span> show() { <span class="cls">System</span>.out.print(<span class="str">"A:"</span> + x + <span class="str">" "</span>); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span>  x    = <span class="num">2</span>;
    <span class="kw">void</span> show() {
        <span class="kw">super</span>.show();
        <span class="cls">System</span>.out.print(<span class="str">"B:"</span> + x + <span class="str">" B.super.x:"</span> + <span class="kw">super</span>.x + <span class="str">" "</span>);
    }
}
<span class="kw">new</span> <span class="cls">B</span>().show();`,
    options: ["A:1 B:2 B.super.x:1 ", "A:2 B:2 B.super.x:1 ", "A:1 B:1 B.super.x:1 ", "Compilation error"],
    answer: 0,
    explanation: "B.show() calls super.show() → A.show(). In A.show(), 'x' refers to A.x=1. Prints 'A:1 '. Back in B.show(): x=B.x=2, super.x=A.x=1. Prints 'B:2 B.super.x:1 '. Result: 'A:1 B:2 B.super.x:1 '."
  },
  {
    id: 1211, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; safe = s -> {
    <span class="kw">try</span> { <span class="kw">return</span> <span class="cls">Integer</span>.parseInt(s); }
    <span class="kw">catch</span> (<span class="cls">NumberFormatException</span> e) { <span class="kw">return</span> <span class="num">0</span>; }
};
<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"3"</span>, <span class="str">"x"</span>, <span class="str">"7"</span>, <span class="str">"y"</span>, <span class="str">"2"</span>)
    .map(safe)
    .filter(n -> n > <span class="num">0</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["12", "0", "3", "Compilation error"],
    answer: 0,
    explanation: "safe: '3'→3, 'x'→0, '7'→7, 'y'→0, '2'→2. filter(>0): [3,7,2]. sum()=12. Result: '12'."
  },
  {
    id: 1212, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> q = <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;<span class="cls">String</span>&gt;(
    <span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)
              .thenComparing(<span class="cls">Comparator</span>.naturalOrder())
);
<span class="cls">List</span>.of(<span class="str">"fig"</span>,<span class="str">"apple"</span>,<span class="str">"ant"</span>,<span class="str">"plum"</span>,<span class="str">"kiwi"</span>)
    .forEach(q::offer);
<span class="cls">StringBuilder</span> sb = <span class="kw">new</span> <span class="cls">StringBuilder</span>();
<span class="kw">while</span>(!q.isEmpty()) sb.append(q.poll()).append(<span class="str">" "</span>);
<span class="cls">System</span>.out.println(sb.toString().trim());`,
    options: ["ant fig kiwi plum apple", "ant fig plum kiwi apple", "apple ant fig kiwi plum", "fig ant plum kiwi apple"],
    answer: 0,
    explanation: "PQ ordered by length then alpha. ant(3) < fig(3)→ant<fig alpha. kiwi(4) < plum(4)→kiwi<plum. apple(5). Poll order: ant, fig, kiwi, plum, apple. Result: 'ant fig kiwi plum apple'."
  },
  {
    id: 1213, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> start = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">1</span>, <span class="num">1</span>);
<span class="cls">LocalDate</span> end   = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">31</span>);
<span class="kw">long</span> mondays = start.datesUntil(end.plusDays(<span class="num">1</span>))
    .filter(d -> d.getDayOfWeek() == <span class="cls">DayOfWeek</span>.MONDAY)
    .count();
<span class="cls">System</span>.out.println(mondays);`,
    options: ["52", "53", "51", "Compilation error"],
    answer: 0,
    explanation: "2024 starts on Monday (Jan 1). datesUntil is exclusive so end.plusDays(1) includes Dec 31. Jan 1 is Monday. 2024 has 366 days (leap year). 366/7=52.28. Since Jan 1 is Monday and Dec 30 is also Monday (last Monday), there are 53 Mondays in 2024. Result: '53'."
  },
  {
    id: 1214, topic: "Modules (JPMS)",
    text: "What is the purpose of 'requires transitive' in module-info.java?",
    code: null,
    options: [
      "It makes the dependency optional at runtime",
      "It implies readability: any module reading yours also reads the transitive dependency automatically",
      "It is equivalent to 'requires' with no difference",
      "It enables reflection on the dependent module's packages"
    ],
    answer: 1,
    explanation: "'requires transitive M' creates implied readability. If module A requires transitive B, and module C requires A, then C can also read B without explicitly declaring 'requires B'. This is essential when module A's public API exposes types from B — callers need B to use A's API."
  },
  {
    id: 1215, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"original"</span>);
} <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">RuntimeException</span> wrapped = <span class="kw">new</span> <span class="cls">RuntimeException</span>(<span class="str">"wrapped"</span>, e);
    wrapped.addSuppressed(<span class="kw">new</span> <span class="cls">Exception</span>(<span class="str">"suppressed"</span>));
    <span class="kw">throw</span> wrapped;
} <span class="kw">catch</span> (<span class="cls">Exception</span> e) {
    <span class="cls">System</span>.out.println(e.getMessage() + <span class="str">" cause:"</span> +
        e.getCause().getMessage() + <span class="str">" sup:"</span> +
        e.getSuppressed()[<span class="num">0</span>].getMessage());
}`,
    options: ["wrapped cause:original sup:suppressed", "original cause:wrapped sup:suppressed", "Compilation error", "Throws RuntimeException — second catch not reachable"],
    answer: 3,
    explanation: "A single try block with two catch clauses: catch(RuntimeException) and catch(Exception). The try block throws RuntimeException. The first catch handles it (more specific type wins) and rethrows a NEW RuntimeException. The second catch only catches exceptions from the TRY block — it cannot catch the exception thrown from the first catch. The rethrown RuntimeException propagates unhandled. No output is printed."
  },
  {
    id: 1216, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.range(<span class="num">1</span>, <span class="num">11</span>)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .map(n -> n * n)
    .reduce(<span class="num">0</span>, <span class="cls">Integer</span>::sum);
<span class="cls">System</span>.out.println(r);`,
    options: ["220", "110", "30", "Compilation error"],
    answer: 0,
    explanation: "filter(even) from 1-10: [2,4,6,8,10]. map(n²): [4,16,36,64,100]. reduce(0, sum): 4+16+36+64+100=220. Result: '220'."
  },
  {
    id: 1217, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Predicate</span>&lt;T&gt; allOf(<span class="cls">List</span>&lt;<span class="cls">Predicate</span>&lt;T&gt;&gt; predicates) {
    <span class="kw">return</span> predicates.stream()
        .reduce(<span class="cls">Predicate</span>::and)
        .orElse(t -> <span class="kw">true</span>);
}
<span class="cls">Predicate</span>&lt;<span class="cls">Integer</span>&gt; result = allOf(<span class="cls">List</span>.of(
    n -> n > <span class="num">0</span>,
    n -> n % <span class="num">2</span> == <span class="num">0</span>,
    n -> n < <span class="num">100</span>
));
<span class="cls">System</span>.out.println(result.test(<span class="num">42</span>));
<span class="cls">System</span>.out.println(result.test(-<span class="num">2</span>));`,
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "Compilation error"],
    answer: 0,
    explanation: "allOf reduces predicates with AND. All three predicates AND-ed: n>0 AND n%2==0 AND n<100. test(42): 42>0(T) AND 42%2==0(T) AND 42<100(T) → true. test(-2): -2>0(F) → false. Result: 'true\\nfalse'."
  },
  {
    id: 1218, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Describable</span> {
    <span class="kw">default</span> <span class="cls">String</span> describe() {
        <span class="kw">return</span> <span class="str">"I am a "</span> + getClass().getSimpleName();
    }
}
<span class="kw">record</span> <span class="cls">Cat</span>(<span class="cls">String</span> name) <span class="kw">implements</span> <span class="cls">Describable</span> {}
<span class="kw">class</span> <span class="cls">Dog</span>              <span class="kw">implements</span> <span class="cls">Describable</span> {}
<span class="cls">List</span>&lt;<span class="cls">Describable</span>&gt; animals = <span class="cls">List</span>.of(<span class="kw">new</span> <span class="cls">Cat</span>(<span class="str">"Whiskers"</span>), <span class="kw">new</span> <span class="cls">Dog</span>());
animals.forEach(a -> <span class="cls">System</span>.out.println(a.describe()));`,
    options: ["I am a Cat\nI am a Dog", "I am a Describable\nI am a Describable", "I am a record\nI am a class", "Compilation error"],
    answer: 0,
    explanation: "describe() uses getClass().getSimpleName() at runtime. For Cat instance: 'Cat'. For Dog instance: 'Dog'. Result: 'I am a Cat\\nI am a Dog'."
  },
  {
    id: 1219, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f1 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="str">"A"</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f2 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="str">"B"</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; f3 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="str">"C"</span>);
<span class="kw">var</span> all = <span class="cls">CompletableFuture</span>.allOf(f1, f2, f3)
    .thenApply(v -> <span class="cls">Stream</span>.of(f1, f2, f3)
        .map(<span class="cls">CompletableFuture</span>::join)
        .collect(<span class="cls">Collectors</span>.joining()));
<span class="cls">System</span>.out.println(all.get());`,
    options: ["ABC", "CBA", "Non-deterministic", "Compilation error"],
    answer: 0,
    explanation: "allOf(f1,f2,f3): all already completed. thenApply: Stream.of(f1,f2,f3) in order, each .join() returns A, B, C. joining() = 'ABC'. Always deterministic (futures are completed values). Result: 'ABC'."
  },
  {
    id: 1220, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">NavigableMap</span>&lt;<span class="cls">Integer</span>,<span class="cls">String</span>&gt; m = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();
m.put(<span class="num">1</span>,<span class="str">"one"</span>); m.put(<span class="num">3</span>,<span class="str">"three"</span>); m.put(<span class="num">5</span>,<span class="str">"five"</span>);
m.put(<span class="num">7</span>,<span class="str">"seven"</span>); m.put(<span class="num">9</span>,<span class="str">"nine"</span>);
<span class="cls">System</span>.out.println(m.headMap(<span class="num">5</span>).size());
<span class="cls">System</span>.out.println(m.tailMap(<span class="num">5</span>).size());
<span class="cls">System</span>.out.println(m.subMap(<span class="num">3</span>, <span class="num">7</span>).size());`,
    options: ["2\n3\n2", "3\n3\n3", "2\n3\n3", "2\n2\n2"],
    answer: 0,
    explanation: "headMap(5) exclusive: keys <5 = {1,3} → size=2. tailMap(5) inclusive: keys >=5 = {5,7,9} → size=3. subMap(3,7) [3,7) inclusive-exclusive: {3,5} → size=2. Result: '2\\n3\\n2'."
  },
  {
    id: 1221, topic: "Annotations",
    text: "What is the output of the following code?",
    code: `<span class="ann">@Retention</span>(<span class="cls">RetentionPolicy</span>.RUNTIME)
<span class="ann">@Target</span>(<span class="cls">ElementType</span>.METHOD)
<span class="ann">@interface</span> <span class="cls">Timeout</span> { <span class="kw">long</span> ms() <span class="kw">default</span> <span class="num">5000</span>; }
<span class="kw">class</span> <span class="cls">Service</span> {
    <span class="ann">@Timeout</span>(ms = <span class="num">1000</span>)
    <span class="kw">void</span> fast() {}
    <span class="ann">@Timeout</span>
    <span class="kw">void</span> normal() {}
}
<span class="kw">long</span> sum = <span class="cls">Arrays</span>.stream(<span class="cls">Service</span>.<span class="kw">class</span>.getDeclaredMethods())
    .map(m -> m.getAnnotation(<span class="cls">Timeout</span>.<span class="kw">class</span>))
    .filter(a -> a != <span class="kw">null</span>)
    .mapToLong(<span class="cls">Timeout</span>::ms)
    .sum();
<span class="cls">System</span>.out.println(sum);`,
    options: ["6000", "1000", "5000", "Compilation error"],
    answer: 0,
    explanation: "fast() has @Timeout(ms=1000). normal() has @Timeout with default ms=5000. mapToLong(Timeout::ms).sum() = 1000+5000=6000. Result: '6000'."
  },
  {
    id: 1222, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"hello"</span>,<span class="str">"world"</span>,<span class="str">"java"</span>,<span class="str">"17"</span>)
    .collect(<span class="cls">Collectors</span>.collectingAndThen(
        <span class="cls">Collectors</span>.groupingBy(<span class="cls">String</span>::length, <span class="cls">Collectors</span>.counting()),
        m -> m.entrySet().stream()
              .max(<span class="cls">Map</span>.<span class="cls">Entry</span>.comparingByValue())
              .map(<span class="cls">Map</span>.<span class="cls">Entry</span>::getKey)
              .orElse(-<span class="num">1</span>)
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["5", "4", "2", "Compilation error"],
    answer: 0,
    explanation: "Group by length: 5→[hello,world]=2, 4→[java]=1, 2→[17]=1. max by count: length 5 has count 2 (highest). Key=5. Result: '5'."
  },
  {
    id: 1223, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Coordinate</span>(<span class="kw">double</span> lat, <span class="kw">double</span> lon) {
    <span class="kw">static final</span> <span class="cls">Coordinate</span> GREENWICH = <span class="kw">new</span> <span class="cls">Coordinate</span>(<span class="num">51.477</span>, <span class="num">0.0</span>);
    <span class="kw">boolean</span> isEasternHemisphere()  { <span class="kw">return</span> lon > <span class="num">0</span>; }
    <span class="kw">boolean</span> isNorthernHemisphere() { <span class="kw">return</span> lat > <span class="num">0</span>; }
}
<span class="cls">Coordinate</span> recife = <span class="kw">new</span> <span class="cls">Coordinate</span>(-<span class="num">8.05</span>, -<span class="num">34.9</span>);
<span class="cls">System</span>.out.println(recife.isNorthernHemisphere() + <span class="str">" "</span> +
                   recife.isEasternHemisphere());`,
    options: ["false false", "true false", "false true", "Compilation error"],
    answer: 0,
    explanation: "Recife: lat=-8.05 (southern hemisphere, lat<0), lon=-34.9 (western hemisphere, lon<0). isNorthernHemisphere(): false. isEasternHemisphere(): false. Result: 'false false'."
  },
  {
    id: 1224, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; interleave(<span class="cls">List</span>&lt;T&gt; a, <span class="cls">List</span>&lt;T&gt; b) {
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">int</span> min = <span class="cls">Math</span>.min(a.size(), b.size());
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < min; i++) {
        r.add(a.get(i));
        r.add(b.get(i));
    }
    <span class="kw">return</span> r;
}
<span class="cls">System</span>.out.println(interleave(
    <span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">3</span>,<span class="num">5</span>),
    <span class="cls">List</span>.of(<span class="num">2</span>,<span class="num">4</span>,<span class="num">6</span>)
));`,
    options: ["[1, 2, 3, 4, 5, 6]", "[1, 3, 5, 2, 4, 6]", "[2, 1, 4, 3, 6, 5]", "Compilation error"],
    answer: 0,
    explanation: "interleave alternates: a[0]=1,b[0]=2, a[1]=3,b[1]=4, a[2]=5,b[2]=6. Result: '[1, 2, 3, 4, 5, 6]'."
  },
  {
    id: 1225, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.compare(<span class="num">1</span>, <span class="num">2</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.compare(<span class="num">2</span>, <span class="num">2</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.compare(<span class="num">3</span>, <span class="num">2</span>));`,
    options: ["-1\n0\n1", "-2\n0\n2", "Compilation error", "-1\n0\n2"],
    answer: 0,
    explanation: "Integer.compare(x,y): returns negative if x<y, 0 if x==y, positive if x>y. compare(1,2)<0 returns -1. compare(2,2)=0. compare(3,2)>0 returns 1. Result: '-1\\n0\\n1'."
  },
  {
    id: 1226, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s,
        s -> s.repeat(<span class="num">3</span>)
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) ->
    <span class="cls">System</span>.out.print(k + <span class="str">"→"</span> + v + <span class="str">" "</span>));`,
    options: ["a→aaa b→bbb c→ccc ", "a→a b→b c→c ", "aaa→a bbb→b ccc→c ", "Compilation error"],
    answer: 0,
    explanation: "toMap: a→'aaa', b→'bbb', c→'ccc'. TreeMap alphabetical. forEach: 'a→aaa b→bbb c→ccc '. Result: 'a→aaa b→bbb c→ccc '."
  },
  {
    id: 1227, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Signal</span> { RED, YELLOW, GREEN }
<span class="kw">var</span> cycle = <span class="cls">Stream</span>.of(<span class="cls">Signal</span>.values())
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s,
        s -> <span class="cls">Signal</span>.values()[(s.ordinal() + <span class="num">1</span>) % <span class="cls">Signal</span>.values().length]
    ));
<span class="cls">System</span>.out.println(cycle.get(<span class="cls">Signal</span>.GREEN));`,
    options: ["RED", "YELLOW", "GREEN", "Compilation error"],
    answer: 0,
    explanation: "Map each signal to its next in cycle. GREEN.ordinal()=2. (2+1)%3=0. Signal.values()[0]=RED. cycle.get(GREEN)=RED. Result: 'RED'."
  },
  {
    id: 1228, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Builder</span>&lt;T <span class="kw">extends</span> <span class="cls">Builder</span>&lt;T&gt;&gt; {
    <span class="cls">List</span>&lt;<span class="cls">String</span>&gt; parts = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="ann">@SuppressWarnings</span>(<span class="str">"unchecked"</span>)
    T add(<span class="cls">String</span> s) { parts.add(s); <span class="kw">return</span> (T)<span class="kw">this</span>; }
    <span class="cls">String</span> build() { <span class="kw">return</span> <span class="cls">String</span>.join(<span class="str">"-"</span>, parts); }
}
<span class="kw">var</span> r = <span class="kw">new</span> <span class="cls">Builder</span>&lt;&gt;().add(<span class="str">"A"</span>).add(<span class="str">"B"</span>).add(<span class="str">"C"</span>).build();
<span class="cls">System</span>.out.println(r);`,
    options: ["A-B-C", "ABC", "C-B-A", "Compilation error"],
    answer: 0,
    explanation: "Fluent generic builder. Each add returns this (cast to T). Adds A, B, C in order. build() joins with '-'. Result: 'A-B-C'."
  },
  {
    id: 1229, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>,<span class="str">"rat"</span>,<span class="str">"bat"</span>,<span class="str">"hat"</span>,<span class="str">"mat"</span>)
    .sorted(<span class="cls">Comparator</span>.comparing(s -> s.charAt(<span class="num">0</span>)))
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r.get(<span class="num">0</span>) + <span class="str">" "</span> + r.get(<span class="num">4</span>));`,
    options: ["bat mat", "cat mat", "bat rat", "Compilation error"],
    answer: 0,
    explanation: "Sort by first char: b(bat) < c(cat) < h(hat) < m(mat) < r(rat). r.get(0)='bat', r.get(4)='rat'. Result: 'bat rat'."
  },
  {
    id: 1230, topic: "Exception Handling",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; T orDefault(<span class="cls">Callable</span>&lt;T&gt; action, T defaultValue) {
    <span class="kw">try</span> { <span class="kw">return</span> action.call(); }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) { <span class="kw">return</span> defaultValue; }
}
<span class="cls">System</span>.out.println(orDefault(() -> <span class="cls">Integer</span>.parseInt(<span class="str">"42"</span>), -<span class="num">1</span>));
<span class="cls">System</span>.out.println(orDefault(() -> <span class="cls">Integer</span>.parseInt(<span class="str">"bad"</span>), -<span class="num">1</span>));`,
    options: ["42\n-1", "-1\n42", "42\n42", "-1\n-1"],
    answer: 0,
    explanation: "orDefault: if Callable succeeds, returns result; if exception, returns default. parseInt('42')=42, no exception → 42. parseInt('bad') throws NumberFormatException → -1. Result: '42\\n-1'."
  },
  {
    id: 1231, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Pair</span>&lt;A, B&gt;(<span class="cls">A</span> fst, <span class="cls">B</span> snd) {
    &lt;C&gt; <span class="cls">Pair</span>&lt;A, C&gt; mapSnd(<span class="cls">Function</span>&lt;B, C&gt; f) {
        <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(fst, f.apply(snd));
    }
}
<span class="kw">var</span> p = <span class="kw">new</span> <span class="cls">Pair</span>&lt;&gt;(<span class="str">"Java"</span>, <span class="num">17</span>)
    .mapSnd(n -> n * <span class="num">2</span>)
    .mapSnd(<span class="cls">Object</span>::toString);
<span class="cls">System</span>.out.println(p.fst() + <span class="str">" v"</span> + p.snd());`,
    options: ["Java v34", "Java v17", "17 vJava", "Compilation error"],
    answer: 0,
    explanation: "Pair<String,Integer>('Java',17). mapSnd(n*2): Pair<String,Integer>('Java',34). mapSnd(toString): Pair<String,String>('Java','34'). p.fst()='Java', p.snd()='34'. Result: 'Java v34'."
  },
  {
    id: 1232, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Box</span>&lt;T&gt;(T value) {}
<span class="cls">Object</span> obj = <span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="str">"hello"</span>);
<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">Box</span>&lt;?&gt; box) {
    <span class="cls">System</span>.out.println(box.value().getClass().getSimpleName());
}`,
    options: ["String", "Object", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "obj instanceof Box<?> box: matches. box.value() returns Object (due to wildcard erasure). getClass() returns the actual runtime class of the object: String. getSimpleName()='String'. Result: 'String'."
  },
  {
    id: 1233, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newVirtualThreadPerTaskExecutor();
<span class="cls">List</span>&lt;<span class="cls">Future</span>&lt;<span class="cls">Integer</span>&gt;&gt; futures = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">5</span>; i++) {
    <span class="kw">final int</span> n = i;
    futures.add(exec.submit(() -> n * n));
}
exec.shutdown();
<span class="kw">int</span> sum = futures.stream().mapToInt(f -> f.get()).sum();
<span class="cls">System</span>.out.println(sum);`,
    options: ["55", "15", "25", "Compilation error"],
    answer: 0,
    explanation: "Virtual thread executor submits 5 tasks: 1²+2²+3²+4²+5² = 1+4+9+16+25 = 55. Results collected in submission order. sum=55. Result: '55'."
  },
  {
    id: 1234, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;(
    <span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">3</span>)
);
m.entrySet().stream()
    .sorted(<span class="cls">Map</span>.<span class="cls">Entry</span>.&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt;comparingByValue().reversed())
    .findFirst()
    .ifPresent(e -> <span class="cls">System</span>.out.println(e.getKey() + <span class="str">"="</span> + e.getValue()));`,
    options: ["c=3", "a=1", "b=2", "Compilation error"],
    answer: 0,
    explanation: "comparingByValue().reversed(): sort descending by value. Highest value is c=3. findFirst() = c=3. Result: 'c=3'."
  },
  {
    id: 1235, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> path = <span class="str">"/usr/local/bin"</span>;
<span class="cls">String</span>[] segments = path.split(<span class="str">"/"</span>);
<span class="cls">System</span>.out.println(segments.length);
<span class="cls">System</span>.out.println(segments[<span class="num">0</span>].isEmpty());
<span class="cls">System</span>.out.println(segments[segments.length - <span class="num">1</span>]);`,
    options: ["4\ntrue\nbin", "3\nfalse\nbin", "4\nfalse\nbin", "3\ntrue\nbin"],
    answer: 0,
    explanation: "split('/'): leading '/' produces empty first element. Result: ['','usr','local','bin']. length=4. segments[0]='' → isEmpty()=true. segments[3]='bin'. Result: '4\\ntrue\\nbin'."
  },
  {
    id: 1236, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Base</span>&lt;T&gt; {
    <span class="kw">abstract</span> T compute(<span class="kw">int</span> n);
    <span class="cls">List</span>&lt;T&gt; computeAll(<span class="kw">int</span>... nums) {
        <span class="kw">return</span> <span class="cls">IntStream</span>.of(nums)
            .mapToObj(<span class="kw">this</span>::compute)
            .collect(<span class="cls">Collectors</span>.toList());
    }
}
<span class="cls">Base</span>&lt;<span class="cls">String</span>&gt; b = <span class="kw">new</span> <span class="cls">Base</span>&lt;&gt;() {
    <span class="cls">String</span> compute(<span class="kw">int</span> n) { <span class="kw">return</span> <span class="str">"#"</span> + n; }
};
<span class="cls">System</span>.out.println(b.computeAll(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>));`,
    options: ["[#1, #2, #3]", "[1, 2, 3]", "Compilation error", "[#1#2#3]"],
    answer: 0,
    explanation: "computeAll uses IntStream.of(nums).mapToObj(this::compute). compute(1)='#1', compute(2)='#2', compute(3)='#3'. Collected to list. Result: '[#1, #2, #3]'."
  },
  {
    id: 1237, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> pairs = <span class="cls">IntStream</span>.range(<span class="num">1</span>, <span class="num">4</span>)
    .boxed()
    .flatMap(i -> <span class="cls">IntStream</span>.range(<span class="num">1</span>, <span class="num">4</span>)
        .filter(j -> j != i)
        .mapToObj(j -> i + <span class="str">","</span> + j))
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(pairs.size() + <span class="str">" "</span> + pairs.get(<span class="num">0</span>));`,
    options: ["6 1,2", "9 1,1", "6 1,3", "Compilation error"],
    answer: 0,
    explanation: "For i=[1,2,3], j=[1,2,3] where j!=i: 3 values of i, each has 2 valid j values. Total=6 pairs. First pair: i=1,j=2 (first j that != 1 is 2). result.get(0)='1,2'. Result: '6 1,2'."
  },
  {
    id: 1238, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">DateTimeFormatter</span> dtf = <span class="cls">DateTimeFormatter</span>
    .ofPattern(<span class="str">"yyyy-MM-dd'T'HH:mm"</span>);
<span class="cls">LocalDateTime</span> ldt = <span class="cls">LocalDateTime</span>.parse(<span class="str">"2024-11-05T14:30"</span>, dtf);
<span class="cls">System</span>.out.println(ldt.getDayOfWeek());
<span class="cls">System</span>.out.println(ldt.getMonthValue());`,
    options: ["TUESDAY\n11", "MONDAY\n11", "TUESDAY\n5", "Compilation error"],
    answer: 0,
    explanation: "Parse '2024-11-05T14:30'. November 5, 2024 is a Tuesday. getDayOfWeek()=TUESDAY. getMonthValue()=11. Result: 'TUESDAY\\n11'."
  },
  {
    id: 1239, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Map</span>&lt;T, <span class="cls">Long</span>&gt; countBy(<span class="cls">Stream</span>&lt;T&gt; s) {
    <span class="kw">return</span> s.collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">Function</span>.identity(),
        <span class="cls">Collectors</span>.counting()
    ));
}
<span class="kw">var</span> r = countBy(<span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>,<span class="str">"c"</span>,<span class="str">"b"</span>,<span class="str">"b"</span>));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) ->
    <span class="cls">System</span>.out.print(k + <span class="str">":"</span> + v + <span class="str">" "</span>));`,
    options: ["a:2 b:3 c:1 ", "b:3 a:2 c:1 ", "a:1 b:1 c:1 ", "Compilation error"],
    answer: 0,
    explanation: "countBy: a→2, b→3, c→1. TreeMap alphabetical: a:2 b:3 c:1. Result: 'a:2 b:3 c:1 '."
  },
  {
    id: 1240, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Observable</span>&lt;T&gt; {
    <span class="kw">private</span> T value;
    <span class="kw">private</span> <span class="cls">Consumer</span>&lt;T&gt; onChange;
    <span class="cls">Observable</span>(T init, <span class="cls">Consumer</span>&lt;T&gt; onChange) {
        value = init; <span class="kw">this</span>.onChange = onChange;
    }
    <span class="kw">void</span> set(T v) { value = v; onChange.accept(v); }
    T    get()    { <span class="kw">return</span> value; }
}
<span class="kw">var</span> log = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt;();
<span class="kw">var</span> obs = <span class="kw">new</span> <span class="cls">Observable</span>&lt;&gt;(<span class="num">0</span>, log::add);
obs.set(<span class="num">1</span>); obs.set(<span class="num">5</span>); obs.set(<span class="num">3</span>);
<span class="cls">System</span>.out.println(log + <span class="str">" current="</span> + obs.get());`,
    options: ["[1, 5, 3] current=3", "[0, 1, 5] current=3", "[1, 5, 3] current=5", "Compilation error"],
    answer: 0,
    explanation: "Each set() adds the new value to log. set(1)→log=[1], set(5)→log=[1,5], set(3)→log=[1,5,3]. obs.get()=3. Result: '[1, 5, 3] current=3'."
  },
  {
    id: 1241, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.toList(),
        <span class="cls">Collectors</span>.collectingAndThen(
            <span class="cls">Collectors</span>.summingInt(<span class="cls">Integer</span>::intValue),
            sum -> sum * <span class="num">2</span>
        ),
        (list, doubled) -> list + <span class="str">"="</span> + doubled
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 2, 3, 4, 5]=30", "[1, 2, 3, 4, 5]=15", "15=30", "Compilation error"],
    answer: 0,
    explanation: "teeing: collector1=toList=[1,2,3,4,5], collector2=sum(15)*2=30. Merger: '[1,2,3,4,5]=30'. Result: '[1, 2, 3, 4, 5]=30'."
  },
  {
    id: 1242, topic: "Records",
    text: "Which of the following demonstrates that records DO NOT support mutable state?",
    code: `<span class="kw">record</span> <span class="cls">Account</span>(<span class="cls">String</span> id, <span class="kw">double</span> balance) {
    <span class="kw">void</span> deposit(<span class="kw">double</span> amount) { balance += amount; } <span class="cm">// line A</span>
}`,
    options: [
      "The code compiles but deposit() has no effect",
      "Compilation error at line A — record components are implicitly final",
      "The code compiles and balance is updated correctly",
      "Throws IllegalAccessException at runtime"
    ],
    answer: 1,
    explanation: "Record components are implicitly private final fields. Line A attempts to assign to 'balance' (a final field) inside an instance method, which is a compilation error. Records are designed to be immutable value objects — to 'update' state you create a new record instance."
  },
  {
    id: 1243, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; src  = <span class="cls">List</span>.of(<span class="str">"x"</span>,<span class="str">"y"</span>,<span class="str">"z"</span>);
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; copy = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(src);
<span class="cls">Collections</span>.shuffle(copy, <span class="kw">new</span> <span class="cls">Random</span>(<span class="num">42</span>));
<span class="cls">System</span>.out.println(copy.size() + <span class="str">" "</span> + copy.containsAll(src));`,
    options: ["3 true", "3 false", "0 false", "Compilation error"],
    answer: 0,
    explanation: "shuffle() rearranges elements but doesn't add or remove any. size stays 3. containsAll(src): copy still has x, y, z (just in different order) → true. Result: '3 true'."
  },
  {
    id: 1244, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt;&gt; safeRoot =
    n -> n >= <span class="num">0</span> ? <span class="cls">Optional</span>.of((<span class="kw">int</span>)<span class="cls">Math</span>.sqrt(n)) : <span class="cls">Optional</span>.empty();
<span class="kw">var</span> r = <span class="cls">Stream</span>.of(-<span class="num">4</span>, <span class="num">9</span>, <span class="num">16</span>, -<span class="num">1</span>, <span class="num">25</span>)
    .map(safeRoot)
    .flatMap(<span class="cls">Optional</span>::stream)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[3, 4, 5]", "[9, 16, 25]", "[3, 4, 5, 0]", "Compilation error"],
    answer: 0,
    explanation: "safeRoot: -4→empty, 9→Optional(3), 16→Optional(4), -1→empty, 25→Optional(5). flatMap(Optional::stream) flattens optionals: [3,4,5]. Result: '[3, 4, 5]'."
  },
  {
    id: 1245, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">20</span>)
    .filter(n -> n % <span class="num">3</span> == <span class="num">0</span> && n % <span class="num">5</span> == <span class="num">0</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[15]", "[3, 5, 15]", "[15, 30]", "[]"],
    answer: 0,
    explanation: "Filter divisible by both 3 and 5 (divisible by 15) in [1..20]: only 15. Result: '[15]'."
  },
  {
    id: 1246, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Stringer</span>&lt;T&gt; {
    <span class="cls">String</span> format(T t);
    <span class="kw">static</span> &lt;T&gt; <span class="cls">Stringer</span>&lt;<span class="cls">List</span>&lt;T&gt;&gt; list(<span class="cls">Stringer</span>&lt;T&gt; elem) {
        <span class="kw">return</span> lst -> <span class="str">"["</span> + lst.stream()
            .map(elem::format)
            .collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>)) + <span class="str">"]"</span>;
    }
}
<span class="cls">Stringer</span>&lt;<span class="cls">Integer</span>&gt;       intFmt  = n -> <span class="str">"#"</span> + n;
<span class="cls">Stringer</span>&lt;<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt;&gt; listFmt = <span class="cls">Stringer</span>.list(intFmt);
<span class="cls">System</span>.out.println(listFmt.format(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>)));`,
    options: ["[#1,#2,#3]", "[1,2,3]", "#1,#2,#3", "Compilation error"],
    answer: 0,
    explanation: "listFmt uses intFmt to format each element with '#'. List[1,2,3] → ['#1','#2','#3'] → joined with ',': '#1,#2,#3'. Wrapped in brackets: '[#1,#2,#3]'. Result: '[#1,#2,#3]'."
  },
  {
    id: 1247, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;K, V&gt; <span class="cls">Map</span>&lt;V, <span class="cls">List</span>&lt;K&gt;&gt; invertMultimap(<span class="cls">Map</span>&lt;K, V&gt; map) {
    <span class="kw">return</span> map.entrySet().stream()
        .collect(<span class="cls">Collectors</span>.groupingBy(
            <span class="cls">Map</span>.<span class="cls">Entry</span>::getValue,
            <span class="cls">Collectors</span>.mapping(<span class="cls">Map</span>.<span class="cls">Entry</span>::getKey, <span class="cls">Collectors</span>.toList())
        ));
}
<span class="kw">var</span> m = <span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">1</span>,<span class="str">"d"</span>,<span class="num">3</span>);
<span class="kw">var</span> inv = invertMultimap(m);
<span class="kw">var</span> keys = <span class="kw">new</span> <span class="cls">TreeSet</span>&lt;&gt;(inv.get(<span class="num">1</span>));
<span class="cls">System</span>.out.println(keys);`,
    options: ["[a, c]", "[c, a]", "[1]", "Compilation error"],
    answer: 0,
    explanation: "Invert map: group keys by value. Value 1 has keys 'a' and 'c'. inv.get(1)=[a,c] (or [c,a] depending on HashMap order). new TreeSet<> sorts: [a,c]. Result: '[a, c]'."
  },
  {
    id: 1248, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"alpha"</span>,<span class="str">"beta"</span>,<span class="str">"gamma"</span>,<span class="str">"delta"</span>)
    .sorted()
    .skip(<span class="num">1</span>)
    .limit(<span class="num">2</span>)
    .map(<span class="cls">String</span>::toUpperCase)
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">" + "</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["BETA + DELTA", "ALPHA + BETA", "GAMMA + DELTA", "BETA + GAMMA"],
    answer: 0,
    explanation: "sorted() alphabetically: [alpha,beta,delta,gamma]. skip(1): [beta,delta,gamma]. limit(2): [beta,delta]. map(toUpperCase): [BETA,DELTA]. joining(' + '): 'BETA + DELTA'. Result: 'BETA + DELTA'."
  },
  {
    id: 1249, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Lazy</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Supplier</span>&lt;T&gt; init;
    <span class="kw">private</span> T value;
    <span class="kw">private boolean</span> evaluated;
    <span class="cls">Lazy</span>(<span class="cls">Supplier</span>&lt;T&gt; init) { <span class="kw">this</span>.init = init; }
    T get() {
        <span class="kw">if</span> (!evaluated) { value = init.get(); evaluated = <span class="kw">true</span>; init = <span class="kw">null</span>; }
        <span class="kw">return</span> value;
    }
}
<span class="kw">int</span>[] count = {<span class="num">0</span>};
<span class="cls">Lazy</span>&lt;<span class="cls">String</span>&gt; lazy = <span class="kw">new</span> <span class="cls">Lazy</span>&lt;&gt;(() -> { count[<span class="num">0</span>]++; <span class="kw">return</span> <span class="str">"computed"</span>; });
<span class="cls">String</span> v1 = lazy.get();
<span class="cls">String</span> v2 = lazy.get();
<span class="cls">System</span>.out.println(v1 + <span class="str">" "</span> + v2 + <span class="str">" count="</span> + count[<span class="num">0</span>]);`,
    options: ["computed computed count=1", "computed computed count=2", "computed null count=1", "Compilation error"],
    answer: 0,
    explanation: "First get(): evaluated=false, calls supplier: count=1, value='computed', evaluated=true, init=null. Second get(): evaluated=true, returns cached 'computed'. count stays 1. Result: 'computed computed count=1'."
  },
  {
    id: 1250, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Task</span>(<span class="cls">String</span> name, <span class="kw">int</span> priority, <span class="kw">boolean</span> done) {}
<span class="kw">var</span> tasks = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Task</span>(<span class="str">"A"</span>, <span class="num">3</span>, <span class="kw">false</span>),
    <span class="kw">new</span> <span class="cls">Task</span>(<span class="str">"B"</span>, <span class="num">1</span>, <span class="kw">true</span>),
    <span class="kw">new</span> <span class="cls">Task</span>(<span class="str">"C"</span>, <span class="num">2</span>, <span class="kw">false</span>),
    <span class="kw">new</span> <span class="cls">Task</span>(<span class="str">"D"</span>, <span class="num">1</span>, <span class="kw">false</span>)
);
tasks.stream()
    .filter(<span class="cls">Predicate</span>.not(<span class="cls">Task</span>::done))
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Task</span>::priority)
                       .thenComparing(<span class="cls">Task</span>::name))
    .forEach(t -> <span class="cls">System</span>.out.print(t.name() + <span class="str">" "</span>));`,
    options: ["D C A ", "A C D ", "D A C ", "C A D "],
    answer: 0,
    explanation: "filter(not done): A(3), C(2), D(1). Sort by priority then name: D(1,D), C(2,C), A(3,A). forEach: 'D C A '. Result: 'D C A '."
  }
];
