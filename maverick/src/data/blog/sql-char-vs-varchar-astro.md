---
title: 'SQL-এ CHAR এবং VARCHAR-এর মধ্যে পার্থক্য'
description: 'SQL-এর CHAR ও VARCHAR data type কীভাবে কাজ করে, fixed-length ও variable-length string-এর পার্থক্য, উদাহরণ এবং কখন কোনটি ব্যবহার করতে হবে তা সহজভাবে জানুন।'
pubDate: 2026-10-03
tags: ['SQL', 'ডেটাবেস', 'CHAR', 'VARCHAR', 'ডেটা-টাইপ', 'প্রোগ্রামিং']
---

# SQL-এ CHAR এবং VARCHAR-এর মধ্যে পার্থক্য

SQL-এ `CHAR` এবং `VARCHAR`—দুটিই string বা text data সংরক্ষণের জন্য ব্যবহৃত data type। তবে এদের মধ্যে মূল পার্থক্য হলো, `CHAR` fixed-length string-এর জন্য এবং `VARCHAR` variable-length string-এর জন্য ব্যবহৃত হয়।

সহজভাবে বললে, `CHAR`-এ নির্দিষ্ট দৈর্ঘ্য ধরে রাখা হয়, আর `VARCHAR`-এ সংরক্ষিত string-এর দৈর্ঘ্য অনুযায়ী জায়গা ব্যবহার হয়। তবে বাস্তবে storage-এর আচরণ database system এবং character encoding-এর উপর নির্ভর করতে পারে।

---

## 1. CHAR কী?

SQL-এ `CHAR` হলো fixed-length character data type। এটি নির্দিষ্ট দৈর্ঘ্যের string সংরক্ষণের জন্য ব্যবহার করা হয়।

### Syntax

```sql
CHAR(n)
```

এখানে `n` হলো নির্ধারিত character length।

উদাহরণ:

```sql
name CHAR(10)
```

ধরো, এই column-এ `Munim` সংরক্ষণ করা হলো। String-টির দৈর্ঘ্য ৫টি character, কিন্তু column-এর নির্ধারিত দৈর্ঘ্য ১০।

অনেক SQL database-এ `CHAR(10)`-এর মতো fixed-length column-এ ছোট string-এর বাকি অংশ space দিয়ে পূরণ করা হয়।

Conceptually:

```text
Input:  "Munim"
CHAR(10): "Munim     "
```

Database system অনুযায়ী trailing space সংরক্ষণ, তুলনা এবং query result-এ দেখানোর আচরণ কিছুটা আলাদা হতে পারে।

---

## CHAR-এর বৈশিষ্ট্য

- Fixed-length string-এর জন্য ব্যবহৃত হয়।
- নির্ধারিত দৈর্ঘ্যের তুলনায় ছোট value হলে সাধারণত trailing space padding করা হয়।
- একই ধরনের নির্দিষ্ট দৈর্ঘ্যের data-এর ক্ষেত্রে উপযোগী হতে পারে।
- `CHAR` সব ক্ষেত্রে `VARCHAR`-এর চেয়ে দ্রুত—এমন নয়; performance database system এবং workload-এর উপর নির্ভর করে।

### CHAR-এর সম্ভাব্য ব্যবহার

- Gender code: `M`, `F`
- Country code: `BD`, `US`
- নির্দিষ্ট দৈর্ঘ্যের status code
- Fixed-format identifier বা code

তবে `YES`/`NO`, postal code বা verification code-এর মতো data-এর ক্ষেত্রে প্রকৃত format এবং validation rule অনুযায়ী data type বেছে নেওয়া উচিত।

---

## 2. VARCHAR কী?

`VARCHAR` হলো variable-length character data type। এটি পরিবর্তনশীল দৈর্ঘ্যের string সংরক্ষণের জন্য ব্যবহৃত হয়।

### Syntax

```sql
VARCHAR(n)
```

