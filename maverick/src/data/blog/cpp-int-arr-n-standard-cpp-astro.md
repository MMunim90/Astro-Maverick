---
title: 'C++-এ int arr[n] কেন Standard C++ নয়?'
description: 'Runtime-এ জানা n দিয়ে int arr[n] লেখা কেন Standard C++-এর অংশ নয়, GCC কেন এটি গ্রহণ করে, VLA কী এবং কেন vector<int> arr(n) ব্যবহার করা উচিত—সহজ উদাহরণসহ জানুন।'
pubDate: 2026-10-04
tags: ['C++', 'Array', 'Vector', 'VLA', 'Standard-C++', 'GCC', 'Programming']
---


C++ শেখার সময় একটি খুব common code দেখা যায়:

```cpp
int n;
cin >> n;

int arr[n];
```

GCC compiler-এ এই code অনেক সময় compile হয়ে যায়। তাই স্বাভাবিকভাবেই প্রশ্ন আসে:

> তাহলে `int arr[n]` কি Standard C++?

**উত্তর: না—যদি `n` runtime-এ জানা যায়।**

C++-এর built-in array-এর size compile time-এ নির্ধারিত constant expression হতে হয়। Runtime-এ জানা size-এর জন্য Standard C++-এ `std::vector` ব্যবহার করা হয়।

---

# Case 1: এটি Standard C++

```cpp
int arr[5];
```

এখানে array-এর size `5`। Compiler compile করার সময়ই জানে যে array-তে ৫টি `int` element থাকবে।

তাই এটি সম্পূর্ণ valid Standard C++:

```cpp
int arr[5];

arr[0] = 10;
arr[1] = 20;
```

---

# Case 2: এটি Standard C++ নয়

```cpp
int n;
cin >> n;

int arr[n];
```

এখানে `n`-এর value runtime-এ input নেওয়ার পরে জানা যাচ্ছে।

যেমন user দিতে পারে `5`, `100`, অথবা `100000`।

Compiler যখন source code compile করছে, তখন সে জানে না user পরে কোন value input দেবে।

এই ধরনের runtime-sized built-in array-কে সাধারণভাবে **Variable Length Array (VLA)** বলা হয়। C++ Standard VLA-কে standard feature হিসেবে সমর্থন করে না।

---

# কেন Standard C++ এটি অনুমতি দেয় না?

C++-এর built-in array-এর bound একটি compile-time constant expression হতে পারে।

```cpp
int arr[10];
```

এখানে `10` compile time-এই জানা আছে।

অন্যদিকে:

```cpp
int n;
cin >> n;

int arr[n];
```

এখানে `n`-এর value compile time-এ জানা নেই।

সহজভাবে:

```text
Compile time
     ↓
Compiler code তৈরি করছে
     ↓
n-এর value এখনো জানা নেই
     ↓
User পরে input দেবে
     ↓
Runtime-এ n জানা যাবে
```

তাই runtime value দিয়ে built-in array-এর size নির্ধারণ করা Standard C++-এর নিয়মের মধ্যে পড়ে না।

---

# তাহলে GCC-তে কোডটি চলে কেন?

GCC কিছু ক্ষেত্রে compiler extension হিসেবে VLA support করে।

তাই:

```cpp
int n;
cin >> n;

int arr[n];
```

GCC-তে compile হতে পারে।

কিন্তু GCC-তে compile হওয়া মানেই এটি Standard C++ নয়।

```text
GCC-তে কাজ করে
        ≠
Standard C++ feature
```

Compiler যদি অতিরিক্ত কোনো feature দেয়, সেটি language standard-এর অংশ নাও হতে পারে।

---

# Compiler Extension কী?

Compiler extension হলো এমন কোনো অতিরিক্ত feature যা compiler নিজের পক্ষ থেকে support করে, কিন্তু official language standard-এর অংশ নয়।

ধরুন কোনো compiler এমন code accept করল:

