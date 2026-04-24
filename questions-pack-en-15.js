// ═══════════════════════════════════════════════════════
//  PACK EN-15 — Questions 701–750  (English)
//  Topics: String formatting & manipulation edge cases,
//          Array operations, Varargs traps,
//          Autoboxing / unboxing deep traps,
//          Overflow & numeric edge cases,
//          Switch pattern matching with guards,
//          Instanceof with generics,
//          Iterator / ListIterator,
//          Collections bulk operations
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_15 = [
  {
    id: 701, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"racecar"</span>;
<span class="cls">String</span> rev = <span class="kw">new</span> <span class="cls">StringBuilder</span>(s).reverse().toString();
<span class="cls">System</span>.out.println(s.equals(rev) + <span class="str">" "</span> + (s == rev));`,
    options: ["true false", "true true", "false false", "false true"],
    answer: 0,
    explanation: "'racecar' reversed is 'racecar'. s.equals(rev) = true (same content). s == rev is false: rev is a new String object created by toString(), not the same reference as s. Result: 'true false'."
  },
  {
    id: 702, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">String</span>.format(<span class="str">"%05d"</span>, <span class="num">42</span>));
<span class="cls">System</span>.out.println(<span class="cls">String</span>.format(<span class="str">"%-10s|"</span>, <span class="str">"hi"</span>));
<span class="cls">System</span>.out.println(<span class="cls">String</span>.format(<span class="str">"%.3f"</span>, <span class="num">3.14159</span>));`,
    options: ["00042\nhi        |\n3.142", "42\nhi|\n3.14", "00042\nhi|\n3.141", "Compilation error"],
    answer: 0,
    explanation: "%05d: width 5, zero-padded → '00042'. %-10s: left-aligned, width 10 → 'hi        |' (8 trailing spaces). %.3f: 3 decimal places, rounds → '3.142'. Result: three lines as shown."
  },
  {
    id: 703, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> a = <span class="kw">new</span> <span class="cls">String</span>(<span class="str">"hello"</span>).intern();
<span class="cls">String</span> b = <span class="str">"hello"</span>;
<span class="cls">System</span>.out.println(a == b);`,
    options: ["true", "false", "Compilation error", "Throws StringPoolException"],
    answer: 0,
    explanation: "intern() returns the canonical representation from the string pool. 'hello' literal is already in the pool. a.intern() returns that same pool reference. b is also the pool reference. a == b is true."
  },
  {
    id: 704, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="str">"Java"</span>.chars()
    .filter(c -> c == <span class="str">'a'</span>)
    .count());`,
    options: ["1", "2", "0", "Compilation error — chars() returns int[]"],
    answer: 0,
    explanation: "String.chars() returns an IntStream of char values. Filter for 'a' (char value 97). 'Java' has one 'a' at index 1. count() = 1."
  },
  {
    id: 705, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[] a = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>};
<span class="kw">int</span>[] b = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>};
<span class="cls">System</span>.out.println(a == b);
<span class="cls">System</span>.out.println(<span class="cls">Arrays</span>.equals(a, b));`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "true\nfalse"],
    answer: 0,
    explanation: "Arrays are objects. a == b compares references — they are different array objects, so false. Arrays.equals(a, b) compares element by element: 1==1, 2==2, 3==3 → true. Result: 'false\\ntrue'."
  },
  {
    id: 706, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[][] matrix = <span class="kw">new</span> <span class="kw">int</span>[<span class="num">3</span>][<span class="num">4</span>];
<span class="cls">System</span>.out.println(matrix.length + <span class="str">" "</span> + matrix[<span class="num">0</span>].length);
matrix[<span class="num">1</span>] = <span class="kw">new</span> <span class="kw">int</span>[]{<span class="num">10</span>, <span class="num">20</span>};
<span class="cls">System</span>.out.println(matrix[<span class="num">1</span>].length);`,
    options: ["3 4\n2", "4 3\n2", "3 4\n4", "Throws ArrayIndexOutOfBoundsException"],
    answer: 0,
    explanation: "new int[3][4]: 3 rows, 4 cols each. matrix.length=3, matrix[0].length=4. Java arrays of arrays (jagged): you can replace a row with a different-length array. matrix[1] = new int[]{10,20} has length 2. Result: '3 4\\n2'."
  },
  {
    id: 707, topic: "Arrays",
    text: "What is the output of the following code?",
    code: `<span class="kw">int</span>[] arr = {<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>, <span class="num">2</span>};
<span class="cls">Arrays</span>.sort(arr, <span class="num">1</span>, <span class="num">4</span>);
<span class="cls">System</span>.out.println(<span class="cls">Arrays</span>.toString(arr));`,
    options: ["[5, 1, 3, 8, 9, 2]", "[1, 2, 3, 5, 8, 9]", "[5, 3, 8, 1, 9, 2]", "[5, 1, 8, 3, 9, 2]"],
    answer: 0,
    explanation: "Arrays.sort(arr, fromIndex, toIndex) sorts only the subarray [1,4) — indices 1, 2, 3 — which are values 3, 8, 1. Sorted: 1, 3, 8. The rest (5, 9, 2) remains unchanged. Result: [5, 1, 3, 8, 9, 2]."
  },
  {
    id: 708, topic: "Varargs",
    text: "What is the output of the following code?",
    code: `<span class="kw">static int</span> sum(<span class="kw">int</span> first, <span class="kw">int</span>... rest) {
    <span class="kw">int</span> total = first;
    <span class="kw">for</span> (<span class="kw">int</span> n : rest) total += n;
    <span class="kw">return</span> total;
}
<span class="cls">System</span>.out.println(sum(<span class="num">1</span>));
<span class="cls">System</span>.out.println(sum(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>));`,
    options: ["1\n6", "0\n6", "1\n5", "Compilation error"],
    answer: 0,
    explanation: "sum(1): first=1, rest=[] (empty varargs). total=1. sum(1,2,3): first=1, rest=[2,3]. total=1+2+3=6. Result: '1\\n6'."
  },
  {
    id: 709, topic: "Varargs",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> <span class="cls">String</span> join(<span class="cls">String</span> sep, <span class="cls">String</span>... parts) {
    <span class="kw">return</span> <span class="cls">String</span>.join(sep, parts);
}
<span class="cls">System</span>.out.println(join(<span class="str">"-"</span>, <span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>));
<span class="cls">System</span>.out.println(join(<span class="str">","</span>, <span class="kw">new</span> <span class="cls">String</span>[]{<span class="str">"x"</span>, <span class="str">"y"</span>}));`,
    options: ["a-b-c\nx,y", "a-b-c\n[x, y]", "Compilation error", "a-b-c\nnull"],
    answer: 0,
    explanation: "Varargs accepts both individual arguments and an array. join('-','a','b','c') passes parts=['a','b','c']. join(',', new String[]{'x','y'}) passes the array directly. String.join handles both. Result: 'a-b-c\\nx,y'."
  },
  {
    id: 710, topic: "Autoboxing",
    text: "What is the output of the following code?",
    code: `<span class="cls">Integer</span> x = <span class="num">100</span>;
<span class="cls">Integer</span> y = <span class="num">100</span>;
<span class="cls">Integer</span> a = <span class="num">200</span>;
<span class="cls">Integer</span> b = <span class="num">200</span>;
<span class="cls">System</span>.out.println(x == y);
<span class="cls">System</span>.out.println(a == b);
<span class="cls">System</span>.out.println(a.equals(b));`,
    options: ["true\nfalse\ntrue", "true\ntrue\ntrue", "false\nfalse\ntrue", "true\nfalse\nfalse"],
    answer: 0,
    explanation: "Integer caches [-128, 127]. 100 is in range: x and y point to the same cached instance → true. 200 is outside range: new Integer objects created each time → a == b is false. equals() compares value: 200==200 → true. Result: 'true\\nfalse\\ntrue'."
  },
  {
    id: 711, topic: "Autoboxing",
    text: "What is the output of the following code?",
    code: `<span class="cls">Long</span>    l = <span class="num">42L</span>;
<span class="cls">Integer</span> i = <span class="num">42</span>;
<span class="cls">System</span>.out.println(l.equals(i));
<span class="cls">System</span>.out.println(l == (long) i);`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "true\nfalse"],
    answer: 0,
    explanation: "Long.equals(Object): checks type first — i is Integer, not Long → false. l == (long) i: l is auto-unboxed to long (42L), i is cast to long (42L). Primitive comparison: 42L == 42L → true. Result: 'false\\ntrue'."
  },
  {
    id: 712, topic: "Autoboxing",
    text: "What is the output of the following code?",
    code: `<span class="cls">Integer</span> a = <span class="kw">null</span>;
<span class="kw">int</span>     b = <span class="num">5</span>;
<span class="kw">try</span> {
    <span class="cls">System</span>.out.println(a + b);
} <span class="kw">catch</span> (<span class="cls">NullPointerException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"NPE"</span>);
}`,
    options: ["NPE", "5", "null5", "Compilation error"],
    answer: 0,
    explanation: "a + b triggers unboxing of a (calls a.intValue()). a is null → NullPointerException. The catch block prints 'NPE'. Arithmetic operators on Integer force unboxing — be careful with nulls."
  },
  {
    id: 713, topic: "Numeric Edge Cases",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.MIN_VALUE);
<span class="cls">System</span>.out.println(<span class="cls">Integer</span>.MIN_VALUE - <span class="num">1</span>);
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.absExact(<span class="num">5</span>));`,
    options: ["-2147483648\n2147483647\n5", "-2147483648\n-2147483649\n5", "Throws ArithmeticException on line 2", "Throws ArithmeticException on line 3"],
    answer: 0,
    explanation: "MIN_VALUE = -2147483648. MIN_VALUE - 1 wraps around (overflow): becomes MAX_VALUE = 2147483647 (no exception for plain arithmetic). Math.absExact(5) = 5 (no overflow here). Note: Math.absExact(MIN_VALUE) WOULD throw ArithmeticException."
  },
  {
    id: 714, topic: "Numeric Edge Cases",
    text: "What is the output of the following code?",
    code: `<span class="cls">System</span>.out.println(<span class="num">1</span> / <span class="num">0</span>);`,
    options: ["Throws ArithmeticException: / by zero", "Infinity", "NaN", "0"],
    answer: 0,
    explanation: "Integer division by zero always throws ArithmeticException: / by zero. Only floating-point division (1.0/0.0) returns Infinity and 0.0/0.0 returns NaN. Primitive int division by zero is always an exception."
  },
  {
    id: 715, topic: "Numeric Edge Cases",
    text: "What is the output of the following code?",
    code: `<span class="kw">double</span> d = <span class="num">0.1</span> + <span class="num">0.2</span>;
<span class="cls">System</span>.out.println(d == <span class="num">0.3</span>);
<span class="cls">System</span>.out.println(<span class="cls">Math</span>.abs(d - <span class="num">0.3</span>) < <span class="num">1e-10</span>);`,
    options: ["false\ntrue", "true\ntrue", "false\nfalse", "true\nfalse"],
    answer: 0,
    explanation: "IEEE 754: 0.1 + 0.2 ≠ exactly 0.3 due to binary representation error. d == 0.3 is false. Math.abs(d - 0.3) ≈ 5.5e-17 which is < 1e-10 → true. Use epsilon comparison for floating-point equality. Result: 'false\\ntrue'."
  },
  {
    id: 716, topic: "Switch Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="num">42</span>;
<span class="cls">String</span> result = <span class="kw">switch</span>(obj) {
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i > <span class="num">100</span> -> <span class="str">"big"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i <span class="kw">when</span> i > <span class="num">10</span>  -> <span class="str">"medium"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i               -> <span class="str">"small"</span>;
    <span class="kw">default</span>                       -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(result);`,
    options: ["medium", "big", "small", "other"],
    answer: 0,
    explanation: "obj = 42 (Integer). Guards are checked in order. 42 > 100: false. 42 > 10: true → 'medium'. Guards allow multiple cases for the same type with different conditions. First matching guard wins."
  },
  {
    id: 717, topic: "Switch Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Shape</span> <span class="kw">permits</span> <span class="cls">Circle</span>, <span class="cls">Rect</span> {}
<span class="kw">record</span> <span class="cls">Circle</span>(<span class="kw">double</span> r) <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="kw">record</span> <span class="cls">Rect</span>(<span class="kw">double</span> w, <span class="kw">double</span> h) <span class="kw">implements</span> <span class="cls">Shape</span> {}
<span class="cls">Shape</span> s = <span class="kw">new</span> <span class="cls">Rect</span>(<span class="num">3</span>, <span class="num">4</span>);
<span class="kw">double</span> area = <span class="kw">switch</span>(s) {
    <span class="kw">case</span> <span class="cls">Circle</span> c               -> <span class="cls">Math</span>.PI * c.r() * c.r();
    <span class="kw">case</span> <span class="cls">Rect</span> r <span class="kw">when</span> r.w() == r.h() -> r.w() * r.w(); <span class="cm">// square</span>
    <span class="kw">case</span> <span class="cls">Rect</span> r                 -> r.w() * r.h();
};
<span class="cls">System</span>.out.println(area);`,
    options: ["12.0", "7.0", "Compilation error", "Throws MatchException"],
    answer: 0,
    explanation: "s is Rect(3,4). Not a Circle. Rect when w==h: 3==4 is false. Last Rect case: w*h = 3*4 = 12.0. No default needed — sealed type with all permits covered."
  },
  {
    id: 718, topic: "Switch Pattern Matching",
    text: "What is the output of the following code?",
    code: `<span class="cls">Object</span> obj = <span class="kw">null</span>;
<span class="cls">String</span> r = <span class="kw">switch</span>(obj) {
    <span class="kw">case</span> <span class="kw">null</span>    -> <span class="str">"null value"</span>;
    <span class="kw">case</span> <span class="cls">Integer</span> i -> <span class="str">"int: "</span> + i;
    <span class="kw">default</span>      -> <span class="str">"other"</span>;
};
<span class="cls">System</span>.out.println(r);`,
    options: ["null value", "other", "Throws NullPointerException", "Compilation error"],
    answer: 0,
    explanation: "Pattern matching switch supports 'case null'. When obj is null, 'case null' matches → 'null value'. Without case null, a null value would throw NullPointerException. Java 21 (preview in earlier versions) allows explicit null handling in switch."
  },
  {
    id: 719, topic: "instanceof",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = <span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>);
<span class="cls">Object</span> obj = list;
<span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="cls">List</span>&lt;?&gt; l) {
    <span class="cls">System</span>.out.println(l.size());
}`,
    options: ["2", "Compilation error", "Throws ClassCastException", "0"],
    answer: 0,
    explanation: "Pattern matching with wildcard generic type: 'instanceof List<?> l' is valid (you can't do instanceof List<String> due to type erasure). l is bound to the list. l.size() = 2."
  },
  {
    id: 720, topic: "instanceof",
    text: "Which of the following instanceof patterns causes a compilation error?",
    code: null,
    options: [
      "if (obj instanceof String s) { }",
      "if (obj instanceof List<String> l) { }",
      "if (obj instanceof List<?> l) { }",
      "if (obj instanceof Integer i && i > 0) { }"
    ],
    answer: 1,
    explanation: "Due to type erasure, the JVM cannot check generic type parameters at runtime. 'instanceof List<String>' is illegal — the compiler rejects it. You must use a wildcard: 'instanceof List<?>' which checks only that obj is a List (regardless of element type)."
  },
  {
    id: 721, topic: "Iterator",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>));
<span class="cls">ListIterator</span>&lt;<span class="cls">Integer</span>&gt; it = list.listIterator(list.size());
<span class="kw">while</span> (it.hasPrevious()) {
    <span class="kw">int</span> val = it.previous();
    <span class="kw">if</span> (val % <span class="num">2</span> == <span class="num">0</span>) it.remove();
}
<span class="cls">System</span>.out.println(list);`,
    options: ["[1, 3, 5]", "[2, 4]", "[1, 2, 3, 4, 5]", "Throws ConcurrentModificationException"],
    answer: 0,
    explanation: "ListIterator at end, iterating backwards: 5(odd,keep), 4(even,remove), 3(odd,keep), 2(even,remove), 1(odd,keep). iterator.remove() is safe during iteration. Result: [1, 3, 5]."
  },
  {
    id: 722, topic: "Iterator",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>));
