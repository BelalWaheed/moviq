# 🎬 Moviq - Modern Movie & TV Series Platform

<div align="center">

![Moviq Logo](public/logo.png)

A beautiful, feature-rich web application for discovering and exploring movies and TV series, built with React and powered by The Movie Database (TMDB) API.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

[Live Demo](https://moviqq.vercel.app) | [Report Bug](https://github.com/BelalWaheed/moviq/issues) | [Request Feature](https://github.com/BelalWaheed/moviq/issues)

</div>

---

## ✨ Features

### 🎥 **Content Discovery**
- Browse **Movies** and **TV Series** with multiple categories:
  - Now Playing / Airing Today
  - Popular
  - Top Rated
  - Upcoming (Movies)
  - On the Air (TV Series)
- Advanced **search functionality** with real-time results
- **Trending content** carousel with auto-play
- Detailed information pages for movies, series, seasons, and episodes

### 🎭 **Rich Media Experience**
- View **trailers and videos** directly in the app
- Browse **image galleries** (posters, backdrops, logos)
- Read **user reviews** with pagination
- Explore **cast and crew** information
- View **production companies** and **networks**
- Check **recommendations** and **similar content**

### 👤 **Person Profiles**
- Detailed **actor/crew profiles** with biography
- Complete **filmography** (movies & TV series)
- Separate views for **cast** and **crew** roles
- Direct links to **IMDb** profiles

### 🔐 **TMDB Authentication**
- Sign in with your **TMDB account**
- Seamless OAuth integration
- Session management

### 🎨 **User Experience**
- **Responsive design** - works on all devices
- **Dark theme** optimized for viewing
- **Smooth animations** with Framer Motion
- **Infinite scrolling** pagination
- **Content filtering** for family-friendly viewing
- **Loading states** and error handling

### 🔗 **External Integrations**
- Direct links to **IMDb**, **Facebook**, **Instagram**, **Twitter**
- **Where to Watch** providers by country
- SEO optimized with sitemap generation

---

## 🚀 Tech Stack

### **Frontend**
- **React 19.1.1** - UI library with React Compiler optimization
- **Redux Toolkit 2.9.0** - State management
- **React Router DOM 7.9.3** - Navigation
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Material Tailwind 2.1.10** - UI components
- **Framer Motion 12.23.24** - Animations

### **Additional Libraries**
- **Swiper 12.0.2** - Touch slider
- **Lucide React** - Icons
- **Axios 1.12.2** - HTTP client
- **SweetAlert2 11.26.3** - Beautiful alerts

### **Build Tools**
- **Vite 7.1.7** - Fast build tool
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing

---

## 📦 Installation

### **Prerequisites**
- Node.js 18+ and npm/yarn/pnpm
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### **Clone the Repository**
```bash
git clone https://github.com/BelalWaheed/moviq.git
cd moviq
```

### **Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_TMDB_bel=your_tmdb_bearer_token_here
```

### **Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:5173` in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

---

## 📁 Project Structure

```
moviq/
├── public/              # Static assets
│   ├── logo.png
│   └── sitemap.xml
├── src/
│   ├── components/      # Reusable components
│   │   ├── carousel/    # Movie/Series carousels
│   │   ├── footer/      # Footer component
│   │   └── header/      # Header & search
│   ├── pages/           # Page components
│   │   ├── home/        # Home page
│   │   ├── movies/      # Movies section
│   │   ├── series/      # TV Series section
│   │   ├── shared/      # Shared pages (Person, Search)
│   │   ├── loading/     # Loading states
│   │   └── notFound/    # 404 page
│   ├── redux/           # Redux state management
│   │   ├── AuthSlices/  # Authentication
│   │   ├── HomeSlices/  # Home page data
│   │   ├── moviesSlices/ # Movie data
│   │   ├── SeriesSlices/ # Series data
│   │   └── SharedSlices/ # Shared data (Person)
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── package.json
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md
```

---

## 🎨 Color Scheme

```javascript
background: {
  primary: "black",     // Main background
  elevated: "black",    // Cards, modals
  muted: "#71717a"      // Subtle borders
},
surface: {
  secondary: "#18181b"  // Navbar, sidebar
},
text: {
  primary: "#fafafa",   // Main text
  secondary: "#d4d4d8"  // Secondary text
},
accent: {
  primary: "#dc2626",   // Primary buttons (red)
  hover: "#b91c1c",     // Hover states
  secondary: "#f97316"  // Secondary highlights (orange)
}
```

---

## 🔒 Content Filtering

The app includes a **safe search filter** that automatically removes NSFW and adult content from all API results, ensuring a family-friendly experience. The filter is applied to:
- Movie listings
- TV series listings
- Search results
- Recommendations
- Similar content

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📱 Responsive Design

Moviq is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1920px+)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
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

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- [React](https://reactjs.org/) and the React community
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- All the open-source libraries that made this project possible

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/BelalWaheed/moviq/issues)
- Contact: [Your Email]

---

<div align="center">

Made with ❤️ by [Belal Waheed](https://github.com/BelalWaheed) & [Omar](https://github.com/7aider1)

**[⬆ Back to Top](#-moviq---modern-movie--tv-series-platform)**

</div>
