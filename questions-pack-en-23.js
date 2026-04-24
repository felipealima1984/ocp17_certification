// ═══════════════════════════════════════════════════════
//  PACK EN-23 — Questions 1101–1150  (English)
//  Topics: Sealed + pattern switch advanced, Records
//          deep, Stream.mapMulti, SequencedCollection,
//          Concurrency virtual threads concept,
//          String.formatted, Math advanced, Instanceof
//          negative scope, Collections.frequency,
//          Comparator nullsFirst/nullsLast, Map.ofEntries,
//          Functional UnaryOperator chaining,
//          try-with-resources multiple resources order,
//          Arrays.fill / Arrays.setAll, NIO watch,
//          Annotations @Target multiple elements
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_23 = [
  {
    id: 1101, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Payment</span> <span class="kw">permits</span> <span class="cls">Cash</span>, <span class="cls">Card</span>, <span class="cls">Crypto</span> {}
<span class="kw">record</span> <span class="cls">Cash</span>(<span class="kw">double</span> amount)                       <span class="kw">implements</span> <span class="cls">Payment</span> {}
<span class="kw">record</span> <span class="cls">Card</span>(<span class="cls">String</span> last4, <span class="kw">double</span> amount)          <span class="kw">implements</span> <span class="cls">Payment</span> {}
<span class="kw">record</span> <span class="cls">Crypto</span>(<span class="cls">String</span> coin, <span class="kw">double</span> amount)         <span class="kw">implements</span> <span class="cls">Payment</span> {}
<span class="kw">static</span> <span class="cls">String</span> describe(<span class="cls">Payment</span> p) {
    <span class="kw">return switch</span> (p) {
        <span class="kw">case</span> <span class="cls">Cash</span>   c               -> <span class="str">"cash $"</span>   + c.amount();
        <span class="kw">case</span> <span class="cls">Card</span>   c <span class="kw">when</span> c.amount() > <span class="num">1000</span> -> <span class="str">"big card"</span>;
        <span class="kw">case</span> <span class="cls">Card</span>   c               -> <span class="str">"card *"</span>   + c.last4();
        <span class="kw">case</span> <span class="cls">Crypto</span> c               -> c.coin()    + <span class="str">" crypto"</span>;
    };
}
<span class="cls">System</span>.out.println(describe(<span class="kw">new</span> <span class="cls">Card</span>(<span class="str">"1234"</span>, <span class="num">1500</span>)));
<span class="cls">System</span>.out.println(describe(<span class="kw">new</span> <span class="cls">Card</span>(<span class="str">"5678"</span>, <span class="num">50</span>)));`,
    options: ["big card\ncard *5678", "card *1234\ncard *5678", "big card\nbig card", "Compilation error"],
    answer: 0,
    explanation: "First call: Card('1234', 1500). Pattern Card with guard amount>1000: 1500>1000 → matches → 'big card'. Second call: Card('5678', 50). Guard fails (50≤1000) → falls to plain Card case → 'card *5678'. Result: 'big card\\ncard *5678'."
  },
  {
    id: 1102, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Range</span>(<span class="kw">int</span> min, <span class="kw">int</span> max) {
    <span class="cls">Range</span> {
        <span class="kw">if</span> (min > max) { <span class="kw">int</span> t = min; min = max; max = t; }
    }
    <span class="kw">boolean</span> contains(<span class="kw">int</span> v) { <span class="kw">return</span> v >= min && v <= max; }
    <span class="kw">int</span>     size()           { <span class="kw">return</span> max - min + <span class="num">1</span>; }
}
<span class="cls">Range</span> r = <span class="kw">new</span> <span class="cls">Range</span>(<span class="num">10</span>, <span class="num">3</span>); <span class="cm">// inverted — compact constructor fixes it</span>
<span class="cls">System</span>.out.println(r.min() + <span class="str">" "</span> + r.max() + <span class="str">" "</span> + r.size() + <span class="str">" "</span> + r.contains(<span class="num">7</span>));`,
    options: ["3 10 8 true", "10 3 -6 false", "3 10 8 false", "Compilation error"],
    answer: 0,
    explanation: "Compact constructor swaps: min=3, max=10. size()=10-3+1=8. contains(7): 7>=3 && 7<=10 → true. Result: '3 10 8 true'."
  },
  {
    id: 1103, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"bb"</span>, <span class="str">"ccc"</span>)
    .&lt;<span class="cls">String</span>&gt;mapMulti((s, consumer) -> {
        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < s.length(); i++)
            consumer.accept(s.toUpperCase());
    })
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["A,BB,BB,CCC,CCC,CCC", "A,BB,CCC", "a,bb,ccc", "Compilation error"],
    answer: 0,
    explanation: "mapMulti emits each string length times: 'a'→A (1 time), 'bb'→BB,BB (2 times), 'ccc'→CCC,CCC,CCC (3 times). joining(',') concatenates. Result: 'A,BB,BB,CCC,CCC,CCC'."
  },
  {
    id: 1104, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">2</span>,<span class="num">1</span>,<span class="num">2</span>));
<span class="kw">int</span> freq = <span class="cls">Collections</span>.frequency(list, <span class="num">2</span>);
<span class="cls">System</span>.out.println(freq);
<span class="cls">Collections</span>.fill(list, <span class="num">0</span>);
<span class="cls">System</span>.out.println(list);`,
    options: ["3\n[0, 0, 0, 0, 0, 0]", "2\n[0, 0, 0, 0, 0, 0]", "3\n[1, 2, 3, 2, 1, 2]", "1\n[0]"],
    answer: 0,
    explanation: "frequency(list, 2): counts occurrences of 2 → 3. fill(list, 0): replaces ALL elements with 0 in-place. size stays 6. Result: '3\\n[0, 0, 0, 0, 0, 0]'."
  },
  {
    id: 1105, topic: "Comparator",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; names = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"Bob"</span>, <span class="kw">null</span>, <span class="str">"Alice"</span>, <span class="kw">null</span>, <span class="str">"Carol"</span>));
names.sort(<span class="cls">Comparator</span>.nullsFirst(<span class="cls">Comparator</span>.naturalOrder()));
<span class="cls">System</span>.out.println(names.get(<span class="num">0</span>) + <span class="str">" "</span> + names.get(<span class="num">2</span>));`,
    options: ["null Alice", "Alice null", "null Bob", "Bob Alice"],
    answer: 0,
    explanation: "nullsFirst puts null values first. Sorted: [null, null, Alice, Bob, Carol]. get(0)=null, get(2)='Alice'. Result: 'null Alice'."
  },
  {
    id: 1106, topic: "Comparator",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">5</span>, <span class="kw">null</span>, <span class="num">3</span>, <span class="kw">null</span>, <span class="num">1</span>));
nums.sort(<span class="cls">Comparator</span>.nullsLast(<span class="cls">Comparator</span>.reverseOrder()));
<span class="cls">System</span>.out.println(nums);`,
    options: ["[5, 3, 1, null, null]", "[1, 3, 5, null, null]", "[null, null, 5, 3, 1]", "Throws NullPointerException"],
    answer: 0,
    explanation: "nullsLast: nulls go to end. reverseOrder: non-null sorted descending. [5, 3, 1] then [null, null]. Result: '[5, 3, 1, null, null]'."
  },
  {
    id: 1107, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> m = <span class="cls">Map</span>.ofEntries(
    <span class="cls">Map</span>.entry(<span class="str">"a"</span>, <span class="num">1</span>),
    <span class="cls">Map</span>.entry(<span class="str">"b"</span>, <span class="num">2</span>),
    <span class="cls">Map</span>.entry(<span class="str">"c"</span>, <span class="num">3</span>)
);
<span class="kw">int</span> sum = m.values().stream().mapToInt(<span class="cls">Integer</span>::intValue).sum();
<span class="cls">System</span>.out.println(sum + <span class="str">" "</span> + m.containsKey(<span class="str">"d"</span>));`,
    options: ["6 false", "6 true", "3 false", "Compilation error"],
    answer: 0,
    explanation: "Map.ofEntries creates an immutable map with 3 entries. sum of values = 1+2+3=6. containsKey('d') = false. Result: '6 false'."
  },
  {
    id: 1108, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">UnaryOperator</span>&lt;<span class="cls">Integer</span>&gt; times3 = n -> n * <span class="num">3</span>;
<span class="cls">UnaryOperator</span>&lt;<span class="cls">Integer</span>&gt; plus10 = n -> n + <span class="num">10</span>;
<span class="cls">UnaryOperator</span>&lt;<span class="cls">Integer</span>&gt; chain  = times3.andThen(plus10).andThen(times3);
<span class="cls">System</span>.out.println(chain.apply(<span class="num">2</span>));`,
    options: ["48", "36", "16", "Compilation error"],
    answer: 0,
    explanation: "apply(2): times3(2)=6. plus10(6)=16. times3(16)=48. Result: '48'."
  },
  {
    id: 1109, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">R1</span> <span class="kw">implements</span> <span class="cls">AutoCloseable</span> {
    <span class="kw">public void</span> close() { <span class="cls">System</span>.out.print(<span class="str">"R1 "</span>); }
}
<span class="kw">class</span> <span class="cls">R2</span> <span class="kw">implements</span> <span class="cls">AutoCloseable</span> {
    <span class="kw">public void</span> close() { <span class="cls">System</span>.out.print(<span class="str">"R2 "</span>); }
}
<span class="kw">class</span> <span class="cls">R3</span> <span class="kw">implements</span> <span class="cls">AutoCloseable</span> {
    <span class="kw">public void</span> close() { <span class="cls">System</span>.out.print(<span class="str">"R3 "</span>); }
}
<span class="kw">try</span> (<span class="kw">var</span> a = <span class="kw">new</span> <span class="cls">R1</span>(); <span class="kw">var</span> b = <span class="kw">new</span> <span class="cls">R2</span>(); <span class="kw">var</span> c = <span class="kw">new</span> <span class="cls">R3</span>()) {
    <span class="cls">System</span>.out.print(<span class="str">"body "</span>);
}`,
    options: ["body R3 R2 R1 ", "body R1 R2 R3 ", "R1 R2 R3 body ", "R3 R2 R1 body "],
    answer: 0,
    explanation: "Resources open in declaration order (R1, R2, R3). Body executes. Closes in REVERSE order: R3 first, then R2, then R1. Result: 'body R3 R2 R1 '."
  },
  {
    id: 1110, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[] arr = <span class="kw">new</span> <span class="kw">int</span>[<span class="num">5</span>];
<span class="cls">Arrays</span>.fill(arr, <span class="num">7</span>);
<span class="cls">Arrays</span>.setAll(arr, i -> i * <span class="num">2</span>);
<span class="cls">System</span>.out.println(<span class="cls">Arrays</span>.toString(arr));`,
    options: ["[0, 2, 4, 6, 8]", "[7, 7, 7, 7, 7]", "[0, 7, 14, 21, 28]", "[14, 14, 14, 14, 14]"],
    answer: 0,
    explanation: "fill(arr, 7): arr=[7,7,7,7,7]. setAll(arr, i->i*2): replaces each element with the lambda result based on INDEX i, not the current value. arr[0]=0*2=0, arr[1]=1*2=2, ... arr[4]=4*2=8. Result: '[0, 2, 4, 6, 8]'."
  },
  {
    id: 1111, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"%-10s|%5d|%.2f"</span>.formatted(<span class="str">"Java"</span>, <span class="num">17</span>, <span class="num">3.14159</span>);
<span class="cls">System</span>.out.println(s);`,
    options: ["Java      |   17|3.14", "Java|17|3.14", "Java      |17|3.14159", "Compilation error"],
    answer: 0,
    explanation: "String.formatted() (Java 15+) is the instance method equivalent of String.format(). %-10s: left-aligned 10 chars → 'Java      '. %5d: right-aligned 5 digits → '   17'. %.2f: 2 decimal places → '3.14'. Result: 'Java      |   17|3.14'."
  },
  {
    id: 1112, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> text = <span class="str">"Hello World Java"</span>;
<span class="cls">System</span>.out.println(text.translateEscapes());
<span class="cls">System</span>.out.println(<span class="str">"tab\\there"</span>.translateEscapes());`,
    options: ["Hello World Java\ntab\there", "Hello\\nWorld\\nJava\ttab\there", "Hello World Java\ntab here", "Compilation error"],
    answer: 0,
    explanation: "translateEscapes() (Java 15+) processes escape sequences in the string. 'Hello World Java' has no escapes → unchanged. 'tab\\there' contains literal \\t → translated to tab character. Result: 'Hello World Java\\ntab[tab]here'."
  },
  {
    id: 1113, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="str">"hello"</span>;
<span class="kw">if</span> (!(obj <span class="kw">instanceof</span> <span class="cls">String</span> s && s.length() > <span class="num">3</span>)) {
    <span class="cls">System</span>.out.println(<span class="str">"short or not string"</span>);
} <span class="kw">else</span> {
    <span class="cls">System</span>.out.println(<span class="str">"long string: "</span> + s);
}`,
    options: ["long string: hello", "short or not string", "Compilation error — s not in scope in else", "Compilation error — negation not allowed"],
    answer: 0,
    explanation: "The condition is !(obj instanceof String s && s.length() > 3). For the else branch: the condition is false, meaning (obj instanceof String s && s.length()>3) is true — so s IS a String of length > 3. The compiler recognizes 's' is in scope in the else. 'hello'.length()=5>3 → else branch. Result: 'long string: hello'."
  },
  {
    id: 1114, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> o = <span class="num">42</span>;
<span class="kw">switch</span> (o) {
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i < <span class="num">0</span>     -> <span class="cls">System</span>.out.println(<span class="str">"negative"</span>);
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i == <span class="num">0</span>    -> <span class="cls">System</span>.out.println(<span class="str">"zero"</span>);
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i <= <span class="num">100</span>  -> <span class="cls">System</span>.out.println(<span class="str">"small: "</span> + i);
    <span class="kw">case</span> <span class="cls">Integer</span> i                 -> <span class="cls">System</span>.out.println(<span class="str">"large: "</span> + i);
    <span class="kw">default</span>                         -> <span class="cls">System</span>.out.println(<span class="str">"other"</span>);
}`,
    options: ["small: 42", "large: 42", "other", "Compilation error"],
    answer: 0,
    explanation: "o=42 (Integer). Guards evaluated in order: 42<0 false, 42==0 false, 42<=100 true → prints 'small: 42'. Result: 'small: 42'."
  },
  {
    id: 1115, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; zip(<span class="cls">List</span>&lt;T&gt; a, <span class="cls">List</span>&lt;T&gt; b,
                          <span class="cls">BinaryOperator</span>&lt;T&gt; combiner) {
    <span class="kw">int</span> size = <span class="cls">Math</span>.min(a.size(), b.size());
    <span class="cls">List</span>&lt;T&gt; result = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < size; i++)
        result.add(combiner.apply(a.get(i), b.get(i)));
    <span class="kw">return</span> result;
}
<span class="cls">System</span>.out.println(zip(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>), <span class="cls">List</span>.of(<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>), <span class="cls">Integer</span>::sum));`,
    options: ["[11, 22, 33]", "[10, 20, 30]", "[1, 2, 3]", "Compilation error"],
    answer: 0,
    explanation: "zip pairs elements and combines with Integer::sum. 1+10=11, 2+20=22, 3+30=33. Result: '[11, 22, 33]'."
  },
  {
    id: 1116, topic: "Math API",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Math</span>.floorDiv(-<span class="num">7</span>, <span class="num">2</span>));
