# TechHubs Spain 🇪🇸

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A community-driven platform to discover and connect with tech communities across Spain. TechHubs Spain showcases the vibrant Spanish tech ecosystem through an interactive map and comprehensive community directory.

## ✨ Features

### 🗺️ Interactive Spain Map
- **Province-based visualization** of tech communities using GeoJSON data
- **Interactive markers** with hover effects and clustering for nearby communities
- **Mobile-responsive** map component with touch support
- **Community tooltips** with quick access to community details

### 🏘️ Community Directory
- **Comprehensive listing** of tech communities across Spain
- **Advanced filtering** by category (Tech Community, AI, Data, etc.) and province
- **Search and pagination** for easy navigation
- **Detailed community profiles** with member information

### 📅 Events Integration
- **Event discovery** with Luma integration
- **Animated hero sections** with dual-image layouts
- **Event cards** with attendee count and host information
- **Responsive event listings**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TechHubs-Global/techhubs-es.git
cd techhubs-es
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start the development server**
```bash
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Adding Your Community

1. **Fork this repository**
2. **Create a new branch**: `git checkout -b feat/add-community-name`
3. **Copy the example template**: Use `community.example.json` as your starting point
4. **Fill in your community details**: Update all fields with your community's information
5. **Save your community file**: Place your completed JSON file in `/public/data/communities/` with a descriptive filename (e.g., `your-community-name.json`)
6. **Follow the community schema** defined in `/src/types/community.ts`
7. **Test locally** to ensure your data displays correctly
8. **Submit a Pull Request** with a clear description

### Development Contributions

1. **Fork and clone** the repository
2. **Create a feature branch**: `git checkout -b feat/amazing-feature`
3. **Make your changes** following our coding standards and conventional commits
4. **Test thoroughly** across different devices and browsers
5. **Update documentation** if needed
6. **Submit a Pull Request**

## 🙏 Acknowledgments

- **Spanish tech communities** for their vibrant ecosystem
- **Contributors** who help maintain and improve the platform

---

## 📞 Support

**GitHub Issues**: [Report bugs or request features](https://github.com/TechHubs-Global/techhubs-es/issues)
