// ═══════════════════════════════════════════════════════
//  PACK EN-16 — Questions 751–800  (English)
//  Topics: Thread lifecycle, Fork/Join,
//          NIO.2 FileSystem, Serialization edge cases,
//          Localization formatting, Design patterns,
//          Streams advanced (Spliterator, parallel),
//          Generics wildcard capture, Record patterns,
//          Text blocks advanced, BigInteger, Math API
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_16 = [
  {
    id: 751, topic: "Concurrency",
    text: "What is the correct order of Thread states in Java?",
    code: null,
    options: [
      "NEW → RUNNABLE → BLOCKED/WAITING/TIMED_WAITING → TERMINATED",
      "NEW → RUNNING → SLEEPING → TERMINATED",
      "CREATED → ACTIVE → SUSPENDED → DEAD",
      "NEW → READY → EXECUTING → BLOCKED → DONE"
    ],
    answer: 0,
    explanation: "Java thread states (Thread.State): NEW (created, not started), RUNNABLE (running or ready to run), BLOCKED (waiting for a monitor lock), WAITING (indefinitely waiting), TIMED_WAITING (waiting with timeout), TERMINATED (finished). A thread goes from RUNNABLE to BLOCKED/WAITING and back multiple times before TERMINATED."
  },
  {
    id: 752, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">Thread</span> t = <span class="kw">new</span> <span class="cls">Thread</span>(() -> <span class="cls">System</span>.out.print(<span class="str">"run"</span>));
<span class="cls">System</span>.out.print(t.getState() + <span class="str">" "</span>);
t.start();
t.join();
<span class="cls">System</span>.out.print(<span class="str">" "</span> + t.getState());`,
    options: ["NEW run TERMINATED", "RUNNABLE run TERMINATED", "NEW run RUNNABLE", "Compilation error"],
    answer: 0,
    explanation: "Before start(): state = NEW. t.start() launches the thread which prints 'run'. t.join() waits for completion. After join(): state = TERMINATED. Result: 'NEW run TERMINATED'."
  },
  {
    id: 753, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> exec = <span class="cls">Executors</span>.newCachedThreadPool();
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">3</span>; i++) {
    <span class="kw">final int</span> n = i;
    exec.submit(() -> <span class="cls">System</span>.out.print(n));
}
exec.shutdown();
exec.awaitTermination(<span class="num">1</span>, <span class="cls">TimeUnit</span>.SECONDS);`,
    options: [
      "012 in some order",
      "Always 012",
      "Always 210",
      "Nothing is printed"
    ],
    answer: 0,
    explanation: "newCachedThreadPool() creates threads on demand. Three tasks are submitted and may run concurrently. The order of printing 0, 1, 2 is non-deterministic. All three values will be printed but their order may vary."
  },
  {
    id: 754, topic: "Concurrency",
    text: "What is the main advantage of ForkJoinPool over a regular thread pool for recursive tasks?",
    code: null,
    options: [
      "ForkJoinPool is always faster regardless of task type",
      "Work-stealing: idle threads steal tasks from busy threads' queues, maximizing CPU utilization for recursive divide-and-conquer tasks",
      "ForkJoinPool avoids garbage collection",
      "ForkJoinPool has no queue size limit"
    ],
    answer: 1,
    explanation: "ForkJoinPool uses work-stealing: each worker thread has its own deque of tasks. When idle, a thread steals tasks from the tail of another busy thread's deque. This maximizes throughput for recursive tasks that split into many subtasks."
  },
  {
    id: 755, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>)
    .parallel()
    .filter(n -> n % <span class="num">2</span> != <span class="num">0</span>)
    .sorted()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[1, 3, 5]", "[5, 3, 1]", "Non-deterministic order", "[1, 2, 3, 4, 5]"],
    answer: 0,
    explanation: "parallel() processes in parallel but sorted() is a stateful operation that ensures the final output is sorted. The result [1,3,5] is deterministic even with parallel processing because sorted() forces ordering before collect()."
  },
  {
    id: 756, topic: "Streams",
    text: "What is the difference between Stream.of() and Stream.generate()?",
    code: null,
    options: [
      "Stream.of() is infinite; Stream.generate() is finite",
      "Stream.of() creates a finite stream from given elements; Stream.generate() creates an infinite stream from a Supplier",
      "They are identical",
      "Stream.generate() accepts a list; Stream.of() accepts a Supplier"
    ],
    answer: 1,
    explanation: "Stream.of(elements) creates a finite, ordered stream. Stream.generate(Supplier) creates an infinite, unordered stream by repeatedly calling the Supplier. Stream.generate() must be combined with limit() or takeWhile() to be useful."
  },
  {
    id: 757, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.generate(() -> <span class="str">"x"</span>)
    .limit(<span class="num">5</span>)
    .collect(<span class="cls">Collectors</span>.joining());
<span class="cls">System</span>.out.println(r.length());`,
    options: ["5", "1", "Infinite loop", "Compilation error"],
    answer: 0,
    explanation: "Stream.generate(() -> 'x') is infinite. limit(5) takes exactly 5 elements. joining() concatenates: 'xxxxx'. length() = 5."
  },
  {
    id: 758, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"."</span>).toAbsolutePath().normalize();
<span class="cls">System</span>.out.println(p.isAbsolute());`,
    options: ["true", "false", "Compilation error", "Depends on the OS"],
    answer: 0,
    explanation: "Path.of('.') is a relative path. toAbsolutePath() converts it to an absolute path by resolving against the current working directory. normalize() removes redundancies. An absolute path always returns true for isAbsolute()."
  },
  {
    id: 759, topic: "NIO.2",
    text: "Which Files method copies a file and replaces the destination if it already exists?",
    code: null,
    options: [
      "Files.copy(src, dst)",
      "Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING)",
      "Files.move(src, dst, StandardCopyOption.REPLACE_EXISTING)",
      "Files.copyReplace(src, dst)"
    ],
    answer: 1,
    explanation: "Files.copy(src, dst) throws FileAlreadyExistsException if dst exists. Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING) replaces the destination if it exists. Files.move() with the same option moves (not copies) the file."
  },
  {
    id: 760, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"reports"</span>, <span class="str">"2024"</span>, <span class="str">"q1.txt"</span>);
