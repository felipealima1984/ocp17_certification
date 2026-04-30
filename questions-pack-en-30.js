// ═══════════════════════════════════════════════════════
//  PACK EN-31 — Questions 1501–1550  (English)
//  Focus: Collectors toMap merge/downstream, Iterators,
//         ArrayDeque as stack/queue, ConcurrentHashMap,
//         Stream.generate vs iterate, MethodHandles,
//         Nested records, Interface static methods,
//         Autoboxing traps, String.format edge cases,
//         Exception hierarchy, try-with-multi-resources,
//         Comparable natural order, Optional chaining
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_31 = [
  {
    id: 1501, topic: "Collectors",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>,<span class="str">"c"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s,
        s -> <span class="num">1</span>,
        <span class="cls">Integer</span>::sum
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k+<span class="str">"="</span>+v+<span class="str">" "</span>));`,
    options: ["a=3 b=2 c=1 ", "a=1 b=1 c=1 ", "Throws IllegalStateException", "Compilation error"],
    answer: 0,
    explanation: "toMap with merge function: when duplicate keys occur, applies mergeFunction(existing, newValue). 'a' appears 3×: 1+1+1=3. 'b' appears 2×: 1+1=2. 'c' appears 1×: 1. TreeMap sorts: a=3 b=2 c=1. Result: 'a=3 b=2 c=1 '."
  },
  {
    id: 1502, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Iterator</span>&lt;<span class="cls">Integer</span>&gt; it =
    <span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>).iterator();
<span class="kw">int</span> sum = <span class="num">0</span>;
<span class="kw">while</span> (it.hasNext()) {
    <span class="kw">int</span> n = it.next();
    <span class="kw">if</span> (n % <span class="num">2</span> == <span class="num">0</span>) sum += n;
}
<span class="cls">System</span>.out.println(sum);`,
    options: ["6", "9", "15", "Compilation error"],
    answer: 0,
    explanation: "Iterates [1,2,3,4,5]. Even numbers: 2+4=6. Result: '6'."
  },
  {
    id: 1503, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">ConcurrentHashMap</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">ConcurrentHashMap</span>&lt;&gt;();
m.put(<span class="str">"a"</span>, <span class="num">1</span>);
m.put(<span class="str">"b"</span>, <span class="num">2</span>);
m.computeIfAbsent(<span class="str">"c"</span>, k -> k.length());
m.computeIfPresent(<span class="str">"a"</span>, (k, v) -> v * <span class="num">10</span>);
m.computeIfPresent(<span class="str">"z"</span>, (k, v) -> v * <span class="num">10</span>);
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(m));`,
    options: ["{a=10, b=2, c=1}", "{a=1, b=2, c=1}", "{a=10, b=2, c=1, z=0}", "Compilation error"],
    answer: 0,
    explanation: "computeIfAbsent('c', k->k.length()): 'c' absent → value = 'c'.length()=1. computeIfPresent('a', (k,v)->v*10): 'a' present → 1*10=10. computeIfPresent('z',...): 'z' absent → no-op. Result: '{a=10, b=2, c=1}'."
  },
  {
    id: 1504, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> iter = <span class="cls">Stream</span>.iterate(<span class="num">1</span>, n -> n * <span class="num">2</span>)
    .limit(<span class="num">6</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(iter);`,
    options: ["[1, 2, 4, 8, 16, 32]", "[2, 4, 8, 16, 32, 64]", "[1, 2, 4, 8, 16]", "Compilation error"],
    answer: 0,
    explanation: "iterate(1, n->n*2): 1, 2, 4, 8, 16, 32, ... limit(6): first 6 elements. Result: '[1, 2, 4, 8, 16, 32]'."
  },
  {
    id: 1505, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">long</span> count = <span class="cls">Stream</span>.generate(<span class="cls">Math</span>::random)
    .limit(<span class="num">1000</span>)
    .filter(d -> d < <span class="num">0.5</span>)
    .count();
<span class="cls">System</span>.out.println(count > <span class="num">0</span> && count < <span class="num">1000</span>);`,
    options: ["true", "false", "Compilation error", "Non-deterministic — could be true or false"],
    answer: 0,
    explanation: "Stream.generate(Math::random) produces random doubles [0,1). With 1000 samples, it's statistically near-certain some are < 0.5 and some are >= 0.5. So count is between 1 and 999 → true. While technically non-deterministic, the OCP expects 'true' as the practical answer given the probability is overwhelmingly near 1. Result: 'true'."
  },
  {
    id: 1506, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">MathOps</span> {
    <span class="kw">static int</span> square(<span class="kw">int</span> n) { <span class="kw">return</span> n * n; }
    <span class="kw">static int</span> cube(<span class="kw">int</span> n)   { <span class="kw">return</span> n * n * n; }
    <span class="kw">default int</span> apply(<span class="kw">int</span> n) { <span class="kw">return</span> n; }
}
<span class="cls">System</span>.out.println(<span class="cls">MathOps</span>.square(<span class="num">4</span>));
<span class="cls">System</span>.out.println(<span class="cls">MathOps</span>.cube(<span class="num">3</span>));
<span class="cls">MathOps</span> op = n -> n + <span class="num">1</span>;
<span class="cls">System</span>.out.println(op.apply(<span class="num">10</span>));`,
    options: ["16\n27\n11", "16\n27\n10", "16\n9\n11", "Compilation error"],
    answer: 0,
    explanation: "Interface static methods: MathOps.square(4)=16, MathOps.cube(3)=27. op is a lambda overriding the default apply: n->n+1. op.apply(10)=11. Result: '16\\n27\\n11'."
  },
  {
    id: 1507, topic: "Numeric",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println((<span class="kw">int</span>)(<span class="num">0.9</span> + <span class="num">0.1</span>));
<span class="cls">System</span>.out.println((<span class="kw">int</span>)(<span class="num">0.1</span> + <span class="num">0.2</span>));
<span class="cls">System</span>.out.println(<span class="num">0.1</span> + <span class="num">0.2</span> == <span class="num">0.3</span>);`,
    options: ["1\n0\nfalse", "1\n1\ntrue", "0\n0\nfalse", "Compilation error"],
    answer: 0,
    explanation: "(int)(0.9+0.1)=(int)1.0=1. (int)(0.1+0.2)=(int)0.30000000000000004: truncates to 0. 0.1+0.2=0.30000000000000004≠0.3 → false. Classic floating-point precision demo. Result: '1\\n0\\nfalse'."
  },
  {
    id: 1508, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">int</span>[] arr = <span class="kw">new</span> <span class="kw">int</span>[<span class="num">3</span>];
    arr[<span class="num">5</span>] = <span class="num">1</span>;
} <span class="kw">catch</span> (<span class="cls">ArrayIndexOutOfBoundsException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"A "</span>);
} <span class="kw">catch</span> (<span class="cls">IndexOutOfBoundsException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"B "</span>);
} <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"C "</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"F"</span>);
}`,
    options: ["A F", "B F", "C F", "Compilation error"],
    answer: 0,
    explanation: "ArrayIndexOutOfBoundsException extends IndexOutOfBoundsException extends RuntimeException. The FIRST matching catch is used. ArrayIndexOutOfBoundsException matches the first catch → 'A '. finally always runs → 'F'. Result: 'A F'."
  },
  {
    id: 1509, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Address</span>(<span class="cls">String</span> street, <span class="cls">String</span> city) {}
<span class="kw">record</span> <span class="cls">Person</span>(<span class="cls">String</span> name, <span class="cls">Address</span> address) {}
<span class="cls">Person</span> p = <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Alice"</span>, <span class="kw">new</span> <span class="cls">Address</span>(<span class="str">"Main St"</span>, <span class="str">"Recife"</span>));
<span class="cls">System</span>.out.println(p.name());
<span class="cls">System</span>.out.println(p.address().city());
<span class="cls">System</span>.out.println(p);`,
    options: [
      "Alice\nRecife\nPerson[name=Alice, address=Address[street=Main St, city=Recife]]",
      "Alice\nRecife\nPerson@hashcode",
      "Alice\nAddress[street=Main St, city=Recife]\nPerson[...]",
      "Compilation error"
    ],
    answer: 0,
    explanation: "Records auto-generate accessors, toString, equals, hashCode. p.name()='Alice'. p.address().city()='Recife'. p.toString(): nested records also have generated toString. Result: 'Alice\\nRecife\\nPerson[name=Alice, address=Address[street=Main St, city=Recife]]'."
  },
  {
    id: 1510, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>)
    .collect(<span class="cls">Collectors</span>.partitioningBy(n -> n > <span class="num">3</span>));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>).size());
<span class="cls">System</span>.out.println(r.get(<span class="kw">false</span>));`,
    options: ["3\n[1, 2, 3]", "3\n[4, 5, 6]", "4\n[1, 2]", "Compilation error"],
    answer: 0,
    explanation: "partitioningBy(n>3): true=[4,5,6], false=[1,2,3]. true.size()=3. false=[1,2,3]. Result: '3\\n[1, 2, 3]'."
  },
  {
    id: 1511, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; opt1 = <span class="cls">Optional</span>.of(<span class="str">"hello"</span>);
<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; opt2 = <span class="cls">Optional</span>.empty();
<span class="cls">System</span>.out.println(opt1.map(<span class="cls">String</span>::toUpperCase).orElse(<span class="str">"?"</span>));
<span class="cls">System</span>.out.println(opt2.map(<span class="cls">String</span>::toUpperCase).orElse(<span class="str">"?"</span>));
<span class="cls">System</span>.out.println(opt1.filter(s -> s.length() > <span class="num">10</span>).isPresent());`,
    options: ["HELLO\n?\nfalse", "HELLO\nnull\nfalse", "hello\n?\ntrue", "Compilation error"],
    answer: 0,
    explanation: "opt1.map(toUpperCase)=Optional('HELLO').orElse('?')='HELLO'. opt2.map(...)=Optional.empty().orElse('?')='?'. opt1.filter(length>10): 'hello'.length()=5, not >10 → empty. isPresent()=false. Result: 'HELLO\\n?\\nfalse'."
  },
  {
    id: 1512, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; a = <span class="cls">Optional</span>.of(<span class="str">"Java"</span>);
<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; b = <span class="cls">Optional</span>.empty();
<span class="cls">System</span>.out.println(a.or(() -> <span class="cls">Optional</span>.of(<span class="str">"default"</span>)).get());
<span class="cls">System</span>.out.println(b.or(() -> <span class="cls">Optional</span>.of(<span class="str">"default"</span>)).get());
<span class="cls">System</span>.out.println(b.orElseGet(() -> <span class="str">"lazy"</span>));`,
    options: ["Java\ndefault\nlazy", "default\nJava\nlazy", "Java\nnull\nlazy", "Compilation error"],
    answer: 0,
    explanation: "or(): if present returns self; if empty applies supplier. a.or(...)=a='Java'. b.or(()->Optional.of('default'))=Optional('default'). orElseGet(()->'lazy'): empty → calls supplier → 'lazy'. Result: 'Java\\ndefault\\nlazy'."
  },
  {
    id: 1513, topic: "Comparable",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Version</span>(<span class="kw">int</span> major, <span class="kw">int</span> minor) <span class="kw">implements</span> <span class="cls">Comparable</span>&lt;<span class="cls">Version</span>&gt; {
    <span class="kw">public int</span> compareTo(<span class="cls">Version</span> o) {
        <span class="kw">int</span> c = <span class="cls">Integer</span>.compare(major, o.major);
        <span class="kw">return</span> c != <span class="num">0</span> ? c : <span class="cls">Integer</span>.compare(minor, o.minor);
    }
}
<span class="cls">List</span>&lt;<span class="cls">Version</span>&gt; versions = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">2</span>,<span class="num">1</span>), <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">1</span>,<span class="num">9</span>), <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">2</span>,<span class="num">0</span>)
));
<span class="cls">Collections</span>.sort(versions);
versions.forEach(v -> <span class="cls">System</span>.out.print(v.major()+<span class="str">"."</span>+v.minor()+<span class="str">" "</span>));`,
    options: ["1.9 2.0 2.1 ", "2.1 2.0 1.9 ", "1.9 2.1 2.0 ", "Compilation error"],
    answer: 0,
    explanation: "compareTo: compare major first, then minor. 1.9 < 2.0 < 2.1. Collections.sort uses natural order. Result: '1.9 2.0 2.1 '."
  },
  {
    id: 1514, topic: "Autoboxing",
    text: "What is the output of the following code?",
    code: `<span class="cls">Integer</span> a = <span class="num">1000</span>;
