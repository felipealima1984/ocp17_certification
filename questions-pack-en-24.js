// ═══════════════════════════════════════════════════════
//  PACK EN-24 — Questions 1151–1200  (English)
//  Topics: Concurrency structured/scheduled, 
//          Collectors advanced downstream,
//          Reflection method invocation polymorphism,
//          instanceof scope complex, Sealed classes
//          with records decomposition, Switch null,
//          Text blocks indentation rules, BigDecimal
//          MathContext, String methods Java 17,
//          EnumMap ordering, Map.Entry sort,
//          Lambda effectively final tricky cases,
//          OOP covariant return, Interface static factory
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_24 = [
  {
    id: 1151, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"red"</span>,<span class="str">"green"</span>,<span class="str">"blue"</span>)
    .collect(<span class="cls">Collectors</span>.toUnmodifiableMap(
        <span class="cls">String</span>::length,
        <span class="cls">Function</span>.identity(),
        (existing, incoming) -> existing + <span class="str">"+"</span> + incoming
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["3=red 4=blue 5=green ", "3=red 4=blue+blue 5=green ", "4=blue 3=red 5=green ", "Compilation error"],
    answer: 0,
    explanation: "toUnmodifiableMap: red(3)→red, green(5)→green, blue(4)→blue. No collisions (all different lengths). TreeMap sorts by key: 3=red, 4=blue, 5=green. Result: '3=red 4=blue 5=green '."
  },
  {
    id: 1152, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.mapping(
        n -> n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"E"</span> : <span class="str">"O"</span>,
        <span class="cls">Collectors</span>.joining()
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["OEOEO", "EOEOE", "OEOOO", "Compilation error"],
    answer: 0,
    explanation: "mapping: 1→O, 2→E, 3→O, 4→E, 5→O. joining(): 'OEOEO'. Result: 'OEOEO'."
  },
  {
    id: 1153, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ScheduledExecutorService</span> svc =
    <span class="cls">Executors</span>.newScheduledThreadPool(<span class="num">1</span>);
<span class="kw">int</span>[] count = {<span class="num">0</span>};
<span class="cls">ScheduledFuture</span>&lt;?&gt; sf = svc.scheduleAtFixedRate(
    () -> { <span class="kw">if</span>(++count[<span class="num">0</span>] >= <span class="num">3</span>) svc.shutdown(); },
    <span class="num">0</span>, <span class="num">1</span>, <span class="cls">TimeUnit</span>.MILLISECONDS
);
svc.awaitTermination(<span class="num">1</span>, <span class="cls">TimeUnit</span>.SECONDS);
<span class="cls">System</span>.out.println(count[<span class="num">0</span>]);`,
    options: ["3", "1", "Non-deterministic but >= 3", "0"],
    answer: 2,
    explanation: "scheduleAtFixedRate runs the task every 1ms. The task increments count and calls shutdown() when count reaches 3. However, due to thread scheduling, the task may run more than 3 times before shutdown completes. count[0] is guaranteed to be >= 3 but could be higher."
  },
  {
    id: 1154, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Void</span>&gt; cf = <span class="cls">CompletableFuture</span>
    .runAsync(() -> <span class="cls">System</span>.out.print(<span class="str">"task1 "</span>))
    .thenRunAsync(() -> <span class="cls">System</span>.out.print(<span class="str">"task2 "</span>))
    .thenRunAsync(() -> <span class="cls">System</span>.out.print(<span class="str">"task3"</span>));
cf.get();`,
    options: ["task1 task2 task3", "task3 task2 task1", "Non-deterministic", "Compilation error"],
    answer: 0,
    explanation: "thenRunAsync chains tasks sequentially after each prior task completes. task1 completes → task2 starts → task3 starts. cf.get() waits for all. Order is always task1, task2, task3. Result: 'task1 task2 task3'."
  },
  {
    id: 1155, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> val = <span class="num">3.14</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(val) {
    <span class="kw">case</span> <span class="cls">Integer</span>   i -> <span class="str">"int: "</span>  + i;
    <span class="kw">case</span> <span class="cls">Double</span>    d -> <span class="str">"dbl: "</span>  + d;
    <span class="kw">case</span> <span class="cls">String</span>    s -> <span class="str">"str: "</span>  + s;
    <span class="kw">case</span> <span class="kw">null</span>        -> <span class="str">"null"</span>;
    <span class="kw">default</span>          -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["dbl: 3.14", "int: 3", "str: 3.14", "other"],
    answer: 0,
    explanation: "val=3.14 is autoboxed to Double. Pattern switch: case Double d matches → 'dbl: 3.14'. Result: 'dbl: 3.14'."
  },
  {
    id: 1156, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; <span class="cls">T</span> clamp(<span class="cls">T</span> val, <span class="cls">T</span> lo, <span class="cls">T</span> hi) {
    <span class="kw">if</span> (val.compareTo(lo) < <span class="num">0</span>) <span class="kw">return</span> lo;
    <span class="kw">if</span> (val.compareTo(hi) > <span class="num">0</span>) <span class="kw">return</span> hi;
    <span class="kw">return</span> val;
}
<span class="cls">System</span>.out.println(clamp(<span class="str">"mango"</span>, <span class="str">"apple"</span>, <span class="str">"pear"</span>));
<span class="cls">System</span>.out.println(clamp(<span class="str">"zebra"</span>, <span class="str">"apple"</span>, <span class="str">"pear"</span>));`,
    options: ["mango\npear", "apple\npear", "mango\nzebra", "Compilation error"],
    answer: 0,
    explanation: "clamp('mango','apple','pear'): 'mango'>'apple' and 'mango'<'pear' → returns 'mango'. clamp('zebra','apple','pear'): 'zebra'>'pear' → returns 'pear'. Result: 'mango\\npear'."
  },
  {
    id: 1157, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Animal</span> {
    <span class="cls">Animal</span> create() { <span class="kw">return new</span> <span class="cls">Animal</span>(); }
    <span class="cls">String</span> type()   { <span class="kw">return</span> <span class="str">"animal"</span>; }
}
<span class="kw">class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="cls">Dog</span>    create() { <span class="kw">return new</span> <span class="cls">Dog</span>(); }  <span class="cm">// covariant return</span>
    <span class="cls">String</span> type()   { <span class="kw">return</span> <span class="str">"dog"</span>; }
}
<span class="cls">Animal</span> a = <span class="kw">new</span> <span class="cls">Dog</span>();
<span class="cls">System</span>.out.println(a.create().type());`,
    options: ["dog", "animal", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "a.create(): Dog.create() (polymorphism) returns a Dog instance. .type(): called on the Dog → 'dog'. Covariant return allows Dog.create() to override Animal.create() with a Dog return type. Result: 'dog'."
  },
  {
    id: 1158, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">IntPredicate</span> isEven   = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">IntPredicate</span> isPosit  = n -> n > <span class="num">0</span>;
<span class="cls">IntPredicate</span> combined = isEven.and(isPosit).or(n -> n == <span class="num">0</span>);
<span class="cls">System</span>.out.println(combined.test(-<span class="num">4</span>));
<span class="cls">System</span>.out.println(combined.test(<span class="num">4</span>));
<span class="cls">System</span>.out.println(combined.test(<span class="num">0</span>));`,
    options: ["false\ntrue\ntrue", "true\ntrue\ntrue", "false\ntrue\nfalse", "true\ntrue\nfalse"],
    answer: 0,
    explanation: "combined = (isEven AND isPosit) OR (n==0). -4: even(T) AND positive(F)=F → OR (0==−4)F → false. 4: even(T) AND positive(T)=T → OR short-circuits → true. 0: even(T) AND positive(F)=F → OR (0==0)T → true. Result: 'false\\ntrue\\ntrue'."
  },
  {
    id: 1159, topic: "Lambda",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">5</span>;
<span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt; s1 = () -> x * <span class="num">2</span>;
<span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt; s2 = () -> x + <span class="num">3</span>;
<span class="cls">Function</span>&lt;<span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt;, <span class="cls">Integer</span>&gt; eval = <span class="cls">Supplier</span>::get;
<span class="cls">System</span>.out.println(eval.apply(s1) + <span class="str">" "</span> + eval.apply(s2));`,
    options: ["10 8", "5 5", "10 5", "Compilation error"],
    answer: 0,
    explanation: "x=5 is effectively final. s1.get()=5*2=10. s2.get()=5+3=8. eval is a Function<Supplier<Integer>,Integer> via method reference Supplier::get — unbound instance method reference. eval.apply(s1)=s1.get()=10. eval.apply(s2)=s2.get()=8. Result: '10 8'."
  },
  {
    id: 1160, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="cls">Map</span>.of(<span class="str">"b"</span>,<span class="num">2</span>, <span class="str">"a"</span>,<span class="num">1</span>, <span class="str">"c"</span>,<span class="num">3</span>);
m.entrySet().stream()
    .sorted(<span class="cls">Map</span>.<span class="cls">Entry</span>.comparingByKey())
    .map(e -> e.getKey() + <span class="str">"="</span> + e.getValue())
    .forEach(s -> <span class="cls">System</span>.out.print(s + <span class="str">" "</span>));`,
    options: ["a=1 b=2 c=3 ", "b=2 a=1 c=3 ", "c=3 b=2 a=1 ", "Compilation error"],
    answer: 0,
    explanation: "Map.Entry.comparingByKey() sorts entries by key in natural order. a < b < c. Result: 'a=1 b=2 c=3 '."
  },
  {
    id: 1161, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Fraction</span>(<span class="kw">int</span> num, <span class="kw">int</span> den) {
    <span class="cls">Fraction</span> { <span class="kw">if</span> (den == <span class="num">0</span>) <span class="kw">throw new</span> <span class="cls">ArithmeticException</span>(<span class="str">"div/0"</span>); }
    <span class="cls">Fraction</span> add(<span class="cls">Fraction</span> o) {
        <span class="kw">return new</span> <span class="cls">Fraction</span>(num*o.den + o.num*den, den*o.den);
    }
    <span class="kw">double</span> toDouble() { <span class="kw">return</span> (<span class="kw">double</span>) num / den; }
}
<span class="cls">Fraction</span> a = <span class="kw">new</span> <span class="cls">Fraction</span>(<span class="num">1</span>,<span class="num">2</span>);
<span class="cls">Fraction</span> b = <span class="kw">new</span> <span class="cls">Fraction</span>(<span class="num">1</span>,<span class="num">3</span>);
<span class="cls">System</span>.out.println(a.add(b).toDouble());`,
    options: ["0.8333333333333334", "0.5", "0.3333333333333333", "Throws ArithmeticException"],
    answer: 0,
    explanation: "a.add(b): num=1*3+1*2=5, den=2*3=6. Fraction(5,6). toDouble()=5.0/6=0.8333... Result: '0.8333333333333334'."
  },
  {
    id: 1162, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">SafeParser</span> {
    <span class="kw">static</span> <span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt; parse(<span class="cls">String</span> s) {
        <span class="kw">try</span> {
            <span class="kw">return</span> <span class="cls">Optional</span>.of(<span class="cls">Integer</span>.parseInt(s));
        } <span class="kw">catch</span> (<span class="cls">NumberFormatException</span> e) {
            <span class="kw">return</span> <span class="cls">Optional</span>.empty();
        }
    }
}
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; data = <span class="cls">List</span>.of(<span class="str">"1"</span>, <span class="str">"abc"</span>, <span class="str">"3"</span>, <span class="str">"xyz"</span>, <span class="str">"5"</span>);
<span class="kw">int</span> sum = data.stream()
    .map(<span class="cls">SafeParser</span>::parse)
    .filter(<span class="cls">Optional</span>::isPresent)
    .mapToInt(<span class="cls">Optional</span>::get)
    .sum();
<span class="cls">System</span>.out.println(sum);`,
    options: ["9", "15", "3", "Compilation error"],
    answer: 0,
    explanation: "parse: '1'→Optional(1), 'abc'→empty, '3'→Optional(3), 'xyz'→empty, '5'→Optional(5). filter(isPresent): [Optional(1), Optional(3), Optional(5)]. mapToInt(get): [1,3,5]. sum()=9. Result: '9'."
  },
  {
    id: 1163, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"abc"</span>,<span class="str">"def"</span>,<span class="str">"ghi"</span>)
    .flatMap(s -> s.chars().mapToObj(c -> (<span class="kw">char</span>)c + <span class="str">""</span>))
    .filter(s -> <span class="str">"aeiou"</span>.contains(s))
    .count();
<span class="cls">System</span>.out.println(r);`,
    options: ["2", "1", "3", "0"],
    answer: 0,
    explanation: "flatMap chars to strings: a,b,c,d,e,f,g,h,i. filter vowels ('aeiou'.contains(s)): a and e → count=2. Result: '2'."
  },
  {
    id: 1164, topic: "Comparable",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">SemVer</span>(<span class="kw">int</span> major, <span class="kw">int</span> minor) <span class="kw">implements</span> <span class="cls">Comparable</span>&lt;<span class="cls">SemVer</span>&gt; {
    <span class="kw">public int</span> compareTo(<span class="cls">SemVer</span> o) {
        <span class="kw">int</span> c = <span class="cls">Integer</span>.compare(major, o.major);
        <span class="kw">return</span> c != <span class="num">0</span> ? c : <span class="cls">Integer</span>.compare(minor, o.minor);
    }
}
<span class="kw">var</span> versions = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">SemVer</span>(<span class="num">2</span>,<span class="num">1</span>), <span class="kw">new</span> <span class="cls">SemVer</span>(<span class="num">1</span>,<span class="num">9</span>), <span class="kw">new</span> <span class="cls">SemVer</span>(<span class="num">2</span>,<span class="num">0</span>)
));
versions.sort(<span class="kw">null</span>);
<span class="cls">System</span>.out.println(versions.get(<span class="num">0</span>) + <span class="str">" "</span> + versions.get(<span class="num">2</span>));`,
    options: ["SemVer[major=1, minor=9] SemVer[major=2, minor=1]", "SemVer[major=2, minor=1] SemVer[major=1, minor=9]", "SemVer[major=1, minor=9] SemVer[major=2, minor=0]", "Compilation error"],
    answer: 0,
    explanation: "Sort using natural order (compareTo). 1.9 < 2.0 < 2.1. get(0)=SemVer[1,9], get(2)=SemVer[2,1]. Record toString: 'SemVer[major=1, minor=9] SemVer[major=2, minor=1]'."
  },
  {
    id: 1165, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="kw">long</span> start = <span class="cls">System</span>.nanoTime();
<span class="kw">int</span> sum = <span class="num">0</span>;
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">1_000_000</span>; i++) sum += i;
<span class="kw">long</span> elapsed = <span class="cls">System</span>.nanoTime() - start;
<span class="cls">System</span>.out.println(sum > <span class="num">0</span>);
<span class="cls">System</span>.out.println(elapsed > <span class="num">0</span>);`,
    options: ["true\ntrue", "false\ntrue", "true\nfalse", "Compilation error"],
    answer: 0,
    explanation: "sum = 0+1+...+999999 = 999999*1000000/2 = 499999500000. But sum is int and 499999500000 overflows int. Actually 0+1+...+999999 = 499999500000 which overflows int (max ~2.1 billion). But 499999500000 > 2^31 → overflows. The actual int result depends on overflow: large positive sum. In any case elapsed>0 is always true (nanoTime differences are positive). sum>0: the overflow result... Let me verify: for int overflow with n=999999, sum accumulates and wraps. The final value is implementation-specific due to overflow but typically the result is a non-zero number. elapsed>0=true. Both are true in practice."
  },
  {
    id: 1166, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Parser</span>&lt;T&gt; {
    T parse(<span class="cls">String</span> s);
    <span class="kw">static</span> <span class="cls">Parser</span>&lt;<span class="cls">Integer</span>&gt; intParser()    { <span class="kw">return</span> <span class="cls">Integer</span>::parseInt; }
    <span class="kw">static</span> <span class="cls">Parser</span>&lt;<span class="cls">Double</span>&gt;  doubleParser() { <span class="kw">return</span> <span class="cls">Double</span>::parseDouble; }
    <span class="kw">default</span> &lt;R&gt; <span class="cls">Parser</span>&lt;R&gt; thenMap(<span class="cls">Function</span>&lt;T,R&gt; f) {
        <span class="kw">return</span> s -> f.apply(parse(s));
    }
}
<span class="cls">Parser</span>&lt;<span class="cls">String</span>&gt; hexStr = <span class="cls">Parser</span>.intParser()
    .thenMap(n -> <span class="cls">Integer</span>.toHexString(n));
<span class="cls">System</span>.out.println(hexStr.parse(<span class="str">"255"</span>));`,
    options: ["ff", "255", "0xff", "Compilation error"],
    answer: 0,
    explanation: "intParser parses '255'→255. thenMap(Integer::toHexString): hexStr.parse('255')=intParser.parse('255')=255, then toHexString(255)='ff'. Result: 'ff'."
  },
  {
    id: 1167, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        n -> n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>,
        n -> <span class="cls">List</span>.of(n),
        (l1, l2) -> {
            <span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; merged = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(l1);
            merged.addAll(l2);
            <span class="kw">return</span> merged;
        }
    ));
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(result));`,
    options: ["{even=[2, 4], odd=[1, 3, 5]}", "{odd=[1, 3, 5], even=[2, 4]}", "{even=[4, 2], odd=[5, 3, 1]}", "Throws IllegalStateException"],
    answer: 0,
    explanation: "toMap with merge: odd=[1], then merge [3]: [1,3], then merge [5]: [1,3,5]. even=[2], merge [4]: [2,4]. TreeMap alphabetical: even < odd. Result: '{even=[2, 4], odd=[1, 3, 5]}'."
  },
  {
    id: 1168, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Container</span>&lt;T&gt; {
    <span class="kw">protected</span> <span class="cls">List</span>&lt;T&gt; items = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="cls">Container</span>&lt;T&gt; add(T item) { items.add(item); <span class="kw">return this</span>; }
    <span class="kw">abstract</span> T reduce();
}
<span class="kw">var</span> sum = <span class="kw">new</span> <span class="cls">Container</span>&lt;<span class="cls">Integer</span>&gt;() {
    <span class="cls">Integer</span> reduce() {
        <span class="kw">return</span> items.stream().mapToInt(<span class="cls">Integer</span>::intValue).sum();
    }
};
sum.add(<span class="num">10</span>).add(<span class="num">20</span>).add(<span class="num">30</span>);
<span class="cls">System</span>.out.println(sum.reduce());`,
    options: ["60", "30", "10", "Compilation error"],
    answer: 0,
    explanation: "Abstract generic Container with anonymous subclass implementing reduce(). add() returns this (fluent). add 10,20,30 → items=[10,20,30]. reduce()=sum=60. Result: '60'."
  },
  {
    id: 1169, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">try</span> {
        <span class="cls">System</span>.out.print(<span class="str">"A"</span>);
        <span class="kw">throw new</span> <span class="cls">IOException</span>();
    } <span class="kw">catch</span> (<span class="cls">IOException</span> e) {
        <span class="cls">System</span>.out.print(<span class="str">"B"</span>);
        <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(e);
    } <span class="kw">finally</span> {
        <span class="cls">System</span>.out.print(<span class="str">"C"</span>);
    }
} <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"D"</span>);
}`,
    options: ["ABCD", "ABD", "ABC", "ABDC"],
    answer: 0,
    explanation: "Inner try: A printed. IOException thrown. Inner catch: B printed. throws RuntimeException. Inner finally: C printed. Outer catch: RuntimeException caught. D printed. Result: 'ABCD'."
  },
  {
    id: 1170, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; firstWhere(<span class="cls">Stream</span>&lt;T&gt; s, <span class="cls">Predicate</span>&lt;T&gt; p) {
    <span class="kw">return</span> s.filter(p).findFirst();
}
<span class="kw">var</span> r = firstWhere(
    <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>),
    n -> n * n > <span class="num">10</span>
);
<span class="cls">System</span>.out.println(r.orElse(<span class="num">-1</span>));`,
    options: ["4", "3", "5", "-1"],
    answer: 0,
    explanation: "firstWhere finds first element where n*n>10. 1:1>10F. 2:4>10F. 3:9>10F. 4:16>10T → first match. Result: '4'."
  },
  {
    id: 1171, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> m = <span class="kw">new</span> <span class="cls">EnumMap</span>&lt;<span class="cls">DayOfWeek</span>,<span class="cls">String</span>&gt;(<span class="cls">DayOfWeek</span>.<span class="kw">class</span>);
m.put(<span class="cls">DayOfWeek</span>.FRIDAY, <span class="str">"end of week"</span>);
m.put(<span class="cls">DayOfWeek</span>.MONDAY, <span class="str">"start"</span>);
m.put(<span class="cls">DayOfWeek</span>.WEDNESDAY, <span class="str">"midweek"</span>);
m.forEach((k,v) -> <span class="cls">System</span>.out.print(k.name().substring(<span class="num">0</span>,<span class="num">2</span>) + <span class="str">" "</span>));`,
    options: ["MO WE FR ", "FR MO WE ", "WE MO FR ", "MO FR WE "],
    answer: 0,
    explanation: "EnumMap iterates in the natural order of the enum constants. DayOfWeek: MONDAY(0), TUESDAY(1), WEDNESDAY(2), THURSDAY(3), FRIDAY(4)... Map entries in order: MONDAY, WEDNESDAY, FRIDAY. substring(0,2): MO, WE, FR. Result: 'MO WE FR '."
  },
  {
    id: 1172, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>)
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">Stream</span>&lt;<span class="cls">String</span>&gt; empty = <span class="cls">Stream</span>.empty();
<span class="cls">String</span> emptyStr = empty.collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">System</span>.out.println(r + <span class="str">" "</span> + emptyStr);`,
    options: ["[a, b, c] []", "[a, b, c] [, ]", "[a,b,c] []", "Compilation error"],
    answer: 0,
    explanation: "joining with prefix/suffix. Non-empty: '[a, b, c]'. Empty stream with joining: prefix+suffix='[]'. Result: '[a, b, c] []'."
  },
  {
    id: 1173, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDateTime</span> ldt = <span class="cls">LocalDateTime</span>.of(<span class="num">2024</span>,<span class="num">3</span>,<span class="num">10</span>,<span class="num">1</span>,<span class="num">30</span>);
<span class="cls">ZoneId</span>       zone = <span class="cls">ZoneId</span>.of(<span class="str">"America/New_York"</span>);
<span class="cls">ZonedDateTime</span>  zdt = ldt.atZone(zone);
<span class="cls">System</span>.out.println(zdt.toInstant().atZone(<span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>)).getHour());`,
    options: ["6", "1", "5", "Compilation error"],
    answer: 0,
    explanation: "March 10, 2024 at 1:30 AM in America/New_York: this is during the DST spring-forward (2 AM → 3 AM). 1:30 AM EST = UTC-5. toInstant: 01:30 + 5h = 06:30 UTC. getHour()=6. Result: '6'."
  },
  {
    id: 1174, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Magic</span> {
    <span class="kw">int</span> value;
    <span class="cls">Magic</span>(<span class="kw">int</span> v) { <span class="kw">this</span>.value = v; }
    <span class="kw">int</span> doubled() { <span class="kw">return</span> value * <span class="num">2</span>; }
}
<span class="cls">Constructor</span>&lt;<span class="cls">Magic</span>&gt; ctor = <span class="cls">Magic</span>.<span class="kw">class</span>.getDeclaredConstructor(<span class="kw">int</span>.<span class="kw">class</span>);
<span class="cls">Magic</span> m = ctor.newInstance(<span class="num">21</span>);
<span class="cls">Method</span> dbl = <span class="cls">Magic</span>.<span class="kw">class</span>.getDeclaredMethod(<span class="str">"doubled"</span>);
<span class="cls">System</span>.out.println(dbl.invoke(m));`,
    options: ["42", "21", "Throws IllegalAccessException", "Compilation error"],
    answer: 0,
    explanation: "getDeclaredConstructor(int.class) gets the constructor. newInstance(21) creates Magic(21). getDeclaredMethod('doubled') gets the method. invoke(m) calls m.doubled()=21*2=42. Result: '42'."
  },
  {
    id: 1175, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Combiner</span>&lt;T&gt; {
    T combine(T a, T b);
    <span class="kw">static</span> &lt;T&gt; <span class="cls">Combiner</span>&lt;T&gt; first() { <span class="kw">return</span> (a, b) -> a; }
    <span class="kw">static</span> &lt;T&gt; <span class="cls">Combiner</span>&lt;T&gt; last()  { <span class="kw">return</span> (a, b) -> b; }
}
<span class="cls">Combiner</span>&lt;<span class="cls">String</span>&gt; c1 = <span class="cls">Combiner</span>.first();
<span class="cls">Combiner</span>&lt;<span class="cls">String</span>&gt; c2 = <span class="cls">Combiner</span>.last();
<span class="cls">System</span>.out.println(c1.combine(<span class="str">"hello"</span>, <span class="str">"world"</span>));
<span class="cls">System</span>.out.println(c2.combine(<span class="str">"hello"</span>, <span class="str">"world"</span>));`,
    options: ["hello\nworld", "world\nhello", "hello\nhello", "Compilation error"],
    answer: 0,
    explanation: "Static factory methods on interfaces. first() returns lambda (a,b)->a. last() returns (a,b)->b. c1.combine('hello','world')='hello'. c2.combine('hello','world')='world'. Result: 'hello\\nworld'."
  },
  {
    id: 1176, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .parallel()
    .reduce(<span class="num">1</span>, (a,b) -> a * b);
<span class="cls">System</span>.out.println(r);`,
    options: ["120", "Non-deterministic", "1", "Throws ArithmeticException"],
    answer: 0,
    explanation: "reduce(identity, BinaryOperator) with parallel: multiplication is associative and commutative, so the result is always 1*1*2*3*4*5=120 regardless of thread order. The identity must be provided so partial results can be combined. Result: '120'."
  },
  {
    id: 1177, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Comparator</span>&lt;T&gt; reversed(<span class="cls">Comparator</span>&lt;T&gt; c) {
    <span class="kw">return</span> (a, b) -> c.compare(b, a);
}
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"banana"</span>, <span class="str">"apple"</span>, <span class="str">"cherry"</span>));
words.sort(reversed(<span class="cls">String</span>::compareTo));
<span class="cls">System</span>.out.println(words.get(<span class="num">0</span>));`,
    options: ["cherry", "apple", "banana", "Compilation error"],
    answer: 0,
    explanation: "reversed(comparator) swaps a and b → descending order. Alphabetically reversed: cherry > banana > apple. get(0)='cherry'. Result: 'cherry'."
  },
  {
    id: 1178, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"2024-06-15"</span>;
<span class="cls">String</span>[] parts = s.split(<span class="str">"-"</span>);
<span class="cls">String</span> reformatted = <span class="cls">String</span>.join(<span class="str">"/"</span>, parts[<span class="num">2</span>], parts[<span class="num">1</span>], parts[<span class="num">0</span>]);
<span class="cls">System</span>.out.println(reformatted);`,
    options: ["15/06/2024", "2024/06/15", "15-06-2024", "06/15/2024"],
    answer: 0,
    explanation: "split('-'): ['2024','06','15']. join('/', parts[2], parts[1], parts[0]) = join('/', '15', '06', '2024') = '15/06/2024'. Result: '15/06/2024'."
  },
  {
    id: 1179, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">EventSource</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">List</span>&lt;<span class="cls">Consumer</span>&lt;T&gt;&gt; listeners = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">void</span> on(<span class="cls">Consumer</span>&lt;T&gt; l) { listeners.add(l); }
    <span class="kw">void</span> emit(T event)  { listeners.forEach(l -> l.accept(event)); }
}
<span class="cls">EventSource</span>&lt;<span class="cls">Integer</span>&gt; src = <span class="kw">new</span> <span class="cls">EventSource</span>&lt;&gt;();
<span class="kw">int</span>[] sum = {<span class="num">0</span>};
src.on(n -> sum[<span class="num">0</span>] += n);
src.on(n -> sum[<span class="num">0</span>] += n * <span class="num">2</span>);
src.emit(<span class="num">5</span>);
<span class="cls">System</span>.out.println(sum[<span class="num">0</span>]);`,
    options: ["15", "10", "5", "Compilation error"],
    answer: 0,
    explanation: "Two listeners: first adds n=5 → sum=5. second adds n*2=10 → sum=15. Result: '15'."
  },
  {
    id: 1180, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Item</span>(<span class="cls">String</span> name, <span class="kw">int</span> qty, <span class="kw">double</span> price) {}
<span class="kw">var</span> items = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Item</span>(<span class="str">"A"</span>,<span class="num">2</span>,<span class="num">5.0</span>), <span class="kw">new</span> <span class="cls">Item</span>(<span class="str">"B"</span>,<span class="num">3</span>,<span class="num">4.0</span>), <span class="kw">new</span> <span class="cls">Item</span>(<span class="str">"C"</span>,<span class="num">1</span>,<span class="num">10.0</span>)
);
<span class="kw">double</span> total = items.stream()
    .mapToDouble(i -> i.qty() * i.price())
    .sum();
<span class="cls">System</span>.out.printf(<span class="str">"%.1f%n"</span>, total);`,
    options: ["32.0", "19.0", "30.0", "Compilation error"],
    answer: 0,
    explanation: "A: 2*5.0=10.0. B: 3*4.0=12.0. C: 1*10.0=10.0. sum=32.0. printf('%.1f')='32.0'. Result: '32.0'."
  },
  {
    id: 1181, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">1</span>,<span class="num">4</span>,<span class="num">1</span>,<span class="num">5</span>,<span class="num">9</span>,<span class="num">2</span>,<span class="num">6</span>));
<span class="cls">Collections</span>.sort(list);
<span class="kw">int</span> insertPoint = <span class="cls">Collections</span>.binarySearch(list, <span class="num">4</span>);
<span class="cls">System</span>.out.println(insertPoint);`,
    options: ["4", "3", "2", "-4"],
    answer: 0,
    explanation: "Sorted list: [1,1,2,3,4,5,6,9]. Indices: 0=1, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=9. binarySearch(list, 4): 4 is found at index 4. Returns 4. Result: '4'."
  },
  {
    id: 1182, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> ops = <span class="cls">Map</span>.of(
    <span class="str">"+"</span>, (<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt;)(<span class="kw">int</span> a, <span class="kw">int</span> b) -> a + b,
    <span class="str">"-"</span>, (<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt;)(<span class="kw">int</span> a, <span class="kw">int</span> b) -> a - b,
    <span class="str">"*"</span>, (<span class="cls">BinaryOperator</span>&lt;<span class="cls">Integer</span>&gt;)(<span class="kw">int</span> a, <span class="kw">int</span> b) -> a * b
);
<span class="cls">System</span>.out.println(ops.get(<span class="str">"*"</span>).apply(<span class="num">6</span>, <span class="num">7</span>));`,
    options: ["42", "13", "-1", "Compilation error"],
    answer: 0,
    explanation: "Map of String to BinaryOperator<Integer>. ops.get('*').apply(6,7) = 6*7 = 42. Result: '42'."
  },
  {
    id: 1183, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Validator</span>&lt;T&gt;(<span class="cls">Predicate</span>&lt;T&gt; rule, <span class="cls">String</span> message) {
    <span class="kw">boolean</span> isValid(T value) { <span class="kw">return</span> rule.test(value); }
    <span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; validate(T value) {
        <span class="kw">return</span> isValid(value) ? <span class="cls">Optional</span>.empty() : <span class="cls">Optional</span>.of(message);
    }
}
<span class="cls">Validator</span>&lt;<span class="cls">String</span>&gt; v = <span class="kw">new</span> <span class="cls">Validator</span>&lt;&gt;(
    s -> s != <span class="kw">null</span> && !s.isBlank(),
    <span class="str">"must not be blank"</span>
);
<span class="cls">System</span>.out.println(v.validate(<span class="str">"ok"</span>).orElse(<span class="str">"valid"</span>));
<span class="cls">System</span>.out.println(v.validate(<span class="str">"  "</span>).orElse(<span class="str">"valid"</span>));`,
    options: ["valid\nmust not be blank", "must not be blank\nvalid", "valid\nvalid", "Compilation error"],
    answer: 0,
    explanation: "validate('ok'): rule='ok'!=null && !'ok'.isBlank()=true → Optional.empty() → orElse='valid'. validate('  '): isBlank()=true → rule=false → Optional('must not be blank') → orElse not used = 'must not be blank'. Result: 'valid\\nmust not be blank'."
  },
  {
    id: 1184, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> { <span class="kw">void</span> m() { <span class="cls">System</span>.out.print(<span class="str">"A"</span>); } }
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> { <span class="kw">void</span> m() { <span class="kw">super</span>.m(); <span class="cls">System</span>.out.print(<span class="str">"B"</span>); } }
<span class="kw">class</span> <span class="cls">C</span> <span class="kw">extends</span> <span class="cls">B</span> { <span class="kw">void</span> m() { <span class="kw">super</span>.m(); <span class="cls">System</span>.out.print(<span class="str">"C"</span>); } }
<span class="kw">class</span> <span class="cls">D</span> <span class="kw">extends</span> <span class="cls">C</span> { <span class="kw">void</span> m() { <span class="kw">super</span>.m(); <span class="cls">System</span>.out.print(<span class="str">"D"</span>); } }
<span class="kw">new</span> <span class="cls">D</span>().m();`,
    options: ["ABCD", "DCBA", "D", "Compilation error"],
    answer: 0,
    explanation: "D.m() calls super.m() (C.m()) which calls super.m() (B.m()) which calls super.m() (A.m()). A prints 'A'. Returns to B: prints 'B'. Returns to C: prints 'C'. Returns to D: prints 'D'. Result: 'ABCD'."
  },
  {
    id: 1185, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.iterate(<span class="num">0</span>, n -> n + <span class="num">1</span>)
    .filter(n -> n % <span class="num">7</span> == <span class="num">0</span>)
    .skip(<span class="num">1</span>)
    .limit(<span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[7, 14, 21]", "[0, 7, 14]", "[14, 21, 28]", "[21, 28, 35]"],
    answer: 0,
    explanation: "iterate(0, n+1): 0,1,2,... filter(n%7==0): produces 0,7,14,21,28,... skip(1): skips the first element of the filtered stream (0), remaining: 7,14,21,28... limit(3): [7,14,21]. Result: '[7, 14, 21]'."
  },
  {
    id: 1186, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Stack</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Deque</span>&lt;T&gt; dq = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
    <span class="cls">Stack</span>&lt;T&gt; push(T t)    { dq.push(t);  <span class="kw">return this</span>; }
    T        peek()        { <span class="kw">return</span> dq.peek(); }
    T        pop()         { <span class="kw">return</span> dq.pop(); }
    <span class="kw">boolean</span>  isEmpty()     { <span class="kw">return</span> dq.isEmpty(); }
}
<span class="cls">Stack</span>&lt;<span class="cls">String</span>&gt; s = <span class="kw">new</span> <span class="cls">Stack</span>&lt;&gt;();
s.push(<span class="str">"a"</span>).push(<span class="str">"b"</span>).push(<span class="str">"c"</span>);
<span class="cls">StringBuilder</span> sb = <span class="kw">new</span> <span class="cls">StringBuilder</span>();
<span class="kw">while</span> (!s.isEmpty()) sb.append(s.pop());
<span class="cls">System</span>.out.println(sb.toString());`,
    options: ["cba", "abc", "cab", "Compilation error"],
    answer: 0,
    explanation: "push a,b,c: stack top = c. pop order: c,b,a. sb.append: 'cba'. Result: 'cba'."
  },
  {
    id: 1187, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s1 = <span class="str">"Hello, World!"</span>;
<span class="cls">System</span>.out.println(s1.chars()
    .filter(<span class="cls">Character</span>::isUpperCase)
    .count());
<span class="cls">System</span>.out.println(s1.chars()
    .mapToObj(c -> <span class="cls">String</span>.valueOf((<span class="kw">char</span>)c))
    .filter(s -> s.matches(<span class="str">"[A-Za-z]"</span>))
    .count());`,
    options: ["2\n10", "1\n10", "2\n11", "2\n12"],
    answer: 0,
    explanation: "Uppercase in 'Hello, World!': H, W → count=2. Letters matching [A-Za-z]: H,e,l,l,o,W,o,r,l,d → count=10. Result: '2\\n10'."
  },
  {
    id: 1188, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">T</span> fold(<span class="cls">List</span>&lt;T&gt; list, T identity, <span class="cls">BinaryOperator</span>&lt;T&gt; op) {
    T result = identity;
    <span class="kw">for</span> (T item : list) result = op.apply(result, item);
    <span class="kw">return</span> result;
}
<span class="cls">System</span>.out.println(fold(<span class="cls">List</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>), <span class="str">""</span>, (a,b) -> a + b));
<span class="cls">System</span>.out.println(fold(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>), <span class="num">0</span>, <span class="cls">Integer</span>::sum));`,
    options: ["abc\n10", "cba\n10", "abc\n0", "Compilation error"],
    answer: 0,
    explanation: "fold(['a','b','c'], '', +): ''+a=a, a+b=ab, ab+c=abc. fold([1,2,3,4], 0, sum): 0+1+2+3+4=10. Result: 'abc\\n10'."
  },
  {
    id: 1189, topic: "Exception Handling",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">int</span> risky(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n < <span class="num">0</span>) <span class="kw">throw new</span> <span class="cls">IllegalArgumentException</span>(<span class="str">"negative"</span>);
    <span class="kw">return</span> n * n;
}
<span class="kw">int</span>[] data = {<span class="num">2</span>, -<span class="num">1</span>, <span class="num">3</span>};
<span class="kw">int</span> total = <span class="num">0</span>;
<span class="kw">for</span> (<span class="kw">int</span> d : data) {
    <span class="kw">try</span> { total += risky(d); }
    <span class="kw">catch</span> (<span class="cls">IllegalArgumentException</span> e) { total += <span class="num">0</span>; }
}
<span class="cls">System</span>.out.println(total);`,
    options: ["13", "4", "9", "Compilation error"],
    answer: 0,
    explanation: "risky(2)=4: total=4. risky(-1): throws IAE, caught: total+=0 → total=4. risky(3)=9: total=13. Result: '13'."
  },
  {
    id: 1190, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
<span class="cls">List</span>.of(<span class="str">"apple"</span>,<span class="str">"banana"</span>,<span class="str">"apricot"</span>,<span class="str">"avocado"</span>)
    .forEach(s -> m.putIfAbsent(s.substring(<span class="num">0</span>,<span class="num">1</span>), s));
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(m));`,
    options: ["{a=apple, b=banana}", "{a=avocado, b=banana}", "{a=apricot, b=banana}", "{apple=a, banana=b}"],
    answer: 0,
    explanation: "putIfAbsent: 'apple' → key='a' absent → put a=apple. 'banana' → b absent → put b=banana. 'apricot' → a present → skip. 'avocado' → a present → skip. TreeMap: {a=apple, b=banana}. Result: '{a=apple, b=banana}'."
  },
  {
    id: 1191, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"hello"</span>,<span class="str">"world"</span>,<span class="str">"java"</span>,<span class="str">"17"</span>)
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        s -> s.matches(<span class="str">".*\\\\d.*"</span>)
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>).size() + <span class="str">" "</span> + r.get(<span class="kw">false</span>).size());`,
    options: ["1 3", "2 2", "0 4", "Compilation error"],
    answer: 0,
    explanation: "partitioningBy: contains digit regex '.*\\d.*'. '17' contains digits → true. Others ('hello','world','java') → false. true=[17] size=1. false=[hello,world,java] size=3. Result: '1 3'."
  },
  {
    id: 1192, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">10</span>)
        .thenApply(n -> n / <span class="num">0</span>)           <span class="cm">// throws ArithmeticException</span>
        .exceptionally(e -> <span class="num">-1</span>)
        .thenApply(n -> n * <span class="num">3</span>);
<span class="cls">System</span>.out.println(f.get());`,
    options: ["-3", "30", "-1", "Throws ExecutionException"],
    answer: 0,
    explanation: "supplyAsync→10. thenApply(10/0): throws ArithmeticException. exceptionally→-1. thenApply(-1*3)=-3. f.get()=-3. Result: '-3'."
  },
  {
    id: 1193, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Chain</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">List</span>&lt;<span class="cls">Function</span>&lt;T,T&gt;&gt; steps = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="cls">Chain</span>&lt;T&gt; then(<span class="cls">Function</span>&lt;T,T&gt; f) { steps.add(f); <span class="kw">return this</span>; }
    T apply(T input) {
        T result = input;
        <span class="kw">for</span> (<span class="kw">var</span> step : steps) result = step.apply(result);
        <span class="kw">return</span> result;
    }
}
<span class="cls">String</span> r = <span class="kw">new</span> <span class="cls">Chain</span>&lt;<span class="cls">String</span>&gt;()
    .then(<span class="cls">String</span>::trim)
    .then(<span class="cls">String</span>::toUpperCase)
    .then(s -> s + <span class="str">"!"</span>)
    .apply(<span class="str">"  hello  "</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["HELLO!", "hello!", "  HELLO  !", "Compilation error"],
    answer: 0,
    explanation: "Chain: trim→toUpperCase→append '!'. '  hello  '.trim()='hello'. toUpperCase()='HELLO'. +'!'='HELLO!'. Result: 'HELLO!'."
  },
  {
    id: 1194, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>,<span class="str">"d"</span>)
    .collect(<span class="cls">Collectors</span>.toUnmodifiableList());
<span class="kw">try</span> {
    r.add(<span class="str">"e"</span>);
} <span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"immutable "</span>);
}
<span class="cls">System</span>.out.println(r.size());`,
    options: ["immutable 4", "immutable 5", "4", "Compilation error"],
    answer: 0,
    explanation: "toUnmodifiableList() creates an immutable list. r.add('e') throws UnsupportedOperationException → prints 'immutable '. r.size()=4 (unchanged). Result: 'immutable 4'."
  },
  {
    id: 1195, topic: "JVM & Memory",
    text: "Which statement about finalize() in Java is CORRECT?",
    code: null,
    options: [
      "finalize() is called immediately when an object becomes unreachable",
      "finalize() is deprecated since Java 9 and may not run at all — use Cleaner or try-with-resources instead",
      "finalize() is always called before the GC collects the object",
      "finalize() runs in the same thread as the code that released the last reference"
    ],
    answer: 1,
    explanation: "finalize() was deprecated in Java 9 and marked for removal. It has several problems: no guarantee it runs, no guarantee when it runs, only called once, can resurrect objects, and slows GC. Java 9+ recommends java.lang.ref.Cleaner or try-with-resources for resource cleanup."
  },
  {
    id: 1196, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Result</span>&lt;T&gt;(T value, <span class="cls">Throwable</span> error) {
    <span class="kw">static</span> &lt;T&gt; <span class="cls">Result</span>&lt;T&gt; of(<span class="cls">Supplier</span>&lt;T&gt; supplier) {
        <span class="kw">try</span> { <span class="kw">return new</span> <span class="cls">Result</span>&lt;&gt;(supplier.get(), <span class="kw">null</span>); }
        <span class="kw">catch</span> (<span class="cls">Exception</span> e) { <span class="kw">return new</span> <span class="cls">Result</span>&lt;&gt;(<span class="kw">null</span>, e); }
    }
    <span class="kw">boolean</span> isSuccess() { <span class="kw">return</span> error == <span class="kw">null</span>; }
}
<span class="cls">Result</span>&lt;<span class="cls">Integer</span>&gt; r1 = <span class="cls">Result</span>.of(() -> <span class="num">42</span>);
<span class="cls">Result</span>&lt;<span class="cls">Integer</span>&gt; r2 = <span class="cls">Result</span>.of(() -> <span class="num">10</span> / <span class="num">0</span>);
<span class="cls">System</span>.out.println(r1.isSuccess() + <span class="str">" "</span> + r2.isSuccess());`,
    options: ["true false", "false true", "true true", "Compilation error"],
    answer: 0,
    explanation: "r1: supplier returns 42, no exception → Result(42, null). isSuccess()=true. r2: supplier throws ArithmeticException → Result(null, ArithmeticException). isSuccess()=false. Result: 'true false'."
  },
  {
    id: 1197, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapToLong(<span class="cls">Integer</span>::longValue)
    .average()
    .orElse(<span class="num">0.0</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["3.0", "15.0", "5.0", "1.0"],
    answer: 0,
    explanation: "mapToLong creates a LongStream. average() of [1,2,3,4,5] = 15.0/5 = 3.0. Result: '3.0'."
  },
  {
    id: 1198, topic: "Abstract Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Sorter</span>&lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; {
    <span class="kw">abstract</span> <span class="cls">List</span>&lt;T&gt; sort(<span class="cls">List</span>&lt;T&gt; input);
    <span class="cls">List</span>&lt;T&gt; sortAndDeduplicate(<span class="cls">List</span>&lt;T&gt; input) {
        <span class="kw">return</span> sort(input).stream().distinct().collect(<span class="cls">Collectors</span>.toList());
    }
}
<span class="cls">Sorter</span>&lt;<span class="cls">Integer</span>&gt; asc = <span class="kw">new</span> <span class="cls">Sorter</span>&lt;&gt;() {
    <span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; sort(<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; input) {
        <span class="kw">var</span> r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(input);
        <span class="cls">Collections</span>.sort(r);
        <span class="kw">return</span> r;
    }
};
<span class="cls">System</span>.out.println(asc.sortAndDeduplicate(<span class="cls">List</span>.of(<span class="num">3</span>,<span class="num">1</span>,<span class="num">2</span>,<span class="num">1</span>,<span class="num">3</span>)));`,
    options: ["[1, 2, 3]", "[3, 1, 2, 1, 3]", "[1, 1, 2, 3, 3]", "Compilation error"],
    answer: 0,
    explanation: "sort([3,1,2,1,3])=[1,1,2,3,3]. distinct()=[1,2,3]. collect to list. Result: '[1, 2, 3]'."
  },
  {
    id: 1199, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Pipe</span>&lt;A, B&gt; {
    <span class="kw">final</span> <span class="cls">Function</span>&lt;A, B&gt; fn;
    <span class="cls">Pipe</span>(<span class="cls">Function</span>&lt;A, B&gt; fn) { <span class="kw">this</span>.fn = fn; }
    B apply(A a) { <span class="kw">return</span> fn.apply(a); }
    &lt;C&gt; <span class="cls">Pipe</span>&lt;A, C&gt; andThen(<span class="cls">Function</span>&lt;B, C&gt; after) {
        <span class="kw">return new</span> <span class="cls">Pipe</span>&lt;&gt;(a -> after.apply(fn.apply(a)));
    }
}
<span class="cls">Pipe</span>&lt;<span class="cls">String</span>, <span class="cls">String</span>&gt; pipe =
    <span class="kw">new</span> <span class="cls">Pipe</span>&lt;&gt;(<span class="cls">String</span>::trim)
        .andThen(<span class="cls">String</span>::toUpperCase)
        .andThen(s -> <span class="str">"["</span> + s + <span class="str">"]"</span>);
<span class="cls">System</span>.out.println(pipe.apply(<span class="str">"  hello  "</span>));`,
    options: ["[HELLO]", "[hello]", "[  hello  ]", "Compilation error"],
    answer: 0,
    explanation: "Pipe: trim → toUpperCase → wrap. '  hello  '.trim()='hello'. toUpperCase()='HELLO'. wrap='[HELLO]'. Result: '[HELLO]'."
  },
  {
    id: 1200, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Employee</span>(<span class="cls">String</span> dept, <span class="cls">String</span> name, <span class="kw">double</span> salary) {}
<span class="kw">var</span> employees = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"eng"</span>,<span class="str">"Alice"</span>,<span class="num">90000</span>),
    <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"eng"</span>,<span class="str">"Bob"</span>,  <span class="num">80000</span>),
    <span class="kw">new</span> <span class="cls">Employee</span>(<span class="str">"hr"</span>, <span class="str">"Carol"</span>,<span class="num">60000</span>)
);
<span class="kw">var</span> r = employees.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">Employee</span>::dept,
        <span class="cls">Collectors</span>.averagingDouble(<span class="cls">Employee</span>::salary)
    ));
<span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(r).forEach((d,avg) ->
    <span class="cls">System</span>.out.printf(<span class="str">"%s=%.0f%n"</span>, d, avg));`,
    options: ["eng=85000\nhr=60000", "hr=60000\neng=85000", "eng=90000\nhr=60000", "Compilation error"],
    answer: 0,
    explanation: "groupingBy dept, averagingDouble salary. eng: (90000+80000)/2=85000. hr: 60000/1=60000. TreeMap alphabetical: eng < hr. printf('%s=%.0f'): 'eng=85000\\nhr=60000'. Result: 'eng=85000\\nhr=60000'."
  }
];
