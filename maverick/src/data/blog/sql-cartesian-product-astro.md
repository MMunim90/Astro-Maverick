---
title: 'SQL-এ Cartesian Product কী?'
description: 'SQL-এর Cartesian Product কীভাবে তৈরি হয়, CROSS JOIN কীভাবে কাজ করে, কেন result দ্রুত বড় হয়ে যায় এবং কখন এটি ব্যবহার করা হয়—সহজ উদাহরণসহ জানুন।'
pubDate: 2026-10-03
tags: ['SQL', 'ডেটাবেস', 'Cartesian-Product', 'CROSS-JOIN', 'JOIN', 'ডেটা-কোয়েরি']
---

# SQL-এ Cartesian Product কী?

**Cartesian Product** হলো SQL-এর এমন একটি result যেখানে একটি table-এর প্রতিটি row অন্য একটি table-এর প্রতিটি row-এর সঙ্গে combine হয়।

অর্থাৎ, কোনো নির্দিষ্ট matching condition ছাড়াই দুইটি table-এর সব possible combination তৈরি হয়।

SQL-এ Cartesian Product তৈরি করার সবচেয়ে সরাসরি উপায় হলো:

```sql
CROSS JOIN
```

সহজভাবে মনে রাখতে পারো:

> **এক table-এর প্রতিটি row অন্য table-এর প্রতিটি row-এর সঙ্গে combine হবে।**

---

# সহজভাবে Cartesian Product বোঝা

ধরো, তোমার কাছে দুইটি table আছে।

## Table A — Colors

| Color |
|---|
| Red |
| Blue |

এখানে মোট row:

```text
2
```

## Table B — Shapes

| Shape |
|---|
| Circle |
| Square |

এখানেও মোট row:

```text
2
```

এখন যদি এই দুইটি table-এর Cartesian Product তৈরি করা হয়, তাহলে `Colors` table-এর প্রতিটি color, `Shapes` table-এর প্রতিটি shape-এর সঙ্গে combine হবে।

Result:

| Color | Shape |
|---|---|
| Red | Circle |
| Red | Square |
| Blue | Circle |
| Blue | Square |

এখানে মোট combination:

```text
2 × 2 = 4
```

---

# কেন ৪টি Row তৈরি হলো?

এটি ধাপে ধাপে দেখলে আরও সহজ হবে।

প্রথমে `Red`:

```text
Red + Circle
Red + Square
```

অর্থাৎ `Red` থেকে ২টি combination।

এরপর `Blue`:

```text
Blue + Circle
Blue + Square
```

অর্থাৎ `Blue` থেকেও ২টি combination।

তাই মোট:

```text
2 + 2 = 4
```

অথবা সরাসরি:

```text
2 × 2 = 4
```

---

# SQL-এ Cartesian Product কীভাবে তৈরি হয়?

SQL-এ `CROSS JOIN` ব্যবহার করলে Cartesian Product তৈরি করা যায়।

```sql
SELECT *
FROM Colors
CROSS JOIN Shapes;
```

Result হবে:

| Color | Shape |
|---|---|
| Red | Circle |
| Red | Square |
| Blue | Circle |
| Blue | Square |

এখানে কোনো `ON` condition নেই।

---

# CROSS JOIN কেন এমন Result তৈরি করে?

সাধারণ `INNER JOIN` বা অন্যান্য join-এর ক্ষেত্রে আমরা সাধারণত একটি matching condition ব্যবহার করি।

উদাহরণ:

```sql
SELECT *
FROM Students
JOIN Departments
    ON Students.department_id = Departments.id;
```

এখানে `ON` condition বলে দেয় কোন row-এর সঙ্গে কোন row match করবে।

কিন্তু `CROSS JOIN`-এ এমন কোনো matching condition দেওয়া হয় না।

```sql
SELECT *
FROM Colors
CROSS JOIN Shapes;
```

তাই database সব possible combination তৈরি করে।

---

# Cartesian Product-এর Row Count কীভাবে হিসাব করব?

এটি মনে রাখার জন্য একটি খুব সহজ rule আছে।

যদি:

```text
Table A = M rows
Table B = N rows
```

তাহলে Cartesian Product-এর সম্ভাব্য row সংখ্যা:

```text
M × N
```

উদাহরণ:

```text
Table A = 10 rows
Table B = 5 rows

10 × 5 = 50 rows
```

অর্থাৎ result-এ ৫০টি combination তৈরি হবে।

---

# বাস্তব উদাহরণ — Students এবং Subjects

ধরো একটি school-এ আছে:

```text
10 Students
5 Subjects
```

এখন যদি প্রত্যেক student-এর সঙ্গে প্রত্যেক subject-এর combination তৈরি করতে চাও, তাহলে:

```text
10 × 5 = 50
```

অর্থাৎ মোট ৫০টি combination পাওয়া যাবে।

SQL:

```sql
SELECT *
FROM Students
CROSS JOIN Subjects;
```