```cpp
int n;
cin >> n;

int arr[n];
```

এতে প্রমাণ হয় না যে code-টি Standard C++।

একই code অন্য compiler-এ compile নাও হতে পারে।

---

# অন্য Compiler-এ কী হতে পারে?

VLA Standard C++ feature না হওয়ায় compiler ভেদে behavior আলাদা হতে পারে।

বিশেষ করে:

- Microsoft Visual C++ (MSVC)
- strict Standard C++ compilation
- অন্য কিছু compiler/configuration

এগুলোতে:

```cpp
int arr[n];
```

compile error হতে পারে।

তাই portable C++ code লেখার সময় compiler-specific extension-এর ওপর নির্ভর না করাই ভালো।

---

# Standard C++-এ কী ব্যবহার করব?

Runtime-এ array-এর size জানা গেলে সাধারণত:

```cpp
std::vector
```

ব্যবহার করা হয়।

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> arr(n);

    return 0;
}
```

এখানে `n` runtime-এ জানা গেলেও কোনো সমস্যা নেই।

---

# `vector` কেন কাজ করে?

`vector` হলো C++ Standard Library-এর একটি dynamic sequence container।

যখন আমরা লিখি:

```cpp
vector<int> arr(n);
```

তখন `n` runtime-এ জানা যেতে পারে।

উদাহরণ:

```text
User input
    ↓
n = 100000
    ↓
vector<int> arr(n)
    ↓
100000টি int element-এর জন্য storage
```

এটি Standard C++-এর valid ব্যবহার।

---

# Built-in Array বনাম Vector

### Built-in Array

```cpp
int arr[5];
```

এখানে size `5` compile time-এই জানা আছে।

### Vector

```cpp
int n;
cin >> n;

vector<int> arr(n);
```

এখানে size `n` runtime-এ জানা যাচ্ছে।

তাই runtime-sized collection-এর জন্য `vector` বেশি উপযুক্ত।

---

# `const` কী?

অনেক সময় এই code-টিও দেখা যায়:

```cpp
const int n = 10;

int arr[n];
```

এখানে `n` একটি constant এবং তার value compile time-এ জানা যায়। তাই এই ধরনের code Standard C++-এ valid।

আরও explicit ভাবে:

```cpp
constexpr int n = 10;
int arr[n];
```

`constexpr` compile-time constant প্রকাশ করার জন্য ব্যবহার করা যায়।

---

# কিন্তু `const` সব সময় যথেষ্ট নয়

শুধু `const` লিখলেই runtime value compile-time constant হয়ে যায় না।

যেমন:

```cpp
int getSize();

const int n = getSize();

int arr[n];
```

এখানে `n`-এর value function call-এর result থেকে আসছে।

এটি compile-time constant expression নয়। তাই Standard C++-এ runtime-sized collection-এর জন্য `vector` ব্যবহার করা উচিত।

---

# একটি সহজ তুলনা

ধরুন একটি box আছে।

### Built-in Array

```cpp
int arr[10];
```

এখানে box বানানোর আগেই বলা হচ্ছে:

> এই box-এ ঠিক ১০টি slot থাকবে।

### Vector

```cpp
vector<int> arr(n);
```

এখানে বলা হচ্ছে:

> Runtime-এ `n` যত হবে, সেই অনুযায়ী collection তৈরি করো।

এই কারণেই dynamic size-এর জন্য `vector` বেশি উপযুক্ত।

---

# Competitive Programming-এ অনেকে `int arr[n]` কেন লেখে?

Competitive Programming-এ আপনি অনেক সময় দেখতে পারেন:

```cpp
int n;
cin >> n;

int arr[n];
```

এর একটি কারণ হলো অনেক online judge GCC-based environment ব্যবহার করে। GCC কিছু compiler extension support করতে পারে, ফলে code compile হয়ে যায়।

কিন্তু competitive programming environment-এ code compile হওয়া এবং code-টি **strictly Standard C++** হওয়া একই বিষয় নয়।

Standard C++ শেখার ক্ষেত্রে:

```cpp
vector<int> arr(n);
```

ব্যবহার করার অভ্যাস করা ভালো।

---

# Interview বা Production Code-এ কী লিখব?

যদি array-এর size runtime-এ জানা যায়:

```cpp
int n;
cin >> n;