<span class="cls">ListIterator</span>&lt;<span class="cls">String</span>&gt; it = list.listIterator();
it.next();
it.add(<span class="str">"x"</span>);
<span class="cls">System</span>.out.println(list);`,
    options: ["[a, x, b, c]", "[x, a, b, c]", "[a, b, x, c]", "Throws IllegalStateException"],
    answer: 0,
    explanation: "ListIterator.add() inserts AFTER the element returned by the last next() call, and BEFORE the next element. next() returned 'a' (cursor is now between 'a' and 'b'). add('x') inserts between 'a' and 'b'. Result: [a, x, b, c]."
  },
  {
    id: 723, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; a = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>));
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; b = <span class="cls">List</span>.of(<span class="num">2</span>, <span class="num">4</span>, <span class="num">6</span>);
a.retainAll(b);
<span class="cls">System</span>.out.println(a);`,
    options: ["[2, 4]", "[1, 3]", "[1, 2, 3, 4, 6]", "[6]"],
    answer: 0,
    explanation: "retainAll(collection) keeps only elements that are also in the given collection. a retains elements that appear in b: 2 and 4. Removes 1 and 3. Result: [2, 4]."
  },
  {
    id: 724, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; a = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>));
<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; b = <span class="cls">List</span>.of(<span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>);
a.removeAll(b);
<span class="cls">System</span>.out.println(a);`,
    options: ["[1]", "[2, 3]", "[4]", "[1, 2, 3, 4]"],
    answer: 0,
    explanation: "removeAll(collection) removes all elements that appear in the given collection. Removes 2 and 3 from a. Keeps 1. Result: [1]."
  },
  {
    id: 725, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Set</span>&lt;<span class="cls">Integer</span>&gt; s1 = <span class="kw">new</span> <span class="cls">HashSet</span>&lt;&gt;(<span class="cls">Set</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>));
<span class="cls">Set</span>&lt;<span class="cls">Integer</span>&gt; s2 = <span class="cls">Set</span>.of(<span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>);
s1.addAll(s2);
<span class="cls">System</span>.out.println(s1.size());`,
    options: ["4", "6", "3", "5"],
    answer: 0,
    explanation: "addAll adds all elements of s2 to s1. s1 = {1,2,3}, s2 = {2,3,4}. After addAll: {1,2,3,4} (no duplicates in Set). size() = 4."
  },
  {
    id: 726, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>)
    .map(s -> s.substring(<span class="num">0</span>, <span class="num">1</span>).toUpperCase() + s.substring(<span class="num">1</span>))
    .sorted()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[Apple, Banana, Cherry]", "[apple, banana, cherry]", "[Cherry, Banana, Apple]", "Compilation error"],
    answer: 0,
    explanation: "map capitalizes each string: Apple, Banana, Cherry. sorted() uses natural String order (uppercase letters first, but all start with uppercase here so alphabetical): Apple < Banana < Cherry. Result: '[Apple, Banana, Cherry]'."
  },
  {
    id: 727, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>)
    .mapToInt(<span class="cls">Integer</span>::intValue)
    .average()
    .ifPresent(avg -> <span class="cls">System</span>.out.println(<span class="str">"avg="</span> + avg));`,
    options: ["avg=3.0", "avg=3", "Compilation error", "Nothing is printed"],
    answer: 0,
    explanation: "mapToInt creates IntStream. average() returns OptionalDouble(3.0). ifPresent runs if non-empty: prints 'avg=3.0'. (1+2+3+4+5)/5 = 3.0."
  },
  {
    id: 728, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Book</span>(<span class="cls">String</span> title, <span class="cls">String</span> author, <span class="kw">int</span> year) {}
<span class="kw">var</span> books = <span class="cls">List</span>.of(
    <span class="kw">new</span> <span class="cls">Book</span>(<span class="str">"Dune"</span>,     <span class="str">"Herbert"</span>, <span class="num">1965</span>),
    <span class="kw">new</span> <span class="cls">Book</span>(<span class="str">"1984"</span>,     <span class="str">"Orwell"</span>,  <span class="num">1949</span>),
    <span class="kw">new</span> <span class="cls">Book</span>(<span class="str">"Neuromancer"</span>, <span class="str">"Gibson"</span>, <span class="num">1984</span>)
);
books.stream()
    .filter(b -> b.year() > <span class="num">1960</span>)
    .sorted(<span class="cls">Comparator</span>.comparing(<span class="cls">Book</span>::title))
    .forEach(b -> <span class="cls">System</span>.out.print(b.title() + <span class="str">" "</span>));`,
    options: ["Dune Neuromancer ", "Neuromancer Dune ", "Dune 1984 Neuromancer ", "Dune "],
    answer: 0,
    explanation: "filter(year>1960): Dune(1965) and Neuromancer(1984) pass. sorted by title: Dune < Neuromancer alphabetically. forEach prints 'Dune Neuromancer '."
  },
  {
    id: 729, topic: "Optional",
    text: "What is the output of the following code?",
    code: `<span class="cls">Optional</span>&lt;<span class="cls">String</span>&gt; opt = <span class="cls">Optional</span>.of(<span class="str">"hello"</span>);
<span class="cls">Optional</span>&lt;<span class="cls">Integer</span>&gt; len = opt
    .filter(s -> s.length() > <span class="num">3</span>)
    .map(<span class="cls">String</span>::length);
<span class="cls">System</span>.out.println(len.orElse(<span class="num">-1</span>));`,
    options: ["5", "-1", "3", "Compilation error"],
    answer: 0,
    explanation: "opt has 'hello'. filter(length>3): 5>3 → passes. map(String::length): Optional(5). orElse(-1): returns 5 since present. Result: 5."
  },
  {
    id: 730, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CyclicBarrier</span> barrier = <span class="kw">new</span> <span class="cls">CyclicBarrier</span>(<span class="num">2</span>, () -> <span class="cls">System</span>.out.print(<span class="str">"barrier! "</span>));
<span class="kw">new</span> <span class="cls">Thread</span>(() -> {
    <span class="kw">try</span> { barrier.await(); <span class="cls">System</span>.out.print(<span class="str">"T1 "</span>); }
    <span class="kw">catch</span> (<span class="cls">Exception</span> e) {}
}).start();
barrier.await();
<span class="cls">System</span>.out.print(<span class="str">"main"</span>);`,
    options: ["barrier! T1 main or barrier! main T1", "T1 main", "barrier!", "Non-deterministic all three combos"],
    answer: 0,
    explanation: "CyclicBarrier(2, action): when 2 parties await(), the action runs first ('barrier! '). Then both threads proceed concurrently: T1 prints 'T1 ', main prints 'main'. The barrier action always runs before either thread proceeds, but T1 and main order is non-deterministic."
  },
  {
    id: 731, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; T clamp(T val, T min, T max) {
    <span class="kw">if</span> (val.compareTo(min) < <span class="num">0</span>) <span class="kw">return</span> min;
    <span class="kw">if</span> (val.compareTo(max) > <span class="num">0</span>) <span class="kw">return</span> max;
    <span class="kw">return</span> val;
}
<span class="cls">System</span>.out.println(clamp(<span class="num">15</span>, <span class="num">0</span>, <span class="num">10</span>));
<span class="cls">System</span>.out.println(clamp(<span class="str">"m"</span>, <span class="str">"a"</span>, <span class="str">"z"</span>));`,
    options: ["10\nm", "15\nm", "0\na", "10\nz"],
    answer: 0,
    explanation: "clamp(15, 0, 10): 15 > 10 → returns max = 10. clamp('m', 'a', 'z'): 'm' >= 'a' and 'm' <= 'z' → returns 'm'. Result: '10\\nm'."
  },
  {
    id: 732, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)
    .collect(<span class="cls">Collectors</span>.collectingAndThen(
        <span class="cls">Collectors</span>.toList(),
        <span class="cls">Collections</span>::unmodifiableList
    ));
