# 🎬 Moviq - Movie & TV Discovery Platform

<div align="center">

![Moviq Logo](public/logo.png)

A modern, feature-rich web application for discovering and exploring movies and TV series, built with React 19 and powered by **The Movie Database (TMDB) API**.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

[**Live Demo**](https://moviqq.vercel.app) • [Report Bug](https://github.com/BelalWaheed/moviq/issues) • [Request Feature](https://github.com/BelalWaheed/moviq/issues)

</div>

---

## ✨ Features

### 🎥 Content Discovery

- Browse **Movies** and **TV Series** with categorized listings:
  - Now Playing / Airing Today
  - Popular & Top Rated
  - Upcoming (Movies) & On the Air (TV)
- Advanced **search** with real-time results
- **Trending content** carousel with auto-play
- Detailed pages for movies, series, seasons, and episodes

### 🎭 Rich Media Experience

- Watch **trailers and videos** in-app
- Browse **image galleries** (posters, backdrops)
- Read **user reviews** with pagination
- Explore **cast & crew** information with filmography
- View **recommendations** and **similar content**

### 👤 Person Profiles

- Detailed **actor/crew profiles** with biography
- Complete **filmography** (movies & TV series)
- Direct links to **IMDb** profiles

### 🔐 TMDB Authentication

- Sign in with your **TMDB account** (OAuth)
- View your profile and manage sessions

### 🎨 User Experience

- **Responsive design** for all devices (mobile, tablet, desktop)
- **Dark theme** optimized for viewing
- **Smooth animations** powered by Framer Motion
- **Infinite scrolling** pagination
- **Content filtering** for family-friendly viewing

---

## 🚀 Tech Stack

| Category       | Technologies                                |
| -------------- | ------------------------------------------- |
| **Frontend**   | React 19, Redux Toolkit, React Router DOM 7 |
| **Styling**    | Tailwind CSS 3, Material Tailwind           |
| **Animations** | Framer Motion                               |
| **Components** | Swiper, Lucide React, SweetAlert2           |
| **Build**      | Vite 7, ESLint, PostCSS                     |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
# Clone the repository
git clone https://github.com/BelalWaheed/moviq.git
cd moviq

# Install dependencies
npm install

# Create environment file
echo "VITE_TMDB_bel=your_tmdb_bearer_token_here" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

---

## 📁 Project Structure

```
moviq/
├── public/                 # Static assets (logo, sitemap, robots.txt)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── carousel/       # Media carousels
│   │   ├── header/         # Navigation & search
│   │   └── footer/         # Footer
│   ├── pages/              # Route pages
│   │   ├── home/           # Home page
│   │   ├── movies/         # Movies section (details, cast, gallery, etc.)
│   │   ├── series/         # Series section (seasons, episodes, etc.)
│   │   ├── shared/         # Shared pages (Person, Search)
│   │   ├── profile/        # User profile
│   │   ├── loading/        # Loading states
│   │   └── notFound/       # 404 page
│   ├── redux/              # State management
│   │   ├── AuthSlices/     # Authentication
│   │   ├── HomeSlices/     # Home page data
│   │   ├── moviesSlices/   # Movie data
│   │   ├── SeriesSlices/   # Series data
│   │   └── SharedSlices/   # Shared data (Person)
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── sitemap-generator.js    # SEO sitemap generator
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🎨 Design System

| Element              | Color              |
| -------------------- | ------------------ |
| **Background**       | `black`            |
| **Surface**          | `#18181b`          |
| **Text Primary**     | `#fafafa`          |
| **Text Secondary**   | `#d4d4d8`          |
| **Accent Primary**   | `#dc2626` (red)    |
| **Accent Secondary** | `#f97316` (orange) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Authors

- **Belal Waheed** - [GitHub](https://github.com/BelalWaheed)
- **Omar** - [GitHub](https://github.com/7aider1)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the API
- [React](https://reactjs.org/) & [Tailwind CSS](https://tailwindcss.com/)
- All open-source contributors

---

<div align="center">

Made with ❤️ by [Belal Waheed](https://github.com/BelalWaheed) & [Omar](https://github.com/7aider1)

**[⬆ Back to Top](#-moviq---movie--tv-discovery-platform)**

</div>
