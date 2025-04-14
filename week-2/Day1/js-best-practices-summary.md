
# JS Best Practices Summary

🎯 **الهدف العام:**  
تقوية أساسيات JavaScript من خلال ممارسات احترافية مثل:
- استخدام الثوابت (constants)
- دوال الأدوات (utility functions)
- تنسيق الكود (formatting)
- تطبيق مبادئ التصميم (SOLID, Atomic Design)

---

## ✅ 1. Refactor project: Replace Magic Numbers with Constants

⛔ **ما هو "Magic Number"؟**  
هو رقم يُستخدم مباشرة في الكود بدون توضيح معناه.

```js
if (score > 70) { ... } // ليش 70؟ وش معناها؟
```

✅ **الأفضل:**

```js
const PASSING_SCORE = 70;
if (score > PASSING_SCORE) { ... }
```

🟢 **الفوائد:**
- يسهل قراءة الكود
- يسهل التعديل لاحقًا من مكان واحد
- يساعد في اختبار الكود

---

## ✅ 2. Create Reusable Utility Functions

**ما هي utility functions؟**  
دوال عامة قابلة لإعادة الاستخدام في أكثر من مكان.

```js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

🌀 **مثال على debounce:**

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
```

---

## ✅ 3. Setup ESLint and Prettier

**ما هو ESLint؟**  
أداة لتحليل الكود وكشف الأخطاء ومشاكل التنسيق.

**ما هو Prettier؟**  
أداة لتنسيق الكود تلقائيًا.

📌 **لماذا نستخدمهم؟**
- تنسيق موحد للكود
- كشف الأخطاء مبكرًا
- مشروع أكثر احترافية

---

## ✅ 4. Apply SOLID Principles

**ما هي SOLID؟**  
٥ مبادئ تصميم تساعد على كتابة كود نظيف وقابل للتوسعة.

- **S**: Single Responsibility Principle  
  كل كلاس أو دالة تقوم بشيء واحد فقط.

- **O**: Open/Closed Principle  
  الكود يكون مفتوح للإضافة، مغلق للتعديل.

- **L**: Liskov Substitution Principle  
  الكلاسات الأبناء يجب أن تحل محل الأب بدون تغيير في السلوك.

- **I**: Interface Segregation Principle  
  لا تجبر الكلاسات على تنفيذ وظائف لا تحتاجها.

- **D**: Dependency Inversion Principle  
  اعتمد على التجريد بدلًا من التفاصيل المباشرة.

---

## ✅ 5. Explore Atomic Design Pattern

**ما هو Atomic Design؟**  
أسلوب في تنظيم الواجهات على شكل مكونات هرمية:

- **Atoms**: أبسط عناصر (زر، عنوان، إدخال)
- **Molecules**: مجموعة Atoms (نموذج بحث = إدخال + زر)
- **Organisms**: مجموعات من Molecules (هيدر، كرت منتج)
- **Templates**: تصميم عام للصفحة
- **Pages**: صفحة كاملة بمحتوى حقيقي

🟢 **الفوائد:**
- مكونات قابلة لإعادة الاستخدام
- تنظيم واضح للمشروع
- تسهيل الاختبار
