🖼️ Image Gallery

A simple, responsive image gallery built with plain HTML, CSS, and JavaScript — no frameworks, no libraries, just the basics done well.

You can browse images in a grid, filter them by category, and click on any image to open it in a full-screen lightbox with next/previous navigation. It also looks and works fine on phones, tablets, and desktops.

## ✨ Features

- **Responsive grid layout** — automatically adjusts the number of columns based on screen size
- **Lightbox view** — click any image to see it full-screen
- **Next / Previous navigation** — move between images using on-screen buttons or your keyboard's arrow keys
- **Category filters** — quickly filter images by Nature, City, Animals, or People
- **Smooth hover effects and transitions** — cards lift, images zoom slightly, and captions fade in
- **Keyboard shortcuts** — `←` / `→` to navigate, `Esc` to close the lightbox
- **Mobile-friendly** — layout reflows nicely on smaller screens

## 📁 Project Structure

```
image-gallery/
├── index.html   → page structure/content
├── style.css    → all styling and animations
├── script.js    → filtering, lightbox, and navigation logic
└── README.md    → you're reading it
```

Everything is split into its own file on purpose, so it's easy to read, edit, or reuse any single piece.

## 🚀 How to Run It

You don't need any special setup or tools for this one.

1. Clone or download this repository
2. Open the folder
3. Double-click `index.html` — it'll open in your default browser

That's it. No build step, no `npm install`, nothing to configure.

> Note: the sample images are pulled from [picsum.photos](https://picsum.photos), so you'll need an internet connection to see them. If you want to use your own images instead, just swap the `src` links in `index.html` with paths to your local image files.

## 🛠️ How to Customize It

- **Add more images:** copy one of the `<figure class="gallery-item">` blocks in `index.html`, update the image source, caption, and category, and give it the next `data-index` number.
- **Add a new category:** add a new filter button in the `.filter-bar` section, then use that same category name in a `data-category` attribute on your image(s).
- **Change the color theme:** most of the colors live near the top of `style.css` (background, accent color `#ff5f5f`, etc.) — swap them out to match your own style.

## 🙌 Why I Built This

This project was made to practice core front-end skills — working with the DOM, handling events, writing responsive CSS layouts with Grid, and adding small touches (transitions, keyboard support) that make an interface feel more polished, all without reaching for a framework.

## 📄 License

Feel free to use, modify, or build on this project for learning or personal use.
