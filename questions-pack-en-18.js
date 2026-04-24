// ═══════════════════════════════════════════════════════
//  PACK EN-18 — Questions 851–900  (English)
//  Topics: Completable Future advanced, Stream Spliterator,
//          JPMS advanced, Localization edge cases,
//          Reflection deep, Design patterns GoF,
//          Functional composition advanced,
//          Collections factory methods, BigDecimal ops,
//          Date/Time zones, Records advanced patterns,
//          instanceof negative patterns
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_18 = [
  {
    id: 851, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; a = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">5</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; b = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">10</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; c = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">3</span>);
<span class="kw">var</span> r = <span class="cls">CompletableFuture</span>.allOf(a, b, c)
    .thenApply(v -> a.join() + b.join() + c.join());
<span class="cls">System</span>.out.println(r.get());`,
    options: ["18", "5", "Non-deterministic", "Throws ExecutionException"],
    answer: 0,
    explanation: "allOf(a,b,c) completes when all futures complete (all already done). thenApply runs with the Void result. Inside, join() retrieves the completed values: 5+10+3=18. r.get() = 18."
  },
  {
    id: 852, topic: "CompletableFuture",
    text: "What does CompletableFuture.anyOf() return?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; slow = <span class="cls">CompletableFuture</span>.supplyAsync(() -> {
    <span class="kw">try</span> { <span class="cls">Thread</span>.sleep(<span class="num">100</span>); } <span class="kw">catch</span>(<span class="cls">Exception</span> e) {}
    <span class="kw">return</span> <span class="str">"slow"</span>;
});
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; fast = <span class="cls">CompletableFuture</span>.completedFuture(<span class="str">"fast"</span>);
<span class="cls">Object</span> r = <span class="cls">CompletableFuture</span>.anyOf(slow, fast).get();
<span class="cls">System</span>.out.println(r);`,
    options: ["fast", "slow", "Non-deterministic", "Compilation error — anyOf returns Object"],
    answer: 0,
    explanation: "anyOf() returns CompletableFuture<Object> completing with the result of the FIRST future to complete. 'fast' is already completed, 'slow' takes 100ms. anyOf() returns 'fast' immediately. r = 'fast'. (anyOf does return Object, but that's not a compilation error.)"
  },
  {
    id: 853, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; cf =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="str">"start"</span>)
        .thenApply(s -> s + <span class="str">"-A"</span>)
        .thenApplyAsync(s -> s + <span class="str">"-B"</span>)
        .thenApply(s -> s + <span class="str">"-C"</span>);
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["start-A-B-C", "start-B-A-C", "Non-deterministic", "Compilation error"],
    answer: 0,
    explanation: "thenApply and thenApplyAsync both transform the value, but thenApplyAsync uses a separate thread pool. The pipeline is still sequential logically: start → start-A → start-A-B → start-A-B-C. Result: 'start-A-B-C'."
  },
  {
    id: 854, topic: "JPMS",
    text: "What is the output of the following code in a modular application?",
    code: `<span class="cm">// module-info.java</span>
<span class="kw">module</span> com.example {
    <span class="kw">requires</span> java.logging;
    <span class="kw">exports</span> com.example.api;
}`,
    options: [
      "The module can use java.util.logging and exposes com.example.api to all modules",
      "The module exposes all its packages",
      "Compilation error — java.logging is not a valid module name",
      "The module hides com.example.api from other modules"
    ],
    answer: 0,
    explanation: "'requires java.logging' adds java.util.logging to the module's readability. 'exports com.example.api' makes that package accessible to all other modules at compile-time and runtime. Other packages in the module are encapsulated by default."
  },
  {
    id: 855, topic: "JPMS",
    text: "What happens when a module tries to use reflection on a package that is not opened to it?",
    code: null,
    options: [
      "A compilation error occurs",
      "An InaccessibleObjectException (or IllegalAccessException) is thrown at runtime",
      "Reflection works normally — JPMS does not affect reflection",
      "A SecurityException is thrown"
    ],
    answer: 1,
    explanation: "With JPMS, if module A tries to use reflection to access non-public members of a package in module B, and B does not 'opens' that package to A (or to all), an InaccessibleObjectException (extends RuntimeException) is thrown at runtime. This is the strong encapsulation of JPMS."
  },
  {
    id: 856, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">Locale</span> l = <span class="cls">Locale</span>.of(<span class="str">"pt"</span>, <span class="str">"BR"</span>);
<span class="cls">System</span>.out.println(l.getLanguage());
<span class="cls">System</span>.out.println(l.getCountry());
<span class="cls">System</span>.out.println(l.getDisplayName(<span class="cls">Locale</span>.ENGLISH));`,
    options: ["pt\nBR\nPortuguese (Brazil)", "pt\nBR\nBrazilian Portuguese", "PT\nbr\nPortuguese", "Compilation error"],
    answer: 0,
    explanation: "getLanguage() returns lowercase ISO 639 code: 'pt'. getCountry() returns uppercase ISO 3166 code: 'BR'. getDisplayName(Locale.ENGLISH) returns the locale's name in English: 'Portuguese (Brazil)'."
  },
  {
    id: 857, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">NumberFormat</span> pct = <span class="cls">NumberFormat</span>.getPercentInstance(<span class="cls">Locale</span>.US);
<span class="cls">System</span>.out.println(pct.format(<span class="num">0.75</span>));
<span class="cls">System</span>.out.println(pct.format(<span class="num">1.5</span>));`,
    options: ["75%\n150%", "0.75%\n1.5%", "75.00%\n150.00%", "Compilation error"],
    answer: 0,
    explanation: "getPercentInstance() formats as percentage. 0.75 × 100 = 75% → '75%'. 1.5 × 100 = 150% → '150%'. The format multiplies by 100 automatically. Result: '75%\\n150%'."
  },
  {
    id: 858, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Point</span> {
    <span class="kw">private int</span> x, y;
    <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) { <span class="kw">this</span>.x = x; <span class="kw">this</span>.y = y; }
}
<span class="cls">Point</span> p = <span class="kw">new</span> <span class="cls">Point</span>(<span class="num">3</span>, <span class="num">4</span>);
<span class="cls">Field</span> f = <span class="cls">Point</span>.<span class="kw">class</span>.getDeclaredField(<span class="str">"x"</span>);
f.setAccessible(<span class="kw">true</span>);
<span class="cls">System</span>.out.println(f.get(p));`,
    options: ["3", "4", "Throws IllegalAccessException", "Compilation error"],
    answer: 0,
    explanation: "getDeclaredField('x') finds the private field x. setAccessible(true) bypasses access control. f.get(p) reads the field value from instance p = 3. Result: 3."
  },
  {
    id: 859, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {}
<span class="cls">System</span>.out.println(<span class="cls">B</span>.<span class="kw">class</span>.getSuperclass().getSimpleName());
<span class="cls">System</span>.out.println(<span class="cls">A</span>.<span class="kw">class</span>.getSuperclass().getSimpleName());`,
    options: ["A\nObject", "B\nA", "Object\nObject", "Compilation error"],
    answer: 0,
    explanation: "B.class.getSuperclass() = A.class. A.class.getSuperclass() = Object.class. getSimpleName(): 'A' and 'Object'. Result: 'A\\nObject'."
  },
  {
    id: 860, topic: "Design Patterns",
    text: "Which design pattern does java.lang.Runtime implement?",
    code: null,
    options: ["Factory Method", "Singleton", "Prototype", "Abstract Factory"],
    answer: 1,
    explanation: "Runtime.getRuntime() always returns the same Runtime instance — there is exactly one Runtime per JVM. The constructor is private and the single instance is accessed via the static getRuntime() factory method. This is the Singleton pattern."
  },
  {
    id: 861, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">TextProcessor</span> {
    <span class="cls">String</span> process(<span class="cls">String</span> text);
}
<span class="kw">class</span> <span class="cls">Pipeline</span> {
    <span class="kw">private</span> <span class="cls">List</span>&lt;<span class="cls">TextProcessor</span>&gt; steps = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="cls">Pipeline</span> addStep(<span class="cls">TextProcessor</span> p) { steps.add(p); <span class="kw">return this</span>; }
    <span class="cls">String</span> run(<span class="cls">String</span> text) {
        <span class="kw">return</span> steps.stream().reduce(<span class="cls">Function</span>.<span class="kw">&lt;String&gt;</span>identity(),
            (f, p) -> f.andThen(p::process), (<span class="cls">f1</span>, <span class="cls">f2</span>) -> f1.andThen(f2)).apply(text);
    }
}
<span class="kw">var</span> r = <span class="kw">new</span> <span class="cls">Pipeline</span>()
    .addStep(<span class="cls">String</span>::trim)
    .addStep(<span class="cls">String</span>::toLowerCase)
    .run(<span class="str">"  HELLO  "</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["hello", "HELLO", "  hello  ", "Compilation error"],
    answer: 0,
    explanation: "Pipeline (Chain of Responsibility / Pipe pattern). Steps: trim → toLowerCase. '  HELLO  '.trim() = 'HELLO'. toLowerCase() = 'hello'. Result: 'hello'."
  },
  {
    id: 862, topic: "Functional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; triple = x -> x * <span class="num">3</span>;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; inc    = x -> x + <span class="num">1</span>;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; f = triple.compose(inc).andThen(triple);
<span class="cls">System</span>.out.println(f.apply(<span class="num">2</span>));`,
    options: ["27", "21", "9", "Compilation error"],
    answer: 0,
    explanation: "compose(inc) means: inc first, then triple. andThen(triple) means: then triple again. So: inc(2)=3, triple(3)=9, triple(9)=27. Result: 27."
  },
  {
    id: 863, topic: "Functional",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);
<span class="cls">Map</span>&lt;<span class="cls">Boolean</span>, <span class="cls">Integer</span>&gt; r = nums.stream()
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        n -> n % <span class="num">2</span> == <span class="num">0</span>,
        <span class="cls">Collectors</span>.summingInt(<span class="cls">Integer</span>::intValue)
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>) + <span class="str">" "</span> + r.get(<span class="kw">false</span>));`,
    options: ["6 9", "9 6", "2 3", "Compilation error"],
    answer: 0,
    explanation: "partitioningBy with downstream summingInt. Evens [2,4] sum=6. Odds [1,3,5] sum=9. r.get(true)=6, r.get(false)=9. Result: '6 9'."
  },
  {
    id: 864, topic: "Collections Factory",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> m = <span class="cls">Map</span>.of(<span class="str">"a"</span>, <span class="num">1</span>, <span class="str">"b"</span>, <span class="num">2</span>);
<span class="kw">try</span> {
    m.put(<span class="str">"c"</span>, <span class="num">3</span>);
} <span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"immutable"</span>);
}
<span class="kw">try</span> {
    m.put(<span class="str">"a"</span>, <span class="num">99</span>);
} <span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"still immutable"</span>);
}`,
    options: ["immutable\nstill immutable", "immutable", "still immutable", "No output"],
    answer: 0,
    explanation: "Map.of() creates a completely immutable map. Both adding new keys AND updating existing keys throw UnsupportedOperationException. Result: 'immutable\\nstill immutable'."
  },
  {
    id: 865, topic: "Collections Factory",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> list = <span class="cls">List</span>.copyOf(<span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>)));
<span class="cls">System</span>.out.println(list.getClass().getSimpleName().contains(<span class="str">"Immutable"</span>)
    || list instanceof <span class="cls">java.util.AbstractList</span>);`,
    options: ["true", "false", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "List.copyOf() (Java 10+) returns an unmodifiable list. The actual class is an internal JDK immutable list implementation. It IS an AbstractList (or similar). The condition is true either because the class name contains 'Immutable' or because it extends AbstractList. Result: true."
  },
  {
    id: 866, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> a = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"999999999999999999999.99"</span>);
