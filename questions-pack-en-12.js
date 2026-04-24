// ═══════════════════════════════════════════════════════
//  PACK EN-12 — Questions 551–600  (English)
//  Topics: Concurrency patterns, NIO.2 advanced,
//          Serialization, Generics PECS, Enums advanced,
//          Static initializers, Casting traps,
//          Comparable vs Comparator, Text blocks,
//          BigDecimal, Bitwise, Design patterns
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_12 = [
  {
    id: 551, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">AtomicInteger</span> ai = <span class="kw">new</span> <span class="cls">AtomicInteger</span>(<span class="num">0</span>);
<span class="cls">Thread</span> t1 = <span class="kw">new</span> <span class="cls">Thread</span>(() -> ai.addAndGet(<span class="num">5</span>));
<span class="cls">Thread</span> t2 = <span class="kw">new</span> <span class="cls">Thread</span>(() -> ai.addAndGet(<span class="num">3</span>));
t1.start(); t2.start();
t1.join(); t2.join();
<span class="cls">System</span>.out.println(ai.get());`,
    options: ["8 always", "5 or 3", "0", "Non-deterministic between 0 and 8"],
    answer: 0,
    explanation: "AtomicInteger.addAndGet() is atomic — it performs read-modify-write as a single indivisible operation using CAS. Regardless of thread scheduling, both additions complete fully. Final result is always 5 + 3 = 8."
  },
  {
    id: 552, topic: "Concurrency",
    text: "Which of the following is a correct way to make a singleton thread-safe using lazy initialization?",
    code: null,
    options: [
      "public static Singleton getInstance() { if (instance == null) instance = new Singleton(); return instance; }",
      "public static synchronized Singleton getInstance() { if (instance == null) instance = new Singleton(); return instance; }",
      "private static final Singleton INSTANCE = new Singleton();",
      "Both B and C are correct thread-safe approaches"
    ],
    answer: 3,
    explanation: "Option A is NOT thread-safe (race condition). Option B uses synchronized — thread-safe but has lock overhead on every call. Option C (eager initialization) is thread-safe via class loading guarantees. Both B and C are correct."
  },
  {
    id: 553, topic: "Concurrency",
    text: "What does the 'volatile' keyword guarantee?",
    code: null,
    options: [
      "Atomicity of compound operations like i++",
      "Mutual exclusion equivalent to synchronized",
      "Visibility: writes are immediately visible to all threads; ordering guarantees prevent reordering",
      "That the variable will not be garbage collected"
    ],
    answer: 2,
    explanation: "volatile guarantees two things: (1) visibility — all threads see the most recent write; (2) ordering — establishes happens-before between writes and reads. It does NOT guarantee atomicity of compound operations like i++ (use AtomicInteger for that)."
  },
  {
    id: 554, topic: "I/O & NIO",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"a/b/../../c"</span>);
<span class="cls">System</span>.out.println(p);
<span class="cls">System</span>.out.println(p.normalize());`,
    options: ["a/b/../../c\nc", "c\nc", "a/b/../../c\na/c", "Throws InvalidPathException"],
    answer: 0,
    explanation: "Path.of() stores the path as-is without resolving. toString() = 'a/b/../../c'. normalize() resolves '..': a/b → go up to a → go up to '' (root) → enter c. Result: 'c'. normalize() does not check filesystem existence."
  },
  {
    id: 555, topic: "I/O & NIO",
    text: "What is the difference between Files.lines() and Files.readAllLines()?",
    code: null,
    options: [
      "No difference",
      "Files.lines() returns a lazy Stream<String>; Files.readAllLines() loads everything into a List<String>",
      "Files.readAllLines() returns a Stream; Files.lines() returns a List",
      "Files.lines() is only for text files; Files.readAllLines() works with any file"
    ],
    answer: 1,
    explanation: "Files.lines(Path) is lazy — it reads the file line by line as you consume the Stream. Files.readAllLines(Path) reads the entire file into memory as a List<String>. For large files, Files.lines() is more memory-efficient. Note: Files.lines() must be closed (use try-with-resources)."
  },
  {
    id: 556, topic: "Serialization",
    text: "What is the output of the following code after deserializing an object whose class added a new field since serialization?",
    code: null,
    options: [
      "Always throws InvalidClassException",
      "The new field receives its default value (0, null, false) if serialVersionUID matches",
      "The field is filled with the previous value from disk",
      "The JVM skips the new field entirely without any value"
    ],
    answer: 1,
    explanation: "If serialVersionUID matches, Java is tolerant of compatible changes. A newly added field receives its type's default value upon deserialization (int→0, Object→null, boolean→false). Fields removed from the class are simply ignored from the stream."
  },
  {
    id: 557, topic: "Serialization",
    text: "What is the purpose of implementing writeObject() / readObject() in a Serializable class?",
    code: null,
    options: [
      "To replace the default serialization entirely (use Externalizable for that)",
      "To customize serialization — add extra logic like encryption, validation, or handling of non-serializable fields",
      "To make the class faster to serialize",
      "To serialize static fields (normally excluded)"
    ],
    answer: 1,
    explanation: "writeObject(ObjectOutputStream) and readObject(ObjectInputStream) let you customize the serialization process: encrypt data, normalize values, handle transient fields that need manual persistence, or include version-specific migration logic — while still leveraging the default mechanism via defaultWriteObject/defaultReadObject."
  },
  {
    id: 558, topic: "Generics",
    text: "Which code correctly implements the PECS principle to add elements to a collection?",
    code: null,
    options: [
      "static void addNumbers(List<? extends Number> list) { list.add(42); }",
      "static void addNumbers(List<? super Integer> list) { list.add(42); }",
      "static void addNumbers(List<?> list) { list.add(42); }",
      "static <T> void addNumbers(List<T extends Number> list) { list.add(42); }"
    ],
    answer: 1,
    explanation: "PECS: Producer Extends, Consumer Super. To add (consume) Integer elements, use ? super Integer — the list is guaranteed to be a List of Integer or a supertype, so adding Integer is always safe. Options A and C prevent adding; D has invalid syntax."
  },
  {
    id: 559, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; ints    = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
<span class="cls">List</span>&lt;<span class="cls">Double</span>&gt;  doubles = <span class="cls">List</span>.of(<span class="num">1.1</span>, <span class="num">2.2</span>);
<span class="kw">double</span> total = sumList(ints) + sumList(doubles);
<span class="cls">System</span>.out.printf(<span class="str">"%.1f%n"</span>, total);

<span class="kw">static double</span> sumList(<span class="cls">List</span>&lt;? <span class="kw">extends</span> <span class="cls">Number</span>&gt; list) {
    <span class="kw">return</span> list.stream().mapToDouble(<span class="cls">Number</span>::doubleValue).sum();
}`,
    options: ["9.3", "Compilation error", "9.0", "Throws ClassCastException"],
    answer: 0,
    explanation: "sumList accepts List<? extends Number>, so both List<Integer> and List<Double> are accepted. ints: 1+2+3=6.0. doubles: 1.1+2.2=3.3. total=9.3. printf('%.1f') formats to 1 decimal: '9.3'."
  },
  {
    id: 560, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Status</span> { PENDING, ACTIVE, CLOSED }
<span class="cls">Status</span> s = <span class="cls">Status</span>.valueOf(<span class="str">"ACTIVE"</span>);
<span class="cls">System</span>.out.println(s.ordinal() + <span class="str">" "</span> + s.name());`,
    options: ["1 ACTIVE", "0 ACTIVE", "2 ACTIVE", "Throws IllegalArgumentException"],
    answer: 0,
    explanation: "Status.valueOf('ACTIVE') returns Status.ACTIVE. ordinal() returns the zero-based declaration position: PENDING=0, ACTIVE=1. name() returns the constant's name as declared: 'ACTIVE'. Result: '1 ACTIVE'."
  },
  {
    id: 561, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Color</span> {
    RED(<span class="str">"#FF0000"</span>), GREEN(<span class="str">"#00FF00"</span>), BLUE(<span class="str">"#0000FF"</span>);
    <span class="kw">private final</span> <span class="cls">String</span> hex;
    <span class="cls">Color</span>(<span class="cls">String</span> hex) { <span class="kw">this</span>.hex = hex; }
    <span class="cls">String</span> hex() { <span class="kw">return</span> hex; }
}
<span class="cls">System</span>.out.println(<span class="cls">Color</span>.GREEN.hex());`,
    options: ["#00FF00", "GREEN", "1", "Compilation error"],
    answer: 0,
    explanation: "Enums can have fields, constructors, and methods. Color.GREEN is initialized with '#00FF00' stored in the private final field hex. hex() returns it. Result: '#00FF00'."
  },
  {
    id: 562, topic: "Enums",
    text: "What does the following code print?",
    code: `<span class="kw">enum</span> <span class="cls">Planet</span> { MERCURY, VENUS, EARTH }
<span class="cls">System</span>.out.println(<span class="cls">Arrays</span>.toString(<span class="cls">Planet</span>.values()));`,
    options: ["[MERCURY, VENUS, EARTH]", "[0, 1, 2]", "MERCURY VENUS EARTH", "Compilation error — values() does not exist"],
    answer: 0,
    explanation: "values() is a compiler-generated static method that returns an array of all enum constants in declaration order. Arrays.toString on a Planet[] formats as '[MERCURY, VENUS, EARTH]'."
  },
  {
    id: 563, topic: "Static Initializers",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Base</span> {
    <span class="kw">static</span> { <span class="cls">System</span>.out.print(<span class="str">"B "</span>); }
}
<span class="kw">class</span> <span class="cls">Child</span> <span class="kw">extends</span> <span class="cls">Base</span> {
    <span class="kw">static</span> { <span class="cls">System</span>.out.print(<span class="str">"C "</span>); }
}
<span class="kw">new</span> <span class="cls">Child</span>();
<span class="kw">new</span> <span class="cls">Child</span>();`,
    options: ["B C B C", "B C", "B B C C", "C B"],
    answer: 1,
    explanation: "Static initializers run exactly once per class, when the class is first loaded. Base is loaded first (prints 'B '), then Child (prints 'C '). The second new Child() does not re-run the static blocks. Result: 'B C'."
  },
  {
    id: 564, topic: "Static Initializers",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Order</span> {
    <span class="kw">static int</span> x = compute();
    <span class="kw">static int</span> y = <span class="num">10</span>;
    <span class="kw">static int</span> compute() { <span class="kw">return</span> y * <span class="num">2</span>; }
    <span class="kw">static</span> { <span class="cls">System</span>.out.println(x + <span class="str">" "</span> + y); }
}
<span class="kw">class</span> <span class="cls">Main</span> { <span class="kw">public static void</span> main(<span class="cls">String</span>[] a) { <span class="kw">new</span> <span class="cls">Order</span>(); } }`,
    options: ["0 10", "20 10", "10 10", "Compilation error"],
    answer: 0,
    explanation: "Static members initialize in declaration order. x = compute() runs first: y is still 0 (default int), so y*2 = 0. Then y = 10. The static block runs after all initializations: prints '0 10'. This is a classic forward-reference trap."
  },
  {
    id: 565, topic: "Casting",
    text: "What is the output of the following code?",
    code: `<span class="kw">double</span> d = <span class="num">3.9</span>;
<span class="kw">int</span>    i = (<span class="kw">int</span>) d;
<span class="kw">long</span>   l = (<span class="kw">long</span>) d;
<span class="cls">System</span>.out.println(i + <span class="str">" "</span> + l);`,
    options: ["3 3", "4 4", "3 4", "Throws ArithmeticException"],
    answer: 0,
    explanation: "Casting double to int (or long) truncates toward zero — it does NOT round. 3.9 → 3 for both int and long. Result: '3 3'."
  },
  {
    id: 566, topic: "Casting",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>  n = <span class="num">257</span>;
<span class="kw">byte</span> b = (<span class="kw">byte</span>) n;
<span class="cls">System</span>.out.println(b);`,
    options: ["1", "257", "-1", "Throws ArithmeticException"],
    answer: 0,
    explanation: "257 in binary (32-bit): 00000000 00000000 00000001 00000001. Casting to byte keeps only the lowest 8 bits: 00000001 = 1. Narrowing conversion silently truncates. Result: 1."
  },
  {
    id: 567, topic: "Comparable",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"banana"</span>, <span class="str">"apple"</span>, <span class="str">"Cherry"</span>));