vector<int> arr(n);
```

এটি Standard C++ এবং portable code লেখার জন্য উপযুক্ত।

---

# Built-in Array এবং Vector-এর তুলনা

| বৈশিষ্ট্য | Built-in Array | `vector` |
|---|---|---|
| উদাহরণ | `int arr[10];` | `vector<int> arr(n);` |
| Size | সাধারণত compile time-এ নির্ধারিত | runtime-এ নির্ধারণ করা যায় |
| Runtime size | Standard C++-এ নয় | হ্যাঁ |
| Dynamic resizing | নেই | আছে |
| Standard C++ | হ্যাঁ | হ্যাঁ |
| ব্যবহার | fixed-size data | runtime-sized data |

---

# `int arr[n]` বনাম `vector<int> arr(n)`

সবচেয়ে গুরুত্বপূর্ণ পার্থক্যটি এখানে:

```cpp
int n;
cin >> n;

int arr[n];
```

এটি Standard C++ নয়, কারণ `n` runtime-এ জানা যাচ্ছে।

অন্যদিকে:

```cpp
int n;
cin >> n;

vector<int> arr(n);
```

এটি Standard C++।

তাই runtime-sized collection-এর ক্ষেত্রে `vector` ব্যবহার করা উচিত।

---

# একটি ছোট সম্পূর্ণ উদাহরণ

## Non-standard VLA-style code

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int arr[n];

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    return 0;
}
```

এই code কিছু compiler-এ extension হিসেবে কাজ করতে পারে, কিন্তু এটি Standard C++ নয়।

## Standard C++ code

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    return 0;
}
```

এখানে `vector<int> arr(n);` ব্যবহার করা হয়েছে, যা runtime size-এর জন্য Standard C++ approach।

---

# খুব সহজভাবে মনে রাখুন

```text
Fixed size
    ↓
int arr[10];
    ↓
Standard C++

Runtime size
    ↓
int n;
cin >> n;
vector<int> arr(n);
    ↓
Standard C++
```

আর:

```cpp
int n;
cin >> n;

int arr[n];
```

এটি GCC-তে কাজ করতে পারে, কিন্তু **Standard C++ নয়**।

---

# Final Takeaway

`int arr[n]` তখনই সমস্যাযুক্ত যখন `n` runtime-এ জানা যায়।

```cpp
int arr[10];
```

এখানে `10` compile-time constant, তাই এটি Standard C++।

কিন্তু:

```cpp
int n;
cin >> n;

int arr[n];
```

এখানে `n` runtime-এ জানা যাচ্ছে। এই ধরনের Variable Length Array C++ Standard-এর অংশ নয়, যদিও কিছু compiler extension হিসেবে এটি support করতে পারে।

Runtime size-এর জন্য Standard C++-এ সাধারণত:

```cpp
vector<int> arr(n);
```

ব্যবহার করুন।

সংক্ষেপে:

| Code | Standard C++? |
|---|---|
| `int arr[10];` | ✅ হ্যাঁ |
| `const int n = 10; int arr[n];` | ✅ হ্যাঁ |
| `int n; cin >> n; int arr[n];` | ❌ না |
| `vector<int> arr(n);` | ✅ হ্যাঁ |

**মূল কথা:** Compiler কোনো code accept করলেই সেটি Standard C++ হয়ে যায় না। Compiler extension এবং language standard—এই দুটিকে আলাদা করে বুঝতে হবে।

---

# YouTube Video

<div class="youtube-embed">
  <iframe
    src="https://www.youtube.com/embed/weeOGJGzhYo?si=MlyyNXreO8na1Sb7"
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
