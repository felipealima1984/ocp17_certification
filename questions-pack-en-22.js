// ═══════════════════════════════════════════════════════
//  PACK EN-22 — Questions 1051–1100  (English)
//  Topics: NIO.2 channel operations, Stream.iterate,
//          CompletableFuture orchestration, Collectors
//          downstream advanced, Generics type tokens,
//          Exception handling patterns, JVM internals,
//          Design patterns Visitor/Template/Observer,
//          Localization MessageFormat, Bitwise tricks,
//          Records with generics, Array streams,
//          String methods deep dive, Switch null-safe
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_22 = [
  {
    id: 1051, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> fib = <span class="cls">Stream</span>.iterate(
    <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">0</span>, <span class="num">1</span>},
    a -> <span class="kw">new</span> <span class="kw">int</span>[]{a[<span class="num">1</span>], a[<span class="num">0</span>] + a[<span class="num">1</span>]}
)
.limit(<span class="num">7</span>)
.mapToInt(a -> a[<span class="num">0</span>])
.sum();
<span class="cls">System</span>.out.println(fib);`,
    options: ["20", "33", "12", "21"],
    answer: 0,
    explanation: "Stream.iterate generates: [0,1],[1,1],[1,2],[2,3],[3,5],[5,8],[8,13]. mapToInt(a[0]): 0,1,1,2,3,5,8. limit(7) takes 7. sum=0+1+1+2+3+5+8=20. Result: '20'."
  },
  {
    id: 1052, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.iterate(<span class="num">1</span>, n -> n <= <span class="num">100</span>, n -> n * <span class="num">2</span>)
    .peek(n -> <span class="cls">System</span>.out.print(n + <span class="str">" "</span>))
    .filter(n -> n > <span class="num">10</span>)
    .findFirst();
<span class="cls">System</span>.out.println(r.orElse(<span class="num">-1</span>));`,
    options: ["1 2 4 8 16 16", "1 2 4 8 16 ", "16", "1 2 4 8 16 32"],
    answer: 0,
    explanation: "Stream.iterate(1, n<=100, n*2): 1,2,4,8,16,32,... Lazy + findFirst short-circuits. 1: peek prints '1 ', filter fails. 2: '2 ', fails. 4: '4 ', fails. 8: '8 ', fails. 16: '16 ', filter passes → findFirst returns 16. orElse=16. Total: '1 2 4 8 16 16'."
  },
  {
    id: 1053, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> cf = <span class="cls">CompletableFuture</span>
    .supplyAsync(() -> <span class="num">10</span>)
    .thenApply(n -> n * <span class="num">2</span>)
    .thenApplyAsync(n -> n + <span class="num">5</span>)
    .whenComplete((v, e) -> {
        <span class="kw">if</span> (e == <span class="kw">null</span>) <span class="cls">System</span>.out.print(<span class="str">"ok:"</span> + v + <span class="str">" "</span>);
    })
    .thenApply(n -> n * n);
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["ok:25 625", "ok:25 25", "625", "ok:20 400"],
    answer: 0,
    explanation: "supplyAsync→10. thenApply(*2)→20. thenApplyAsync(+5)→25. whenComplete: e==null, prints 'ok:25 ', passes 25 through. thenApply(*n)→25*25=625. cf.get()=625. Result: 'ok:25 625'."
  },
  {
    id: 1054, topic: "CompletableFuture",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f1 =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> { <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"err"</span>); });
<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; f2 =
    f1.exceptionally(e -> <span class="num">42</span>)
      .thenApply(n -> n * <span class="num">2</span>);
<span class="cls">System</span>.out.println(f2.get());`,
    options: ["84", "42", "Throws ExecutionException", "0"],
    answer: 0,
    explanation: "f1 throws RuntimeException. exceptionally catches it and returns 42 as fallback. thenApply(42*2)=84. f2.get()=84. Result: '84'."
  },
  {
    id: 1055, topic: "Collectors",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>,<span class="str">"bat"</span>,<span class="str">"car"</span>,<span class="str">"bar"</span>,<span class="str">"can"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        s -> s.charAt(<span class="num">0</span>),
        <span class="cls">Collectors</span>.groupingBy(
            s -> s.charAt(<span class="num">2</span>),
            <span class="cls">Collectors</span>.counting()
        )
    ));
<span class="cls">System</span>.out.println(r.get(<span class="str">'c'</span>).get(<span class="str">'t'</span>));`,
    options: ["1", "2", "3", "null"],
    answer: 0,
    explanation: "Two-level groupingBy: first by char[0], then by char[2]. Group 'c': cat(t), car(r), can(n). Sub-group by char[2]: 't'→[cat]→count=1. r.get('c').get('t')=1. Result: '1'."
  },
  {
    id: 1056, topic: "Collectors",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        n -> n,
        n -> n % <span class="num">2</span> == <span class="num">0</span> ? <span class="str">"even"</span> : <span class="str">"odd"</span>
    ));
<span class="kw">long</span> evens = r.values().stream()
    .filter(<span class="str">"even"</span>::equals)
    .count();