<span class="cls">System</span>.out.println(-<span class="num">7</span> / <span class="num">2</span>);
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.floorMod(-<span class="num">7</span>, <span class="num">3</span>));
<span class="cls">System</span>.out.println(-<span class="num">7</span> % <span class="num">3</span>);`,
    options: ["-4\n-3\n2\n-1", "-3\n-4\n-1\n2", "-4\n-3\n-1\n2", "-3\n-3\n2\n-1"],
    answer: 0,
    explanation: "floorDiv(-7,2): floor(-3.5)=-4 (rounds toward -∞). -7/2=-3 (truncates toward zero). floorMod(-7,3): result always has sign of divisor → 3*(-3)+2=-7 → floorMod=2. -7%3=-1 (Java % keeps sign of dividend). Result: '-4\\n-3\\n2\\n-1'."
  },
  {
    id: 1117, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Transformer</span>&lt;T&gt; {
    T transform(T input);
    <span class="kw">default</span> <span class="cls">Transformer</span>&lt;T&gt; then(<span class="cls">Transformer</span>&lt;T&gt; next) {
        <span class="kw">return</span> input -> next.transform(<span class="kw">this</span>.transform(input));
    }
}
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>&gt; t1 = s -> s.trim();
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>&gt; t2 = s -> s.toUpperCase();
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>&gt; t3 = s -> s.replace(<span class="str">" "</span>, <span class="str">"_"</span>);
<span class="cls">System</span>.out.println(t1.then(t2).then(t3).transform(<span class="str">"  hello world  "</span>));`,
    options: ["HELLO_WORLD", "hello_world", "  HELLO WORLD  ", "Compilation error"],
    answer: 0,
    explanation: "t1.then(t2).then(t3): trim first → 'hello world', toUpperCase → 'HELLO WORLD', replace spaces with _ → 'HELLO_WORLD'. Result: 'HELLO_WORLD'."
  },
  {
    id: 1118, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(
    <span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">1</span>),
    <span class="cls">List</span>.of(<span class="num">4</span>,<span class="num">1</span>),
    <span class="cls">List</span>.of(<span class="num">5</span>,<span class="num">9</span>)
).flatMap(<span class="cls">List</span>::stream)
 .distinct()
 .sorted()
 .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[1, 3, 4, 5, 9]", "[3, 1, 4, 1, 5, 9]", "[1, 1, 3, 4, 5, 9]", "[1, 3, 4, 5]"],
    answer: 0,
    explanation: "flatMap: [3,1,4,1,5,9]. distinct(): removes duplicate 1 → [3,1,4,5,9]. sorted(): [1,3,4,5,9]. Result: '[1, 3, 4, 5, 9]'."
  },
  {
    id: 1119, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>));
