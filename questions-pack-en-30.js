// ═══════════════════════════════════════════════════════
//  PACK EN-30 — Questions 1451–1500  (English)
//  Focus: NIO.2 deep, JPMS advanced, Localization,
//         BigDecimal traps, Text Blocks advanced,
//         Pattern Matching guards, sealed hierarchies,
//         Serialization, Reflection basics,
//         var edge cases, instanceof chains,
//         String methods Java 11–17, switch expressions
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_30 = [
  // ── NIO.2 ────────────────────────────────────────────
  {
    id: 1451, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p = <span class="cls">Path</span>.of(<span class="str">"/home/user/docs/report.pdf"</span>);
<span class="cls">System</span>.out.println(p.getFileName());
<span class="cls">System</span>.out.println(p.getParent().getFileName());
<span class="cls">System</span>.out.println(p.getNameCount());`,
    options: ["report.pdf\ndocs\n4", "report.pdf\ndocs\n5", "report.pdf\nhome\n4", "Compilation error"],
    answer: 0,
    explanation: "Path '/home/user/docs/report.pdf'. getFileName()='report.pdf' (last component). getParent()='/home/user/docs' → getFileName()='docs'. getNameCount(): counts non-root elements: home(1), user(2), docs(3), report.pdf(4) → 4. Result: 'report.pdf\\ndocs\\n4'."
  },
  {
    id: 1452, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> a = <span class="cls">Path</span>.of(<span class="str">"/home/user"</span>);
<span class="cls">Path</span> b = <span class="cls">Path</span>.of(<span class="str">"/home/user/docs/../reports"</span>);
<span class="cls">Path</span> c = b.normalize();
<span class="cls">System</span>.out.println(a.relativize(c));
<span class="cls">System</span>.out.println(c.startsWith(a));`,
    options: ["reports\ntrue", "docs/../reports\ntrue", "../reports\nfalse", "reports\nfalse"],
    answer: 0,
    explanation: "b.normalize(): resolves '..' → '/home/user/reports'. a.relativize(c): from '/home/user' to '/home/user/reports' → 'reports'. c.startsWith(a): '/home/user/reports'.startsWith('/home/user') → true. Result: 'reports\\ntrue'."
  },
  {
    id: 1453, topic: "NIO.2",
    text: "Which NIO.2 method should you use to copy a file and overwrite the destination if it already exists?",
    code: null,
    options: [
      "Files.copy(src, dst) — copies without options",
      "Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING) — overwrites if target exists",
      "Files.move(src, dst) — moves the file to the destination",
      "Files.write(dst, Files.readAllBytes(src)) — reads then writes manually"
    ],
    answer: 1,
    explanation: "Files.copy(Path src, Path target, CopyOption... options): without options, throws FileAlreadyExistsException if target exists. StandardCopyOption.REPLACE_EXISTING allows overwriting. Files.move() relocates the file (deletes source). The manual approach works but is not idiomatic NIO.2."
  },
  {
    id: 1454, topic: "NIO.2",
    text: "What is the output of the following code?",
    code: `<span class="cls">Path</span> p1 = <span class="cls">Path</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>);
<span class="cls">Path</span> p2 = <span class="cls">Path</span>.of(<span class="str">"a/b/c"</span>);
<span class="cls">Path</span> p3 = p1.resolve(<span class="str">"d/e"</span>);
<span class="cls">System</span>.out.println(p1.equals(p2));
<span class="cls">System</span>.out.println(p3);`,
    options: ["true\na/b/c/d/e", "false\na/b/c/d/e", "true\na\\b\\c\\d\\e", "Compilation error"],
    answer: 0,
    explanation: "Path.of('a','b','c') and Path.of('a/b/c') produce the same path — equals() compares path components, not string form. Both are equal → true. p1.resolve('d/e'): appends → 'a/b/c/d/e'. On Linux/macOS separator is '/'. Result: 'true\\na/b/c/d/e'."
  },
  {
    id: 1455, topic: "NIO.2",
    text: "What does Files.walk() guarantee about the order of elements it returns?",
    code: null,
    options: [
      "Elements are returned in alphabetical order within each directory",
      "The root path is the first element; then sub-paths in an unspecified (depth-first) order",
      "Files are always listed before directories at each level",
      "Elements are returned in the order they were created on the file system"
    ],
    answer: 1,
    explanation: "Files.walk(Path start) performs a depth-first traversal. The starting path (root) is always the first element visited. Within each directory, the iteration order of entries is NOT guaranteed to be sorted — it depends on the file system. Files.walk() is lazy (returns a Stream<Path>) and must be closed after use."
  },
  // ── JPMS ─────────────────────────────────────────────
  {
    id: 1456, topic: "Modules (JPMS)",
    text: "Which statement correctly describes the difference between 'exports' and 'opens' in a module descriptor?",
    code: null,
    options: [
      "'exports' and 'opens' are synonymous — both allow compile-time and runtime access",
      "'exports' allows compile-time and runtime access to public types; 'opens' allows deep reflection (including private members) at runtime only",
      "'opens' allows compile-time access; 'exports' allows runtime access only",
      "'exports' is for interfaces only; 'opens' is for concrete classes"
    ],
    answer: 1,
    explanation: "'exports P': makes public types in package P accessible to other modules at both compile time and runtime, but does NOT allow deep reflection (private fields). 'opens P': allows deep reflection (via getDeclaredField, setAccessible) at runtime only — frameworks like Spring and Hibernate require 'opens'. You can combine: 'exports P' AND 'opens P' for both."
  },
  {
    id: 1457, topic: "Modules (JPMS)",
    text: "What is the purpose of 'requires transitive' in a module descriptor?",
    code: null,
    options: [
      "It makes the dependency optional at runtime",
      "It re-exports the dependency so that modules requiring this module also implicitly read the transitive dependency",
      "It forces the dependency to be loaded at startup regardless of usage",
      "It allows the module to access private members of the required module"
    ],
    answer: 1,
    explanation: "'requires transitive M': module A requires M transitively. Any module B that 'requires A' automatically also reads M without explicitly declaring it. This is useful for API modules that expose types from their dependencies in their public API — e.g., java.se aggregates all Java SE modules via 'requires transitive'."
  },
  {
    id: 1458, topic: "Modules (JPMS)",
    text: "What is the output of the following code when run as a named module?",
    code: `<span class="cm">// module-info.java:</span>
<span class="cm">// module com.example { exports com.example.api; }</span>

<span class="cm">// Inside com.example.internal (NOT exported):</span>
<span class="kw">package</span> com.example.internal;
<span class="kw">public class</span> <span class="cls">Secret</span> { <span class="kw">public static</span> <span class="cls">String</span> value = <span class="str">"hidden"</span>; }

<span class="cm">// From another module (requires com.example):</span>
<span class="kw">import</span> com.example.internal.Secret;
<span class="cls">System</span>.out.println(<span class="cls">Secret</span>.value);`,
    options: ["hidden", "null", "Compilation error — unexported package not accessible", "Runs fine because the class is public"],
    answer: 2,
    explanation: "Strong encapsulation: com.example.internal is not exported. Even though Secret is public, the compiler rejects the import from an unexported package. The error is at compile time: 'package com.example.internal is not visible'. This is a key JPMS enforcement — public without export is still hidden."
  },
  // ── LOCALIZATION ─────────────────────────────────────
  {
    id: 1459, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">NumberFormat</span> nf = <span class="cls">NumberFormat</span>.getCurrencyInstance(<span class="cls">Locale</span>.US);
<span class="cls">System</span>.out.println(nf.format(<span class="num">1234567.89</span>));
<span class="kw">try</span> {
    <span class="cls">Number</span> n = nf.parse(<span class="str">"$1,234.00"</span>);
    <span class="cls">System</span>.out.println(n.intValue());
} <span class="kw">catch</span> (<span class="cls">ParseException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"parse error"</span>);
}`,
    options: ["$1,234,567.89\n1234", "$1234567.89\n1234", "$1,234,567.89\nparse error", "Compilation error"],
    answer: 0,
    explanation: "NumberFormat.getCurrencyInstance(Locale.US): formats with $, commas and 2 decimals → '$1,234,567.89'. parse('$1,234.00'): parses back → 1234.00. intValue()=1234. Result: '$1,234,567.89\\n1234'."
  },
  {
    id: 1460, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">ResourceBundle</span> rb = <span class="cls">ResourceBundle</span>.getBundle(<span class="str">"Messages"</span>, <span class="cls">Locale</span>.FRANCE);
<span class="cm">// Messages_fr.properties: greeting=Bonjour</span>
<span class="cm">// Messages.properties:    greeting=Hello</span>
<span class="cls">System</span>.out.println(rb.getString(<span class="str">"greeting"</span>));`,
    options: [
      "Bonjour — ResourceBundle resolves to Messages_fr.properties for Locale.FRANCE",
      "Hello — default bundle is always used",
      "MissingResourceException — no exact fr_FR bundle found",
      "Compilation error"
    ],
    answer: 0,
    explanation: "ResourceBundle search order for Locale.FRANCE (fr_FR): 1) Messages_fr_FR.properties, 2) Messages_fr.properties (found!), 3) Messages.properties. Found Messages_fr.properties → getString('greeting')='Bonjour'. Parent fallback applies if key missing, but here 'greeting' exists."
  },
  {
    id: 1461, topic: "Localization",
    text: "What is the output of the following code?",
    code: `<span class="cls">DateTimeFormatter</span> f = <span class="cls">DateTimeFormatter</span>
    .ofLocalizedDate(<span class="cls">FormatStyle</span>.SHORT)
    .withLocale(<span class="cls">Locale</span>.US);
<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.of(<span class="num">2024</span>, <span class="num">12</span>, <span class="num">25</span>);
<span class="cls">System</span>.out.println(d.format(f));`,
    options: ["12/25/24", "25/12/24", "Dec 25, 2024", "2024-12-25"],
    answer: 0,
    explanation: "FormatStyle.SHORT with Locale.US formats dates as M/d/yy (US convention). December 25, 2024 → '12/25/24'. Different locales give different formats: UK SHORT would be '25/12/24'. Result: '12/25/24'."
  },
  // ── BIGDECIMAL ────────────────────────────────────────
  {
    id: 1462, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigDecimal</span> a = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="num">0.1</span>);   <span class="cm">// double constructor!</span>