এখানে `n` হলো সর্বোচ্চ অনুমোদিত দৈর্ঘ্য। সঠিক limit এবং দৈর্ঘ্য গণনার নিয়ম database system অনুযায়ী ভিন্ন হতে পারে।

উদাহরণ:

```sql
name VARCHAR(10)
```

এখন `Munim` সংরক্ষণ করলে string-টির দৈর্ঘ্য ৫টি character। `VARCHAR` সাধারণত string-এর দৈর্ঘ্য অনুযায়ী storage ব্যবহার করে, সঙ্গে length metadata-এর জন্য কিছু অতিরিক্ত storage লাগতে পারে।

```text
Input: "Munim"
VARCHAR(10): "Munim"
```

এখানে `CHAR(10)`-এর মতো নির্ধারিত দৈর্ঘ্য পর্যন্ত space padding সাধারণত করা হয় না।

---

## VARCHAR-এর বৈশিষ্ট্য

- Variable-length string-এর জন্য ব্যবহৃত হয়।
- সংরক্ষিত value-এর দৈর্ঘ্য পরিবর্তন হতে পারে।
- সাধারণত string-এর দৈর্ঘ্য অনুযায়ী storage ব্যবহার করে।
- `CHAR`-এর তুলনায় সব সময় কম storage বা বেশি performance দেবে—এমন নিশ্চয়তা নেই।

### VARCHAR-এর সম্ভাব্য ব্যবহার

- মানুষের নাম
- Email address
- Address
- Product name
- Description
- Username

এ ধরনের data-এর দৈর্ঘ্য সাধারণত একেক রকম হয়, তাই `VARCHAR` প্রায়ই উপযোগী।

---

## 3. CHAR বনাম VARCHAR — সহজ উদাহরণ

ধরো, তোমার কাছে ১০ ঘরের একটি box আছে।

- `CHAR(10)` হলো এমন একটি box, যেখানে নির্ধারিত দৈর্ঘ্য ১০টি character।
- `VARCHAR(10)` হলো এমন একটি box, যেখানে সর্বোচ্চ ১০টি character রাখা যাবে, কিন্তু value ছোট হলে সাধারণত অতিরিক্ত জায়গা padding করতে হয় না।

ধরো, value হলো `Munim`:

```text
CHAR(10)     → "Munim     "
VARCHAR(10)  → "Munim"
```

এটি বোঝানোর জন্য একটি conceptual example। প্রকৃত storage implementation database অনুযায়ী আলাদা হতে পারে।

---

## 4. Example Table

নিচের SQL statement-এ `CHAR` এবং `VARCHAR` একসঙ্গে ব্যবহার করা হয়েছে।

```sql
CREATE TABLE student (
    id INT,
    gender CHAR(1),
    name VARCHAR(50)
);
```

এখানে:

- `id INT` → student-এর numeric identifier
- `gender CHAR(1)` → এক character-এর code, যেমন `M` বা `F`
- `name VARCHAR(50)` → সর্বোচ্চ ৫০ character-এর name

উদাহরণ data:

```sql
INSERT INTO student (id, gender, name)
VALUES
    (1, 'M', 'Munim'),
    (2, 'F', 'Nusrat'),
    (3, 'M', 'Rahim');
```

এখানে `gender`-এর দৈর্ঘ্য নির্দিষ্ট, কিন্তু `name`-এর দৈর্ঘ্য একেক row-তে একেক রকম হতে পারে।

**নোট:** `gender`-এর জন্য `CHAR(1)` কেবল একটি উদাহরণ। বাস্তব application-এ কী ধরনের value অনুমোদিত হবে, তা schema design-এর সময় স্পষ্টভাবে নির্ধারণ করা উচিত।

---

## 5. CHAR এবং VARCHAR-এর তুলনা

