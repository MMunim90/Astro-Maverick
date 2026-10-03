---
title: 'C++-এ __builtin_popcount() কী? কেন এর Time Complexity O(1)?'
description: 'C++-এর __builtin_popcount() কীভাবে Binary-এর set bit count করে, কেন fixed-width integer-এর ক্ষেত্রে এর complexity O(1), POPCNT instruction কী এবং compiler কীভাবে built-in function-কে CPU instruction-এ রূপান্তর করতে পারে—সহজভাবে জানুন।'
pubDate: 2026-10-04
tags: ['C++', 'Bit-Manipulation', 'Bitwise', 'builtin-popcount', 'POPCNT', 'Time-Complexity', 'Competitive-Programming']
---


C++-এ Bit Manipulation শেখার সময় একটি খুব জনপ্রিয় built-in function হলো:

```cpp
__builtin_popcount()
```

এর কাজ খুবই সহজ:

> একটি integer-এর binary representation-এ মোট কতগুলো `1` bit আছে, সেটি count করা।

কিন্তু এখানে একটি গুরুত্বপূর্ণ প্রশ্ন আসে:

> `__builtin_popcount()`-এর Time Complexity কেন `O(1)` বলা হয়?

এটি কি সত্যিই মাত্র একটি operation করে?

নাকি ভিতরে কোনো loop চলে?

আর **POPCNT instruction** বলতে আসলে কী বোঝায়?

এই article-এ আমরা একদম শুরু থেকে বিষয়টি বুঝব।

---

# `__builtin_popcount()` কী কাজ করে?

একটি সহজ example দেখি:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n = 13;

    cout << __builtin_popcount(n);

    return 0;
}
```

এখানে:

```cpp
n = 13
```

13-এর binary representation হলো:

```text
13 = 1101
```

এখন `1101`-এর মধ্যে কতগুলো `1` আছে?

```text
1 1 0 1
↑ ↑   ↑
1 2   3
```

মোট `3`টি bit-এর value হলো `1`।

তাই output হবে:

```text
3
```

অর্থাৎ:

```cpp
__builtin_popcount(13)
```

এর result হলো:

```text
3
```

---

# Popcount বলতে কী বোঝায়?

**Popcount** হলো **Population Count**-এর সংক্ষিপ্ত রূপ।

এর অর্থ:

> কোনো binary value-এর মধ্যে কতগুলো bit-এর value `1`, সেটি count করা।

উদাহরণ:

```text
Number     Binary       Popcount
--------------------------------
5          101             2
7          111             3
8          1000            1
10         1010            2
13         1101            3
15         1111            4
```

তাই:

```cpp
__builtin_popcount(5)
```

দেবে:

```text
2
```

কারণ:

```text
5 = 101
```

এখানে দুটি `1` আছে।

---

# `__builtin_popcount()` কীভাবে ব্যবহার করব?

প্রথমে:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n = 13;

    cout << __builtin_popcount(n);

    return 0;
}
```

Output:

```text
3
```

এটি সাধারণত GCC/Clang-এর compiler built-in হিসেবে ব্যবহৃত হয়।

---

# এবার আসল প্রশ্ন: Complexity O(1) কেন?

অনেকেই প্রথমে ভাবতে পারেন:

> Binary-এর প্রতিটি bit তো check করতে হবে। তাহলে complexity `O(n)` হবে না?

এখানে মূল বিষয় হলো **`n` কোন জিনিসের উপর নির্ভর করছে?**

যদি আমরা একটি fixed-width integer নিয়ে কাজ করি, তাহলে তার bit-এর সংখ্যা fixed।

উদাহরণ হিসেবে 32-bit integer ধরুন।

তাহলে:

```text
32-bit integer
↓
সর্বোচ্চ 32টি bit
↓
সর্বোচ্চ 32টি bit নিয়ে কাজ
```

নিজেরা যদি একটি simple popcount algorithm লিখি, conceptually এমন হতে পারে:

```cpp
int count = 0;

for (int i = 0; i < 32; i++)
{
    // প্রতিটি bit check করা
}
```

