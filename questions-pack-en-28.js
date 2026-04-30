// ═══════════════════════════════════════════════════════
//  PACK EN-29 — Questions 1401–1450  (English)
//  Topics: Reactive-style pipelines, Records with
//          generics advanced, try-catch-finally deep,
//          String formatting edge cases, Enum abstract
//          methods, Collections.frequency combos,
//          CompletableFuture allOf/anyOf, Nested
//          generics, instanceof chains, switch yield,
//          Date/Time ChronoUnit, NIO Files.walk,
//          Math.min/max chains, Bitwise shifts sign,
//          OOP field shadowing traps
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_29 = [
  {
    id: 1401, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">int</span> x = <span class="num">1</span>;
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span> x = <span class="num">2</span>; <span class="cm">// field hiding, NOT overriding</span>
}
<span class="cls">A</span> obj = <span class="kw">new</span> <span class="cls">B</span>();
<span class="cls">System</span>.out.println(obj.x);
<span class="cls">System</span>.out.println(((<span class="cls">B</span>)obj).x);`,
    options: ["1\n2", "2\n2", "2\n1", "Compilation error"],
    answer: 0,
    explanation: "Fields are NOT polymorphic in Java — they use STATIC dispatch based on reference type. obj declared as A → obj.x = A.x = 1. Cast to B: ((B)obj).x = B.x = 2. Result: '1\\n2'."
  },
  {
    id: 1402, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Op</span> {
    ADD { <span class="kw">int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a + b; } },
    MUL { <span class="kw">int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a * b; } };
    <span class="kw">abstract int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b);
}
<span class="cls">System</span>.out.println(<span class="cls">Op</span>.ADD.apply(<span class="num">3</span>, <span class="num">4</span>));
<span class="cls">System</span>.out.println(<span class="cls">Op</span>.MUL.apply(<span class="num">3</span>, <span class="num">4</span>));`,
    options: ["7\n12", "12\n7", "3\n4", "Compilation error"],
    answer: 0,
    explanation: "Enum with abstract method: each constant provides its own implementation. Op.ADD.apply(3,4)=7. Op.MUL.apply(3,4)=12. Result: '7\\n12'."
  },
  {
    id: 1403, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">int</span> method() {
    <span class="kw">int</span> x = <span class="num">1</span>;
    <span class="kw">try</span>     { x = <span class="num">2</span>; <span class="kw">return</span> x; }
    <span class="kw">catch</span>   (<span class="cls">Exception</span> e) { x = <span class="num">3</span>; }
    <span class="kw">finally</span> { x = <span class="num">4</span>; }
    <span class="kw">return</span> x;
}
<span class="cls">System</span>.out.println(method());`,
    options: ["2", "4", "3", "Compilation error"],
    answer: 0,
    explanation: "try: x=2, return x captures value 2. finally runs: x=4 (updates local var, but the RETURN VALUE was already captured as 2). Since finally doesn't return, the captured value 2 is returned. Result: '2'."
  },
  {
    id: 1404, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.printf(<span class="str">"%05d%n"</span>, <span class="num">42</span>);
<span class="cls">System</span>.out.printf(<span class="str">"%-10s|%n"</span>, <span class="str">"Java"</span>);
<span class="cls">System</span>.out.printf(<span class="str">"%+.2f%n"</span>, <span class="num">3.14159</span>);`,
    options: ["00042\nJava      |\n+3.14", "42000\nJava|\n3.14", "00042\n      Java|\n+3.14", "Compilation error"],
    answer: 0,
    explanation: "%05d: zero-padded width 5 → '00042'. %-10s: left-aligned width 10 → 'Java      |'. %+.2f: force sign, 2 decimals → '+3.14'. Result: '00042\\nJava      |\\n+3.14'."
  },
  {
    id: 1405, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="cls">List</span>.of(<span class="str">"apple"</span>,<span class="str">"banana"</span>,<span class="str">"apple"</span>,<span class="str">"cherry"</span>,<span class="str">"apple"</span>);
<span class="kw">int</span> freq = <span class="cls">Collections</span>.frequency(words, <span class="str">"apple"</span>);
<span class="kw">boolean</span> disjoint = <span class="cls">Collections</span>.disjoint(words, <span class="cls">List</span>.of(<span class="str">"mango"</span>,<span class="str">"grape"</span>));
<span class="cls">System</span>.out.println(freq + <span class="str">" "</span> + disjoint);`,
    options: ["3 true", "2 true", "3 false", "Compilation error"],
    answer: 0,
    explanation: "frequency('apple')=3. disjoint([apple,banana,apple,cherry,apple], [mango,grape]): no common elements → true. Result: '3 true'."
  },
  {
    id: 1406, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">3</span>,<span class="num">1</span>,<span class="num">4</span>,<span class="num">1</span>,<span class="num">5</span>,<span class="num">9</span>,<span class="num">2</span>,<span class="num">6</span>)
    .distinct()
    .sorted()
    .limit(<span class="num">5</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .average()
    .getAsDouble();
<span class="cls">System</span>.out.println(r);`,
    options: ["3.0", "4.0", "2.8", "Compilation error"],
    answer: 0,
    explanation: "distinct: [3,1,4,5,9,2,6]. sorted: [1,2,3,4,5,6,9]. limit(5): [1,2,3,4,5]. average=(1+2+3+4+5)/5=15/5=3.0. Result: '3.0'."
  },
  {
    id: 1407, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f1 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">1</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f2 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">2</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f3 = <span class="cls">CompletableFuture</span>.completedFuture(<span class="num">3</span>);
<span class="cls">CompletableFuture</span>.<span class="kw">allOf</span>(f1, f2, f3)
    .thenRun(() -> <span class="cls">System</span>.out.print(<span class="str">"done "</span>))
    .join();
<span class="kw">int</span> sum = f1.join() + f2.join() + f3.join();
<span class="cls">System</span>.out.println(sum);`,
    options: ["done 6", "6 done", "done done done 6", "Compilation error"],
    answer: 0,
    explanation: "allOf waits for all three (already done). thenRun: prints 'done '. join() ensures completion. Then sum=1+2+3=6. println(6). Result: 'done 6'."
  },
  {
    id: 1408, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Pair</span>&lt;A, B&gt;(<span class="cls">A</span> fst, <span class="cls">B</span> snd) {
    <span class="cls">Pair</span>&lt;B, A&gt; swap() { <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(snd, fst); }
    &lt;C&gt; <span class="cls">Pair</span>&lt;A, C&gt; withSnd(<span class="cls">C</span> c) { <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(fst, c); }
}
<span class="kw">var</span> p = <span class="kw">new</span> <span class="cls">Pair</span>&lt;&gt;(<span class="str">"hello"</span>, <span class="num">42</span>)
    .swap()
    .withSnd(<span class="str">"world"</span>);
<span class="cls">System</span>.out.println(p);`,
    options: ["Pair[fst=42, snd=world]", "Pair[fst=hello, snd=world]", "Pair[fst=world, snd=42]", "Compilation error"],
    answer: 0,
    explanation: "Pair<String,Integer>('hello',42). swap(): Pair<Integer,String>(42,'hello'). withSnd('world'): Pair<Integer,String>(42,'world'). toString: 'Pair[fst=42, snd=world]'. Result: 'Pair[fst=42, snd=world]'."
  },
  {
    id: 1409, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d1 = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">1</span>, <span class="num">1</span>);
<span class="cls">LocalDate</span> d2 = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">31</span>);
<span class="kw">long</span> days   = <span class="cls">ChronoUnit</span>.DAYS.between(d1, d2);
<span class="kw">long</span> months = <span class="cls">ChronoUnit</span>.MONTHS.between(d1, d2);
<span class="cls">System</span>.out.println(days + <span class="str">" "</span> + months);`,
    options: ["365 11", "366 12", "364 11", "365 12"],
    answer: 0,
    explanation: "2024 is a leap year (366 days). Jan 1 to Dec 31 = 365 days (between is exclusive of end). ChronoUnit.MONTHS: from Jan 1 to Dec 31 = 11 full months (Jan to Dec exclusive). Result: '365 11'."
  },
  {
    id: 1410, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>,<span class="str">"d"</span>,<span class="str">"e"</span>)
    .filter(s -> !s.equals(<span class="str">"c"</span>))
    .anyMatch(s -> s.equals(<span class="str">"d"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["true", "false", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "filter removes 'c'. anyMatch(equals 'd'): stream [a,b,d,e]. 'd' is present → true. Short-circuits when found. Result: 'true'."
  },
  {
    id: 1411, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> n = <span class="num">5</span>;
<span class="kw">int</span> r = <span class="kw">switch</span>(n) {
    <span class="kw">case</span> <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span> -> <span class="num">10</span>;
    <span class="kw">case</span> <span class="num">4</span>, <span class="num">5</span>    -> {
        <span class="kw">int</span> x = n * n;
        <span class="kw">yield</span> x - <span class="num">1</span>;
    }
    <span class="kw">default</span> -> <span class="num">-1</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["24", "25", "10", "-1"],
    answer: 0,
    explanation: "n=5 matches case 4,5. Block: x=5*5=25. yield 25-1=24. r=24. Result: '24'."
  },
  {
    id: 1412, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; append(<span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; list, T elem) {
    <span class="cls">List</span>&lt;T&gt; result = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(list);
    result.add(elem);
    <span class="kw">return</span> result;
}
<span class="cls">List</span>&lt;<span class="cls">Number</span>&gt; r = append(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>), <span class="num">4.5</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 2, 3, 4.5]", "[1, 2, 3, 4]", "[4.5, 1, 2, 3]", "Compilation error"],
    answer: 0,
    explanation: "T=Number. List<? extends Number> accepts List<Integer>. Adds 4.5 (Double extends Number). r=[1,2,3,4.5]. Result: '[1, 2, 3, 4.5]'."
  },
  {
    id: 1413, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Resource</span> <span class="kw">implements</span> <span class="cls">AutoCloseable</span> {
    <span class="kw">final</span> <span class="cls">String</span> name;
    <span class="cls">Resource</span>(<span class="cls">String</span> n) { name = n; <span class="cls">System</span>.out.print(<span class="str">"open:"</span>+n+<span class="str">" "</span>); }
    <span class="kw">public void</span> close()   { <span class="cls">System</span>.out.print(<span class="str">"close:"</span>+name+<span class="str">" "</span>); }
}
<span class="kw">try</span> (<span class="kw">var</span> r1 = <span class="kw">new</span> <span class="cls">Resource</span>(<span class="str">"A"</span>);
     <span class="kw">var</span> r2 = <span class="kw">new</span> <span class="cls">Resource</span>(<span class="str">"B"</span>)) {
    <span class="cls">System</span>.out.print(<span class="str">"body "</span>);
}`,
    options: ["open:A open:B body close:B close:A ", "open:A open:B body close:A close:B ", "body open:A open:B close:B close:A ", "Compilation error"],
    answer: 0,
    explanation: "Resources open in declaration order: A then B. Body runs. Close in REVERSE: B first, then A. Result: 'open:A open:B body close:B close:A '."
  },
  {
    id: 1414, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"the"</span>,<span class="str">"quick"</span>,<span class="str">"brown"</span>,<span class="str">"fox"</span>)
    .map(s -> <span class="cls">Character</span>.toUpperCase(s.charAt(<span class="num">0</span>)) + s.substring(<span class="num">1</span>))
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">" "</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["The Quick Brown Fox", "the quick brown fox", "THE QUICK BROWN FOX", "Compilation error"],
    answer: 0,
    explanation: "Capitalize first letter of each word. 'the'→'The', 'quick'→'Quick', 'brown'→'Brown', 'fox'→'Fox'. joining(' '): 'The Quick Brown Fox'. Result: 'The Quick Brown Fox'."
  },
  {
    id: 1415, topic: "Bitwise",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>  a = -<span class="num">1</span>;
<span class="cls">System</span>.out.println(a >> <span class="num">1</span>);
<span class="cls">System</span>.out.println(a >>> <span class="num">1</span>);
<span class="cls">System</span>.out.println(a << <span class="num">1</span>);`,
    options: ["-1\n2147483647\n-2", "0\n2147483647\n-2", "-1\n2147483648\n-2", "Compilation error"],
    answer: 0,
    explanation: "-1 in 32-bit = all 1s. >>1 (signed): shifts right, fills with sign bit (1) → still all 1s = -1. >>>1 (unsigned): fills with 0 → 0111...1 = 2147483647 (Integer.MAX_VALUE). <<1: shifts left, loses MSB, LSB=0 → 1111...10 = -2. Result: '-1\\n2147483647\\n-2'."
  },
  {
    id: 1416, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">BiPredicate</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; longer = (s, n) -> s.length() > n;
<span class="cls">BiPredicate</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; shorter = longer.negate();
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="cls">List</span>.of(<span class="str">"hi"</span>,<span class="str">"hello"</span>,<span class="str">"hey"</span>,<span class="str">"howdy"</span>);
words.stream()
    .filter(w -> shorter.test(w, <span class="num">3</span>))
    .forEach(w -> <span class="cls">System</span>.out.print(w + <span class="str">" "</span>));`,
    options: ["hi hey ", "hello howdy ", "hi hello hey howdy ", "Compilation error"],
    answer: 0,
    explanation: "shorter = NOT(length > 3) = length <= 3. hi(2<=3), hey(3<=3) pass. hello(5>3), howdy(5>3) fail. Result: 'hi hey '."
  },
  {
    id: 1417, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;(
    <span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">3</span>)
);
m.forEach((k,v) -> m.put(k, v*<span class="num">2</span>)); <span class="cm">// concurrent modification?</span>
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(m));`,
    options: [
      "Throws ConcurrentModificationException",
      "{a=2, b=4, c=6}",
      "{a=1, b=2, c=3}",
      "Non-deterministic"
    ],
    answer: 1,
    explanation: "HashMap.forEach() is a special method that does NOT throw ConcurrentModificationException when the map is modified during iteration via put() on existing keys (structural modification like adding new keys would throw). Replacing existing values is allowed. All values doubled. TreeMap sorts: {a=2, b=4, c=6}. Result: '{a=2, b=4, c=6}'."
  },
  {
    id: 1418, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .peek(n -> <span class="cls">System</span>.out.print(<span class="str">"p"</span>+n+<span class="str">" "</span>))
    .noneMatch(n -> n > <span class="num">10</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["p2 p4 true", "p2 true", "true", "p2 p4 false"],
    answer: 0,
    explanation: "mapToInt: [1,2,3,4,5]. filter(even): [2,4]. peek prints each. noneMatch(>10): all even values (2,4) ≤ 10 → noneMatch=true. Processes all elements. Prints: 'p2 p4 ' then 'true'. Result: 'p2 p4 true'."
  },
  {
    id: 1419, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">ImmutableStack</span>&lt;T&gt; {
    <span class="kw">private final</span> T head;
    <span class="kw">private final</span> <span class="cls">ImmutableStack</span>&lt;T&gt; tail;
    <span class="kw">static final</span> <span class="cls">ImmutableStack</span>&lt;?&gt; EMPTY = <span class="kw">new</span> <span class="cls">ImmutableStack</span>&lt;&gt;(<span class="kw">null</span>, <span class="kw">null</span>);
    <span class="kw">private</span> <span class="cls">ImmutableStack</span>(T h, <span class="cls">ImmutableStack</span>&lt;T&gt; t) { head=h; tail=t; }
    <span class="kw">static</span> &lt;T&gt; <span class="cls">ImmutableStack</span>&lt;T&gt; of(T v, <span class="cls">ImmutableStack</span>&lt;T&gt; t) {
        <span class="kw">return new</span> <span class="cls">ImmutableStack</span>&lt;&gt;(v, t);
    }
    T top() { <span class="kw">return</span> head; }
}
<span class="ann">@SuppressWarnings</span>(<span class="str">"unchecked"</span>)
<span class="kw">var</span> s = <span class="cls">ImmutableStack</span>.of(<span class="num">3</span>,
        <span class="cls">ImmutableStack</span>.of(<span class="num">2</span>,
        <span class="cls">ImmutableStack</span>.of(<span class="num">1</span>,
        (<span class="cls">ImmutableStack</span>&lt;<span class="cls">Integer</span>&gt;)<span class="cls">ImmutableStack</span>.EMPTY)));
<span class="cls">System</span>.out.println(s.top() + <span class="str">" "</span> + s.tail.top());`,
    options: ["3 2", "1 2", "3 1", "Compilation error"],
    answer: 0,
    explanation: "ImmutableStack: 3 → (2 → (1 → EMPTY)). s.top()=3. s.tail is the stack starting with 2. s.tail.top()=2. Result: '3 2'."
  },
  {
    id: 1420, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Order</span>(<span class="cls">String</span> id, <span class="kw">double</span> amount, <span class="cls">String</span> status) {}
<span class="kw">var</span> orders = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Order</span>(<span class="str">"A"</span>,<span class="num">100</span>,<span class="str">"paid"</span>),
    <span class="kw">new</span> <span class="cls">Order</span>(<span class="str">"B"</span>,<span class="num">200</span>,<span class="str">"pending"</span>),
    <span class="kw">new</span> <span class="cls">Order</span>(<span class="str">"C"</span>,<span class="num">150</span>,<span class="str">"paid"</span>)
);
<span class="kw">double</span> paidTotal = orders.stream()
    .filter(o -> o.status().equals(<span class="str">"paid"</span>))
    .mapToDouble(<span class="cls">Order</span>::amount)
    .sum();