<span class="cls">Collections</span>.sort(words);
<span class="cls">System</span>.out.println(words.get(<span class="num">0</span>));`,
    options: ["apple", "Cherry", "banana", "cherry"],
    answer: 1,
    explanation: "String's natural order (Comparable) uses Unicode code points. Uppercase letters have lower values than lowercase: 'C' (67) < 'a' (97) < 'b' (98). So 'Cherry' sorts first. words.get(0) = 'Cherry'."
  },
  {
    id: 568, topic: "Comparable",
    text: "What does Comparator.comparing(Person::getAge).reversed() do?",
    code: null,
    options: [
      "Sorts by age ascending",
      "Sorts by age descending",
      "Sorts by age then reverses the entire sort",
      "Throws UnsupportedOperationException"
    ],
    answer: 1,
    explanation: "Comparator.comparing(Person::getAge) creates a comparator that sorts by age ascending. .reversed() inverts the ordering, resulting in descending age order. This is equivalent to Comparator.comparing(Person::getAge, Comparator.reverseOrder())."
  },
  {
    id: 569, topic: "Text Blocks",
    text: "What is the value of s (the actual string content) in the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"""
              Hello
              """</span>;`,
    options: [
      "\"\\n              Hello\\n              \"",
      "\"Hello\\n\"",
      "\"Hello\"",
      "\"              Hello              \""
    ],
    answer: 1,
    explanation: "Text block indentation stripping: the closing '\"\"\"' is at 14 spaces. The content 'Hello' is also at 14 spaces, so all 14 leading spaces are stripped. The result is 'Hello' followed by a newline (from the line break before the closing \"\"\"). Value: \"Hello\\n\"."
  },
  {
    id: 570, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> html = <span class="str">"""
        &lt;html&gt;
            &lt;body&gt;Hello&lt;/body&gt;
        &lt;/html&gt;
        """</span>;
<span class="cls">System</span>.out.println(html.lines().count());`,
    options: ["3", "4", "2", "5"],
    answer: 0,
    explanation: "The text block has 3 content lines: '<html>', '    <body>Hello</body>', '</html>'. The closing '\"\"\"' on a new line does not add an extra line. lines().count() = 3."
  },
  {
    id: 571, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> a = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"1.0"</span>);
<span class="kw">var</span> b = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"1.00"</span>);
<span class="cls">System</span>.out.println(a.equals(b));
<span class="cls">System</span>.out.println(a.compareTo(b) == <span class="num">0</span>);`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "true\nfalse"],
    answer: 0,
    explanation: "BigDecimal.equals() compares both value AND scale. 1.0 (scale=1) and 1.00 (scale=2) are not equal by equals(). compareTo() compares only numeric value: 1.0 == 1.00 numerically, so compareTo returns 0. Always use compareTo() for numeric equality of BigDecimals."
  },
  {
    id: 572, topic: "BigDecimal",
    text: "Which is the correct way to create a BigDecimal representing exactly 0.1?",
    code: null,
    options: [
      "new BigDecimal(0.1)",
      "new BigDecimal(\"0.1\")",
      "BigDecimal.valueOf(0.1f)",
      "All of the above"
    ],
    answer: 1,
    explanation: "new BigDecimal(0.1) captures the IEEE 754 double approximation of 0.1, which is not exactly 0.1. new BigDecimal(\"0.1\") parses the string exactly, giving precisely 0.1. BigDecimal.valueOf(double) uses Double.toString() internally — more reliable than the double constructor but still based on floating-point."
  },
  {
    id: 573, topic: "Bitwise",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">0b1010_1010</span>;
<span class="cls">System</span>.out.println(x >>> <span class="num">4</span>);
<span class="cls">System</span>.out.println(x >> <span class="num">4</span>);`,
    options: ["10\n10", "10\n-6", "170\n10", "-86\n10"],
    answer: 0,
    explanation: "0b10101010 = 170. >>> 4 (unsigned right shift): fills with zeros. 170 >>> 4 = 10 (0000_1010). >> 4 (signed right shift): fills with sign bit. 170 is positive (bit 7 = 1 but as 32-bit int it is positive), so sign bit is 0, also fills with 0. 170 >> 4 = 10. Result: '10\\n10'."
  },
  {
    id: 574, topic: "Bitwise",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> a = <span class="num">0xF0</span>; <span class="cm">// 1111 0000</span>
<span class="kw">int</span> b = <span class="num">0x0F</span>; <span class="cm">// 0000 1111</span>
<span class="cls">System</span>.out.println((a | b));
<span class="cls">System</span>.out.println((a & b));`,
    options: ["255\n0", "240\n15", "255\n15", "0\n255"],
    answer: 0,
    explanation: "a = 11110000, b = 00001111. OR: 11111111 = 255. AND: 00000000 = 0. No bits overlap between a and b. Result: '255\\n0'."
  },
  {
    id: 575, topic: "Design Patterns",
    text: "Which design pattern does java.util.Collections.unmodifiableList() implement?",
    code: null,
    options: ["Singleton", "Decorator", "Factory Method", "Proxy"],
    answer: 3,
    explanation: "unmodifiableList() returns a Proxy that wraps the original list and intercepts mutating operations (add, remove, set) by throwing UnsupportedOperationException, while delegating read operations to the original list. The Decorator pattern would add behavior; Proxy controls access."
  },
  {
    id: 576, topic: "Design Patterns",
    text: "Which pattern does the following code implement?",
    code: `<span class="kw">interface</span> <span class="cls">Logger</span> { <span class="kw">void</span> log(<span class="cls">String</span> msg); }
<span class="kw">class</span> <span class="cls">ConsoleLogger</span> <span class="kw">implements</span> <span class="cls">Logger</span> {
    <span class="kw">public void</span> log(<span class="cls">String</span> msg) { <span class="cls">System</span>.out.println(msg); }
}
<span class="kw">class</span> <span class="cls">TimestampLogger</span> <span class="kw">implements</span> <span class="cls">Logger</span> {
    <span class="kw">private final</span> <span class="cls">Logger</span> wrapped;
    <span class="cls">TimestampLogger</span>(<span class="cls">Logger</span> l) { wrapped = l; }
    <span class="kw">public void</span> log(<span class="cls">String</span> msg) { wrapped.log(<span class="cls">Instant</span>.now() + <span class="str">": "</span> + msg); }
}`,
    options: ["Singleton", "Observer", "Decorator", "Strategy"],
    answer: 2,
    explanation: "TimestampLogger implements Logger and wraps another Logger instance. It adds behavior (prepending a timestamp) before delegating to the wrapped logger. This is the Decorator pattern: dynamically adding responsibilities to objects without subclassing."
  },
  {
    id: 577, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">int</span> val = <span class="num">1</span>;
    <span class="kw">int</span> get() { <span class="kw">return</span> val; }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span> val = <span class="num">2</span>;
    <span class="kw">int</span> get() { <span class="kw">return</span> val; }
}
<span class="cls">A</span> ref = <span class="kw">new</span> <span class="cls">B</span>();
<span class="cls">System</span>.out.println(ref.val + <span class="str">" "</span> + ref.get());`,
    options: ["1 2", "2 2", "1 1", "2 1"],
    answer: 0,
    explanation: "ref.val: fields are resolved by the reference type (A) — no polymorphism. A.val = 1. ref.get(): methods are resolved by the actual type (B) — polymorphism applies. B.get() returns B.val = 2. Result: '1 2'."
  },
  {
    id: 578, topic: "Concurrency",
    text: "What does the following code guarantee about the output order?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; results = <span class="kw">new</span> <span class="cls">CopyOnWriteArrayList</span>&lt;&gt;();
<span class="cls">List</span>&lt;<span class="cls">Future</span>&lt;<span class="cls">Integer</span>&gt;&gt; futures = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newFixedThreadPool(<span class="num">4</span>);
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">5</span>; i++) {
    <span class="kw">final int</span> n = i;
    futures.add(exec.submit(() -> n * n));
}
futures.forEach(f -> results.add(f.get()));
<span class="cls">System</span>.out.println(results);`,
    options: [
      "Results are always [1, 4, 9, 16, 25]",
      "Results are in non-deterministic order",
      "Throws ConcurrentModificationException",
      "Compilation error"
    ],
    answer: 0,
    explanation: "The computation order is parallel and non-deterministic, but results are collected by iterating futures in submission order. f.get() blocks until each future's result is available. The results list is built in the same order as the futures list: [1, 4, 9, 16, 25] always."
  },
  {
    id: 579, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>, <span class="num">2</span>)
    .sorted()
    .skip(<span class="num">2</span>)
    .limit(<span class="num">3</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .sum();
<span class="cls">System</span>.out.println(r);`,
    options: ["16", "22", "14", "25"],
    answer: 0,
    explanation: "sorted(): [1, 2, 3, 5, 8, 9]. skip(2) discards the first 2 elements: [3, 5, 8, 9]. limit(3) keeps only 3 elements: [3, 5, 8]. mapToInt then sum(): 3 + 5 + 8 = 16."
  },
  {
    id: 580, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"cat"</span>, <span class="str">"dog"</span>, <span class="str">"bird"</span>, <span class="str">"fish"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        <span class="cls">String</span>::length,
        <span class="cls">Collectors</span>.joining(<span class="str">", "</span>)
    ));
<span class="cls">System</span>.out.println(result.get(<span class="num">3</span>));`,
    options: ["cat, dog", "cat, dog, fish", "bird", "Throws NullPointerException"],
    answer: 0,
    explanation: "groupingBy(String::length, joining): lengths — cat(3), dog(3), bird(4), fish(4). For key 3: 'cat' and 'dog' are joined as 'cat, dog'. result.get(3) = 'cat, dog'."
  },
  {
    id: 581, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {
    <span class="kw">static</span> <span class="cls">Point</span> origin() { <span class="kw">return new</span> <span class="cls">Point</span>(<span class="num">0</span>, <span class="num">0</span>); }
    <span class="cls">Point</span> translate(<span class="kw">int</span> dx, <span class="kw">int</span> dy) { <span class="kw">return new</span> <span class="cls">Point</span>(x + dx, y + dy); }
}
<span class="cls">Point</span> p = <span class="cls">Point</span>.origin().translate(<span class="num">3</span>, <span class="num">4</span>);
<span class="cls">System</span>.out.println(p);`,
    options: ["Point[x=3, y=4]", "Point(3, 4)", "(3, 4)", "Compilation error"],
    answer: 0,
    explanation: "Records auto-generate toString() in the format ClassName[field1=value1, field2=value2]. Point.origin() = Point(0,0). translate(3,4) creates new Point(3,4). toString() = 'Point[x=3, y=4]'."
  },
  {
    id: 582, topic: "Modules (JPMS)",
    text: "What command compiles a modular Java application?",
    code: null,
    options: [
      "javac --module-source-path src -d out $(find src -name '*.java')",
      "javac -classpath src -d out $(find src -name '*.java')",
      "java --module-path out --module com.example/com.example.Main",
      "javac -module com.example src/module-info.java"
    ],
    answer: 0,
    explanation: "For modular compilation, use --module-source-path to specify the root of the module source tree. The compiler discovers module-info.java files and compiles everything. Option C is the launch command, not compilation. Option B uses classpath (not module path)."
  },
  {
    id: 583, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">public static int</span> compute() {
    <span class="kw">try</span> { <span class="kw">return</span> <span class="num">1</span>; }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) { <span class="kw">return</span> <span class="num">2</span>; }
    <span class="kw">finally</span> { <span class="kw">return</span> <span class="num">3</span>; }
}
<span class="cls">System</span>.out.println(compute());`,
    options: ["1", "2", "3", "Compilation error"],
    answer: 2,
    explanation: "A return in a finally block overrides any return in the try or catch block. The try returns 1, but before actually returning, finally executes and returns 3, which becomes the method's return value. This is considered bad practice — avoid return in finally."
  },
  {
    id: 584, topic: "Exceptions",
    text: "Which of the following is a checked exception?",
    code: null,
    options: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "IOException",
      "IllegalArgumentException"
    ],
    answer: 2,
    explanation: "Checked exceptions must be declared in the method signature (throws) or caught. IOException is a checked exception. NullPointerException, ArrayIndexOutOfBoundsException, and IllegalArgumentException are all RuntimeExceptions (unchecked) — they do not need to be declared or caught."
  },
  {
    id: 585, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; T identity(T t) { <span class="kw">return</span> t; }
<span class="cls">String</span>  s = identity(<span class="str">"hello"</span>);
<span class="cls">Integer</span> i = identity(<span class="num">42</span>);
<span class="cls">System</span>.out.println(s + <span class="str">" "</span> + i);`,
    options: ["hello 42", "Compilation error", "hello null", "null 42"],
    answer: 0,
    explanation: "The generic method identity(T t) returns its argument unchanged. T is inferred as String for 'hello' and Integer for 42. Both are type-safe. Result: 'hello 42'."
  },
  {
    id: 586, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Deque</span>&lt;<span class="cls">String</span>&gt; stack = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
stack.push(<span class="str">"first"</span>);
stack.push(<span class="str">"second"</span>);
stack.push(<span class="str">"third"</span>);
<span class="cls">System</span>.out.println(stack.pop() + <span class="str">" "</span> + stack.peek());`,
    options: ["third second", "first second", "third first", "second third"],
    answer: 0,
    explanation: "ArrayDeque as a stack: push() adds to the front (top). After pushing first, second, third: [third, second, first]. pop() removes and returns 'third'. peek() returns 'second' (new top) without removing. Result: 'third second'."
  },
  {
    id: 587, topic: "I/O & NIO",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> a = <span class="cls">Path</span>.of(<span class="str">"/home/user"</span>);
<span class="cls">Path</span> b = <span class="cls">Path</span>.of(<span class="str">"/home/user/docs"</span>);
<span class="cls">System</span>.out.println(a.relativize(b));
<span class="cls">System</span>.out.println(b.relativize(a));`,
    options: ["docs\n..", "docs\n../user", "/home/user/docs\n/home/user", "user\ndocs"],
    answer: 0,
    explanation: "relativize(b) gives the path from a to b: 'docs'. relativize(a) gives the path from b to a: '..' (go up one level from docs to user). Result: 'docs\\n..'."
  },
  {
    id: 588, topic: "String API",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"one::two::three"</span>;
<span class="cls">String</span>[] parts = s.split(<span class="str">"::"</span>);
<span class="cls">System</span>.out.println(parts.length + <span class="str">" "</span> + parts[<span class="num">1</span>]);`,
    options: ["3 two", "5 :", "3 :two", "2 two::three"],
    answer: 0,
    explanation: "split('::') splits on the literal '::' (as a regex, ':' matches any char but '::' works fine here). 'one::two::three' splits into ['one', 'two', 'three']. length = 3, parts[1] = 'two'. Result: '3 two'."
  },
  {
    id: 589, topic: "Lambdas",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; items = <span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"bb"</span>, <span class="str">"ccc"</span>);