এই loop সর্বোচ্চ 32 বার চলবে।

তাই কাজের পরিমাণ:

```text
O(32)
```

কিন্তু Big-O notation-এ constant বাদ দেওয়া হয়।

তাই:

```text
O(32) = O(1)
```

---

# `O(32)` কেন `O(1)`?

Big-O complexity মূলত input size বাড়লে algorithm-এর কাজ কীভাবে বাড়ে সেটি বোঝায়।

এখানে 32 একটি fixed constant।

ধরুন:

```text
n = 5
n = 100
n = 1,000,000
n = 1,000,000,000
```

সংখ্যার value অনেক বড় বা ছোট হতে পারে।

কিন্তু fixed-width integer-এর bit width একই থাকলে bit count করার কাজের সর্বোচ্চ পরিমাণ একই থাকে।

উদাহরণ:

```text
32-bit integer
↓
সর্বোচ্চ 32টি bit
```

তাই integer-এর numerical value বড় হওয়ার কারণে bit সংখ্যা অসীমভাবে বাড়ছে না।

এই কারণেই fixed-width integer-এর ক্ষেত্রে popcount-কে algorithmic perspective থেকে `O(1)` বলা যায়।

---

# একটি গুরুত্বপূর্ণ Technical Point

এখানে একটি বিষয় পরিষ্কারভাবে মনে রাখা দরকার।

C++ Standard `int`-কে **অবশ্যই 32-bit** বলে না।

C++ Standard অনুযায়ী `int`-এর minimum range নির্দিষ্ট, কিন্তু actual size implementation-এর উপর নির্ভর করে।

তবে **আধুনিক অনেক system-এ `int` 32-bit** হওয়ায় competitive programming-এ সাধারণত 32-bit integer ধরে উদাহরণ দেওয়া হয়।

তাই আরও সঠিকভাবে বলা যায়:

> একটি fixed-width integer-এর bit width যদি constant হয়, তাহলে তার popcount-এর কাজের পরিমাণও constant; তাই সেটিকে `O(1)` বলা হয়।

---

# তাহলে কি `__builtin_popcount()` ভিতরে 32 বার loop চালায়?

এখানে আসে আরও interesting বিষয়।

Conceptually একটি software implementation এমন হতে পারে:

```cpp
int count = 0;

for (int i = 0; i < 32; i++)
{
    if (n & (1 << i))
        count++;
}
```

এখানে প্রতিটি bit check করা হচ্ছে।

কিন্তু `__builtin_popcount()`-এর implementation অবশ্যই এমন একটি C++ loop হতে হবে—এমন নয়।

Compiler অনেক সময় architecture এবং compiler options-এর উপর নির্ভর করে এটিকে আরও efficient machine instruction-এ রূপান্তর করতে পারে।

এখানেই আসে:

```text
POPCNT
```

---

# CPU Instruction কী?

আমরা C++-এ লিখি:

```cpp
int c = a + b;
```

কিন্তু CPU সরাসরি C++ syntax বোঝে না।

Compiler আমাদের C++ code-কে machine code-এ translate করে।

CPU machine-level instruction execute করে।

একটি CPU instruction হলো CPU-কে দেওয়া একটি low-level operation বা command।

উদাহরণ হিসেবে conceptually:

```text
ADD   → যোগ করা
SUB   → বিয়োগ করা
LOAD  → data load করা
STORE → data store করা
```

এগুলো CPU architecture-এর instruction set-এর অংশ হতে পারে।

---

# POPCNT কী?

`POPCNT` হলো **Population Count** instruction-এর নাম।

এর কাজ:

> একটি integer value-এর binary representation-এ কতগুলো bit `1`, তা count করা।

উদাহরণ:

```text
13 = 1101
```

এখানে:

```text
1 1 0 1
```

মোট তিনটি `1` আছে।

তাই conceptually:

```text
POPCNT(13) → 3
```

---

# `__builtin_popcount()` থেকে POPCNT কীভাবে আসে?

