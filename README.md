# [ dev ] Portfolio

> A minimalist, high-performance personal portfolio crafted to bridge the gap between robust architecture and impeccable aesthetics. 

This project reflects over 5 years of experience in crafting fluid user interfaces, combined with deep backend development expertise. It leverages a monochrome design system, advanced scroll physics, and server-side rendering to deliver a premium, "Apple-like" user experience.

## ✨ Key Features

* **Impeccable Typography & Design:** A strictly monochrome palette (*claire obscure*) with precise kerning and layout symmetry.
* **Advanced Animations:** Powered by Framer Motion, featuring spring physics, stagger effects, and dynamic text reveals.
* **Parallax & Scroll Reveal:** Smooth, 3D-like depth effects tied directly to the user's scroll position, optimized with spring dampers for extreme fluidity.
* **Smart Glassmorphism Navbar:** A translucent, blur-backed navigation bar that intelligently hides/reveals based on scroll direction.
* **SEO Optimized:** Built on Next.js App Router for full Server-Side Rendering (SSR) and instantaneous load times.

## 🛠 Tech Stack

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Deployment:** (Add your deployment platform here, e.g., Vercel)

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/my-portfolio.git](https://github.com/your-username/my-portfolio.git)
   ```

2. **Navigate to the directory:**
   ```bash
   cd my-portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the project:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Architecture

The project follows a clean, highly modular architecture:

```text
src/
├── app/                  # Next.js App Router (Pages & Layout)
│   ├── about/
│   ├── contacts/
│   ├── projects/
│   ├── layout.jsx        # Global layout and fonts
│   └── page.jsx          # Hero section and scroll reveals
├── components/           # Reusable UI components
│   ├── animations/       # Universal animation wrappers (e.g., ScrollReveal)
│   ├── footer/
│   └── navbar/           # Smart, animated navigation
└── index.css             # Tailwind global directives
```

## 👨‍💻 Author

**Thalisson Araújo**
* Frontend Developer
* [LinkedIn](https://linkedin.com/in/thalisson-araujo/) | [GitHub](https://github.com/Thalisson21/)