<span class="kw">try</span> { r.add(<span class="num">4</span>); }
<span class="kw">catch</span> (<span class="cls">UnsupportedOperationException</span> e) {
    <span class="cls">System</span>.out.println(<span class="str">"immutable: "</span> + r.size());
}`,
    options: ["immutable: 3", "immutable: 4", "Compilation error", "No exception thrown"],
    answer: 0,
    explanation: "collectingAndThen(downstream, finisher): first collects to List using toList(), then applies Collections::unmodifiableList. r.add(4) throws UnsupportedOperationException. Catch prints 'immutable: 3'."
  },
  {
    id: 733, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDate</span> d = <span class="cls">LocalDate</span>.now();
<span class="cls">LocalDate</span> next = d.with(<span class="cls">TemporalAdjusters</span>.next(<span class="cls">DayOfWeek</span>.MONDAY));
<span class="cls">System</span>.out.println(next.getDayOfWeek());`,
    options: ["MONDAY", "SUNDAY", "Depends on current day", "Compilation error"],
    answer: 0,
    explanation: "TemporalAdjusters.next(DayOfWeek.MONDAY) finds the NEXT occurrence of Monday strictly after today (not today if today is Monday — use nextOrSame for that). getDayOfWeek() is always MONDAY."
  },
  {
    id: 734, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">Duration</span> d = <span class="cls">Duration</span>.parse(<span class="str">"PT2H30M"</span>);
<span class="cls">System</span>.out.println(d.toMinutes());
<span class="cls">System</span>.out.println(d.toMinutesPart());`,
    options: ["150\n30", "150\n150", "30\n30", "Compilation error"],
    answer: 0,
    explanation: "PT2H30M = 2 hours 30 minutes. toMinutes() returns TOTAL minutes: 2*60+30=150. toMinutesPart() (Java 9+) returns the minutes component only (the part that is not hours): 30. Result: '150\\n30'."
  },
  {
    id: 735, topic: "Modules (JPMS)",
    text: "What is the difference between 'requires' and 'requires static' in module-info.java?",
    code: null,
    options: [
      "They are identical",
      "'requires static' is an optional compile-time dependency — not required at runtime",
      "'requires static' is a stronger dependency than 'requires'",
      "'requires static' exports the module transitively"
    ],
    answer: 1,
    explanation: "'requires static' declares a dependency that is mandatory at compile time but optional at runtime. Useful for annotation processors, optional frameworks, or API-only dependencies that don't need to be present when the application runs."
  },
  {
    id: 736, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="kw">private void</span> hello() { <span class="cls">System</span>.out.print(<span class="str">"A"</span>); }
    <span class="kw">void</span> run() { hello(); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">void</span> hello() { <span class="cls">System</span>.out.print(<span class="str">"B"</span>); }
}
<span class="kw">new</span> <span class="cls">B</span>().run();`,
    options: ["A", "B", "AB", "Compilation error"],
    answer: 0,
    explanation: "A.hello() is private — private methods are NOT polymorphic. B.hello() is a NEW method, not an override. When A.run() calls hello(), it uses the private A.hello() (early binding at compile time). B.hello() is completely invisible to A.run(). Result: 'A'."
  },
  {
    id: 737, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Outer</span> {
    <span class="kw">int</span> x = <span class="num">10</span>;
    <span class="kw">class</span> <span class="cls">Inner</span> {
        <span class="kw">int</span> x = <span class="num">20</span>;
        <span class="kw">void</span> show(<span class="kw">int</span> x) {
            <span class="cls">System</span>.out.println(x + <span class="str">" "</span> + <span class="kw">this</span>.x + <span class="str">" "</span> + <span class="cls">Outer</span>.<span class="kw">this</span>.x);
        }
    }
}
<span class="kw">new</span> <span class="cls">Outer</span>().<span class="kw">new</span> <span class="cls">Inner</span>().show(<span class="num">30</span>);`,
    options: ["30 20 10", "10 20 30", "30 10 20", "Compilation error"],
    answer: 0,
    explanation: "show(int x): local x=30. this.x = Inner.x=20. Outer.this.x = Outer.x=10. Result: '30 20 10'."
  },
  {
    id: 738, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Season</span> { SPRING, SUMMER, FALL, WINTER }
<span class="cls">Season</span> s = <span class="cls">Season</span>.SUMMER;
<span class="cls">System</span>.out.println(s.compareTo(<span class="cls">Season</span>.WINTER));`,
    options: ["-2", "2", "0", "-1"],
    answer: 0,
    explanation: "Enum.compareTo() returns the difference of ordinals: SUMMER.ordinal()=1, WINTER.ordinal()=3. 1-3=-2. Result: -2."
  },
  {
    id: 739, topic: "Functional Interfaces",
    text: "What is the output of the following code?",
    code: `<span class="cls">Comparator</span>&lt;<span class="cls">String</span>&gt; byLength = <span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length);
<span class="cls">Comparator</span>&lt;<span class="cls">String</span>&gt; byAlpha  = <span class="cls">Comparator</span>.naturalOrder();
<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; words = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"fig"</span>, <span class="str">"apple"</span>, <span class="str">"ant"</span>, <span class="str">"fig"</span>));
words.sort(byLength.thenComparing(byAlpha));
<span class="cls">System</span>.out.println(words);`,
    options: ["[ant, fig, fig, apple]", "[fig, fig, ant, apple]", "[apple, ant, fig, fig]", "[ant, apple, fig, fig]"],
    answer: 0,
    explanation: "Sort by length then alpha. fig(3), apple(5), ant(3), fig(3). Length 3: ant < fig = fig (alpha: ant, fig, fig). Length 5: apple. Result: [ant, fig, fig, apple]."
  },
  {
    id: 740, topic: "Serialization",
    text: "What happens when you serialize an object that has a non-serializable superclass?",
    code: null,
    options: [
      "A NotSerializableException is thrown",
      "The subclass is serialized; the superclass's no-arg constructor is called during deserialization to restore its state",
      "The superclass fields are automatically serialized as well",
      "A compilation error occurs"
    ],
    answer: 1,
    explanation: "When a Serializable subclass has a non-Serializable superclass, serialization proceeds for the subclass fields only. During deserialization, the superclass's public/protected no-arg constructor is called to initialize the superclass portion. If no such constructor exists, an InvalidClassException is thrown."
  },
  {
    id: 741, topic: "Reflection",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Animal</span> { <span class="kw">public void</span> speak() {} }
<span class="kw">class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> { <span class="kw">public void</span> fetch() {} }
<span class="cls">Method</span>[] methods = <span class="cls">Dog</span>.<span class="kw">class</span>.getMethods();
<span class="kw">long</span> count = <span class="cls">Arrays</span>.stream(methods)
    .map(<span class="cls">Method</span>::getName)
    .filter(n -> n.equals(<span class="str">"speak"</span>) || n.equals(<span class="str">"fetch"</span>))
    .count();
<span class="cls">System</span>.out.println(count);`,
    options: ["2", "1", "0", "Compilation error"],
    answer: 0,
    explanation: "getMethods() returns all PUBLIC methods including inherited ones. Dog has fetch() declared and speak() inherited from Animal. Both are public. The filter matches both 'speak' and 'fetch'. count = 2."
  },
  {
    id: 742, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Printable</span> {
    <span class="kw">static void</span> info() { <span class="cls">System</span>.out.print(<span class="str">"I"</span>); }
    <span class="kw">default void</span> print() { <span class="cls">System</span>.out.print(<span class="str">"D"</span>); }
}
<span class="kw">class</span> <span class="cls">Doc</span> <span class="kw">implements</span> <span class="cls">Printable</span> {
    <span class="kw">public void</span> print() { <span class="cls">Printable</span>.<span class="kw">super</span>.print(); <span class="cls">System</span>.out.print(<span class="str">"C"</span>); }
}
<span class="cls">Doc</span> d = <span class="kw">new</span> <span class="cls">Doc</span>();
<span class="cls">Printable</span>.info();
d.print();`,
    options: ["IDC", "ICD", "DCI", "Compilation error"],
    answer: 0,
    explanation: "Printable.info() is a static interface method called on the interface: prints 'I'. d.print() calls Printable.super.print() (the default) → prints 'D', then prints 'C'. Result: 'IDC'."
  },
  {
    id: 743, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> r = <span class="cls">IntStream</span>.rangeClosed(<span class="num">1</span>, <span class="num">10</span>)
    .filter(n -> n % <span class="num">2</span> == <span class="num">0</span>)
    .map(n -> n * n)
    .boxed()
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(r);`,
    options: ["[4, 16, 36, 64, 100]", "[1, 4, 9, 16, 25]", "[2, 4, 6, 8, 10]", "[4, 16, 36, 64, 100, 36]"],
    answer: 0,
    explanation: "rangeClosed(1,10) = [1..10]. filter(even): [2,4,6,8,10]. map(n*n): [4,16,36,64,100]. boxed() converts IntStream to Stream<Integer>. collect to List. Result: '[4, 16, 36, 64, 100]'."
  },
  {
    id: 744, topic: "Exception Hierarchy",
    text: "Which of the following is a checked exception?",
    code: null,
    options: [
      "ClassCastException",
      "StackOverflowError",
      "CloneNotSupportedException",
      "UnsupportedOperationException"
    ],
    answer: 2,
    explanation: "CloneNotSupportedException extends Exception (not RuntimeException) → it is a checked exception that must be declared or caught. ClassCastException and UnsupportedOperationException extend RuntimeException (unchecked). StackOverflowError extends Error (not Exception at all)."
  },
  {
    id: 745, topic: "Exception Hierarchy",
    text: "What is the output of the following code?",
    code: `<span class="kw">try</span> {
    <span class="cls">Object</span> obj = <span class="str">"hello"</span>;
    <span class="cls">Integer</span> i = (<span class="cls">Integer</span>) obj;
} <span class="kw">catch</span> (<span class="cls">ClassCastException</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"CCE"</span>);
} <span class="kw">catch</span> (<span class="cls">Exception</span> e) {
    <span class="cls">System</span>.out.print(<span class="str">"EX"</span>);
} <span class="kw">finally</span> {
    <span class="cls">System</span>.out.print(<span class="str">"-F"</span>);
}`,
    options: ["CCE-F", "EX-F", "CCE", "-F"],
    answer: 0,
    explanation: "Casting String 'hello' to Integer throws ClassCastException at runtime. The first catch handles it: prints 'CCE'. Finally always runs: prints '-F'. Result: 'CCE-F'."
  },
  {
    id: 746, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">import</span> java.util.function.*;
<span class="cls">Function</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; parse = <span class="cls">Integer</span>::parseInt;
<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">String</span>&gt; show  = n -> <span class="str">"["</span> + n + <span class="str">"]"</span>;
<span class="cls">Function</span>&lt;<span class="cls">String</span>, <span class="cls">String</span>&gt; both  = parse.andThen(show);
<span class="cls">System</span>.out.println(both.apply(<span class="str">"42"</span>));`,
    options: ["[42]", "42", "Compilation error", "[\"42\"]"],
    answer: 0,
    explanation: "parse: String→Integer (parseInt). show: Integer→String. both = parse.andThen(show): String→Integer→String. both.apply('42'): parse('42')=42, show(42)='[42]'. Result: '[42]'."
  },
  {
    id: 747, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">Map</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; map = <span class="kw">new</span> <span class="cls">LinkedHashMap</span>&lt;&gt;();
map.put(<span class="str">"one"</span>, <span class="num">1</span>); map.put(<span class="str">"two"</span>, <span class="num">2</span>); map.put(<span class="str">"three"</span>, <span class="num">3</span>);
map.put(<span class="str">"two"</span>, <span class="num">22</span>);
map.forEach((k,v) -> <span class="cls">System</span>.out.print(k + <span class="str">"="</span> + v + <span class="str">" "</span>));`,
    options: ["one=1 two=22 three=3 ", "one=1 two=2 three=3 two=22 ", "one=1 three=3 two=22 ", "two=22 one=1 three=3 "],
    answer: 0,
    explanation: "LinkedHashMap preserves insertion order. Updating an existing key ('two') changes the VALUE but does NOT change the key's position in the order. Original insertion order: one, two, three. Result: 'one=1 two=22 three=3 '."
  },
  {
    id: 748, topic: "Varargs",
    text: "What is the output of the following code?",
    code: `<span class="kw">static void</span> print(<span class="cls">Object</span>... args) {
    <span class="cls">System</span>.out.println(args.length);
}
print(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>);
print(<span class="kw">new</span> <span class="cls">String</span>[]{<span class="str">"x"</span>, <span class="str">"y"</span>});
print((<span class="cls">Object</span>)<span class="kw">new</span> <span class="cls">String</span>[]{<span class="str">"p"</span>, <span class="str">"q"</span>});`,
    options: ["3\n2\n1", "3\n1\n2", "3\n2\n2", "Compilation error"],
    answer: 0,
    explanation: "print('a','b','c'): args = [a,b,c], length=3. print(new String[]{'x','y'}): array directly as varargs, args = [x,y], length=2. print((Object) new String[]{'p','q'}): cast to Object, treated as single element, args = [String[]{p,q}], length=1. Result: '3\\n2\\n1'."
  },
  {
    id: 749, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> list = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);
<span class="kw">boolean</span> r1 = list.stream().anyMatch(n -> n > <span class="num">4</span>);
<span class="kw">boolean</span> r2 = list.stream().allMatch(n -> n > <span class="num">0</span>);
<span class="kw">boolean</span> r3 = list.stream().noneMatch(n -> n > <span class="num">10</span>);
<span class="cls">System</span>.out.println(r1 + <span class="str">" "</span> + r2 + <span class="str">" "</span> + r3);`,
    options: ["true true true", "false true true", "true false true", "true true false"],
    answer: 0,
    explanation: "anyMatch(>4): 5>4 → true. allMatch(>0): all [1,2,3,4,5] > 0 → true. noneMatch(>10): none > 10 → true. Result: 'true true true'."
  },
  {
    id: 750, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Point</span> {
    <span class="kw">final int</span> x, y;
    <span class="cls">Point</span>(<span class="kw">int</span> x, <span class="kw">int</span> y) { <span class="kw">this</span>.x = x; <span class="kw">this</span>.y = y; }
    <span class="kw">public boolean</span> equals(<span class="cls">Object</span> o) {
        <span class="kw">return</span> o <span class="kw">instanceof</span> <span class="cls">Point</span> p && p.x == x && p.y == y;
    }
    <span class="kw">public int</span> hashCode() { <span class="kw">return</span> <span class="num">31</span> * x + y; }
}
<span class="cls">Set</span>&lt;<span class="cls">Point</span>&gt; set = <span class="kw">new</span> <span class="cls">HashSet</span>&lt;&gt;();
set.add(<span class="kw">new</span> <span class="cls">Point</span>(<span class="num">1</span>,<span class="num">2</span>));
set.add(<span class="kw">new</span> <span class="cls">Point</span>(<span class="num">1</span>,<span class="num">2</span>));
<span class="cls">System</span>.out.println(set.size());`,
    options: ["1", "2", "0", "Compilation error"],
    answer: 0,
    explanation: "HashSet uses hashCode() and equals() to detect duplicates. Both Point(1,2) instances have the same hashCode (31*1+2=33) and equals() returns true. They are considered equal, so only one is kept. size() = 1."
  }
];