ধরো Students table:

| Student |
|---|
| Rahim |
| Karim |
| Nusrat |

আর Subjects:

| Subject |
|---|
| Math |
| English |

তাহলে result হবে:

| Student | Subject |
|---|---|
| Rahim | Math |
| Rahim | English |
| Karim | Math |
| Karim | English |
| Nusrat | Math |
| Nusrat | English |

এখানে:

```text
3 × 2 = 6
```

টি combination তৈরি হয়েছে।

---

# একটি গুরুত্বপূর্ণ বিষয়: Cartesian Product সব সময় ভুল নয়

অনেক সময় Cartesian Product-কে শুধু "ভুল JOIN" হিসেবে দেখা হয়।

আসলে এটি সব সময় ভুল নয়।

কিছু নির্দিষ্ট problem-এ প্রতিটি possible combination দরকার হতে পারে।

যেমন:

- Product ও available colors-এর সব combination
- Students ও subjects-এর সব possible pairing
- Calendar-এর date এবং time slot-এর combination
- বিভিন্ন configuration-এর সম্ভাব্য combination
- Test case generation

উদাহরণ:

ধরো তোমার কাছে:

```text
3 Colors
2 Sizes
```

তাহলে একটি product-এর সম্ভাব্য combination:

```text
3 × 2 = 6
```

এক্ষেত্রে Cartesian Product ইচ্ছাকৃতভাবেই ব্যবহার করা যেতে পারে।

---

# ভুল করে Cartesian Product তৈরি হওয়ার সমস্যা

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, কখনো কখনো developer ভুল করে Cartesian Product তৈরি করে ফেলতে পারে।

ধরো তোমার কাছে:

```text
1,000 Students
```

এবং:

```text
500 Courses
```

যদি ভুল করে Cartesian Product তৈরি হয়:

```text
1,000 × 500
= 500,000 rows
```

অর্থাৎ মাত্র দুইটি table থেকেও ৫ লাখ combination তৈরি হতে পারে।

আর যদি table বড় হয়:

```text
100,000 × 100,000
= 10,000,000,000
```

অর্থাৎ:

```text
10 billion combinations
```

এতে query অত্যন্ত expensive হয়ে যেতে পারে।

---

# JOIN Condition ভুলে গেলে কী হতে পারে?

ধরো তুমি আসলে student এবং department-এর matching information চেয়েছিলে।

সঠিক query:

```sql
SELECT *
FROM Students
JOIN Departments
    ON Students.department_id = Departments.id;
```

কিন্তু ভুল করে যদি এমন query লেখা হয়:

```sql
SELECT *
FROM Students
JOIN Departments;
```

তাহলে database system অনুযায়ী এটি implicit cross join বা Cartesian product-এর মতো behavior দিতে পারে, অথবা syntax error দিতে পারে।

তাই join করার সময় matching condition সঠিকভাবে দেওয়া অত্যন্ত গুরুত্বপূর্ণ।

---

# Cartesian Product বনাম INNER JOIN

দুটিকে পাশাপাশি দেখলে পার্থক্য আরও পরিষ্কার হবে।

## Cartesian Product

```sql
SELECT *
FROM Students
CROSS JOIN Departments;
```

এখানে:

```text
Every Student
      ↓
Every Department
```

সব possible combination তৈরি হবে।

---

## INNER JOIN

```sql
SELECT *
FROM Students
INNER JOIN Departments
    ON Students.department_id = Departments.id;
```

এখানে:

```text
Student Department ID
        ↓
Matching Department ID
        ↓
Matching Rows
```

শুধু matching rows result-এ আসবে।

---

# সহজ একটি Visual Flow

Cartesian Product:

```text
Colors                 Shapes

Red      ───────────┬──> Circle
                    └──> Square

Blue     ───────────┬──> Circle
                    └──> Square
```

অর্থাৎ:

```text
Red  → Circle
Red  → Square

Blue → Circle
Blue → Square
```

---

# Cartesian Product-এর Formula

যদি:

```text
A table-এ = M rows
B table-এ = N rows
```

তাহলে:

```text
Cartesian Product = M × N
```

উদাহরণ:

```text
A = 4 rows
B = 3 rows

4 × 3 = 12
```

Result-এ ১২টি combination তৈরি হবে।

---

# Multiple Table-এর ক্ষেত্রে কী হবে?

ধরো তিনটি table আছে:

```text
Colors  = 3 rows
Sizes   = 4 rows
Shapes  = 2 rows
```

সবগুলোর Cartesian Product করলে:

```text
3 × 4 × 2 = 24
```

টি possible combination তৈরি হবে।

SQL:

```sql
SELECT *
FROM Colors
CROSS JOIN Sizes
CROSS JOIN Shapes;
```

এখানে result দ্রুত বড় হয়ে যেতে পারে।

এ কারণেই Cartesian Product ব্যবহার করার আগে result size সম্পর্কে ধারণা থাকা গুরুত্বপূর্ণ।