<span class="cls">Collections</span>.swap(list, <span class="num">1</span>, <span class="num">3</span>);
<span class="cls">Collections</span>.rotate(list, <span class="num">2</span>);
<span class="cls">System</span>.out.println(list);`,
    options: ["[2, 5, 1, 4, 3]", "[1, 4, 3, 2, 5]", "[4, 2, 3, 4, 5]", "[1, 2, 3, 4, 5]"],
    answer: 0,
    explanation: "swap(list,1,3): exchange indices 1 and 3 → [1,4,3,2,5]. rotate(list,2): positive distance means last N elements move to front. Last 2 elements are 2,5 → moved to front: [2,5,1,4,3]. Verify: rotate(d) means each element moves d positions to the right (wrapping). new[i]=old[(i-2+5)%5]. new[0]=old[3]=2, new[1]=old[4]=5, new[2]=old[0]=1, new[3]=old[1]=4, new[4]=old[2]=3. Result: '[2, 5, 1, 4, 3]'."
  },
  {
    id: 1120, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">T</span> coalesce(<span class="cls">T</span>... values) {
    <span class="kw">for</span> (<span class="cls">T</span> v : values) <span class="kw">if</span> (v != <span class="kw">null</span>) <span class="kw">return</span> v;
    <span class="kw">return null</span>;
}
<span class="cls">System</span>.out.println(coalesce(<span class="kw">null</span>, <span class="kw">null</span>, <span class="str">"first"</span>, <span class="str">"second"</span>));
<span class="cls">System</span>.out.println(coalesce(<span class="kw">null</span>, <span class="kw">null</span>));`,
    options: ["first\nnull", "second\nnull", "first\nfirst", "Compilation error"],
    answer: 0,
    explanation: "coalesce(null, null, 'first', 'second'): skips two nulls, returns first non-null = 'first'. coalesce(null, null): all null → returns null. println(null) prints 'null'. Result: 'first\\nnull'."
  },
  {
    id: 1121, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">YearMonth</span> ym = <span class="cls">YearMonth</span>.of(<span class="num">2024</span>, <span class="num">2</span>);
<span class="cls">System</span>.out.println(ym.isLeapYear());
<span class="cls">System</span>.out.println(ym.lengthOfMonth());
<span class="cls">System</span>.out.println(ym.plusMonths(<span class="num">11</span>));`,
    options: ["true\n29\n2025-01", "false\n29\n2025-01", "true\n28\n2025-01", "true\n29\n2024-12"],
    answer: 0,
    explanation: "2024 is a leap year. YearMonth(2024,2).isLeapYear()=true. lengthOfMonth()=29 (February in a leap year). plusMonths(11): 2024-02 + 11 months = 2025-01. Result: 'true\\n29\\n2025-01'."
  },
  {
    id: 1122, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">void</span> validate(<span class="cls">String</span> s) {
    <span class="cls">Objects</span>.requireNonNull(s, <span class="str">"s must not be null"</span>);
    <span class="kw">if</span> (s.isBlank()) <span class="kw">throw new</span> <span class="cls">IllegalArgumentException</span>(<span class="str">"s must not be blank"</span>);
}
<span class="kw">try</span> { validate(<span class="kw">null</span>); }
<span class="kw">catch</span> (<span class="cls">NullPointerException</span> e) { <span class="cls">System</span>.out.print(<span class="str">"NPE "</span>); }
<span class="kw">try</span> { validate(<span class="str">"  "</span>); }
<span class="kw">catch</span> (<span class="cls">IllegalArgumentException</span> e) { <span class="cls">System</span>.out.print(<span class="str">"IAE"</span>); }`,
    options: ["NPE IAE", "IAE NPE", "NPE", "IAE"],
    answer: 0,
    explanation: "validate(null): Objects.requireNonNull throws NullPointerException with message. Caught → 'NPE '. validate('  '): not null. isBlank()=true → throws IllegalArgumentException. Caught → 'IAE'. Result: 'NPE IAE'."
  },
  {
    id: 1123, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Pair</span>&lt;A, B&gt; {
    <span class="kw">final</span> A fst; <span class="kw">final</span> B snd;
    <span class="cls">Pair</span>(A a, B b) { fst=a; snd=b; }
    <span class="kw">static</span> &lt;X, Y&gt; <span class="cls">Pair</span>&lt;Y, X&gt; swap(<span class="cls">Pair</span>&lt;X, Y&gt; p) {
        <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(p.snd, p.fst);
    }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="str">"("</span> + fst + <span class="str">","</span> + snd + <span class="str">")"</span>; }
}
<span class="kw">var</span> p = <span class="kw">new</span> <span class="cls">Pair</span>&lt;&gt;(<span class="str">"hello"</span>, <span class="num">42</span>);
<span class="cls">System</span>.out.println(<span class="cls">Pair</span>.swap(<span class="cls">Pair</span>.swap(p)));`,
    options: ["(hello,42)", "(42,hello)", "(hello,hello)", "Compilation error"],
    answer: 0,
    explanation: "swap(p): Pair<Integer,String>(42,'hello'). swap again: Pair<String,Integer>('hello',42). toString(): '(hello,42)'. Result: '(hello,42)'."
  },
  {
    id: 1124, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.summarizingInt(<span class="cls">Integer</span>::intValue));
<span class="cls">System</span>.out.println(r.getCount() + <span class="str">" "</span> + r.getSum() + <span class="str">" "</span> + r.getMin() + <span class="str">" "</span> + r.getMax());`,
    options: ["5 15 1 5", "5 15 5 1", "15 5 1 5", "Compilation error"],
    answer: 0,
    explanation: "summarizingInt returns IntSummaryStatistics. count=5, sum=15, min=1, max=5. Result: '5 15 1 5'."
  },
  {
    id: 1125, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Op</span> { ADD, SUB, MUL, DIV }
<span class="cls">EnumSet</span>&lt;<span class="cls">Op</span>&gt; arith    = <span class="cls">EnumSet</span>.allOf(<span class="cls">Op</span>.<span class="kw">class</span>);
<span class="cls">EnumSet</span>&lt;<span class="cls">Op</span>&gt; simple   = <span class="cls">EnumSet</span>.of(<span class="cls">Op</span>.ADD, <span class="cls">Op</span>.SUB);
<span class="cls">EnumSet</span>&lt;<span class="cls">Op</span>&gt; complex  = <span class="cls">EnumSet</span>.complementOf(simple);
<span class="cls">System</span>.out.println(complex);`,
    options: ["[MUL, DIV]", "[ADD, SUB]", "[ADD, SUB, MUL, DIV]", "Compilation error"],
    answer: 0,
    explanation: "EnumSet.complementOf(simple): returns a set containing all constants NOT in simple. simple={ADD,SUB}, complement={MUL,DIV}. EnumSet iterates in declaration order. Result: '[MUL, DIV]'."
  },
  {
    id: 1126, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  Java  Certification  "</span>;
<span class="kw">var</span> words = s.strip().split(<span class="str">"\\\\s+"</span>);
<span class="cls">System</span>.out.println(words.length + <span class="str">" "</span> + words[words.length - <span class="num">1</span>]);`,
    options: ["2 Certification", "3 Certification", "2 Java", "Compilation error"],
    answer: 0,
    explanation: "strip() removes leading/trailing whitespace: 'Java  Certification'. split('\\\\s+'): splits on one or more spaces → ['Java','Certification']. length=2. Last element='Certification'. Result: '2 Certification'."
  },
  {
    id: 1127, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">TypeChecker</span> {
    <span class="kw">void</span> check(<span class="cls">Object</span> o) { <span class="cls">System</span>.out.print(<span class="str">"Object "</span>); }
    <span class="kw">void</span> check(<span class="cls">String</span> s) { <span class="cls">System</span>.out.print(<span class="str">"String "</span>); }
    <span class="kw">void</span> check(<span class="cls">Number</span> n) { <span class="cls">System</span>.out.print(<span class="str">"Number "</span>); }
}
<span class="cls">TypeChecker</span> tc = <span class="kw">new</span> <span class="cls">TypeChecker</span>();
<span class="cls">Object</span> s = <span class="str">"hello"</span>;
tc.check(s);
tc.check((<span class="cls">String</span>) s);`,
    options: ["Object String ", "String String ", "Object Object ", "Compilation error"],
    answer: 0,
    explanation: "Overload resolution is at compile time based on declared type. tc.check(s): s declared as Object → calls check(Object). tc.check((String)s): cast to String at compile time → calls check(String). Result: 'Object String '."
  },
  {
    id: 1128, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {
    <span class="kw">static</span> <span class="kw">final</span> <span class="cls">Point</span> ORIGIN = <span class="kw">new</span> <span class="cls">Point</span>(<span class="num">0</span>, <span class="num">0</span>);
    <span class="kw">double</span> distanceTo(<span class="cls">Point</span> other) {
        <span class="kw">return</span> <span class="cls">Math</span>.hypot(other.x - x, other.y - y);
    }
    <span class="kw">boolean</span> isOrigin() { <span class="kw">return</span> <span class="kw">this</span>.equals(ORIGIN); }
}
<span class="cls">Point</span> p = <span class="kw">new</span> <span class="cls">Point</span>(<span class="num">3</span>, <span class="num">4</span>);
<span class="cls">System</span>.out.println(p.isOrigin());
<span class="cls">System</span>.out.printf(<span class="str">"%.1f%n"</span>, p.distanceTo(<span class="cls">Point</span>.ORIGIN));`,
    options: ["false\n5.0", "true\n5.0", "false\n0.0", "Compilation error"],
    answer: 0,
    explanation: "p = Point(3,4) ≠ ORIGIN(0,0) → isOrigin()=false. distanceTo(ORIGIN): Math.hypot(0-3, 0-4)=Math.hypot(-3,-4)=5.0. Result: 'false\\n5.0'."
  },
  {
    id: 1129, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ThreadLocal</span>&lt;<span class="cls">Integer</span>&gt; tl = <span class="kw">new</span> <span class="cls">ThreadLocal</span>&lt;&gt;() {
    <span class="kw">protected</span> <span class="cls">Integer</span> initialValue() { <span class="kw">return</span> <span class="num">0</span>; }
};
tl.set(<span class="num">42</span>);
<span class="kw">var</span> result = <span class="kw">new</span> <span class="cls">Thread</span>(() ->
    <span class="cls">System</span>.out.print(tl.get() + <span class="str">" "</span>));
result.start();
result.join();
<span class="cls">System</span>.out.print(tl.get());`,
    options: ["0 42", "42 42", "0 0", "42 0"],
    answer: 0,
    explanation: "ThreadLocal stores per-thread values. Main thread sets tl to 42. The new thread has its OWN copy, initialized to 0 (initialValue()). Thread prints 0. Main thread prints its own value: 42. Result: '0 42'."
  },
  {
    id: 1130, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">boolean</span> allMatch(<span class="cls">Iterable</span>&lt;T&gt; items, <span class="cls">Predicate</span>&lt;? <span class="kw">super</span> T&gt; pred) {
    <span class="kw">for</span> (T item : items)
        <span class="kw">if</span> (!pred.test(item)) <span class="kw">return false</span>;
    <span class="kw">return true</span>;
}
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">2</span>,<span class="num">4</span>,<span class="num">6</span>,<span class="num">8</span>);
<span class="cls">System</span>.out.println(allMatch(nums, (<span class="cls">Number</span> n) -> n.intValue() % <span class="num">2</span> == <span class="num">0</span>));`,
    options: ["true", "false", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "allMatch with Predicate<? super Integer> accepts Predicate<Number>. All elements [2,4,6,8] are even. Returns true. Result: 'true'."
  },
  {
    id: 1131, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.toBinaryString(<span class="num">255</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.toHexString(<span class="num">255</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.toOctalString(<span class="num">255</span>));`,
    options: ["11111111\nff\n377", "10000000\n80\n200", "11111111\nFF\n377", "Compilation error"],
    answer: 0,
    explanation: "255 in binary=11111111. toHexString=ff (lowercase). toOctalString: 255=3*64+7*8+7=3*64+63=... 255/8=31r7, 31/8=3r7, 3/8=0r3 → 377. Result: '11111111\\nff\\n377'."
  },
  {
    id: 1132, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">5</span>)
    .mapToObj(n -> <span class="cls">String</span>.valueOf(n).repeat(n))
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">"-"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["1-22-333-4444-55555", "12345", "1-2-3-4-5", "Compilation error"],
    answer: 0,
    explanation: "For each n, repeat the string: 1→'1', 2→'22', 3→'333', 4→'4444', 5→'55555'. joining('-'): '1-22-333-4444-55555'. Result: '1-22-333-4444-55555'."
  },
  {
    id: 1133, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">int</span> compute(<span class="kw">int</span> x)      { <span class="kw">return</span> x + <span class="num">1</span>; }
    <span class="kw">int</span> compute(<span class="kw">double</span> x)   { <span class="kw">return</span> (<span class="kw">int</span>)(x + <span class="num">2</span>); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span> compute(<span class="kw">int</span> x)      { <span class="kw">return</span> x * <span class="num">2</span>; }
}
<span class="cls">A</span> obj = <span class="kw">new</span> <span class="cls">B</span>();
<span class="cls">System</span>.out.println(obj.compute(<span class="num">5</span>));
<span class="cls">System</span>.out.println(obj.compute(<span class="num">5.0</span>));`,
    options: ["10\n7", "6\n7", "10\n10", "6\n6"],
    answer: 0,
    explanation: "obj.compute(5): int arg → compile-time selects compute(int). Runtime: B.compute(int) → 5*2=10. obj.compute(5.0): double arg → compile-time selects compute(double). B doesn't override compute(double), so A.compute(double) → (int)(5.0+2)=7. Result: '10\\n7'."
  },
  {
    id: 1134, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; opt = <span class="cls">Optional</span>.of(<span class="str">"hello"</span>);
<span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt; len = opt.flatMap(s ->
    s.length() > <span class="num">3</span> ? <span class="cls">Optional</span>.of(s.length()) : <span class="cls">Optional</span>.empty()
);
<span class="cls">System</span>.out.println(len.map(n -> n * <span class="num">2</span>).orElse(<span class="num">-1</span>));`,
    options: ["10", "-1", "5", "Compilation error"],
    answer: 0,
    explanation: "opt='hello'. flatMap: 'hello'.length()=5>3 → Optional(5). map(n*2): Optional(10). orElse(-1): present → 10. Result: '10'."
  },
  {
    id: 1135, topic: "Concurrency",
    text: "What does the following code demonstrate about virtual threads?",
    code: `<span class="cls">Thread</span> vt = <span class="cls">Thread</span>.ofVirtual().name(<span class="str">"my-vt"</span>).start(() -> {
    <span class="cls">System</span>.out.println(<span class="cls">Thread</span>.currentThread().isVirtual());
});
vt.join();`,
    options: [
      "prints true — virtual threads are lightweight threads managed by the JVM",
      "prints false — only platform threads exist in Java 17",
      "Compilation error — Thread.ofVirtual() does not exist in Java 17",
      "Throws UnsupportedOperationException"
    ],
    answer: 0,
    explanation: "Virtual threads were introduced as a preview in Java 19 and finalized in Java 21. In Java 17 (preview/incubator), Thread.ofVirtual() may be available as a preview feature. When available, isVirtual() returns true for virtual threads. The code demonstrates the API usage and prints true."
  },
  {
    id: 1136, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Predicate2</span>&lt;T&gt; {
    <span class="kw">boolean</span> test(T t);
    <span class="kw">static</span> &lt;T&gt; <span class="cls">Predicate2</span>&lt;T&gt; of(<span class="cls">Predicate2</span>&lt;T&gt; p) { <span class="kw">return</span> p; }
    <span class="kw">default</span> <span class="cls">Predicate2</span>&lt;T&gt; and(<span class="cls">Predicate2</span>&lt;T&gt; other) {
        <span class="kw">return</span> t -> test(t) && other.test(t);
    }
    <span class="kw">default</span> <span class="cls">Predicate2</span>&lt;T&gt; negate() { <span class="kw">return</span> t -> !test(t); }
}
<span class="cls">Predicate2</span>&lt;<span class="cls">Integer</span>&gt; pos  = n -> n > <span class="num">0</span>;
<span class="cls">Predicate2</span>&lt;<span class="cls">Integer</span>&gt; even = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">System</span>.out.println(pos.and(even).test(<span class="num">4</span>));
<span class="cls">System</span>.out.println(pos.and(even).negate().test(<span class="num">4</span>));`,
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "Compilation error"],
    answer: 0,
    explanation: "pos.and(even).test(4): 4>0(true) AND 4%2==0(true) → true. negate().test(4): !true → false. Result: 'true\\nfalse'."
  },
  {
    id: 1137, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">Function</span>.identity(),
        s -> s.chars().filter(c -> <span class="str">"aeiou"</span>.indexOf(c) >= <span class="num">0</span>).count()
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["one=2 three=2 two=1 ", "one=1 three=2 two=1 ", "three=2 two=1 one=2 ", "Compilation error"],
    answer: 0,
    explanation: "Count vowels: 'one' → o,e = 2. 'two' → o = 1. 'three' → e,e = 2. TreeMap sorts keys: one < three < two. forEach: 'one=2 three=2 two=1 '. Result: 'one=2 three=2 two=1 '."
  },
  {
    id: 1138, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Value</span>&lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; {
    <span class="kw">private</span> T val;
    <span class="cls">Value</span>(T v) { val = v; }
    <span class="kw">boolean</span> isGreaterThan(<span class="cls">Value</span>&lt;T&gt; other) { <span class="kw">return</span> val.compareTo(other.val) > <span class="num">0</span>; }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="cls">String</span>.valueOf(val); }
}
<span class="cls">Value</span>&lt;<span class="cls">Integer</span>&gt; v1 = <span class="kw">new</span> <span class="cls">Value</span>&lt;&gt;(<span class="num">10</span>);
<span class="cls">Value</span>&lt;<span class="cls">Integer</span>&gt; v2 = <span class="kw">new</span> <span class="cls">Value</span>&lt;&gt;(<span class="num">5</span>);
<span class="cls">System</span>.out.println(v1.isGreaterThan(v2) + <span class="str">" "</span> + (v1.isGreaterThan(v2) ? v1 : v2));`,
    options: ["true 10", "false 5", "true 5", "Compilation error"],
    answer: 0,
    explanation: "v1.val=10, v2.val=5. compareTo(5): 10>5 → returns positive → isGreaterThan=true. Ternary: v1.toString()='10'. Result: 'true 10'."
  },
  {
    id: 1139, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">LongStream</span>.iterate(<span class="num">2</span>, n -> n * n)
    .limit(<span class="num">5</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[2, 4, 16, 256, 65536]", "[2, 4, 8, 16, 32]", "[1, 2, 4, 8, 16]", "Compilation error"],
    answer: 0,
    explanation: "LongStream.iterate(2, n->n*n): 2, 2*2=4, 4*4=16, 16*16=256, 256*256=65536. limit(5). Result: '[2, 4, 16, 256, 65536]'."
  },
  {
    id: 1140, topic: "Annotations",
    text: "What is the output of the following code?",
    code: `<span class="ann">@Retention</span>(<span class="cls">RetentionPolicy</span>.RUNTIME)
<span class="ann">@Target</span>({<span class="cls">ElementType</span>.TYPE, <span class="cls">ElementType</span>.METHOD, <span class="cls">ElementType</span>.FIELD})
<span class="ann">@interface</span> <span class="cls">Audit</span> { <span class="cls">String</span> by() <span class="kw">default</span> <span class="str">"system"</span>; }
<span class="ann">@Audit</span>(by = <span class="str">"admin"</span>)
<span class="kw">class</span> <span class="cls">Service</span> {
    <span class="ann">@Audit</span>
    <span class="kw">void</span> run() {}
}
<span class="cls">Audit</span> classAudit  = <span class="cls">Service</span>.<span class="kw">class</span>.getAnnotation(<span class="cls">Audit</span>.<span class="kw">class</span>);
<span class="cls">Audit</span> methodAudit = <span class="cls">Service</span>.<span class="kw">class</span>.getMethod(<span class="str">"run"</span>).getAnnotation(<span class="cls">Audit</span>.<span class="kw">class</span>);
<span class="cls">System</span>.out.println(classAudit.by() + <span class="str">" "</span> + methodAudit.by());`,
    options: ["admin system", "system admin", "admin admin", "Compilation error"],
    answer: 0,
    explanation: "@Audit on class has by='admin'. @Audit on method uses default by='system'. classAudit.by()='admin'. methodAudit.by()='system'. Result: 'admin system'."
  },
  {
    id: 1141, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="str">"hello"</span>.repeat(<span class="num">0</span>).isEmpty());
<span class="cls">System</span>.out.println(<span class="str">"ab"</span>.repeat(<span class="num">3</span>));
<span class="cls">System</span>.out.println(<span class="str">"\\n"</span>.repeat(<span class="num">2</span>).lines().count());`,
    options: ["true\nababab\n2", "false\nababab\n3", "true\nababab\n3", "true\naabbcc\n2"],
    answer: 0,
    explanation: "'hello'.repeat(0)='' (empty) → isEmpty()=true. 'ab'.repeat(3)='ababab'. '\\n'.repeat(2)='\\n\\n' → two newlines. lines() splits: '' '' → 2 lines? Actually '\\n\\n'.lines(): [\"\" , \"\"] = 2 elements. count()=2. Result: 'true\\nababab\\n2'."
  },
  {
    id: 1142, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">5</span>,<span class="num">3</span>,<span class="num">1</span>,<span class="num">4</span>,<span class="num">2</span>));
list.sort(<span class="kw">null</span>); <span class="cm">// uses natural order</span>
<span class="kw">int</span> min = <span class="cls">Collections</span>.min(list);
<span class="kw">int</span> max = <span class="cls">Collections</span>.max(list);
<span class="cls">System</span>.out.println(min + <span class="str">" "</span> + max + <span class="str">" "</span> + list);`,
    options: ["1 5 [1, 2, 3, 4, 5]", "5 1 [5, 4, 3, 2, 1]", "1 5 [5, 3, 1, 4, 2]", "Compilation error"],
    answer: 0,
    explanation: "sort(null): sorts using natural order → [1,2,3,4,5]. min()=1. max()=5. list=[1,2,3,4,5]. Result: '1 5 [1, 2, 3, 4, 5]'."
  },
  {
    id: 1143, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Printable</span> {
    <span class="kw">default void</span> print(<span class="cls">String</span> s) {
        <span class="cls">System</span>.out.print(process(s) + <span class="str">" "</span>);
    }
    <span class="kw">private</span> <span class="cls">String</span> process(<span class="cls">String</span> s) { <span class="kw">return</span> s.toUpperCase(); }
}
<span class="kw">class</span> <span class="cls">Doc</span> <span class="kw">implements</span> <span class="cls">Printable</span> {}
<span class="kw">new</span> <span class="cls">Doc</span>().print(<span class="str">"hello"</span>);
<span class="kw">new</span> <span class="cls">Doc</span>().print(<span class="str">"world"</span>);`,
    options: ["HELLO WORLD ", "hello world ", "HELLO  WORLD ", "Compilation error"],
    answer: 0,
    explanation: "Interface private method process() is used internally by the default print(). Doc inherits print(). print('hello') → process('hello')='HELLO' → prints 'HELLO '. print('world') → 'WORLD '. Result: 'HELLO WORLD '."
  },
  {
    id: 1144, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T, R&gt; <span class="cls">List</span>&lt;R&gt; mapList(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">Function</span>&lt;T,R&gt; mapper) {
    <span class="kw">return</span> list.stream().map(mapper).collect(<span class="cls">Collectors</span>.toList());
}
<span class="kw">var</span> lengths = mapList(<span class="cls">List</span>.of(<span class="str">"java"</span>,<span class="str">"17"</span>,<span class="str">"ocp"</span>), <span class="cls">String</span>::length);
<span class="kw">var</span> doubled = mapList(lengths, n -> n * <span class="num">2</span>);
<span class="cls">System</span>.out.println(doubled);`,
    options: ["[8, 4, 6]", "[4, 2, 3]", "[4, 4, 6]", "Compilation error"],
    answer: 0,
    explanation: "mapList(strings, length): [4, 2, 3] (java=4, 17=2, ocp=3). mapList([4,2,3], n*2): [8, 4, 6]. Result: '[8, 4, 6]'."
  },
  {
    id: 1145, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">Clock</span> fixed = <span class="cls">Clock</span>.fixed(
    <span class="cls">Instant</span>.parse(<span class="str">"2024-07-04T12:00:00Z"</span>),
    <span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>)
);
<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.now(fixed);
<span class="cls">System</span>.out.println(d + <span class="str">" "</span> + d.getDayOfWeek());`,
    options: ["2024-07-04 THURSDAY", "2024-07-04 FRIDAY", "2024-07-04 WEDNESDAY", "Compilation error"],
    answer: 0,
    explanation: "Clock.fixed creates a clock that always returns the same instant. LocalDate.now(fixed)=2024-07-04. July 4, 2024 is a Thursday. getDayOfWeek()=THURSDAY. Result: '2024-07-04 THURSDAY'."
  },
  {
    id: 1146, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>,<span class="num">40</span>,<span class="num">50</span>)
    .reduce((<span class="kw">int</span> a, <span class="kw">int</span> b) -> {
        <span class="cls">System</span>.out.print(<span class="str">"("</span> + a + <span class="str">"+"</span> + b + <span class="str">") "</span>);
        <span class="kw">return</span> a + b;
    });
