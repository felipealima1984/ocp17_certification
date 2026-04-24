// ═══════════════════════════════════════════════════════
//  PACK EN-17 — Questions 801–850  (English)
//  Topics: Concurrency patterns deep, Lambda scoping,
//          Comparator chaining, Collections edge cases,
//          Generics wildcards advanced, Exception flow,
//          NIO channels, Date/Time parsing, Records
//          serialization, Switch expressions edge cases,
//          String pool advanced, Array covariance
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_17 = [
  {
    id: 801, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ReentrantLock</span> lock = <span class="kw">new</span> <span class="cls">ReentrantLock</span>(<span class="kw">true</span>); <span class="cm">// fair</span>
lock.lock();
<span class="kw">try</span> {
    <span class="cls">System</span>.out.println(<span class="str">"holds: "</span> + lock.getHoldCount());
    <span class="cls">System</span>.out.println(<span class="str">"fair: "</span>  + lock.isFair());
} <span class="kw">finally</span> {
    lock.unlock();
}`,
    options: ["holds: 1\nfair: true", "holds: 0\nfair: true", "holds: 1\nfair: false", "Throws IllegalMonitorStateException"],
    answer: 0,
    explanation: "ReentrantLock(true) creates a fair lock. lock() acquires it once. getHoldCount() = 1 (acquired once by current thread). isFair() = true. Finally unlocks. Result: 'holds: 1\\nfair: true'."
  },
  {
    id: 802, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CompletableFuture</span>&lt;<span class="cls">Integer</span>&gt; cf =
    <span class="cls">CompletableFuture</span>.supplyAsync(() -> { <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"fail"</span>); })
        .handle((result, ex) -> ex != <span class="kw">null</span> ? -<span class="num">1</span> : result);
<span class="cls">System</span>.out.println(cf.get());`,
    options: ["-1", "Throws ExecutionException", "null", "0"],
    answer: 0,
    explanation: "handle(BiFunction<T,Throwable,U>) runs whether success or failure. supplyAsync throws RuntimeException. handle receives result=null, ex=RuntimeException. Returns -1. cf.get() = -1 (no exception — handle recovered it)."
  },
  {
    id: 803, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">Phaser</span> phaser = <span class="kw">new</span> <span class="cls">Phaser</span>(<span class="num">1</span>);
<span class="kw">int</span> phase0 = phaser.arrive();
<span class="kw">int</span> phase1 = phaser.arrive();
<span class="cls">System</span>.out.println(phase0 + <span class="str">" "</span> + phase1 + <span class="str">" "</span> + phaser.getPhase());`,
    options: ["0 1 2", "0 0 1", "1 2 2", "Throws IllegalStateException"],
    answer: 0,
    explanation: "Phaser(1): registered=1. arrive() returns CURRENT phase then increments when arrivals == registered. First arrive(): returns 0 (phase 0 completes → advances to phase 1). Second arrive(): returns 1 (phase 1 completes → advances to phase 2). getPhase()=2. Result: '0 1 2'."
  },
  {
    id: 804, topic: "Lambda",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> base = <span class="num">10</span>;
<span class="cls">List</span>&lt;<span class="cls">Runnable</span>&gt; tasks = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">3</span>; i++) {
    <span class="kw">final int</span> n = i;
    tasks.add(() -> <span class="cls">System</span>.out.print(base + n + <span class="str">" "</span>));
}
tasks.forEach(<span class="cls">Runnable</span>::run);`,
    options: ["10 11 12 ", "30 30 30 ", "10 10 10 ", "Compilation error — base not effectively final"],
    answer: 0,
    explanation: "base=10 is effectively final (never reassigned). Each iteration captures a different effectively-final 'n' (0, 1, 2). Lambdas print: 10+0=10, 10+1=11, 10+2=12. Result: '10 11 12 '."
  },
  {
    id: 805, topic: "Lambda",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt; counter() {
    <span class="kw">int</span>[] count = {<span class="num">0</span>};
    <span class="kw">return</span> () -> ++count[<span class="num">0</span>];
}
<span class="cls">Supplier</span>&lt;<span class="cls">Integer</span>&gt; c = counter();
<span class="cls">System</span>.out.println(c.get() + <span class="str">" "</span> + c.get() + <span class="str">" "</span> + c.get());`,
    options: ["1 2 3", "0 1 2", "1 1 1", "Compilation error"],
    answer: 0,
    explanation: "count[] is effectively final (the reference, not the contents). The lambda captures the array and mutates it on each call. c.get(): ++count[0]=1, then 2, then 3. Result: '1 2 3'."
  },
  {
    id: 806, topic: "Comparator",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Person</span>(<span class="cls">String</span> name, <span class="kw">int</span> age) {}
<span class="cls">List</span>&lt;<span class="cls">Person</span>&gt; people = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Alice"</span>, <span class="num">30</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Bob"</span>,   <span class="num">25</span>),
    <span class="kw">new</span> <span class="cls">Person</span>(<span class="str">"Carol"</span>, <span class="num">30</span>)
);
people.stream()
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Person</span>::age)
                       .thenComparing(<span class="cls">Person</span>::name))
    .forEach(p -> <span class="cls">System</span>.out.print(p.name() + <span class="str">" "</span>));`,
    options: ["Bob Alice Carol ", "Alice Bob Carol ", "Bob Carol Alice ", "Alice Carol Bob "],
    answer: 0,
    explanation: "Sort by age then name. Bob(25), Alice(30), Carol(30). Age 25 first: Bob. Age 30 tie: Alice < Carol alphabetically. Result: 'Bob Alice Carol '."
  },
  {
    id: 807, topic: "Comparator",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(
    <span class="cls">List</span>.of(<span class="str">"banana"</span>, <span class="str">"Apple"</span>, <span class="str">"cherry"</span>, <span class="str">"date"</span>)
);
words.sort(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length)
                       .thenComparing(<span class="cls">Comparator</span>.naturalOrder()));
<span class="cls">System</span>.out.println(words);`,
    options: ["[date, Apple, banana, cherry]", "[Apple, date, banana, cherry]", "[Apple, banana, cherry, date]", "[date, banana, Apple, cherry]"],
    answer: 0,
    explanation: "By length: date(4), Apple(5), banana(6), cherry(6). Length 4: date. Length 5: Apple. Length 6 tie: banana vs cherry — natural order: banana < cherry. Result: '[date, Apple, banana, cherry]'."
  },
  {
    id: 808, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">LinkedHashMap</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; m = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;(<span class="num">16</span>, <span class="num">0.75f</span>, <span class="kw">true</span>);
m.put(<span class="str">"a"</span>, <span class="num">1</span>); m.put(<span class="str">"b"</span>, <span class="num">2</span>); m.put(<span class="str">"c"</span>, <span class="num">3</span>);
m.get(<span class="str">"a"</span>); <span class="cm">// access</span>
m.get(<span class="str">"b"</span>); <span class="cm">// access</span>
m.forEach((k, v) -> <span class="cls">System</span>.out.print(k));`,
    options: ["cab", "abc", "bac", "cba"],
    answer: 0,
    explanation: "LinkedHashMap with accessOrder=true maintains access order (LRU). Insertion: a,b,c. get('a') moves a to end. get('b') moves b to end. Order: c(untouched), a(accessed first), b(accessed last). Result: 'cab'."
  },
  {
    id: 809, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">NavigableSet</span>&lt;<span class="cls">Integer</span>&gt; s = <span class="kw">new</span> <span class="cls">TreeSet</span>&lt;&gt;(<span class="cls">Set</span>.of(<span class="num">1</span>,<span class="num">3</span>,<span class="num">5</span>,<span class="num">7</span>,<span class="num">9</span>));
<span class="cls">System</span>.out.println(s.floor(<span class="num">4</span>));
<span class="cls">System</span>.out.println(s.ceiling(<span class="num">4</span>));
<span class="cls">System</span>.out.println(s.lower(<span class="num">5</span>));
<span class="cls">System</span>.out.println(s.higher(<span class="num">5</span>));`,
    options: ["3\n5\n3\n7", "3\n4\n3\n5", "5\n5\n5\n7", "4\n4\n4\n6"],
    answer: 0,
    explanation: "Set: {1,3,5,7,9}. floor(4): largest ≤ 4 = 3. ceiling(4): smallest ≥ 4 = 5. lower(5): largest < 5 (strictly) = 3. higher(5): smallest > 5 (strictly) = 7. Result: '3\\n5\\n3\\n7'."
  },
  {
    id: 810, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">Integer</span>, <span class="cls">String</span>&gt; m = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();
m.put(<span class="num">1</span>, <span class="str">"one"</span>);
m.put(<span class="kw">null</span>, <span class="str">"nil"</span>);
m.put(<span class="num">1</span>, <span class="kw">null</span>);
<span class="cls">System</span>.out.println(m.size() + <span class="str">" "</span> + m.get(<span class="num">1</span>) + <span class="str">" "</span> + m.get(<span class="kw">null</span>));`,
    options: ["2 null nil", "3 null nil", "2 one nil", "Throws NullPointerException"],
    answer: 0,
    explanation: "HashMap allows null key and null values. put(1,'one') then put(1,null) updates key 1 to null. put(null,'nil') adds null key. size()=2. m.get(1)=null. m.get(null)='nil'. Result: '2 null nil'."
  },
  {
    id: 811, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">T</span> first(<span class="cls">T</span>[] arr) { <span class="kw">return</span> arr[<span class="num">0</span>]; }
<span class="cls">String</span>[]  strings = {<span class="str">"a"</span>, <span class="str">"b"</span>};
<span class="cls">Integer</span>[] ints    = {<span class="num">1</span>, <span class="num">2</span>};
<span class="cls">System</span>.out.println(first(strings) + <span class="str">" "</span> + first(ints));`,
    options: ["a 1", "Compilation error", "a 1 (with unchecked warning)", "Throws ArrayStoreException"],
    answer: 0,
    explanation: "Generic method first(T[]) works with any array type. T is inferred as String for strings[], Integer for ints[]. Returns 'a' and 1. No warnings here — no unchecked operations. Result: 'a 1'."
  },
  {
    id: 812, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span>[] objs = <span class="kw">new</span> <span class="cls">String</span>[<span class="num">3</span>];
<span class="kw">try</span> {
    objs[<span class="num">0</span>] = <span class="str">"hello"</span>;
    objs[<span class="num">1</span>] = <span class="num">42</span>; <span class="cm">// line A</span>
} <span class="kw">catch</span> (<span class="cls">ArrayStoreException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"ASE"</span>);
}`,
    options: ["ASE", "Compilation error at line A", "No exception — stores 42 as Object", "ClassCastException"],
    answer: 0,
    explanation: "Array covariance: String[] is assignable to Object[]. However, storing an Integer (42) into a String[] at runtime throws ArrayStoreException — the JVM checks the actual array type. Line A compiles fine (42 autoboxes to Integer which is an Object) but fails at runtime."
  },
  {
    id: 813, topic: "Exception Flow",
    text: "What is the output of the following code?",
    code: `<span class="kw">static int</span> test() {
    <span class="kw">int</span> x = <span class="num">0</span>;
    <span class="kw">try</span> {
        x = <span class="num">1</span>;
        <span class="kw">return</span> x;
    } <span class="kw">finally</span> {
        x = <span class="num">2</span>;
    }
}
<span class="cls">System</span>.out.println(test());`,
    options: ["1", "2", "0", "Compilation error"],
    answer: 0,
    explanation: "The try block sets x=1 and executes 'return x'. The return value (1) is saved. The finally block runs: x=2, but this does NOT change the already-saved return value. The method returns 1. Returning from finally WOULD override (return in finally), but assignment in finally does not."
  },
  {
    id: 814, topic: "Exception Flow",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">try</span> {
        <span class="kw">throw new</span> <span class="cls">IOException</span>(<span class="str">"io"</span>);
    } <span class="kw">catch</span> (<span class="cls">IOException</span> e) {
        <span class="cls">System</span>.out.print(<span class="str">"inner "</span>);
        <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"rte"</span>, e);
    }
} <span class="kw">catch</span> (<span class="cls">RuntimeException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"outer "</span> + e.getCause().getMessage());
}`,
    options: ["inner outer io", "inner outer rte", "outer io", "Compilation error"],
    answer: 0,
    explanation: "Inner try throws IOException. Inner catch prints 'inner ', wraps in RuntimeException with cause. Outer catch catches RuntimeException, prints 'outer ' + getCause().getMessage() = 'io'. Result: 'inner outer io'."
  },
  {
    id: 815, topic: "Exception Flow",
    text: "Which of the following is NOT true about try-with-resources?",
    code: null,
    options: [
      "Resources are closed in reverse order of declaration",
      "A resource must implement AutoCloseable",
      "If close() throws an exception and the body also threw one, both are propagated simultaneously",
      "The resource variable is effectively final within the try block"
    ],
    answer: 2,
    explanation: "C is NOT true: when both the body and close() throw exceptions, only the body exception propagates. The close() exception becomes a SUPPRESSED exception (accessible via getSuppressed()). It is NOT propagated simultaneously — there is always one primary exception."
  },
  {
    id: 816, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.range(<span class="num">0</span>, <span class="num">10</span>)
    .boxed()
    .collect(<span class="cls">Collectors</span>.partitioningBy(
        n -> n < <span class="num">5</span>,
        <span class="cls">Collectors</span>.summarizingInt(<span class="cls">Integer</span>::intValue)
    ));
<span class="cls">System</span>.out.println(r.get(<span class="kw">true</span>).getSum() + <span class="str">" "</span> + r.get(<span class="kw">false</span>).getSum());`,
    options: ["10 35", "35 10", "45 0", "Compilation error"],
    answer: 0,
    explanation: "range(0,10) = [0..9]. Partition: true (n<5): [0,1,2,3,4] sum=10. false (n≥5): [5,6,7,8,9] sum=35. r.get(true).getSum()=10, r.get(false).getSum()=35. Result: '10 35'."
  },
  {
    id: 817, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)
    .map(n -> n * <span class="num">2</span>)
    .peek(n -> { <span class="kw">if</span> (n == <span class="num">4</span>) <span class="kw">throw new</span> <span class="cls">RuntimeException</span>(<span class="str">"boom"</span>); })
    .collect(<span class="cls">Collectors</span>.toList());`,
    options: [
      "Throws RuntimeException after processing 1 and 3",
      "Throws RuntimeException when element 2 (mapped to 4) is processed",
      "[2, 6]",
      "Compilation error"
    ],
    answer: 1,
    explanation: "Stream processes lazily. map(1)=2 → peek(2): OK. map(2)=4 → peek(4): throws RuntimeException('boom'). Processing halts. The list is never fully collected. RuntimeException propagates out of collect()."
  },
  {
    id: 818, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Node</span>&lt;T&gt;(<span class="cls">T</span> value, <span class="cls">Node</span>&lt;T&gt; next) {
    <span class="kw">static</span> &lt;T&gt; <span class="kw">int</span> length(<span class="cls">Node</span>&lt;T&gt; n) {
        <span class="kw">return</span> n == <span class="kw">null</span> ? <span class="num">0</span> : <span class="num">1</span> + length(n.next());
    }
}
<span class="kw">var</span> list = <span class="kw">new</span> <span class="cls">Node</span>&lt;&gt;(<span class="num">1</span>, <span class="kw">new</span> <span class="cls">Node</span>&lt;&gt;(<span class="num">2</span>, <span class="kw">new</span> <span class="cls">Node</span>&lt;&gt;(<span class="num">3</span>, <span class="kw">null</span>)));
<span class="cls">System</span>.out.println(<span class="cls">Node</span>.length(list));`,
    options: ["3", "2", "4", "Compilation error"],
    answer: 0,
    explanation: "Node is a generic recursive record (linked list). length: Node(1,Node(2,Node(3,null))). 1+length(Node(2,Node(3,null))) = 1+1+length(Node(3,null)) = 1+1+1+length(null) = 1+1+1+0 = 3."
  },
  {
    id: 819, topic: "Switch Expressions",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> day = <span class="str">"MONDAY"</span>;
<span class="kw">var</span> type = <span class="kw">switch</span>(day) {
    <span class="kw">case</span> <span class="str">"MONDAY"</span>, <span class="str">"TUESDAY"</span>, <span class="str">"WEDNESDAY"</span>,
         <span class="str">"THURSDAY"</span>, <span class="str">"FRIDAY"</span> -> {
        <span class="cls">System</span>.out.print(<span class="str">"weekday: "</span>);
        <span class="kw">yield</span> <span class="str">"work"</span>;
    }
    <span class="kw">default</span> -> <span class="str">"rest"</span>;
};
<span class="cls">System</span>.out.println(type);`,
    options: ["weekday: work", "work", "weekday: rest", "Compilation error"],
    answer: 0,
    explanation: "Switch expression with block: case MONDAY matches. Block prints 'weekday: ', then yields 'work'. type = 'work'. println prints 'work'. Total output: 'weekday: work'."
  },
  {
    id: 820, topic: "Switch Expressions",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">5</span>;
<span class="kw">var</span> result = <span class="kw">switch</span>(x) {
    <span class="kw">default</span> -> <span class="str">"other"</span>;
    <span class="kw">case</span> <span class="num">1</span>, <span class="num">2</span> -> <span class="str">"low"</span>;
    <span class="kw">case</span> <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span> -> <span class="str">"mid"</span>;
};
<span class="cls">System</span>.out.println(result);`,
    options: ["mid", "other", "low", "Compilation error — default must be last"],
    answer: 0,
    explanation: "In switch expressions, 'default' does NOT need to be last. x=5 matches 'case 3,4,5' → 'mid'. The default would only run if no other case matches. Result: 'mid'."
  },
  {
    id: 821, topic: "String Pool",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s1 = <span class="str">"Hello"</span>;
<span class="cls">String</span> s2 = <span class="str">"Hel"</span> + <span class="str">"lo"</span>;
<span class="cls">String</span> s3 = <span class="str">"Hel"</span>;
<span class="cls">String</span> s4 = s3 + <span class="str">"lo"</span>;
<span class="cls">System</span>.out.println(s1 == s2);
<span class="cls">System</span>.out.println(s1 == s4);`,
    options: ["true\nfalse", "true\ntrue", "false\nfalse", "false\ntrue"],
    answer: 0,
    explanation: "'Hel'+'lo' = compile-time constant folding → 'Hello' in pool. s1==s2 is true. s3+'lo': s3 is a variable, concatenation at runtime via StringBuilder → new String object on heap. s1==s4 is false. Result: 'true\\nfalse'."
  },
  {
    id: 822, topic: "String Pool",
    text: "What is the output of the following code?",
    code: `<span class="kw">final</span> <span class="cls">String</span> s1 = <span class="str">"Hel"</span>;
<span class="cls">String</span>       s2 = <span class="str">"Hel"</span>;
<span class="cls">String</span> r1 = s1 + <span class="str">"lo"</span>;
<span class="cls">String</span> r2 = s2 + <span class="str">"lo"</span>;
<span class="cls">System</span>.out.println(r1 == <span class="str">"Hello"</span>);
<span class="cls">System</span>.out.println(r2 == <span class="str">"Hello"</span>);`,
    options: ["true\nfalse", "false\nfalse", "true\ntrue", "false\ntrue"],
    answer: 0,
    explanation: "s1 is 'final String' with a compile-time constant value. s1+'lo' is a compile-time constant → 'Hello' in pool. r1=='Hello' is true. s2 is not final (just a local String variable), so s2+'lo' is runtime concatenation → new object. r2=='Hello' is false."
  },
  {
    id: 823, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;? <span class="kw">super</span> T&gt;&gt; T max(<span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; list) {
    <span class="kw">return</span> list.stream().max(<span class="cls">Comparator</span>.naturalOrder()).orElseThrow();
}
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>);
<span class="cls">System</span>.out.println(max(nums));`,
    options: ["5", "1", "Compilation error", "4"],
    answer: 0,
    explanation: "T is inferred as Integer. The signature <T extends Comparable<? super T>> is standard for max on Comparable types. List<? extends T> accepts List<Integer>. naturalOrder() for Integer returns max = 5."
  },
  {
    id: 824, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>));
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; view = <span class="cls">Collections</span>.unmodifiableList(list);
list.add(<span class="num">4</span>);
<span class="cls">System</span>.out.println(view.size());`,
    options: ["4", "3", "Throws UnsupportedOperationException", "Throws ConcurrentModificationException"],
    answer: 0,
    explanation: "Collections.unmodifiableList() creates a view backed by the original list. Modifications to the original list ARE reflected in the view (you can't modify THROUGH the view, but the original list can be modified). list.add(4) → original has 4 elements → view.size() = 4."
  },
  {
    id: 825, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; a = <span class="kw">new</span> <span class="cls">HashSet</span>&lt;&gt;(<span class="cls">Set</span>.of(<span class="str">"x"</span>, <span class="str">"y"</span>, <span class="str">"z"</span>));
<span class="cls">Set</span>&lt;<span class="cls">String</span>&gt; b = <span class="cls">Set</span>.of(<span class="str">"y"</span>, <span class="str">"z"</span>, <span class="str">"w"</span>);
a.removeAll(b);
<span class="cls">System</span>.out.println(a);`,
    options: ["[x]", "[y, z]", "[x, w]", "[w]"],
    answer: 0,
    explanation: "removeAll removes elements of b from a. a={x,y,z}, b={y,z,w}. Common: y and z are removed. a = {x}. Result: '[x]' (HashSet, order not guaranteed but only one element)."
  },
  {
    id: 826, topic: "NIO",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> base = <span class="cls">Path</span>.of(<span class="str">"/home/user"</span>);
<span class="cls">Path</span> file = <span class="cls">Path</span>.of(<span class="str">"/home/user/docs/report.txt"</span>);
<span class="cls">System</span>.out.println(base.relativize(file));
<span class="cls">System</span>.out.println(file.relativize(base));`,
    options: ["docs/report.txt\n../..", "../..\ndocs/report.txt", "report.txt\n..", "Compilation error"],
    answer: 0,
    explanation: "relativize(target): path from 'this' to target. base.relativize(file): from /home/user to /home/user/docs/report.txt = 'docs/report.txt'. file.relativize(base): from /home/user/docs/report.txt to /home/user = '../..' (go up two levels). Result: 'docs/report.txt\\n../..'."
  },
  {
    id: 827, topic: "Date/Time Parsing",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"2024-06-15T10:30:00"</span>;
<span class="cls">LocalDateTime</span> ldt = <span class="cls">LocalDateTime</span>.parse(s);
<span class="cls">System</span>.out.println(ldt.format(<span class="cls">DateTimeFormatter</span>.ISO_LOCAL_DATE));`,
    options: ["2024-06-15", "2024-06-15T10:30:00", "06/15/2024", "Throws DateTimeParseException"],
    answer: 0,
    explanation: "LocalDateTime.parse(String) uses ISO_LOCAL_DATE_TIME format by default (yyyy-MM-dd'T'HH:mm:ss). format(ISO_LOCAL_DATE) extracts just the date part: '2024-06-15'."
  },
  {
    id: 828, topic: "Date/Time Parsing",
    text: "What is the output of the following code?",
    code: `<span class="cls">DateTimeFormatter</span> f = <span class="cls">DateTimeFormatter</span>.ofPattern(<span class="str">"EEE, d MMM yyyy"</span>, <span class="cls">Locale</span>.ENGLISH);
<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">25</span>);
<span class="cls">System</span>.out.println(d.format(f));`,
    options: ["Wed, 25 Dec 2024", "Wednesday, 25 December 2024", "12/25/2024", "Throws DateTimeException"],
    answer: 0,
    explanation: "EEE = abbreviated day name (Wed). d = day of month (25). MMM = abbreviated month name (Dec). yyyy = year. December 25, 2024 is a Wednesday. Result: 'Wed, 25 Dec 2024'."
  },
  {
    id: 829, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="cls">List</span>.of(<span class="str">"the"</span>, <span class="str">"quick"</span>, <span class="str">"brown"</span>, <span class="str">"fox"</span>);
<span class="cls">Map</span>&lt;<span class="cls">Integer</span>, <span class="cls">List</span>&lt;<span class="cls">String</span>&gt;&gt; m = words.stream()
    .collect(<span class="cls">Collectors</span>.groupingBy(<span class="cls">String</span>::length));
m.forEach((len, ws) ->
    <span class="cls">System</span>.out.println(len + <span class="str">": "</span> + ws.stream().sorted().collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>))));`,
    options: ["3: fox,the\n5: brown,quick", "3: the,fox\n5: quick,brown", "the,fox: 3\nquick,brown: 5", "Compilation error"],
    answer: 0,
    explanation: "groupBy length: 3→[the,fox], 5→[quick,brown]. forEach iterates map entries (HashMap order non-deterministic, but for exam: 3 then 5). Each group is sorted. 3: fox,the (f<t). 5: brown,quick (b<q). Exam assumes natural iteration order prints shorter length first."
  },
  {
    id: 830, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Outer</span> {
    <span class="kw">int</span> x = <span class="num">1</span>;
    <span class="cls">Runnable</span> getLambda() {
        <span class="kw">int</span> x = <span class="num">2</span>;
        <span class="kw">return</span> () -> <span class="cls">System</span>.out.println(x + <span class="str">" "</span> + <span class="kw">this</span>.x);
    }
    <span class="cls">Runnable</span> getAnon() {
        <span class="kw">int</span> x = <span class="num">3</span>;
        <span class="kw">return new</span> <span class="cls">Runnable</span>() {
            <span class="kw">public void</span> run() { <span class="cls">System</span>.out.println(x + <span class="str">" "</span> + <span class="cls">Outer</span>.<span class="kw">this</span>.x); }
        };
    }
}
<span class="cls">Outer</span> o = <span class="kw">new</span> <span class="cls">Outer</span>();
o.getLambda().run();
o.getAnon().run();`,
    options: ["2 1\n3 1", "1 1\n1 1", "2 2\n3 3", "Compilation error"],
    answer: 0,
    explanation: "Lambda: captures local x=2. 'this' refers to Outer (lambda doesn't have its own 'this'). Prints '2 1'. Anonymous class: captures local x=3. Outer.this.x=1. Prints '3 1'. Result: '2 1\\n3 1'."
  },
  {
    id: 831, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"hello"</span>, <span class="str">"world"</span>, <span class="str">"java"</span>)
    .collect(<span class="cls">Collectors</span>.toMap(
        s -> s.charAt(<span class="num">0</span>),
        <span class="cls">String</span>::length
    ));