আমরা C++ code-এ সাধারণত লিখি:

```cpp
int n = 13;

int ans = __builtin_popcount(n);
```

আমরা সরাসরি লিখি না:

```text
POPCNT
```

কারণ `POPCNT` হলো CPU instruction, C++ function নয়।

Compiler code দেখে বুঝতে পারে যে এখানে population count operation দরকার।

যদি target architecture-এর জন্য উপযুক্ত instruction available থাকে এবং compiler সেটি ব্যবহার করার সিদ্ধান্ত নেয়, তাহলে compiler machine code-এ POPCNT instruction generate করতে পারে।

Conceptually flow:

```text
C++ Code
   │
   ▼
__builtin_popcount(n)
   │
   ▼
Compiler
   │
   ▼
Machine Code
   │
   ▼
POPCNT instruction
   │
   ▼
CPU
   │
   ▼
Result
```

---

# `__builtin_popcount()` নিজে CPU Instruction নয়

এটি খুব গুরুত্বপূর্ণ।

```cpp
__builtin_popcount(n)
```

একটি **compiler built-in**।

অন্যদিকে:

```text
POPCNT
```

একটি **CPU instruction**।

অর্থাৎ:

```text
__builtin_popcount()
        ↓
Compiler-level built-in

POPCNT
        ↓
CPU-level instruction
```

Compiler কিছু target architecture-এ built-in operation-টিকে POPCNT instruction-এ lower করতে পারে।

---

# সহজ উদাহরণ দিয়ে বোঝা যাক

ধরুন তুমি একজন Manager।

আর CPU হলো একজন Worker।

তুমি Worker-কে বললে:

> এই সংখ্যাটার binary representation-এ কতগুলো `1` আছে বের করো।

যদি Worker-এর কাছে কোনো বিশেষ ব্যবস্থা না থাকে, সে হয়তো একে একে bit check করবে:

```text
1101

প্রথম bit  → 1
দ্বিতীয় bit → 1
তৃতীয় bit → 0
চতুর্থ bit → 1

Total = 3
```

কিন্তু Worker-এর কাছে যদি এই কাজের জন্য hardware support থাকে, তাহলে একটি dedicated instruction দিয়ে operation-টি করা যেতে পারে।

CPU-এর `POPCNT` instruction-কে এই ধরনের specialized operation হিসেবে ভাবতে পারেন।

---

# POPCNT কি সব CPU-তে থাকে?

না।

এটি খুব গুরুত্বপূর্ণ।

সব CPU একই instruction set support করে না।

`POPCNT` নির্দিষ্ট CPU instruction-set extension-এর অংশ।

তাই কোনো program কোন instruction ব্যবহার করবে তা নির্ভর করতে পারে:

1. Target CPU architecture
2. Compiler
3. Compiler options
4. Optimization settings

এর উপর।

---

# CPU POPCNT Support না করলে কী হবে?

যদি target CPU-তে POPCNT instruction available না থাকে, compiler অন্য implementation ব্যবহার করতে পারে।

যেমন compiler এমন কোনো algorithm বা instruction sequence ব্যবহার করতে পারে যার মাধ্যমে একই result পাওয়া যায়।

অর্থাৎ:

```text
__builtin_popcount()
        │
        ├── POPCNT available
        │       ↓
        │   POPCNT instruction
        │
        └── POPCNT unavailable
                ↓
          অন্য implementation
```

তাই `__builtin_popcount()` ব্যবহার করলেই প্রতিবার hardware POPCNT instruction ব্যবহার হবে—এমন নিশ্চয়তা নেই।

---

# তাহলে `__builtin_popcount()` কি সত্যিই O(1)?

Fixed-width integer-এর ক্ষেত্রে **algorithmic complexity হিসেবে হ্যাঁ**।

ধরা যাক integer width:

```text
W = 32
```

তাহলে software implementation-এ সর্বোচ্চ 32 bit নিয়ে কাজ করতে হতে পারে।

সাধারণভাবে:

```text
O(W)
```

কিন্তু এখানে:

```text
W = constant
```

তাই:

```text
O(W) = O(1)
```

এটি একটি গুরুত্বপূর্ণ distinction।

---

# আরও Generalভাবে Complexity

ধরা যাক কোনো integer type-এর width `W` bit।

তাহলে একটি straightforward bit-by-bit popcount implementation-এর complexity হতে পারে:

```text
O(W)
```

যদি `W` fixed থাকে:

```text
W = 32
```

তাহলে:

```text
O(32) = O(1)
```

কিন্তু theoretical model-এ যদি `W` input-এর সঙ্গে বাড়তে পারে, তাহলে complexity-কে `O(W)` হিসেবে প্রকাশ করা বেশি উপযুক্ত।

তাই:

> `__builtin_popcount()`-কে `O(1)` বলা fixed-width machine integer-এর context-এ একটি practical algorithmic classification।

---

# `int`, `long`, এবং `long long`-এর Popcount

GCC/Clang built-ins-এ বিভিন্ন integer width-এর জন্য আলাদা function রয়েছে।

### `int`

```cpp
__builtin_popcount(x);
```

### `unsigned int`

```cpp
__builtin_popcount(x);
```

### `long`

```cpp
__builtin_popcountl(x);
```

### `long long`

```cpp
__builtin_popcountll(x);
```

উদাহরণ:

```cpp
long long n = 123456789;

cout << __builtin_popcountll(n);
```

---

# একটি ছোট Example

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 5;
    int b = 7;
    int c = 13;

    cout << __builtin_popcount(a) << '\n';
    cout << __builtin_popcount(b) << '\n';
    cout << __builtin_popcount(c) << '\n';

    return 0;
}
```

Binary:

```text
5  = 101   → 2
7  = 111   → 3
13 = 1101  → 3
```

Output:

```text
2
3
3
```

---

# Competitive Programming-এ কেন এত ব্যবহার হয়?

Bit Manipulation-এর problem-এ অনেক সময় জানতে হয়:

- কোনো number-এর কতগুলো set bit আছে
- কোনো mask-এ কতগুলো selected element আছে
- subset mask-এ কতগুলো element রয়েছে
- কোনো binary state-এ কতগুলো bit active

উদাহরণ:

```cpp
int mask = 13;

cout << __builtin_popcount(mask);
```

এখানে:

```text
13 = 1101
```

অর্থাৎ mask-এ তিনটি bit set আছে।

এটি bitmask-based algorithms-এ খুব useful।

---

# `__builtin_popcount()` এবং Set Bit

Bit-এর value:

```text
0 → unset bit
1 → set bit
```

তাই:

```text
13 = 1101
```

এখানে set bit:

```text
1 1 0 1
↑ ↑   ↑
```

মোট:

```text
3
```

তাই:

```cpp
__builtin_popcount(13)
```

ফিরিয়ে দেয়:

```text
3
```

---

# একটি গুরুত্বপূর্ণ পার্থক্য: Value বড় হলেই কাজ বেশি নয়

ধরুন:

```text
5
```

এবং:

```text
1,000,000
```

দুটি সংখ্যার numerical value অনেক আলাদা।

কিন্তু fixed-width integer হিসেবে তাদের storage width একই হতে পারে।

উদাহরণ:

```text
32-bit int
```

তাই bit width:

```text
32
```

সংখ্যা `5` হোক বা `1,000,000`, integer type-এর width পরিবর্তন হয় না।

এই কারণেই fixed-width integer-এর ক্ষেত্রে popcount-এর complexity numerical value-এর ওপর নির্ভর করে না।

---

# O(1) মানে কি এক CPU cycle?

না।

এটি খুব গুরুত্বপূর্ণ।

`O(1)` মানে:

> Input size বাড়ার সঙ্গে কাজের asymptotic growth constant।

`O(1)` মানেই:

> মাত্র ১টি CPU instruction

এমন নয়।

একটি operation একাধিক machine instruction নিতে পারে এবং তবুও algorithmically `O(1)` হতে পারে।

একইভাবে `POPCNT` instruction থাকলেও তার latency বা throughput processor architecture অনুযায়ী আলাদা হতে পারে।

তাই:

```text
O(1)
```

এবং:

```text
1 CPU cycle
```

একই বিষয় নয়।

---

# পুরো বিষয়টির Flow

একটি fixed-width integer-এর ক্ষেত্রে বিষয়টি এভাবে মনে রাখতে পারেন:

```text
Number
   │
   ▼
