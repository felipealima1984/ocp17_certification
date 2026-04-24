// ═══════════════════════════════════════════════════════
//  PACK EN-14 — Questions 651–700  (English)
//  Topics: Streams advanced terminal ops, Collectors
//          complex pipelines, CompletableFuture chaining,
//          JPMS service loader, Localization/ResourceBundle,
//          NIO WatchService, Reflection API, Annotations
//          meta, BigInteger, Functional composition,
//          Exception hierarchy deep dive
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_14 = [
  {
    id: 651, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.filtering(n -> n % <span class="num">2</span> == <span class="num">0</span>, <span class="cls">Collectors</span>.toList()),
        <span class="cls">Collectors</span>.filtering(n -> n % <span class="num">2</span> != <span class="num">0</span>, <span class="cls">Collectors</span>.toList()),
        (evens, odds) -> evens.size() + <span class="str">" even, "</span> + odds.size() + <span class="str">" odd"</span>
    ));
<span class="cls">System</span>.out.println(result);`,
    options: ["3 even, 3 odd", "6 even, 0 odd", "Compilation error", "3 odd, 3 even"],
    answer: 0,
    explanation: "teeing applies two collectors simultaneously. Collectors.filtering (Java 9+) filters before collecting. Evens: [2,4,6] → size 3. Odds: [1,3,5] → size 3. Merger: '3 even, 3 odd'. Result: '3 even, 3 odd'."
  },
  {
    id: 652, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>, <span class="str">"apricot"</span>, <span class="str">"banana"</span>, <span class="str">"blueberry"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        s -> s.charAt(<span class="num">0</span>),
        <span class="cls">Collectors</span>.mapping(<span class="cls">String</span>::toUpperCase, <span class="cls">Collectors</span>.toList())
    ));
<span class="cls">System</span>.out.println(map.get(<span class="str">'a'</span>));`,
    options: ["[APPLE, APRICOT]", "[apple, apricot]", "[APPLE, APRICOT, BANANA, BLUEBERRY]", "null"],
    answer: 0,
    explanation: "groupingBy first char, then mapping to uppercase and collecting to list. Key 'a': apple and apricot → mapped to APPLE, APRICOT → [APPLE, APRICOT]. map.get('a') = '[APPLE, APRICOT]'."
  },
  {
    id: 653, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> stats = <span class="cls">Stream</span>.of(<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>, <span class="num">50</span>)
    .collect(<span class="cls">Collectors</span>.summarizingInt(<span class="cls">Integer</span>::intValue));
<span class="cls">System</span>.out.println(stats.getMin() + <span class="str">" "</span> + stats.getMax() + <span class="str">" "</span> + stats.getAverage());`,
    options: ["10 50 30.0", "10 50 150", "0 50 30.0", "10 50 30"],
    answer: 0,
    explanation: "summarizingInt returns IntSummaryStatistics. getMin()=10, getMax()=50, getAverage()=(10+20+30+40+50)/5=30.0. Result: '10 50 30.0'."
  },
  {
    id: 654, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.iterate(<span class="num">2</span>, n -> n <= <span class="num">32</span>, n -> n * <span class="num">2</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["62", "64", "30", "Infinite loop"],
    answer: 0,
    explanation: "Stream.iterate(seed, hasNext, next): starts at 2, continues while n<=32, multiplies by 2. Sequence: 2, 4, 8, 16, 32. Next would be 64 which fails 64<=32. Sum: 2+4+8+16+32=62."
  },
  {
    id: 655, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; cf =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="str">"Hello"</span>)
        .thenCompose(s -> <span class="cls">CompletableFuture</span>.supplyAsync(() -> s + <span class="str">" World"</span>))
        .thenApply(<span class="cls">String</span>::toUpperCase);
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["HELLO WORLD", "Hello World", "hello world", "Throws ExecutionException"],
    answer: 0,
    explanation: "supplyAsync returns 'Hello'. thenCompose chains a new CompletableFuture that appends ' World' → 'Hello World'. thenApply applies toUpperCase → 'HELLO WORLD'. cf.get() returns 'HELLO WORLD'."
  },
  {
    id: 656, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f1 = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">10</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f2 = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">20</span>);
<span class="kw">int</span> result = f1.thenCombine(f2, <span class="cls">Integer</span>::sum).get();
<span class="cls">System</span>.out.println(result);`,
    options: ["30", "10", "20", "Non-deterministic"],
    answer: 0,
    explanation: "thenCombine(other, BiFunction): waits for both f1 and f2 to complete, then applies Integer::sum(10, 20) = 30. Both futures run concurrently but the combination is deterministic: always 10+20=30."
  },
  {
    id: 657, topic: "CompletableFuture",
    text: "Which CompletableFuture method should you use when you want to recover from an exception and provide a fallback value?",
    code: null,
    options: [
      "thenApply()",
      "thenAccept()",
      "exceptionally()",
      "whenComplete()"
    ],
    answer: 2,
    explanation: "exceptionally(Function<Throwable,T>) is called only when the CompletableFuture completes exceptionally. It provides a fallback value of the same type T. whenComplete runs for both success and failure but cannot change the result. thenApply and thenAccept do not execute on failure."
  },
  {
    id: 658, topic: "Modules (JPMS)",
    text: "What is the role of ServiceLoader in JPMS?",
    code: null,
    options: [
      "It loads classes from the classpath at startup",
      "It provides a dependency injection mechanism for modules to find implementations of service interfaces",
      "It validates module descriptors at compile time",
      "It is used to load native libraries"
    ],
    answer: 1,
    explanation: "ServiceLoader implements the service provider pattern for modules. A module declares 'uses ServiceInterface' to consume it, and another declares 'provides ServiceInterface with Impl' to supply it. ServiceLoader.load() discovers implementations at runtime without compile-time coupling."
  },
  {
    id: 659, topic: "Modules (JPMS)",
    text: "What is the output of the following module-info.java?",
    code: `<span class="kw">module</span> com.myapp {
    <span class="kw">requires</span> java.sql;
    <span class="kw">exports</span> com.myapp.api;
    <span class="kw">opens</span> com.myapp.impl <span class="kw">to</span> spring.core;
    <span class="kw">uses</span> com.myapp.spi.<span class="cls">Plugin</span>;
}`,
    options: [
      "The module depends on java.sql, exposes API for compile-time access, allows Spring to reflect on impl, and can discover Plugin implementations",
      "The module depends on java.sql and exposes all its packages",
      "Compilation error — 'uses' is not valid in module-info",
      "The module exposes impl to all modules via opens"
    ],
    answer: 0,
    explanation: "'requires java.sql' declares dependency. 'exports com.myapp.api' gives all modules access to that package at compile/runtime. 'opens com.myapp.impl to spring.core' gives only spring.core deep reflective access. 'uses Plugin' enables ServiceLoader discovery of Plugin implementations."
  },
  {
    id: 660, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">Locale</span> locale = <span class="cls">Locale</span>.of(<span class="str">"en"</span>, <span class="str">"US"</span>);
<span class="cls">NumberFormat</span> nf = <span class="cls">NumberFormat</span>.getInstance(locale);
<span class="cls">System</span>.out.println(nf.format(<span class="num">1234567.89</span>));`,
    options: ["1,234,567.89", "1.234.567,89", "1234567.89", "1,234,567"],
    answer: 0,
    explanation: "NumberFormat with US locale uses ',' as thousands separator and '.' as decimal separator. 1234567.89 → '1,234,567.89'. Other locales (e.g., de_DE) would use '.' and ',' reversed."
  },
  {
    id: 661, topic: "Localization",
    text: "What is the purpose of ResourceBundle in Java?",
    code: null,
    options: [
      "To bundle multiple JAR files into a single archive",
      "To externalize locale-specific strings and messages for internationalization",
      "To cache frequently accessed resources in memory",
      "To define module dependencies at runtime"
    ],
    answer: 1,
    explanation: "ResourceBundle loads locale-specific key-value pairs from property files (e.g., messages_en.properties, messages_pt_BR.properties). It implements fallback: pt_BR → pt → default. Used for internationalization (i18n) of UI strings and messages."
  },
  {
    id: 662, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Greeter</span> {
    <span class="kw">private</span> <span class="cls">String</span> greet(<span class="cls">String</span> name) { <span class="kw">return</span> <span class="str">"Hi, "</span> + name; }
}
<span class="cls">Method</span> m = <span class="cls">Greeter</span>.<span class="kw">class</span>.getDeclaredMethod(<span class="str">"greet"</span>, <span class="cls">String</span>.<span class="kw">class</span>);
m.setAccessible(<span class="kw">true</span>);
<span class="cls">System</span>.out.println(m.invoke(<span class="kw">new</span> <span class="cls">Greeter</span>(), <span class="str">"Java"</span>));`,
    options: ["Hi, Java", "Compilation error", "Throws IllegalAccessException", "Throws NoSuchMethodException"],
    answer: 0,
    explanation: "getDeclaredMethod finds 'greet' (including private). setAccessible(true) bypasses access checks. invoke(instance, args) calls it. Returns 'Hi, Java'. Without setAccessible, invoke would throw IllegalAccessException."
  },
  {
    id: 663, topic: "Reflection",
    text: "What does Class.getFields() return compared to Class.getDeclaredFields()?",
    code: null,
    options: [
      "Both return the same fields",
      "getFields() returns only public fields (including inherited); getDeclaredFields() returns all fields of the class itself (any access level, no inherited)",
      "getDeclaredFields() includes inherited fields; getFields() does not",
      "getFields() returns static fields only"
    ],
    answer: 1,
    explanation: "getFields(): returns public fields of the class AND all inherited public fields from superclasses and interfaces. getDeclaredFields(): returns ALL fields (public, protected, private, package-private) declared directly in the class — no inherited fields."
  },
  {
    id: 664, topic: "Annotations",
    text: "What is the output of the following code?",
    code: `<span class="ann">@Retention</span>(<span class="cls">RetentionPolicy</span>.RUNTIME)
<span class="ann">@Target</span>(<span class="cls">ElementType</span>.METHOD)
<span class="ann">@interface</span> <span class="cls">Tag</span> { <span class="cls">String</span> value(); }

<span class="kw">class</span> <span class="cls">Demo</span> {
    <span class="ann">@Tag</span>(<span class="str">"hello"</span>)
    <span class="kw">public void</span> annotated() {}
}
<span class="cls">Method</span> m = <span class="cls">Demo</span>.<span class="kw">class</span>.getMethod(<span class="str">"annotated"</span>);
<span class="cls">Tag</span> tag = m.getAnnotation(<span class="cls">Tag</span>.<span class="kw">class</span>);
<span class="cls">System</span>.out.println(tag.value());`,
    options: ["hello", "Tag", "null", "Compilation error"],
    answer: 0,
    explanation: "@Tag has RUNTIME retention, so it is available via reflection. getAnnotation(Tag.class) returns the Tag instance on the method. tag.value() = 'hello'."
  },
  {
    id: 665, topic: "Annotations",
    text: "What is the default retention policy for annotations that do not declare @Retention?",
    code: null,
    options: [
      "RetentionPolicy.RUNTIME",
      "RetentionPolicy.CLASS",
      "RetentionPolicy.SOURCE",
      "RetentionPolicy.ALL"
    ],
    answer: 1,
    explanation: "The default retention policy is CLASS — the annotation is stored in the .class file but not available at runtime via reflection. SOURCE annotations are discarded after compilation. RUNTIME annotations are available via reflection. There is no 'ALL' policy."
  },
  {
    id: 666, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Supplier</span>&lt;<span class="cls">List</span>&lt;<span class="cls">String</span>&gt;&gt; factory = <span class="cls">ArrayList</span>::<span class="kw">new</span>;
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; l1 = factory.get();
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; l2 = factory.get();
l1.add(<span class="str">"Java"</span>);
<span class="cls">System</span>.out.println(l1.size() + <span class="str">" "</span> + l2.size());`,
    options: ["1 0", "1 1", "0 0", "Throws UnsupportedOperationException"],
    answer: 0,
    explanation: "ArrayList::new is a constructor reference. Each factory.get() call creates a NEW empty ArrayList. l1 and l2 are independent. Adding to l1 does not affect l2. Result: '1 0'."
  },
  {
    id: 667, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">BiPredicate</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; longerThan =
    (s, n) -> s.length() > n;
<span class="cls">System</span>.out.println(longerThan.test(<span class="str">"Java"</span>, <span class="num">3</span>));
<span class="cls">System</span>.out.println(longerThan.negate().test(<span class="str">"Java"</span>, <span class="num">3</span>));`,
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "false\nfalse"],
    answer: 0,
    explanation: "BiPredicate<String, Integer> tests (String, Integer) → boolean. 'Java'.length()=4 > 3 → true. negate() inverts the result: false. Result: 'true\\nfalse'."
  },
  {
    id: 668, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">IntUnaryOperator</span> doubleIt = n -> n * <span class="num">2</span>;
<span class="cls">IntUnaryOperator</span> addTen  = n -> n + <span class="num">10</span>;
<span class="kw">int</span> result = doubleIt.andThen(addTen).applyAsInt(<span class="num">5</span>);
<span class="cls">System</span>.out.println(result);`,
    options: ["20", "30", "15", "Compilation error"],
    answer: 0,
    explanation: "IntUnaryOperator.andThen(after) applies the current operator first, then 'after'. doubleIt(5)=10. addTen(10)=20. Result: 20."
  },
  {
    id: 669, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">AppEx</span> <span class="kw">extends</span> <span class="cls">Exception</span> {
    <span class="cls">AppEx</span>(<span class="cls">String</span> msg, <span class="cls">Throwable</span> cause) { <span class="kw">super</span>(msg, cause); }
}
<span class="kw">try</span> {
    <span class="kw">try</span> { <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"root"</span>); }
    <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
        <span class="kw">throw new</span> <span class="cls">AppEx</span>(<span class="str">"wrapped"</span>, e);
    }
} <span class="kw">catch</span> (<span class="cls">AppEx</span> e) {
    <span class="cls">System</span>.out.println(e.getMessage() + <span class="str">" / "</span> + e.getCause().getMessage());
}`,
    options: ["wrapped / root", "root / wrapped", "wrapped / null", "Compilation error"],
    answer: 0,
    explanation: "Inner try throws RuntimeException('root'). Catch wraps it in AppEx('wrapped', e). Outer catch catches AppEx. e.getMessage()='wrapped'. e.getCause() is the original RuntimeException: getMessage()='root'. Result: 'wrapped / root'."
  },
  {
    id: 670, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"first"</span>);
} <span class="kw">finally</span> {
    <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"second"</span>);
}`,
    options: [
      "Throws RuntimeException('second'); 'first' is lost",
      "Throws RuntimeException('first'); 'second' is suppressed",
      "Throws both exceptions simultaneously",
      "Compilation error"
    ],
    answer: 0,
    explanation: "When finally throws an exception, it replaces the exception from the try block. The original 'first' exception is completely lost (not suppressed, not chained). Only RuntimeException('second') propagates. This is why returning or throwing from finally is considered bad practice."
  },
  {
    id: 671, topic: "Exceptions",
    text: "Which statement about Error vs Exception in Java is CORRECT?",
    code: null,
    options: [
      "Error is a subclass of Exception",
      "Both Error and Exception are subclasses of Throwable; Errors indicate serious JVM problems not meant to be caught",
      "Exception is a subclass of Error",
      "RuntimeException is a direct subclass of Throwable"
    ],
    answer: 1,
    explanation: "Hierarchy: Throwable → {Error, Exception}. Error → {OutOfMemoryError, StackOverflowError, VirtualMachineError...}. Exception → {RuntimeException (unchecked), IOException, SQLException... (checked)}. Errors typically indicate unrecoverable JVM-level problems."
  },
  {
    id: 672, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt;&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
<span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>).forEach(n ->
    m.computeIfAbsent(n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>, k -> <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;()).add(n)
);
<span class="cls">System</span>.out.println(m.get(<span class="str">"even"</span>).size() + <span class="str">" "</span> + m.get(<span class="str">"odd"</span>).size());`,
    options: ["2 3", "3 2", "2 2", "Throws NullPointerException"],
    answer: 0,
    explanation: "computeIfAbsent creates a list if key absent, then add() appends. Evens: 2, 4 → size 2. Odds: 1, 3, 5 → size 3. Result: '2 3'."
  },
  {
    id: 673, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; set = <span class="kw">new</span> <span class="cls">TreeSet</span>&lt;&gt;(<span class="cls">Comparator</span>.reverseOrder());
set.add(<span class="str">"banana"</span>); set.add(<span class="str">"apple"</span>); set.add(<span class="str">"cherry"</span>);
<span class="cls">System</span>.out.println(set.first() + <span class="str">" "</span> + set.last());`,
    options: ["cherry apple", "apple cherry", "banana cherry", "Compilation error"],
    answer: 0,
    explanation: "TreeSet with reverseOrder comparator sorts lexicographically descending: cherry > banana > apple. first() = 'cherry' (highest in reverse order). last() = 'apple' (lowest). Result: 'cherry apple'."
  },
  {
    id: 674, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>, <span class="str">"four"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">String</span>::length,
        s -> s,
        (existing, incoming) -> existing,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>
    ));
result.forEach((k, v) -> <span class="cls">System</span>.out.print(k + <span class="str">":"</span> + v + <span class="str">" "</span>));`,
    options: ["3:one 4:four 5:three ", "3:two 4:four 5:three ", "Throws IllegalStateException", "3:one 4:two 5:three "],
    answer: 0,
    explanation: "toMap with merge (keep existing) and TreeMap factory. Lengths: one(3), two(3→merge keeps 'one'), three(5), four(4). TreeMap sorts by key: 3→one, 4→four, 5→three. Result: '3:one 4:four 5:three '."
  },
  {
    id: 675, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Pair</span>&lt;A, B&gt;(<span class="cls">A</span> first, <span class="cls">B</span> second) {
    <span class="cls">Pair</span>&lt;B, A&gt; swap() { <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(second, first); }
}
<span class="kw">var</span> p = <span class="kw">new</span> <span class="cls">Pair</span>&lt;&gt;(<span class="str">"hello"</span>, <span class="num">42</span>);
<span class="kw">var</span> s = p.swap();
<span class="cls">System</span>.out.println(s.first() + <span class="str">" "</span> + s.second());`,
    options: ["42 hello", "hello 42", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "Pair<String, Integer> swap() returns Pair<Integer, String>. s.first() = 42 (Integer), s.second() = 'hello' (String). println: '42 hello'."
  },
  {
    id: 676, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Tree</span>&lt;T&gt; <span class="kw">permits</span> <span class="cls">Leaf</span>, <span class="cls">Branch</span> {}
<span class="kw">record</span> <span class="cls">Leaf</span>&lt;T&gt;(T val) <span class="kw">implements</span> <span class="cls">Tree</span>&lt;T&gt; {}
<span class="kw">record</span> <span class="cls">Branch</span>&lt;T&gt;(<span class="cls">Tree</span>&lt;T&gt; left, <span class="cls">Tree</span>&lt;T&gt; right) <span class="kw">implements</span> <span class="cls">Tree</span>&lt;T&gt; {}

<span class="kw">static int</span> size(<span class="cls">Tree</span>&lt;?&gt; t) {
    <span class="kw">return switch</span>(t) {
        <span class="kw">case</span> <span class="cls">Leaf</span>&lt;?&gt; l -> <span class="num">1</span>;
        <span class="kw">case</span> <span class="cls">Branch</span>&lt;?&gt; b -> size(b.left()) + size(b.right());
    };
}
<span class="cls">Tree</span>&lt;<span class="cls">Integer</span>&gt; tree = <span class="kw">new</span> <span class="cls">Branch</span>&lt;&gt;(<span class="kw">new</span> <span class="cls">Leaf</span>&lt;&gt;(<span class="num">1</span>), <span class="kw">new</span> <span class="cls">Branch</span>&lt;&gt;(<span class="kw">new</span> <span class="cls">Leaf</span>&lt;&gt;(<span class="num">2</span>), <span class="kw">new</span> <span class="cls">Leaf</span>&lt;&gt;(<span class="num">3</span>)));
<span class="cls">System</span>.out.println(size(tree));`,
    options: ["3", "2", "4", "Compilation error"],
    answer: 0,
    explanation: "Recursive tree size via pattern switch. Branch(Leaf(1), Branch(Leaf(2), Leaf(3))). size = size(Leaf)1 + size(Branch(Leaf,Leaf)) = 1 + (1+1) = 3. Result: 3."
  },
  {
    id: 677, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> a = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"12.345"</span>);