<span class="cls">BigDecimal</span> b = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"0.1"</span>);  <span class="cm">// string constructor</span>
<span class="cls">System</span>.out.println(a.equals(b));
<span class="cls">System</span>.out.println(b.multiply(<span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"3"</span>)));`,
    options: ["false\n0.3", "true\n0.3", "false\n0.30000000000000004", "Compilation error"],
    answer: 0,
    explanation: "new BigDecimal(0.1) captures the EXACT double representation of 0.1, which is 0.1000000000000000055511151231257827021181583404541015625. new BigDecimal('0.1') is exactly 0.1. They are NOT equal. b.multiply('3')='0.3' (exact). Result: 'false\\n0.3'."
  },
  {
    id: 1463, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigDecimal</span> x = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"10"</span>);
<span class="cls">BigDecimal</span> y = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"3"</span>);
<span class="kw">try</span> {
    <span class="cls">System</span>.out.println(x.divide(y));
} <span class="kw">catch</span> (<span class="cls">ArithmeticException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"non-terminating"</span>);
}
<span class="cls">System</span>.out.println(x.divide(y, <span class="num">4</span>, <span class="cls">RoundingMode</span>.HALF_UP));`,
    options: ["non-terminating\n3.3333", "non-terminating\n3.3334", "3.333...\n3.3333", "Compilation error"],
    answer: 0,
    explanation: "10/3 is a non-terminating decimal. BigDecimal.divide() without scale throws ArithmeticException. divide(y, 4, HALF_UP): 3.3333... rounded to 4 places HALF_UP → 3.3333 (5th digit is 3, no rounding up). Result: 'non-terminating\\n3.3333'."
  },
  {
    id: 1464, topic: "BigDecimal",
    text: "What is the output of the following code?",
    code: `<span class="cls">BigDecimal</span> price = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"19.99"</span>);
<span class="cls">BigDecimal</span> tax   = <span class="kw">new</span> <span class="cls">BigDecimal</span>(<span class="str">"0.08"</span>);
<span class="cls">BigDecimal</span> total = price.add(price.multiply(tax))
    .setScale(<span class="num">2</span>, <span class="cls">RoundingMode</span>.HALF_UP);
<span class="cls">System</span>.out.println(total);`,
    options: ["21.59", "21.58", "21.60", "Compilation error"],
    answer: 0,
    explanation: "price*tax = 19.99 * 0.08 = 1.5992. price + 1.5992 = 21.5892. setScale(2, HALF_UP): 3rd decimal is 9 → rounds up → 21.59. Result: '21.59'."
  },
  // ── TEXT BLOCKS ───────────────────────────────────────
  {
    id: 1465, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"""
        Hello
        World
        """</span>;
<span class="cls">System</span>.out.println(s.length());
<span class="cls">System</span>.out.println(s.stripTrailing().length());`,
    options: ["12\n11", "14\n14", "12\n12", "11\n11"],
    answer: 0,
    explanation: "Text block removes common indent (8 spaces). Content: 'Hello\\nWorld\\n' (trailing newline before closing ''' is included). Length: H,e,l,l,o,\\n,W,o,r,l,d,\\n = 12. stripTrailing() removes trailing whitespace (the trailing \\n is a newline, not whitespace in stripTrailing context). Actually '\\n' IS whitespace → stripped → 'Hello\\nWorld' = 11. Result: '12\\n11'."
  },
  {
    id: 1466, topic: "Text Blocks",
    text: "Which statement about the indentation of text blocks is CORRECT?",
    code: null,
    options: [
      "Text block content is always left-aligned regardless of indentation in source code",
      "The closing delimiter position determines how much leading whitespace is stripped from all content lines",
      "All leading whitespace is always preserved exactly as written in source",
      "Text blocks cannot contain blank lines"
    ],
    answer: 1,
    explanation: "The closing triple-quote delimiter controls incidental whitespace removal. The compiler calculates the common leading whitespace across all non-empty content lines AND the position of the closing delimiter, then strips that amount from each line. Moving the closing delimiter further left reduces stripping (preserves more indent). This is called re-indentation."
  },
  {
    id: 1467, topic: "Text Blocks",
    text: "What does the line ending escape sequence '\\' (backslash at end of line) do inside a text block?",
    code: null,
    options: [
      "It escapes the next line's leading whitespace",
      "It suppresses the newline at end of that line, joining it with the next line",
      "It inserts a literal backslash character",
      "It marks the line as a comment that will be stripped"
    ],
    answer: 1,
    explanation: "Java 14+ text block line terminator escape: a trailing backslash at the end of a line inside a text block suppresses the newline — the next line is joined directly to the current one. This allows you to break long string literals across multiple source lines without actual newlines in the resulting string. '\\\\' inserts a literal backslash. '\\n' inserts a newline."
  },
  {
    id: 1468, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> html = <span class="str">"""
        &lt;html&gt;
            &lt;body&gt;%s&lt;/body&gt;
        &lt;/html&gt;
        """</span>.formatted(<span class="str">"Hello"</span>);
<span class="cls">System</span>.out.println(html.strip().startsWith(<span class="str">"&lt;html&gt;"</span>));
<span class="cls">System</span>.out.println(html.contains(<span class="str">"Hello"</span>));`,
    options: ["true\ntrue", "false\ntrue", "true\nfalse", "Compilation error"],
    answer: 0,
    explanation: "Text block with formatted(): %s replaced by 'Hello'. Content (stripped): '<html>\\n    <body>Hello</body>\\n</html>'. strip() removes leading/trailing whitespace. startsWith('<html>') → true. contains('Hello') → true. Result: 'true\\ntrue'."
  },
  // ── PATTERN MATCHING ──────────────────────────────────
  {
    id: 1469, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Shape</span> <span class="kw">permits</span> <span class="cls">Circle</span>, <span class="cls">Rect</span>, <span class="cls">Triangle</span> {}
<span class="kw">record</span> <span class="cls">Circle</span>(<span class="kw">double</span> r)              <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="kw">record</span> <span class="cls">Rect</span>(<span class="kw">double</span> w, <span class="kw">double</span> h)     <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="kw">record</span> <span class="cls">Triangle</span>(<span class="kw">double</span> b, <span class="kw">double</span> h) <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="kw">static double</span> area(<span class="cls">Shape</span> s) {
    <span class="kw">return switch</span>(s) {
        <span class="kw">case</span> <span class="cls">Circle</span>   c -> <span class="cls">Math</span>.PI * c.r() * c.r();
        <span class="kw">case</span> <span class="cls">Rect</span>     r -> r.w() * r.h();
        <span class="kw">case</span> <span class="cls">Triangle</span> t -> <span class="num">0.5</span> * t.b() * t.h();
    };
}
<span class="cls">System</span>.out.printf(<span class="str">"%.2f%n"</span>, area(<span class="kw">new</span> <span class="cls">Rect</span>(<span class="num">4</span>, <span class="num">5</span>)));
<span class="cls">System</span>.out.printf(<span class="str">"%.2f%n"</span>, area(<span class="kw">new</span> <span class="cls">Triangle</span>(<span class="num">6</span>, <span class="num">3</span>)));`,
    options: ["20.00\n9.00", "20.00\n18.00", "9.00\n20.00", "Compilation error — missing default"],
    answer: 0,
    explanation: "Sealed switch is exhaustive — no default needed since all permits are covered. Rect(4,5): 4*5=20.0. Triangle(6,3): 0.5*6*3=9.0. printf('%.2f'): 20.00, 9.00. Result: '20.00\\n9.00'."
  },
  {
    id: 1470, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="cls">String</span> describe(<span class="cls">Object</span> o) {
    <span class="kw">return switch</span>(o) {
        <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i < <span class="num">0</span>  -> <span class="str">"negative int"</span>;
        <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i == <span class="num">0</span> -> <span class="str">"zero"</span>;
        <span class="kw">case</span> <span class="cls">Integer</span> i              -> <span class="str">"positive int: "</span> + i;
        <span class="kw">case</span> <span class="cls">String</span>  s              -> <span class="str">"string: "</span> + s;
        <span class="kw">default</span>                      -> <span class="str">"other"</span>;
    };
}
<span class="cls">System</span>.out.println(describe(-<span class="num">5</span>));
<span class="cls">System</span>.out.println(describe(<span class="num">0</span>));
<span class="cls">System</span>.out.println(describe(<span class="num">7</span>));`,
    options: ["negative int\nzero\npositive int: 7", "other\nzero\npositive int: 7", "negative int\nzero\n7", "Compilation error"],
    answer: 0,
    explanation: "Pattern switch with 'when' guards: evaluated top-to-bottom. -5 matches Integer and i<0 → 'negative int'. 0 matches Integer and i==0 → 'zero'. 7 matches Integer (no guard) → 'positive int: 7'. Result: 'negative int\\nzero\\npositive int: 7'."
  },
  {
    id: 1471, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) {}