<span class="kw">var</span> b = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"0.01"</span>);
<span class="cls">System</span>.out.println(a.add(b));`,
    options: ["1000000000000000000000.00", "999999999999999999999.00", "Throws ArithmeticException", "Overflow occurs"],
    answer: 0,
    explanation: "BigDecimal has arbitrary precision — no overflow. 999999999999999999999.99 + 0.01 = 1000000000000000000000.00. BigDecimal preserves scale: both have 2 decimal places, result has 2. Result: '1000000000000000000000.00'."
  },
  {
    id: 867, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> x = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"10.50"</span>);
<span class="kw">var</span> y = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"4"</span>);
<span class="kw">var</span> q = x.divideToIntegralValue(y);
<span class="kw">var</span> r = x.remainder(y);
<span class="cls">System</span>.out.println(q + <span class="str">" remainder "</span> + r);`,
    options: ["2 remainder 2.50", "2 remainder 2", "2.50 remainder 2.50", "Throws ArithmeticException"],
    answer: 0,
    explanation: "divideToIntegralValue(4): 10.50/4 = 2.625 → integer part = 2. remainder(4): 10.50 - 4*2 = 10.50 - 8 = 2.50. Result: '2 remainder 2.50'."
  },
  {
    id: 868, topic: "Date/Time Zones",
    text: "What is the output of the following code?",
    code: `<span class="cls">ZoneId</span>       utc  = <span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>);
<span class="cls">ZoneId</span>       ny   = <span class="cls">ZoneId</span>.of(<span class="str">"America/New_York"</span>);
<span class="cls">ZonedDateTime</span> utcTime = <span class="cls">ZonedDateTime</span>.of(<span class="num">2024</span>,<span class="num">7</span>,<span class="num">4</span>,<span class="num">12</span>,<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>, utc);
<span class="cls">ZonedDateTime</span> nyTime  = utcTime.withZoneSameInstant(ny);
<span class="cls">System</span>.out.println(nyTime.getHour());`,
    options: ["8", "12", "16", "17"],
    answer: 0,
    explanation: "America/New_York in July (EDT) is UTC-4. 12:00 UTC - 4 hours = 08:00 EDT. nyTime.getHour() = 8."
  },
  {
    id: 869, topic: "Date/Time Zones",
    text: "What is the output of the following code?",
    code: `<span class="cls">ZoneOffset</span>    offset = <span class="cls">ZoneOffset</span>.ofHours(-<span class="num">3</span>);
<span class="cls">OffsetDateTime</span> odt   = <span class="cls">OffsetDateTime</span>.of(<span class="num">2024</span>,<span class="num">3</span>,<span class="num">15</span>,<span class="num">10</span>,<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>, offset);
<span class="cls">System</span>.out.println(odt.toInstant().equals(
    odt.withOffsetSameInstant(<span class="cls">ZoneOffset</span>.UTC).toInstant()
));`,
    options: ["true", "false", "Compilation error", "Throws DateTimeException"],
    answer: 0,
    explanation: "withOffsetSameInstant() changes the offset but keeps the same Instant. The underlying moment in time is unchanged. Both toInstant() calls return the same Instant (2024-03-15T13:00:00Z). equals() = true."
  },
  {
    id: 870, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapToLong(<span class="cls">Integer</span>::longValue)
    .filter(n -> n > <span class="num">2</span>)
    .reduce(<span class="num">0L</span>, <span class="cls">Long</span>::sum);
<span class="cls">System</span>.out.println(r);`,
    options: ["12", "15", "9", "3"],
    answer: 0,
    explanation: "mapToLong gives LongStream. filter(>2): [3,4,5]. reduce(0L, Long::sum) = 0+3+4+5=12. Result: 12."
  },
  {
    id: 871, topic: "instanceof",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">List</span>&lt;?&gt; list && list.size() == <span class="num">3</span>) {
    <span class="cls">System</span>.out.println(<span class="str">"3-element list"</span>);
} <span class="kw">else</span> {
    <span class="cls">System</span>.out.println(<span class="str">"other"</span>);
}`,
    options: ["3-element list", "other", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "obj instanceof List<?> list: obj is a List → matches, list is bound. list.size()==3 → true. Prints '3-element list'. The wildcard ? is required because instanceof with parameterized types (like List<Integer>) is not allowed due to erasure."
  },
  {
    id: 872, topic: "instanceof",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Op</span> <span class="kw">permits</span> <span class="cls">Add</span>, <span class="cls">Mul</span> {}
<span class="kw">record</span> <span class="cls">Add</span>(<span class="kw">int</span> a, <span class="kw">int</span> b) <span class="kw">implements</span> <span class="cls">Op</span> {}
<span class="kw">record</span> <span class="cls">Mul</span>(<span class="kw">int</span> a, <span class="kw">int</span> b) <span class="kw">implements</span> <span class="cls">Op</span> {}
<span class="cls">Op</span> op = <span class="kw">new</span> <span class="cls">Mul</span>(<span class="num">4</span>, <span class="num">5</span>);
<span class="kw">if</span> (!(op <span class="kw">instanceof</span> <span class="cls">Add</span> a)) {
    <span class="cls">System</span>.out.println(<span class="str">"not add"</span>);
}
<span class="kw">if</span> (op <span class="kw">instanceof</span> <span class="cls">Mul</span> m) {
    <span class="cls">System</span>.out.println(<span class="str">"mul: "</span> + m.a() * m.b());
}`,
    options: ["not add\nmul: 20", "mul: 20", "not add", "Compilation error"],
    answer: 0,
    explanation: "op is Mul. !(op instanceof Add a): Mul is not Add → true → prints 'not add'. op instanceof Mul m: true → m=Mul(4,5) → m.a()*m.b()=20 → prints 'mul: 20'. Result: 'not add\\nmul: 20'."
  },
  {
    id: 873, topic: "Functional",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; result = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>, <span class="str">"four"</span>)
    .filter(s -> s.length() % <span class="num">2</span> == <span class="num">0</span>)
    .map(<span class="cls">String</span>::toUpperCase)
    .sorted()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[FOUR]", "[FOUR, TWO]", "[TWO, FOUR]", "Compilation error"],
    answer: 0,
    explanation: "filter(even length): one(3→odd), two(3→odd), three(5→odd), four(4→even). Only 'four' passes. map(toUpperCase): 'FOUR'. sorted(): ['FOUR']. collect to List. Result: '[FOUR]'."
  },
  {
    id: 874, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Deque</span>&lt;<span class="cls">String</span>&gt; dq = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>,<span class="str">"d"</span>));
<span class="cls">Iterator</span>&lt;<span class="cls">String</span>&gt; it = dq.descendingIterator();
<span class="kw">while</span>(it.hasNext()) <span class="cls">System</span>.out.print(it.next() + <span class="str">" "</span>);`,
    options: ["d c b a ", "a b c d ", "d a b c ", "Compilation error"],
    answer: 0,
    explanation: "descendingIterator() iterates from tail to head. Deque [a,b,c,d]: tail=d. Iteration: d, c, b, a. Result: 'd c b a '."
  },
  {
    id: 875, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>, <span class="str">"dog"</span>, <span class="str">"bird"</span>)
    .map(s -> s + s.length())
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["[cat3, dog3, bird4]", "[cat, dog, bird]", "[3, 3, 4]", "[cat3dog3bird4]"],
    answer: 0,
    explanation: "map appends length: 'cat'→'cat3', 'dog'→'dog3', 'bird'→'bird4'. joining(', ', '[', ']'): prefix=[, elements joined by ', ', suffix=]. Result: '[cat3, dog3, bird4]'."
  },
  {
    id: 876, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Num</span> {
    <span class="kw">int</span> val;
    <span class="cls">Num</span>(<span class="kw">int</span> v) { val = v; }
    <span class="cls">Num</span> add(<span class="cls">Num</span> other) { <span class="kw">return new</span> <span class="cls">Num</span>(val + other.val); }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="cls">String</span>.valueOf(val); }
}
<span class="cls">System</span>.out.println(
    <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>)
        .map(<span class="cls">Num</span>::<span class="kw">new</span>)
        .reduce(<span class="kw">new</span> <span class="cls">Num</span>(<span class="num">0</span>), <span class="cls">Num</span>::add)
);`,
    options: ["10", "0", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "map(Num::new) creates [Num(1), Num(2), Num(3), Num(4)]. reduce(Num(0), Num::add): Num(0).add(Num(1))=Num(1), Num(1).add(Num(2))=Num(3), Num(3).add(Num(3))=Num(6), Num(6).add(Num(4))=Num(10). toString()='10'. Result: '10'."
  },
  {
    id: 877, topic: "Date/Time",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">1</span>, <span class="num">15</span>);
<span class="cls">System</span>.out.println(d.with(<span class="cls">TemporalAdjusters</span>.lastInMonth(<span class="cls">DayOfWeek</span>.FRIDAY)));`,
    options: ["2024-01-26", "2024-01-31", "2024-01-05", "2024-01-19"],
    answer: 0,
    explanation: "lastInMonth(FRIDAY): finds the last Friday in January 2024. January 2024 Fridays: 5, 12, 19, 26. Last = 26. Result: '2024-01-26'."
  },
  {
    id: 878, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> latch = <span class="kw">new</span> <span class="cls">CountDownLatch</span>(<span class="num">2</span>);
<span class="cls">Runnable</span> task = () -> {
    latch.countDown();
    <span class="kw">try</span> { latch.await(); } <span class="kw">catch</span>(<span class="cls">Exception</span> e) {}
    <span class="cls">System</span>.out.print(<span class="str">"done "</span>);
};
<span class="kw">new</span> <span class="cls">Thread</span>(task).start();
<span class="kw">new</span> <span class="cls">Thread</span>(task).start();
latch.await();`,
    options: ["done done ", "done ", "Deadlock", "Non-deterministic but both print 'done'"],
    answer: 3,
    explanation: "Both threads countDown() (count goes 2→1→0). When count=0, all latch.await() calls unblock. Both threads then print 'done '. Main thread's latch.await() also unblocks. Both 'done ' prints are guaranteed but their order relative to each other is non-deterministic. Both will print."
  },
  {
    id: 879, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; findFirst(<span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; list, <span class="cls">Class</span>&lt;T&gt; type) {
    <span class="kw">return</span> list.stream()
        .filter(type::isInstance)
        .map(type::cast)
        .findFirst();
}
<span class="cls">List</span>&lt;<span class="cls">Object</span>&gt; mixed = <span class="cls">List</span>.of(<span class="str">"hello"</span>, <span class="num">42</span>, <span class="num">3.14</span>, <span class="str">"world"</span>);
<span class="cls">System</span>.out.println(findFirst(mixed, <span class="cls">Integer</span>.<span class="kw">class</span>).orElse(<span class="num">-1</span>));`,
    options: ["42", "-1", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "findFirst searches for the first element of type Integer. type.isInstance() and type.cast() use the Class token. First Integer in [String, Integer, Double, String] is 42. orElse(-1): present → 42. Result: 42."
  },
  {
    id: 880, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> words = <span class="cls">List</span>.of(<span class="str">"to"</span>, <span class="str">"be"</span>, <span class="str">"or"</span>, <span class="str">"not"</span>, <span class="str">"to"</span>, <span class="str">"be"</span>);
<span class="kw">var</span> freq = words.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(w -> w, <span class="cls">Collectors</span>.counting()));
freq.entrySet().stream()
    .filter(e -> e.getValue() > <span class="num">1</span>)
    .forEach(e -> <span class="cls">System</span>.out.print(e.getKey() + <span class="str">" "</span>));`,
    options: ["to be ", "be to ", "to or be ", "to be or "],
    answer: 0,
    explanation: "groupingBy counting: to=2, be=2, or=1, not=1. filter(count>1): to and be. forEach order depends on HashMap (non-deterministic), but exam typically accepts 'to be ' or 'be to '. Both to and be appear. The most canonical answer is 'to be '."
  },
  {
    id: 881, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Greet</span> {
    <span class="cls">String</span> hello(<span class="cls">String</span> name);
    <span class="kw">static</span> <span class="cls">Greet</span> formal()   { <span class="kw">return</span> n -> <span class="str">"Good day, "</span> + n; }
    <span class="kw">static</span> <span class="cls">Greet</span> informal() { <span class="kw">return</span> n -> <span class="str">"Hey "</span> + n + <span class="str">"!"</span>; }
}
<span class="cls">Greet</span>[] modes = {<span class="cls">Greet</span>.formal(), <span class="cls">Greet</span>.informal()};
<span class="kw">for</span> (<span class="kw">var</span> g : modes) <span class="cls">System</span>.out.println(g.hello(<span class="str">"Java"</span>));`,
    options: ["Good day, Java\nHey Java!", "Hey Java!\nGood day, Java", "Java\nJava", "Compilation error"],
    answer: 0,
    explanation: "Interface static factory methods return lambda implementations. formal() → lambda for 'Good day, '. informal() → 'Hey ...!'. Loop in order: first formal, then informal. Result: 'Good day, Java\\nHey Java!'."
  },
  {
    id: 882, topic: "JVM",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.MAX_VALUE + <span class="num">1</span> == <span class="cls">Integer</span>.MIN_VALUE);