<span class="cls">System</span>.out.println(evens);`,
    options: ["2", "3", "5", "Compilation error"],
    answer: 0,
    explanation: "toMap: {1→odd, 2→even, 3→odd, 4→even, 5→odd}. values().stream().filter('even'::equals).count(): 2 and 4 → count=2. Result: '2'."
  },
  {
    id: 1057, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; T createInstance(<span class="cls">Class</span>&lt;T&gt; clazz) <span class="kw">throws</span> <span class="cls">Exception</span> {
    <span class="kw">return</span> clazz.getDeclaredConstructor().newInstance();
}
<span class="cls">StringBuilder</span> sb = createInstance(<span class="cls">StringBuilder</span>.<span class="kw">class</span>);
sb.append(<span class="str">"hello"</span>);
<span class="cls">System</span>.out.println(sb.length());`,
    options: ["5", "0", "Throws ReflectiveOperationException", "Compilation error"],
    answer: 0,
    explanation: "createInstance uses Class<T> as a type token to create a new instance via reflection. getDeclaredConstructor().newInstance() calls the no-arg constructor. sb is a new StringBuilder. append('hello') → length=5. Result: '5'."
  },
  {
    id: 1058, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T extends Number&gt; <span class="kw">double</span> sum(<span class="cls">List</span>&lt;T&gt;... lists) {
    <span class="kw">double</span> total = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">var</span> list : lists)
        <span class="kw">for</span> (<span class="kw">var</span> n : list) total += n.doubleValue();
    <span class="kw">return</span> total;
}
<span class="cls">System</span>.out.println(sum(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>), <span class="cls">List</span>.of(<span class="num">3.5</span>,<span class="num">4.5</span>)));`,
    options: ["11.0", "10.5", "3.0", "Compilation error"],
    answer: 0,
    explanation: "Varargs of generic List<T extends Number>. sum: 1+2=3 from first list, 3.5+4.5=8 from second list. total=11.0. Result: '11.0'."
  },
  {
    id: 1059, topic: "Exception Handling",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">int</span> divide(<span class="kw">int</span> a, <span class="kw">int</span> b) {
    <span class="kw">if</span> (b == <span class="num">0</span>) <span class="kw">throw new</span> <span class="cls">ArithmeticException</span>(<span class="str">"division by zero"</span>);
    <span class="kw">return</span> a / b;
}
<span class="kw">int</span> result = <span class="num">0</span>;
<span class="kw">try</span> {
    result = divide(<span class="num">10</span>, <span class="num">2</span>);
    result += divide(<span class="num">6</span>, <span class="num">0</span>);
    result += divide(<span class="num">8</span>, <span class="num">4</span>);
} <span class="kw">catch</span> (<span class="cls">ArithmeticException</span> e) {
    result += <span class="num">100</span>;
}
<span class="cls">System</span>.out.println(result);`,
    options: ["105", "100", "7", "Compilation error"],
    answer: 0,
    explanation: "divide(10,2)=5: result=5. divide(6,0): throws ArithmeticException. result+=8 never runs. catch: result+=100 → result=105. Result: '105'."
  },
  {
    id: 1060, topic: "Exception Handling",
    text: "Which of the following is the correct way to re-throw an exception preserving the original stack trace?",
    code: null,
    options: [
      "throw new RuntimeException(\"wrapper\");",
      "throw new RuntimeException(\"wrapper\", e);",
      "throw e.getCause();",
      "throw new RuntimeException(e.getMessage());"
    ],
    answer: 1,
    explanation: "Option B: new RuntimeException('wrapper', e) uses the Throwable(String, Throwable) constructor — the original exception 'e' becomes the cause, preserving its stack trace via getCause(). Option A discards the original. Option D copies only the message, losing the stack. Option C requires a cast and may fail if getCause() returns null."
  },
  {
    id: 1061, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[] a = <span class="kw">new</span> <span class="kw">int</span>[<span class="num">3</span>];
<span class="kw">int</span>[] b = a;
b[<span class="num">0</span>] = <span class="num">42</span>;
<span class="cls">System</span>.out.println(a[<span class="num">0</span>] + <span class="str">" "</span> + (a == b));`,
    options: ["42 true", "0 true", "42 false", "0 false"],
    answer: 0,
    explanation: "Arrays are objects on the heap. 'b = a' copies the REFERENCE, not the array. Both a and b point to the same array. b[0]=42 also changes a[0]. a == b compares references → same object → true. Result: '42 true'."
  },
  {
    id: 1062, topic: "JVM & Memory",
    text: "What does the -Xmx JVM flag control?",
    code: null,
    options: [
      "The initial heap size",
      "The maximum heap size",
      "The stack size per thread",
      "The Metaspace size limit"
    ],
    answer: 1,
    explanation: "-Xmx sets the maximum Java heap size. -Xms sets the initial heap size. -Xss sets the thread stack size. -XX:MaxMetaspaceSize controls Metaspace. When the heap reaches -Xmx, the JVM throws OutOfMemoryError rather than allocating more."
  },
  {
    id: 1063, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Visitor</span>&lt;T&gt; {
    T visit(<span class="cls">Circle</span> c);
    T visit(<span class="cls">Square</span> s);
}
<span class="kw">class</span> <span class="cls">Circle</span>  { <span class="kw">double</span> r; <span class="cls">Circle</span>(<span class="kw">double</span> r)  { <span class="kw">this</span>.r=r; } <span class="kw">double</span> area(<span class="cls">Visitor</span>&lt;<span class="cls">Double</span>&gt; v) { <span class="kw">return</span> v.visit(<span class="kw">this</span>); } }
<span class="kw">class</span> <span class="cls">Square</span>  { <span class="kw">double</span> s; <span class="cls">Square</span>(<span class="kw">double</span> s)  { <span class="kw">this</span>.s=s; } <span class="kw">double</span> area(<span class="cls">Visitor</span>&lt;<span class="cls">Double</span>&gt; v) { <span class="kw">return</span> v.visit(<span class="kw">this</span>); } }
<span class="cls">Visitor</span>&lt;<span class="cls">Double</span>&gt; areaCalc = <span class="kw">new</span> <span class="cls">Visitor</span>&lt;<span class="cls">Double</span>&gt;() {
    <span class="kw">public</span> <span class="cls">Double</span> visit(<span class="cls">Circle</span> c)  { <span class="kw">return</span> <span class="cls">Math</span>.PI * c.r * c.r; }
    <span class="kw">public</span> <span class="cls">Double</span> visit(<span class="cls">Square</span> s)  { <span class="kw">return</span> s.s * s.s; }
};
<span class="cls">System</span>.out.printf(<span class="str">"%.2f%n"</span>, <span class="kw">new</span> <span class="cls">Square</span>(<span class="num">4</span>).area(areaCalc));`,
    options: ["16.00", "12.57", "50.27", "4.00"],
    answer: 0,
    explanation: "Visitor pattern. Square(4).area(areaCalc) calls areaCalc.visit(this) where 'this' is a Square. visit(Square s): s.s*s.s = 4*4 = 16. printf('%.2f') → '16.00'. Result: '16.00'."
  },
  {
    id: 1064, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Subject</span> {
    <span class="kw">private</span> <span class="cls">List</span>&lt;<span class="cls">Runnable</span>&gt; observers = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">private int</span> state = <span class="num">0</span>;
    <span class="kw">void</span> addObserver(<span class="cls">Runnable</span> r) { observers.add(r); }
    <span class="kw">void</span> setState(<span class="kw">int</span> s) { state = s; observers.forEach(<span class="cls">Runnable</span>::run); }
    <span class="kw">int</span>  getState()      { <span class="kw">return</span> state; }
}
<span class="cls">Subject</span> sub = <span class="kw">new</span> <span class="cls">Subject</span>();
sub.addObserver(() -> <span class="cls">System</span>.out.print(<span class="str">"A:"</span>  + sub.getState() + <span class="str">" "</span>));
sub.addObserver(() -> <span class="cls">System</span>.out.print(<span class="str">"B:"</span>  + sub.getState() + <span class="str">" "</span>));
sub.setState(<span class="num">7</span>);`,
    options: ["A:7 B:7 ", "B:7 A:7 ", "A:0 B:0 ", "Compilation error"],
    answer: 0,
    explanation: "Observer pattern. setState(7): state=7, then notifies observers in order. A prints 'A:7 ', B prints 'B:7 '. Result: 'A:7 B:7 '."
  },
  {
    id: 1065, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">MessageFormat</span> mf = <span class="kw">new</span> <span class="cls">MessageFormat</span>(
    <span class="str">"Hello, {0}! You have {1} message{1,choice,0#s|1#|2#s}."</span>,
    <span class="cls">Locale</span>.ENGLISH
);
<span class="cls">System</span>.out.println(mf.format(<span class="kw">new</span> <span class="cls">Object</span>[]{<span class="str">"Alice"</span>, <span class="num">1</span>}));`,
    options: [
      "Hello, Alice! You have 1 message.",
      "Hello, Alice! You have 1 messages.",
      "Hello, {0}! You have 1 message.",
      "Compilation error"
    ],
    answer: 0,
    explanation: "MessageFormat: {0}='Alice', {1}=1. The choice pattern {1,choice,0#s|1#|2#s}: value=1 → matches '1#' → appends nothing (empty string). Result: 'Hello, Alice! You have 1 message.' (singular, no 's')."
  },
  {
    id: 1066, topic: "Bitwise",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> flags = <span class="num">0</span>;
<span class="kw">int</span> READ    = <span class="num">1</span> << <span class="num">0</span>; <span class="cm">// 001</span>
<span class="kw">int</span> WRITE   = <span class="num">1</span> << <span class="num">1</span>; <span class="cm">// 010</span>
<span class="kw">int</span> EXECUTE = <span class="num">1</span> << <span class="num">2</span>; <span class="cm">// 100</span>
flags |= READ | WRITE;
flags &= ~WRITE;
<span class="cls">System</span>.out.println((flags & READ)    != <span class="num">0</span>);
<span class="cls">System</span>.out.println((flags & WRITE)   != <span class="num">0</span>);
<span class="cls">System</span>.out.println((flags & EXECUTE) != <span class="num">0</span>);`,
    options: ["true\nfalse\nfalse", "true\ntrue\nfalse", "false\nfalse\nfalse", "true\nfalse\ntrue"],
    answer: 0,
    explanation: "flags |= READ|WRITE → flags=011=3. flags &= ~WRITE → ~010=...101 → 3 & 5 = 001=1. READ check: 1&1=1≠0 → true. WRITE check: 1&2=0 → false. EXECUTE check: 1&4=0 → false. Result: 'true\\nfalse\\nfalse'."
  },
  {
    id: 1067, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Either</span>&lt;L, R&gt;(<span class="cls">L</span> left, <span class="cls">R</span> right) {
    <span class="kw">static</span> &lt;L, R&gt; <span class="cls">Either</span>&lt;L,R&gt; ofLeft(<span class="cls">L</span> value) {
        <span class="kw">return new</span> <span class="cls">Either</span>&lt;&gt;(value, <span class="kw">null</span>);
    }
    <span class="kw">boolean</span> isLeft()  { <span class="kw">return</span> left != <span class="kw">null</span> && right == <span class="kw">null</span>; }
    <span class="kw">boolean</span> isRight() { <span class="kw">return</span> right != <span class="kw">null</span> && left == <span class="kw">null</span>; }
}
<span class="cls">Either</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; e = <span class="cls">Either</span>.ofLeft(<span class="str">"error"</span>);
<span class="cls">System</span>.out.println(e.isLeft() + <span class="str">" "</span> + e.left());`,
    options: ["true error", "false error", "true null", "Compilation error"],
    answer: 0,
    explanation: "ofLeft('error'): Either<String,Integer>('error', null). isLeft(): left='error'!=null && right=null==null → true. left()='error'. Result: 'true error'."
  },
  {
    id: 1068, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span>[] names = {<span class="str">"Charlie"</span>, <span class="str">"Alice"</span>, <span class="str">"Bob"</span>};
<span class="cls">Arrays</span>.sort(names);
<span class="kw">int</span> idx = <span class="cls">Arrays</span>.binarySearch(names, <span class="str">"Bob"</span>);
<span class="cls">System</span>.out.println(idx + <span class="str">" "</span> + names[idx]);`,
    options: ["1 Bob", "0 Alice", "2 Charlie", "-1 "],
    answer: 0,
    explanation: "After sort: [Alice, Bob, Charlie]. binarySearch(names, 'Bob'): Bob is at index 1. Result: '1 Bob'."
  },
  {
    id: 1069, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[][] src = {{<span class="num">1</span>,<span class="num">2</span>},{<span class="num">3</span>,<span class="num">4</span>}};
<span class="kw">int</span>[][] dst = <span class="kw">new</span> <span class="kw">int</span>[<span class="num">2</span>][<span class="num">2</span>];
<span class="cls">System</span>.arraycopy(src, <span class="num">0</span>, dst, <span class="num">0</span>, <span class="num">2</span>);
dst[<span class="num">0</span>][<span class="num">0</span>] = <span class="num">99</span>;
<span class="cls">System</span>.out.println(src[<span class="num">0</span>][<span class="num">0</span>] + <span class="str">" "</span> + dst[<span class="num">1</span>][<span class="num">1</span>]);`,
    options: ["99 4", "1 4", "99 99", "1 99"],
    answer: 0,
    explanation: "arraycopy performs a SHALLOW copy. dst[0] and src[0] point to the same inner array. dst[0][0]=99 also changes src[0][0]=99. dst[1] also shares src[1]: dst[1][1]=4. Result: '99 4'."
  },
  {
    id: 1070, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  Java  17  OCP  "</span>;
<span class="kw">var</span> r = <span class="cls">Arrays</span>.stream(s.trim().split(<span class="str">"\\\\s+"</span>))
    .map(<span class="cls">String</span>::toLowerCase)
    .sorted()
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">"-"</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["17-java-ocp", "java-17-ocp", "ocp-java-17", "Compilation error"],
    answer: 0,
    explanation: "trim(): 'Java  17  OCP'. split('\\\\s+'):['Java','17','OCP']. toLowerCase(): ['java','17','ocp']. sorted() alphabetically: '17' < 'java' < 'ocp' (digits sort before letters in Unicode). joining('-'): '17-java-ocp'. Result: '17-java-ocp'."
  },
  {
    id: 1071, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> template = <span class="str">"Name: {name}, Age: {age}"</span>;
<span class="cls">String</span> result = template
    .replace(<span class="str">"{name}"</span>, <span class="str">"Alice"</span>)
    .replace(<span class="str">"{age}"</span>,  <span class="str">"30"</span>);
<span class="cls">System</span>.out.println(result);`,
    options: ["Name: Alice, Age: 30", "Name: {name}, Age: 30", "Name: Alice, Age: {age}", "Compilation error"],
    answer: 0,
    explanation: "replace() returns a new String. Chaining: first replaces {name}→Alice, then {age}→30. result='Name: Alice, Age: 30'. Result: 'Name: Alice, Age: 30'."
  },
  {
    id: 1072, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="kw">null</span>;
<span class="kw">try</span> {
    <span class="kw">int</span> r = <span class="kw">switch</span>(obj) {
        <span class="kw">case</span> <span class="cls">Integer</span> i -> i;
        <span class="kw">default</span> -> <span class="num">-1</span>;
    };
    <span class="cls">System</span>.out.println(r);
} <span class="kw">catch</span> (<span class="cls">NullPointerException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"NPE"</span>);
}`,
    options: ["NPE", "-1", "0", "Compilation error"],
    answer: 0,
    explanation: "Pattern matching switch without an explicit 'case null' throws NullPointerException when the selector is null. Without 'case null', null never matches any pattern — the JVM throws NPE. Result: 'NPE'."
  },
  {
    id: 1073, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
m.put(<span class="str">"a"</span>, <span class="num">1</span>); m.put(<span class="str">"b"</span>, <span class="num">2</span>); m.put(<span class="str">"c"</span>, <span class="num">3</span>);
m.replaceAll((k, v) -> v * <span class="num">10</span>);
<span class="cls">System</span>.out.println(m.get(<span class="str">"b"</span>));`,
    options: ["20", "2", "10", "Compilation error"],
    answer: 0,
    explanation: "replaceAll(BiFunction<K,V,V>) replaces every value with the result of the function. 'b'→2*10=20. m.get('b')=20. Result: '20'."
  },
  {
    id: 1074, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Shape</span> {
    <span class="kw">abstract double</span> area();
    <span class="kw">final</span> <span class="cls">String</span> describe() {
        <span class="kw">return</span> getClass().getSimpleName() + <span class="str">"[area="</span> +
               <span class="cls">String</span>.format(<span class="str">"%.1f"</span>, area()) + <span class="str">"]"</span>;
    }
}
<span class="kw">class</span> <span class="cls">Circle</span> <span class="kw">extends</span> <span class="cls">Shape</span> {
    <span class="kw">double</span> r;
    <span class="cls">Circle</span>(<span class="kw">double</span> r) { <span class="kw">this</span>.r = r; }
    <span class="kw">double</span> area()   { <span class="kw">return</span> <span class="cls">Math</span>.PI * r * r; }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Circle</span>(<span class="num">3</span>).describe());`,
    options: ["Circle[area=28.3]", "Shape[area=28.3]", "Circle[area=9.0]", "Compilation error"],
    answer: 0,
    explanation: "describe() is final, uses getClass().getSimpleName() → 'Circle'. area() called via polymorphism → Math.PI*9 ≈ 28.274. format('%.1f') → '28.3'. Result: 'Circle[area=28.3]'."
  },
  {
    id: 1075, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; merge(<span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; a,
                          <span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; b) {
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(a);
    r.addAll(b);
    <span class="kw">return</span> r;
}
<span class="cls">List</span>&lt;<span class="cls">CharSequence</span>&gt; r = merge(<span class="cls">List</span>.of(<span class="str">"hi"</span>,<span class="str">"hello"</span>),
                               <span class="cls">List</span>.of(<span class="kw">new</span> <span class="cls">StringBuilder</span>(<span class="str">"world"</span>)));
<span class="cls">System</span>.out.println(r.size() + <span class="str">" "</span> + r.get(<span class="num">2</span>).length());`,
    options: ["3 5", "2 5", "3 4", "Compilation error"],
    answer: 0,
    explanation: "T=CharSequence. List<? extends CharSequence> accepts both List<String> and List<StringBuilder>. r=[hi, hello, world]. size()=3. r.get(2) is StringBuilder('world'). length()=5. Result: '3 5'."
  },
  {
    id: 1076, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Planet</span> {
    MERCURY(<span class="num">3.303e+23</span>, <span class="num">2.4397e6</span>),
    EARTH  (<span class="num">5.976e+24</span>, <span class="num">6.37814e6</span>);
    <span class="kw">private final double</span> mass, radius;
    <span class="cls">Planet</span>(<span class="kw">double</span> m, <span class="kw">double</span> r) { mass=m; radius=r; }
    <span class="kw">double</span> surfaceGravity() { <span class="kw">return</span> <span class="num">6.67300E-11</span> * mass / (radius*radius); }
}
<span class="cls">System</span>.out.println(<span class="cls">Planet</span>.EARTH.surfaceGravity() > <span class="cls">Planet</span>.MERCURY.surfaceGravity());`,
    options: ["true", "false", "Compilation error", "Throws ArithmeticException"],
    answer: 0,
    explanation: "Earth's surface gravity (≈9.8 m/s²) is greater than Mercury's (≈3.7 m/s²). surfaceGravity = G*mass/radius². EARTH > MERCURY → true."
  },
  {
    id: 1077, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> ops = <span class="cls">List</span>.of(
    (<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt;)(x -> x + <span class="num">1</span>),
    x -> x * <span class="num">2</span>,
    x -> x - <span class="num">3</span>
);
<span class="kw">int</span> result = ops.stream()
    .reduce(<span class="cls">Function</span>.identity(), <span class="cls">Function</span>::andThen)
    .apply(<span class="num">5</span>);
<span class="cls">System</span>.out.println(result);`,
    options: ["9", "7", "11", "Compilation error"],
    answer: 0,
    explanation: "reduce(identity, andThen) chains: identity→(x+1)→(x*2)→(x-3). apply(5): identity(5)=5, +1=6, *2=12, -3=9. Result: '9'."
  },
  {
    id: 1078, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Base</span> {
    <span class="kw">static</span> <span class="cls">String</span> name = <span class="str">"Base"</span>;
    <span class="cls">String</span> getName() { <span class="kw">return</span> name; }
}
<span class="kw">class</span> <span class="cls">Derived</span> <span class="kw">extends</span> <span class="cls">Base</span> {
    <span class="kw">static</span> <span class="cls">String</span> name = <span class="str">"Derived"</span>;
    <span class="cls">String</span> getName() { <span class="kw">return</span> name; }
}
<span class="cls">Base</span> b = <span class="kw">new</span> <span class="cls">Derived</span>();
<span class="cls">System</span>.out.println(b.name + <span class="str">" "</span> + b.getName());`,
    options: ["Base Derived", "Derived Derived", "Base Base", "Derived Base"],
    answer: 0,
    explanation: "b.name: static field accessed via reference type (Base) → 'Base'. b.getName(): instance method → runtime type (Derived) → returns Derived.name = 'Derived'. Result: 'Base Derived'."
  },
  {
    id: 1079, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">AtomicReference</span>&lt;<span class="cls">String</span>&gt; ref = <span class="kw">new</span> <span class="cls">AtomicReference</span>&lt;&gt;(<span class="str">"initial"</span>);
<span class="kw">boolean</span> cas1 = ref.compareAndSet(<span class="str">"initial"</span>, <span class="str">"updated"</span>);
<span class="kw">boolean</span> cas2 = ref.compareAndSet(<span class="str">"initial"</span>, <span class="str">"again"</span>);
<span class="cls">System</span>.out.println(cas1 + <span class="str">" "</span> + cas2 + <span class="str">" "</span> + ref.get());`,
    options: ["true false updated", "true true again", "false false initial", "true false again"],
    answer: 0,
    explanation: "compareAndSet(expected, update): atomically sets to update IF current == expected. cas1: current='initial'==expected → sets to 'updated', returns true. cas2: current='updated'≠'initial' → no change, returns false. ref.get()='updated'. Result: 'true false updated'."
  },
  {
    id: 1080, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> p = <span class="cls">Path</span>.of(<span class="str">"/usr/local/bin/java"</span>);
<span class="cls">System</span>.out.println(p.getName(<span class="num">2</span>));
<span class="cls">System</span>.out.println(p.subpath(<span class="num">0</span>, <span class="num">3</span>));
<span class="cls">System</span>.out.println(p.getFileName());`,
    options: ["bin\nusr/local/bin\njava", "local\nusr/local/bin\njava", "bin\nlocal/bin\njava", "Compilation error"],
    answer: 0,
    explanation: "Path: /usr(0)/local(1)/bin(2)/java(3). getName(2)='bin'. subpath(0,3)=[0,3)=usr/local/bin. getFileName()=last element='java'. Result: 'bin\\nusr/local/bin\\njava'."
  },
  {
    id: 1081, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"alice"</span>,<span class="str">"bob"</span>,<span class="str">"carol"</span>,<span class="str">"dave"</span>)
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        s -> s.length() > <span class="num">3</span>,
        <span class="cls">Collectors</span>.mapping(<span class="cls">String</span>::toUpperCase, <span class="cls">Collectors</span>.toList())
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>));`,
    options: ["[ALICE, CAROL, DAVE]", "[ALICE, BOB, CAROL, DAVE]", "[BOB]", "[ALICE, CAROL]"],
    answer: 0,
    explanation: "partitioningBy(length>3): true=['alice','carol','dave'](lengths 5,5,4). false=['bob'](length 3). mapping(toUpperCase) on true partition: [ALICE, CAROL, DAVE]. Result: '[ALICE, CAROL, DAVE]'."
  },
  {
    id: 1082, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Immutable</span> {
    <span class="kw">private final</span> <span class="kw">int</span>[] data;
    <span class="cls">Immutable</span>(<span class="kw">int</span>[] d) { data = d.clone(); }
    <span class="kw">int</span>[] getData() { <span class="kw">return</span> data.clone(); }
}
<span class="kw">int</span>[] original = {<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>};
<span class="cls">Immutable</span> obj = <span class="kw">new</span> <span class="cls">Immutable</span>(original);
original[<span class="num">0</span>] = <span class="num">99</span>;
<span class="kw">int</span>[] got = obj.getData();
got[<span class="num">1</span>] = <span class="num">88</span>;
<span class="cls">System</span>.out.println(obj.getData()[<span class="num">0</span>] + <span class="str">" "</span> + obj.getData()[<span class="num">1</span>]);`,
    options: ["1 2", "99 88", "1 88", "99 2"],
    answer: 0,
    explanation: "Defensive copying in constructor and accessor. Immutable.data is a clone of original → {1,2,3}. original[0]=99 doesn't affect Immutable.data. getData() returns a NEW clone each time. got[1]=88 changes the clone, not data. obj.getData()[0]=1, [1]=2. Result: '1 2'."
  },
  {
    id: 1083, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; a = <span class="cls">Optional</span>.of(<span class="str">"first"</span>);
<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; b = <span class="cls">Optional</span>.empty();
<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; c = <span class="cls">Optional</span>.of(<span class="str">"third"</span>);
<span class="cls">System</span>.out.println(a.or(() -> b).or(() -> c).orElse(<span class="str">"none"</span>));
<span class="cls">System</span>.out.println(b.or(() -> c).orElse(<span class="str">"none"</span>));`,
    options: ["first\nthird", "none\nthird", "first\nnone", "third\nnone"],
    answer: 0,
    explanation: "a.or(b).or(c): a is present → 'first'. orElse('none')='first'. b.or(c): b is empty → c='third'. orElse='third'. Result: 'first\\nthird'."
  },
  {
    id: 1084, topic: "Serialization",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Config</span> <span class="kw">implements</span> <span class="cls">Serializable</span> {
    <span class="kw">private static final long</span> serialVersionUID = <span class="num">1L</span>;
    <span class="kw">transient</span> <span class="cls">String</span>  host = <span class="str">"localhost"</span>;
    <span class="kw">int</span>               port = <span class="num">8080</span>;
}
<span class="cls">Config</span> c = <span class="kw">new</span> <span class="cls">Config</span>();
<span class="cm">// serialized and deserialized</span>
<span class="cm">// After deserialization:</span>
<span class="cls">System</span>.out.println(c.host + <span class="str">" "</span> + c.port);`,
    options: [
      "null 8080 — transient field is not serialized",
      "localhost 8080 — all fields are serialized",
      "localhost 0 — only transient fields are kept",
      "null 0 — all fields reset"
    ],
    answer: 0,
    explanation: "After deserialization: 'transient' field 'host' is excluded from serialization and restored to its type's default value (null for String). 'port' (not transient) is serialized and restored to 8080. Result: 'null 8080'."
  },
  {
    id: 1085, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">6</span>, <span class="num">15</span>);
<span class="cls">System</span>.out.println(d.with(<span class="cls">TemporalAdjusters</span>.firstInMonth(<span class="cls">DayOfWeek</span>.MONDAY)));`,
    options: ["2024-06-03", "2024-06-01", "2024-06-10", "2024-06-17"],
    answer: 0,
    explanation: "firstInMonth(MONDAY): finds the first Monday in June 2024. June 1, 2024 is a Saturday. Mondays: 3, 10, 17... First is June 3. Result: '2024-06-03'."
  },
  {
    id: 1086, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ForkJoinPool</span> pool = <span class="cls">ForkJoinPool</span>.commonPool();
<span class="kw">int</span> result = pool.invoke(<span class="kw">new</span> <span class="cls">RecursiveTask</span>&lt;<span class="cls">Integer</span>&gt;() {
    <span class="kw">protected</span> <span class="cls">Integer</span> compute() {
        <span class="kw">return</span> <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">5</span>).sum();
    }
});
<span class="cls">System</span>.out.println(result);`,
    options: ["15", "5", "1", "Compilation error"],
    answer: 0,
    explanation: "RecursiveTask.compute() returns IntStream.rangeClosed(1,5).sum()=15. ForkJoinPool.invoke() executes and returns the result. Result: '15'."
  },
  {
    id: 1087, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .mapMulti((<span class="kw">int</span> n, <span class="cls">Consumer</span>&lt;<span class="cls">Integer</span>&gt; c) -> {
        c.accept(n);
        c.accept(n * n);
    })
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 1, 2, 4, 3, 9, 4, 16, 5, 25]", "[1, 4, 9, 16, 25]", "[1, 2, 3, 4, 5]", "Compilation error"],
    answer: 0,
    explanation: "mapMulti (Java 16+): for each element n, emits n and n*n into the downstream. 1→[1,1], 2→[2,4], 3→[3,9], 4→[4,16], 5→[5,25]. Flattened: [1,1,2,4,3,9,4,16,5,25]. Result: '[1, 1, 2, 4, 3, 9, 4, 16, 5, 25]'."
  },
  {
    id: 1088, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Node</span> <span class="kw">permits</span> <span class="cls">Leaf</span>, <span class="cls">Branch</span> {}
<span class="kw">record</span> <span class="cls">Leaf</span>(<span class="kw">int</span> value)              <span class="kw">implements</span> <span class="cls">Node</span> {}
<span class="kw">record</span> <span class="cls">Branch</span>(<span class="cls">Node</span> left, <span class="cls">Node</span> right) <span class="kw">implements</span> <span class="cls">Node</span> {}
<span class="kw">static int</span> sum(<span class="cls">Node</span> n) {
    <span class="kw">return switch</span>(n) {
        <span class="kw">case</span> <span class="cls">Leaf</span>   l -> l.value();
        <span class="kw">case</span> <span class="cls">Branch</span> b -> sum(b.left()) + sum(b.right());
    };
}
<span class="cls">Node</span> tree = <span class="kw">new</span> <span class="cls">Branch</span>(
    <span class="kw">new</span> <span class="cls">Branch</span>(<span class="kw">new</span> <span class="cls">Leaf</span>(<span class="num">3</span>), <span class="kw">new</span> <span class="cls">Leaf</span>(<span class="num">4</span>)),
    <span class="kw">new</span> <span class="cls">Leaf</span>(<span class="num">5</span>)
);
<span class="cls">System</span>.out.println(sum(tree));`,
    options: ["12", "7", "5", "Compilation error"],
    answer: 0,
    explanation: "sum: Branch(Branch(Leaf(3),Leaf(4)), Leaf(5)). sum(outer)=sum(Branch(3,4))+sum(Leaf(5))=(3+4)+5=12. Result: '12'."
  },
  {
    id: 1089, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Registry</span>&lt;T&gt; {
    <span class="kw">private final</span> <span class="cls">Map</span>&lt;<span class="cls">String</span>,T&gt; map = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;();
    <span class="cls">Registry</span>&lt;T&gt; register(<span class="cls">String</span> name, T item) {
        map.put(name, item);
        <span class="kw">return this</span>;
    }
    <span class="cls">List</span>&lt;T&gt; all() { <span class="kw">return</span> <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(map.values()); }
}
<span class="kw">var</span> r = <span class="kw">new</span> <span class="cls">Registry</span>&lt;<span class="cls">Integer</span>&gt;()
    .register(<span class="str">"x"</span>, <span class="num">10</span>).register(<span class="str">"y"</span>, <span class="num">20</span>).register(<span class="str">"z"</span>, <span class="num">30</span>);
<span class="cls">System</span>.out.println(r.all().stream().mapToInt(<span class="cls">Integer</span>::intValue).sum());`,
    options: ["60", "30", "10", "Compilation error"],
    answer: 0,
    explanation: "Registry uses fluent API (returns this). Registers x=10, y=20, z=30. all()=[10,20,30]. mapToInt.sum()=60. Result: '60'."
  },
  {
    id: 1090, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Predicate</span>&lt;T&gt; distinctByKey(<span class="cls">Function</span>&lt;T, ?&gt; key) {
    <span class="cls">Set</span>&lt;<span class="cls">Object</span>&gt; seen = <span class="cls">ConcurrentHashMap</span>.newKeySet();
    <span class="kw">return</span> t -> seen.add(key.apply(t));
}
<span class="kw">var</span> r = <span class="cls">Stream</span>.of(
    <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">1</span>,<span class="num">10</span>}, <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">2</span>,<span class="num">20</span>}, <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">1</span>,<span class="num">30</span>}
).filter(distinctByKey(a -> a[<span class="num">0</span>]))
 .mapToInt(a -> a[<span class="num">1</span>])
 .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["30", "60", "10", "Compilation error"],
    answer: 0,
    explanation: "distinctByKey(a[0]): first [1,10] (key=1, new → passes), [2,20] (key=2, new → passes), [1,30] (key=1, already seen → filtered out). Remaining: [1,10],[2,20]. mapToInt(a[1]).sum()=10+20=30. Result: '30'."
  },
  {
    id: 1091, topic: "Abstract Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Game</span> {
    <span class="kw">abstract void</span> initialize();
    <span class="kw">abstract void</span> startPlay();
    <span class="kw">abstract void</span> endPlay();
    <span class="kw">final void</span> play() {
        initialize();
        startPlay();
        endPlay();
    }
}
<span class="kw">new</span> <span class="cls">Game</span>() {
    <span class="kw">void</span> initialize() { <span class="cls">System</span>.out.print(<span class="str">"I "</span>); }
    <span class="kw">void</span> startPlay()  { <span class="cls">System</span>.out.print(<span class="str">"S "</span>); }
    <span class="kw">void</span> endPlay()    { <span class="cls">System</span>.out.print(<span class="str">"E"</span>);  }
}.play();`,
    options: ["I S E", "S I E", "E S I", "Compilation error"],
    answer: 0,
    explanation: "Template Method pattern. play() is final: calls initialize(), startPlay(), endPlay() in order. Anonymous class provides implementations. Output: 'I S E'."
  },
  {
    id: 1092, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"abcdefgh"</span>;
<span class="cls">System</span>.out.println(s.chars()
    .filter(c -> (c - <span class="str">'a'</span>) % <span class="num">2</span> == <span class="num">0</span>) <span class="cm">// even-indexed letters: a,c,e,g</span>
    .mapToObj(c -> <span class="cls">String</span>.valueOf((<span class="kw">char</span>) c))
    .collect(<span class="cls">Collectors</span>.joining()));`,
    options: ["aceg", "bdfh", "abcd", "Compilation error"],
    answer: 0,
    explanation: "chars() gives int values. Filter (c-'a')%2==0: 'a'(0%2=0), 'b'(1%2=1), 'c'(2%2=0), 'd'(3%2=1), 'e'(4%2=0), 'f'(5%2=1), 'g'(6%2=0), 'h'(7%2=1). Passes: a,c,e,g. joined: 'aceg'."
  },
  {
    id: 1093, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newFixedThreadPool(<span class="num">2</span>);
<span class="cls">List</span>&lt;<span class="cls">Future</span>&lt;<span class="cls">String</span>&gt;&gt; futures = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="kw">for</span> (<span class="cls">String</span> s : <span class="cls">List</span>.of(<span class="str">"A"</span>,<span class="str">"B"</span>,<span class="str">"C"</span>)) {
    futures.add(exec.submit(() -> s + s));
}
exec.shutdown();
<span class="kw">var</span> result = futures.stream()
    .map(f -> f.get())
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">""</span>));
<span class="cls">System</span>.out.println(result);`,
    options: ["AABBCC", "Non-deterministic order", "CCBBAA", "Compilation error"],
    answer: 0,
    explanation: "Futures collected in submission order (A, B, C). f.get() blocks until each result is available. Each task returns s+s: AA, BB, CC. joining(''): 'AABBCC'. Always in submission order. Result: 'AABBCC'."
  },
  {
    id: 1094, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>,<span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;(
    <span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length).thenComparing(<span class="cls">Comparator</span>.naturalOrder())
);
m.put(<span class="str">"banana"</span>,<span class="num">1</span>); m.put(<span class="str">"apple"</span>,<span class="num">2</span>); m.put(<span class="str">"fig"</span>,<span class="num">3</span>); m.put(<span class="str">"kiwi"</span>,<span class="num">4</span>);
m.forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">" "</span>));`,
    options: ["fig kiwi apple banana ", "apple banana fig kiwi ", "banana apple fig kiwi ", "Compilation error"],
    answer: 0,
    explanation: "TreeMap with comparator by length then alpha. fig(3) < kiwi(4) < apple(5) < banana(6). forEach in comparator order: 'fig kiwi apple banana '. Result: 'fig kiwi apple banana '."
  },
  {
    id: 1095, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Triple</span>&lt;A,B,C&gt;(<span class="cls">A</span> first, <span class="cls">B</span> second, <span class="cls">C</span> third) {
    &lt;D&gt; <span class="cls">Triple</span>&lt;B,C,D&gt; shift(<span class="cls">D</span> d) {
        <span class="kw">return new</span> <span class="cls">Triple</span>&lt;&gt;(second, third, d);
    }
}
<span class="kw">var</span> t = <span class="kw">new</span> <span class="cls">Triple</span>&lt;&gt;(<span class="num">1</span>, <span class="str">"two"</span>, <span class="num">3.0</span>);
<span class="kw">var</span> s = t.shift(<span class="kw">true</span>);
<span class="cls">System</span>.out.println(s.first() + <span class="str">" "</span> + s.third());`,
    options: ["two true", "1 3.0", "two 3.0", "Compilation error"],
    answer: 0,
    explanation: "Triple<Integer,String,Double>(1,'two',3.0). shift(true): Triple<String,Double,Boolean>(second='two', third=3.0, d=true). s.first()='two', s.third()=true. Result: 'two true'."
  },
  {
    id: 1096, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>)
    .map(<span class="cls">String</span>::valueOf)
    .reduce(<span class="kw">new</span> <span class="cls">StringJoiner</span>(<span class="str">","</span>),
        (<span class="cls">StringJoiner</span> sj, <span class="cls">String</span> s) -> { sj.add(s); <span class="kw">return</span> sj; },
        (<span class="cls">StringJoiner</span> a, <span class="cls">StringJoiner</span> b) -> a.merge(b))
    .toString();
<span class="cls">System</span>.out.println(result);`,
    options: ["1,2,3,4,5", "12345", ",1,2,3,4,5", "Compilation error"],
    answer: 0,
    explanation: "reduce with StringJoiner identity. The BiFunction adds each string to the joiner. Combiner (for parallel) merges. Result is StringJoiner with delimiter ',': '1,2,3,4,5'. toString(). Result: '1,2,3,4,5'."
  },
  {
    id: 1097, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">int</span> x = <span class="num">10</span>;
    <span class="cls">A</span>() { show(); }
    <span class="kw">void</span> show() { <span class="cls">System</span>.out.print(<span class="str">"A.x="</span> + x + <span class="str">" "</span>); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span> x = <span class="num">20</span>;
    <span class="cls">B</span>() { <span class="kw">super</span>(); x = <span class="num">30</span>; }
    <span class="kw">void</span> show() { <span class="cls">System</span>.out.print(<span class="str">"B.x="</span> + x + <span class="str">" "</span>); }
}
<span class="cls">B</span> b = <span class="kw">new</span> <span class="cls">B</span>();
b.show();`,
    options: ["B.x=0 B.x=30 ", "A.x=10 B.x=30 ", "B.x=20 B.x=30 ", "B.x=30 B.x=30 "],
    answer: 0,
    explanation: "new B(): super() → A(). A() calls show() — polymorphism → B.show(). But B.x is not yet initialized (B fields initialized after super()). B.x = default int = 0. Prints 'B.x=0 '. Returns to B(): x=30. Then b.show() → 'B.x=30 '. Result: 'B.x=0 B.x=30 '."
  },
  {
    id: 1098, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> sql = <span class="str">"""
             SELECT id,
                    name,
                    email
             FROM   users
             WHERE  active = 1
             """</span>;
<span class="cls">System</span>.out.println(sql.lines()
    .map(<span class="cls">String</span>::strip)
    .filter(l -> l.startsWith(<span class="str">"WHERE"</span>))
    .findFirst()
    .orElse(<span class="str">"not found"</span>));`,
    options: ["WHERE  active = 1", "not found", "WHERE active = 1", "Compilation error"],
    answer: 0,
    explanation: "The text block strips common indentation but preserves internal spacing. lines().map(strip) strips each line. The WHERE line, after strip, is 'WHERE  active = 1' (internal double space preserved). startsWith('WHERE') → true. Result: 'WHERE  active = 1'."
  },
  {
    id: 1099, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; cf1 = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="str">"Hello"</span>);