<span class="kw">var</span> rounded = a.setScale(<span class="num">2</span>, <span class="cls">RoundingMode</span>.HALF_UP);
<span class="cls">System</span>.out.println(rounded);`,
    options: ["12.35", "12.34", "12.3", "12.345"],
    answer: 0,
    explanation: "setScale(2, HALF_UP) rounds to 2 decimal places using 'round half away from zero'. The third decimal is 5 → rounds up. 12.345 → 12.35. Result: '12.35'."
  },
  {
    id: 678, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> x = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"7"</span>);
<span class="kw">var</span> y = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"2"</span>);
<span class="cls">System</span>.out.println(x.divide(y));`,
    options: ["3.5", "3", "Throws ArithmeticException", "3.50"],
    answer: 0,
    explanation: "7 / 2 = 3.5, which is an exact decimal (terminates). BigDecimal.divide(divisor) without scale throws ArithmeticException ONLY for non-terminating results (e.g., 1/3 = 0.3333...). Since 3.5 is exact, it returns BigDecimal('3.5') without error. Result: '3.5'."
  },
  {
    id: 679, topic: "Bitwise",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> n = <span class="num">10</span>; <span class="cm">// 0000...1010</span>
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.bitCount(n));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.reverse(n));`,
    options: ["2\n1342177280", "3\n-1342177280", "2\n5", "Compilation error"],
    answer: 0,
    explanation: "bitCount(10): 10 = 1010 in binary, 2 ones. Integer.reverse(10) reverses all 32 bits: 00001010 → reversed 32-bit → 01010000 00000000 00000000 00000000 = 1342177280. Result: '2\\n1342177280'."
  },
  {
    id: 680, topic: "Bitwise",
    text: "What is the result of using XOR to check if two integers have opposite signs?",
    code: `<span class="kw">int</span> a = <span class="num">5</span>, b = -<span class="num">3</span>;
