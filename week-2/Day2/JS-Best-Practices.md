# Advanced JavaScript & Code Standards
# JS Best Practices Summary

🎯 **Main Goal:**  
Strengthen JavaScript fundamentals through professional practices like:
- Using constants
- Utility functions
- Code formatting
- Applying design principles (SOLID, Atomic Design)

---

## ✅ 1. Refactor Project: Replace Magic Numbers with Constants

⛔ **What is a "Magic Number"?**  
A number used directly in code without explanation.

```js
if (score > 70) { ... } // Why 70? What does it mean?
```

✅ **Better Approach:**

```js
const PASSING_SCORE = 70;
if (score > PASSING_SCORE) { ... }
```

🟢 **Benefits:**
- Improves code readability
- Easy to modify from one place
- Facilitates testing

---

## ✅ 2. Create Reusable Utility Functions

**What are utility functions?**  
General-purpose functions reusable in multiple places.

```js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

🌀 **Example of debounce:**

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

**What is ESLint?**  
A tool for analyzing code to find errors and formatting issues.

**What is Prettier?**  
A tool to automatically format code.

📌 **Why use them?**
- Consistent code style
- Catch errors early
- More professional project

---

## ✅ 4. Apply SOLID Principles

**What is SOLID?**  
Five design principles to write clean and scalable code.

- **S**: Single Responsibility Principle  
  A class or function should do only one thing.

- **O**: Open/Closed Principle  
  Code should be open for extension, closed for modification.

- **L**: Liskov Substitution Principle  
  Subclasses should be replaceable for their base classes without altering behavior.

- **I**: Interface Segregation Principle  
  Don’t force classes to implement unused functionality.

- **D**: Dependency Inversion Principle  
  Depend on abstractions, not concrete implementations.

---

## ✅ 5. Explore Atomic Design Pattern

**What is Atomic Design?**  
A method for organizing UI into a hierarchical structure:

- **Atoms**: Basic elements (button, title, input)
- **Molecules**: Groups of atoms (search form = input + button)
- **Organisms**: Groups of molecules (header, product card)
- **Templates**: Page layouts
- **Pages**: Complete pages with real content

🟢 **Benefits:**
- Reusable components
- Clear project structure
- Easier testing
