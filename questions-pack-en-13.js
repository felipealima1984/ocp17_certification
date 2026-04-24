// ═══════════════════════════════════════════════════════
//  PACK EN-13 — Questions 601–650  (English)
//  Topics: Inheritance traps, Abstract classes edge cases,
//          Constructor chaining, Anonymous classes,
//          Local classes, Interface evolution,
//          Nested class access rules, Covariant returns,
//          Method hiding vs overriding, Final keyword
// ═══════════════════════════════════════════════════════

const QUESTIONS_PACK_EN_13 = [
  {
    id: 601, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> {
    <span class="cls">A</span>() { <span class="cls">System</span>.out.print(<span class="str">"A"</span>); init(); }
    <span class="kw">void</span> init() { <span class="cls">System</span>.out.print(<span class="str">"a"</span>); }
}
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> {
    <span class="kw">int</span> x = <span class="num">10</span>;
    <span class="cls">B</span>() { <span class="cls">System</span>.out.print(<span class="str">"B"</span>); }
    <span class="kw">void</span> init() { <span class="cls">System</span>.out.print(x); }
}
<span class="kw">new</span> <span class="cls">B</span>();`,
    options: ["A0B", "AaB", "A10B", "AB"],
    answer: 0,
    explanation: "new B() calls A() first. A() prints 'A', then calls init() via polymorphism — B.init() runs. But at this point B's fields haven't been initialized yet (x is still 0). Prints '0'. Then B() body runs: prints 'B'. Result: 'A0B'."
  },
  {
    id: 602, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Parent</span> {
    <span class="kw">static void</span> greet() { <span class="cls">System</span>.out.print(<span class="str">"Parent"</span>); }
    <span class="kw">void</span>        show()  { <span class="cls">System</span>.out.print(<span class="str">"show-P"</span>); }
}
<span class="kw">class</span> <span class="cls">Child</span> <span class="kw">extends</span> <span class="cls">Parent</span> {
    <span class="kw">static void</span> greet() { <span class="cls">System</span>.out.print(<span class="str">"Child"</span>); }
    <span class="kw">void</span>        show()  { <span class="cls">System</span>.out.print(<span class="str">"show-C"</span>); }
}
<span class="cls">Parent</span> p = <span class="kw">new</span> <span class="cls">Child</span>();
p.greet();
<span class="cls">System</span>.out.print(<span class="str">" "</span>);
p.show();`,
    options: ["Parent show-C", "Child show-C", "Parent show-P", "Child show-P"],
    answer: 0,
    explanation: "Static methods are resolved by reference type (compile-time): p.greet() calls Parent.greet() → 'Parent'. Instance methods use dynamic dispatch (runtime type): p.show() calls Child.show() → 'show-C'. Static methods are hidden, not overridden."
  },
  {
    id: 603, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Base</span> {
    <span class="cls">Base</span> create() { <span class="kw">return new</span> <span class="cls">Base</span>(); }
    <span class="cls">String</span> name() { <span class="kw">return</span> <span class="str">"Base"</span>; }
}
<span class="kw">class</span> <span class="cls">Sub</span> <span class="kw">extends</span> <span class="cls">Base</span> {
    <span class="cls">Sub</span> create() { <span class="kw">return new</span> <span class="cls">Sub</span>(); }
    <span class="cls">String</span> name() { <span class="kw">return</span> <span class="str">"Sub"</span>; }
}
<span class="cls">Base</span> b = <span class="kw">new</span> <span class="cls">Sub</span>();
<span class="cls">System</span>.out.println(b.create().name());`,
    options: ["Sub", "Base", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "Sub.create() has covariant return type Sub (valid since Sub extends Base). b.create() calls Sub.create() (polymorphism) returning a Sub instance. name() on that Sub returns 'Sub'. Result: 'Sub'."
  },
  {
    id: 604, topic: "Abstract Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Animal</span> {
    <span class="kw">private</span> <span class="cls">String</span> name;
    <span class="cls">Animal</span>(<span class="cls">String</span> n) { name = n; }
    <span class="kw">abstract</span> <span class="cls">String</span> sound();
    <span class="cls">String</span> describe() { <span class="kw">return</span> name + <span class="str">" says "</span> + sound(); }
}
<span class="kw">class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="cls">Dog</span>(<span class="cls">String</span> n) { <span class="kw">super</span>(n); }
    <span class="cls">String</span> sound() { <span class="kw">return</span> <span class="str">"woof"</span>; }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Dog</span>(<span class="str">"Rex"</span>).describe());`,
    options: ["Rex says woof", "null says woof", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "Dog('Rex') calls super('Rex'), setting private field name='Rex'. describe() uses name and calls sound() via polymorphism → 'woof'. Result: 'Rex says woof'."
  },
  {
    id: 605, topic: "Abstract Classes",
    text: "Which of the following is a valid declaration inside an abstract class?",
    code: null,
    options: [
      "abstract static void compute();",
      "abstract private void compute();",
      "abstract void compute();",
      "Both A and C"
    ],
    answer: 2,
    explanation: "abstract void compute() is valid — instance abstract method with no body. abstract static is invalid (static methods cannot be abstract since they are resolved at compile time and cannot be overridden). abstract private is invalid (private methods are not visible to subclasses and thus cannot be overridden)."
  },
  {
    id: 606, topic: "Constructors",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">X</span> {
    <span class="kw">int</span> a;
    { a = <span class="num">5</span>; <span class="cls">System</span>.out.print(<span class="str">"I"</span>); }
    <span class="kw">static</span> { <span class="cls">System</span>.out.print(<span class="str">"S"</span>); }
    <span class="cls">X</span>() { <span class="cls">System</span>.out.print(<span class="str">"C"</span>); }
}
<span class="kw">new</span> <span class="cls">X</span>(); <span class="kw">new</span> <span class="cls">X</span>();`,
    options: ["SICIC", "SSICIC", "SICCI", "SSIICC"],
    answer: 0,
    explanation: "Static initializer runs once at class load: 'S'. First new X(): instance initializer runs ('I'), then constructor ('C'). Second new X(): static already ran, so only instance initializer ('I') and constructor ('C'). Result: 'SICIC'."
  },
  {
    id: 607, topic: "Constructors",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Foo</span> {
    <span class="kw">final int</span> x;
    <span class="cls">Foo</span>()        { <span class="kw">this</span>(<span class="num">42</span>); }
    <span class="cls">Foo</span>(<span class="kw">int</span> val) { x = val; }
}
<span class="cls">Foo</span> f = <span class="kw">new</span> <span class="cls">Foo</span>();
<span class="cls">System</span>.out.println(f.x);`,
    options: ["42", "0", "Compilation error — final field not initialized in default constructor", "Throws IllegalStateException"],
    answer: 0,
    explanation: "Foo() calls this(42) which delegates to Foo(int val), setting x=42. Constructor chaining via this() satisfies the requirement that final fields are initialized. Result: 42."
  },
  {
    id: 608, topic: "Constructors",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Parent</span> { <span class="cls">Parent</span>(<span class="kw">int</span> x) { <span class="cls">System</span>.out.print(<span class="str">"P"</span> + x); } }
<span class="kw">class</span> <span class="cls">Child</span> <span class="kw">extends</span> <span class="cls">Parent</span> {
    <span class="cls">Child</span>()     { <span class="kw">this</span>(<span class="num">1</span>); <span class="cls">System</span>.out.print(<span class="str">"C0"</span>); }
    <span class="cls">Child</span>(<span class="kw">int</span> n) { <span class="kw">super</span>(n); <span class="cls">System</span>.out.print(<span class="str">"C"</span> + n); }
}
<span class="kw">new</span> <span class="cls">Child</span>();`,
    options: ["P1C1C0", "C0C1P1", "P1C0C1", "Compilation error"],
    answer: 0,
    explanation: "Child() calls this(1) → Child(1) → super(1) → Parent(int) prints 'P1'. Returns to Child(1): prints 'C1'. Returns to Child(): prints 'C0'. Result: 'P1C1C0'."
  },
  {
    id: 609, topic: "Anonymous Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Greeter</span> { <span class="cls">String</span> greet(<span class="cls">String</span> name); }
<span class="cls">Greeter</span> g = <span class="kw">new</span> <span class="cls">Greeter</span>() {
    <span class="kw">private</span> <span class="cls">String</span> prefix = <span class="str">"Hello"</span>;
    <span class="kw">public</span> <span class="cls">String</span> greet(<span class="cls">String</span> name) {
        <span class="kw">return</span> prefix + <span class="str">", "</span> + name + <span class="str">"!"</span>;
    }
};
<span class="cls">System</span>.out.println(g.greet(<span class="str">"Java"</span>));`,
    options: ["Hello, Java!", "null, Java!", "Compilation error", "Throws NullPointerException"],
    answer: 0,
    explanation: "Anonymous classes can have private fields and instance initializers. prefix = 'Hello' is initialized when the anonymous instance is created. greet('Java') returns 'Hello, Java!'."
  },
  {
    id: 610, topic: "Anonymous Classes",
    text: "Which statement about anonymous classes is CORRECT?",
    code: null,
    options: [
      "An anonymous class can implement multiple interfaces",
      "An anonymous class can have a named constructor",
      "An anonymous class can extend a class AND implement an interface simultaneously",
      "An anonymous class can only capture effectively final local variables"
    ],
    answer: 3,
    explanation: "Anonymous classes CAN only capture effectively final (or final) local variables from the enclosing scope — same rule as lambdas. They cannot have named constructors (they use instance initializers instead), cannot implement multiple interfaces, and cannot both extend and implement."
  },
  {
    id: 611, topic: "Local Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">void</span> run() {
    <span class="kw">int</span> count = <span class="num">0</span>;
    <span class="kw">class</span> <span class="cls">Counter</span> {
        <span class="kw">void</span> inc() { count++; } <span class="cm">// line A</span>
        <span class="kw">int</span>  get() { <span class="kw">return</span> count; }
    }
    <span class="kw">new</span> <span class="cls">Counter</span>().inc();
    <span class="cls">System</span>.out.println(count);
}`,
    options: ["1", "0", "Compilation error at line A", "Throws IllegalStateException"],
    answer: 2,
    explanation: "Line A tries to modify 'count', a local variable captured by the local class Counter. Captured variables must be effectively final (never reassigned). Assigning count++ inside the local class violates this — compilation error."
  },
  {
    id: 612, topic: "Local Classes",
    text: "Which of the following local class declarations is VALID?",
    code: null,
    options: [
      "public class Local { }",
      "static class Local { }",
      "class Local { }",
      "protected class Local { }"
    ],
    answer: 2,
    explanation: "Local classes (declared inside methods/blocks) cannot have access modifiers (public, protected, private) or the static keyword. Only 'class Local { }' without any modifier is valid. They are implicitly scoped to the block."
  },
  {
    id: 613, topic: "Interface Evolution",
    text: "What is the output of the following code?",
    code: `<span class="kw">interface</span> <span class="cls">Shape</span> {
    <span class="kw">double</span> area();
    <span class="kw">default</span> <span class="cls">String</span> describe() {
        <span class="kw">return</span> <span class="str">"Area: "</span> + <span class="cls">String</span>.format(<span class="str">"%.2f"</span>, area());
    }
}
<span class="kw">class</span> <span class="cls">Square</span> <span class="kw">implements</span> <span class="cls">Shape</span> {
    <span class="kw">double</span> side;
    <span class="cls">Square</span>(<span class="kw">double</span> s) { side = s; }
    <span class="kw">public double</span> area() { <span class="kw">return</span> side * side; }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">Square</span>(<span class="num">3</span>).describe());`,
    options: ["Area: 9.00", "Area: 9", "Compilation error", "Area: 3.00"],
    answer: 0,
    explanation: "Square implements Shape and provides area() = 3*3 = 9.0. describe() is the default method from Shape which calls area() polymorphically and formats the result with 2 decimal places. Result: 'Area: 9.00'."
  },
  {
    id: 614, topic: "Interface Evolution",
    text: "What happens when a class inherits two default methods with the same signature from two unrelated interfaces?",
    code: null,
    options: [
      "The JVM picks the first one alphabetically",
      "Compilation error — the class must override the method",
      "The method from the first interface in the implements clause is used",
      "The code compiles but throws AbstractMethodError at runtime"
    ],
    answer: 1,
    explanation: "When a class implements two unrelated interfaces that both have a default method with the same signature, the compiler cannot determine which to use. The class MUST explicitly override the method (and can call either via InterfaceA.super.method() or InterfaceB.super.method())."
  },
  {
    id: 615, topic: "Nested Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Outer</span> {
    <span class="kw">private</span> <span class="cls">String</span> msg = <span class="str">"outer"</span>;
    <span class="kw">class</span> <span class="cls">Inner</span> {
        <span class="kw">private</span> <span class="cls">String</span> msg = <span class="str">"inner"</span>;
        <span class="kw">void</span> print() {
            <span class="cls">System</span>.out.println(msg + <span class="str">" "</span> + <span class="cls">Outer</span>.<span class="kw">this</span>.msg);
        }
    }
}
<span class="kw">new</span> <span class="cls">Outer</span>().<span class="kw">new</span> <span class="cls">Inner</span>().print();`,
    options: ["inner outer", "outer inner", "outer outer", "Compilation error"],
    answer: 0,
    explanation: "Inside Inner.print(), 'msg' without qualification refers to Inner.msg = 'inner'. Outer.this.msg explicitly accesses the enclosing Outer instance's msg = 'outer'. Result: 'inner outer'."
  },
  {
    id: 616, topic: "Nested Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Outer</span> {
    <span class="kw">static int</span> x = <span class="num">10</span>;
    <span class="kw">int</span> y = <span class="num">20</span>;
    <span class="kw">static class</span> <span class="cls">Nested</span> {
        <span class="kw">void</span> show() {
            <span class="cls">System</span>.out.println(x);
            <span class="cm">// System.out.println(y); // would not compile</span>
        }
    }
}
<span class="kw">new</span> <span class="cls">Outer</span>.<span class="cls">Nested</span>().show();`,
    options: ["10", "20", "10 20", "Compilation error"],
    answer: 0,
    explanation: "Static nested classes can access static members of the enclosing class directly (x=10). They cannot access instance members (y) without an explicit outer instance. Nested.show() prints x = 10."
  },
  {
    id: 617, topic: "Final Keyword",
    text: "What is the output of the following code?",
    code: `<span class="kw">final class</span> <span class="cls">Immutable</span> {
    <span class="kw">private final</span> <span class="cls">List</span>&lt;<span class="cls">String</span>&gt; items;
    <span class="cls">Immutable</span>(<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; items) {
        <span class="kw">this</span>.items = items;
    }
    <span class="cls">List</span>&lt;<span class="cls">String</span>&gt; getItems() { <span class="kw">return</span> items; }
}
<span class="kw">var</span> list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt;(<span class="cls">List</span>.of(<span class="str">"a"</span>));
<span class="kw">var</span> obj  = <span class="kw">new</span> <span class="cls">Immutable</span>(list);
list.add(<span class="str">"b"</span>);
<span class="cls">System</span>.out.println(obj.getItems().size());`,
    options: ["1", "2", "Compilation error — final class cannot have mutable fields", "Throws UnsupportedOperationException"],
    answer: 1,
    explanation: "'final class' prevents subclassing but does NOT make the object's state immutable. 'final List items' means the reference cannot be reassigned, but the list itself is mutable. list.add('b') modifies the shared list. obj.getItems().size() = 2."
  },
  {
    id: 618, topic: "Final Keyword",
    text: "Which of the following correctly prevents method overriding in a subclass?",
    code: null,
    options: [
      "private void compute() { }",
      "final void compute() { }",
      "static void compute() { }",
      "All of the above prevent overriding"
    ],
    answer: 3,
    explanation: "All three prevent overriding: private methods are not visible to subclasses (they can be 'hidden' but not overridden). final methods explicitly prohibit overriding. static methods are 'hidden' in subclasses, not overridden (hiding vs overriding is a compile-time distinction). All three effectively prevent true polymorphic overriding."
  },
  {
    id: 619, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">A</span> { <span class="kw">void</span> m() { <span class="cls">System</span>.out.print(<span class="str">"A"</span>); } }
<span class="kw">class</span> <span class="cls">B</span> <span class="kw">extends</span> <span class="cls">A</span> { <span class="kw">void</span> m() { <span class="cls">System</span>.out.print(<span class="str">"B"</span>); } }
<span class="kw">class</span> <span class="cls">C</span> <span class="kw">extends</span> <span class="cls">B</span> { <span class="kw">void</span> m() { <span class="kw">super</span>.m(); <span class="cls">System</span>.out.print(<span class="str">"C"</span>); } }
<span class="cls">A</span> obj = <span class="kw">new</span> <span class="cls">C</span>();
obj.m();`,
    options: ["BC", "AC", "ABC", "C"],
    answer: 0,
    explanation: "obj.m() uses the actual type C. C.m() calls super.m() which goes to B.m() (immediate superclass) → prints 'B'. Returns to C.m() → prints 'C'. Result: 'BC'."
  },
  {
    id: 620, topic: "Inheritance",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Vehicle</span> {
    <span class="kw">int</span> speed() { <span class="kw">return</span> <span class="num">60</span>; }
}
<span class="kw">class</span> <span class="cls">Car</span> <span class="kw">extends</span> <span class="cls">Vehicle</span> {
    <span class="kw">int</span> speed() { <span class="kw">return</span> <span class="kw">super</span>.speed() + <span class="num">40</span>; }
}
<span class="kw">class</span> <span class="cls">SportsCar</span> <span class="kw">extends</span> <span class="cls">Car</span> {
    <span class="kw">int</span> speed() { <span class="kw">return</span> <span class="kw">super</span>.speed() * <span class="num">2</span>; }
}
<span class="cls">System</span>.out.println(<span class="kw">new</span> <span class="cls">SportsCar</span>().speed());`,
    options: ["200", "120", "160", "100"],
    answer: 0,
    explanation: "SportsCar.speed(): super.speed() → Car.speed(). Car.speed(): super.speed() → Vehicle.speed() = 60. Car returns 60+40=100. SportsCar returns 100*2=200. Result: 200."
  },
  {
    id: 621, topic: "Abstract Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">abstract class</span> <span class="cls">Template</span> {
    <span class="kw">final void</span> run() { step1(); step2(); step3(); }
    <span class="kw">void</span>        step1() { <span class="cls">System</span>.out.print(<span class="str">"1"</span>); }
    <span class="kw">abstract void</span> step2();
    <span class="kw">void</span>        step3() { <span class="cls">System</span>.out.print(<span class="str">"3"</span>); }
}
<span class="kw">new</span> <span class="cls">Template</span>() {
    <span class="kw">void</span> step2() { <span class="cls">System</span>.out.print(<span class="str">"2"</span>); }
    <span class="kw">void</span> step3() { <span class="cls">System</span>.out.print(<span class="str">"X"</span>); }
}.run();`,
    options: ["12X", "123", "1X3", "Compilation error"],
    answer: 0,
    explanation: "run() is final — cannot be overridden. It calls step1() (prints '1'), step2() (anonymous class provides → prints '2'), step3() (anonymous class overrides → prints 'X'). Result: '12X'."
  },
  {
    id: 622, topic: "Nested Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Holder</span> {
    <span class="kw">private static int</span> count = <span class="num">0</span>;
    <span class="kw">static class</span> <span class="cls">Token</span> {
        <span class="kw">final int</span> id;
        <span class="cls">Token</span>() { id = ++count; }
    }
}
<span class="cls">Holder</span>.<span class="cls">Token</span> t1 = <span class="kw">new</span> <span class="cls">Holder</span>.<span class="cls">Token</span>();
<span class="cls">Holder</span>.<span class="cls">Token</span> t2 = <span class="kw">new</span> <span class="cls">Holder</span>.<span class="cls">Token</span>();
<span class="cls">System</span>.out.println(t1.id + <span class="str">" "</span> + t2.id);`,
    options: ["1 2", "0 0", "1 1", "Compilation error — static nested class cannot access private static"],
    answer: 0,
    explanation: "Static nested classes CAN access private static members of the enclosing class. count starts at 0. t1.id = ++count = 1. t2.id = ++count = 2. Result: '1 2'."
  },
  {
    id: 623, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Ops</span> {
    ADD {
        <span class="kw">public int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a + b; }
    },
    MUL {
        <span class="kw">public int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a * b; }
    };
    <span class="kw">public abstract int</span> apply(<span class="kw">int</span> a, <span class="kw">int</span> b);
}
<span class="cls">System</span>.out.println(<span class="cls">Ops</span>.ADD.apply(<span class="num">3</span>, <span class="num">4</span>) + <span class="str">" "</span> + <span class="cls">Ops</span>.MUL.apply(<span class="num">3</span>, <span class="num">4</span>));`,
    options: ["7 12", "12 7", "3 4", "Compilation error"],
    answer: 0,
    explanation: "Enum constant-specific methods (abstract method with per-constant implementation). ADD.apply(3,4) = 7. MUL.apply(3,4) = 12. Result: '7 12'."
  },
  {
    id: 624, topic: "Enums",
    text: "What is the output of the following code?",
    code: `<span class="kw">enum</span> <span class="cls">Direction</span> { NORTH, SOUTH, EAST, WEST }