<span class="cls">System</span>.out.println(p.startsWith(<span class="str">"reports"</span>));
<span class="cls">System</span>.out.println(p.endsWith(<span class="str">"q1.txt"</span>));`,
    options: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
    answer: 0,
    explanation: "Path.startsWith(String): checks if this path starts with the given path element(s). 'reports/2024/q1.txt'.startsWith('reports') = true. endsWith(String): checks the tail. endsWith('q1.txt') = true. Both match complete path components."
  },
  {
    id: 761, topic: "Serialization",
    text: "What is the output when deserializing an object whose class has a different serialVersionUID than the serialized stream?",
    code: null,
    options: [
      "The object is deserialized using best-effort matching",
      "InvalidClassException is thrown with message about serialVersionUID mismatch",
      "A new default instance is returned",
      "ClassNotFoundException is thrown"
    ],
    answer: 1,
    explanation: "Mismatched serialVersionUID causes InvalidClassException during deserialization with a message indicating the UID mismatch. This is the mechanism Java uses to reject incompatible class versions. If serialVersionUID is not declared, the JVM computes it from the class structure — any structural change breaks deserialization."
  },
  {
    id: 762, topic: "Serialization",
    text: "Which fields are automatically excluded from Java serialization?",
    code: null,
    options: [
      "private fields",
      "static fields and transient fields",
      "final fields",
      "protected fields"
    ],
    answer: 1,
    explanation: "Static fields belong to the class, not the instance — they are never serialized (they are not instance state). transient fields are explicitly excluded. private, protected, public, and final fields ARE serialized (unless also transient)."
  },
  {
    id: 763, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">Locale</span> locale = <span class="cls">Locale</span>.GERMANY;
<span class="cls">NumberFormat</span> nf = <span class="cls">NumberFormat</span>.getCurrencyInstance(locale);
<span class="cls">System</span>.out.println(nf.format(<span class="num">1234.56</span>).contains(<span class="str">","</span>));`,
    options: ["true", "false", "Compilation error", "Throws MissingFormatArgumentException"],
    answer: 0,
    explanation: "German locale uses ',' as decimal separator (1.234,56 €). The formatted currency string contains a comma as decimal separator. contains(',') = true."
  },
  {
    id: 764, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">DateTimeFormatter</span> fmt = <span class="cls">DateTimeFormatter</span>
    .ofPattern(<span class="str">"dd/MM/yyyy"</span>, <span class="cls">Locale</span>.US);
<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.parse(<span class="str">"25/12/2024"</span>, fmt);
<span class="cls">System</span>.out.println(d.getYear() + <span class="str">" "</span> + d.getMonthValue());`,
    options: ["2024 12", "2024 25", "Throws DateTimeParseException", "25 12"],
    answer: 0,
    explanation: "DateTimeFormatter.ofPattern('dd/MM/yyyy') parses day/month/year. '25/12/2024' → day=25, month=12, year=2024. getYear()=2024, getMonthValue()=12. Result: '2024 12'."
  },
  {
    id: 765, topic: "Design Patterns",
    text: "Which pattern does the following code demonstrate?",
    code: `<span class="kw">interface</span> <span class="cls">Validator</span>&lt;T&gt; {
    <span class="kw">boolean</span> validate(T value);
    <span class="kw">default</span> <span class="cls">Validator</span>&lt;T&gt; and(<span class="cls">Validator</span>&lt;T&gt; other) {
        <span class="kw">return</span> v -> <span class="kw">this</span>.validate(v) && other.validate(v);
    }
}
<span class="cls">Validator</span>&lt;<span class="cls">String</span>&gt; notNull  = s -> s != <span class="kw">null</span>;
<span class="cls">Validator</span>&lt;<span class="cls">String</span>&gt; notEmpty = s -> !s.isBlank();
<span class="cls">Validator</span>&lt;<span class="cls">String</span>&gt; valid    = notNull.and(notEmpty);`,
    options: ["Singleton", "Chain of Responsibility", "Composite / Specification", "Observer"],
    answer: 2,
    explanation: "The Specification pattern (a variant of Composite) combines business rules using logical operators (and, or, not). Each Validator is a specification. and() creates a composite specification. This is exactly how Java's Predicate works."
  },
  {
    id: 766, topic: "Design Patterns",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Observer</span> { <span class="kw">void</span> update(<span class="cls">String</span> event); }
<span class="kw">class</span> <span class="cls">EventBus</span> {
    <span class="cls">List</span>&lt;<span class="cls">Observer</span>&gt; listeners = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">void</span> subscribe(<span class="cls">Observer</span> o) { listeners.add(o); }
    <span class="kw">void</span> publish(<span class="cls">String</span> e)    { listeners.forEach(o -> o.update(e)); }
}
<span class="cls">EventBus</span> bus = <span class="kw">new</span> <span class="cls">EventBus</span>();
bus.subscribe(e -> <span class="cls">System</span>.out.print(<span class="str">"A:"</span> + e + <span class="str">" "</span>));
bus.subscribe(e -> <span class="cls">System</span>.out.print(<span class="str">"B:"</span> + e + <span class="str">" "</span>));
bus.publish(<span class="str">"click"</span>);`,
    options: ["A:click B:click ", "B:click A:click ", "A:click ", "Compilation error"],
    answer: 0,
    explanation: "Observer pattern. Two observers are subscribed in order. publish('click') notifies both in subscription order. A prints 'A:click ', B prints 'B:click '. Result: 'A:click B:click '."
  },
  {
    id: 767, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">RGB</span>(<span class="kw">int</span> r, <span class="kw">int</span> g, <span class="kw">int</span> b) {
    <span class="cls">RGB</span> { r = clamp(r); g = clamp(g); b = clamp(b); }
    <span class="kw">private static int</span> clamp(<span class="kw">int</span> v) { <span class="kw">return</span> <span class="cls">Math</span>.max(<span class="num">0</span>, <span class="cls">Math</span>.min(<span class="num">255</span>, v)); }
    <span class="cls">String</span> hex() { <span class="kw">return</span> <span class="cls">String</span>.format(<span class="str">"#%02X%02X%02X"</span>, r, g, b); }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">RGB</span>(<span class="num">300</span>, <span class="num">128</span>, <span class="num">-10</span>).hex());`,
    options: ["#FF8000", "#FF8000", "#12C80A", "Throws IllegalArgumentException"],
    answer: 0,
    explanation: "Compact constructor clamps values: r=clamp(300)=255, g=clamp(128)=128, b=clamp(-10)=0. hex() formats as #%02X%02X%02X: #FF8000. Result: '#FF8000'."
  },
  {
    id: 768, topic: "Sealed Classes",
    text: "Can a non-sealed class in a sealed hierarchy itself have unlimited subclasses?",
    code: null,
    options: [
      "No — all classes in a sealed hierarchy must be final",
      "Yes — non-sealed reopens the hierarchy, allowing unrestricted extension",
      "Only if they are in the same package",
      "Only if they implement a specific interface"
    ],
    answer: 1,
    explanation: "non-sealed is exactly for this purpose. A class declared non-sealed within a sealed hierarchy removes sealing restrictions for that branch. Any class can extend a non-sealed class without restriction, reopening that portion of the hierarchy."
  },
  {
    id: 769, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Predicate</span>&lt;<span class="cls">Integer</span>&gt; isEven  = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">Predicate</span>&lt;<span class="cls">Integer</span>&gt; isPosit = n -> n > <span class="num">0</span>;
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(-<span class="num">4</span>, -<span class="num">3</span>, <span class="num">0</span>, <span class="num">2</span>, <span class="num">5</span>, <span class="num">6</span>);
<span class="kw">long</span> count = nums.stream()
    .filter(isEven.and(isPosit))
    .count();
<span class="cls">System</span>.out.println(count);`,
    options: ["2", "3", "4", "1"],
    answer: 0,
    explanation: "isEven AND isPositive: must be both even (0 is even) and positive (>0). -4 (even, negative: no). -3 (odd: no). 0 (even, not positive: no). 2 (even, positive: yes). 5 (odd: no). 6 (even, positive: yes). count = 2."
  },
  {
    id: 770, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; result = <span class="cls">Optional</span>
    .ofNullable(<span class="str">"  hello  "</span>)
    .map(<span class="cls">String</span>::strip)
    .filter(<span class="cls">Predicate</span>.not(<span class="cls">String</span>::isBlank))
    .map(<span class="cls">String</span>::toUpperCase);
<span class="cls">System</span>.out.println(result.orElse(<span class="str">"empty"</span>));`,
    options: ["HELLO", "hello", "  hello  ", "empty"],
    answer: 0,
    explanation: "ofNullable('  hello  '): non-null. map(strip): 'hello'. filter(not(isBlank)): 'hello' is not blank → passes. map(toUpperCase): 'HELLO'. orElse not needed. Result: 'HELLO'."
  },
  {
    id: 771, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; filter(<span class="cls">List</span>&lt;T&gt; list, <span class="cls">Predicate</span>&lt;? <span class="kw">super</span> T&gt; pred) {
    <span class="kw">return</span> list.stream().filter(pred).collect(<span class="cls">Collectors</span>.toList());
}
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);
<span class="cls">Predicate</span>&lt;<span class="cls">Number</span>&gt;  pred = n -> n.doubleValue() > <span class="num">2.5</span>;
<span class="cls">System</span>.out.println(filter(nums, pred));`,
    options: ["[3, 4, 5]", "[1, 2]", "Compilation error", "[3.0, 4.0, 5.0]"],
    answer: 0,
    explanation: "Predicate<? super T> allows a predicate on a supertype (Number) to be used for subtype (Integer). T=Integer. Predicate<Number> with n.doubleValue() > 2.5 filters: 3,4,5 pass. Result: '[3, 4, 5]'."
  },
  {
    id: 772, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> birthdate = <span class="cls">LocalDate</span>.of(<span class="num">1990</span>, <span class="num">5</span>, <span class="num">15</span>);
<span class="cls">LocalDate</span> today     = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">5</span>, <span class="num">14</span>);
<span class="cls">Period</span> age = <span class="cls">Period</span>.between(birthdate, today);
<span class="cls">System</span>.out.println(age.getYears());`,
    options: ["33", "34", "35", "Compilation error"],
    answer: 0,
    explanation: "Period.between computes the date difference. From 1990-05-15 to 2024-05-14: not yet reached the 15th in May 2024, so the birthday hasn't occurred this year. Age = 33 years (34th birthday is tomorrow). getYears() = 33."
  },
  {
    id: 773, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">ZonedDateTime</span> zdt = <span class="cls">ZonedDateTime</span>.now(<span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>));
<span class="cls">Instant</span> instant = zdt.toInstant();
<span class="cls">ZonedDateTime</span> back = instant.atZone(<span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>));
<span class="cls">System</span>.out.println(zdt.toInstant().equals(back.toInstant()));`,
    options: ["true", "false", "Compilation error", "Depends on nanoseconds"],
    answer: 0,
    explanation: "Converting ZonedDateTime → Instant → ZonedDateTime (same zone) is lossless. Both toInstant() calls return the same Instant value. equals() between two Instants representing the same point in time returns true."
  },
  {
    id: 774, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">BlockingQueue</span>&lt;<span class="cls">Integer</span>&gt; q = <span class="kw">new</span> <span class="cls">ArrayBlockingQueue</span>&lt;&gt;(<span class="num">2</span>);
q.put(<span class="num">1</span>); q.put(<span class="num">2</span>);
<span class="kw">boolean</span> offered = q.offer(<span class="num">3</span>);
<span class="cls">System</span>.out.println(offered + <span class="str">" "</span> + q.size());`,
    options: ["false 2", "true 3", "false 3", "Throws IllegalStateException"],
    answer: 0,
    explanation: "ArrayBlockingQueue(2) has capacity 2. After put(1) and put(2) the queue is full. offer(3) attempts to add without blocking: returns false if queue is full. Queue size remains 2. Result: 'false 2'."
  },
  {
    id: 775, topic: "Concurrency",
    text: "What does Thread.interrupt() do?",
    code: null,
    options: [
      "Immediately stops the thread",
      "Sets the thread's interrupt flag; blocking methods throw InterruptedException when interrupted",
      "Causes the thread to throw RuntimeException immediately",
      "Pauses the thread until resume() is called"
    ],
    answer: 1,
    explanation: "Thread.interrupt() sets the interrupt flag on the target thread. If the thread is blocked in sleep(), wait(), join(), or a blocking I/O, it throws InterruptedException. If running normally, the flag is set and the thread can check it via Thread.interrupted() or isInterrupted(). It does NOT forcibly stop the thread."
  },
  {
    id: 776, topic: "BigInteger",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigInteger</span> a = <span class="cls">BigInteger</span>.TWO.pow(<span class="num">62</span>);
<span class="cls">BigInteger</span> b = <span class="cls">BigInteger</span>.TWO.pow(<span class="num">62</span>);
<span class="cls">System</span>.out.println(a.equals(b));
<span class="cls">System</span>.out.println(a == b);`,
    options: ["true\nfalse", "true\ntrue", "false\nfalse", "Compilation error"],
    answer: 0,
    explanation: "BigInteger.equals() compares mathematical value. 2^62 == 2^62 → true. BigInteger objects are not cached (unlike Integer in [-128,127]), so two separate computations yield different instances. a == b → false. Result: 'true\\nfalse'."
  },
  {
    id: 777, topic: "BigInteger",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigInteger</span> n = <span class="cls">BigInteger</span>.valueOf(<span class="num">100</span>);
<span class="cls">System</span>.out.println(n.isProbablePrime(<span class="num">100</span>));
<span class="cls">System</span>.out.println(<span class="cls">BigInteger</span>.valueOf(<span class="num">97</span>).isProbablePrime(<span class="num">100</span>));`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "Compilation error"],
    answer: 0,
    explanation: "isProbablePrime(certainty) uses Miller-Rabin probabilistic test. 100 = 4 × 25 (not prime) → false. 97 is a prime number → true (with certainty 100, the probability of error is < 2^-100). Result: 'false\\ntrue'."
  },
  {
    id: 778, topic: "Math API",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Math</span>.min(<span class="cls">Integer</span>.MIN_VALUE, -<span class="num">1</span>));
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.max(<span class="cls">Integer</span>.MAX_VALUE, <span class="num">1</span>));`,
    options: ["-2147483648\n2147483647", "-1\n1", "0\n0", "Compilation error"],
    answer: 0,
    explanation: "Math.min(Integer.MIN_VALUE, -1): MIN_VALUE = -2147483648 < -1, so returns MIN_VALUE. Math.max(Integer.MAX_VALUE, 1): MAX_VALUE = 2147483647 > 1, so returns MAX_VALUE. Result: '-2147483648\\n2147483647'."
  },
  {
    id: 779, topic: "Math API",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Math</span>.signum(-<span class="num">7.5</span>));
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.signum(<span class="num">0.0</span>));
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.signum(<span class="num">3.14</span>));`,
    options: ["-1.0\n0.0\n1.0", "-7.5\n0.0\n3.14", "-1\n0\n1", "Compilation error"],
    answer: 0,
    explanation: "Math.signum(double): returns -1.0 if negative, 0.0 if zero, 1.0 if positive. signum(-7.5)=-1.0. signum(0.0)=0.0. signum(3.14)=1.0. Always returns double. Result: '-1.0\\n0.0\\n1.0'."
  },
  {
    id: 780, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; m = <span class="cls">Map</span>.of(<span class="str">"a"</span>,<span class="num">1</span>,<span class="str">"b"</span>,<span class="num">2</span>,<span class="str">"c"</span>,<span class="num">3</span>);
<span class="kw">int</span> sum = m.values().stream().mapToInt(<span class="cls">Integer</span>::intValue).sum();
<span class="cls">System</span>.out.println(sum);`,
    options: ["6", "abc", "3", "Compilation error"],
    answer: 0,
    explanation: "m.values() returns Collection<Integer> [1,2,3]. stream().mapToInt() converts to IntStream. sum() = 1+2+3=6."
  },
  {
    id: 781, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"java"</span>, <span class="str">"python"</span>, <span class="str">"go"</span>, <span class="str">"rust"</span>, <span class="str">"kotlin"</span>)
    .collect(<span class="cls">Collectors</span>.groupingBy(
        s -> s.length() > <span class="num">4</span> ? <span class="str">"long"</span> : <span class="str">"short"</span>,
        <span class="cls">Collectors</span>.counting()
    ));
<span class="cls">System</span>.out.println(result.get(<span class="str">"long"</span>) + <span class="str">" "</span> + result.get(<span class="str">"short"</span>));`,
    options: ["2 3", "3 2", "5 0", "Compilation error"],
    answer: 0,
    explanation: "Length > 4 means at least 5 chars. python(6)→long, kotlin(6)→long. java(4)→short, go(2)→short, rust(4)→short. Long count=2, short count=3. get('long')=2, get('short')=3. Result: '2 3'."
  },
  {
    id: 782, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>)
    .reduce(<span class="num">1</span>, (<span class="kw">int</span> acc, <span class="cls">Integer</span> n) -> acc * n);
