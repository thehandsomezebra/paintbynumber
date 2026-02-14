# Paint-by-Number Generator 🎨

This is a powerful, client-side React application that converts any image into a professional-grade, printable paint-by-number template. It runs entirely in your browser (no data upload required) and features advanced algorithms for color matching, region smoothing, and high-resolution vector export.

## ✨ Features

### 🎨 Advanced Color Engine
- **Multi-Palette Support:** Mix and match from popular paint sets or use them all at once:
    - Arteza Gouache (24, 36, 60)
    - Liquitex Basics Acrylic (24)
    - Himi Miya Gouache (24)
    - Winsor & Newton Cotman Watercolor (12)
    - **Custom Palette Builder:** Create your own sets by typing names/hex codes or **picking colors directly from a photo** of your paints.
- **Creative Algorithms:**
    - **Vibe/Pop:** Intelligent saturation boosting and temperature shifting.
    - **Palette Variety:** Penalizes overuse of dominant colors to force a richer palette.
    - **Color Fondness:** Bias the algorithm to favor specific hues you love.
    - **Smart Smoothing:**
        - **De-speckle:** Removes noise and tiny islands.
        - **Edge Smoothing:** "Sands down" jagged pixel corners for organic, paintable shapes.

### 🖨️ Professional Print Export
- **High-Resolution Output:** Generates crisp, vector-traced lines at 300 DPI for any size.
- **Standard Print Sizes:** Supports layouts from Letter (8.5x11") up to Poster sizes (24x32").
- **Smart Labeling System:**
    - **Collision Detection:** Prevents numbers from overlapping, even in dense areas.
    - **Dynamic Sizing:** Scales font size based on the region area.
    - **Priority Placement:** Labels small details first so they aren't covered by large region labels.
    - **Frequency Control:** Reduces label repetition in large background areas for a cleaner look.
- **Template Customization:** Adjust line darkness and number visibility to suit your vision.
- **Palette Legend:** Optionally include a printable color key directly on the downloaded template.

## 🚀 Getting Started

### Docker (Recommended)
The easiest way to run the application locally is with Docker.

```bash
docker build -t pbn-app .
docker run -p 8080:80 pbn-app
```

Open `http://localhost:8080` in your browser.

### Local Development (Node.js)

1. **Install dependencies:**
    ```bash
    npm install
    ```
    
2. **Run locally:**
    ```bash
    npm run dev
    ```
    
3. **Build for production:**
    ```bash
    npm run build
    ```

## 📦 Deployment

This repository is configured to deploy automatically to **GitHub Pages** or any static host.

The `vite.config.js` is set to use relative paths (`base: './'`), making it compatible with:
- GitHub Pages (Project sites)
- Docker containers (Root path)
- S3 / Netlify / Vercel

### GitHub Pages
1. Go to `Settings` -> `Pages` in your GitHub repository.
2. Ensure the source is set to **GitHub Actions**.
3. Push changes to the `main` branch.
4. The workflow in `.github/workflows/deploy.yml` will handle the rest!