items.stream()
     .map(<span class="cls">String</span>::length)
     .reduce(<span class="cls">Integer</span>::sum)
     .ifPresent(<span class="cls">System</span>.out::println);`,
    options: ["6", "3", "1", "Compilation error"],
    answer: 0,
    explanation: "map(String::length): [1, 2, 3]. reduce(Integer::sum) without identity returns Optional<Integer>(6). ifPresent(System.out::println) prints 6 if present. Result: '6'."
  },
  {
    id: 590, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">3</span>, <span class="num">15</span>);
<span class="cls">LocalDate</span> first = d.with(<span class="cls">TemporalAdjusters</span>.firstDayOfMonth());
<span class="cls">LocalDate</span> last  = d.with(<span class="cls">TemporalAdjusters</span>.lastDayOfMonth());
<span class="cls">System</span>.out.println(first.getDayOfMonth() + <span class="str">" "</span> + last.getDayOfMonth());`,
    options: ["1 31", "1 30", "15 31", "1 29"],
    answer: 0,
    explanation: "firstDayOfMonth() returns the first day of March 2024 → March 1 → dayOfMonth=1. lastDayOfMonth() returns the last day of March → March 31 (March has 31 days) → dayOfMonth=31. Result: '1 31'."
  },
  {
    id: 591, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Vehicle</span> {
    <span class="kw">int</span> speed = <span class="num">60</span>;
    <span class="kw">void</span> info() { <span class="cls">System</span>.out.println(<span class="str">"Vehicle: "</span> + speed); }
}
<span class="kw">class</span> <span class="cls">Car</span> <span class="kw">extends</span> <span class="cls">Vehicle</span> {
    <span class="kw">int</span> speed = <span class="num">120</span>;
    <span class="kw">void</span> info() { <span class="cls">System</span>.out.println(<span class="str">"Car: "</span> + speed); }
}
<span class="cls">Vehicle</span> v = <span class="kw">new</span> <span class="cls">Car</span>();
v.info();
<span class="cls">System</span>.out.println(v.speed);`,
    options: ["Car: 120\n60", "Vehicle: 60\n60", "Car: 60\n120", "Car: 120\n120"],
    answer: 0,
    explanation: "v.info(): method is resolved by actual type (Car) → prints 'Car: 120'. v.speed: field is resolved by reference type (Vehicle) → 60. Fields are not polymorphic. Result: 'Car: 120\\n60'."
  },
  {
    id: 592, topic: "Concurrency",
    text: "What is a 'race condition' in the context of multithreading?",
    code: null,
    options: [
      "Two threads competing for CPU time in a fair scheduler",
      "A bug where the program's outcome depends on the relative timing of uncontrolled events (e.g., thread scheduling)",
      "A deadlock between exactly two threads",
      "A thread running faster than expected due to JIT optimization"
    ],
    answer: 1,
    explanation: "A race condition occurs when two or more threads access shared data without proper synchronization, and the final result depends on the non-deterministic order of thread execution. The 'race' is between threads, and the winner determines the (potentially incorrect) outcome."
  },
  {
    id: 593, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; square  = x -> x * x;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; addFive = x -> x + <span class="num">5</span>;
<span class="cls">System</span>.out.println(square.compose(addFive).apply(<span class="num">3</span>));
<span class="cls">System</span>.out.println(square.andThen(addFive).apply(<span class="num">3</span>));`,
    options: ["64\n14", "14\n64", "64\n9", "9\n14"],
    answer: 0,
    explanation: "compose(g) applies g first, then the current function. square.compose(addFive).apply(3): addFive(3)=8, square(8)=64. andThen(g) applies the current function first, then g. square.andThen(addFive).apply(3): square(3)=9, addFive(9)=14. Result: '64\\n14'."
  },
  {
    id: 594, topic: "var",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> x = <span class="num">5</span>;
<span class="kw">var</span> y = <span class="num">2.0</span>;
<span class="kw">var</span> z = x + y;
<span class="cls">System</span>.out.println(z + <span class="str">" "</span> + ((Object) z).getClass().getSimpleName());`,
    options: ["7.0 Double", "7.0 double", "7 Double", "Compilation error"],
    answer: 0,
    explanation: "x is inferred as int (5), y as double (2.0). x + y promotes int to double: 5 + 2.0 = 7.0. z is inferred as double. (Object) z autoboxes to Double. getClass().getSimpleName() = 'Double'. Result: '7.0 Double'."
  },
  {
    id: 595, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();
m.put(<span class="str">"c"</span>, <span class="num">3</span>); m.put(<span class="str">"a"</span>, <span class="num">1</span>); m.put(<span class="str">"b"</span>, <span class="num">2</span>);
m.entrySet().stream()
    .filter(e -> e.getValue() > <span class="num">1</span>)
    .forEach(e -> <span class="cls">System</span>.out.print(e.getKey() + <span class="str">" "</span>));`,
    options: ["b c ", "c b ", "a b c ", "c b a "],
    answer: 0,
    explanation: "TreeMap keeps keys in natural (alphabetical) order: a→1, b→2, c→3. filter(value > 1) keeps b→2 and c→3. forEach in order: prints 'b c '. Result: 'b c '."
  },
  {
    id: 596, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed class</span> <span class="cls">Num</span> <span class="kw">permits</span> <span class="cls">Even</span>, <span class="cls">Odd</span> {}
<span class="kw">final class</span> <span class="cls">Even</span> <span class="kw">extends</span> <span class="cls">Num</span> { <span class="kw">int</span> v; <span class="cls">Even</span>(<span class="kw">int</span> v) { <span class="kw">this</span>.v = v; } }
<span class="kw">final class</span> <span class="cls">Odd</span>  <span class="kw">extends</span> <span class="cls">Num</span> { <span class="kw">int</span> v; <span class="cls">Odd</span>(<span class="kw">int</span>  v) { <span class="kw">this</span>.v = v; } }
<span class="cls">Num</span> n = <span class="kw">new</span> <span class="cls">Even</span>(<span class="num">4</span>);
<span class="cls">System</span>.out.println(<span class="kw">switch</span>(n) {
    <span class="kw">case</span> <span class="cls">Even</span> e -> <span class="str">"even: "</span> + e.v;
    <span class="kw">case</span> <span class="cls">Odd</span>  o -> <span class="str">"odd: "</span>  + o.v;
});`,
    options: ["even: 4", "odd: 4", "Compilation error — default required", "Throws MatchException"],
    answer: 0,
    explanation: "The switch over sealed Num is exhaustive — both permitted subclasses (Even and Odd) are covered, so no default is needed. n is Even(4), so case Even e matches: 'even: ' + 4 = 'even: 4'."
  },
  {
    id: 597, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">Boolean</span>, <span class="cls">Long</span>&gt; result = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">10</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        n -> n % <span class="num">2</span> == <span class="num">0</span>,
        <span class="cls">Collectors</span>.counting()
    ));
<span class="cls">System</span>.out.println(result.get(<span class="kw">true</span>) + <span class="str">" "</span> + result.get(<span class="kw">false</span>));`,
    options: ["5 5", "4 6", "6 4", "Compilation error"],
    answer: 0,
    explanation: "IntStream.rangeClosed(1,10) = [1..10]. Partition by even: true (evens: 2,4,6,8,10) → count=5. false (odds: 1,3,5,7,9) → count=5. Result: '5 5'."
  },
  {
    id: 598, topic: "OOP",
    text: "Which statement about the Java memory model's happens-before relationship is CORRECT?",
    code: null,
    options: [
      "Any two statements in the same thread may be reordered freely",
      "A write to a volatile field happens-before every subsequent read of that same field by any thread",
      "synchronized blocks establish happens-before only within the same thread",
      "Thread.sleep() establishes a happens-before relationship"
    ],
    answer: 1,
    explanation: "Java Memory Model: a write to a volatile field W happens-before any subsequent read R of the same volatile field by any other thread. This guarantees both visibility (R sees the write) and ordering (all actions before W are visible after R)."
  },
  {
    id: 599, topic: "Design Patterns",
    text: "Which pattern does the following code demonstrate?",
    code: `<span class="cls">HttpRequest</span> req = <span class="cls">HttpRequest</span>.newBuilder()
    .uri(<span class="cls">URI</span>.create(<span class="str">"https://example.com"</span>))
    .header(<span class="str">"Accept"</span>, <span class="str">"application/json"</span>)
    .GET()
    .build();`,
    options: ["Factory Method", "Builder", "Prototype", "Strategy"],
    answer: 1,
    explanation: "This is the Builder pattern: a fluent interface that constructs a complex immutable object (HttpRequest) step by step. Each method returns the builder itself (or a step in the chain), and build() finalizes the object. This avoids telescoping constructors."
  },
  {
    id: 600, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>, <span class="str">"d"</span>, <span class="str">"e"</span>)
    .filter(s -> !s.equals(<span class="str">"c"</span>))
    .collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">System</span>.out.println(result);`,
    options: ["[a,b,d,e]", "[a,b,c,d,e]", "a,b,d,e", "[a,b,d,e,]"],
    answer: 0,
    explanation: "filter removes 'c'. Remaining: a, b, d, e. Collectors.joining(',', '[', ']') joins with ',' delimiter, prefix '[', suffix ']'. Result: '[a,b,d,e]'."
  }
];