<span class="cls">System</span>.out.println(r);`,
    options: ["120", "5", "15", "Compilation error"],
    answer: 0,
    explanation: "reduce(identity, accumulator): starts with 1, multiplies each element. 1*1=1, 1*2=2, 2*3=6, 6*4=24, 24*5=120. Identity=1 for multiplication. Result: 120."
  },
  {
    id: 783, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"""
        name: %s
        age:  %d
        """</span>.formatted(<span class="str">"Java"</span>, <span class="num">17</span>);
<span class="cls">System</span>.out.print(s.strip());`,
    options: ["name: Java\nage:  17", "name: %s\nage:  %d", "name: Java age: 17", "Compilation error"],
    answer: 0,
    explanation: "formatted() on a text block applies String.format(). '%s' → 'Java', '%d' → '17'. The text block has leading whitespace stripped (closing '\"\"\"' determines base indent). strip() removes remaining whitespace. Result: 'name: Java\\nage:  17' (with two spaces before 17 preserved)."
  },
  {
    id: 784, topic: "Annotations",
    text: "What is the output of the following code?",
    code: `<span class="ann">@Repeatable</span>(<span class="cls">Tags</span>.<span class="kw">class</span>)
<span class="ann">@interface</span> <span class="cls">Tag</span> { <span class="cls">String</span> value(); }
<span class="ann">@interface</span> <span class="cls">Tags</span> { <span class="cls">Tag</span>[] value(); }

<span class="ann">@Tag</span>(<span class="str">"java"</span>) <span class="ann">@Tag</span>(<span class="str">"ocp"</span>)
<span class="kw">class</span> <span class="cls">Demo</span> {}
<span class="cls">Tags</span> tags = <span class="cls">Demo</span>.<span class="kw">class</span>.getAnnotation(<span class="cls">Tags</span>.<span class="kw">class</span>);
<span class="cls">System</span>.out.println(tags.value().length);`,
    options: ["2", "1", "0", "Compilation error"],
    answer: 0,
    explanation: "@Repeatable(Tags.class) allows @Tag to appear multiple times. Multiple @Tag annotations are stored in a @Tags container. Demo.class.getAnnotation(Tags.class) returns the container. tags.value() is the array of @Tag annotations. length = 2. (Requires RUNTIME retention for this to work.)"
  },
  {
    id: 785, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Config</span> {
    <span class="kw">private static</span> <span class="cls">Config</span> instance;
    <span class="kw">private int</span> value = <span class="num">0</span>;
    <span class="kw">private</span> <span class="cls">Config</span>() {}
    <span class="kw">static</span> <span class="cls">Config</span> getInstance() {
        <span class="kw">if</span> (instance == <span class="kw">null</span>) instance = <span class="kw">new</span> <span class="cls">Config</span>();
        <span class="kw">return</span> instance;
    }
    <span class="kw">void</span> set(<span class="kw">int</span> v) { value = v; }
    <span class="kw">int</span>  get()      { <span class="kw">return</span> value; }
}
<span class="cls">Config</span>.getInstance().set(<span class="num">42</span>);
<span class="cls">System</span>.out.println(<span class="cls">Config</span>.getInstance().get());`,
    options: ["42", "0", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "Singleton (lazy initialization, not thread-safe). First getInstance() creates the instance. set(42) sets value=42. Second getInstance() returns THE SAME instance. get() returns 42. Result: 42."
  },
  {
    id: 786, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>)
    .map(s -> { <span class="cls">System</span>.out.print(s); <span class="kw">return</span> s; })
    .filter(s -> !s.equals(<span class="str">"b"</span>))
    .map(s -> s.toUpperCase())
    .toList();
<span class="cls">System</span>.out.println(<span class="str">" -> "</span> + r);`,
    options: ["abc -> [A, C]", "ac -> [A, C]", "ABC -> [A, C]", "Compilation error"],
    answer: 0,
    explanation: "Streams are lazy and process one element at a time. 'a': print 'a', filter passes, toUpperCase → A. 'b': print 'b', filter blocks (removed). 'c': print 'c', filter passes, toUpperCase → C. Printed: 'abc'. Then ' -> [A, C]'. Result: 'abc -> [A, C]'."
  },
  {
    id: 787, topic: "JVM & Memory",
    text: "What is the purpose of the Metaspace in Java 8+?",
    code: null,
    options: [
      "It stores objects created by the application",
      "It stores class metadata (class definitions, method bytecode, constant pool)",
      "It stores thread stacks",
      "It is equivalent to the old PermGen space but stored on the heap"
    ],
    answer: 1,
    explanation: "Metaspace (Java 8+) replaced PermGen. It stores class metadata: class and method definitions, bytecode, constant pool, field/method descriptors. Unlike PermGen, Metaspace uses native memory (not Java heap), grows automatically, and is only limited by OS memory."
  },
  {
    id: 788, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="kw">void</span> printType(T obj) {
    <span class="cls">System</span>.out.println(obj.getClass().getSimpleName());
}
printType(<span class="str">"hello"</span>);
printType(<span class="num">42</span>);
printType(<span class="num">3.14</span>);`,
    options: ["String\nInteger\nDouble", "T\nT\nT", "Object\nObject\nObject", "Compilation error"],
    answer: 0,
    explanation: "Type erasure removes the generic type at runtime, but getClass() returns the actual runtime class of the object. 'hello' is String, 42 is autoboxed to Integer, 3.14 to Double. getSimpleName(): String, Integer, Double."
  },
  {
    id: 789, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Hello World"</span>;
<span class="cls">System</span>.out.println(s.regionMatches(<span class="kw">true</span>, <span class="num">6</span>, <span class="str">"WORLD"</span>, <span class="num">0</span>, <span class="num">5</span>));`,
    options: ["true", "false", "Compilation error", "Throws StringIndexOutOfBoundsException"],
    answer: 0,
    explanation: "regionMatches(ignoreCase, toffset, other, ooffset, len): compares region of this string with region of other. toffset=6 (starts at 'W' in 'World'), other='WORLD', ooffset=0, len=5. With ignoreCase=true: 'World' == 'WORLD' → true."
  },
  {
    id: 790, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Deque</span>&lt;<span class="cls">Integer</span>&gt; dq = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
dq.addFirst(<span class="num">1</span>); dq.addLast(<span class="num">2</span>); dq.addFirst(<span class="num">3</span>); dq.addLast(<span class="num">4</span>);
<span class="cls">System</span>.out.println(dq.removeFirst() + <span class="str">" "</span> + dq.removeLast());
<span class="cls">System</span>.out.println(dq);`,
    options: ["3 4\n[1, 2]", "1 4\n[3, 2]", "3 4\n[3, 4]", "1 2\n[3, 4]"],
    answer: 0,
    explanation: "addFirst(1): [1]. addLast(2): [1,2]. addFirst(3): [3,1,2]. addLast(4): [3,1,2,4]. removeFirst()=3, removeLast()=4. Deque now: [1,2]. Prints '3 4\\n[1, 2]'."
  },
  {
    id: 791, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Stack</span>&lt;T&gt; {
    <span class="kw">private</span> <span class="cls">Deque</span>&lt;T&gt; deque = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();
    <span class="kw">void</span>    push(T t)  { deque.push(t); }
    T       pop()      { <span class="kw">return</span> deque.pop(); }
    <span class="kw">boolean</span> isEmpty()  { <span class="kw">return</span> deque.isEmpty(); }
}
<span class="cls">Stack</span>&lt;<span class="cls">Integer</span>&gt; s = <span class="kw">new</span> <span class="cls">Stack</span>&lt;&gt;();
s.push(<span class="num">1</span>); s.push(<span class="num">2</span>); s.push(<span class="num">3</span>);
<span class="kw">while</span> (!s.isEmpty()) <span class="cls">System</span>.out.print(s.pop() + <span class="str">" "</span>);`,
    options: ["3 2 1 ", "1 2 3 ", "3 2 1", "Compilation error"],
    answer: 0,
    explanation: "Custom Stack backed by ArrayDeque. push() adds to front (LIFO). Pushing 1, 2, 3: deque = [3,2,1]. Popping in order: 3, 2, 1. Result: '3 2 1 '."
  },
  {
    id: 792, topic: "Exception Hierarchy",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="cls">System</span>.exit(<span class="num">0</span>);
    <span class="cls">System</span>.out.println(<span class="str">"after exit"</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.println(<span class="str">"finally"</span>);
}`,
    options: [
      "The JVM exits immediately — neither 'after exit' nor 'finally' is printed",
      "finally\nafter exit",
      "finally",
      "after exit"
    ],
    answer: 0,
    explanation: "System.exit(0) terminates the JVM immediately. Shutdown hooks run, but finally blocks in active threads are NOT guaranteed to run after System.exit() is called. The JVM simply halts. Neither 'after exit' nor 'finally' is printed."
  },
  {
    id: 793, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ScheduledExecutorService</span> sched = <span class="cls">Executors</span>.newSingleThreadScheduledExecutor();
<span class="cls">Future</span>&lt;?&gt; f = sched.schedule(() -> <span class="cls">System</span>.out.print(<span class="str">"done"</span>), <span class="num">0</span>, <span class="cls">TimeUnit</span>.SECONDS);
f.get();
sched.shutdown();`,
    options: ["done", "Nothing", "Throws ExecutionException", "Compilation error"],
    answer: 0,
    explanation: "schedule(Runnable, delay, unit) with delay=0 submits the task for immediate execution. f.get() blocks until completion. The task prints 'done'. Result: 'done'."
  },
  {
    id: 794, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {
    <span class="cls">Point</span> withX(<span class="kw">int</span> newX) { <span class="kw">return new</span> <span class="cls">Point</span>(newX, y); }
    <span class="cls">Point</span> withY(<span class="kw">int</span> newY) { <span class="kw">return new</span> <span class="cls">Point</span>(x, newY); }
}
<span class="cls">Point</span> p = <span class="kw">new</span> <span class="cls">Point</span>(<span class="num">1</span>, <span class="num">2</span>).withX(<span class="num">5</span>).withY(<span class="num">10</span>);
<span class="cls">System</span>.out.println(p);`,
    options: ["Point[x=5, y=10]", "Point[x=1, y=2]", "Point[x=5, y=2]", "Compilation error"],
    answer: 0,
    explanation: "Point(1,2).withX(5) returns Point(5,2). .withY(10) returns Point(5,10). Record toString(): 'Point[x=5, y=10]'. Wither methods on records provide an immutable fluent API."
  },
  {
    id: 795, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Expr</span> <span class="kw">permits</span> <span class="cls">Const</span>, <span class="cls">Neg</span> {}
<span class="kw">record</span> <span class="cls">Const</span>(<span class="kw">int</span> n) <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">record</span> <span class="cls">Neg</span>(<span class="cls">Expr</span> e) <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">static int</span> eval(<span class="cls">Expr</span> e) {
    <span class="kw">return switch</span>(e) {
        <span class="kw">case</span> <span class="cls">Const</span> c -> c.n();
        <span class="kw">case</span> <span class="cls">Neg</span>   n -> -eval(n.e());
    };
}
<span class="cls">System</span>.out.println(eval(<span class="kw">new</span> <span class="cls">Neg</span>(<span class="kw">new</span> <span class="cls">Neg</span>(<span class="kw">new</span> <span class="cls">Const</span>(<span class="num">7</span>)))));`,
    options: ["7", "-7", "0", "Compilation error"],
    answer: 0,
    explanation: "eval(Neg(Neg(Const(7)))): outer Neg → -eval(Neg(Const(7))). Inner Neg → -eval(Const(7)) = -7. Outer: -(-7) = 7. Result: 7."
  },
  {
    id: 796, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"one"</span>, <span class="str">"two"</span>, <span class="str">"three"</span>)
    .collect(<span class="cls">Collectors</span>.mapping(
        <span class="cls">String</span>::toUpperCase,
        <span class="cls">Collectors</span>.joining(<span class="str">" "</span>)
    ));