<span class="cls">System</span>.out.println((a ^ b) < <span class="num">0</span>);`,
    options: ["true", "false", "Compilation error", "Throws ArithmeticException"],
    answer: 0,
    explanation: "XOR of sign bits: positive numbers have sign bit 0, negative have sign bit 1. 0 XOR 1 = 1, making the result negative (MSB=1). (5 ^ -3) < 0 → true means they have opposite signs. This is a well-known bitwise trick."
  },
  {
    id: 681, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Singleton</span> {
    <span class="kw">private static final</span> <span class="cls">Singleton</span> INSTANCE = <span class="kw">new</span> <span class="cls">Singleton</span>();
    <span class="kw">private static int</span> initCount = <span class="num">0</span>;
    <span class="kw">private</span> <span class="cls">Singleton</span>() { initCount++; }
    <span class="kw">static</span> <span class="cls">Singleton</span> get() { <span class="kw">return</span> INSTANCE; }
    <span class="kw">static int</span> count() { <span class="kw">return</span> initCount; }
}
<span class="cls">Singleton</span>.get(); <span class="cls">Singleton</span>.get(); <span class="cls">Singleton</span>.get();
<span class="cls">System</span>.out.println(<span class="cls">Singleton</span>.count());`,
    options: ["1", "3", "0", "Compilation error"],
    answer: 0,
    explanation: "Singleton with eager initialization. INSTANCE is created once when the class is loaded. The constructor runs exactly once, incrementing initCount to 1. Calling get() three times returns the same instance without calling the constructor again. count() = 1."
  },
  {
    id: 682, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Command</span> { <span class="kw">void</span> execute(); }
<span class="cls">List</span>&lt;<span class="cls">Command</span>&gt; history = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="cls">Runnable</span> save = () -> <span class="cls">System</span>.out.print(<span class="str">"save "</span>);
history.add(save::run);
history.add(() -> <span class="cls">System</span>.out.print(<span class="str">"load "</span>));
history.forEach(<span class="cls">Command</span>::execute);`,
    options: ["save load ", "load save ", "Compilation error", "Throws AbstractMethodError"],
    answer: 0,
    explanation: "Command is a functional interface. save::run is a method reference to Runnable.run() which prints 'save '. The lambda prints 'load '. forEach calls execute() on each. Result: 'save load '."
  },
  {
    id: 683, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>)
    .flatMap(s -> <span class="cls">Stream</span>.of(s, s.toUpperCase()))
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">"-"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["a-A-b-B-c-C", "a-b-c-A-B-C", "aAbBcC", "Compilation error"],
    answer: 0,
    explanation: "flatMap transforms each element into a stream: 'a' → [a, A], 'b' → [b, B], 'c' → [c, C]. All flattened: [a, A, b, B, c, C]. joining('-') concatenates: 'a-A-b-B-c-C'."
  },
  {
    id: 684, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">void</span> addAll(<span class="cls">List</span>&lt;? <span class="kw">super</span> T&gt; dest, <span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; src) {
    src.forEach(dest::add);
}
<span class="cls">List</span>&lt;<span class="cls">Number</span>&gt; nums = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
addAll(nums, <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>));
<span class="cls">System</span>.out.println(nums);`,
    options: ["[1, 2, 3]", "Compilation error", "[Integer, Integer, Integer]", "Throws ClassCastException"],
    answer: 0,
    explanation: "PECS in action: dest is List<? super T> (consumer, T=Integer, accepts Number or Object). src is List<? extends T> (producer, provides Integer). T is inferred as Integer. addAll works: adds Integers to the Number list. Result: '[1, 2, 3]'."
  },
  {
    id: 685, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> date = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">2</span>, <span class="num">28</span>);
<span class="cls">System</span>.out.println(date.plusDays(<span class="num">1</span>));
<span class="cls">System</span>.out.println(date.plusDays(<span class="num">1</span>).isLeapYear());`,
    options: ["2024-02-29\ntrue", "2024-03-01\nfalse", "2024-02-29\nfalse", "2024-03-01\ntrue"],
    answer: 0,
    explanation: "2024 is a leap year, so February has 29 days. 2024-02-28 + 1 day = 2024-02-29 (valid). isLeapYear() on that date checks if 2024 is a leap year → true. Result: '2024-02-29\\ntrue'."
  },
  {
    id: 686, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">PriorityQueue</span>&lt;<span class="cls">Integer</span>&gt; pq = <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>));
<span class="kw">while</span> (!pq.isEmpty()) {
    <span class="cls">System</span>.out.print(pq.poll() + <span class="str">" "</span>);
}`,
    options: ["1 1 3 4 5 ", "3 1 4 1 5 ", "5 4 3 1 1 ", "Insertion order"],
    answer: 0,
    explanation: "PriorityQueue is a min-heap by default. poll() always removes the smallest element. Polling order: 1, 1, 3, 4, 5. Result: '1 1 3 4 5 '."
  },
  {
    id: 687, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newSingleThreadExecutor();
<span class="cls">Future</span>&lt;?&gt; f = exec.submit(() -> {
    <span class="kw">try</span> { <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"error"</span>); }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) { <span class="cls">System</span>.out.print(<span class="str">"caught"</span>); }
});
f.get();
exec.shutdown();`,
    options: ["caught", "Throws ExecutionException", "Nothing", "caught\nExecutionException"],
    answer: 0,
    explanation: "The exception is caught INSIDE the submitted task. The task runs, catches RuntimeException, prints 'caught', and completes normally. f.get() blocks until completion and returns null (no exception to wrap). Result: 'caught'."
  },
  {
    id: 688, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  Java  OCP  17  "</span>;
<span class="cls">System</span>.out.println(
    <span class="cls">Arrays</span>.stream(s.trim().split(<span class="str">"\\\\s+"</span>))
          .collect(<span class="cls">Collectors</span>.joining(<span class="str">"-"</span>))
);`,
    options: ["Java-OCP-17", "Java OCP 17", "Java--OCP--17", "Java-OCP-17-"],
    answer: 0,
    explanation: "trim() removes leading/trailing spaces. split('\\\\s+') splits on one or more whitespace chars: ['Java', 'OCP', '17']. joining('-') concatenates with dashes: 'Java-OCP-17'."
  },
  {
    id: 689, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Counter</span> {
    <span class="kw">private int</span> value = <span class="num">0</span>;
    <span class="cls">Counter</span> increment() { value++; <span class="kw">return this</span>; }
    <span class="cls">Counter</span> add(<span class="kw">int</span> n)  { value += n; <span class="kw">return this</span>; }
    <span class="kw">int</span> get() { <span class="kw">return</span> value; }
}
<span class="cls">System</span>.out.println(
    <span class="kw">new</span> <span class="cls">Counter</span>().increment().increment().add(<span class="num">5</span>).increment().get()
);`,
    options: ["8", "7", "5", "Compilation error"],
    answer: 0,
    explanation: "Fluent API chaining on same instance. start: 0. increment(): 1. increment(): 2. add(5): 7. increment(): 8. get(): 8. Result: 8."
  },
  {
    id: 690, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> max = <span class="cls">Stream</span>.of(<span class="str">"cherry"</span>, <span class="str">"apple"</span>, <span class="str">"date"</span>, <span class="str">"banana"</span>)
    .max(<span class="cls">Comparator</span>.comparing(<span class="cls">String</span>::length)
                   .thenComparing(<span class="cls">Comparator</span>.naturalOrder()));
<span class="cls">System</span>.out.println(max.orElseThrow());`,
    options: ["cherry", "banana", "apple", "date"],
    answer: 0,
    explanation: "Sort by length then alphabetically. lengths: cherry(6), apple(5), date(4), banana(6). Tie at length 6: cherry vs banana. Natural order tiebreaker: cherry > banana lexicographically. max = 'cherry'."
  },
  {
    id: 691, topic: "var",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="cls">Map</span>.of(<span class="str">"a"</span>, <span class="num">1</span>, <span class="str">"b"</span>, <span class="num">2</span>);
<span class="kw">var</span> entry = map.entrySet().iterator().next();
<span class="cls">System</span>.out.println(entry.getClass().getSimpleName().contains(<span class="str">"Entry"</span>));`,
    options: ["true", "false", "Compilation error", "Throws NoSuchElementException"],
    answer: 0,
    explanation: "entry is inferred as Map.Entry<String, Integer>. The actual class is an internal JDK implementation class whose simple name contains 'Entry'. getSimpleName().contains('Entry') = true."
  },
  {
    id: 692, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Line</span>(<span class="cls">String</span> text) <span class="kw">implements</span> <span class="cls">Comparable</span>&lt;<span class="cls">Line</span>&gt; {
    <span class="kw">public int</span> compareTo(<span class="cls">Line</span> other) {
        <span class="kw">return</span> <span class="cls">Integer</span>.compare(<span class="kw">this</span>.text.length(), other.text.length());
    }
}
<span class="kw">var</span> lines = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Line</span>(<span class="str">"hi"</span>), <span class="kw">new</span> <span class="cls">Line</span>(<span class="str">"hello"</span>), <span class="kw">new</span> <span class="cls">Line</span>(<span class="str">"hey"</span>)
));
<span class="cls">Collections</span>.sort(lines);
<span class="cls">System</span>.out.println(lines.get(<span class="num">0</span>).text());`,
    options: ["hi", "hello", "hey", "Compilation error"],
    answer: 0,
    explanation: "Record Line implements Comparable by text length. Sorted ascending by length: hi(2), hey(3), hello(5). get(0).text() = 'hi'. Result: 'hi'."
  },
  {
    id: 693, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; freq = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
<span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"a"</span>, <span class="str">"c"</span>, <span class="str">"b"</span>, <span class="str">"a"</span>)
    .forEach(s -> freq.merge(s, <span class="num">1</span>, <span class="cls">Integer</span>::sum));