<span class="cls">System</span>.out.println(r.get(<span class="str">'j'</span>));`,
    options: ["4", "5", "Throws IllegalStateException", "null"],
    answer: 0,
    explanation: "toMap: 'h'→5, 'w'→5, 'j'→4. No duplicate keys (h≠w≠j). r.get('j')=4 ('java'.length()=4). Result: 4."
  },
  {
    id: 832, topic: "Generics",
    text: "What happens when you call the following method with a raw type?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">void</span> print(<span class="cls">List</span>&lt;T&gt; list) {
    list.forEach(System.out::println);
}
<span class="cls">List</span> raw = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="str">"two"</span>, <span class="num">3.0</span>);
print(raw);`,
    options: [
      "Prints 1, two, 3.0 with unchecked warning at compile time",
      "Compilation error — raw types cannot be passed to generic methods",
      "Throws ClassCastException at runtime",
      "Prints nothing"
    ],
    answer: 0,
    explanation: "Passing a raw type to a generic method generates an unchecked warning at compile time (not an error). At runtime, T is erased to Object. forEach(System.out::println) prints each element using println(Object). Prints 1, two, 3.0."
  },
  {
    id: 833, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="cls">Runtime</span> rt = <span class="cls">Runtime</span>.getRuntime();
<span class="kw">int</span> cpus = rt.availableProcessors();
<span class="cls">System</span>.out.println(cpus > <span class="num">0</span>);`,
    options: ["true", "false", "Compilation error", "Throws RuntimeException"],
    answer: 0,
    explanation: "Runtime.getRuntime().availableProcessors() returns the number of logical CPUs available to the JVM. This is always ≥ 1 (at minimum 1 CPU is available). The check cpus > 0 is always true."
  },
  {
    id: 834, topic: "Annotations",
    text: "What is the output of the following code?",
    code: `<span class="ann">@Retention</span>(<span class="cls">RetentionPolicy</span>.RUNTIME)
<span class="ann">@interface</span> <span class="cls">Info</span> {
    <span class="cls">String</span>  name()    <span class="kw">default</span> <span class="str">"unknown"</span>;
    <span class="kw">int</span>     version() <span class="kw">default</span> <span class="num">1</span>;
}
<span class="ann">@Info</span>(name = <span class="str">"MyApp"</span>)
<span class="kw">class</span> <span class="cls">App</span> {}
<span class="cls">Info</span> info = <span class="cls">App</span>.<span class="kw">class</span>.getAnnotation(<span class="cls">Info</span>.<span class="kw">class</span>);
<span class="cls">System</span>.out.println(info.name() + <span class="str">" v"</span> + info.version());`,
    options: ["MyApp v1", "unknown v1", "MyApp v0", "Compilation error"],
    answer: 0,
    explanation: "@Info(name='MyApp') provides name but uses default for version=1. info.name()='MyApp', info.version()=1. Result: 'MyApp v1'."
  },
  {
    id: 835, topic: "Records",
    text: "Which of the following is a valid compact constructor for a record?",
    code: null,
    options: [
      "public Person(String name, int age) { this.name = name; this.age = age; }",
      "public Person { if (age < 0) throw new IllegalArgumentException(); }",
      "Person { name = name.trim(); age = age; }",
      "public Person() { }"
    ],
    answer: 1,
    explanation: "The compact constructor omits the parameter list. It has access to the components as implicit parameters. The compiler auto-assigns them to the fields AFTER the compact constructor body. Option A is the canonical constructor (full). Option C is missing 'public'. Option D has no parameters — invalid for a record with components."
  },
  {
    id: 836, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Vehicle</span> <span class="kw">permits</span> <span class="cls">Car</span>, <span class="cls">Truck</span>, <span class="cls">Bike</span> {}
<span class="kw">final class</span> <span class="cls">Car</span>   <span class="kw">implements</span> <span class="cls">Vehicle</span> {}
<span class="kw">final class</span> <span class="cls">Truck</span> <span class="kw">implements</span> <span class="cls">Vehicle</span> {}
<span class="kw">final class</span> <span class="cls">Bike</span>  <span class="kw">implements</span> <span class="cls">Vehicle</span> {}
<span class="cls">Vehicle</span> v = <span class="kw">new</span> <span class="cls">Car</span>();
<span class="cls">String</span> s = <span class="kw">switch</span>(v) {
    <span class="kw">case</span> <span class="cls">Car</span>   c -> <span class="str">"car"</span>;
    <span class="kw">case</span> <span class="cls">Truck</span> t -> <span class="str">"truck"</span>;
    <span class="kw">case</span> <span class="cls">Bike</span>  b -> <span class="str">"bike"</span>;
};
<span class="cls">System</span>.out.println(s);`,
    options: ["car", "Compilation error — default required", "Throws MatchException", "vehicle"],
    answer: 0,
    explanation: "All three permitted subclasses are covered in case labels. The switch is exhaustive — no default needed. v is Car → 'car'. Result: 'car'."
  },
  {
    id: 837, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(
    <span class="cls">Optional</span>.of(<span class="str">"a"</span>),
    <span class="cls">Optional</span>.empty(),
    <span class="cls">Optional</span>.of(<span class="str">"b"</span>)
)
.flatMap(<span class="cls">Optional</span>::stream)
.collect(<span class="cls">Collectors</span>.joining(<span class="str">","</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["a,b", "a,,b", "Optional[a],Optional[b]", "Compilation error"],
    answer: 0,
    explanation: "Optional.stream() returns a Stream with one element if present, or empty Stream if absent. flatMap(Optional::stream) flattens: ['a', (empty), 'b'] → ['a', 'b']. joining(',') = 'a,b'. Result: 'a,b'."
  },
  {
    id: 838, topic: "Exception Flow",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="kw">throw new</span> <span class="cls">RuntimeException</span>();
} <span class="kw">catch</span> (<span class="cls">Exception</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"E1 "</span>);
} <span class="kw">catch</span> (<span class="cls">Throwable</span> t) {
    <span class="cls">System</span>.out.print(<span class="str">"T "</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"F"</span>);
}`,
    options: ["E1 F", "T F", "E1 T F", "Compilation error"],
    answer: 0,
    explanation: "RuntimeException extends Exception. The first matching catch wins: catch(Exception e) catches it → prints 'E1 '. catch(Throwable) is not reached. Finally runs: prints 'F'. Result: 'E1 F'."
  },
  {
    id: 839, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Box</span>&lt;T&gt; {
    <span class="kw">private</span> T val;
    <span class="cls">Box</span>(T v) { val = v; }
    <span class="kw">boolean</span> sameType(<span class="cls">Box</span>&lt;?&gt; other) {
        <span class="kw">return</span> val.getClass() == other.val.getClass();
    }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="str">"x"</span>).sameType(<span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="str">"y"</span>)));
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="str">"x"</span>).sameType(<span class="kw">new</span> <span class="cls">Box</span>&lt;&gt;(<span class="num">1</span>)));`,
    options: ["true\nfalse", "false\nfalse", "true\ntrue", "Compilation error"],
    answer: 0,
    explanation: "Box<String>('x').sameType(Box<String>('y')): String.class == String.class → true. Box<String>('x').sameType(Box<Integer>(1)): String.class == Integer.class → false. Result: 'true\\nfalse'."
  },
  {
    id: 840, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">A</span> { <span class="kw">default</span> <span class="kw">int</span> val() { <span class="kw">return</span> <span class="num">1</span>; } }
<span class="kw">interface</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> { <span class="kw">default</span> <span class="kw">int</span> val() { <span class="kw">return</span> <span class="num">2</span>; } }
<span class="kw">interface</span> <span class="cls">C</span> <span class="kw">extends</span> <span class="cls">A</span> { <span class="kw">default</span> <span class="kw">int</span> val() { <span class="kw">return</span> <span class="num">3</span>; } }
<span class="kw">class</span> <span class="cls">D</span> <span class="kw">implements</span> <span class="cls">B</span>, <span class="cls">C</span> {
    <span class="kw">public int</span> val() { <span class="kw">return</span> <span class="cls">B</span>.<span class="kw">super</span>.val() + <span class="cls">C</span>.<span class="kw">super</span>.val(); }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">D</span>().val());`,
    options: ["5", "2", "3", "Compilation error — ambiguous"],
    answer: 0,
    explanation: "D must override val() because B and C both provide conflicting defaults. D.val() uses B.super.val()=2 and C.super.val()=3 and returns 2+3=5. Result: 5."
  },
  {
    id: 841, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>, <span class="num">9</span>, <span class="num">2</span>, <span class="num">6</span>)
    .distinct()
    .sorted()
    .limit(<span class="num">4</span>)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[1, 2, 3, 4]", "[1, 1, 2, 3]", "[3, 1, 4, 5]", "[9, 6, 5, 4]"],
    answer: 0,
    explanation: "Stream: [3,1,4,1,5,9,2,6]. distinct(): [3,1,4,5,9,2,6]. sorted(): [1,2,3,4,5,6,9]. limit(4): [1,2,3,4]. Result: '[1, 2, 3, 4]'."
  },
  {
    id: 842, topic: "Modules",
    text: "What is the output of running: java --describe-module java.base?",
    code: null,
    options: [
      "It shows exports, requires, and other module metadata for java.base",
      "It lists all classes in java.base",
      "It compiles the java.base module",
      "It throws an error — system modules cannot be described"
    ],
    answer: 0,
    explanation: "'java --describe-module moduleName' prints the module descriptor: its name, version, what it exports, opens, provides, uses, and requires. For java.base (which has no requires), it would show all its exports (java.lang, java.util, etc.). Very useful for JPMS debugging."
  },
  {
    id: 843, topic: "Date/Time",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalTime</span> t = <span class="cls">LocalTime</span>.of(<span class="num">14</span>, <span class="num">30</span>, <span class="num">45</span>);
<span class="cls">System</span>.out.println(t.truncatedTo(<span class="cls">ChronoUnit</span>.HOURS));
<span class="cls">System</span>.out.println(t.truncatedTo(<span class="cls">ChronoUnit</span>.MINUTES));`,
    options: ["14:00\n14:30", "14:30\n14:30:45", "14:00:00\n14:30:00", "Compilation error"],
    answer: 0,
    explanation: "truncatedTo(ChronoUnit.HOURS): truncates to the nearest hour → 14:00. truncatedTo(ChronoUnit.MINUTES): truncates seconds → 14:30. toString() of LocalTime omits trailing zeros in seconds component. Result: '14:00\\n14:30'."
  },
  {
    id: 844, topic: "Exception Flow",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="cls">String</span> safe(<span class="cls">String</span> s) {
    <span class="kw">try</span> {
        <span class="kw">return</span> s.toUpperCase();
    } <span class="kw">catch</span> (<span class="cls">NullPointerException</span> e) {
        <span class="kw">return</span> <span class="str">"null input"</span>;
    }
}
<span class="cls">System</span>.out.println(safe(<span class="str">"hello"</span>));
<span class="cls">System</span>.out.println(safe(<span class="kw">null</span>));`,
    options: ["HELLO\nnull input", "hello\nnull input", "HELLO\nnull", "Compilation error"],
    answer: 0,
    explanation: "safe('hello'): toUpperCase() = 'HELLO'. safe(null): toUpperCase() on null throws NPE → caught → returns 'null input'. Result: 'HELLO\\nnull input'."
  },
  {
    id: 845, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newFixedThreadPool(<span class="num">2</span>);
<span class="cls">List</span>&lt;<span class="cls">Future</span>&lt;<span class="cls">Integer</span>&gt;&gt; fs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">4</span>; i++) {
    <span class="kw">final int</span> n = i;
    fs.add(exec.submit(() -> n * n));
}
exec.shutdown();
<span class="kw">int</span> sum = <span class="num">0</span>;
<span class="kw">for</span> (<span class="kw">var</span> f : fs) sum += f.get();
<span class="cls">System</span>.out.println(sum);`,
    options: ["30", "100", "Non-deterministic", "Throws ExecutionException"],
    answer: 0,
    explanation: "Tasks: 1²=1, 2²=4, 3²=9, 4²=16. f.get() in submission order ensures results are collected correctly. sum=1+4+9+16=30. Execution is parallel but results are always 1,4,9,16 regardless of execution order. Result: 30."
  },
  {
    id: 846, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; concat(<span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; a, <span class="cls">List</span>&lt;? <span class="kw">extends</span> T&gt; b) {
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(a);
    r.addAll(b);
    <span class="kw">return</span> r;
}
<span class="cls">List</span>&lt;<span class="cls">Number</span>&gt; r = concat(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>), <span class="cls">List</span>.of(<span class="num">3.0</span>, <span class="num">4.0</span>));
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 2, 3.0, 4.0]", "Compilation error", "[1, 2]", "[3.0, 4.0]"],
    answer: 0,
    explanation: "T is inferred as Number. List<? extends Number> accepts both List<Integer> and List<Double>. concat creates a List<Number> with all four elements. Result: '[1, 2, 3.0, 4.0]'."
  },
  {
    id: 847, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Resource</span> <span class="kw">implements</span> <span class="cls">AutoCloseable</span> {
    <span class="kw">final</span> <span class="cls">String</span> name;
    <span class="cls">Resource</span>(<span class="cls">String</span> n) { name = n; <span class="cls">System</span>.out.print(<span class="str">"open:"</span> + n + <span class="str">" "</span>); }
    <span class="kw">public void</span> close() { <span class="cls">System</span>.out.print(<span class="str">"close:"</span> + name + <span class="str">" "</span>); }
}
<span class="kw">try</span> (<span class="kw">var</span> a = <span class="kw">new</span> <span class="cls">Resource</span>(<span class="str">"A"</span>); <span class="kw">var</span> b = <span class="kw">new</span> <span class="cls">Resource</span>(<span class="str">"B"</span>)) {
    <span class="cls">System</span>.out.print(<span class="str">"body "</span>);
}`,
    options: ["open:A open:B body close:B close:A ", "open:A open:B body close:A close:B ", "body open:A open:B close:B close:A ", "Compilation error"],
    answer: 0,
    explanation: "Resources open in declaration order: A then B. Body runs. Closes in REVERSE order: B first, then A. Result: 'open:A open:B body close:B close:A '."
  },
  {
    id: 848, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>, <span class="str">"d"</span>)
    .collect(<span class="cls">Collectors</span>.collectingAndThen(
        <span class="cls">Collectors</span>.toList(),
        list -> { <span class="cls">Collections</span>.reverse(list); <span class="kw">return</span> list; }
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["[d, c, b, a]", "[a, b, c, d]", "Compilation error", "[a, d, b, c]"],
    answer: 0,
    explanation: "collectingAndThen(toList(), finisher): collects to [a,b,c,d], then finisher reverses in place → [d,c,b,a]. Result: '[d, c, b, a]'."
  },
  {
    id: 849, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Version</span>(<span class="kw">int</span> major, <span class="kw">int</span> minor, <span class="kw">int</span> patch) <span class="kw">implements</span> <span class="cls">Comparable</span>&lt;<span class="cls">Version</span>&gt; {
    <span class="kw">public int</span> compareTo(<span class="cls">Version</span> o) {
        <span class="kw">int</span> c = <span class="cls">Integer</span>.compare(major, o.major);
        <span class="kw">if</span> (c != <span class="num">0</span>) <span class="kw">return</span> c;
        c = <span class="cls">Integer</span>.compare(minor, o.minor);
        <span class="kw">return</span> c != <span class="num">0</span> ? c : <span class="cls">Integer</span>.compare(patch, o.patch);
    }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> major + <span class="str">"."</span> + minor + <span class="str">"."</span> + patch; }
}
<span class="kw">var</span> versions = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">2</span>,<span class="num">0</span>,<span class="num">0</span>), <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">1</span>,<span class="num">9</span>,<span class="num">0</span>), <span class="kw">new</span> <span class="cls">Version</span>(<span class="num">1</span>,<span class="num">8</span>,<span class="num">1</span>)
));
<span class="cls">Collections</span>.sort(versions);
<span class="cls">System</span>.out.println(versions.get(<span class="num">0</span>));`,
    options: ["1.8.1", "2.0.0", "1.9.0", "Compilation error"],
    answer: 0,
    explanation: "Record Version implements Comparable using semantic version comparison. Sorted ascending: 1.8.1 < 1.9.0 < 2.0.0. get(0) = smallest = '1.8.1'."
  },
  {
    id: 850, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Stream</span>&lt;<span class="cls">String</span>&gt; words = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>);
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; p = <span class="cls">Pattern</span>.compile(<span class="str">".*e$"</span>).asPredicate();
words.filter(p).forEach(<span class="cls">System</span>.out::println);`,
    options: ["one\nthree", "two", "one\ntwo\nthree", "Compilation error"],
    answer: 0,
    explanation: "Pattern.compile('.*e$').asPredicate() creates a Predicate<String> that tests if a string matches the regex. '.*e$' matches strings ending with 'e'. 'one' ends with 'e' ✓. 'two' ends with 'o' ✗. 'three' ends with 'e' ✓. Result: 'one\\nthree'."
  }
];