<span class="cls">Integer</span> b = <span class="num">1000</span>;
<span class="cls">Integer</span> c = <span class="num">100</span>;
<span class="cls">Integer</span> d = <span class="num">100</span>;
<span class="cls">System</span>.out.println(a == b);
<span class="cls">System</span>.out.println(c == d);
<span class="cls">System</span>.out.println(a.equals(b));`,
    options: ["false\ntrue\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "false\ntrue\nfalse"],
    answer: 0,
    explanation: "Integer cache: [-128, 127]. 1000 > 127: two distinct objects, == false. 100 in cache: same cached instance, == true. equals() compares values: always true for same value. Result: 'false\\ntrue\\ntrue'."
  },
  {
    id: 1515, topic: "Autoboxing",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>));
list.remove(<span class="num">1</span>);         <span class="cm">// remove by INDEX</span>
<span class="cls">System</span>.out.println(list);
list.remove(<span class="cls">Integer</span>.valueOf(<span class="num">1</span>));  <span class="cm">// remove by VALUE</span>
<span class="cls">System</span>.out.println(list);`,
    options: ["[1, 3]\n[3]", "[2, 3]\n[2, 3]", "[1, 3]\n[1, 3]", "Compilation error"],
    answer: 0,
    explanation: "list.remove(1): primitive int → remove by INDEX → removes element at index 1 (value 2) → [1,3]. list.remove(Integer.valueOf(1)): Object → remove by VALUE → removes element with value 1 → [3]. Result: '[1, 3]\\n[3]'."
  },
  {
    id: 1516, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"x"</span>,<span class="str">"y"</span>,<span class="str">"z"</span>)
    .collect(<span class="cls">Collectors</span>.toUnmodifiableMap(
        <span class="cls">Function</span>.identity(),
        s -> (<span class="kw">int</span>) s.charAt(<span class="num">0</span>)
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k+<span class="str">"="</span>+v+<span class="str">" "</span>));
<span class="kw">try</span> { r.put(<span class="str">"w"</span>, <span class="num">119</span>); }
<span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) { <span class="cls">System</span>.out.print(<span class="str">"blocked"</span>); }`,
    options: ["x=120 y=121 z=122 blocked", "x=120 y=121 z=122 ", "x=x y=y z=z blocked", "Compilation error"],
    answer: 0,
    explanation: "toUnmodifiableMap: value = (int)charAt(0). 'x'=120, 'y'=121, 'z'=122. TreeMap sorted: x=120, y=121, z=122. r.put throws UnsupportedOperationException → 'blocked'. Result: 'x=120 y=121 z=122 blocked'."
  },
  {
    id: 1517, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt; add = (<span class="kw">a</span>, <span class="kw">b</span>) -> a + b;
<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt; max = <span class="cls">BinaryOperator</span>.maxBy(<span class="cls">Comparator</span>.naturalOrder());
<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt; min = <span class="cls">BinaryOperator</span>.minBy(<span class="cls">Comparator</span>.naturalOrder());
<span class="cls">System</span>.out.println(add.apply(<span class="num">3</span>, <span class="num">4</span>));
<span class="cls">System</span>.out.println(max.apply(<span class="num">3</span>, <span class="num">4</span>));
<span class="cls">System</span>.out.println(min.apply(<span class="num">3</span>, <span class="num">4</span>));`,
    options: ["7\n4\n3", "7\n3\n4", "4\n4\n3", "Compilation error"],
    answer: 0,
    explanation: "add(3,4)=7. BinaryOperator.maxBy returns the greater: max(3,4)=4. minBy returns the lesser: min(3,4)=3. Result: '7\\n4\\n3'."
  },
  {
    id: 1518, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Hello, World!"</span>;
<span class="cls">System</span>.out.println(s.substring(<span class="num">7</span>));
<span class="cls">System</span>.out.println(s.substring(<span class="num">7</span>, <span class="num">12</span>));
<span class="cls">System</span>.out.println(s.indexOf(<span class="str">","</span>));
<span class="cls">System</span>.out.println(s.lastIndexOf(<span class="str">"l"</span>));`,
    options: ["World!\nWorld\n5\n10", "World!\nWorld!\n5\n10", "World\nWorld\n5\n3", "Compilation error"],
    answer: 0,
    explanation: "substring(7): from index 7 to end = 'World!'. substring(7,12): [7,12) = 'World'. indexOf(',')=5 (H0,e1,l2,l3,o4,,5). lastIndexOf('l'): 'World' has l at 10 (H0,e1,l2,l3,o4,,5,' '6,W7,o8,r9,l10). Result: 'World!\\nWorld\\n5\\n10'."
  },
  {
    id: 1519, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Cache</span>&lt;K, V&gt; {
    <span class="kw">private final</span> <span class="cls">Map</span>&lt;K, V&gt; store = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
    <span class="kw">abstract</span> V compute(K key);
    V get(K key) { <span class="kw">return</span> store.computeIfAbsent(key, this::compute); }
}
<span class="kw">var</span> cache = <span class="kw">new</span> <span class="cls">Cache</span>&lt;<span class="cls">Integer</span>, <span class="cls">Long</span>&gt;() {
    <span class="kw">long</span> calls = <span class="num">0</span>;
    <span class="kw">Long</span> compute(<span class="cls">Integer</span> k) { calls++; <span class="kw">return</span> (<span class="kw">long</span>) k * k; }
    <span class="kw">long</span> getCalls() { <span class="kw">return</span> calls; }
};
cache.get(<span class="num">4</span>); cache.get(<span class="num">5</span>); cache.get(<span class="num">4</span>);
<span class="cls">System</span>.out.println(cache.get(<span class="num">4</span>) + <span class="str">" calls:"</span> + cache.getCalls());`,
    options: ["16 calls:2", "16 calls:4", "16 calls:1", "Compilation error"],
    answer: 0,
    explanation: "computeIfAbsent only calls compute on cache miss. get(4): miss→compute(4)=16, calls=1. get(5): miss→compute(5)=25, calls=2. get(4): hit→no compute. get(4): hit again→no compute. get(4)=16. calls=2. Result: '16 calls:2'."
  },
  {
    id: 1520, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Employee</span>(<span class="cls">String</span> name, <span class="cls">String</span> dept, <span class="kw">double</span> salary) {}
<span class="kw">var</span> employees = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"A"</span>,<span class="str">"IT"</span>,<span class="num">5000</span>), <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"B"</span>,<span class="str">"HR"</span>,<span class="num">4000</span>),
    <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"C"</span>,<span class="str">"IT"</span>,<span class="num">6000</span>), <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"D"</span>,<span class="str">"HR"</span>,<span class="num">4500</span>)
);
employees.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(<span class="cls">Employee</span>::dept,
        <span class="cls">Collectors</span>.averagingDouble(<span class="cls">Employee</span>::salary)))
    .entrySet().stream()
    .sorted(<span class="cls">Map</span>.<span class="cls">Entry</span>.comparingByKey())
    .forEach(e -> <span class="cls">System</span>.out.printf(<span class="str">"%s=%.0f%n"</span>, e.getKey(), e.getValue()));`,
    options: ["HR=4250\nIT=5500", "IT=5500\nHR=4250", "HR=4000\nIT=6000", "Compilation error"],
    answer: 0,
    explanation: "HR: avg(4000,4500)=4250. IT: avg(5000,6000)=5500. sorted by key: HR < IT. printf: HR=4250, IT=5500. Result: 'HR=4250\\nIT=5500'."
  },
  {
    id: 1521, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">3</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(x % <span class="num">3</span>) {
    <span class="kw">case</span> <span class="num">0</span> -> <span class="str">"div3"</span>;
    <span class="kw">case</span> <span class="num">1</span> -> <span class="str">"rem1"</span>;
    <span class="kw">case</span> <span class="num">2</span> -> <span class="str">"rem2"</span>;
    <span class="kw">default</span> -> <span class="str">"?"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["div3", "rem1", "rem2", "?"],
    answer: 0,
    explanation: "3%3=0. Case 0 → 'div3'. Result: 'div3'."
  },
  {
    id: 1522, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Map</span>&lt;T, <span class="cls">List</span>&lt;T&gt;&gt; groupConsecutive(<span class="cls">List</span>&lt;T&gt; list) {
    <span class="cls">Map</span>&lt;T, <span class="cls">List</span>&lt;T&gt;&gt; r = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;();
    <span class="kw">for</span> (T e : list) r.computeIfAbsent(e, k -> <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;()).add(e);
    <span class="kw">return</span> r;
}
<span class="kw">var</span> r = groupConsecutive(<span class="cls">List</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"a"</span>,<span class="str">"c"</span>,<span class="str">"b"</span>));
r.forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">":"</span> + v.size() + <span class="str">" "</span>));`,
    options: ["a:2 b:2 c:1 ", "a:1 b:1 c:1 ", "a:2 c:1 b:2 ", "Compilation error"],
    answer: 0,
    explanation: "LinkedHashMap preserves insertion order. First encounter: 'a' (insert), 'b' (insert), 'a' (already present), 'c' (insert), 'b' (already present). Order: a,b,c. Counts: a=2, b=2, c=1. Result: 'a:2 b:2 c:1 '."
  },
  {
    id: 1523, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Builder</span>&lt;T, B <span class="kw">extends</span> <span class="cls">Builder</span>&lt;T, B&gt;&gt; {
    B set(<span class="cls">String</span> key, <span class="cls">String</span> value);
    T build();
}
<span class="kw">class</span> <span class="cls">PersonBuilder</span> <span class="kw">implements</span> <span class="cls">Builder</span>&lt;<span class="cls">String</span>, <span class="cls">PersonBuilder</span>&gt; {
    <span class="kw">private</span> <span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">String</span>&gt; m = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;();
    <span class="kw">public</span> <span class="cls">PersonBuilder</span> set(<span class="cls">String</span> k, <span class="cls">String</span> v) { m.put(k,v); <span class="kw">return this</span>; }
    <span class="kw">public</span> <span class="cls">String</span> build() { <span class="kw">return</span> m.toString(); }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">PersonBuilder</span>()
    .set(<span class="str">"name"</span>, <span class="str">"Alice"</span>).set(<span class="str">"age"</span>, <span class="str">"30"</span>).build());`,
    options: ["{name=Alice, age=30}", "{age=30, name=Alice}", "name=Alice age=30", "Compilation error"],
    answer: 0,
    explanation: "Fluent builder with recursive generics. LinkedHashMap preserves insertion order: name, then age. toString(): '{name=Alice, age=30}'. Result: '{name=Alice, age=30}'."
  },
  {
    id: 1524, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="cls">Exception</span> e = <span class="kw">new</span> <span class="cls">Exception</span>(<span class="str">"original"</span>);
<span class="cls">Exception</span> wrapped = <span class="kw">new</span> <span class="cls">Exception</span>(<span class="str">"wrapper"</span>, e);
wrapped.addSuppressed(<span class="kw">new</span> <span class="cls">RuntimeException</span>(<span class="str">"suppressed"</span>));
<span class="cls">System</span>.out.println(wrapped.getMessage());
<span class="cls">System</span>.out.println(wrapped.getCause().getMessage());
<span class="cls">System</span>.out.println(wrapped.getSuppressed()[<span class="num">0</span>].getMessage());`,
    options: ["wrapper\noriginal\nsuppressed", "original\nwrapper\nsuppressed", "wrapper\nsuppressed\noriginal", "Compilation error"],
    answer: 0,
    explanation: "Suppressed exceptions are added via addSuppressed() (primarily from try-with-resources). getMessage()='wrapper'. getCause()=e → 'original'. getSuppressed()[0]='suppressed'. Result: 'wrapper\\noriginal\\nsuppressed'."
  },
  {
    id: 1525, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"Java"</span>,<span class="str">"Kotlin"</span>,<span class="str">"Scala"</span>,<span class="str">"Groovy"</span>)
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length).thenComparing(<span class="cls">Comparator</span>.naturalOrder()))
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[Java, Scala, Groovy, Kotlin]", "[Java, Kotlin, Scala, Groovy]", "[Groovy, Kotlin, Scala, Java]", "Compilation error"],
    answer: 0,
    explanation: "Sort by length, then alphabetically. Java(4), Scala(5), Kotlin(6), Groovy(6). Length ties (6): Groovy < Kotlin alphabetically. Order: Java(4), Scala(5), Groovy(6), Kotlin(6). Result: '[Java, Scala, Groovy, Kotlin]'."
  },
  {
    id: 1526, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> r = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">10</span>)
    .filter(n -> n % <span class="num">3</span> == <span class="num">0</span>)
    .map(n -> n * <span class="num">2</span>)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["72", "18", "36", "Compilation error"],
    answer: 0,
    explanation: "rangeClosed(1,10): [1..10]. filter(n%3==0): [3,6,9]. map(*2): [6,12,18]. sum()=36. Result: '36'."
  },
  {
    id: 1527, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Robot</span> {
    <span class="kw">private int</span> x = <span class="num">0</span>, y = <span class="num">0</span>;
    <span class="cls">Robot</span> move(<span class="kw">int</span> dx, <span class="kw">int</span> dy) { x += dx; y += dy; <span class="kw">return this</span>; }
    <span class="cls">Robot</span> reset() { x = <span class="num">0</span>; y = <span class="num">0</span>; <span class="kw">return this</span>; }
    <span class="cls">String</span> pos() { <span class="kw">return</span> x + <span class="str">","</span> + y; }
}
<span class="kw">var</span> r = <span class="kw">new</span> <span class="cls">Robot</span>()
    .move(<span class="num">3</span>, <span class="num">4</span>)
    .move(-<span class="num">1</span>, <span class="num">2</span>)
    .move(<span class="num">5</span>, -<span class="num">3</span>);
<span class="cls">System</span>.out.println(r.pos());
r.reset().move(<span class="num">1</span>, <span class="num">1</span>);
<span class="cls">System</span>.out.println(r.pos());`,
    options: ["7,3\n1,1", "3,4\n0,0", "7,3\n0,0", "Compilation error"],
    answer: 0,
    explanation: "move(3,4): x=3,y=4. move(-1,2): x=2,y=6. move(5,-3): x=7,y=3. pos()='7,3'. reset(): x=0,y=0. move(1,1): x=1,y=1. pos()='1,1'. Result: '7,3\\n1,1'."
  },
  {
    id: 1528, topic: "Collectors",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        n -> n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>,
        n -> n,
        (<span class="kw">a</span>, <span class="kw">b</span>) -> a + b
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k+<span class="str">"="</span>+v+<span class="str">" "</span>));`,
    options: ["even=6 odd=9 ", "even=4 odd=5 ", "odd=9 even=6 ", "Compilation error"],
    answer: 0,
    explanation: "key=even/odd, value=n, merge=(a,b)->a+b. even: 2,4 → 2+4=6. odd: 1,3,5 → 1+3+5=9. TreeMap: even < odd. Result: 'even=6 odd=9 '."
  },
  {
    id: 1529, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">AtomicInteger</span> ai = <span class="kw">new</span> <span class="cls">AtomicInteger</span>(<span class="num">5</span>);
<span class="cls">System</span>.out.println(ai.getAndIncrement());
<span class="cls">System</span>.out.println(ai.incrementAndGet());
<span class="cls">System</span>.out.println(ai.getAndAdd(<span class="num">10</span>));
<span class="cls">System</span>.out.println(ai.get());`,
    options: ["5\n7\n7\n17", "5\n7\n17\n17", "6\n7\n7\n17", "Compilation error"],
    answer: 0,
    explanation: "getAndIncrement(): returns 5 THEN increments to 6. incrementAndGet(): increments to 7 THEN returns 7. getAndAdd(10): returns 7 THEN adds to get 17. get(): 17. Result: '5\\n7\\n7\\n17'."
  },
  {
    id: 1530, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"red"</span>,<span class="str">"green"</span>,<span class="str">"blue"</span>)
    .map(s -> <span class="cls">Map</span>.entry(s, s.length()))
    .sorted(<span class="cls">Map</span>.<span class="cls">Entry</span>.&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt;comparingByValue().reversed())
    .map(<span class="cls">Map</span>.<span class="cls">Entry</span>::getKey)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[green, blue, red]", "[red, blue, green]", "[green, red, blue]", "Compilation error"],
    answer: 0,
    explanation: "Map entries: red→3, green→5, blue→4. comparingByValue().reversed(): descending by length. green(5) > blue(4) > red(3). Collect keys: [green, blue, red]. Result: '[green, blue, red]'."
  },
  {
    id: 1531, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Converter</span>&lt;F, T&gt; {
    <span class="kw">private final</span> <span class="cls">Function</span>&lt;F, T&gt; fn;
    <span class="cls">Converter</span>(<span class="cls">Function</span>&lt;F, T&gt; fn) { <span class="kw">this</span>.fn = fn; }
    T convert(F from) { <span class="kw">return</span> fn.apply(from); }
    &lt;R&gt; <span class="cls">Converter</span>&lt;F, R&gt; andThen(<span class="cls">Function</span>&lt;T, R&gt; after) {
        <span class="kw">return new</span> <span class="cls">Converter</span>&lt;&gt;(from -> after.apply(fn.apply(from)));
    }
}
<span class="kw">var</span> c = <span class="kw">new</span> <span class="cls">Converter</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt;(<span class="cls">String</span>::length)
    .andThen(n -> n * n);
<span class="cls">System</span>.out.println(c.convert(<span class="str">"Java"</span>));`,
    options: ["16", "4", "8", "Compilation error"],
    answer: 0,
    explanation: "'Java'.length()=4. Then 4*4=16. Result: '16'."
  },
  {
    id: 1532, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">PriorityQueue</span>&lt;<span class="cls">Integer</span>&gt; pq = <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;(
    <span class="cls">Comparator</span>.reverseOrder()
);
pq.addAll(<span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">1</span>,<span class="num">4</span>,<span class="num">1</span>,<span class="num">5</span>,<span class="num">9</span>));
<span class="kw">while</span> (!pq.isEmpty()) <span class="cls">System</span>.out.print(pq.poll() + <span class="str">" "</span>);`,
    options: ["9 5 4 3 1 1 ", "1 1 3 4 5 9 ", "9 5 3 4 1 1 ", "Compilation error"],
    answer: 0,
    explanation: "PriorityQueue with reverseOrder() = max-heap. poll() always returns the largest element. Order: 9,5,4,3,1,1. Result: '9 5 4 3 1 1 '."
  },
  {
    id: 1533, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"one"</span>,<span class="str">"two"</span>,<span class="str">"three"</span>,<span class="str">"four"</span>,<span class="str">"five"</span>)
    .dropWhile(s -> s.length() <= <span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[three, four, five]", "[four, five]", "[one, two]", "Compilation error"],
    answer: 0,
    explanation: "dropWhile: drops elements while condition is true. 'one'(3<=3→drop), 'two'(3<=3→drop), 'three'(5>3→stop dropping). Keeps 'three','four','five'. Result: '[three, four, five]'."
  },
  {
    id: 1534, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Describable</span> {
    <span class="kw">default</span> <span class="cls">String</span> describe() {
        <span class="kw">return</span> <span class="str">"I am a "</span> + getClass().getSimpleName();
    }
}
<span class="kw">record</span> <span class="cls">Cat</span>(<span class="cls">String</span> name) <span class="kw">implements</span> <span class="cls">Describable</span> {}
<span class="kw">record</span> <span class="cls">Dog</span>(<span class="cls">String</span> name) <span class="kw">implements</span> <span class="cls">Describable</span> {}
<span class="cls">List</span>.&lt;<span class="cls">Describable</span>&gt;of(<span class="kw">new</span> <span class="cls">Cat</span>(<span class="str">"Whiskers"</span>), <span class="kw">new</span> <span class="cls">Dog</span>(<span class="str">"Rex"</span>))
    .forEach(d -> <span class="cls">System</span>.out.println(d.describe()));`,
    options: ["I am a Cat\nI am a Dog", "I am a Describable\nI am a Describable", "Cat\nDog", "Compilation error"],
    answer: 0,
    explanation: "describe() uses getClass().getSimpleName(). For Cat instance: 'Cat'. For Dog instance: 'Dog'. Default method calls getClass() on the actual runtime type. Result: 'I am a Cat\\nI am a Dog'."
  },
  {
    id: 1535, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; zip(<span class="cls">List</span>&lt;T&gt; a, <span class="cls">List</span>&lt;T&gt; b, <span class="cls">BinaryOperator</span>&lt;T&gt; op) {
    <span class="kw">int</span> n = <span class="cls">Math</span>.min(a.size(), b.size());
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(n);
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < n; i++) r.add(op.apply(a.get(i), b.get(i)));
    <span class="kw">return</span> r;
}
<span class="cls">System</span>.out.println(zip(
    <span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>), <span class="cls">List</span>.of(<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>), <span class="cls">Integer</span>::sum
));`,
    options: ["[11, 22, 33]", "[1, 2, 3, 10, 20, 30]", "[10, 20, 30]", "Compilation error"],
    answer: 0,
    explanation: "zip pairwise with sum: (1+10,2+20,3+30)=[11,22,33]. Result: '[11, 22, 33]'."
  },
  {
    id: 1536, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>,<span class="str">"dog"</span>,<span class="str">"bird"</span>,<span class="str">"fish"</span>)
    .map(<span class="cls">String</span>::toUpperCase)
    .filter(s -> s.contains(<span class="str">"I"</span>))
    .sorted()
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["BIRD, FISH", "FISH, BIRD", "bird, fish", "Compilation error"],
    answer: 0,
    explanation: "toUpperCase: CAT,DOG,BIRD,FISH. filter(contains 'I'): BIRD,FISH. sorted(): BIRD < FISH. joining: 'BIRD, FISH'. Result: 'BIRD, FISH'."
  },
  {
    id: 1537, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">int</span> parse(<span class="cls">String</span> s) {
    <span class="kw">try</span> {
        <span class="kw">return</span> <span class="cls">Integer</span>.parseInt(s);
    } <span class="kw">catch</span> (<span class="cls">NumberFormatException</span> e) {
        <span class="kw">return</span> -<span class="num">1</span>;
    }
}
<span class="cls">System</span>.out.println(parse(<span class="str">"42"</span>));
<span class="cls">System</span>.out.println(parse(<span class="str">"3.14"</span>));
<span class="cls">System</span>.out.println(parse(<span class="str">"-99"</span>));`,
    options: ["42\n-1\n-99", "42\n3\n-99", "42\n-1\n1", "Compilation error"],
    answer: 0,
    explanation: "parseInt('42')=42. parseInt('3.14') throws NFE → -1. parseInt('-99')=-99. Result: '42\\n-1\\n-99'."
  },
  {
    id: 1538, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Stack</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Deque</span>&lt;T&gt; deque = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
    <span class="kw">void</span>    push(T t)  { deque.push(t); }
    T       pop()     { <span class="kw">return</span> deque.pop(); }
    T       peek()    { <span class="kw">return</span> deque.peek(); }
    <span class="kw">boolean</span> isEmpty() { <span class="kw">return</span> deque.isEmpty(); }
}
<span class="cls">Stack</span>&lt;<span class="cls">String</span>&gt; s = <span class="kw">new</span> <span class="cls">Stack</span>&lt;&gt;();
s.push(<span class="str">"a"</span>); s.push(<span class="str">"b"</span>); s.push(<span class="str">"c"</span>);
<span class="cls">System</span>.out.println(s.peek());
<span class="cls">System</span>.out.println(s.pop());
<span class="cls">System</span>.out.println(s.peek());`,
    options: ["c\nc\nb", "a\na\nb", "c\nb\na", "Compilation error"],
    answer: 0,
    explanation: "Stack (LIFO): push a,b,c. Top=c. peek()='c' (no remove). pop()='c' (removes). peek()='b' (now top). Result: 'c\\nc\\nb'."
  },
  {
    id: 1539, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">UnaryOperator</span>&lt;<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt;&gt; doubleAll =
    list -> list.stream().map(n -> n * <span class="num">2</span>).collect(<span class="cls">Collectors</span>.toList());
<span class="cls">UnaryOperator</span>&lt;<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt;&gt; filterOdd =
    list -> list.stream().filter(n -> n % <span class="num">2</span> != <span class="num">0</span>).collect(<span class="cls">Collectors</span>.toList());
<span class="kw">var</span> r = doubleAll.andThen(filterOdd).apply(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["[]", "[2, 4, 6, 8, 10]", "[1, 3, 5]", "Compilation error"],
    answer: 0,
    explanation: "doubleAll: [1,2,3,4,5]→[2,4,6,8,10]. Then filterOdd on [2,4,6,8,10]: all even → no odds → []. Result: '[]'."
  },
  {
    id: 1540, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"bb"</span>,<span class="str">"ccc"</span>,<span class="str">"dd"</span>,<span class="str">"e"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">String</span>::length,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>,
        <span class="cls">Collectors</span>.toList()
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["{1=[a, e], 2=[bb, dd], 3=[ccc]}", "{3=[ccc], 2=[bb, dd], 1=[a, e]}", "{1=[a], 2=[bb], 3=[ccc]}", "Compilation error"],
    answer: 0,
    explanation: "groupingBy(length, TreeMap::new, toList()): TreeMap sorts keys numerically. 1→[a,e], 2→[bb,dd], 3→[ccc]. Result: '{1=[a, e], 2=[bb, dd], 3=[ccc]}'."
  },
  {
    id: 1541, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Cloneable2</span>&lt;T&gt; { T copy(); }
<span class="kw">record</span> <span class="cls">Config</span>(<span class="cls">String</span> host, <span class="kw">int</span> port) <span class="kw">implements</span> <span class="cls">Cloneable2</span>&lt;<span class="cls">Config</span>&gt; {
    <span class="kw">public</span> <span class="cls">Config</span> copy() { <span class="kw">return new</span> <span class="cls">Config</span>(host, port); }
    <span class="cls">Config</span> withPort(<span class="kw">int</span> p) { <span class="kw">return new</span> <span class="cls">Config</span>(host, p); }
}
<span class="cls">Config</span> c1 = <span class="kw">new</span> <span class="cls">Config</span>(<span class="str">"localhost"</span>, <span class="num">8080</span>);
<span class="cls">Config</span> c2 = c1.withPort(<span class="num">9090</span>);
<span class="cls">Config</span> c3 = c1.copy();
<span class="cls">System</span>.out.println(c1.equals(c3));
<span class="cls">System</span>.out.println(c1.equals(c2));
<span class="cls">System</span>.out.println(c1 == c3);`,
    options: ["true\nfalse\nfalse", "true\ntrue\ntrue", "false\nfalse\nfalse", "Compilation error"],
    answer: 0,
    explanation: "c1=Config(localhost,8080). c2=Config(localhost,9090). c3=new Config(localhost,8080). Record equals compares components: c1.equals(c3)=true (same host,port). c1.equals(c2)=false (different port). c1==c3: different objects → false. Result: 'true\\nfalse\\nfalse'."
  },
  {
    id: 1542, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(
    <span class="cls">Map</span>.entry(<span class="str">"a"</span>,<span class="num">1</span>), <span class="cls">Map</span>.entry(<span class="str">"b"</span>,<span class="num">2</span>), <span class="cls">Map</span>.entry(<span class="str">"c"</span>,<span class="num">3</span>)
).collect(<span class="cls">Collectors</span>.toMap(
    <span class="cls">Map</span>.<span class="cls">Entry</span>::getKey,
    <span class="cls">Map</span>.<span class="cls">Entry</span>::getValue,
    (<span class="kw">a</span>,<span class="kw">b</span>) -> a,
    <span class="cls">LinkedHashMap</span>::<span class="kw">new</span>
));
<span class="cls">System</span>.out.println(r);`,
    options: ["{a=1, b=2, c=3}", "{c=3, b=2, a=1}", "{a=1}", "Compilation error"],
    answer: 0,
    explanation: "toMap with LinkedHashMap supplier preserves insertion order. No key conflicts. Result: '{a=1, b=2, c=3}'."
  },
  {
    id: 1543, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Observable</span>&lt;T&gt; {
    <span class="kw">private</span> T value;
    <span class="kw">private</span> <span class="cls">Consumer</span>&lt;T&gt; listener;
    <span class="cls">Observable</span>(T v) { value = v; }
    <span class="kw">void</span> observe(<span class="cls">Consumer</span>&lt;T&gt; l) { listener = l; }
    <span class="kw">void</span> set(T v) {
        value = v;
        <span class="kw">if</span> (listener != <span class="kw">null</span>) listener.accept(v);
    }
    T get() { <span class="kw">return</span> value; }
}
<span class="cls">Observable</span>&lt;<span class="cls">Integer</span>&gt; obs = <span class="kw">new</span> <span class="cls">Observable</span>&lt;&gt;(<span class="num">0</span>);
obs.observe(v -> <span class="cls">System</span>.out.print(<span class="str">"changed:"</span> + v + <span class="str">" "</span>));
obs.set(<span class="num">1</span>);
obs.set(<span class="num">2</span>);
<span class="cls">System</span>.out.println(obs.get());`,
    options: ["changed:1 changed:2 2", "changed:1 changed:2 0", "0 changed:1 changed:2", "Compilation error"],
    answer: 0,
    explanation: "set(1): value=1, listener prints 'changed:1 '. set(2): value=2, listener prints 'changed:2 '. get()=2. println(2). Result: 'changed:1 changed:2 2'."
  },
  {
    id: 1544, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>,<span class="str">"d"</span>)
    .collect(<span class="cls">Collectors</span>.toUnmodifiableList());