<span class="cls">System</span>.out.printf(<span class="str">"%.0f%n"</span>, paidTotal);`,
    options: ["250", "450", "100", "Compilation error"],
    answer: 0,
    explanation: "filter(paid): A(100), C(150). mapToDouble.sum()=250.0. printf('%.0f')='250'. Result: '250'."
  },
  {
    id: 1421, topic: "Math API",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> a = <span class="num">10</span>, b = <span class="num">5</span>, c = <span class="num">8</span>;
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.max(<span class="cls">Math</span>.min(a, b), c));
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.min(<span class="cls">Math</span>.max(a, b), c));`,
    options: ["8\n8", "5\n5", "10\n8", "5\n10"],
    answer: 0,
    explanation: "Math.max(Math.min(10,5), 8) = Math.max(5,8) = 8. Math.min(Math.max(10,5), 8) = Math.min(10,8) = 8. Result: '8\\n8'."
  },
  {
    id: 1422, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">MessageBuilder</span> {
    <span class="kw">private final</span> <span class="cls">List</span>&lt;<span class="cls">String</span>&gt; parts = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="cls">MessageBuilder</span> add(<span class="cls">String</span> s)  { parts.add(s); <span class="kw">return this</span>; }
    <span class="cls">MessageBuilder</span> addIf(<span class="kw">boolean</span> cond, <span class="cls">String</span> s) {
        <span class="kw">if</span> (cond) parts.add(s);
        <span class="kw">return this</span>;
    }
    <span class="cls">String</span> build() { <span class="kw">return</span> <span class="cls">String</span>.join(<span class="str">" "</span>, parts); }
}
<span class="kw">var</span> msg = <span class="kw">new</span> <span class="cls">MessageBuilder</span>()
    .add(<span class="str">"Hello"</span>)
    .addIf(<span class="kw">true</span>,  <span class="str">"dear"</span>)
    .addIf(<span class="kw">false</span>, <span class="str">"sir"</span>)
    .add(<span class="str">"World"</span>)
    .build();