---

# কখন CROSS JOIN ব্যবহার করব?

`CROSS JOIN` তখন ব্যবহার করা যেতে পারে যখন সত্যিই সব possible combination দরকার।

উদাহরণ:

```sql
SELECT
    Colors.color,
    Sizes.size
FROM Colors
CROSS JOIN Sizes;
```

যদি:

```text
Colors = 4
Sizes = 3
```

তাহলে:

```text
4 × 3 = 12 combinations
```

পাওয়া যাবে।

---

# কখন Cartesian Product Avoid করা উচিত?

যদি তোমার উদ্দেশ্য হয় শুধু matching records খুঁজে বের করা, তাহলে সাধারণত `CROSS JOIN` ব্যবহার করা উচিত নয়।

উদাহরণ:

```text
Student
   ↓
Department
```

যদি student-এর department বের করতে চাও, তাহলে matching key ব্যবহার করা উচিত:

```sql
SELECT *
FROM Students
JOIN Departments
    ON Students.department_id = Departments.id;
```

এতে অপ্রয়োজনীয় combination তৈরি হবে না।

---

# Performance-এর উপর প্রভাব

Cartesian Product-এর সবচেয়ে বড় সমস্যা হলো result দ্রুত বিশাল হয়ে যেতে পারে।

ধরো:

```text
Table A = 50,000 rows
Table B = 20,000 rows
```

তাহলে theoretical Cartesian Product:

```text
50,000 × 20,000
= 1,000,000,000
```

অর্থাৎ ১ বিলিয়ন combination।

এমন query database-এর উপর অত্যন্ত বড় workload তৈরি করতে পারে।

তাই বড় table-এর ক্ষেত্রে ভুলভাবে Cartesian Product তৈরি হলে:

- Query অনেক slow হতে পারে
- CPU usage বাড়তে পারে
- Memory usage বাড়তে পারে
- Temporary storage ব্যবহার হতে পারে
- Network-এ বড় result পাঠাতে হতে পারে
- Application-এর response time বেড়ে যেতে পারে

---

# একটি Common Mistake

ধরো দুইটি table:

```text
Users
Orders
```

তুমি user এবং তার order information বের করতে চাও।

ভুল approach:

```sql
SELECT *
FROM Users
CROSS JOIN Orders;
```

এতে প্রতিটি user-এর সঙ্গে প্রতিটি order combine হবে।

সঠিক approach সাধারণত এমন হতে পারে:

```sql
SELECT *
FROM Users
JOIN Orders
    ON Users.id = Orders.user_id;
```

এখানে user ID এবং order-এর user ID match করা হচ্ছে।

---

# Cartesian Product মনে রাখার সহজ উপায়

একটি ছোট বাক্য মনে রাখো:

> **Cartesian Product = Every row × Every row**

অথবা:

> **এক table-এর প্রতিটি row অন্য table-এর প্রতিটি row-এর সঙ্গে combine হবে।**

যদি:

```text
A = 10 rows
B = 5 rows
```

তাহলে:

```text
10 × 5 = 50
```

---

# সংক্ষেপে

Cartesian Product হলো এমন একটি result যেখানে দুইটি table-এর প্রতিটি row একে অপরের প্রতিটি row-এর সঙ্গে combine হয়।

SQL-এ এটি সরাসরি তৈরি করা যায়:

```sql
SELECT *
FROM TableA
CROSS JOIN TableB;
```

যদি:

```text
Table A = M rows
Table B = N rows
```

তাহলে সম্ভাব্য result:

```text
M × N rows
```

তাই:

- `CROSS JOIN` ইচ্ছাকৃতভাবে Cartesian Product তৈরি করতে পারে।
- সব possible combination দরকার হলে এটি useful।
- ভুল JOIN condition-এর কারণে অনিচ্ছাকৃত Cartesian Product তৈরি হতে পারে।
- বড় table-এর ক্ষেত্রে result খুব দ্রুত বিশাল হয়ে যেতে পারে।
- Matching records দরকার হলে সাধারণত appropriate `JOIN ... ON ...` condition ব্যবহার করা উচিত।

---

# Final Takeaway

**Cartesian Product মানে হলো দুইটি table-এর সব possible row combination তৈরি করা।**

সহজভাবে:

```text
Table A       Table B
   ↓             ↓
Every Row × Every Row
          ↓
Cartesian Product
```

আর সবচেয়ে গুরুত্বপূর্ণ formula:

```text
Rows in Result = Rows in Table A × Rows in Table B
```

তাই query লেখার সময় সব সময় খেয়াল রাখতে হবে—তুমি কি সত্যিই সব possible combination চাচ্ছ, নাকি শুধু matching rows চাচ্ছ?

---

# YouTube Video

<div class="youtube-embed">
  <iframe
    src="https://www.youtube.com/embed/XVyp7asegfY?si=FViOW7GiHpecWCvG"
    title="How a Server Actually Crashes"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

<style>
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