<span class="cls">System</span>.out.println(r.contains(<span class="str">"c"</span>));
<span class="cls">System</span>.out.println(r.indexOf(<span class="str">"b"</span>));
<span class="cls">System</span>.out.println(r.subList(<span class="num">1</span>,<span class="num">3</span>));`,
    options: ["true\n1\n[b, c]", "true\n2\n[b, c]", "false\n1\n[b, c]", "Compilation error"],
    answer: 0,
    explanation: "Unmodifiable list can still be READ. contains('c')=true. indexOf('b')=1 (a0,b1). subList(1,3)=[b,c]. Result: 'true\\n1\\n[b, c]'."
  },
  {
    id: 1545, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Pipe</span>&lt;T&gt; {
    T process(T input);
    <span class="kw">default</span> <span class="cls">Pipe</span>&lt;T&gt; then(<span class="cls">Pipe</span>&lt;T&gt; next) {
        <span class="kw">return</span> input -> next.process(process(input));
    }
}
<span class="cls">Pipe</span>&lt;<span class="cls">String</span>&gt; trim  = <span class="cls">String</span>::trim;
<span class="cls">Pipe</span>&lt;<span class="cls">String</span>&gt; upper = <span class="cls">String</span>::toUpperCase;
<span class="cls">Pipe</span>&lt;<span class="cls">String</span>&gt; excl  = s -> s + <span class="str">"!"</span>;
<span class="cls">Pipe</span>&lt;<span class="cls">String</span>&gt; p = trim.then(upper).then(excl);
<span class="cls">System</span>.out.println(p.process(<span class="str">"  hello  "</span>));`,
    options: ["HELLO!", "  HELLO  !", "hello!", "Compilation error"],
    answer: 0,
    explanation: "trim.then(upper).then(excl): '  hello  ' → trim → 'hello' → toUpperCase → 'HELLO' → +'!' → 'HELLO!'. Result: 'HELLO!'."
  },
  {
    id: 1546, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .summaryStatistics();
<span class="cls">System</span>.out.println(r.getCount() + <span class="str">" "</span> + r.getMin() + <span class="str">" "</span>
    + r.getMax() + <span class="str">" "</span> + r.getSum());`,
    options: ["5 1 5 15", "5 1 5 3", "15 1 5 5", "Compilation error"],
    answer: 0,
    explanation: "summaryStatistics(): count=5, min=1, max=5, sum=15. Result: '5 1 5 15'."
  },
  {
    id: 1547, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Accumulator</span> {
    <span class="kw">int</span> value = <span class="num">0</span>;
    <span class="cls">Accumulator</span> add(<span class="kw">int</span> n) { value += n; <span class="kw">return this</span>; }
}
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Function</span>&lt;<span class="cls">Accumulator</span>, <span class="cls">Accumulator</span>&gt;&gt; step =
    n -> acc -> acc.add(n);
<span class="cls">Accumulator</span> a = <span class="kw">new</span> <span class="cls">Accumulator</span>();
<span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>).forEach(n -> step.apply(n).apply(a));
<span class="cls">System</span>.out.println(a.value);`,
    options: ["15", "0", "5", "Compilation error"],
    answer: 0,
    explanation: "step.apply(n).apply(a): for each n, calls a.add(n). Mutates a.value: 0+1+2+3+4+5=15. Result: '15'."
  },
  {
    id: 1548, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.of(<span class="num">5</span>,<span class="num">3</span>,<span class="num">8</span>,<span class="num">1</span>,<span class="num">9</span>,<span class="num">2</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.toMap(
        n -> n,
        n -> n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>,
        (a,b) -> a,
        <span class="cls">TreeMap</span>::<span class="kw">new</span>
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["{1=odd, 2=even, 3=odd, 5=odd, 8=even, 9=odd}", "{5=odd, 3=odd, 8=even, 1=odd, 9=odd, 2=even}", "{1=odd, 2=even, 3=odd}", "Compilation error"],
    answer: 0,
    explanation: "toMap: key=n, value=even/odd. TreeMap sorts by key. All 6 values: 1=odd,2=even,3=odd,5=odd,8=even,9=odd. Result: '{1=odd, 2=even, 3=odd, 5=odd, 8=even, 9=odd}'."
  },
  {
    id: 1549, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">TypeDetector</span> {
    <span class="kw">static</span> <span class="cls">String</span> detect(<span class="cls">Object</span> o) {
        <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">Integer</span> i)  <span class="kw">return</span> <span class="str">"int:"</span>+i;
        <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">Long</span> l)     <span class="kw">return</span> <span class="str">"long:"</span>+l;
        <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">Double</span> d)   <span class="kw">return</span> <span class="str">"double:"</span>+d;
        <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">String</span> s)   <span class="kw">return</span> <span class="str">"string:"</span>+s.length();
        <span class="kw">return</span> <span class="str">"other"</span>;
    }
}
<span class="cls">System</span>.out.println(<span class="cls">TypeDetector</span>.detect(<span class="num">42</span>));
<span class="cls">System</span>.out.println(<span class="cls">TypeDetector</span>.detect(<span class="num">42L</span>));
<span class="cls">System</span>.out.println(<span class="cls">TypeDetector</span>.detect(<span class="num">3.14</span>));
<span class="cls">System</span>.out.println(<span class="cls">TypeDetector</span>.detect(<span class="str">"Java"</span>));`,
    options: ["int:42\nlong:42\ndouble:3.14\nstring:4", "int:42\nint:42\ndouble:3.14\nstring:4", "int:42\nlong:42\ndouble:3.14\nstring:Java", "Compilation error"],
    answer: 0,
    explanation: "42 autoboxes to Integer → 'int:42'. 42L → Long → 'long:42'. 3.14 → Double → 'double:3.14'. 'Java'.length()=4 → 'string:4'. Result: 'int:42\\nlong:42\\ndouble:3.14\\nstring:4'."
  },
  {
    id: 1550, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>
    .iterate(<span class="num">0</span>, n -> n < <span class="num">20</span>, n -> n + <span class="num">3</span>)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[0, 6, 12, 18]", "[0, 3, 6, 9, 12, 15, 18]", "[6, 12, 18]", "Compilation error"],
    answer: 0,
    explanation: "iterate(0, n<20, n+3): [0,3,6,9,12,15,18]. filter(even): 0(even),3(odd),6(even),9(odd),12(even),15(odd),18(even) → [0,6,12,18]. Result: '[0, 6, 12, 18]'."
  }
];