<span class="cls">System</span>.out.println(r.getAsInt());`,
    options: ["(10+20) (30+30) (60+40) (100+50) 150", "(10+20) (30+30) (60+40) (100+50) \n150", "150", "Compilation error"],
    answer: 0,
    explanation: "reduce without identity calls accumulator left to right. 10+20=30 (prints '(10+20) '). 30+30=60. 60+40=100. 100+50=150. Then println(150). All on same line (print not println): '(10+20) (30+30) (60+40) (100+50) 150'. Result as shown."
  },
  {
    id: 1147, topic: "Exception Handling",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">int</span> x = <span class="cls">Integer</span>.parseInt(<span class="str">"abc"</span>);
} <span class="kw">catch</span> (<span class="cls">NumberFormatException</span> | <span class="cls">ArithmeticException</span> e) {
    <span class="cls">System</span>.out.print(e.getClass().getSimpleName() + <span class="str">" "</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"done"</span>);
}`,
    options: ["NumberFormatException done", "ArithmeticException done", "done", "Compilation error"],
    answer: 0,
    explanation: "parseInt('abc') throws NumberFormatException. Multi-catch catches either type. e.getClass().getSimpleName()='NumberFormatException'. finally prints 'done'. Result: 'NumberFormatException done'."
  },
  {
    id: 1148, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Config</span>(<span class="cls">String</span> host, <span class="kw">int</span> port, <span class="kw">boolean</span> ssl) {
    <span class="cls">String</span> url() {
        <span class="kw">return</span> (ssl ? <span class="str">"https"</span> : <span class="str">"http"</span>) + <span class="str">"://"</span> + host + <span class="str">":"</span> + port;
    }
    <span class="cls">Config</span> withPort(<span class="kw">int</span> newPort) { <span class="kw">return new</span> <span class="cls">Config</span>(host, newPort, ssl); }
}
<span class="cls">Config</span> c = <span class="kw">new</span> <span class="cls">Config</span>(<span class="str">"example.com"</span>, <span class="num">80</span>, <span class="kw">false</span>)
    .withPort(<span class="num">443</span>);
<span class="cls">Config</span> secure = <span class="kw">new</span> <span class="cls">Config</span>(c.host(), c.port(), <span class="kw">true</span>);
<span class="cls">System</span>.out.println(secure.url());`,
    options: ["https://example.com:443", "http://example.com:443", "https://example.com:80", "Compilation error"],
    answer: 0,
    explanation: "Start: Config('example.com',80,false). withPort(443): Config('example.com',443,false). secure: Config('example.com',443,true). url(): 'https' + '://' + 'example.com' + ':' + 443 = 'https://example.com:443'. Result: 'https://example.com:443'."
  },
  {
    id: 1149, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Reader</span>&lt;T&gt; {
    <span class="kw">abstract</span> <span class="cls">Optional</span>&lt;T&gt; read();
    <span class="cls">List</span>&lt;T&gt; readAll() {
        <span class="cls">List</span>&lt;T&gt; results = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
        <span class="cls">Optional</span>&lt;T&gt; item;
        <span class="kw">while</span> ((item = read()).isPresent())
            results.add(item.get());
        <span class="kw">return</span> results;
    }
}
<span class="kw">int</span>[] idx = {<span class="num">0</span>};
<span class="kw">int</span>[] data = {<span class="num">10</span>,<span class="num">20</span>,<span class="num">30</span>};
<span class="cls">Reader</span>&lt;<span class="cls">Integer</span>&gt; r = <span class="kw">new</span> <span class="cls">Reader</span>&lt;&gt;() {
    <span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt; read() {
        <span class="kw">return</span> idx[<span class="num">0</span>] < data.length
            ? <span class="cls">Optional</span>.of(data[idx[<span class="num">0</span>]++])
            : <span class="cls">Optional</span>.empty();
    }
};
<span class="cls">System</span>.out.println(r.readAll());`,
    options: ["[10, 20, 30]", "[0, 1, 2]", "[]", "Compilation error"],
    answer: 0,
    explanation: "readAll() calls read() until empty. read(): idx[0]=0→Optional(10,idx→1). idx=1→Optional(20,idx→2). idx=2→Optional(30,idx→3). idx=3≥length→empty. results=[10,20,30]. Result: '[10, 20, 30]'."
  },
  {
    id: 1150, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> stats = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>,<span class="str">"fig"</span>,<span class="str">"banana"</span>,<span class="str">"kiwi"</span>,<span class="str">"cherry"</span>)
    .collect(<span class="cls">Collectors</span>.teeing(
        <span class="cls">Collectors</span>.minBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)),
        <span class="cls">Collectors</span>.maxBy(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)),
        (min, max) -> min.orElse(<span class="str">"?"</span>) + <span class="str">"/"</span> + max.orElse(<span class="str">"?"</span>)
    ));
<span class="cls">System</span>.out.println(stats);`,
    options: ["fig/banana", "apple/cherry", "fig/cherry", "Compilation error"],
    answer: 0,
    explanation: "Lengths: apple(5), fig(3), banana(6), kiwi(4), cherry(6). minBy length: fig(3). maxBy length: banana or cherry (both 6) — max keeps last encountered: cherry. Result: 'fig/cherry'."
  }
];