| বৈশিষ্ট্য | CHAR | VARCHAR |
|---|---|---|
| String length | Fixed-length | Variable-length |
| Length declaration | `CHAR(n)` | `VARCHAR(n)` |
| ছোট value | সাধারণত space দিয়ে padding করা হয় | সাধারণত padding করা হয় না |
| সম্ভাব্য storage | নির্ধারিত দৈর্ঘ্যের সঙ্গে সম্পর্কিত | value-এর দৈর্ঘ্য ও metadata-এর সঙ্গে সম্পর্কিত |
| উপযুক্ত উদাহরণ | নির্দিষ্ট format-এর code | নাম, email, address |
| Performance | সব ক্ষেত্রে দ্রুত নয় | সব ক্ষেত্রে ধীর নয় |

---

## 6. কখন CHAR ব্যবহার করব?

যখন data-এর দৈর্ঘ্য নির্দিষ্ট এবং সাধারণত একই থাকে, তখন `CHAR` বিবেচনা করা যেতে পারে।

উদাহরণ:

```sql
country_code CHAR(2)
```

এখানে country code-এর format যদি সব সময় দুই character-এর হয়, তাহলে `CHAR(2)` একটি সম্ভাব্য পছন্দ।

আরেকটি উদাহরণ:

```sql
gender_code CHAR(1)
```

এখানে একটি character দিয়ে code প্রকাশ করা হচ্ছে।

তবে শুধু data ছোট বলেই `CHAR` ব্যবহার করতে হবে, এমন কোনো নিয়ম নেই। Database-এর behavior, validation এবং application-এর requirement বিবেচনা করা উচিত।

---

## 7. কখন VARCHAR ব্যবহার করব?

যখন string-এর দৈর্ঘ্য পরিবর্তনশীল, তখন `VARCHAR` সাধারণত উপযোগী।

উদাহরণ:

```sql
CREATE TABLE users (
    id INT,
    username VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(255)
);
```

এখানে username, email এবং address-এর দৈর্ঘ্য একেক রকম হতে পারে।

তাই variable-length string-এর জন্য `VARCHAR` একটি সাধারণ পছন্দ।

---

## 8. একটি গুরুত্বপূর্ণ বিষয়: CHAR সব সময় দ্রুত নয়

অনেক সময় বলা হয়, `CHAR` সব সময় `VARCHAR`-এর চেয়ে দ্রুত। এটি সার্বজনীনভাবে সঠিক নয়।

Performance নির্ভর করতে পারে:

- কোন database ব্যবহার করা হচ্ছে
- Data কীভাবে store করা হচ্ছে
- Query-এর ধরন
- Index design
- Character set এবং encoding
- Table-এর size এবং workload

তাই performance গুরুত্বপূর্ণ হলে নিজের database system-এ বাস্তবসম্মত test করা ভালো।

---

## সংক্ষেপে

`CHAR` এবং `VARCHAR`—দুটিই SQL-এ string সংরক্ষণের data type।

- **`CHAR(n)`**: নির্দিষ্ট দৈর্ঘ্যের string-এর জন্য; ছোট value হলে অনেক database-এ space padding করা হয়।
- **`VARCHAR(n)`**: পরিবর্তনশীল দৈর্ঘ্যের string-এর জন্য; সাধারণত value-এর দৈর্ঘ্য অনুযায়ী storage ব্যবহার করে।
- Fixed-format code-এর জন্য `CHAR` বিবেচনা করা যায়।
- নাম, email এবং address-এর মতো পরিবর্তনশীল দৈর্ঘ্যের data-এর জন্য `VARCHAR` প্রায়ই উপযোগী।
- Performance ও storage-এর সঠিক আচরণ database system অনুযায়ী যাচাই করা উচিত।

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, data-এর প্রকৃতি, validation rules এবং database-এর behavior বুঝে data type নির্বাচন করা।

---

# YouTube Video

<div class="youtube-embed">
  <iframe
    src="https://www.youtube.com/embed/EAwzladZVJM?si=aYbAJE07n3GWR0mg"
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