<span class="cls">System</span>.out.println(freq.get(<span class="str">"a"</span>) + <span class="str">" "</span> + freq.get(<span class="str">"b"</span>));`,
    options: ["3 2", "2 3", "1 1", "Throws NullPointerException"],
    answer: 0,
    explanation: "merge(key, 1, Integer::sum): if key absent inserts 1; if present applies sum to existing and new value. 'a' appears 3 times: 1→2→3. 'b' appears 2 times: 1→2. Result: '3 2'."
  },
  {
    id: 694, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> ref = <span class="kw">new</span> <span class="cls">WeakReference</span>&lt;&gt;(<span class="kw">new</span> <span class="cls">String</span>(<span class="str">"test"</span>));
<span class="cls">System</span>.gc();
<span class="cls">System</span>.out.println(ref.get() == <span class="kw">null</span>);`,
    options: [
      "true — WeakReference is collected after GC",
      "false — GC is just a suggestion and may not run",
      "Always true",
      "Compilation error"
    ],
    answer: 1,
    explanation: "System.gc() is only a suggestion — the JVM may or may not run GC. The WeakReference referent has no strong references, making it eligible for collection, but collection is not guaranteed. The result is non-deterministic: could be true or false. The 'most correct' answer in exam context is that GC may not collect it."
  },
  {
    id: 695, topic: "Annotations",
    text: "What is the purpose of @Inherited on a custom annotation?",
    code: null,
    options: [
      "It allows the annotation to be used on inherited members",
      "When applied to a class, the annotation is automatically inherited by subclasses",
      "It marks the annotation as available at runtime",
      "It allows the annotation to appear multiple times on the same element"
    ],
    answer: 1,
    explanation: "@Inherited is a meta-annotation. When @MyAnnotation is itself annotated with @Inherited and applied to a class, its subclasses automatically inherit @MyAnnotation. Without @Inherited, annotations on a class are NOT inherited by subclasses. Only applies to class-level annotations."
  },
  {
    id: 696, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">long</span> count = <span class="cls">LongStream</span>.range(<span class="num">1</span>, <span class="num">101</span>)
    .filter(n -> n % <span class="num">3</span> == <span class="num">0</span> || n % <span class="num">5</span> == <span class="num">0</span>)
    .count();
<span class="cls">System</span>.out.println(count);`,
    options: ["47", "46", "40", "50"],
    answer: 0,
    explanation: "Numbers 1-100 divisible by 3 OR 5. By 3: 33 numbers. By 5: 20 numbers. By 15 (both): 6 numbers. By inclusion-exclusion: 33+20-6=47. Result: 47."
  },
  {
    id: 697, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Money</span> {
    <span class="kw">private final int</span> cents;
    <span class="cls">Money</span>(<span class="kw">int</span> c) { cents = c; }
    <span class="cls">Money</span> add(<span class="cls">Money</span> other) { <span class="kw">return new</span> <span class="cls">Money</span>(cents + other.cents); }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="str">"$"</span> + (cents / <span class="num">100</span>) + <span class="str">"."</span> + (<span class="cls">String</span>.format(<span class="str">"%02d"</span>, cents % <span class="num">100</span>)); }
}
<span class="kw">var</span> total = <span class="kw">new</span> <span class="cls">Money</span>(<span class="num">150</span>).add(<span class="kw">new</span> <span class="cls">Money</span>(<span class="num">275</span>));
<span class="cls">System</span>.out.println(total);`,
    options: ["$4.25", "$1.50", "$2.75", "$4.50"],
    answer: 0,
    explanation: "150 cents + 275 cents = 425 cents. toString(): 425/100=4, 425%100=25 → '$4.25'. Result: '$4.25'."
  },
  {
    id: 698, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">Semaphore</span> sem = <span class="kw">new</span> <span class="cls">Semaphore</span>(<span class="num">2</span>);
<span class="cls">System</span>.out.println(sem.availablePermits());
sem.acquire();
sem.acquire();
<span class="cls">System</span>.out.println(sem.availablePermits());
sem.release();
<span class="cls">System</span>.out.println(sem.availablePermits());`,
    options: ["2\n0\n1", "2\n1\n2", "0\n2\n1", "Throws InterruptedException"],
    answer: 0,
    explanation: "Semaphore(2): 2 permits. availablePermits()=2. Two acquire()s consume both permits. availablePermits()=0. One release() returns one permit. availablePermits()=1. Result: '2\\n0\\n1'."
  },
  {
    id: 699, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; firstMatch(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="kw">return</span> list.stream().filter(p).findFirst();
}
<span class="kw">var</span> result = firstMatch(
    <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>),
    n -> n > <span class="num">3</span>
);
<span class="cls">System</span>.out.println(result.orElse(-<span class="num">1</span>));`,
    options: ["4", "5", "-1", "Compilation error"],
    answer: 0,
    explanation: "firstMatch finds the first Integer in [1,2,3,4,5] where n>3. That is 4. Optional(4).orElse(-1) = 4. Result: 4."
  },
  {
    id: 700, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Student</span>(<span class="cls">String</span> name, <span class="kw">int</span> grade) {}
<span class="kw">var</span> students = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Alice"</span>, <span class="num">90</span>),
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Bob"</span>,   <span class="num">85</span>),
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Carol"</span>, <span class="num">92</span>)
);
students.stream()
    .max(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Student</span>::grade))
    .ifPresent(s -> <span class="cls">System</span>.out.println(s.name()));`,
    options: ["Carol", "Alice", "Bob", "Compilation error"],
    answer: 0,
    explanation: "comparingInt(Student::grade) finds the student with the highest grade. Carol has grade 92, which is the highest. ifPresent prints s.name() = 'Carol'. Result: 'Carol'."
  }
];
