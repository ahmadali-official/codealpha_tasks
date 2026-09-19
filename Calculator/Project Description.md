# 🧮 Basic Calculator

A clean, simple calculator you can open in any browser. No frameworks,
no build tools — just plain **HTML, CSS, and JavaScript**.

It looks like this (all text, no image needed to picture it):

```
 ┌───────────────────────────────┐        ┌──────────┐
 │                                │        │  Theme   │  <- floats in the
 │                          12 +  │        │ ☀── ─ 🌙 │     top-right corner
 │                          8     │        │  Light   │
 │                                │        └──────────┘
 ├───────┬───────┬───────┬───────┤
 │  AC   │  DEL  │   ÷   │   ×   │
 ├───────┼───────┼───────┼───────┤
 │   7   │   8   │   9   │   −   │
 ├───────┼───────┼───────┼───────┤
 │   4   │   5   │   6   │   +   │
 ├───────┼───────┼───────┼───────┤
 │   1   │   2   │   3   │       │
 ├───────┴───┬───┼───────┤   =   │
 │     0     │ . │       │       │
 └───────────┴───┴───────┴───────┘
```

---

## ✨ Features

- **All the basics** — add, subtract, multiply, divide, decimals, clear, delete
- **Smart number formatting** — big numbers get commas automatically, like `1,234,567`
- **Handles mistakes gracefully** — dividing by zero shows a clear error instead of a wrong answer
- **No multiple-decimal bugs** — you can't accidentally type `3.1.4`
- **Keyboard friendly** — use your number pad and keys instead of clicking
- **Light & Dark theme** — a switch in the top-right corner of the screen
  - Light = the original look
  - Dark = true **AMOLED black**, with a glowing **neon blue outline** around the calculator
  - Switching themes fades smoothly instead of jumping
- **Little animations everywhere** — buttons ripple when tapped, the screen pops on `=`, shakes on `AC` or an error
- **Works on any device** — phone, tablet, or desktop, the layout adjusts itself
- **No `eval()`** — the math is done safely by hand in JavaScript, not by running raw text as code

---

## 🗂️ Project Structure

Just three files, each with one job:

```
calculator/
│
├── index.html   →  the skeleton (buttons, screen, theme switch)
├── style.css    →  the look (colors, sizing, animations, both themes)
└── script.js    →  the brain (math, button clicks, keyboard, theme switch)
```

Think of it like a body:
```
index.html  =  the bones (structure)
style.css   =  the skin  (appearance)
script.js   =  the brain (behavior)
```

---

## 🔁 How It Works (in plain words)

```
 You click a button
        │
        ▼
 script.js remembers what you typed
   (the number, the operator, the next number)
        │
        ▼
 When you press "="
        │
        ▼
 JavaScript does the actual math itself
 (NOT by using eval — it's done safely, step by step)
        │
        ▼
 The answer is formatted nicely (commas added)
        │
        ▼
 The screen updates — with a little animation
```

If you divide by zero, the flow stops early and shows an error message
instead of continuing:

```
 5 ÷ 0 = ?
        │
        ▼
 script.js notices the second number is 0
        │
        ▼
 Shows "Cannot divide by zero"  (screen shakes)
        │
        ▼
 Calculator resets, ready for your next try
```

---

## ⌨️ Keyboard Shortcuts

You don't have to click — your keyboard works too:

| Key           | Does the same as   |
|---------------|--------------------|
| `0` – `9`     | Number buttons      |
| `+ - * /`     | Operator buttons    |
| `.`           | Decimal point       |
| `Enter` / `=` | Equals              |
| `Backspace`   | Delete last digit   |
| `Escape`      | Clear everything    |

---

## 🌗 Theme Switch

There's a small switch in the **top-right corner of the screen**:

```
☀── ─ 🌙
```

- Slide it one way → **Light theme** (the original colors)
- Slide it the other way → **Dark theme** (pure black, with a glowing
  neon-blue edge around the calculator)

Your choice is remembered — refresh the page and it stays the way you
left it.

---

## 🚀 How to Run It Locally

No installation, no servers, no dependencies. Just:

1. Download (or clone) this folder
2. Make sure `index.html`, `style.css`, and `script.js` are all sitting
   together in the same folder
3. Double-click `index.html`
4. It opens straight in your browser — done!

```
📁 calculator/
   ├── index.html   ← double-click this one
   ├── style.css
   └── script.js
```

---

## 🛠️ Built With

- **HTML5** — structure
- **CSS3** — styling, responsive layout, animations, theming (CSS variables)
- **Vanilla JavaScript** — all the logic, zero libraries, zero frameworks

---

## 📌 Why No Frameworks?

This project is intentionally kept simple and beginner-friendly. Every
line of code is meant to be readable — no build steps, no npm install,
no learning curve. Open the files, read the comments, and you'll see
exactly how a calculator works under the hood.

---

## 📄 License

Free to use, copy, modify, and learn from. Built as a beginner-friendly
web development project.