<span class="cls">System</span>.out.println(<span class="cls">Long</span>.MAX_VALUE + <span class="num">1</span> == <span class="cls">Long</span>.MIN_VALUE);`,
    options: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
    answer: 0,
    explanation: "Both int and long wrap around on overflow. MAX_VALUE + 1 = MIN_VALUE for both types (two's complement arithmetic, no exception). Both comparisons are true. Result: 'true\\ntrue'."
  },
  {
    id: 883, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Matrix</span>(<span class="kw">int</span>[][] data) {
    <span class="cls">Matrix</span> {
        data = <span class="cls">Arrays</span>.stream(data)
            .map(row -> row.clone())
            .toArray(<span class="kw">int</span>[][]::new);
    }
}
<span class="kw">int</span>[][] d = {{<span class="num">1</span>,<span class="num">2</span>},{<span class="num">3</span>,<span class="num">4</span>}};
<span class="kw">var</span> m = <span class="kw">new</span> <span class="cls">Matrix</span>(d);
d[<span class="num">0</span>][<span class="num">0</span>] = <span class="num">99</span>;
<span class="cls">System</span>.out.println(m.data()[<span class="num">0</span>][<span class="num">0</span>]);`,
    options: ["1", "99", "Compilation error", "Throws ArrayIndexOutOfBoundsException"],
    answer: 0,
    explanation: "Compact constructor does deep copy: each row is cloned. d[0][0]=99 modifies the original array, but m.data()[0] is a different clone. m.data()[0][0] = 1. Result: 1."
  },
  {
    id: 884, topic: "Functional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; p1 = s -> { <span class="cls">System</span>.out.print(<span class="str">"p1 "</span>); <span class="kw">return</span> s.isEmpty(); };
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; p2 = s -> { <span class="cls">System</span>.out.print(<span class="str">"p2 "</span>); <span class="kw">return</span> s.length() > <span class="num">3</span>; };
<span class="cls">System</span>.out.println(p1.or(p2).test(<span class="str">"hi"</span>));`,
    options: ["p1 p2 false", "p1 false", "p1 p2 true", "p2 p1 false"],
    answer: 0,
    explanation: "p1.or(p2): evaluates p1 first (prints 'p1 '). 'hi'.isEmpty()=false. OR needs to continue. Evaluates p2 (prints 'p2 '). 'hi'.length()=2 > 3 is false. Final: false. Prints 'p1 p2 false'."
  },
  {
    id: 885, topic: "Exception Hierarchy",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">int</span>[] arr = <span class="kw">new</span> <span class="kw">int</span>[-<span class="num">1</span>];
} <span class="kw">catch</span> (<span class="cls">NegativeArraySizeException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"NAS "</span>);
} <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"RE "</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"F"</span>);
}`,
    options: ["NAS F", "RE F", "NAS RE F", "Compilation error"],
    answer: 0,
    explanation: "new int[-1] throws NegativeArraySizeException (extends RuntimeException). The first matching catch (NegativeArraySizeException) handles it → prints 'NAS '. finally runs → prints 'F'. Result: 'NAS F'."
  },
  {
    id: 886, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.range(<span class="num">1</span>, <span class="num">6</span>)
    .peek(n -> <span class="cls">System</span>.out.print(<span class="str">"p"</span> + n + <span class="str">" "</span>))
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["p1 p2 p3 p4 p5 6", "p2 p4 6", "p1 p2 p3 p4 p5 \n6", "6"],
    answer: 0,
    explanation: "peek is called for every element before filter. All 5 elements are peeked: 'p1 p2 p3 p4 p5 '. filter keeps 2 and 4. sum()=6. println prints '6'. Total output: 'p1 p2 p3 p4 p5 6' (on same line since print vs println)."
  },
  {
    id: 887, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Expr</span> {
    <span class="kw">abstract int</span> eval();
    <span class="cls">Expr</span> plus(<span class="cls">Expr</span> other) {
        <span class="kw">return new</span> <span class="cls">Expr</span>() {
            <span class="kw">int</span> eval() { <span class="kw">return</span> <span class="cls">Expr</span>.<span class="kw">this</span>.eval() + other.eval(); }
        };
    }
}
<span class="cls">Expr</span> e1 = <span class="kw">new</span> <span class="cls">Expr</span>() { <span class="kw">int</span> eval() { <span class="kw">return</span> <span class="num">5</span>; } };
<span class="cls">Expr</span> e2 = <span class="kw">new</span> <span class="cls">Expr</span>() { <span class="kw">int</span> eval() { <span class="kw">return</span> <span class="num">3</span>; } };
<span class="cls">System</span>.out.println(e1.plus(e2).eval());`,
    options: ["8", "5", "3", "Compilation error"],
    answer: 0,
    explanation: "e1.plus(e2) returns an anonymous Expr whose eval() calls Expr.this.eval() (= e1.eval()=5) + other.eval() (= e2.eval()=3) = 8. Result: 8."
  },
  {
    id: 888, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">T</span>[] toArray(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">T</span>[] arr) {
    <span class="kw">return</span> list.toArray(arr);
}
<span class="cls">String</span>[] r = toArray(<span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>), <span class="kw">new</span> <span class="cls">String</span>[<span class="num">0</span>]);
<span class="cls">System</span>.out.println(r.length + <span class="str">" "</span> + r[<span class="num">0</span>]);`,
    options: ["3 a", "0 null", "Compilation error", "Throws ArrayStoreException"],
    answer: 0,
    explanation: "List.toArray(T[]) with a zero-length array creates a new array of the right size. toArray(new String[0]) returns a String[3]. r.length=3, r[0]='a'. Result: '3 a'."
  },
  {
    id: 889, topic: "Date/Time",
    text: "What is the output of the following code?",
    code: `<span class="cls">Instant</span> now    = <span class="cls">Instant</span>.now();
<span class="cls">Instant</span> future = now.plus(<span class="num">1</span>, <span class="cls">ChronoUnit</span>.HOURS);
<span class="cls">System</span>.out.println(now.isBefore(future));
<span class="cls">System</span>.out.println(<span class="cls">Duration</span>.between(now, future).toMinutes());`,
    options: ["true\n60", "false\n60", "true\n3600", "Compilation error"],
    answer: 0,
    explanation: "now + 1 hour is in the future. isBefore(future) = true. Duration.between(now, future) = 1 hour. toMinutes() = 60. Result: 'true\\n60'."
  },
  {
    id: 890, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;(<span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">3</span>));
m.entrySet().removeIf(e -> e.getValue() % <span class="num">2</span> != <span class="num">0</span>);
<span class="cls">System</span>.out.println(m);`,
    options: ["{b=2}", "{a=1, c=3}", "{a=1, b=2, c=3}", "Throws ConcurrentModificationException"],
    answer: 0,
    explanation: "entrySet().removeIf() safely removes entries matching the predicate. Removes odd values: a=1 and c=3. Keeps b=2. Result: '{b=2}'."
  },
  {
    id: 891, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"java"</span>, <span class="str">"python"</span>, <span class="str">"kotlin"</span>, <span class="str">"go"</span>)
    .collect(<span class="cls">Collectors</span>.maxBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)));
<span class="cls">System</span>.out.println(r.orElse(<span class="str">"none"</span>));`,
    options: ["python", "kotlin", "go", "java"],
    answer: 1,
    explanation: "maxBy(comparingInt(length)): lengths are java(4), python(6), kotlin(6), go(2). Max length is 6 (tie between python and kotlin). For ties, maxBy keeps the last encountered in encounter order with natural max semantics. Actually, max() returns the last maximum found. python(6) then kotlin(6): kotlin encountered after python and kotlin=python so 'kotlin' wins (max keeps the rightmost maximum in stream order for equal values). Result: 'kotlin'."
  },
  {
    id: 892, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">Semaphore</span> s = <span class="kw">new</span> <span class="cls">Semaphore</span>(<span class="num">3</span>);
s.acquire(<span class="num">2</span>);
<span class="cls">System</span>.out.println(s.availablePermits());
s.release(<span class="num">5</span>);
<span class="cls">System</span>.out.println(s.availablePermits());`,
    options: ["1\n6", "1\n8", "2\n5", "Throws IllegalArgumentException"],
    answer: 0,
    explanation: "Semaphore(3): 3 permits. acquire(2): 3-2=1 available. release(5): adds 5 → 1+5=6 available. Semaphore allows release of MORE permits than acquired (no strict tracking). Result: '1\\n6'."
  },
  {
    id: 893, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Lazy</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Supplier</span>&lt;T&gt; supplier;
    <span class="kw">private</span> T value;
    <span class="kw">private boolean</span> computed = <span class="kw">false</span>;
    <span class="cls">Lazy</span>(<span class="cls">Supplier</span>&lt;T&gt; s) { supplier = s; }
    T get() {
        <span class="kw">if</span> (!computed) { value = supplier.get(); computed = <span class="kw">true</span>; }
        <span class="kw">return</span> value;
    }
}
<span class="kw">int</span>[] calls = {<span class="num">0</span>};
<span class="cls">Lazy</span>&lt;<span class="cls">String</span>&gt; lazy = <span class="kw">new</span> <span class="cls">Lazy</span>&lt;&gt;(() -> { calls[<span class="num">0</span>]++; <span class="kw">return</span> <span class="str">"value"</span>; });
lazy.get(); lazy.get(); lazy.get();
<span class="cls">System</span>.out.println(calls[<span class="num">0</span>] + <span class="str">" "</span> + lazy.get());`,
    options: ["1 value", "3 value", "1 value3", "Compilation error"],
    answer: 0,
    explanation: "Lazy evaluation: supplier is called only once (when computed=false). First get() → calls[0]++→1, computed=true, value='value'. Second and third get(): computed=true, supplier not called. Final: calls[0]=1, lazy.get()='value'. Result: '1 value'."
  },
  {
    id: 894, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;A, B, C&gt; <span class="cls">Function</span>&lt;A, C&gt; compose(
    <span class="cls">Function</span>&lt;A, B&gt; f, <span class="cls">Function</span>&lt;B, C&gt; g) {
    <span class="kw">return</span> a -> g.apply(f.apply(a));
}
<span class="cls">Function</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; len  = <span class="cls">String</span>::length;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Boolean</span>&gt; even = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">System</span>.out.println(compose(len, even).apply(<span class="str">"Java"</span>));`,
    options: ["true", "false", "4", "Compilation error"],
    answer: 0,
    explanation: "compose(len, even): String→Integer→Boolean. 'Java'.length()=4. 4%2==0 → true. Result: 'true'."
  },
  {
    id: 895, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="num">15</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(obj) {
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i > <span class="num">20</span>    -> <span class="str">"big"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i > <span class="num">10</span>    -> <span class="str">"medium: "</span> + i;
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i > <span class="num">0</span>     -> <span class="str">"small"</span>;
    <span class="kw">case</span> <span class="cls">String</span>  s               -> <span class="str">"str"</span>;
    <span class="kw">default</span>                       -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["medium: 15", "big", "small", "other"],
    answer: 0,
    explanation: "obj=15 (Integer). Guards in order: 15>20 false, 15>10 true → 'medium: 15'. Result: 'medium: 15'."
  },
  {
    id: 896, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Ratio</span>(<span class="kw">int</span> num, <span class="kw">int</span> den) {
    <span class="kw">static</span> <span class="cls">Ratio</span> of(<span class="kw">int</span> n, <span class="kw">int</span> d) {
        <span class="kw">int</span> g = gcd(<span class="cls">Math</span>.abs(n), <span class="cls">Math</span>.abs(d));
        <span class="kw">return new</span> <span class="cls">Ratio</span>(n/g, d/g);
    }
    <span class="kw">private static int</span> gcd(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> b==<span class="num">0</span>?a:gcd(b,a%b); }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> num + <span class="str">"/"</span> + den; }
}
<span class="cls">System</span>.out.println(<span class="cls">Ratio</span>.of(<span class="num">6</span>, <span class="num">9</span>));`,
    options: ["2/3", "6/9", "1/1", "Compilation error"],
    answer: 0,
    explanation: "gcd(6,9)=3. 6/3=2, 9/3=3. Ratio(2,3). toString()='2/3'. Result: '2/3'."
  },
  {
    id: 897, topic: "Functional",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);
<span class="cls">String</span> r = nums.stream()
    .filter(n -> n % <span class="num">2</span> != <span class="num">0</span>)
    .map(<span class="cls">Object</span>::toString)
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">"-"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["1-3-5", "2-4", "1-2-3-4-5", "135"],
    answer: 0,
    explanation: "filter(odd): [1,3,5]. map(toString): ['1','3','5']. joining('-'): '1-3-5'. Result: '1-3-5'."
  },
  {
    id: 898, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Base</span> {
    <span class="kw">void</span> method(<span class="cls">Object</span> o) { <span class="cls">System</span>.out.print(<span class="str">"Base-Object "</span>); }
    <span class="kw">void</span> method(<span class="cls">String</span> s) { <span class="cls">System</span>.out.print(<span class="str">"Base-String "</span>); }
}
<span class="kw">class</span> <span class="cls">Child</span> <span class="kw">extends</span> <span class="cls">Base</span> {
    <span class="kw">void</span> method(<span class="cls">Object</span> o) { <span class="cls">System</span>.out.print(<span class="str">"Child-Object "</span>); }
}
<span class="cls">Base</span> b = <span class="kw">new</span> <span class="cls">Child</span>();
b.method(<span class="str">"hello"</span>);
b.method((<span class="cls">Object</span>)<span class="str">"hello"</span>);`,
    options: ["Base-String Child-Object ", "Child-Object Child-Object ", "Base-String Base-Object ", "Compilation error"],
    answer: 0,
    explanation: "Overload resolution at compile time by reference type (Base). b.method('hello'): 'hello' is String → Base.method(String) chosen at compile time. At runtime: Child doesn't override method(String), so Base.method(String) runs → 'Base-String '. b.method((Object)'hello'): Object type → Base.method(Object) at compile time. At runtime: Child overrides method(Object) → 'Child-Object '. Result: 'Base-String Child-Object '."
  },
  {
    id: 899, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="cls">Exception</span> e = <span class="kw">new</span> <span class="cls">Exception</span>(<span class="str">"main"</span>);
e.addSuppressed(<span class="kw">new</span> <span class="cls">RuntimeException</span>(<span class="str">"sup1"</span>));
e.addSuppressed(<span class="kw">new</span> <span class="cls">IOException</span>(<span class="str">"sup2"</span>));
<span class="cls">System</span>.out.println(e.getSuppressed().length);
<span class="cls">System</span>.out.println(e.getSuppressed()[<span class="num">0</span>].getMessage());`,
    options: ["2\nsup1", "1\nsup1", "2\nmain", "Compilation error"],
    answer: 0,
    explanation: "addSuppressed() adds suppressed exceptions. getSuppressed() returns the array of suppressed Throwables. Length=2. [0] is the first added: RuntimeException('sup1'). getMessage()='sup1'. Result: '2\\nsup1'."
  },
  {
    id: 900, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,<span class="num">8</span>,<span class="num">9</span>,<span class="num">10</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.minBy(<span class="cls">Integer</span>::compareTo),
        <span class="cls">Collectors</span>.maxBy(<span class="cls">Integer</span>::compareTo),
        (min, max) -> min.orElse(<span class="num">0</span>) + max.orElse(<span class="num">0</span>)
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["11", "55", "1", "10"],
    answer: 0,
    explanation: "teeing: minBy returns Optional(1), maxBy returns Optional(10). Merger: 1+10=11. Result: 11."
  }
];