<span class="cls">Object</span> obj = <span class="kw">new</span> <span class="cls">Point</span>(<span class="num">3</span>, <span class="num">4</span>);
<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) && x > <span class="num">0</span> && y > <span class="num">0</span>) {
    <span class="cls">System</span>.out.println(<span class="str">"Q1: "</span> + x + <span class="str">","</span> + y);
}`,
    options: ["Q1: 3,4", "Q1: Point[x=3, y=4]", "Compilation error", "No output"],
    answer: 0,
    explanation: "Record deconstruction pattern (Java 21): 'instanceof Point(int x, int y)' deconstructs the record into its components. x=3, y=4. Guard: x>0 && y>0 → true. Prints 'Q1: 3,4'. Result: 'Q1: 3,4'."
  },
  // ── VAR EDGE CASES ────────────────────────────────────
  {
    id: 1472, topic: "var",
    text: "Which of the following uses of 'var' is INVALID in Java?",
    code: null,
    options: [
      "var list = new ArrayList<String>();",
      "var i = 0; for (var j = 0; j < 10; j++) {}",
      "var x = null;",
      "try (var stream = Files.lines(path)) { stream.forEach(System.out::println); }"
    ],
    answer: 2,
    explanation: "'var x = null' is invalid — the compiler cannot infer the type from null alone. 'var' requires a concrete initializer expression that has a determinable type. The other uses are all valid: ArrayList initializer (infers ArrayList<String>), for-loop counters, and try-with-resources (infers the AutoCloseable type)."
  },
  {
    id: 1473, topic: "var",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> map = <span class="cls">Map</span>.of(<span class="str">"a"</span>, <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>), <span class="str">"b"</span>, <span class="cls">List</span>.of(<span class="num">3</span>, <span class="num">4</span>));
<span class="kw">for</span> (<span class="kw">var</span> entry : map.entrySet()) {
    <span class="kw">var</span> key  = entry.getKey();
    <span class="kw">var</span> vals = entry.getValue();
    <span class="kw">if</span> (key.equals(<span class="str">"b"</span>)) {
        <span class="cls">System</span>.out.println(vals.stream().mapToInt(Integer::intValue).sum());
    }
}`,
    options: ["7", "3", "12", "Compilation error"],
    answer: 0,
    explanation: "var infers Map<String,List<Integer>> from Map.of(). entry is Map.Entry<String,List<Integer>>. key and vals are String and List<Integer> respectively. When key='b', vals=[3,4], sum=7. Result: '7'."
  },
  // ── SERIALIZATION ─────────────────────────────────────
  {
    id: 1474, topic: "Serialization",
    text: "Which statement about Java Serialization is CORRECT?",
    code: null,
    options: [
      "All fields are serialized by default, including static and transient fields",
      "Static fields and fields marked 'transient' are NOT serialized; only instance fields are",
      "The serialVersionUID field must always be manually declared or serialization fails",
      "A class can be serialized even if its superclass is not Serializable, but only if the superclass has a no-arg constructor"
    ],
    answer: 3,
    explanation: "Options: A) Wrong — static and transient are excluded. B) Close but transient excludes instance fields too. C) Wrong — JVM auto-generates serialVersionUID if not declared (but this is risky). D) CORRECT — if the superclass is not Serializable but has a public/protected no-arg constructor, the subclass CAN be serialized. The superclass state is re-initialized via the no-arg constructor on deserialization."
  },
  {
    id: 1475, topic: "Serialization",
    text: "What is the purpose of the 'transient' keyword?",
    code: null,
    options: [
      "It marks a field as thread-safe",
      "It prevents a field from being included in the serialized form of an object",
      "It makes a field's value persist across JVM restarts automatically",
      "It indicates a field is computed lazily and not stored in memory"
    ],
    answer: 1,
    explanation: "'transient' excludes a field from serialization. On deserialization, transient fields are initialized to their default values (null, 0, false). Typical uses: passwords (security), derived/computed fields (redundancy), non-serializable objects like File handles or database connections."
  },
  // ── REFLECTION ────────────────────────────────────────
  {
    id: 1476, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Product</span>(<span class="cls">String</span> name, <span class="kw">double</span> price) {}
<span class="cls">Class</span>&lt;?&gt; c = <span class="cls">Product</span>.<span class="kw">class</span>;
<span class="cls">System</span>.out.println(c.isRecord());
<span class="cls">System</span>.out.println(c.getRecordComponents().length);
<span class="cls">System</span>.out.println(c.getRecordComponents()[<span class="num">0</span>].getName());`,
    options: ["true\n2\nname", "false\n0\nnull", "true\n2\nprice", "Compilation error"],
    answer: 0,
    explanation: "Records expose metadata via reflection. isRecord()=true. getRecordComponents() returns components in declaration order: [name, price]. length=2. [0].getName()='name'. Result: 'true\\n2\\nname'."
  },
  {
    id: 1477, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Greeter</span> {
    <span class="kw">private</span> <span class="cls">String</span> greet(<span class="cls">String</span> name) { <span class="kw">return</span> <span class="str">"Hi "</span> + name; }
}
<span class="cls">Method</span> m = <span class="cls">Greeter</span>.<span class="kw">class</span>.getDeclaredMethod(<span class="str">"greet"</span>, <span class="cls">String</span>.<span class="kw">class</span>);
m.setAccessible(<span class="kw">true</span>);
<span class="cls">String</span> r = (<span class="cls">String</span>) m.invoke(<span class="kw">new</span> <span class="cls">Greeter</span>(), <span class="str">"Java"</span>);
<span class="cls">System</span>.out.println(r);`,
    options: ["Hi Java", "null", "Throws IllegalAccessException", "Compilation error"],
    answer: 0,
    explanation: "getDeclaredMethod finds private methods. setAccessible(true) bypasses access control (requires appropriate module access). invoke(new Greeter(), 'Java') calls greet('Java') → 'Hi Java'. In a named module without 'opens', this would throw InaccessibleObjectException. In unnamed module it works. Result: 'Hi Java'."
  },
  // ── STRING METHODS JAVA 11–17 ────────────────────────
  {
    id: 1478, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"  Java  17  "</span>;
<span class="cls">System</span>.out.println(s.strip());
<span class="cls">System</span>.out.println(s.isBlank());
<span class="cls">System</span>.out.println(<span class="str">"   "</span>.isBlank());
<span class="cls">System</span>.out.println(s.stripIndent());`,
    options: [
      "Java  17\nfalse\ntrue\n  Java  17  ",
      "Java 17\nfalse\ntrue\nJava  17",
      "Java  17\ntrue\ntrue\n  Java  17  ",
      "Compilation error"
    ],
    answer: 0,
    explanation: "strip() removes leading/trailing Unicode whitespace: 'Java  17'. isBlank(): '  Java  17  ' is not blank → false. '   '.isBlank() → true. stripIndent(): removes common leading whitespace; on a single-line string with no leading indent beyond spaces already stripped per-line, returns '  Java  17  ' stripped of common indent. Result: 'Java  17\\nfalse\\ntrue\\n  Java  17  '."
  },
  {
    id: 1479, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="str">"ha"</span>.repeat(<span class="num">3</span>));
<span class="cls">System</span>.out.println(<span class="str">"line1\nline2\nline3"</span>.lines().count());
<span class="cls">System</span>.out.println(<span class="cls">String</span>.valueOf((<span class="cls">Object</span>)<span class="kw">null</span>));`,
    options: ["hahaha\n3\nnull", "hahaha\n2\nnull", "ha ha ha\n3\nnull", "hahaha\n3\nCompilation error"],
    answer: 0,
    explanation: "'ha'.repeat(3)='hahaha'. 'line1\\nline2\\nline3'.lines().count(): 3 lines. String.valueOf((Object)null): returns the string 'null' (not NullPointerException). Result: 'hahaha\\n3\\nnull'."
  },
  {
    id: 1480, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> words = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>,<span class="str">"banana"</span>,<span class="str">"cherry"</span>);