<span class="cls">CompletableFuture</span>&lt;<span class="cls">String</span>&gt; cf2 = <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="str">"World"</span>);
<span class="cls">String</span> result = cf1.thenCombine(cf2, (a, b) -> a + <span class="str">" "</span> + b)
                    .thenApply(<span class="cls">String</span>::toUpperCase)
                    .get();
<span class="cls">System</span>.out.println(result);`,
    options: ["HELLO WORLD", "Hello World", "WORLD HELLO", "Non-deterministic"],
    answer: 0,
    explanation: "thenCombine waits for both cf1 and cf2, then applies (a,b)->a+' '+b = 'Hello World'. thenApply(toUpperCase) = 'HELLO WORLD'. get() = 'HELLO WORLD'. Result: 'HELLO WORLD'."
  },
  {
    id: 1100, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Product</span>(<span class="cls">String</span> name, <span class="cls">String</span> category, <span class="kw">double</span> price) {}
<span class="kw">var</span> products = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Apple"</span>,  <span class="str">"fruit"</span>, <span class="num">1.5</span>),
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Banana"</span>, <span class="str">"fruit"</span>, <span class="num">0.5</span>),
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Carrot"</span>, <span class="str">"veg"</span>,   <span class="num">0.8</span>),
    <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Daikon"</span>, <span class="str">"veg"</span>,   <span class="num">1.2</span>)
);
<span class="kw">var</span> r = products.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(<span class="cls">Product</span>::category,
        <span class="cls">Collectors</span>.averagingDouble(<span class="cls">Product</span>::price)));
<span class="cls">System</span>.out.printf(<span class="str">"fruit=%.2f veg=%.2f%n"</span>, r.get(<span class="str">"fruit"</span>), r.get(<span class="str">"veg"</span>));`,
    options: ["fruit=1.00 veg=1.00", "fruit=0.50 veg=0.80", "fruit=1.50 veg=1.20", "Compilation error"],
    answer: 0,
    explanation: "groupingBy category, averagingDouble price. fruit: (1.5+0.5)/2=1.0. veg: (0.8+1.2)/2=1.0. printf: 'fruit=1.00 veg=1.00'. Result: 'fruit=1.00 veg=1.00'."
  }
];
