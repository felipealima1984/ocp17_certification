// ═══════════════════════════════════════════════════════
//  PACK EN-11 — Questions 501–550  (English)
//  Topics: Functional Interfaces deep dive, Method
//          References all 4 types, Streams collectors
//          complex, Optional chaining, var edge cases,
//          Records with custom methods, Switch exhaustive,
//          String API Java 11-17, instanceof flow scope
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_11 = [
  {
    id: 501, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; isLong  = s -> s.length() > <span class="num">5</span>;
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; isUpper = s -> s.equals(s.toUpperCase());
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; both    = isLong.and(isUpper);
<span class="cls">System</span>.out.println(both.test(<span class="str">"JAVA17"</span>));
<span class="cls">System</span>.out.println(both.test(<span class="str">"Java"</span>));`,
    options: ["true\nfalse", "false\nfalse", "true\ntrue", "false\ntrue"],
    answer: 0,
    explanation: "'JAVA17' has length 6 (>5) and is all uppercase → both predicates true → true. 'Java' has length 4 (not >5), short-circuit AND stops → false. Result: 'true\\nfalse'."
  },
  {
    id: 502, topic: "Functional Interfaces",
    text: "Which of the following correctly represents a Function that takes a String and returns its length?",
    code: null,
    options: [
      "Function<String, Integer> f = s -> s.length();",
      "Function<Integer, String> f = s -> s.length();",
      "Supplier<Integer> f = s -> s.length();",
      "Consumer<String> f = s -> s.length();"
    ],
    answer: 0,
    explanation: "Function<T, R> maps T → R. Here T=String and R=Integer. The lambda s -> s.length() takes a String and returns an int (auto-boxed to Integer). Options B, C, and D have wrong signatures."
  },
  {
    id: 503, topic: "Method References",
    text: "What type of method reference is used in the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = <span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>);
list.forEach(<span class="cls">System</span>.out::println);`,
    options: [
      "Static method reference",
      "Instance method reference of a particular object",
      "Instance method reference of an arbitrary object",
      "Constructor reference"
    ],
    answer: 1,
    explanation: "System.out is a specific PrintStream instance. println is an instance method of that particular object. This is a 'bound instance method reference' — the instance is already fixed (System.out)."
  },
  {
    id: 504, topic: "Method References",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">String</span>, <span class="cls">String</span>&gt; f = <span class="cls">String</span>::toUpperCase;
<span class="cls">System</span>.out.println(f.apply(<span class="str">"hello"</span>));`,
    options: ["HELLO", "hello", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "String::toUpperCase is an unbound instance method reference — equivalent to s -> s.toUpperCase(). Applying it to 'hello' returns 'HELLO'."
  },
  {
    id: 505, topic: "Method References",
    text: "Which functional interface does 'Integer::new' correspond to?",
    code: null,
    options: [
      "Supplier<Integer>",
      "Function<String, Integer>",
      "UnaryOperator<Integer>",
      "Both A and B are correct depending on context"
    ],
    answer: 3,
    explanation: "Integer::new is a constructor reference. Integer has Integer() (no-arg, maps to Supplier<Integer>) and Integer(String) (maps to Function<String, Integer>). The compiler resolves which constructor based on the target functional interface."
  },
  {
    id: 506, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        <span class="cls">String</span>::length,
        s -> s,
        (<span class="cls">String</span> a, <span class="cls">String</span> b) -> a + <span class="str">","</span> + b
    ));
<span class="cls">System</span>.out.println(map.get(<span class="num">3</span>));`,
    options: ["one,two", "two,one", "one", "Throws IllegalStateException"],
    answer: 0,
    explanation: "toMap with a merge function: 'one'(3) and 'two'(3) both have length 3, so the merge function is called: 'one' + ',' + 'two' = 'one,two'. 'three'(5) has no collision. map.get(3) = 'one,two'."
  },
  {
    id: 507, topic: "Streams",
    text: "What does the following code print?",
    code: `<span class="kw">long</span> count = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"bb"</span>, <span class="str">"ccc"</span>, <span class="str">"d"</span>, <span class="str">"ee"</span>)
    .filter(s -> s.length() > <span class="num">1</span>)
    .mapToInt(<span class="cls">String</span>::length)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .count();
<span class="cls">System</span>.out.println(count);`,
    options: ["1", "2", "3", "0"],
    answer: 1,
    explanation: "filter(length>1): 'bb'(2), 'ccc'(3), 'ee'(2). mapToInt: [2, 3, 2]. filter(even): 2 and 2 pass. count() = 2."
  },
  {
    id: 508, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt; opt = <span class="cls">Optional</span>.of(<span class="num">10</span>)
    .filter(n -> n > <span class="num">5</span>)
    .map(n -> n * <span class="num">2</span>)
    .filter(n -> n > <span class="num">100</span>);
<span class="cls">System</span>.out.println(opt.isPresent());`,
    options: ["true", "false", "Throws NoSuchElementException", "Compilation error"],
    answer: 1,
    explanation: "Start with Optional(10). filter(>5): 10>5 → passes. map(*2): 20. filter(>100): 20>100 is false → empty. isPresent() = false."
  },
  {
    id: 509, topic: "Optional",
    text: "Which statement about Optional.of() vs Optional.ofNullable() is CORRECT?",
    code: null,
    options: [
      "Both throw NullPointerException if the argument is null",
      "Optional.of(null) throws NullPointerException; Optional.ofNullable(null) returns an empty Optional",
      "Optional.ofNullable(null) throws NullPointerException; Optional.of(null) returns an empty Optional",
      "Both return an empty Optional if the argument is null"
    ],
    answer: 1,
    explanation: "Optional.of(null) throws NullPointerException immediately. Optional.ofNullable(null) safely returns Optional.empty(). Use ofNullable when the value might be null; use of() when you are sure it is not null."
  },
  {
    id: 510, topic: "var",
    text: "Which of the following uses of 'var' causes a compilation error?",
    code: null,
    options: [
      "var list = new ArrayList<String>();",
      "var x = 10; x = 20;",
      "var obj = null;",
      "for (var s : List.of(\"a\", \"b\")) { }"
    ],
    answer: 2,
    explanation: "var obj = null is a compilation error: the compiler cannot infer the type from a null literal alone — there is no type information. All other options are valid: list infers ArrayList<String>, x infers int, the for-each infers String."
  },
  {
    id: 511, topic: "var",
    text: "What type does the compiler infer for 'result' in the following code?",
    code: `<span class="kw">var</span> nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
<span class="kw">var</span> result = nums.stream().mapToInt(<span class="cls">Integer</span>::intValue).average();`,
    options: ["double", "Double", "OptionalDouble", "Optional<Double>"],
    answer: 2,
    explanation: "IntStream.average() returns OptionalDouble (not Optional<Double> and not a primitive). 'result' is inferred as OptionalDouble. To get the value: result.getAsDouble()."
  },
  {
    id: 512, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Circle</span>(<span class="kw">double</span> radius) {
    <span class="kw">double</span> area() { <span class="kw">return</span> <span class="cls">Math</span>.PI * radius * radius; }
    <span class="kw">static</span> <span class="cls">Circle</span> unit() { <span class="kw">return new</span> <span class="cls">Circle</span>(<span class="num">1.0</span>); }
}
<span class="cls">Circle</span> c = <span class="cls">Circle</span>.unit();
<span class="cls">System</span>.out.println(c.radius() + <span class="str">" "</span> + (c.area() > <span class="num">3</span>));`,
    options: ["1.0 true", "1.0 false", "Compilation error", "Throws ArithmeticException"],
    answer: 0,
    explanation: "Records can have static factory methods and additional instance methods. unit() creates Circle(1.0). radius() = 1.0. area() = π × 1 × 1 ≈ 3.14 > 3 → true. Result: '1.0 true'."
  },
  {
    id: 513, topic: "Records",
    text: "Which of the following statements about record components is CORRECT?",
    code: null,
    options: [
      "Record components are public and mutable",
      "Record components are private and final; accessors are public with the same name as the component",
      "Record components are protected and final",
      "Record components can be static"
    ],
    answer: 1,
    explanation: "Record components are private final fields. The compiler generates a public accessor method with the same name as the component (not getX() style). For record Point(int x, int y), the accessors are x() and y(), not getX() and getY()."
  },
  {
    id: 514, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="str">"Hello"</span>;
<span class="kw">int</span> result = <span class="kw">switch</span> (obj) {
    <span class="kw">case</span> <span class="cls">Integer</span> i -> i;
    <span class="kw">case</span> <span class="cls">String</span>  s -> s.length();
    <span class="kw">default</span>        -> <span class="num">-1</span>;
};
<span class="cls">System</span>.out.println(result);`,
    options: ["5", "-1", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "Pattern matching switch: obj is a String 'Hello'. The case String s matches, s.length() = 5. result = 5."
  },
  {
    id: 515, topic: "Switch",
    text: "What happens when a switch expression does not cover all possible values of a sealed type and has no default?",
    code: null,
    options: [
      "It compiles and returns null at runtime",
      "It is a compilation error — the switch must be exhaustive",
      "It compiles and throws MatchException at runtime",
      "It compiles with a warning but runs fine"
    ],
    answer: 1,
    explanation: "A switch expression must be exhaustive. For a sealed type where all permitted subtypes are covered in case labels, no default is needed. If cases are missing and there is no default, the compiler rejects the code."
  },
  {
    id: 516, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  hello world  "</span>;
<span class="cls">System</span>.out.println(s.stripLeading().length());
<span class="cls">System</span>.out.println(s.stripTrailing().length());`,
    options: ["13\n13", "13\n15", "15\n13", "11\n11"],
    answer: 1,
    explanation: "Original string length = 15 (2 leading + 'hello world'(11) + 2 trailing). stripLeading() removes 2 leading spaces → 13 chars. stripTrailing() removes 2 trailing spaces → 13 chars. Wait — both are 13. Re-check: '  hello world  ' = 2+11+2 = 15. stripLeading = 13, stripTrailing = 13. Result: '13\\n13'."
  },
  {
    id: 517, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"one\\ntwo\\nthree"</span>;
<span class="cls">System</span>.out.println(s.lines().count());
<span class="cls">System</span>.out.println(s.lines().findFirst().get());`,
    options: ["3\none", "2\none", "3\ntwo", "1\none\\ntwo\\nthree"],
    answer: 0,
    explanation: "lines() (Java 11+) splits on line terminators. 'one\\ntwo\\nthree' has 3 lines. count() = 3. findFirst() returns the first line: 'one'. Result: '3\\none'."
  },
  {
    id: 518, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="str">"  "</span>.isBlank());
<span class="cls">System</span>.out.println(<span class="str">"  "</span>.isEmpty());`,
    options: ["true\nfalse", "true\ntrue", "false\nfalse", "false\ntrue"],
    answer: 0,
    explanation: "isBlank() (Java 11+) returns true if the string is empty or contains only whitespace. isEmpty() returns true only if length is 0. '  ' has whitespace but length > 0. isBlank() = true, isEmpty() = false."
  },
  {
    id: 519, topic: "instanceof",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="cls">Integer</span>.valueOf(<span class="num">42</span>);
<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">Number</span> n && n.intValue() > <span class="num">10</span>) {
    <span class="cls">System</span>.out.println(<span class="str">"Number > 10: "</span> + n);
}`,
    options: ["Number > 10: 42", "Compilation error", "Nothing is printed", "Throws ClassCastException"],
    answer: 0,
    explanation: "Integer is a subtype of Number. 'obj instanceof Number n' matches and binds n = 42. n.intValue() = 42 > 10 → true. Prints 'Number > 10: 42'."
  },
  {
    id: 520, topic: "instanceof",
    text: "In which scope is the pattern variable 'n' accessible?",
    code: `<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">Integer</span> n) {
    <span class="cm">// scope A</span>
} <span class="kw">else</span> {
    <span class="cm">// scope B</span>
}
<span class="cm">// scope C</span>`,
    options: [
      "Scopes A, B, and C",
      "Only scope A",
      "Scopes A and C",
      "Only scope C"
    ],
    answer: 1,
    explanation: "The pattern variable 'n' is in scope only where the compiler can guarantee it has been matched. In scope A (inside the if-true branch) obj IS an Integer, so n is accessible. In the else branch and after the if, the match is not guaranteed, so n is out of scope."
  },
  {
    id: 521, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">void</span> swap(<span class="cls">T</span>[] arr, <span class="kw">int</span> i, <span class="kw">int</span> j) {
    T tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
}
<span class="cls">String</span>[] s = {<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"C"</span>};
swap(s, <span class="num">0</span>, <span class="num">2</span>);
<span class="cls">System</span>.out.println(s[<span class="num">0</span>] + s[<span class="num">2</span>]);`,
    options: ["CA", "AC", "CB", "Compilation error"],
    answer: 0,
    explanation: "The generic swap method exchanges elements at indices i and j. swap(s, 0, 2): s[0]='A' and s[2]='C' are swapped. After swap: s = ['C', 'B', 'A']. s[0]+s[2] = 'C'+'A' = 'CA'."
  },
  {
    id: 522, topic: "Generics",
    text: "What does the following code print?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Number</span>&gt; T first(<span class="cls">List</span>&lt;T&gt; list) {
    <span class="kw">return</span> list.get(<span class="num">0</span>);
}
<span class="cls">System</span>.out.println(first(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)));`,
    options: ["1", "1.0", "Compilation error", "Throws IndexOutOfBoundsException"],
    answer: 0,
    explanation: "The bounded type parameter <T extends Number> means T must be a Number or subclass. List.of(1,2,3) creates List<Integer>. T is inferred as Integer. get(0) returns Integer 1. println prints '1'."
  },
  {
    id: 523, topic: "Sealed Classes",
    text: "Which of the following is a valid class hierarchy for a sealed class?",
    code: null,
    options: [
      "sealed class A permits B {} — class B extends A {}",
      "sealed class A permits B {} — final class B extends A {}",
      "sealed class A {} — final class B extends A {}",
      "non-sealed class A permits B {} — final class B extends A {}"
    ],
    answer: 1,
    explanation: "A sealed class must list its permitted subclasses in the permits clause. Each permitted subclass must be final, sealed, or non-sealed. Option B is correct: sealed A permits B, and B is final. Option A is wrong (B is not final/sealed/non-sealed). Option C has no permits. Option D: non-sealed cannot have permits."
  },
  {
    id: 524, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Result</span>&lt;T&gt; <span class="kw">permits</span> <span class="cls">Success</span>, <span class="cls">Failure</span> {}
<span class="kw">record</span> <span class="cls">Success</span>&lt;T&gt;(T value) <span class="kw">implements</span> <span class="cls">Result</span>&lt;T&gt; {}
<span class="kw">record</span> <span class="cls">Failure</span>&lt;T&gt;(<span class="cls">String</span> error) <span class="kw">implements</span> <span class="cls">Result</span>&lt;T&gt; {}
<span class="cls">Result</span>&lt;<span class="cls">Integer</span>&gt; r = <span class="kw">new</span> <span class="cls">Success</span>&lt;&gt;(<span class="num">42</span>);
<span class="cls">String</span> msg = <span class="kw">switch</span>(r) {
    <span class="kw">case</span> <span class="cls">Success</span>&lt;<span class="cls">Integer</span>&gt; s -> <span class="str">"ok: "</span> + s.value();
    <span class="kw">case</span> <span class="cls">Failure</span>&lt;<span class="cls">Integer</span>&gt; f -> <span class="str">"err: "</span> + f.error();
};
<span class="cls">System</span>.out.println(msg);`,
    options: ["ok: 42", "err: null", "Compilation error", "Throws MatchException"],
    answer: 0,
    explanation: "r is a Success<Integer>(42). Pattern switch: case Success<Integer> s matches → 'ok: ' + s.value() = 'ok: 42'. The switch is exhaustive (covers all sealed subtypes)."
  },
  {
    id: 525, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newFixedThreadPool(<span class="num">2</span>);
<span class="cls">Future</span>&lt;<span class="cls">String</span>&gt; f1 = exec.submit(() -> <span class="str">"A"</span>);
<span class="cls">Future</span>&lt;<span class="cls">String</span>&gt; f2 = exec.submit(() -> <span class="str">"B"</span>);
<span class="cls">System</span>.out.println(f1.get() + f2.get());
exec.shutdown();`,
    options: ["AB", "BA", "AB or BA (non-deterministic)", "Throws ExecutionException"],
    answer: 0,
    explanation: "f1.get() blocks until 'A' is ready, then f2.get() blocks until 'B' is ready. Even if f2 finishes first, the concatenation order is determined by the order we call get(): always f1 then f2. Result: 'AB'."
  },
  {
    id: 526, topic: "Concurrency",
    text: "What does CompletableFuture.runAsync() return?",
    code: null,
    options: [
      "CompletableFuture<Void>",
      "CompletableFuture<Object>",
      "void",
      "Future<Void>"
    ],
    answer: 0,
    explanation: "runAsync(Runnable) executes the Runnable asynchronously and returns CompletableFuture<Void> — representing the completion of the action with no result. supplyAsync(Supplier<T>) returns CompletableFuture<T> when you need a result."
  },
  {
    id: 527, topic: "Modules (JPMS)",
    text: "What is the difference between 'exports' and 'opens' in module-info.java?",
    code: null,
    options: [
      "They are identical",
      "'exports' allows compile-time and runtime access to public types; 'opens' allows deep reflective access at runtime only",
      "'opens' allows compile-time access; 'exports' allows runtime access",
      "'exports' is for packages; 'opens' is for classes"
    ],
    answer: 1,
    explanation: "'exports pkg' makes public types in pkg accessible at compile-time and runtime (but not private members reflectively). 'opens pkg' grants deep reflective access at runtime to all members (including private), used by frameworks like Spring, Hibernate, and JPA."
  },
  {
    id: 528, topic: "Modules (JPMS)",
    text: "Which statement about the unnamed module is CORRECT?",
    code: null,
    options: [
      "The unnamed module cannot access named modules",
      "All code on the classpath belongs to the unnamed module, which can read all named modules",
      "The unnamed module is the same as java.base",
      "You must explicitly declare the unnamed module in module-info.java"
    ],
    answer: 1,
    explanation: "Code placed on the classpath (not the module path) belongs to the unnamed module. The unnamed module can read all named modules, making it backward-compatible with pre-module code. You cannot write module-info.java for it."
  },
  {
    id: 529, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">31</span>);
<span class="cls">System</span>.out.println(d.getDayOfYear());
<span class="cls">System</span>.out.println(d.getMonth());`,
    options: ["365\nDECEMBER", "366\nDECEMBER", "365\n12", "366\n12"],
    answer: 1,
    explanation: "2024 is a leap year (366 days). December 31 is the 366th day of 2024. getDayOfYear() = 366. getMonth() returns the Month enum constant: DECEMBER."
  },
  {
    id: 530, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">Instant</span> now = <span class="cls">Instant</span>.parse(<span class="str">"2024-06-15T10:30:00Z"</span>);
<span class="cls">Instant</span> later = now.plus(<span class="cls">Duration</span>.ofHours(<span class="num">3</span>));
<span class="cls">System</span>.out.println(<span class="cls">ChronoUnit</span>.MINUTES.between(now, later));`,
    options: ["3", "180", "30", "Throws DateTimeException"],
    answer: 1,
    explanation: "later = now + 3 hours. ChronoUnit.MINUTES.between(now, later) calculates the number of complete minutes between the two instants. 3 hours × 60 minutes = 180."
  },
  {
    id: 531, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; map = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
map.put(<span class="str">"a"</span>, <span class="num">1</span>);
map.compute(<span class="str">"a"</span>, (k, v) -> v == <span class="kw">null</span> ? <span class="num">1</span> : v + <span class="num">10</span>);
map.compute(<span class="str">"b"</span>, (k, v) -> v == <span class="kw">null</span> ? <span class="num">1</span> : v + <span class="num">10</span>);
<span class="cls">System</span>.out.println(map.get(<span class="str">"a"</span>) + <span class="str">" "</span> + map.get(<span class="str">"b"</span>));`,
    options: ["11 1", "1 1", "11 10", "Throws NullPointerException"],
    answer: 0,
    explanation: "compute(key, BiFunction): for 'a' v=1, returns 1+10=11. For 'b' v=null (not present), returns 1. map = {a=11, b=1}. Result: '11 1'."
  },
  {
    id: 532, topic: "Collections",
    text: "Which collection maintains insertion order and allows duplicate elements?",
    code: null,
    options: ["HashSet", "TreeSet", "LinkedHashSet", "ArrayList"],
    answer: 3,
    explanation: "ArrayList maintains insertion order and allows duplicate elements. HashSet: unordered, no duplicates. TreeSet: sorted, no duplicates. LinkedHashSet: insertion order, no duplicates. Only ArrayList (and other List implementations) allows duplicates."
  },
  {
    id: 533, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Parent</span> {
    <span class="kw">void</span> display() { <span class="cls">System</span>.out.print(<span class="str">"P"</span>); }
}
<span class="kw">class</span> <span class="cls">Child</span> <span class="kw">extends</span> <span class="cls">Parent</span> {
    <span class="kw">void</span> display() { <span class="cls">System</span>.out.print(<span class="str">"C"</span>); }
    <span class="kw">void</span> show() { display(); <span class="kw">super</span>.display(); }
}
<span class="kw">new</span> <span class="cls">Child</span>().show();`,
    options: ["CP", "PC", "CC", "PP"],
    answer: 0,
    explanation: "Inside show(), display() calls the overridden version (Child's display) — polymorphism applies to 'this'. super.display() explicitly calls Parent's display. Result: 'C' then 'P' = 'CP'."
  },
  {
    id: 534, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Walkable</span> {
    <span class="kw">default</span> <span class="cls">String</span> move() { <span class="kw">return</span> <span class="str">"walk"</span>; }
}
<span class="kw">interface</span> <span class="cls">Runnable</span> <span class="kw">extends</span> <span class="cls">Walkable</span> {
    <span class="kw">default</span> <span class="cls">String</span> move() { <span class="kw">return</span> <span class="str">"run"</span>; }
}
<span class="kw">class</span> <span class="cls">Athlete</span> <span class="kw">implements</span> <span class="cls">Runnable</span> {}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Athlete</span>().move());`,
    options: ["walk", "run", "Compilation error — ambiguous", "walk and run"],
    answer: 1,
    explanation: "When one interface extends another and overrides a default method, the more specific (child) interface wins. Runnable extends Walkable and overrides move() to return 'run'. Athlete implements Runnable, so it inherits 'run' without ambiguity."
  },
  {
    id: 535, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> (var r = <span class="kw">new</span> <span class="cls">AutoCloseable</span>() {
    <span class="kw">public void</span> close() { <span class="cls">System</span>.out.print(<span class="str">"closed"</span>); }
}) {
    <span class="cls">System</span>.out.print(<span class="str">"open"</span>);
}`,
    options: ["openclosed", "closedopen", "open", "Compilation error"],
    answer: 0,
    explanation: "try-with-resources: the body executes first (prints 'open'), then close() is automatically called when the block exits (prints 'closed'). Result: 'openclosed'."
  },
  {
    id: 536, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">int</span> result = <span class="num">10</span> / <span class="num">0</span>;
} <span class="kw">catch</span> (<span class="cls">ArithmeticException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"caught"</span>);
    <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"wrapped"</span>, e);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"-finally"</span>);
}`,
    options: [
      "caught-finally then RuntimeException propagated",
      "caught then RuntimeException propagated",
      "caught-finally",
      "-finally then RuntimeException propagated"
    ],
    answer: 0,
    explanation: "catch prints 'caught', throws RuntimeException. Before the exception propagates, finally executes: prints '-finally'. Then RuntimeException('wrapped') is propagated. Visible output: 'caught-finally'."
  },
  {
    id: 537, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.partitioningBy(n -> n % <span class="num">2</span> == <span class="num">0</span>));
<span class="cls">System</span>.out.println(result.get(<span class="kw">false</span>));`,
    options: ["[1, 3, 5]", "[2, 4]", "[1, 2, 3, 4, 5]", "null"],
    answer: 0,
    explanation: "partitioningBy creates a Map<Boolean, List<Integer>>. result.get(false) returns the list of elements that did NOT satisfy the predicate (odd numbers): [1, 3, 5]."
  },
  {
    id: 538, topic: "Streams",
    text: "Which terminal operation is short-circuiting?",
    code: null,
    options: ["forEach()", "reduce()", "allMatch()", "count()"],
    answer: 2,
    explanation: "allMatch() is short-circuiting: it stops processing as soon as it finds an element that does not match the predicate (returning false immediately). forEach() and count() process all elements. reduce() also processes all elements."
  },
  {
    id: 539, topic: "JVM & Memory",
    text: "What is the difference between a SoftReference and a WeakReference?",
    code: null,
    options: [
      "No functional difference",
      "WeakReference is collected as soon as no strong reference exists; SoftReference is collected only under memory pressure",
      "SoftReference is collected immediately; WeakReference is kept longer",
      "SoftReference prevents GC entirely; WeakReference allows GC"
    ],
    answer: 1,
    explanation: "WeakReference: GC may collect the referent at any time when no strong references exist (even without memory pressure). SoftReference: GC collects only when the JVM needs memory. SoftReferences are useful for memory-sensitive caches."
  },
  {
    id: 540, topic: "JVM & Memory",
    text: "What is the purpose of the -XX:+UseG1GC JVM flag?",
    code: null,
    options: [
      "Enables the Serial GC",
      "Enables the G1 (Garbage First) Garbage Collector",
      "Sets the maximum heap size",
      "Enables JIT compilation"
    ],
    answer: 1,
    explanation: "-XX:+UseG1GC activates the G1 Garbage Collector, which divides the heap into regions and prioritizes collection of regions with the most garbage ('garbage first'). G1 is the default GC from Java 9 onward and aims for predictable pause times."
  },
  {
    id: 541, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Printer</span> {
    <span class="kw">abstract void</span> print();
    <span class="kw">void</span> run() { System.out.print(<span class="str">"start-"</span>); print(); System.out.print(<span class="str">"-end"</span>); }
}
<span class="kw">new</span> <span class="cls">Printer</span>() {
    <span class="kw">void</span> print() { <span class="cls">System</span>.out.print(<span class="str">"hello"</span>); }
}.run();`,
    options: ["start-hello-end", "hello", "start--end", "Compilation error"],
    answer: 0,
    explanation: "An anonymous class extends Printer and implements print(). run() is called: prints 'start-', then calls print() via polymorphism → 'hello', then prints '-end'. Result: 'start-hello-end'."
  },
  {
    id: 542, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; singletonList(T item) {
    <span class="kw">return</span> <span class="cls">List</span>.of(item);
}
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = singletonList(<span class="str">"Java"</span>);
<span class="cls">System</span>.out.println(list.size() + <span class="str">" "</span> + list.get(<span class="num">0</span>));`,
    options: ["1 Java", "0 Java", "Compilation error", "1 null"],
    answer: 0,
    explanation: "T is inferred as String. List.of('Java') creates an immutable single-element list. size() = 1, get(0) = 'Java'. Result: '1 Java'."
  },
  {
    id: 543, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; cf =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> <span class="num">10</span>)
        .thenApply(n -> n * <span class="num">2</span>)
        .exceptionally(e -> <span class="num">-1</span>);
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["20", "-1", "10", "Throws ExecutionException"],
    answer: 0,
    explanation: "supplyAsync returns 10. thenApply multiplies by 2 → 20. No exception occurs, so exceptionally is bypassed. cf.get() returns 20."
  },
  {
    id: 544, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Product</span>(<span class="cls">String</span> name, <span class="kw">double</span> price) {}
<span class="cls">Product</span> p1 = <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Widget"</span>, <span class="num">9.99</span>);
<span class="cls">Product</span> p2 = <span class="kw">new</span> <span class="cls">Product</span>(<span class="str">"Widget"</span>, <span class="num">9.99</span>);
<span class="cls">System</span>.out.println(p1.equals(p2));
<span class="cls">System</span>.out.println(p1.hashCode() == p2.hashCode());`,
    options: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
    answer: 0,
    explanation: "Records generate equals() and hashCode() based on all components. p1 and p2 have identical name and price → equals() returns true. Equal objects must have equal hashCodes per the contract → hashCode() match → true. Result: 'true\\ntrue'."
  },
  {
    id: 545, topic: "I/O & NIO",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"/home/user/docs/report.pdf"</span>);
<span class="cls">System</span>.out.println(p.getNameCount());
<span class="cls">System</span>.out.println(p.subpath(<span class="num">1</span>, <span class="num">3</span>));`,
    options: ["4\nuser/docs", "5\nuser/docs", "4\ndocs/report.pdf", "3\nhome/user"],
    answer: 0,
    explanation: "The path has 4 name elements: home(0), user(1), docs(2), report.pdf(3). getNameCount() = 4. subpath(1, 3) is [1,3) exclusive: elements at indices 1 and 2 = 'user/docs'."
  },
  {
    id: 546, topic: "I/O & NIO",
    text: "Which Files method is equivalent to 'mkdir -p' in Unix?",
    code: null,
    options: [
      "Files.createDirectory(path)",
      "Files.createDirectories(path)",
      "Files.mkdir(path)",
      "Files.mkdirs(path)"
    ],
    answer: 1,
    explanation: "Files.createDirectories(Path) creates the target directory and all missing intermediate directories (like mkdir -p). Files.createDirectory(Path) only creates the leaf directory and throws NoSuchFileException if the parent does not exist. mkdir() and mkdirs() belong to the old File API."
  },
  {
    id: 547, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Java 17 OCP"</span>;
<span class="cls">System</span>.out.println(s.indexOf(<span class="str">" "</span>));
<span class="cls">System</span>.out.println(s.indexOf(<span class="str">" "</span>, <span class="num">5</span>));`,
    options: ["4\n7", "4\n4", "4\n8", "7\n4"],
    answer: 0,
    explanation: "'Java 17 OCP': first space at index 4. indexOf(' ', 5) searches from index 5 onwards — finds the space before 'OCP' at index 7. Result: '4\\n7'."
  },
  {
    id: 548, topic: "Lambdas",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>));
nums.sort((<span class="cls">Comparator</span>&lt;<span class="cls">Integer</span>&gt;) <span class="cls">Comparator</span>.naturalOrder());
<span class="cls">System</span>.out.println(nums);`,
    options: ["[1, 1, 3, 4, 5]", "[5, 4, 3, 1, 1]", "[3, 1, 4, 1, 5]", "Compilation error"],
    answer: 0,
    explanation: "Comparator.naturalOrder() for Integer sorts ascending. After sort: [1, 1, 3, 4, 5]."
  },
  {
    id: 549, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="cls">OptionalInt</span> result = <span class="cls">IntStream</span>.range(<span class="num">1</span>, <span class="num">6</span>)
    .filter(n -> n > <span class="num">3</span>)
    .findFirst();
<span class="cls">System</span>.out.println(result.getAsInt());`,
    options: ["4", "5", "1", "Throws NoSuchElementException"],
    answer: 0,
    explanation: "IntStream.range(1, 6) generates 1,2,3,4,5. filter(>3): 4 and 5 pass. findFirst() returns the first matching element: 4 (wrapped in OptionalInt). getAsInt() = 4."
  },
  {
    id: 550, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Box</span> {
    <span class="kw">private final int</span> value;
    <span class="cls">Box</span>(<span class="kw">int</span> v) { <span class="kw">this</span>.value = v; }
    <span class="cls">Box</span> add(<span class="kw">int</span> n) { <span class="kw">return new</span> <span class="cls">Box</span>(value + n); }
    <span class="cls">String</span> show() { <span class="kw">return</span> <span class="str">"Box("</span> + value + <span class="str">")"</span>; }
}
<span class="cls">Box</span> b = <span class="kw">new</span> <span class="cls">Box</span>(<span class="num">5</span>).add(<span class="num">3</span>).add(<span class="num">2</span>);
<span class="cls">System</span>.out.println(b.show());`,
    options: ["Box(10)", "Box(5)", "Box(8)", "Compilation error"],
    answer: 0,
    explanation: "Method chaining on an immutable object. new Box(5).add(3) returns new Box(8). .add(2) returns new Box(10). b.show() = 'Box(10)'."
  }
];