<span class="cls">String</span> r1 = words.collect(<span class="cls">Collectors</span>.joining(<span class="str">", "</span>, <span class="str">"["</span>, <span class="str">"]"</span>));
<span class="cls">String</span> r2 = <span class="str">"hello world java"</span>
    .transform(s -> <span class="cls">Stream</span>.of(s.split(<span class="str">" "</span>))
        .map(w -> w.substring(<span class="num">0</span>,<span class="num">1</span>).toUpperCase() + w.substring(<span class="num">1</span>))
        .collect(<span class="cls">Collectors</span>.joining(<span class="str">" "</span>)));
<span class="cls">System</span>.out.println(r1);
<span class="cls">System</span>.out.println(r2);`,
    options: ["[apple, banana, cherry]\nHello World Java", "[apple, banana, cherry]\nhello world java", "[apple,banana,cherry]\nHello World Java", "Compilation error"],
    answer: 0,
    explanation: "joining(', ','[',']'): '[apple, banana, cherry]'. transform() (Java 12+): applies function to the string. Splits, capitalizes first letter, joins: 'Hello World Java'. Result: '[apple, banana, cherry]\\nHello World Java'."
  },
  // ── SWITCH EXPRESSIONS ────────────────────────────────
  {
    id: 1481, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="num">42</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(obj) {
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i % <span class="num">2</span> == <span class="num">0</span> && i > <span class="num">10</span> -> <span class="str">"big even"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i % <span class="num">2</span> == <span class="num">0</span>         -> <span class="str">"small even"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i                         -> <span class="str">"odd int"</span>;
    <span class="kw">case</span> <span class="cls">String</span> s                          -> <span class="str">"string"</span>;
    <span class="kw">default</span>                                 -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["big even", "small even", "odd int", "Compilation error"],
    answer: 0,
    explanation: "obj=42 (Integer). Case 1: Integer and 42%2==0 && 42>10 → both true → 'big even'. Result: 'big even'."
  },
  {
    id: 1482, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span> x = <span class="num">2</span>;
<span class="kw">int</span> result = <span class="kw">switch</span>(x) {
    <span class="kw">case</span> <span class="num">1</span> -> <span class="num">10</span>;
    <span class="kw">case</span> <span class="num">2</span> -> {
        <span class="kw">int</span> a = x * <span class="num">5</span>;
        <span class="kw">int</span> b = a + <span class="num">3</span>;
        <span class="kw">yield</span> b;
    }
    <span class="kw">case</span> <span class="num">3</span> -> <span class="num">30</span>;
    <span class="kw">default</span> -> <span class="num">-1</span>;
};
<span class="cls">System</span>.out.println(result);`,
    options: ["13", "10", "7", "Compilation error"],
    answer: 0,
    explanation: "x=2: case 2 block. a=2*5=10. b=10+3=13. yield 13. result=13. Result: '13'."
  },
  {
    id: 1483, topic: "Switch",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Day</span> { MON, TUE, WED, THU, FRI, SAT, SUN }
<span class="kw">static</span> <span class="kw">boolean</span> isWeekend(<span class="cls">Day</span> d) {
    <span class="kw">return switch</span>(d) {
        <span class="kw">case</span> SAT, SUN -> <span class="kw">true</span>;
        <span class="kw">default</span>       -> <span class="kw">false</span>;
    };
}
<span class="cls">System</span>.out.println(isWeekend(<span class="cls">Day</span>.FRI));
<span class="cls">System</span>.out.println(isWeekend(<span class="cls">Day</span>.SAT));`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "Compilation error"],
    answer: 0,
    explanation: "FRI matches default → false. SAT matches 'case SAT, SUN' → true. Result: 'false\\ntrue'."
  },
  // ── SEALED CLASSES ────────────────────────────────────
  {
    id: 1484, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Expr</span> <span class="kw">permits</span> <span class="cls">Num</span>, <span class="cls">Add</span>, <span class="cls">Mul</span> {}
<span class="kw">record</span> <span class="cls">Num</span>(<span class="kw">int</span> v)        <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">record</span> <span class="cls">Add</span>(<span class="cls">Expr</span> l, <span class="cls">Expr</span> r) <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">record</span> <span class="cls">Mul</span>(<span class="cls">Expr</span> l, <span class="cls">Expr</span> r) <span class="kw">implements</span> <span class="cls">Expr</span> {}
<span class="kw">static int</span> eval(<span class="cls">Expr</span> e) {
    <span class="kw">return switch</span>(e) {
        <span class="kw">case</span> <span class="cls">Num</span> n -> n.v();
        <span class="kw">case</span> <span class="cls">Add</span> a -> eval(a.l()) + eval(a.r());
        <span class="kw">case</span> <span class="cls">Mul</span> m -> eval(m.l()) * eval(m.r());
    };
}
<span class="cm">// (2 + 3) * 4</span>
<span class="cls">Expr</span> e = <span class="kw">new</span> <span class="cls">Mul</span>(<span class="kw">new</span> <span class="cls">Add</span>(<span class="kw">new</span> <span class="cls">Num</span>(<span class="num">2</span>), <span class="kw">new</span> <span class="cls">Num</span>(<span class="num">3</span>)), <span class="kw">new</span> <span class="cls">Num</span>(<span class="num">4</span>));
<span class="cls">System</span>.out.println(eval(e));`,
    options: ["20", "14", "24", "Compilation error"],
    answer: 0,
    explanation: "eval(Mul(Add(Num(2),Num(3)), Num(4))): Mul → eval(Add(Num(2),Num(3))) * eval(Num(4)). Add → 2+3=5. Num(4)→4. 5*4=20. Result: '20'."
  },
  {
    id: 1485, topic: "OOP",
    text: "Which of the following is a valid direct subtype of a sealed class?",
    code: null,
    options: [
      "Any class in the same package, without needing to declare 'permits'",
      "Only classes listed in the 'permits' clause; they must be final, sealed, or non-sealed",
      "Only final classes — non-sealed and sealed subtypes are not allowed",
      "Any class as long as it implements or extends the sealed type and is in the same module"
    ],
    answer: 1,
    explanation: "A sealed class/interface limits subtypes via the 'permits' clause. Each permitted subtype must be: (1) final — no further extension, (2) sealed — further limited extension, or (3) non-sealed — open to extension (breaks the seal). The permitted subtype must be in the same package (or module) as the sealed type. The 'permits' clause can be omitted only if all permitted types are in the same file."
  },
  // ── INSTANCEOF CHAINS ─────────────────────────────────
  {
    id: 1486, topic: "Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="cls">String</span> classify(<span class="cls">Object</span> o) {
    <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">Integer</span> i && i > <span class="num">100</span>)
        <span class="kw">return</span> <span class="str">"big int: "</span> + i;
    <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">Integer</span> i)
        <span class="kw">return</span> <span class="str">"small int: "</span> + i;
    <span class="kw">if</span> (o <span class="kw">instanceof</span> <span class="cls">String</span> s && !s.isEmpty())
        <span class="kw">return</span> <span class="str">"nonempty: "</span> + s;
    <span class="kw">return</span> <span class="str">"other"</span>;
}
<span class="cls">System</span>.out.println(classify(<span class="num">200</span>));
<span class="cls">System</span>.out.println(classify(<span class="num">50</span>));
<span class="cls">System</span>.out.println(classify(<span class="str">""</span>));`,
    options: ["big int: 200\nsmall int: 50\nother", "big int: 200\nbig int: 50\nother", "big int: 200\nsmall int: 50\nnonempty: ", "Compilation error"],
    answer: 0,
    explanation: "200: instanceof Integer(T) && 200>100(T) → 'big int: 200'. 50: first check 50>100(F) → falls through. Second check: instanceof Integer(T) → 'small int: 50'. '': instanceof String(T) && !isEmpty()(F) → falls to 'other'. Result: 'big int: 200\\nsmall int: 50\\nother'."
  },
  // ── MISC EDGE CASES ───────────────────────────────────
  {
    id: 1487, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.valueOf(<span class="num">127</span>) == <span class="cls">Integer</span>.valueOf(<span class="num">127</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.valueOf(<span class="num">128</span>) == <span class="cls">Integer</span>.valueOf(<span class="num">128</span>));
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.valueOf(<span class="num">127</span>).equals(<span class="cls">Integer</span>.valueOf(<span class="num">127</span>)));`,
    options: ["true\nfalse\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "Compilation error"],
    answer: 0,
    explanation: "Integer caching: JVM caches Integer instances for values -128 to 127. valueOf(127)==valueOf(127): same cached instance → true. valueOf(128)==valueOf(128): two new instances → false. equals() compares values → always true. Result: 'true\\nfalse\\ntrue'."
  },
  {
    id: 1488, topic: "JVM & Memory",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> a = <span class="str">"Java"</span>;
<span class="cls">String</span> b = <span class="kw">new</span> <span class="cls">String</span>(<span class="str">"Java"</span>);
<span class="cls">String</span> c = b.intern();
<span class="cls">System</span>.out.println(a == b);
<span class="cls">System</span>.out.println(a == c);
<span class="cls">System</span>.out.println(b == c);`,
    options: ["false\ntrue\nfalse", "true\ntrue\ntrue", "false\nfalse\nfalse", "true\nfalse\ntrue"],
    answer: 0,
    explanation: "a='Java' from string pool. b=new String('Java'): new heap object, not pooled. a==b: different objects → false. c=b.intern(): returns pool reference → same as a. a==c: true. b==c: b is heap, c is pool → false. Result: 'false\\ntrue\\nfalse'."
  },
  {
    id: 1489, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">ExecutorService</span> ex = <span class="cls">Executors</span>.newFixedThreadPool(<span class="num">2</span>);
<span class="cls">Future</span>&lt;<span class="cls">Integer</span>&gt; f1 = ex.submit(() -> <span class="num">10</span> + <span class="num">20</span>);
<span class="cls">Future</span>&lt;<span class="cls">Integer</span>&gt; f2 = ex.submit(() -> <span class="num">30</span> + <span class="num">40</span>);
<span class="cls">System</span>.out.println(f1.get() + f2.get());
ex.shutdown();`,
    options: ["100", "70", "30", "Non-deterministic"],
    answer: 0,
    explanation: "Two tasks: 10+20=30 and 30+40=70. f1.get()=30, f2.get()=70. Sum=100. ExecutorService.submit(Callable) is deterministic for pure computations. shutdown() waits for running tasks. Result: '100'."
  },
  {
    id: 1490, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CyclicBarrier</span> barrier = <span class="kw">new</span> <span class="cls">CyclicBarrier</span>(<span class="num">3</span>,
    () -> <span class="cls">System</span>.out.print(<span class="str">"GO! "</span>));
<span class="cls">Runnable</span> task = () -> {
    <span class="kw">try</span> { barrier.await(); }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) {}
};
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">3</span>; i++) <span class="kw">new</span> <span class="cls">Thread</span>(task).start();
<span class="cls">Thread</span>.sleep(<span class="num">200</span>);
<span class="cls">System</span>.out.println(<span class="str">"done"</span>);`,
    options: ["GO! done", "done GO!", "GO! GO! GO! done", "Compilation error"],
    answer: 0,
    explanation: "CyclicBarrier(3, action): when 3 threads call await(), the barrier action runs once ('GO! '), then all proceed. One 'GO! ' printed. Main sleeps 200ms then prints 'done'. Result: 'GO! done'."
  },
  {
    id: 1491, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T&gt; <span class="cls">List</span>&lt;T&gt; interleave(<span class="cls">List</span>&lt;T&gt; a, <span class="cls">List</span>&lt;T&gt; b) {
    <span class="cls">List</span>&lt;T&gt; r = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
    <span class="kw">int</span> n = <span class="cls">Math</span>.min(a.size(), b.size());
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < n; i++) { r.add(a.get(i)); r.add(b.get(i)); }
    <span class="kw">return</span> r;
}
<span class="cls">System</span>.out.println(interleave(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>), <span class="cls">List</span>.of(<span class="num">10</span>,<span class="num">20</span>)));`,
    options: ["[1, 10, 2, 20]", "[1, 2, 10, 20]", "[1, 10, 2, 20, 3]", "Compilation error"],
    answer: 0,
    explanation: "min(3,2)=2 iterations. i=0: add a[0]=1, b[0]=10. i=1: add a[1]=2, b[1]=20. Result list: [1,10,2,20]. a[2]=3 is skipped (shorter list). Result: '[1, 10, 2, 20]'."
  },
  {
    id: 1492, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">LongStream</span>.range(<span class="num">1</span>, <span class="num">6</span>)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .map(n -> n * n)
    .reduce(<span class="num">0</span>, <span class="cls">Long</span>::sum);
<span class="cls">System</span>.out.println(r);`,
    options: ["20", "4", "9", "Compilation error"],
    answer: 0,
    explanation: "LongStream.range(1,6): [1,2,3,4,5]. filter(even): [2,4]. map(n²): [4,16]. reduce(0, sum): 0+4+16=20. Result: '20'."
  },
  {
    id: 1493, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">NavigableMap</span>&lt;<span class="cls">Integer</span>,<span class="cls">String</span>&gt; m = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();
m.put(<span class="num">1</span>,<span class="str">"a"</span>); m.put(<span class="num">3</span>,<span class="str">"c"</span>); m.put(<span class="num">5</span>,<span class="str">"e"</span>); m.put(<span class="num">7</span>,<span class="str">"g"</span>);
<span class="cls">System</span>.out.println(m.floorKey(<span class="num">4</span>));
<span class="cls">System</span>.out.println(m.ceilingKey(<span class="num">4</span>));
<span class="cls">System</span>.out.println(m.subMap(<span class="num">2</span>, <span class="kw">true</span>, <span class="num">6</span>, <span class="kw">true</span>));`,
    options: ["3\n5\n{3=c, 5=e}", "4\n4\n{3=c, 5=e}", "3\n5\n{1=a, 3=c, 5=e, 7=g}", "Compilation error"],
    answer: 0,
    explanation: "floorKey(4): largest key ≤ 4 = 3. ceilingKey(4): smallest key ≥ 4 = 5. subMap(2,true,6,true): keys in [2,6] inclusive: 3,5 → {3=c, 5=e}. Result: '3\\n5\\n{3=c, 5=e}'."
  },
  {
    id: 1494, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt; times2 = n -> n * <span class="num">2</span>;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt; plus3  = n -> n + <span class="num">3</span>;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt; f1 = times2.andThen(plus3);
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>,<span class="cls">Integer</span>&gt; f2 = times2.compose(plus3);
<span class="cls">System</span>.out.println(f1.apply(<span class="num">5</span>));
<span class="cls">System</span>.out.println(f2.apply(<span class="num">5</span>));`,
    options: ["13\n16", "16\n13", "13\n13", "Compilation error"],
    answer: 0,
    explanation: "f1=andThen: times2 first, then plus3. f1(5)=(5*2)+3=13. f2=compose: plus3 first, then times2. f2(5)=(5+3)*2=16. Result: '13\\n16'."
  },
  {
    id: 1495, topic: "Exceptions",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="kw">void</span> risky(<span class="kw">int</span> x) <span class="kw">throws</span> <span class="cls">IOException</span>, <span class="cls">SQLException</span> {
    <span class="kw">if</span> (x == <span class="num">1</span>) <span class="kw">throw new</span> <span class="cls">IOException</span>(<span class="str">"io"</span>);
    <span class="kw">if</span> (x == <span class="num">2</span>) <span class="kw">throw new</span> <span class="cls">SQLException</span>(<span class="str">"sql"</span>);
}
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">3</span>; i++) {
    <span class="kw">try</span> { risky(i); <span class="cls">System</span>.out.print(i + <span class="str">"ok "</span>); }
    <span class="kw">catch</span> (<span class="cls">IOException</span> | <span class="cls">SQLException</span> e) {
        <span class="cls">System</span>.out.print(e.getMessage() + <span class="str">" "</span>);
    }
}`,
    options: ["io sql 3ok ", "1ok sql 3ok ", "io 2ok 3ok ", "Compilation error"],
    answer: 0,
    explanation: "i=1: throws IOException('io') → caught → print 'io '. i=2: throws SQLException('sql') → caught → print 'sql '. i=3: no exception → print '3ok '. Multi-catch: IOException|SQLException uses a single catch block. Result: 'io sql 3ok '."
  },
  {
    id: 1496, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">String</span> name() { <span class="kw">return</span> <span class="str">"A"</span>; }
    <span class="kw">void</span> print()  { <span class="cls">System</span>.out.println(name()); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">String</span> name() { <span class="kw">return</span> <span class="str">"B"</span>; }
}
<span class="cls">A</span> obj = <span class="kw">new</span> <span class="cls">B</span>();
obj.print();`,
    options: ["B", "A", "AB", "Compilation error"],
    answer: 0,
    explanation: "obj.print(): A.print() is called. Inside print(), name() is called. Because name() is virtual (overridden), dynamic dispatch finds B.name() → 'B'. This is a classic polymorphism demonstration: the method called depends on runtime type, not reference type. Result: 'B'."
  },
  {
    id: 1497, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>));
list.removeIf(n -> n % <span class="num">2</span> == <span class="num">0</span>);
list.replaceAll(n -> n * n);
<span class="cls">System</span>.out.println(list);`,
    options: ["[1, 9, 25]", "[1, 4, 9, 16, 25]", "[1, 3, 5]", "Compilation error"],
    answer: 0,
    explanation: "removeIf(even): removes 2,4 → [1,3,5]. replaceAll(n²): replaces each element with its square → [1,9,25]. Result: '[1, 9, 25]'."
  },
  {
    id: 1498, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="str">"a"</span>,<span class="str">"b"</span>,<span class="str">"c"</span>)
    .collect(<span class="cls">Collectors</span>.collectingAndThen(
        <span class="cls">Collectors</span>.toUnmodifiableList(),
        <span class="cls">Collections</span>::unmodifiableList
    ));