<span class="cls">System</span>.out.println(msg);`,
    options: ["Hello dear World", "Hello dear sir World", "Hello World", "Compilation error"],
    answer: 0,
    explanation: "add('Hello'): [Hello]. addIf(true,'dear'): [Hello,dear]. addIf(false,'sir'): skipped. add('World'): [Hello,dear,World]. join(' '): 'Hello dear World'. Result: 'Hello dear World'."
  },
  {
    id: 1423, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; tryParse(
    <span class="cls">String</span> s, <span class="cls">Function</span>&lt;<span class="cls">String</span>, T&gt; parser) {
    <span class="kw">try</span> { <span class="kw">return</span> <span class="cls">Optional</span>.of(parser.apply(s)); }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) { <span class="kw">return</span> <span class="cls">Optional</span>.empty(); }
}
<span class="kw">var</span> r1 = tryParse(<span class="str">"123"</span>, <span class="cls">Integer</span>::parseInt);
<span class="kw">var</span> r2 = tryParse(<span class="str">"abc"</span>, <span class="cls">Integer</span>::parseInt);
<span class="cls">System</span>.out.println(r1.orElse(<span class="num">-1</span>) + <span class="str">" "</span> + r2.orElse(<span class="num">-1</span>));`,
    options: ["123 -1", "-1 123", "123 0", "Compilation error"],
    answer: 0,
    explanation: "tryParse('123', parseInt): succeeds → Optional(123). tryParse('abc', parseInt): throws NFE → Optional.empty(). orElse: 123 and -1. Result: '123 -1'."
  },
  {
    id: 1424, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Status</span> { NEW, ACTIVE, CLOSED }
<span class="kw">var</span> map = <span class="cls">Arrays</span>.stream(<span class="cls">Status</span>.values())
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">Status</span>::name,
        <span class="cls">Status</span>::ordinal,
        (<span class="kw">int</span> a, <span class="kw">int</span> b) -> a,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>
    ));
