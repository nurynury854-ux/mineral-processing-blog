# Г.Даваацэрэн - Mineral Processing Blog

A modern, responsive redesign of the Mineral Processing Engineering blog by G.Davaatseren, featuring technical content about mineral processing, comminution technology, and machine learning applications in mining.

## 🌟 Features

- ✅ Modern, responsive design with mobile-first approach
- ✅ Dark/Light theme toggle
- ✅ Markdown-based blog posts with frontmatter
- ✅ Syntax highlighting for code blocks (Python, R, JavaScript)
- ✅ Mathematical equation rendering with KaTeX
- ✅ Blog archive organized by year
- ✅ Tag-based filtering
- ✅ Reading time estimates
- ✅ SEO optimized with meta tags
- ✅ Fully bilingual (Mongolian/English)
- ✅ Metal price widgets
- ✅ Author information and publications page

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter
- **Code Highlighting:** rehype-highlight
- **Math Rendering:** KaTeX
- **Icons:** Lucide React
- **Theme:** next-themes
- **Font:** Inter (with Cyrillic support)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Website_Upgrade/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── archive/           # Archive page
│   ├── publications/      # Publications page
│   └── post/[slug]/       # Dynamic post pages
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Sidebar.tsx        # Sidebar with widgets
│   ├── PostCard.tsx       # Blog post card
│   ├── ThemeProvider.tsx  # Theme context provider
│   └── ThemeToggle.tsx    # Dark/light mode toggle
├── content/               # Markdown content
│   └── posts/            # Blog post markdown files
├── lib/                   # Utility functions
│   ├── posts.ts          # Post data fetching
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
│   └── post.ts           # Post type definitions
└── public/               # Static assets
```

## ✍️ Adding New Blog Posts

Create a new Markdown file in `content/posts/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-01-13"
excerpt: "Brief description of your post"
tags: ["Tag1", "Tag2", "Tag3"]
language: "mixed"
views: 0
---

# Your Post Title

Your content here...
```

## 🎨 Customization

### Colors
Edit Tailwind config or use CSS custom properties in `app/globals.css`.

### Theme
Modify the theme in `components/ThemeProvider.tsx`.

### Navigation
Update links in `components/Header.tsx` and `components/Footer.tsx`.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

## 📊 Content Migration

The website currently includes 5 sample blog posts migrated from the original Blogspot. To migrate more content:

1. Export content from Blogspot
2. Convert HTML to Markdown
3. Add frontmatter metadata
4. Place in `content/posts/`

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Original Website

Original Blogspot: https://gedavaa.blogspot.com/2010/

## 👤 Author

**Г.Даваацэрэн (G.Davaatseren)**
- MSc, Mineral Processing Engineering
- Consulting Engineer of Mongolia
- Specialization: Comminution Technology, METSIM & JKSimMet
- Location: Ulaanbaatar, Mongolia

---

**Built with Next.js 16, TypeScript, and Tailwind CSS**