<span class="kw">try</span> { r.add(<span class="str">"d"</span>); }
<span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"blocked "</span>);
}
<span class="cls">System</span>.out.println(r.size());`,
    options: ["blocked 3", "blocked 4", "3", "Compilation error"],
    answer: 0,
    explanation: "toUnmodifiableList() already unmodifiable, then wrapped again by unmodifiableList (double wrap, still unmodifiable). r.add('d') → UnsupportedOperationException → 'blocked '. r.size()=3. Result: 'blocked 3'."
  },
  {
    id: 1499, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; notNull  = <span class="cls">Objects</span>::nonNull;
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; notBlank = <span class="cls">Predicate</span>.not(<span class="cls">String</span>::isBlank);
<span class="cls">Predicate</span>&lt;<span class="cls">String</span>&gt; valid    = notNull.and(notBlank);
<span class="cls">List</span>.of(<span class="str">"hello"</span>, <span class="str">"  "</span>, <span class="str">""</span>, <span class="str">"world"</span>).stream()
    .filter(valid)
    .forEach(s -> <span class="cls">System</span>.out.print(s + <span class="str">" "</span>));`,
    options: ["hello world ", "hello   world ", "hello world", "Compilation error"],
    answer: 0,
    explanation: "notNull.and(notBlank): both conditions must pass. 'hello': not null(T), not blank(T) → passes. '  ': not null(T), isBlank(T) → notBlank=false → fails. '': fails. 'world': passes. Prints 'hello world '. Result: 'hello world '."
  },
  {
    id: 1500, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Pair</span>&lt;A, B&gt; {
    <span class="kw">final</span> A fst; <span class="kw">final</span> B snd;
    <span class="cls">Pair</span>(<span class="cls">A</span> a, <span class="cls">B</span> b) { fst=a; snd=b; }
    <span class="kw">public</span> <span class="cls">String</span> toString() { <span class="kw">return</span> <span class="str">"("</span>+fst+<span class="str">","</span>+snd+<span class="str">")"</span>; }
    <span class="kw">static</span> &lt;X,Y&gt; <span class="cls">Pair</span>&lt;Y,X&gt; swap(<span class="cls">Pair</span>&lt;X,Y&gt; p) {
        <span class="kw">return new</span> <span class="cls">Pair</span>&lt;&gt;(p.snd, p.fst);
    }
}
<span class="kw">var</span> p1 = <span class="kw">new</span> <span class="cls">Pair</span>&lt;&gt;(<span class="str">"hello"</span>, <span class="num">42</span>);
<span class="kw">var</span> p2 = <span class="cls">Pair</span>.swap(p1);
<span class="kw">var</span> p3 = <span class="cls">Pair</span>.swap(p2);
<span class="cls">System</span>.out.println(p1 + <span class="str">" "</span> + p2 + <span class="str">" "</span> + (p1.fst.equals(p3.fst)));`,
    options: ["(hello,42) (42,hello) true", "(hello,42) (hello,42) true", "(42,hello) (hello,42) false", "Compilation error"],
    answer: 0,
    explanation: "p1=(hello,42). swap(p1)=(42,hello)=p2. swap(p2)=(hello,42)=p3. p1.fst='hello', p3.fst='hello'. equals → true. Result: '(hello,42) (42,hello) true'."
  }
];