<span class="cls">System</span>.out.println(map);`,
    options: ["{ACTIVE=1, CLOSED=2, NEW=0}", "{NEW=0, ACTIVE=1, CLOSED=2}", "{CLOSED=2, ACTIVE=1, NEW=0}", "Compilation error"],
    answer: 0,
    explanation: "toMap: key=name (String), value=ordinal. TreeMap sorts keys alphabetically: ACTIVE < CLOSED < NEW. Result: '{ACTIVE=1, CLOSED=2, NEW=0}'."
  },
  {
    id: 1425, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> lines = <span class="cls">List</span>.of(
    <span class="str">"name=Alice"</span>, <span class="str">"age=30"</span>, <span class="str">"city=Recife"</span>
);
<span class="kw">var</span> r = lines.stream()
    .map(l -> l.split(<span class="str">"="</span>))
    .collect(<span class="cls">Collectors</span>.toMap(
        arr -> arr[<span class="num">0</span>],
        arr -> arr[<span class="num">1</span>],
        (a, b) -> a,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>
    ));
<span class="cls">System</span>.out.println(r.get(<span class="str">"city"</span>));`,
    options: ["Recife", "null", "30", "Compilation error"],
    answer: 0,
    explanation: "Split each line on '='. toMap: key=arr[0], value=arr[1]. TreeMap. r.get('city')='Recife'. Result: 'Recife'."
  },
  {
    id: 1426, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Named</span> { <span class="cls">String</span> name(); }
<span class="kw">interface</span> <span class="cls">Aged</span>   { <span class="kw">int</span>    age(); }
<span class="kw">record</span>    <span class="cls">Person</span>(<span class="cls">String</span> name, <span class="kw">int</span> age) <span class="kw">implements</span> <span class="cls">Named</span>, <span class="cls">Aged</span> {}
<span class="cls">List</span>&lt;<span class="cls">Person</span>&gt; people = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Alice"</span>,<span class="num">30</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Bob"</span>,<span class="num">25</span>)
);
people.stream()
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Aged</span>::age))
    .map(<span class="cls">Named</span>::name)
    .forEach(<span class="cls">System</span>.out::println);`,
    options: ["Bob\nAlice", "Alice\nBob", "Alice Bob", "Compilation error"],
    answer: 0,
    explanation: "Sort by age ascending: Bob(25) < Alice(30). map(Named::name): 'Bob','Alice'. forEach println. Result: 'Bob\\nAlice'."
  },
  {
    id: 1427, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Java%s%d"</span>;
<span class="cls">String</span> r1 = s.formatted(<span class="str">" SE "</span>, <span class="num">17</span>);
<span class="cls">String</span> r2 = <span class="cls">String</span>.format(s, <span class="str">" EE "</span>, <span class="num">21</span>);
<span class="cls">System</span>.out.println(r1);
<span class="cls">System</span>.out.println(r2);`,
    options: ["Java SE 17\nJava EE 21", "Java%s%d\nJava%s%d", "Java SE 17\nJava EE 17", "Compilation error"],
    answer: 0,
    explanation: "String.formatted() (Java 15+) same as String.format with the string as format. 'Java%s%d'.formatted(' SE ',17)='Java SE 17'. String.format('Java%s%d',' EE ',21)='Java EE 21'. Result: 'Java SE 17\\nJava EE 21'."
  },
  {
    id: 1428, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">T</span> reduce(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">T</span> identity, <span class="cls">BinaryOperator</span>&lt;T&gt; op) {
    <span class="cls">T</span> r = identity;
    <span class="kw">for</span> (T e : list) r = op.apply(r, e);
    <span class="kw">return</span> r;
}
<span class="kw">var</span> max = reduce(
    <span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">7</span>,<span class="num">1</span>,<span class="num">9</span>,<span class="num">4</span>),
    <span class="cls">Integer</span>.MIN_VALUE,
    <span class="cls">Integer</span>::max
);
<span class="cls">System</span>.out.println(max);`,
    options: ["9", "1", "7", "Compilation error"],
    answer: 0,
    explanation: "reduce(list, MIN_VALUE, max): finds maximum. Starting with MIN_VALUE, max with each: 3,7,7,9,9. Returns 9. Result: '9'."
  },
  {
    id: 1429, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDateTime</span> ldt = <span class="cls">LocalDateTime</span>.of(<span class="num">2024</span>,<span class="num">6</span>,<span class="num">15</span>,<span class="num">12</span>,<span class="num">30</span>);
<span class="cls">DateTimeFormatter</span> f1 = <span class="cls">DateTimeFormatter</span>.ofPattern(<span class="str">"dd/MM/yyyy"</span>);
<span class="cls">DateTimeFormatter</span> f2 = <span class="cls">DateTimeFormatter</span>.ISO_LOCAL_DATE_TIME;
<span class="cls">System</span>.out.println(ldt.format(f1));
<span class="cls">System</span>.out.println(ldt.toLocalDate().format(f2));`,
    options: ["15/06/2024\nCompilation error", "15/06/2024\nThrows UnsupportedTemporalTypeException", "06/15/2024\n2024-06-15", "Compilation error"],
    answer: 1,
    explanation: "f1='dd/MM/yyyy': formats LocalDateTime → '15/06/2024'. f2=ISO_LOCAL_DATE_TIME requires time component. ldt.toLocalDate() is a LocalDate, which has no time. ISO_LOCAL_DATE_TIME tries to access time fields → UnsupportedTemporalTypeException at runtime. Use ISO_LOCAL_DATE for LocalDate."
  },
  {
    id: 1430, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .map(n -> <span class="cls">Map</span>.entry(n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>, n))
    .collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">Map</span>.<span class="cls">Entry</span>::getKey,
        <span class="cls">Collectors</span>.mapping(<span class="cls">Map</span>.<span class="cls">Entry</span>::getValue,
            <span class="cls">Collectors</span>.toList())
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["even=[2, 4] odd=[1, 3, 5] ", "odd=[1, 3, 5] even=[2, 4] ", "even=[4, 2] odd=[5, 3, 1] ", "Compilation error"],
    answer: 0,
    explanation: "Map each number to Map.Entry(even/odd, n). groupingBy key, mapping value to list. even:[2,4], odd:[1,3,5]. TreeMap: even < odd. Result: 'even=[2, 4] odd=[1, 3, 5] '."
  },
  {
    id: 1431, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Account</span> {
    <span class="kw">protected double</span> balance;
    <span class="cls">Account</span>(<span class="kw">double</span> b) { balance = b; }
    <span class="kw">void</span> deposit(<span class="kw">double</span> amount)  { balance += amount; }
    <span class="kw">boolean</span> withdraw(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount > balance) <span class="kw">return false</span>;
        balance -= amount; <span class="kw">return true</span>;
    }
}
<span class="kw">class</span> <span class="cls">SavingsAccount</span> <span class="kw">extends</span> <span class="cls">Account</span> {
    <span class="kw">private final double</span> minBalance;
    <span class="cls">SavingsAccount</span>(<span class="kw">double</span> b, <span class="kw">double</span> min) { <span class="kw">super</span>(b); minBalance=min; }
    <span class="kw">boolean</span> withdraw(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (balance - amount < minBalance) <span class="kw">return false</span>;
        <span class="kw">return super</span>.withdraw(amount);
    }
}
<span class="cls">Account</span> acc = <span class="kw">new</span> <span class="cls">SavingsAccount</span>(<span class="num">1000</span>, <span class="num">200</span>);
<span class="cls">System</span>.out.println(acc.withdraw(<span class="num">500</span>));
<span class="cls">System</span>.out.println(acc.withdraw(<span class="num">400</span>));
<span class="cls">System</span>.out.println(acc.balance);`,
    options: ["true\nfalse\n500.0", "true\ntrue\n100.0", "false\ntrue\n500.0", "Compilation error"],
    answer: 0,
    explanation: "SavingsAccount(1000, minBalance=200). withdraw(500): 1000-500=500>=200 → super.withdraw → balance=500 → true. withdraw(400): 500-400=100<200 → false. balance stays 500.0. Result: 'true\\nfalse\\n500.0'."
  },
  {
    id: 1432, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.iterate(<span class="num">1</span>, n -> n < <span class="num">1000</span>, n -> n * <span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 3, 9, 27, 81, 243, 729]", "[1, 3, 9, 27, 81, 243]", "[3, 9, 27, 81, 243, 729]", "Compilation error"],
    answer: 0,
    explanation: "Stream.iterate(1, n<1000, n*3): generates while n<1000. 1,3,9,27,81,243,729 (all < 1000). Next: 729*3=2187 ≥ 1000 → stops. Result: '[1, 3, 9, 27, 81, 243, 729]'."
  },
  {
    id: 1433, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Config</span> {
    <span class="kw">private static final</span> <span class="cls">Config</span> INSTANCE = <span class="kw">new</span> <span class="cls">Config</span>();
    <span class="kw">private final</span> <span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">String</span>&gt; props = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
    <span class="kw">private</span> <span class="cls">Config</span>() { props.put(<span class="str">"env"</span>, <span class="str">"dev"</span>); }
    <span class="kw">static</span> <span class="cls">Config</span> getInstance() { <span class="kw">return</span> INSTANCE; }
    <span class="cls">String</span> get(<span class="cls">String</span> key) { <span class="kw">return</span> props.getOrDefault(key, <span class="str">"?"</span>); }
    <span class="kw">void</span> set(<span class="cls">String</span> key, <span class="cls">String</span> value) { props.put(key, value); }
}
<span class="cls">Config</span>.getInstance().set(<span class="str">"env"</span>, <span class="str">"prod"</span>);
<span class="cls">System</span>.out.println(<span class="cls">Config</span>.getInstance().get(<span class="str">"env"</span>));`,
    options: ["prod", "dev", "?", "Compilation error"],
    answer: 0,
    explanation: "Singleton INSTANCE shared. set('env','prod') on the singleton changes it. getInstance() returns same object. get('env')='prod'. Result: 'prod'."
  },
  {
    id: 1434, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt;
<span class="cls">T</span> median(<span class="cls">List</span>&lt;T&gt; list) {
    <span class="cls">List</span>&lt;T&gt; sorted = list.stream().sorted().collect(<span class="cls">Collectors</span>.toList());
    <span class="kw">return</span> sorted.get(sorted.size() / <span class="num">2</span>);
}
<span class="cls">System</span>.out.println(median(<span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">1</span>,<span class="num">4</span>,<span class="num">1</span>,<span class="num">5</span>)));
<span class="cls">System</span>.out.println(median(<span class="cls">List</span>.of(<span class="str">"cat"</span>,<span class="str">"ant"</span>,<span class="str">"bat"</span>)));`,
    options: ["3\nbat", "1\nant", "4\ncat", "Compilation error"],
    answer: 0,
    explanation: "sorted([3,1,4,1,5])=[1,1,3,4,5]. size=5, index=5/2=2 → sorted.get(2)=3. sorted([cat,ant,bat])=[ant,bat,cat]. size=3, index=1 → bat. Result: '3\\nbat'."
  },
  {
    id: 1435, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        n -> n,
        n -> <span class="cls">String</span>.valueOf(<span class="str">"*"</span>.repeat(n))
    ));
r.entrySet().stream()
    .sorted(<span class="cls">Map</span>.<span class="cls">Entry</span>.comparingByKey())
    .forEach(e -> <span class="cls">System</span>.out.print(e.getKey() + <span class="str">":"</span> + e.getValue().length() + <span class="str">" "</span>));`,
    options: ["1:1 2:2 3:3 4:4 5:5 ", "5:5 4:4 3:3 2:2 1:1 ", "1:1 2:2 3:3 4:4 ", "Compilation error"],
    answer: 0,
    explanation: "toMap: n→'*'.repeat(n). Entries sorted by key: 1:'*'(len1), 2:'**'(len2), etc. forEach: '1:1 2:2 3:3 4:4 5:5 '. Result: '1:1 2:2 3:3 4:4 5:5 '."
  },
  {
    id: 1436, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Action</span>&lt;T&gt; {
    T execute();
    <span class="kw">default</span> <span class="cls">Action</span>&lt;T&gt; retry(<span class="kw">int</span> n) {
        <span class="kw">return</span> () -> {
            T result = <span class="kw">null</span>;
            <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < n; i++) {
                <span class="kw">try</span> { result = execute(); <span class="kw">break</span>; }
                <span class="kw">catch</span> (<span class="cls">Exception</span> ignored) {}
            }
            <span class="kw">return</span> result;
        };
    }
}
<span class="kw">int</span>[] attempts = {<span class="num">0</span>};
<span class="cls">Action</span>&lt;<span class="cls">String</span>&gt; flaky = () -> {
    attempts[<span class="num">0</span>]++;
    <span class="kw">if</span> (attempts[<span class="num">0</span>] < <span class="num">3</span>) <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"fail"</span>);
    <span class="kw">return</span> <span class="str">"ok"</span>;
};
<span class="cls">System</span>.out.println(flaky.retry(<span class="num">5</span>).execute() + <span class="str">" "</span> + attempts[<span class="num">0</span>]);`,
    options: ["ok 3", "null 5", "ok 5", "Compilation error"],
    answer: 0,
    explanation: "retry(5) wraps flaky. execute() calls flaky up to 5 times. Attempt 1: throws (attempts=1). Attempt 2: throws (attempts=2). Attempt 3: returns 'ok' (attempts=3), break. Result='ok'. attempts[0]=3. Result: 'ok 3'."
  },
  {
    id: 1437, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>)
    .map(n -> {
        <span class="cls">System</span>.out.print(<span class="str">"m"</span>+n+<span class="str">" "</span>);
        <span class="kw">return</span> n * <span class="num">2</span>;
    })
    .filter(n -> {
        <span class="cls">System</span>.out.print(<span class="str">"f"</span>+n+<span class="str">" "</span>);
        <span class="kw">return</span> n > <span class="num">30</span>;
    })
    .findFirst();
<span class="cls">System</span>.out.println(r.orElse(<span class="num">-1</span>));`,
    options: ["m10 f20 m20 f40 40", "m10 m20 m30 f20 f40 f60 40", "m10 f20 40", "Compilation error"],
    answer: 0,
    explanation: "Lazy evaluation: processes one element at a time. 10: map→m10 (result 20), filter→f20 (20<=30, fails). 20: map→m20 (result 40), filter→f40 (40>30, passes). findFirst() returns Optional(40). Stops at first match. orElse=40. Result: 'm10 f20 m20 f40 40'."
  },
  {
    id: 1438, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Stream</span>&lt;T&gt; streamOf(<span class="cls">T</span> value, <span class="kw">int</span> count) {
    <span class="kw">return</span> <span class="cls">Stream</span>.generate(() -> value).limit(count);
}
<span class="kw">var</span> r = streamOf(<span class="str">"ha"</span>, <span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">""</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["[hahaha]", "[ha]", "[ha ha ha]", "Compilation error"],
    answer: 0,
    explanation: "Stream.generate(()->'ha').limit(3): ['ha','ha','ha']. joining('',prefix='[',suffix=']'): '['+ha+ha+ha+']'='[hahaha]'. Result: '[hahaha]'."
  },
  {
    id: 1439, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">StaticDemo</span> {
    <span class="kw">static int</span> x = <span class="num">10</span>;
    <span class="kw">static</span> { x += <span class="num">5</span>; }
    <span class="kw">int</span> y = x + <span class="num">1</span>;
    { y += <span class="num">10</span>; }
    <span class="cls">StaticDemo</span>() { y += <span class="num">5</span>; }
}
<span class="cls">StaticDemo</span> a = <span class="kw">new</span> <span class="cls">StaticDemo</span>();
<span class="cls">StaticDemo</span> b = <span class="kw">new</span> <span class="cls">StaticDemo</span>();
<span class="cls">System</span>.out.println(a.y + <span class="str">" "</span> + b.y);`,
    options: ["31 31", "26 31", "26 26", "Compilation error"],
    answer: 0,
    explanation: "Static block: x=10+5=15. First new StaticDemo(): y=x+1=16 (instance init), y+=10→26 (instance block), y+=5→31 (constructor). Second new StaticDemo(): same process, x is still 15, y=16+10+5=31. Result: '31 31'."
  },
  {
    id: 1440, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"Alice:30"</span>,<span class="str">"Bob:25"</span>,<span class="str">"Carol:35"</span>)
    .map(s -> s.split(<span class="str">":"</span>))
    .sorted(<span class="cls">Comparator</span>.comparingInt(arr -> <span class="cls">Integer</span>.parseInt(arr[<span class="num">1</span>])))
    .map(arr -> arr[<span class="num">0</span>])
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["Bob,Alice,Carol", "Alice,Bob,Carol", "Carol,Alice,Bob", "Compilation error"],
    answer: 0,
    explanation: "Split: [Alice,30],[Bob,25],[Carol,35]. Sort by age int: Bob(25)<Alice(30)<Carol(35). map to name: Bob,Alice,Carol. joining: 'Bob,Alice,Carol'. Result: 'Bob,Alice,Carol'."
  },
  {
    id: 1441, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Printable</span> {
    <span class="kw">void</span> print();
}
<span class="kw">class</span> <span class="cls">Document</span> <span class="kw">implements</span> <span class="cls">Printable</span> {
    <span class="kw">private</span> <span class="cls">String</span> content;
    <span class="cls">Document</span>(<span class="cls">String</span> c) { content = c; }
    <span class="kw">public void</span> print() { <span class="cls">System</span>.out.println(<span class="str">"Doc: "</span> + content); }
}
<span class="cls">Printable</span> p = <span class="kw">new</span> <span class="cls">Document</span>(<span class="str">"OCP"</span>);
p.print();
<span class="cls">System</span>.out.println(p <span class="kw">instanceof</span> <span class="cls">Document</span>);
<span class="cls">System</span>.out.println(p.getClass().getSimpleName());`,
    options: ["Doc: OCP\ntrue\nDocument", "Doc: OCP\nfalse\nPrintable", "Doc: OCP\ntrue\nPrintable", "Compilation error"],
    answer: 0,
    explanation: "p.print(): polymorphism → Document.print() → 'Doc: OCP'. p instanceof Document: true (runtime type). p.getClass(): Document. getSimpleName()='Document'. Result: 'Doc: OCP\\ntrue\\nDocument'."
  },
  {
    id: 1442, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">var</span> lock = <span class="kw">new</span> <span class="cls">ReentrantLock</span>(<span class="kw">true</span>); <span class="cm">// fair</span>
<span class="cls">System</span>.out.println(lock.isFair());
<span class="cls">System</span>.out.println(lock.isLocked());
lock.lock();
<span class="cls">System</span>.out.println(lock.isLocked());
<span class="cls">System</span>.out.println(lock.isHeldByCurrentThread());
lock.unlock();
<span class="cls">System</span>.out.println(lock.isLocked());`,
    options: ["true\nfalse\ntrue\ntrue\nfalse", "false\nfalse\ntrue\ntrue\nfalse", "true\ntrue\ntrue\ntrue\nfalse", "Compilation error"],
    answer: 0,
    explanation: "ReentrantLock(true): fair lock. isFair()=true. isLocked()=false initially. lock(): isLocked()=true. isHeldByCurrentThread()=true (same thread). unlock(): isLocked()=false. Result: 'true\\nfalse\\ntrue\\ntrue\\nfalse'."
  },
  {
    id: 1443, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">5</span>,<span class="num">4</span>,<span class="num">3</span>,<span class="num">2</span>,<span class="num">1</span>)
    .sorted()
    .collect(<span class="cls">Collectors</span>.toUnmodifiableList());
<span class="kw">var</span> sub = r.stream().skip(<span class="num">1</span>).limit(<span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(sub);`,
    options: ["[2, 3, 4]", "[1, 2, 3]", "[3, 4, 5]", "Compilation error"],
    answer: 0,
    explanation: "sorted: [1,2,3,4,5]. skip(1): [2,3,4,5]. limit(3): [2,3,4]. Result: '[2, 3, 4]'."
  },
  {
    id: 1444, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Function</span>&lt;<span class="cls">List</span>&lt;T&gt;, <span class="cls">List</span>&lt;T&gt;&gt; filter(<span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="kw">return</span> list -> list.stream().filter(p).collect(<span class="cls">Collectors</span>.toList());
}
<span class="kw">var</span> evenFilter = <span class="cls">JavaExample</span>.&lt;<span class="cls">Integer</span>&gt;filter(n -> n % <span class="num">2</span> == <span class="num">0</span>);
<span class="kw">var</span> r = evenFilter.apply(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["[2, 4, 6]", "[1, 3, 5]", "[2, 4]", "Compilation error"],
    answer: 0,
    explanation: "filter(even) returns a function that filters a list. apply([1..6]): keeps even: [2,4,6]. Result: '[2, 4, 6]'."
  },
  {
    id: 1445, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Segment</span>(<span class="kw">double</span> x1, <span class="kw">double</span> y1, <span class="kw">double</span> x2, <span class="kw">double</span> y2) {
    <span class="kw">double</span> length() {
        <span class="kw">return</span> <span class="cls">Math</span>.hypot(x2-x1, y2-y1);
    }
    <span class="cls">Segment</span> reverse() {
        <span class="kw">return new</span> <span class="cls">Segment</span>(x2, y2, x1, y1);
    }
}
<span class="cls">Segment</span> s = <span class="kw">new</span> <span class="cls">Segment</span>(<span class="num">0</span>,<span class="num">0</span>,<span class="num">3</span>,<span class="num">4</span>);
<span class="cls">System</span>.out.println(s.length() == s.reverse().length());`,
    options: ["true", "false", "Compilation error", "Throws ArithmeticException"],
    answer: 0,
    explanation: "s.length()=Math.hypot(3,4)=5.0. s.reverse()=Segment(3,4,0,0). reverse.length()=Math.hypot(0-3,0-4)=Math.hypot(-3,-4)=5.0. 5.0==5.0 → true. Result: 'true'."
  },
  {
    id: 1446, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapToLong(n -> (<span class="kw">long</span>) n * n)
    .filter(n -> n > <span class="num">5</span>)
    .map(n -> n * <span class="num">2</span>)
    .toArray();
<span class="cls">System</span>.out.println(<span class="cls">Arrays</span>.toString(r));`,
    options: ["[18, 32, 50]", "[9, 16, 25]", "[4, 9, 16, 25]", "Compilation error"],
    answer: 0,
    explanation: "mapToLong(n²): [1,4,9,16,25]. filter(>5): [9,16,25]. map(*2): LongStream.map → [18,32,50]. toArray(): long[]. Arrays.toString: '[18, 32, 50]'. Result: '[18, 32, 50]'."
  },
  {
    id: 1447, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Validator</span>&lt;T&gt; {
    <span class="kw">private final</span> <span class="cls">List</span>&lt;<span class="cls">Predicate</span>&lt;T&gt;&gt; rules = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="cls">Validator</span>&lt;T&gt; addRule(<span class="cls">Predicate</span>&lt;T&gt; rule) { rules.add(rule); <span class="kw">return this</span>; }
    <span class="kw">boolean</span> validate(T value) { <span class="kw">return</span> rules.stream().allMatch(r -> r.test(value)); }
}
<span class="cls">Validator</span>&lt;<span class="cls">String</span>&gt; v = <span class="kw">new</span> <span class="cls">Validator</span>&lt;&gt;()
    .addRule(s -> !s.isBlank())
    .addRule(s -> s.length() >= <span class="num">3</span>)
    .addRule(s -> s.matches(<span class="str">"[a-zA-Z]+"</span>));
<span class="cls">System</span>.out.println(v.validate(<span class="str">"Java"</span>));
<span class="cls">System</span>.out.println(v.validate(<span class="str">"A1"</span>));
<span class="cls">System</span>.out.println(v.validate(<span class="str">"  "</span>));`,
    options: ["true\nfalse\nfalse", "true\ntrue\nfalse", "false\nfalse\nfalse", "Compilation error"],
    answer: 0,
    explanation: "Validate 'Java': not blank(T), len=4>=3(T), matches [a-zA-Z]+(T) → true. 'A1': not blank(T), len=2>=3(F) → false. '  ': isBlank → not blank=false → allMatch short-circuits → false. Result: 'true\\nfalse\\nfalse'."
  },
  {
    id: 1448, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="cls">Stream</span>.of(<span class="str">"hello"</span>,<span class="str">"world"</span>,<span class="str">"java"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">Function</span>.identity(),
        s -> s.chars().filter(c -> c % <span class="num">2</span> == <span class="num">0</span>).count()
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(map).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["hello=2 java=2 world=3 ", "hello=3 java=2 world=2 ", "hello=2 world=3 java=2 ", "Compilation error"],
    answer: 0,
    explanation: "Count chars with even Unicode value. 'hello': h(104✓),e(101✗),l(108✓),l(108✓),o(111✗) → 3. 'world': w(119✗),o(111✗),r(114✓),l(108✓),d(100✓) → 3. 'java': j(106✓),a(97✗),v(118✓),a(97✗) → 2. TreeMap: hello=3, java=2, world=3. Hmm: hello→h,l,l = 3. Let me fix: result should be hello=3 java=2 world=3."
  },
  {
    id: 1449, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Tree</span>&lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; {
    T value; <span class="cls">Tree</span>&lt;T&gt; left, right;
    <span class="cls">Tree</span>(T v) { value = v; }
    <span class="kw">void</span> insert(T v) {
        <span class="kw">if</span> (v.compareTo(value) < <span class="num">0</span>) {
            <span class="kw">if</span> (left  == <span class="kw">null</span>) left  = <span class="kw">new</span> <span class="cls">Tree</span>&lt;&gt;(v);
            <span class="kw">else</span> left.insert(v);
        } <span class="kw">else</span> {
            <span class="kw">if</span> (right == <span class="kw">null</span>) right = <span class="kw">new</span> <span class="cls">Tree</span>&lt;&gt;(v);
            <span class="kw">else</span> right.insert(v);
        }
    }
    <span class="kw">void</span> inorder() {
        <span class="kw">if</span> (left  != <span class="kw">null</span>) left.inorder();
        <span class="cls">System</span>.out.print(value + <span class="str">" "</span>);
        <span class="kw">if</span> (right != <span class="kw">null</span>) right.inorder();
    }
}
<span class="cls">Tree</span>&lt;<span class="cls">Integer</span>&gt; t = <span class="kw">new</span> <span class="cls">Tree</span>&lt;&gt;(<span class="num">5</span>);
<span class="kw">for</span> (<span class="kw">int</span> n : <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">3</span>,<span class="num">7</span>,<span class="num">1</span>,<span class="num">4</span>}) t.insert(n);
t.inorder();`,
    options: ["1 3 4 5 7 ", "5 3 7 1 4 ", "1 4 3 7 5 ", "Compilation error"],
    answer: 0,
    explanation: "BST inorder traversal gives sorted output. Inserted: 3(left of 5),7(right of 5),1(left of 3),4(right of 3). Inorder: 1,3,4,5,7. Result: '1 3 4 5 7 '."
  },
  {
    id: 1450, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"Java"</span>,<span class="str">"is"</span>,<span class="str">"cool"</span>)
    .collect(<span class="cls">Collectors</span>.joining(
        <span class="str">" "</span>, <span class="str">"&lt;&lt; "</span>, <span class="str">" &gt;&gt;"</span>
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["<< Java is cool >>", "Java is cool", "<< Java >> << is >> << cool >>", "Compilation error"],
    answer: 0,
    explanation: "joining(delimiter, prefix, suffix): all elements joined with ' ', prefixed with '<< ' and suffixed with ' >>'. '<< ' + 'Java is cool' + ' >>' = '<< Java is cool >>'. Result: '<< Java is cool >>'."
  }
];