<span class="cls">System</span>.out.println(r);`,
    options: ["ONE TWO THREE", "one two three", "ONE, TWO, THREE", "Compilation error"],
    answer: 0,
    explanation: "Collectors.mapping(mapper, downstream): applies toUpperCase to each element, then joining(' '). Result: 'ONE TWO THREE'."
  },
  {
    id: 797, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Num</span> {
    <span class="kw">abstract int</span> value();
    <span class="kw">boolean</span> isPositive() { <span class="kw">return</span> value() > <span class="num">0</span>; }
}
<span class="cls">Num</span> n = <span class="kw">new</span> <span class="cls">Num</span>() {
    <span class="kw">int</span> value() { <span class="kw">return</span> -<span class="num">5</span>; }
};
<span class="cls">System</span>.out.println(n.isPositive() + <span class="str">" "</span> + n.value());`,
    options: ["false -5", "true -5", "false 0", "Compilation error"],
    answer: 0,
    explanation: "Anonymous class extends Num, provides value()=-5. isPositive() calls value() via polymorphism: -5 > 0 = false. n.value() = -5. Result: 'false -5'."
  },
  {
    id: 798, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">Optional</span>&lt;T&gt; orElseOptional(<span class="cls">Optional</span>&lt;T&gt; a, <span class="cls">Optional</span>&lt;T&gt; b) {
    <span class="kw">return</span> a.isPresent() ? a : b;
}
<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; r = orElseOptional(
    <span class="cls">Optional</span>.empty(),
    <span class="cls">Optional</span>.of(<span class="str">"fallback"</span>)
);
<span class="cls">System</span>.out.println(r.orElse(<span class="str">"none"</span>));`,
    options: ["fallback", "none", "empty", "Compilation error"],
    answer: 0,
    explanation: "a is empty → returns b = Optional('fallback'). r = Optional('fallback'). orElse('none'): present → returns 'fallback'. Result: 'fallback'."
  },
  {
    id: 799, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; log = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
<span class="cls">Consumer</span>&lt;<span class="cls">String</span>&gt; logger  = s -> log.add(<span class="str">"LOG: "</span>  + s);
<span class="cls">Consumer</span>&lt;<span class="cls">String</span>&gt; printer = s -> log.add(<span class="str">"PRINT: "</span> + s);
<span class="cls">Consumer</span>&lt;<span class="cls">String</span>&gt; both   = logger.andThen(printer);
both.accept(<span class="str">"hello"</span>);
<span class="cls">System</span>.out.println(log);`,
    options: ["[LOG: hello, PRINT: hello]", "[PRINT: hello, LOG: hello]", "[LOG: hello]", "Compilation error"],
    answer: 0,
    explanation: "Consumer.andThen(after) runs the current consumer first, then 'after'. logger adds 'LOG: hello', then printer adds 'PRINT: hello'. log = [LOG: hello, PRINT: hello]."
  },
  {
    id: 800, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Transformer</span>&lt;T, R&gt; {
    R transform(T input);
    <span class="kw">default</span> &lt;V&gt; <span class="cls">Transformer</span>&lt;T, V&gt; andThen(<span class="cls">Transformer</span>&lt;R, V&gt; after) {
        <span class="kw">return</span> input -> after.transform(<span class="kw">this</span>.transform(input));
    }
}
<span class="cls">Transformer</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; length = <span class="cls">String</span>::length;
<span class="cls">Transformer</span>&lt;<span class="cls">Integer</span>, <span class="cls">Boolean</span>&gt; isEven = n -> n % <span class="num">2</span> == <span class="num">0</span>;
<span class="cls">System</span>.out.println(length.andThen(isEven).transform(<span class="str">"Java"</span>));`,
    options: ["true", "false", "4", "Compilation error"],
    answer: 0,
    explanation: "length.transform('Java') = 4 (String length). isEven.transform(4) = 4%2==0 = true. The composed Transformer: String→Integer→Boolean. 'Java' has 4 characters, 4 is even → true."
  }
];