Binary Representation
   │
   ▼
Count the 1 bits
   │
   ▼
__builtin_popcount()
   │
   ▼
Compiler
   │
   ├── Hardware POPCNT available
   │          ↓
   │      POPCNT instruction
   │
   └── Otherwise
              ↓
       Alternative implementation
```

---

# সংক্ষেপে পুরো বিষয়টি

`__builtin_popcount()` কোনো integer-এর binary representation-এ কতগুলো `1` bit আছে তা count করে।

যেমন:

```text
13 = 1101
```

তাই:

```cpp
__builtin_popcount(13)
```

এর result:

```text
3
```

Fixed-width integer-এর ক্ষেত্রে bit width constant হওয়ায় straightforward bit-by-bit কাজের complexity:

```text
O(W)
```

এবং `W` constant হলে:

```text
O(1)
```

Modern কিছু CPU-তে `POPCNT` নামে hardware instruction রয়েছে। Compiler target architecture এবং compilation settings অনুযায়ী `__builtin_popcount()`-এর operation-কে সেই instruction-এ compile করতে পারে।

তবে `__builtin_popcount()` নিজে CPU instruction নয় এবং এটি ব্যবহার করলেই সব CPU-তে অবশ্যই `POPCNT` instruction ব্যবহৃত হবে—এমন নিশ্চয়তা নেই।

---

# Final Takeaway

সবচেয়ে গুরুত্বপূর্ণ বিষয়গুলো:

### 1. `__builtin_popcount()` কী?

```cpp
__builtin_popcount(n)
```

`n`-এর binary representation-এ কতগুলো `1` bit আছে তা count করে।

### 2. `13`-এর ক্ষেত্রে কী হবে?

```text
13 = 1101
```

তাই:

```cpp
__builtin_popcount(13)
```

ফলাফল:

```text
3
```

### 3. কেন `O(1)`?

Fixed-width integer-এর bit সংখ্যা constant।

32-bit example-এ সর্বোচ্চ 32টি bit নিয়ে কাজ করতে হয়:

```text
O(32) = O(1)
```

আর general fixed-width type-এর জন্য:

```text
O(W) = O(1)
```

যেখানে `W` constant।

### 4. POPCNT কী?

`POPCNT` হলো কিছু CPU architecture-এ থাকা Population Count instruction, যা set bit count করার জন্য hardware-level operation প্রদান করে।

### 5. `__builtin_popcount()` কি POPCNT?

না।

```text
__builtin_popcount()
        ↓
Compiler built-in

POPCNT
        ↓
CPU instruction
```

Compiler উপযুক্ত target-এর ক্ষেত্রে built-in operation-টিকে POPCNT instruction-এ compile করতে পারে।

### 6. সব সময় POPCNT ব্যবহার হয়?

না।

এটি compiler, target CPU, architecture এবং compilation options-এর উপর নির্ভর করতে পারে।

### 7. `O(1)` মানে কি এক instruction?

না।

`O(1)` asymptotic complexity বোঝায়। এটি নির্দিষ্ট CPU instruction count বা CPU cycle count বোঝায় না।

---

# YouTube Video

<div class="youtube-embed">
  <iframe
    src="https://www.youtube.com/embed/OD8raB3l0o4?si=wV-rgl857u3OGjlG"
    title="How a Server Actually Crashes"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

th,
td {
  border: 1px solid #ccc;
  padding: 12px 16px;
}

th {
  font-weight: 700;
  text-align: left;
}

.youtube-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 2rem 0;
  overflow: hidden;
  border-radius: 12px;
}

.youtube-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