<span class="cls">Direction</span> d = <span class="cls">Direction</span>.EAST;
<span class="kw">switch</span>(d) {
    <span class="kw">case</span> NORTH: <span class="kw">case</span> SOUTH: <span class="cls">System</span>.out.print(<span class="str">"vertical"</span>);  <span class="kw">break</span>;
    <span class="kw">case</span> EAST:  <span class="kw">case</span> WEST:  <span class="cls">System</span>.out.print(<span class="str">"horizontal"</span>); <span class="kw">break</span>;
}`,
    options: ["horizontal", "vertical", "Compilation error", "Nothing is printed"],
    answer: 0,
    explanation: "d = EAST matches 'case EAST:' which falls through to 'case WEST:' and executes the shared print statement: 'horizontal'. break prevents fall-through to outside the switch."
  },
  {
    id: 625, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="kw">static</span> &lt;T <span class="kw">extends</span> <span class="cls">Comparable</span>&lt;T&gt;&gt; T min(<span class="cls">List</span>&lt;T&gt; list) {
    <span class="kw">return</span> list.stream().min(<span class="cls">Comparator</span>.naturalOrder()).orElseThrow();
}
<span class="cls">System</span>.out.println(min(<span class="cls">List</span>.of(<span class="num">5</span>, <span class="num">2</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">3</span>)));`,
    options: ["1", "5", "Compilation error", "Throws NoSuchElementException"],
    answer: 0,
    explanation: "T is inferred as Integer (which implements Comparable<Integer>). Comparator.naturalOrder() sorts ascending. min() returns the smallest: 1. orElseThrow() gets the value (list is non-empty). Result: 1."
  },
  {
    id: 626, topic: "Generics",
    text: "What does the following code output?",
    code: `<span class="cls">List</span>&lt;? <span class="kw">extends</span> <span class="cls">Number</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
<span class="cls">Number</span> first = nums.get(<span class="num">0</span>);
<span class="cls">System</span>.out.println(first.intValue());`,
    options: ["1", "0", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "List<? extends Number> is a read-only list — you can read elements as Number (or a supertype). nums.get(0) returns Number. intValue() = 1. You cannot add to this list (only null is accepted for add)."
  },
  {
    id: 627, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">IntStream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>)
    .reduce((<span class="kw">int</span> a, <span class="kw">int</span> b) -> a * b);
<span class="cls">System</span>.out.println(result.getAsInt());`,
    options: ["24", "10", "0", "Throws NoSuchElementException"],
    answer: 0,
    explanation: "IntStream.reduce(IntBinaryOperator) without identity returns OptionalInt. The operation multiplies: 1*2=2, 2*3=6, 6*4=24. getAsInt() returns 24."
  },
  {
    id: 628, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="cls">Stream</span>.of(<span class="str">"alpha"</span>, <span class="str">"beta"</span>, <span class="str">"gamma"</span>)
    .filter(s -> s.startsWith(<span class="str">"b"</span>))
    .findFirst()
    .ifPresentOrElse(
        s -> <span class="cls">System</span>.out.print(<span class="str">"found: "</span> + s),
        ()  -> <span class="cls">System</span>.out.print(<span class="str">"none"</span>)
    );`,
    options: ["found: beta", "none", "beta", "Compilation error"],
    answer: 0,
    explanation: "filter keeps 'beta' (starts with 'b'). findFirst() returns Optional('beta'). ifPresentOrElse: present → Consumer runs → 'found: beta'. Result: 'found: beta'."
  },
  {
    id: 629, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">LocalDateTime</span> ldt = <span class="cls">LocalDateTime</span>.of(<span class="num">2024</span>, <span class="num">6</span>, <span class="num">15</span>, <span class="num">23</span>, <span class="num">30</span>);
<span class="cls">LocalDateTime</span> next = ldt.plusHours(<span class="num">2</span>);
<span class="cls">System</span>.out.println(next.toLocalDate() + <span class="str">" "</span> + next.getHour());`,
    options: ["2024-06-16 1", "2024-06-15 25", "2024-06-16 25", "2024-06-15 1"],
    answer: 0,
    explanation: "23:30 + 2 hours = 01:30 the next day (crosses midnight). next.toLocalDate() = 2024-06-16. getHour() = 1. Result: '2024-06-16 1'."
  },
  {
    id: 630, topic: "Date & Time API",
    text: "What is the output of the following code?",
    code: `<span class="cls">ZoneId</span> utc = <span class="cls">ZoneId</span>.of(<span class="str">"UTC"</span>);
<span class="cls">ZoneId</span> sp  = <span class="cls">ZoneId</span>.of(<span class="str">"America/Sao_Paulo"</span>);
<span class="cls">ZonedDateTime</span> utcTime = <span class="cls">ZonedDateTime</span>.of(<span class="num">2024</span>, <span class="num">7</span>, <span class="num">1</span>, <span class="num">12</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">0</span>, utc);
<span class="cls">ZonedDateTime</span> spTime  = utcTime.withZoneSameInstant(sp);
<span class="cls">System</span>.out.println(utcTime.toInstant().equals(spTime.toInstant()));`,
    options: ["true", "false", "Compilation error", "Throws ZoneRulesException"],
    answer: 0,
    explanation: "withZoneSameInstant() converts to another timezone while preserving the same instant in time. Both ZonedDateTimes represent the same moment — only the local representation changes. toInstant() of both is identical → equals() returns true."
  },
  {
    id: 631, topic: "Concurrency",
    text: "What is the output of the following code?",
    code: `<span class="cls">CountDownLatch</span> latch = <span class="kw">new</span> <span class="cls">CountDownLatch</span>(<span class="num">3</span>);
<span class="cls">Runnable</span> task = () -> {
    <span class="cls">System</span>.out.print(<span class="str">"t"</span>);
    latch.countDown();
};
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">3</span>; i++) <span class="kw">new</span> <span class="cls">Thread</span>(task).start();
latch.await();
<span class="cls">System</span>.out.print(<span class="str">"done"</span>);`,
    options: ["tttdone (in some order)", "donettt", "tttdone always in that exact order", "Throws InterruptedException"],
    answer: 0,
    explanation: "Three threads each print 't' and countDown. The main thread awaits until count reaches 0. The three 't's print concurrently (order between them is non-deterministic), then 'done' is guaranteed to print after all three countDown() calls. Result: tttdone (the t's may interleave differently each run)."
  },
  {
    id: 632, topic: "Concurrency",
    text: "What is the difference between ConcurrentHashMap and Collections.synchronizedMap()?",
    code: null,
    options: [
      "No functional difference",
      "ConcurrentHashMap uses fine-grained bucket-level locking for higher concurrency; synchronizedMap wraps the entire map with a single mutex",
      "synchronizedMap is faster for reads; ConcurrentHashMap is faster for writes",
      "ConcurrentHashMap allows null keys; synchronizedMap does not"
    ],
    answer: 1,
    explanation: "Collections.synchronizedMap() wraps every method with synchronized(this) — one lock for the whole map. ConcurrentHashMap uses bucket-level locking (or CAS for Java 8+), allowing multiple threads to read and write to different buckets simultaneously — much higher throughput under contention."
  },
  {
    id: 633, topic: "I/O & NIO",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> p = <span class="cls">Path</span>.of(<span class="str">"/a"</span>, <span class="str">"b"</span>, <span class="str">"c.txt"</span>);
<span class="cls">System</span>.out.println(p.getParent());
<span class="cls">System</span>.out.println(p.getRoot());`,
    options: ["/a/b\n/", "/a\n/", "b\nnull", "a/b\nnull"],
    answer: 0,
    explanation: "Path.of('/a', 'b', 'c.txt') = '/a/b/c.txt'. getParent() returns the path without the file name: '/a/b'. getRoot() returns the root component: '/' (on Unix). Result: '/a/b\\n/'."
  },
  {
    id: 634, topic: "I/O & NIO",
    text: "Which statement about try-with-resources when both the body AND close() throw exceptions is CORRECT?",
    code: null,
    options: [
      "Both exceptions are propagated",
      "The body exception is propagated; the close() exception is suppressed and attached to it",
      "The close() exception is propagated; the body exception is lost",
      "Only the most recent exception is propagated"
    ],
    answer: 1,
    explanation: "When the try body throws exception E1 and close() throws E2, E1 is the primary exception that propagates. E2 is added as a suppressed exception: E1.getSuppressed() returns [E2]. This preserves both exceptions for diagnostics."
  },
  {
    id: 635, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">String</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>, <span class="str">"d"</span>));
<span class="cls">Iterator</span>&lt;<span class="cls">String</span>&gt; it = list.iterator();
<span class="kw">while</span> (it.hasNext()) {
    <span class="kw">if</span> (it.next().equals(<span class="str">"b"</span>)) it.remove();
}
<span class="cls">System</span>.out.println(list);`,
    options: ["[a, c, d]", "[a, b, c, d]", "Throws ConcurrentModificationException", "[b, c, d]"],
    answer: 0,
    explanation: "Using Iterator.remove() is the safe way to remove elements during iteration. it.next() returns 'b', then it.remove() removes it without triggering ConcurrentModificationException. Result: [a, c, d]."
  },
  {
    id: 636, topic: "Collections",
    text: "What is the output of the following code?",
    code: `<span class="cls">TreeMap</span>&lt;<span class="cls">Integer</span>, <span class="cls">String</span>&gt; map = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();
map.put(<span class="num">3</span>, <span class="str">"C"</span>); map.put(<span class="num">1</span>, <span class="str">"A"</span>); map.put(<span class="num">2</span>, <span class="str">"B"</span>);
<span class="cls">System</span>.out.println(map.firstKey() + <span class="str">" "</span> + map.lastKey());
<span class="cls">System</span>.out.println(map.subMap(<span class="num">1</span>, <span class="num">3</span>));`,
    options: ["1 3\n{1=A, 2=B}", "3 1\n{2=B, 3=C}", "1 3\n{1=A, 2=B, 3=C}", "Compilation error"],
    answer: 0,
    explanation: "TreeMap is sorted ascending by key. firstKey()=1, lastKey()=3. subMap(1,3) is [1,3) exclusive: keys 1 and 2 → {1=A, 2=B}. Result: '1 3\\n{1=A, 2=B}'."
  },
  {
    id: 637, topic: "Lambdas",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);
<span class="kw">int</span>[] sum = {<span class="num">0</span>};
nums.forEach(n -> sum[<span class="num">0</span>] += n);
<span class="cls">System</span>.out.println(sum[<span class="num">0</span>]);`,
    options: ["15", "0", "Compilation error — sum[0] is not effectively final", "Throws ArrayIndexOutOfBoundsException"],
    answer: 0,
    explanation: "The array reference 'sum' is effectively final (never reassigned), but the array contents CAN be modified inside a lambda. sum[0] += n modifies the array element, not the reference. After iterating: 1+2+3+4+5=15."
  },
  {
    id: 638, topic: "Lambdas",
    text: "What is the output of the following code?",
    code: `<span class="cls">Function</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; f = x -> {
    <span class="cls">System</span>.out.print(x + <span class="str">" "</span>);
    <span class="kw">return</span> x * <span class="num">2</span>;
};
<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)
    .map(f)
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["1 2 3 [2, 4, 6]", "[2, 4, 6]", "Compilation error", "1 2 3 \n[2, 4, 6]"],
    answer: 0,
    explanation: "map is lazy but collect is a terminal operation that triggers processing. Each element is mapped: prints '1 ', '2 ', '3 ' and returns [2, 4, 6]. collect produces the list. Result: '1 2 3 [2, 4, 6]' (all on the same line since print uses print, not println)."
  },
  {
    id: 639, topic: "JVM & Memory",
    text: "What does 'stop-the-world' pause mean in garbage collection?",
    code: null,
    options: [
      "The JVM pauses all application threads to perform GC work safely",
      "The GC stops and waits for the application to finish its current operation",
      "The OS pauses the JVM process to reallocate memory",
      "The network stack is suspended during GC to prevent data corruption"
    ],
    answer: 0,
    explanation: "During a stop-the-world pause, the JVM suspends ALL application threads while the GC performs its work (e.g., marking, compacting). This ensures a consistent view of the heap. Modern GCs (G1, ZGC, Shenandoah) minimize these pauses by doing most work concurrently."
  },
  {
    id: 640, topic: "JVM & Memory",
    text: "What is the difference between the Stack and the Heap in the JVM?",
    code: null,
    options: [
      "Stack stores objects; Heap stores method frames",
      "Stack stores method frames and local variables (per thread); Heap stores objects (shared across threads)",
      "Stack is shared across threads; Heap is per-thread",
      "Both Stack and Heap are shared across all threads"
    ],
    answer: 1,
    explanation: "Each thread has its own Stack (storing method frames, local variables, and references). The Heap is shared across all threads (storing objects). Stack memory is automatically freed when a method returns. Heap memory is managed by the GC."
  },
  {
    id: 641, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"abcde"</span>;
<span class="cls">System</span>.out.println(s.substring(<span class="num">2</span>));
<span class="cls">System</span>.out.println(s.substring(<span class="num">1</span>, <span class="num">3</span>));`,
    options: ["cde\nbc", "cd\nbc", "cde\nbcd", "de\nbc"],
    answer: 0,
    explanation: "substring(2): from index 2 to end → 'cde'. substring(1, 3): from index 1 (inclusive) to 3 (exclusive) → indices 1 and 2 → 'bc'. Result: 'cde\\nbc'."
  },
  {
    id: 642, topic: "Strings",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> s = <span class="str">"Hello World"</span>;
<span class="cls">System</span>.out.println(s.replace(<span class="str">'l'</span>, <span class="str">'r'</span>));
<span class="cls">System</span>.out.println(s.replaceAll(<span class="str">"[aeiou]"</span>, <span class="str">"*"</span>));`,
    options: ["Herro Worrd\nH*ll* W*rld", "Hello World\nH*ll* W*rld", "Herro Worrd\nHello World", "Herro Worrd\nH*ll* W*rrd"],
    answer: 0,
    explanation: "replace('l','r') replaces all literal 'l' chars: 'Herro Worrd'. replaceAll('[aeiou]', '*') replaces all vowels with '*': 'e' → '*', 'o' → '*', 'o' → '*'. Result: 'H*ll* W*rld'. Final output: 'Herro Worrd\\nH*ll* W*rld'."
  },
  {
    id: 643, topic: "var",
    text: "What is the inferred type of 'result' in the following code?",
    code: `<span class="kw">var</span> list = <span class="cls">List</span>.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
<span class="kw">var</span> result = list.stream()
                  .filter(n -> n > <span class="num">1</span>)
                  .collect(<span class="cls">Collectors</span>.toList());`,
    options: ["List<Integer>", "List<Object>", "Stream<Integer>", "Collection<Integer>"],
    answer: 0,
    explanation: "List.of(1,2,3) creates List<Integer>. stream() returns Stream<Integer>. filter returns Stream<Integer>. collect(Collectors.toList()) returns List<Integer>. 'result' is inferred as List<Integer>."
  },
  {
    id: 644, topic: "Records",
    text: "What is the output of the following code?",
    code: `<span class="kw">record</span> <span class="cls">Temperature</span>(<span class="kw">double</span> celsius) {
    <span class="cls">Temperature</span> {
        <span class="kw">if</span> (celsius < -<span class="num">273.15</span>)
            <span class="kw">throw new</span> <span class="cls">IllegalArgumentException</span>(<span class="str">"Below absolute zero"</span>);
    }
    <span class="kw">double</span> toFahrenheit() { <span class="kw">return</span> celsius * <span class="num">9</span> / <span class="num">5</span> + <span class="num">32</span>; }
}
<span class="kw">var</span> t = <span class="kw">new</span> <span class="cls">Temperature</span>(<span class="num">100</span>);
<span class="cls">System</span>.out.println(t.toFahrenheit());`,
    options: ["212.0", "100.0", "32.0", "Throws IllegalArgumentException"],
    answer: 0,
    explanation: "100°C is above -273.15 → validation passes. toFahrenheit() = 100 * 9 / 5 + 32 = 180 + 32 = 212.0. Result: 212.0."
  },
  {
    id: 645, topic: "Sealed Classes",
    text: "What is the output of the following code?",
    code: `<span class="kw">sealed interface</span> <span class="cls">Token</span> <span class="kw">permits</span> <span class="cls">NumberToken</span>, <span class="cls">WordToken</span> {}
<span class="kw">record</span> <span class="cls">NumberToken</span>(<span class="kw">int</span>    val) <span class="kw">implements</span> <span class="cls">Token</span> {}
<span class="kw">record</span> <span class="cls">WordToken</span>(<span class="cls">String</span> val) <span class="kw">implements</span> <span class="cls">Token</span> {}
<span class="cls">Token</span> t = <span class="kw">new</span> <span class="cls">WordToken</span>(<span class="str">"hello"</span>);
<span class="cls">System</span>.out.println(<span class="kw">switch</span>(t) {
    <span class="kw">case</span> <span class="cls">NumberToken</span>(var n) -> <span class="str">"number: "</span> + n;
    <span class="kw">case</span> <span class="cls">WordToken</span>(var w)  -> <span class="str">"word: "</span>   + w;
});`,
    options: ["word: hello", "number: hello", "Compilation error", "Throws MatchException"],
    answer: 0,
    explanation: "Sealed interface + record patterns. t is WordToken('hello'). Pattern switch: case WordToken(var w) destructures the record, binding w='hello'. Returns 'word: hello'. The switch is exhaustive (all permits covered)."
  },
  {
    id: 646, topic: "Comparable",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; nums = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(<span class="cls">List</span>.of(<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>));
nums.sort(<span class="cls">Comparator</span>.comparingInt(<span class="cls">Integer</span>::intValue).reversed());
<span class="cls">System</span>.out.println(nums.get(<span class="num">0</span>) + <span class="str">" "</span> + nums.get(<span class="num">3</span>));`,
    options: ["8 1", "1 8", "5 3", "8 5"],
    answer: 0,
    explanation: "comparingInt(Integer::intValue) sorts ascending. reversed() inverts: descending. Sorted descending: [8, 5, 3, 1]. get(0)=8, get(3)=1. Result: '8 1'."
  },
  {
    id: 647, topic: "Generics",
    text: "What is the output of the following code?",
    code: `<span class="cls">List</span>&lt;<span class="cls">Object</span>&gt; objs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
objs.add(<span class="str">"hello"</span>);
objs.add(<span class="num">42</span>);
objs.add(<span class="num">3.14</span>);
objs.stream()
    .filter(o -> o <span class="kw">instanceof</span> <span class="cls">Integer</span>)
    .map(o -> (<span class="cls">Integer</span>) o)
    .forEach(<span class="cls">System</span>.out::println);`,
    options: ["42", "hello\n42\n3.14", "Compilation error", "Throws ClassCastException"],
    answer: 0,
    explanation: "filter(o instanceof Integer) keeps only Integer elements: 42. map casts to Integer. forEach prints each: 42. The String and Double are filtered out. Result: '42'."
  },
  {
    id: 648, topic: "Streams",
    text: "What is the output of the following code?",
    code: `<span class="kw">var</span> result = <span class="cls">Stream</span>.of(<span class="str">"Java"</span>, <span class="str">"Python"</span>, <span class="str">"Go"</span>, <span class="str">"Rust"</span>)
    .sorted(<span class="cls">Comparator</span>.comparingInt(<span class="cls">String</span>::length))
    .collect(<span class="cls">Collectors</span>.toList());
<span class="cls">System</span>.out.println(result);`,
    options: ["[Go, Java, Rust, Python]", "[Python, Java, Rust, Go]", "[Go, Rust, Java, Python]", "[Java, Go, Python, Rust]"],
    answer: 0,
    explanation: "comparingInt(String::length) sorts ascending by length: Go(2), Java(4), Rust(4), Python(6). Ties (Java and Rust both length 4) preserve their relative encounter order (stable sort). Result: [Go, Java, Rust, Python]."
  },
  {
    id: 649, topic: "Text Blocks",
    text: "What is the output of the following code?",
    code: `<span class="cls">String</span> json = <span class="str">"""
        {
          "key": "value"
        }
        """</span>;
<span class="cls">System</span>.out.println(json.trim().startsWith(<span class="str">"{"</span>));`,
    options: ["true", "false", "Compilation error", "Throws StringIndexOutOfBoundsException"],
    answer: 0,
    explanation: "The text block starts with indented '{'. trim() removes leading/trailing whitespace. After trim(), the string starts with '{'. startsWith('{') = true."
  },
  {
    id: 650, topic: "OOP",
    text: "What is the output of the following code?",
    code: `<span class="kw">class</span> <span class="cls">Builder</span> {
    <span class="kw">private</span> <span class="cls">StringBuilder</span> sb = <span class="kw">new</span> <span class="cls">StringBuilder</span>();
    <span class="cls">Builder</span> add(<span class="cls">String</span> s) { sb.append(s); <span class="kw">return this</span>; }
    <span class="cls">String</span>  build()       { <span class="kw">return</span> sb.toString(); }
}
<span class="cls">System</span>.out.println(
    <span class="kw">new</span> <span class="cls">Builder</span>().add(<span class="str">"Hello"</span>).add(<span class="str">", "</span>).add(<span class="str">"World"</span>).build()
);`,
    options: ["Hello, World", "Hello, World!", "Compilation error", "null"],
    answer: 0,
    explanation: "Fluent builder pattern: add() returns 'this' enabling method chaining. Each add() appends to the StringBuilder. build() returns the accumulated string: 'Hello, World'."
  }
];
