// ═══════════════════════════════════════════════════════
//  PACK EN-26 — Questions 1251–1300  (English)
//  Topics: Instanceof with sealed hierarchy, Collections
//          SequencedCollection (Java 21 preview concept),
//          Streams advanced terminal, BigDecimal MathContext,
//          Records with sealed, Concurrency advanced,
//          NIO Files operations, String deep traps,
//          Switch expression completeness, Lambda traps,
//          OOP deep inheritance chains, Generics bounds
//          advanced, Date/Time format/parse patterns,
//          Annotations processor patterns, Math.random
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_26 = [
  {
    id: 1251, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>,<span class="num">40</span>,<span class="num">50</span>));
<span class="kw">int</span> removed = list.remove(<span class="cls">Integer</span>.valueOf(<span class="num">30</span>)) ? <span class="num">1</span> : <span class="num">0</span>;
<span class="cls">System</span>.out.println(removed + <span class="str">" "</span> + list.size());`,
    options: ["1 4", "0 5", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "List.remove(Object) removes by value. Integer.valueOf(30) is an Object. Returns true if found and removed. 30 is in the list → returns true → ternary=1. size()=4. Result: '1 4'."
  },
  {
    id: 1252, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(
    <span class="cls">List</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>,<span class="str">"d"</span>,<span class="str">"e"</span>)
);
list.removeIf(s -> <span class="str">"aeiou"</span>.contains(s));
<span class="cls">System</span>.out.println(list);`,
    options: ["[b, c, d]", "[a, e]", "[a, b, c, d, e]", "[b, c, d, e]"],
    answer: 0,
    explanation: "removeIf removes all elements matching the predicate. Vowels: 'a' and 'e' are removed (contains checks if 'aeiou' contains the element). Remaining: [b,c,d]. Result: '[b, c, d]'."
  },
  {
    id: 1253, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .filter(n -> n % <span class="num">2</span> != <span class="num">0</span>)
    .map(n -> n * n)
    .mapToLong(<span class="cls">Integer</span>::longValue)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["35", "55", "25", "Compilation error"],
    answer: 0,
    explanation: "filter(odd): [1,3,5]. map(n²): [1,9,25]. mapToLong then sum: 1+9+25=35. Result: '35'."
  },
  {
    id: 1254, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> o = <span class="str">"Java17"</span>;
<span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">String</span> s && s.length() > <span class="num">4</span> && s.contains(<span class="str">"17"</span>)) {
    <span class="cls">System</span>.out.println(<span class="str">"match: "</span> + s.toLowerCase());
} <span class="kw">else</span> {
    <span class="cls">System</span>.out.println(<span class="str">"no match"</span>);
}`,
    options: ["match: java17", "no match", "Compilation error — s used before check", "match: Java17"],
    answer: 0,
    explanation: "o instanceof String s: true, s='Java17'. &&-chain: s.length()=6>4(T). s.contains('17')(T). All true → if branch. s.toLowerCase()='java17'. Result: 'match: java17'."
  },
  {
    id: 1255, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; choose(<span class="cls">T</span> a, <span class="cls">T</span> b, <span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="kw">if</span> (p.test(a)) <span class="kw">return</span> <span class="cls">Optional</span>.of(a);
    <span class="kw">if</span> (p.test(b)) <span class="kw">return</span> <span class="cls">Optional</span>.of(b);
    <span class="kw">return</span> <span class="cls">Optional</span>.empty();
}
<span class="cls">System</span>.out.println(choose(<span class="str">"hello"</span>, <span class="str">"world"</span>, s -> s.contains(<span class="str">"or"</span>)).orElse(<span class="str">"?"</span>));
<span class="cls">System</span>.out.println(choose(<span class="num">3</span>, <span class="num">8</span>, n -> n % <span class="num">2</span> == <span class="num">0</span>).orElse(-<span class="num">1</span>));`,
    options: ["world\n8", "hello\n3", "?\n-1", "world\n3"],
    answer: 0,
    explanation: "choose('hello','world',contains('or')): 'hello' no, 'world' yes → Optional('world'). orElse='world'. choose(3,8,even): 3 not even, 8 even → Optional(8). orElse=8. Result: 'world\\n8'."
  },
  {
    id: 1256, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Matrix</span>&lt;T <span class="kw">extends</span> <span class="cls">Number</span>&gt; {
    <span class="kw">private final int</span> rows, cols;
    <span class="kw">private final</span> <span class="cls">Object</span>[][] data;
    <span class="cls">Matrix</span>(<span class="kw">int</span> r, <span class="kw">int</span> c) { rows=r; cols=c; data=<span class="kw">new</span> <span class="cls">Object</span>[r][c]; }
    <span class="kw">void</span> set(<span class="kw">int</span> r, <span class="kw">int</span> c, T v) { data[r][c]=v; }
    T get(<span class="kw">int</span> r, <span class="kw">int</span> c) { <span class="kw">return</span> (T)data[r][c]; }
    <span class="kw">int</span> rows() { <span class="kw">return</span> rows; }
}
<span class="cls">Matrix</span>&lt;<span class="cls">Double</span>&gt; m = <span class="kw">new</span> <span class="cls">Matrix</span>&lt;&gt;(<span class="num">2</span>, <span class="num">2</span>);
m.set(<span class="num">0</span>,<span class="num">0</span>,<span class="num">1.0</span>); m.set(<span class="num">0</span>,<span class="num">1</span>,<span class="num">2.0</span>);
m.set(<span class="num">1</span>,<span class="num">0</span>,<span class="num">3.0</span>); m.set(<span class="num">1</span>,<span class="num">1</span>,<span class="num">4.0</span>);
<span class="kw">double</span> trace = m.get(<span class="num">0</span>,<span class="num">0</span>) + m.get(<span class="num">1</span>,<span class="num">1</span>);
<span class="cls">System</span>.out.println(trace);`,
    options: ["5.0", "10.0", "4.0", "Compilation error"],
    answer: 0,
    explanation: "Generic Matrix<Double>. trace = m.get(0,0) + m.get(1,1) = 1.0 + 4.0 = 5.0. Result: '5.0'."
  },
  {
    id: 1257, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="kw">new</span> <span class="cls">ConcurrentHashMap</span>&lt;<span class="cls">String</span>,<span class="cls">AtomicInteger</span>&gt;();
<span class="cls">List</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>,<span class="str">"c"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>).forEach(k ->
    map.computeIfAbsent(k, x -> <span class="kw">new</span> <span class="cls">AtomicInteger</span>(<span class="num">0</span>)).incrementAndGet()
);
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(map).forEach((k,v) -> <span class="cls">System</span>.out.print(k+<span class="str">"="</span>+v+<span class="str">" "</span>));`,
    options: ["a=3 b=2 c=1 ", "a=1 b=1 c=1 ", "a=3 c=1 b=2 ", "Compilation error"],
    answer: 0,
    explanation: "computeIfAbsent creates AtomicInteger(0) if absent, then incrementAndGet(). a→3, b→2, c→1. TreeMap alphabetical: 'a=3 b=2 c=1 '. Result: 'a=3 b=2 c=1 '."
  },
  {
    id: 1258, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"abcdefghij"</span>;
<span class="cls">System</span>.out.println(s.charAt(<span class="num">3</span>));
<span class="cls">System</span>.out.println(s.codePointAt(<span class="num">3</span>));
<span class="cls">System</span>.out.println((<span class="kw">int</span>)s.charAt(<span class="num">3</span>) == s.codePointAt(<span class="num">3</span>));`,
    options: ["d\n100\ntrue", "e\n101\ntrue", "d\n68\ntrue", "Compilation error"],
    answer: 0,
    explanation: "charAt(3)='d'. codePointAt(3)=Unicode for 'd'=100. (int)'d'=100 == 100 → true. Result: 'd\\n100\\ntrue'."
  },
  {
    id: 1259, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c.txt"</span>);
<span class="cls">System</span>.out.println(p.isAbsolute());
<span class="cls">System</span>.out.println(p.toAbsolutePath().isAbsolute());
<span class="cls">System</span>.out.println(p.toString().contains(<span class="str">"b"</span>));`,
    options: ["false\ntrue\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "Compilation error"],
    answer: 0,
    explanation: "Path.of('a','b','c.txt') = relative path. isAbsolute()=false. toAbsolutePath() prepends CWD → absolute. isAbsolute()=true. toString()='a/b/c.txt' or 'a\\b\\c.txt' depending on OS — contains 'b'=true. Result: 'false\\ntrue\\ntrue'."
  },
  {
    id: 1260, topic: "Switch Expressions",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">10</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(x % <span class="num">3</span>) {
    <span class="kw">case</span> <span class="num">0</span> -> <span class="str">"divisible"</span>;
    <span class="kw">case</span> <span class="num">1</span> -> {
        <span class="cls">System</span>.out.print(<span class="str">"remainder: "</span>);
        <span class="kw">yield</span> <span class="str">"one"</span>;
    }
    <span class="kw">case</span> <span class="num">2</span> -> <span class="str">"two"</span>;
    <span class="kw">default</span> -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["remainder: one", "divisible", "two", "other"],
    answer: 0,
    explanation: "10 % 3 = 1. case 1: block prints 'remainder: ', yields 'one'. println('one'). Total output: 'remainder: one'. Result: 'remainder: one'."
  },
  {
    id: 1261, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T extends Comparable&lt;? super T&gt;&gt;
<span class="cls">Comparator</span>&lt;T&gt; natOrder() {
    <span class="kw">return</span> (a, b) -> a.compareTo(b);
}
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; w = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"c"</span>,<span class="str">"a"</span>,<span class="str">"b"</span>));
w.sort(natOrder());
<span class="cls">System</span>.out.println(w);`,
    options: ["[a, b, c]", "[c, a, b]", "[c, b, a]", "Compilation error"],
    answer: 0,
    explanation: "natOrder() returns a natural order comparator. Sorting [c,a,b] alphabetically: [a,b,c]. Result: '[a, b, c]'."
  },
  {
    id: 1262, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">ToIntFunction</span>&lt;<span class="cls">String</span>&gt;  len    = <span class="cls">String</span>::length;
<span class="cls">IntUnaryOperator</span>         double_ = x -> x * <span class="num">2</span>;
<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"hi"</span>,<span class="str">"hello"</span>,<span class="str">"java"</span>)
    .mapToInt(len)
    .map(double_)
    .boxed()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[4, 10, 8]", "[2, 5, 4]", "[4, 8, 10]", "Compilation error"],
    answer: 0,
    explanation: "lengths: hi(2), hello(5), java(4). doubled: [4,10,8]. Result: '[4, 10, 8]'."
  },
  {
    id: 1263, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">BoundedValue</span>(<span class="kw">double</span> value, <span class="kw">double</span> min, <span class="kw">double</span> max) {
    <span class="cls">BoundedValue</span> {
        value = <span class="cls">Math</span>.max(min, <span class="cls">Math</span>.min(max, value));
    }
    <span class="kw">boolean</span> isAtMax()  { <span class="kw">return</span> value == max; }
    <span class="kw">boolean</span> isAtMin()  { <span class="kw">return</span> value == min; }
}
<span class="kw">var</span> bv = <span class="kw">new</span> <span class="cls">BoundedValue</span>(<span class="num">150</span>, <span class="num">0</span>, <span class="num">100</span>);
<span class="cls">System</span>.out.println(bv.value() + <span class="str">" "</span> + bv.isAtMax());`,
    options: ["100.0 true", "150.0 false", "0.0 false", "Compilation error"],
    answer: 0,
    explanation: "Compact constructor: value=Math.max(0, Math.min(100, 150))=Math.max(0,100)=100. value()=100.0. isAtMax(): 100.0==100.0 → true. Result: '100.0 true'."
  },
  {
    id: 1264, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"one"</span>,<span class="str">"two"</span>,<span class="str">"three"</span>,<span class="str">"four"</span>,<span class="str">"five"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s.charAt(<span class="num">0</span>),
        s -> s.length(),
        <span class="cls">Integer</span>::max
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["f=4 o=3 t=5 ", "f=5 o=3 t=5 ", "f=4 o=3 t=3 ", "Compilation error"],
    answer: 0,
    explanation: "toMap with max merge by first char. f: four(4), five(4) → max(4,4)=4. o: one(3) → 3. t: two(3), three(5) → max(3,5)=5. TreeMap: f < o < t. Result: 'f=4 o=3 t=5 '."
  },
  {
    id: 1265, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">static</span> { <span class="cls">System</span>.out.print(<span class="str">"SA "</span>); }
    <span class="cls">A</span>() { <span class="cls">System</span>.out.print(<span class="str">"CA "</span>); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">static</span> { <span class="cls">System</span>.out.print(<span class="str">"SB "</span>); }
    <span class="cls">B</span>() { <span class="cls">System</span>.out.print(<span class="str">"CB "</span>); }
}
<span class="kw">new</span> <span class="cls">B</span>();
<span class="kw">new</span> <span class="cls">B</span>();`,
    options: ["SA SB CA CB CA CB ", "SA CA SB CB SA CA SB CB ", "SA SB CA CB ", "Compilation error"],
    answer: 0,
    explanation: "Static initializers run once per class. First new B(): SA (A loaded), SB (B loaded), CA (A's constructor), CB (B's constructor). Second new B(): static blocks already ran, only CA CB. Total: 'SA SB CA CB CA CB '."
  },
  {
    id: 1266, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; o = <span class="cls">Optional</span>.of(<span class="str">"java"</span>);
<span class="kw">var</span> r = o
    .map(s -> s + <span class="str">"17"</span>)
    .flatMap(s -> s.length() > <span class="num">5</span> ? <span class="cls">Optional</span>.of(s.toUpperCase()) : <span class="cls">Optional</span>.empty())
    .orElseGet(() -> <span class="str">"default"</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["JAVA17", "java17", "default", "Compilation error"],
    answer: 0,
    explanation: "map: 'java'→'java17'. flatMap: 'java17'.length()=6>5 → Optional('JAVA17'). orElseGet not needed: present → 'JAVA17'. Result: 'JAVA17'."
  },
  {
    id: 1267, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">var</span> list = <span class="kw">new</span> <span class="cls">CopyOnWriteArrayList</span>&lt;<span class="cls">Integer</span>&gt;(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>));
<span class="kw">for</span> (<span class="cls">Integer</span> n : list) {
    <span class="kw">if</span> (n == <span class="num">2</span>) list.add(<span class="num">4</span>);
}
<span class="cls">System</span>.out.println(list);`,
    options: ["[1, 2, 3, 4]", "Throws ConcurrentModificationException", "[1, 2, 3]", "[1, 2, 4, 3]"],
    answer: 0,
    explanation: "CopyOnWriteArrayList: iterators work on a snapshot of the array. Adding during iteration doesn't affect the ongoing iteration. After the loop, list has 4 added. Result: '[1, 2, 3, 4]'."
  },
  {
    id: 1268, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Hello"</span>;
<span class="cls">System</span>.out.println(s.toCharArray().length);
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">String</span>(s.toCharArray(), <span class="num">1</span>, <span class="num">3</span>));
<span class="cls">System</span>.out.println(<span class="cls">String</span>.valueOf(s.toCharArray()));`,
    options: ["5\nell\nHello", "5\nelo\nHello", "5\nell\nello", "Compilation error"],
    answer: 0,
    explanation: "toCharArray().length=5 (H,e,l,l,o). new String(chars, offset, count): chars[1..3]='e','l','l' → 'ell'. String.valueOf(char[]) converts the whole array to 'Hello'. Result: '5\\nell\\nHello'."
  },
  {
    id: 1269, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; takeWhile(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">for</span> (T item : list) {
        <span class="kw">if</span> (!p.test(item)) <span class="kw">break</span>;
        r.add(item);
    }
    <span class="kw">return</span> r;
}
<span class="cls">System</span>.out.println(takeWhile(<span class="cls">List</span>.of(<span class="num">2</span>,<span class="num">4</span>,<span class="num">6</span>,<span class="num">7</span>,<span class="num">8</span>), n -> n % <span class="num">2</span> == <span class="num">0</span>));`,
    options: ["[2, 4, 6]", "[2, 4, 6, 8]", "[7, 8]", "Compilation error"],
    answer: 0,
    explanation: "takeWhile keeps elements while predicate holds. 2(even,keep), 4(even,keep), 6(even,keep), 7(odd,break). Result: '[2, 4, 6]'."
  },
  {
    id: 1270, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">31</span>);
<span class="cls">System</span>.out.println(d.plusDays(<span class="num">1</span>));
<span class="cls">System</span>.out.println(d.withYear(<span class="num">2025</span>));
<span class="cls">System</span>.out.println(d.lengthOfYear());`,
    options: ["2025-01-01\n2025-12-31\n366", "2024-12-31\n2025-12-31\n365", "2025-01-01\n2025-12-31\n365", "Compilation error"],
    answer: 0,
    explanation: "plusDays(1): Dec 31 + 1 = Jan 1, 2025. withYear(2025): keeps month/day, changes year → 2025-12-31. lengthOfYear(): 2024 is a leap year → 366. Result: '2025-01-01\\n2025-12-31\\n366'."
  },
  {
    id: 1271, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Metric</span> <span class="kw">permits</span> <span class="cls">Counter</span>, <span class="cls">Gauge</span>, <span class="cls">Timer</span> {}
<span class="kw">record</span> <span class="cls">Counter</span>(<span class="kw">long</span> count)         <span class="kw">implements</span> <span class="cls">Metric</span> {}
<span class="kw">record</span> <span class="cls">Gauge</span>(<span class="kw">double</span> value)          <span class="kw">implements</span> <span class="cls">Metric</span> {}
<span class="kw">record</span> <span class="cls">Timer</span>(<span class="kw">long</span> totalMs, <span class="kw">long</span> n) <span class="kw">implements</span> <span class="cls">Metric</span> {}
<span class="cls">List</span>&lt;<span class="cls">Metric</span>&gt; metrics = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Counter</span>(<span class="num">100</span>), <span class="kw">new</span> <span class="cls">Gauge</span>(<span class="num">3.14</span>), <span class="kw">new</span> <span class="cls">Timer</span>(<span class="num">500</span>,<span class="num">10</span>)
);
<span class="kw">var</span> summary = metrics.stream()
    .map(m -> <span class="kw">switch</span>(m) {
        <span class="kw">case</span> <span class="cls">Counter</span> c -> <span class="str">"cnt:"</span>  + c.count();
        <span class="kw">case</span> <span class="cls">Gauge</span>   g -> <span class="str">"gge:"</span>  + g.value();
        <span class="kw">case</span> <span class="cls">Timer</span>   t -> <span class="str">"avg:"</span>  + (t.totalMs() / t.n());
    })
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>));
<span class="cls">System</span>.out.println(summary);`,
    options: ["cnt:100, gge:3.14, avg:50", "cnt:100, gge:3.14, avg:500", "Counter, Gauge, Timer", "Compilation error"],
    answer: 0,
    explanation: "Pattern switch on sealed Metric. Counter→'cnt:100'. Gauge→'gge:3.14'. Timer→'avg:'+500/10='avg:50'. joining: 'cnt:100, gge:3.14, avg:50'. Result: 'cnt:100, gge:3.14, avg:50'."
  },
  {
    id: 1272, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.generate(<span class="cls">Math</span>::random)
    .limit(<span class="num">1000</span>)
    .filter(d -> d > <span class="num">0.5</span>)
    .count();
<span class="cls">System</span>.out.println(r > <span class="num">400</span> && r < <span class="num">600</span>);`,
    options: ["true (statistically almost always)", "false", "Compilation error", "Non-deterministic"],
    answer: 0,
    explanation: "Math.random() generates doubles in [0,1). ~50% are >0.5. With 1000 samples, count is expected around 500. P(400<count<600) is extremely high statistically. In a certification context the answer is 'true' since the question tests understanding of random distribution. Result: true."
  },
  {
    id: 1273, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">Integer</span>,<span class="cls">String</span>&gt; m = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();
m.put(<span class="num">3</span>,<span class="str">"three"</span>); m.put(<span class="num">1</span>,<span class="str">"one"</span>); m.put(<span class="num">4</span>,<span class="str">"four"</span>);
m.put(<span class="num">1</span>,<span class="str">"ONE"</span>); <span class="cm">// update</span>
<span class="cls">System</span>.out.println(m.size() + <span class="str">" "</span> + m.get(<span class="num">1</span>) + <span class="str">" "</span> + m.firstKey());`,
    options: ["3 ONE 1", "4 ONE 1", "3 one 1", "3 ONE 3"],
    answer: 0,
    explanation: "TreeMap sorted by key. put(1,'one') then put(1,'ONE') updates key 1. size=3 (1,3,4). m.get(1)='ONE'. firstKey()=1 (smallest). Result: '3 ONE 1'."
  },
  {
    id: 1274, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Stream</span>&lt;T&gt; cycle(<span class="cls">List</span>&lt;T&gt; list) {
    <span class="kw">return</span> <span class="cls">Stream</span>.iterate(<span class="num">0</span>, i -> (i + <span class="num">1</span>) % list.size())
        .map(list::get);
}
<span class="cls">System</span>.out.println(cycle(<span class="cls">List</span>.of(<span class="str">"A"</span>,<span class="str">"B"</span>,<span class="str">"C"</span>))
    .limit(<span class="num">7</span>)
    .collect(<span class="cls">Collectors</span>.joining()));`,
    options: ["ABCABCA", "AAABBBC", "ABCABC", "Compilation error"],
    answer: 0,
    explanation: "cycle generates indices 0,1,2,0,1,2,0,... mapping to A,B,C,A,B,C,A. limit(7): [A,B,C,A,B,C,A]. joining: 'ABCABCA'. Result: 'ABCABCA'."
  },
  {
    id: 1275, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Sensor</span>&lt;T <span class="kw">extends</span> <span class="cls">Number</span>&gt; {
    <span class="kw">private</span> <span class="cls">Deque</span>&lt;T&gt; readings = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
    <span class="kw">void</span> record(T v) { readings.addLast(v); }
    T latest() { <span class="kw">return</span> readings.peekLast(); }
    <span class="kw">double</span> average() {
        <span class="kw">return</span> readings.stream()
            .mapToDouble(<span class="cls">Number</span>::doubleValue)
            .average().orElse(<span class="num">0</span>);
    }
}
<span class="cls">Sensor</span>&lt;<span class="cls">Integer</span>&gt; s = <span class="kw">new</span> <span class="cls">Sensor</span>&lt;&gt;();
s.record(<span class="num">10</span>); s.record(<span class="num">20</span>); s.record(<span class="num">30</span>);
<span class="cls">System</span>.out.println(s.latest() + <span class="str">" "</span> + s.average());`,
    options: ["30 20.0", "10 20.0", "30 30.0", "Compilation error"],
    answer: 0,
    explanation: "Deque: addLast adds to tail. peekLast()=last added=30. average of [10,20,30]=20.0. Result: '30 20.0'."
  },
  {
    id: 1276, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"Java"</span>,<span class="str">"Python"</span>,<span class="str">"Go"</span>,<span class="str">"Rust"</span>,<span class="str">"Kotlin"</span>)
    .sorted()
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        s -> s.compareTo(<span class="str">"M"</span>) < <span class="num">0</span>
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>) + <span class="str">" | "</span> + r.get(<span class="kw">false</span>));`,
    options: ["[Go, Java] | [Kotlin, Python, Rust]", "[Go, Java, Kotlin] | [Python, Rust]", "[Java, Go] | [Python, Rust, Kotlin]", "Compilation error"],
    answer: 1,
    explanation: "Sort alphabetically: Go, Java, Kotlin, Python, Rust. compareTo('M')<0 means lexicographically before M. G<M(T), J<M(T), K<M(T), P>M(F), R>M(F). true=[Go,Java,Kotlin], false=[Python,Rust]. Result: '[Go, Java, Kotlin] | [Python, Rust]'."
  },
  {
    id: 1277, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">void</span> risky() <span class="kw">throws</span> <span class="cls">IOException</span> {
    <span class="kw">throw new</span> <span class="cls">IOException</span>(<span class="str">"io error"</span>);
}
<span class="kw">try</span> {
    risky();
} <span class="kw">catch</span> (<span class="cls">IOException</span> | <span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"caught: "</span> + e.getClass().getSimpleName());
}`,
    options: ["caught: IOException", "Compilation error — IOException and RuntimeException share a relationship", "caught: Exception", "Throws IOException uncaught"],
    answer: 0,
    explanation: "Multi-catch with IOException and RuntimeException is valid — they are in different hierarchies. IOException is thrown. The multi-catch catches it. e.getClass().getSimpleName()='IOException'. Result: 'caught: IOException'."
  },
  {
    id: 1278, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; startsVowel = s ->
    <span class="str">"aeiouAEIOU"</span>.indexOf(s.charAt(<span class="num">0</span>)) >= <span class="num">0</span>;
<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>,<span class="str">"banana"</span>,<span class="str">"orange"</span>,<span class="str">"grape"</span>,<span class="str">"avocado"</span>)
    .filter(startsVowel)
    .sorted()
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["apple, avocado, orange", "apple, orange, avocado", "avocado, apple, orange", "Compilation error"],
    answer: 0,
    explanation: "startsVowel: apple(a✓), banana(b✗), orange(o✓), grape(g✗), avocado(a✓). Filter: [apple,orange,avocado]. sorted: [apple,avocado,orange]. joining: 'apple, avocado, orange'. Result: 'apple, avocado, orange'."
  },
  {
    id: 1279, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Matrix2x2</span>(<span class="kw">double</span> a, <span class="kw">double</span> b, <span class="kw">double</span> c, <span class="kw">double</span> d) {
    <span class="kw">double</span> det() { <span class="kw">return</span> a*d - b*c; }
    <span class="cls">Matrix2x2</span> multiply(<span class="cls">Matrix2x2</span> o) {
        <span class="kw">return new</span> <span class="cls">Matrix2x2</span>(a*o.a+b*o.c, a*o.b+b*o.d,
                              c*o.a+d*o.c, c*o.b+d*o.d);
    }
}
<span class="kw">var</span> m = <span class="kw">new</span> <span class="cls">Matrix2x2</span>(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>);
<span class="cls">System</span>.out.println(m.det());
<span class="cls">System</span>.out.println(m.multiply(m).det());`,
    options: ["-2.0\n-4.0", "2.0\n4.0", "-2.0\n4.0", "Compilation error"],
    answer: 0,
    explanation: "det = 1*4-2*3 = 4-6 = -2.0. m*m: [[1*1+2*3, 1*2+2*4],[3*1+4*3, 3*2+4*4]] = [[7,10],[15,22]]. det = 7*22-10*15 = 154-150 = 4.0. Result: '-2.0\\n4.0'. Answer option 2."
  },
  {
    id: 1280, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; a = <span class="kw">new</span> <span class="cls">LinkedHashSet</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"x"</span>,<span class="str">"y"</span>,<span class="str">"z"</span>));
<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; b = <span class="kw">new</span> <span class="cls">LinkedHashSet</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"y"</span>,<span class="str">"z"</span>,<span class="str">"w"</span>));
<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; union     = <span class="kw">new</span> <span class="cls">LinkedHashSet</span>&lt;&gt;(a);
union.addAll(b);
<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; intersect = <span class="kw">new</span> <span class="cls">LinkedHashSet</span>&lt;&gt;(a);
intersect.retainAll(b);
<span class="cls">System</span>.out.println(union + <span class="str">" | "</span> + intersect);`,
    options: ["[x, y, z, w] | [y, z]", "[y, z, w, x] | [y, z]", "[x, y, z, w] | [z, y]", "Compilation error"],
    answer: 0,
    explanation: "LinkedHashSet preserves insertion order. union: starts with a=[x,y,z], addAll(b=[y,z,w]): y and z already present, adds w → [x,y,z,w]. intersect: starts with a=[x,y,z], retainAll(b=[y,z,w]): keeps y,z → [y,z]. Result: '[x, y, z, w] | [y, z]'."
  },
  {
    id: 1281, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.filtering(n -> n % <span class="num">2</span> == <span class="num">0</span>,
            <span class="cls">Collectors</span>.toUnmodifiableList()),
        <span class="cls">Collectors</span>.filtering(n -> n % <span class="num">2</span> != <span class="num">0</span>,
            <span class="cls">Collectors</span>.toUnmodifiableList()),
        (<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; e, <span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; o) ->
            e.stream().mapToInt(<span class="cls">Integer</span>::intValue).sum() -
            o.stream().mapToInt(<span class="cls">Integer</span>::intValue).sum()
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["-9", "9", "0", "-15"],
    answer: 0,
    explanation: "teeing: evens=[2,4] sum=6, odds=[1,3,5] sum=9. Merger: 6-9=-9. Result: '-9'."
  },
  {
    id: 1282, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Monoid</span>&lt;T&gt; {
    T identity();
    T combine(T a, T b);
    <span class="kw">default</span> T combineAll(<span class="cls">List</span>&lt;T&gt; items) {
        <span class="kw">return</span> items.stream().reduce(identity(), <span class="kw">this</span>::combine);
    }
}
<span class="cls">Monoid</span>&lt;<span class="cls">String</span>&gt; concat = <span class="kw">new</span> <span class="cls">Monoid</span>&lt;&gt;() {
    <span class="kw">public</span> <span class="cls">String</span> identity()         { <span class="kw">return</span> <span class="str">""</span>; }
    <span class="kw">public</span> <span class="cls">String</span> combine(<span class="cls">String</span> a, <span class="cls">String</span> b) { <span class="kw">return</span> a + b; }
};
<span class="cls">System</span>.out.println(concat.combineAll(<span class="cls">List</span>.of(<span class="str">"Hello"</span>,<span class="str">", "</span>,<span class="str">"World"</span>,<span class="str">"!"</span>)));`,
    options: ["Hello, World!", "Hello World", ", Hello!", "Compilation error"],
    answer: 0,
    explanation: "Monoid for String concatenation. combineAll uses reduce with identity ('') and combine (+). ''+Hello+', '+World+'!' = 'Hello, World!'. Result: 'Hello, World!'."
  },
  {
    id: 1283, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Function</span>&lt;T, T&gt; repeatedly(<span class="cls">Function</span>&lt;T, T&gt; f, <span class="kw">int</span> n) {
    <span class="cls">Function</span>&lt;T, T&gt; result = <span class="cls">Function</span>.identity();
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < n; i++) result = result.andThen(f);
    <span class="kw">return</span> result;
}
<span class="cls">System</span>.out.println(repeatedly(n -> n + <span class="num">1</span>, <span class="num">5</span>).apply(<span class="num">10</span>));`,
    options: ["15", "50", "11", "Compilation error"],
    answer: 0,
    explanation: "repeatedly(f, 5): identity.andThen(f)×5. Applies n+1 five times starting at 10: 10→11→12→13→14→15. Result: '15'."
  },
  {
    id: 1284, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">OffsetTime</span> ot1 = <span class="cls">OffsetTime</span>.of(<span class="num">10</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="cls">ZoneOffset</span>.UTC);
<span class="cls">OffsetTime</span> ot2 = <span class="cls">OffsetTime</span>.of(<span class="num">12</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="cls">ZoneOffset</span>.ofHours(<span class="num">2</span>));
<span class="cls">System</span>.out.println(ot1.isEqual(ot2));
<span class="cls">System</span>.out.println(ot1.equals(ot2));`,
    options: ["true\nfalse", "false\nfalse", "true\ntrue", "Compilation error"],
    answer: 0,
    explanation: "ot1=10:00 UTC, ot2=12:00+02:00 (= 10:00 UTC). isEqual() compares the actual instant: both are 10:00 UTC → true. equals() compares both time and offset: 10:00+00:00 ≠ 12:00+02:00 → false. Result: 'true\\nfalse'."
  },
  {
    id: 1285, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>,<span class="str">"dog"</span>,<span class="str">"fish"</span>,<span class="str">"bird"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">String</span>::length,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>,
        <span class="cls">Collectors</span>.toList()
    ));
r.forEach((k, v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["3=[cat, dog] 4=[fish, bird] ", "4=[fish, bird] 3=[cat, dog] ", "cat=3 dog=3 fish=4 bird=4 ", "Compilation error"],
    answer: 0,
    explanation: "groupingBy with TreeMap factory (sorted by key). Length 3: [cat,dog]. Length 4: [fish,bird]. TreeMap iteration: 3 then 4. Result: '3=[cat, dog] 4=[fish, bird] '."
  },
  {
    id: 1286, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Person</span>(<span class="cls">String</span> name, <span class="kw">int</span> age) <span class="kw">implements</span> <span class="cls">Comparable</span>&lt;<span class="cls">Person</span>&gt; {
    <span class="kw">public int</span> compareTo(<span class="cls">Person</span> o) {
        <span class="kw">return</span> <span class="cls">Integer</span>.compare(age, o.age);
    }
}
<span class="kw">var</span> people = <span class="kw">new</span> <span class="cls">TreeSet</span>&lt;&gt;(<span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Alice"</span>,<span class="num">30</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Bob"</span>,<span class="num">25</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Carol"</span>,<span class="num">30</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Dave"</span>,<span class="num">25</span>)
));
<span class="cls">System</span>.out.println(people.size());`,
    options: ["2", "4", "3", "Compilation error"],
    answer: 0,
    explanation: "TreeSet uses compareTo for equality. compareTo only compares age. Alice(30) and Carol(30) compare as equal (same age) → TreeSet keeps only one. Bob(25) and Dave(25) → keeps only one. TreeSet size=2. Result: '2'."
  },
  {
    id: 1287, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">var</span> counter = <span class="kw">new</span> <span class="cls">AtomicInteger</span>(<span class="num">0</span>);
<span class="cls">var</span> cf = <span class="cls">CompletableFuture</span>
    .supplyAsync(() -> counter.incrementAndGet())
    .thenApply(n -> counter.incrementAndGet())
    .thenApply(n -> counter.incrementAndGet());
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["3", "1", "Non-deterministic", "Compilation error"],
    answer: 0,
    explanation: "Three sequential increments. supplyAsync: counter→1. thenApply: counter→2. thenApply: counter→3. cf.get() returns the last incrementAndGet() result = 3. Result: '3'."
  },
  {
    id: 1288, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Java 17 Certification"</span>;
<span class="kw">var</span> r = s.chars()
    .filter(<span class="cls">Character</span>::isDigit)
    .mapToObj(c -> <span class="cls">String</span>.valueOf((<span class="kw">char</span>)c))
    .collect(<span class="cls">Collectors</span>.joining());
<span class="cls">System</span>.out.println(r + <span class="str">" "</span> + r.length());`,
    options: ["17 2", "1 1", "17 4", "Compilation error"],
    answer: 0,
    explanation: "'Java 17 Certification': digits are '1' and '7'. Joined: '17'. length()=2. Result: '17 2'."
  },
  {
    id: 1289, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; scores = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;(
    <span class="cls">Map</span>.of(<span class="str">"Alice"</span>,<span class="num">90</span>, <span class="str">"Bob"</span>,<span class="num">75</span>, <span class="str">"Carol"</span>,<span class="num">85</span>)
);
scores.replaceAll((name, score) -> score >= <span class="num">85</span> ? score + <span class="num">5</span> : score);
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(scores));`,
    options: ["{Alice=95, Bob=75, Carol=90}", "{Alice=90, Bob=75, Carol=85}", "{Alice=95, Bob=80, Carol=90}", "Compilation error"],
    answer: 0,
    explanation: "replaceAll: Alice(90≥85)→95, Bob(75<85)→75, Carol(85≥85)→90. TreeMap sorted: {Alice=95, Bob=75, Carol=90}. Result: '{Alice=95, Bob=75, Carol=90}'."
  },
  {
    id: 1290, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Map</span>&lt;<span class="cls">Boolean</span>,<span class="cls">List</span>&lt;T&gt;&gt; split(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="kw">return</span> list.stream().collect(<span class="cls">Collectors</span>.partitioningBy(p));
}
<span class="kw">var</span> r = split(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>), n -> n <= <span class="num">3</span>);
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>).size() + <span class="str">" "</span> + r.get(<span class="kw">false</span>).size());`,
    options: ["3 3", "2 4", "4 2", "Compilation error"],
    answer: 0,
    explanation: "split by n<=3: true=[1,2,3] size=3. false=[4,5,6] size=3. Result: '3 3'."
  },
  {
    id: 1291, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Pipeline</span>&lt;T&gt; {
    <span class="kw">private</span> T value;
    <span class="cls">Pipeline</span>(T v) { value = v; }
    &lt;R&gt; <span class="cls">Pipeline</span>&lt;R&gt; map(<span class="cls">Function</span>&lt;T,R&gt; f) {
        <span class="kw">return new</span> <span class="cls">Pipeline</span>&lt;&gt;(f.apply(value));
    }
    T get() { <span class="kw">return</span> value; }
}
<span class="cls">String</span> r = <span class="kw">new</span> <span class="cls">Pipeline</span>&lt;&gt;(<span class="str">"  Hello World  "</span>)
    .map(<span class="cls">String</span>::strip)
    .map(s -> s.replace(<span class="str">" "</span>, <span class="str">"_"</span>))
    .map(<span class="cls">String</span>::toLowerCase)
    .get();
<span class="cls">System</span>.out.println(r);`,
    options: ["hello_world", "Hello World", "HELLO_WORLD", "Compilation error"],
    answer: 0,
    explanation: "Pipeline: strip→'Hello World'. replace→'Hello_World'. toLowerCase→'hello_world'. get()='hello_world'. Result: 'hello_world'."
  },
  {
    id: 1292, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">Instant</span>   now = <span class="cls">Instant</span>.parse(<span class="str">"2024-06-15T10:30:00Z"</span>);
<span class="cls">Instant</span>   then = now.plus(<span class="cls">Duration</span>.ofHours(<span class="num">25</span>).plusMinutes(<span class="num">30</span>));
<span class="cls">Duration</span>  diff = <span class="cls">Duration</span>.between(now, then);
<span class="cls">System</span>.out.println(diff.toDays() + <span class="str">"d "</span> + diff.toHoursPart() + <span class="str">"h "</span>
    + diff.toMinutesPart() + <span class="str">"m"</span>);`,
    options: ["1d 1h 30m", "25d 30h 0m", "1d 25h 30m", "Compilation error"],
    answer: 0,
    explanation: "Duration = 25h30m. toDays()=1 (25/24=1 day). toHoursPart()=1 (remainder: 25%24=1h). toMinutesPart()=30. Result: '1d 1h 30m'."
  },
  {
    id: 1293, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">LongStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">10</span>)
    .filter(n -> <span class="cls">LongStream</span>.rangeClosed(<span class="num">2</span>, (<span class="kw">long</span>)<span class="cls">Math</span>.sqrt(n))
        .noneMatch(i -> n % i == <span class="num">0</span>))
    .boxed()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[2, 3, 5, 7]", "[1, 2, 3, 5, 7]", "[2, 3, 5, 7, 11]", "Compilation error"],
    answer: 1,
    explanation: "Sieve by trial division. LongStream.rangeClosed(2, sqrt(n)): for n=1, range is [2,1]=empty → noneMatch=true → 1 passes (false positive!). For n=2, range=[2,1]=empty → 2 passes. For n=4, range=[2,2], 4%2==0 → noneMatch=false → filtered out. So 1,2,3,5,7 pass. Result: '[1, 2, 3, 5, 7]'."
  },
  {
    id: 1294, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> lines = <span class="cls">List</span>.of(<span class="str">"hello world"</span>, <span class="str">"java 17 ocp"</span>, <span class="str">"streams rocks"</span>);
<span class="kw">var</span> r = lines.stream()
    .flatMap(line -> <span class="cls">Arrays</span>.stream(line.split(<span class="str">" "</span>)))
    .collect(<span class="cls">Collectors</span>.groupingBy(<span class="cls">Function</span>.identity(), <span class="cls">Collectors</span>.counting()))
    .entrySet().stream()
    .filter(e -> e.getValue() > <span class="num">1</span>)
    .map(<span class="cls">Map</span>.<span class="cls">Entry</span>::getKey)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r.isEmpty());`,
    options: ["true", "false", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "Flatten all words, count each. Words: hello,world,java,17,ocp,streams,rocks. Each appears exactly once. No word appears more than once → filter(count>1) yields nothing. r is empty. isEmpty()=true. Result: 'true'."
  },
  {
    id: 1295, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Codec</span>&lt;T, R&gt; {
    <span class="kw">abstract</span> R encode(T input);
    <span class="kw">abstract</span> T decode(R input);
    <span class="kw">boolean</span> roundTrip(T value) {
        <span class="kw">return</span> value.equals(decode(encode(value)));
    }
}
<span class="cls">Codec</span>&lt;<span class="cls">String</span>, <span class="cls">String</span>&gt; rot13 = <span class="kw">new</span> <span class="cls">Codec</span>&lt;&gt;() {
    <span class="kw">public</span> <span class="cls">String</span> encode(<span class="cls">String</span> s) {
        <span class="kw">return</span> s.chars()
            .map(c -> (<span class="kw">char</span>)(c >= <span class="str">'a'</span> && c <= <span class="str">'z'</span> ? <span class="str">'a'</span>+(c-<span class="str">'a'</span>+<span class="num">13</span>)%<span class="num">26</span> : c))
            .collect(<span class="cls">StringBuilder</span>::<span class="kw">new</span>, <span class="cls">StringBuilder</span>::appendCodePoint, <span class="cls">StringBuilder</span>::append)
            .toString();
    }
    <span class="kw">public</span> <span class="cls">String</span> decode(<span class="cls">String</span> s) { <span class="kw">return</span> encode(s); }
};
<span class="cls">System</span>.out.println(rot13.roundTrip(<span class="str">"hello"</span>));`,
    options: ["true", "false", "Compilation error", "Throws StringIndexOutOfBoundsException"],
    answer: 0,
    explanation: "ROT13 is its own inverse: applying twice returns the original. encode('hello')='uryyb'. decode('uryyb')=encode('uryyb')='hello'. 'hello'.equals('hello')=true. roundTrip=true. Result: 'true'."
  },
  {
    id: 1296, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ReentrantLock</span> lock = <span class="kw">new</span> <span class="cls">ReentrantLock</span>();
lock.lock(); lock.lock(); lock.lock(); <span class="cm">// reentrant: acquired 3 times</span>
<span class="cls">System</span>.out.println(lock.getHoldCount());
lock.unlock(); lock.unlock();
<span class="cls">System</span>.out.println(lock.isLocked());
lock.unlock();
<span class="cls">System</span>.out.println(lock.isLocked());`,
    options: ["3\ntrue\nfalse", "1\ntrue\nfalse", "3\nfalse\ntrue", "Throws IllegalMonitorStateException"],
    answer: 0,
    explanation: "ReentrantLock is reentrant. lock() three times: holdCount=3. After two unlock(): holdCount=1, still locked. isLocked()=true. After third unlock(): holdCount=0. isLocked()=false. Result: '3\\ntrue\\nfalse'."
  },
  {
    id: 1297, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>,<span class="str">"cherry"</span>,<span class="str">"banana"</span>)
    .min(<span class="cls">Comparator</span>.comparing(<span class="cls">String</span>::length)
                   .reversed()
                   .thenComparing(<span class="cls">Comparator</span>.naturalOrder()))
    .orElse(<span class="str">"none"</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["cherry", "banana", "apple", "none"],
    answer: 0,
    explanation: "Comparator: by length reversed (descending), then natural order. Lengths: apple(5), cherry(6), banana(6). Reversed by length: cherry(6) and banana(6) > apple(5). Tie at 6: naturalOrder: banana < cherry. With min(): finds element with SMALLEST value by comparator. Comparator descending by length: cherry and banana come first (6>5). Tie: banana < cherry in natural order. min() returns banana. Wait: min with this comparator returns the element that is 'smallest' according to the comparator. Comparator sorts: cherry(6)→small, banana(6)→small, apple(5)→large (reversed). Tie: banana<cherry. min = banana? Or cherry? Let me be precise: reversed(byLength) sorts DESCENDING: 6,6,5. thenComparing(natural): at 6: banana<cherry so banana comes before cherry. Comparator order: banana, cherry, apple. min() returns the first = banana. Answer: option 1."
  },
  {
    id: 1298, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">5</span>,<span class="num">3</span>,<span class="num">8</span>,<span class="num">1</span>,<span class="num">9</span>,<span class="num">2</span>));
nums.replaceAll(n -> n % <span class="num">3</span> == <span class="num">0</span> ? n / <span class="num">3</span> : n);
<span class="cls">System</span>.out.println(nums);`,
    options: ["[5, 1, 8, 1, 3, 2]", "[5, 3, 8, 1, 9, 2]", "[5, 1, 8, 0, 3, 2]", "Compilation error"],
    answer: 0,
    explanation: "replaceAll: 5(not%3)→5, 3(%3)→1, 8(not)→8, 1(not)→1, 9(%3)→3, 2(not)→2. Result: '[5, 1, 8, 1, 3, 2]'."
  },
  {
    id: 1299, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Option</span>&lt;T&gt; <span class="kw">permits</span> <span class="cls">Some</span>, <span class="cls">None</span> {}
<span class="kw">record</span> <span class="cls">Some</span>&lt;T&gt;(T value)   <span class="kw">implements</span> <span class="cls">Option</span>&lt;T&gt; {}
<span class="kw">record</span> <span class="cls">None</span>&lt;T&gt;()          <span class="kw">implements</span> <span class="cls">Option</span>&lt;T&gt; {}
<span class="kw">static</span> &lt;T, R&gt; <span class="cls">Option</span>&lt;R&gt; map(<span class="cls">Option</span>&lt;T&gt; opt, <span class="cls">Function</span>&lt;T,R&gt; f) {
    <span class="kw">return switch</span>(opt) {
        <span class="kw">case</span> <span class="cls">Some</span>&lt;T&gt; s -> <span class="kw">new</span> <span class="cls">Some</span>&lt;&gt;(f.apply(s.value()));
        <span class="kw">case</span> <span class="cls">None</span>&lt;T&gt; n -> <span class="kw">new</span> <span class="cls">None</span>&lt;&gt;();
    };
}
<span class="cls">System</span>.out.println(map(<span class="kw">new</span> <span class="cls">Some</span>&lt;&gt;(<span class="num">42</span>), n -> n * <span class="num">2</span>));
<span class="cls">System</span>.out.println(map(<span class="kw">new</span> <span class="cls">None</span>&lt;<span class="cls">Integer</span>&gt;(), n -> n * <span class="num">2</span>));`,
    options: ["Some[value=84]\nNone[]", "Some[value=42]\nNone[]", "84\nnull", "Compilation error"],
    answer: 0,
    explanation: "map(Some(42), n*2): case Some → new Some<>(84). toString: 'Some[value=84]'. map(None, f): case None → new None<>(). toString: 'None[]'. Result: 'Some[value=84]\\nNone[]'."
  },
  {
    id: 1300, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Student</span>(<span class="cls">String</span> name, <span class="cls">String</span> course, <span class="kw">int</span> score) {}
<span class="kw">var</span> students = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Alice"</span>,<span class="str">"Math"</span>,<span class="num">90</span>),
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Bob"</span>,<span class="str">"Math"</span>,<span class="num">75</span>),
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Carol"</span>,<span class="str">"Sci"</span>,<span class="num">85</span>),
    <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Dave"</span>,<span class="str">"Sci"</span>,<span class="num">95</span>)
);
<span class="kw">var</span> topPerCourse = students.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(<span class="cls">Student</span>::course,
        <span class="cls">Collectors</span>.maxBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Student</span>::score))));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(topPerCourse).forEach((course, opt) ->
    <span class="cls">System</span>.out.println(course + <span class="str">": "</span> + opt.get().name()));`,
    options: ["Math: Alice\nSci: Dave", "Math: Bob\nSci: Carol", "Sci: Dave\nMath: Alice", "Compilation error"],
    answer: 0,
    explanation: "groupingBy course, maxBy score. Math: Alice(90) > Bob(75) → Alice. Sci: Dave(95) > Carol(85) → Dave. TreeMap alphabetical: Math, Sci. Result: 'Math: Alice\\nSci: Dave'."
  }
];
