import React, { useState, useRef, useEffect } from 'react';
import { Upload, Printer, Sliders, Image as ImageIcon, Loader2, Download, Palette, Layers, RefreshCw, Box, AlertTriangle, Info, Droplet, Sparkles, Shuffle, Heart, Ruler, Sun, Feather, Plus, Trash2, X, Pipette, Copy, Pencil, List, Coffee } from 'lucide-react';

// --- COLOR DATA ---

const PAINT_SETS = {
  // 1. Generic (User mixes themselves)
  generic: null,

  // 2. ARTEZA Gouache (Original Request)
  arteza24: [
    { name: "Titanium White", hex: "#F2F2F2" },
    { name: "Lemon Yellow", hex: "#FFF600" },
    { name: "Yellow Ochre", hex: "#C68E17" },
    { name: "Vermilion Red", hex: "#E34234" },
    { name: "Crimson Red", hex: "#990000" },
    { name: "Burnt Sienna", hex: "#E97451" },
    { name: "Burnt Umber", hex: "#8A3324" },
    { name: "Viridian Green", hex: "#40826D" },
    { name: "Phthalo Green", hex: "#123524" },
    { name: "Ultramarine Blue", hex: "#4166F5" },
    { name: "Phthalo Blue", hex: "#000F89" },
    { name: "Lamp Black", hex: "#121212" },
    { name: "Deep Green", hex: "#004000" },
    { name: "Orange", hex: "#FF8000" },
    { name: "Prussian Blue", hex: "#003153" },
    { name: "Cerulean Blue", hex: "#007BA7" },
    { name: "Violet", hex: "#8F00FF" },
    { name: "Sap Green", hex: "#507D2A" },
    { name: "Raw Sienna", hex: "#D68A59" },
    { name: "Raw Umber", hex: "#826644" },
    { name: "Gray", hex: "#808080" },
    { name: "Rose", hex: "#FF007F" },
    { name: "Scarlet", hex: "#FF2400" },
    { name: "Cobalt Blue", hex: "#0047AB" }
  ],

  arteza36: [
    // Base 24
    { name: "Titanium White", hex: "#F2F2F2" }, { name: "Lemon Yellow", hex: "#FFF600" }, { name: "Yellow Ochre", hex: "#C68E17" },
    { name: "Vermilion Red", hex: "#E34234" }, { name: "Crimson Red", hex: "#990000" }, { name: "Burnt Sienna", hex: "#E97451" },
    { name: "Burnt Umber", hex: "#8A3324" }, { name: "Viridian Green", hex: "#40826D" }, { name: "Phthalo Green", hex: "#123524" },
    { name: "Ultramarine Blue", hex: "#4166F5" }, { name: "Phthalo Blue", hex: "#000F89" }, { name: "Lamp Black", hex: "#121212" },
    { name: "Deep Green", hex: "#004000" }, { name: "Orange", hex: "#FF8000" }, { name: "Prussian Blue", hex: "#003153" },
    { name: "Cerulean Blue", hex: "#007BA7" }, { name: "Violet", hex: "#8F00FF" }, { name: "Sap Green", hex: "#507D2A" },
    { name: "Raw Sienna", hex: "#D68A59" }, { name: "Raw Umber", hex: "#826644" }, { name: "Gray", hex: "#808080" },
    { name: "Rose", hex: "#FF007F" }, { name: "Scarlet", hex: "#FF2400" }, { name: "Cobalt Blue", hex: "#0047AB" },
    // Extension 12
    { name: "Peach", hex: "#FFE5B4" }, { name: "Magenta", hex: "#FF00FF" }, { name: "Purple", hex: "#800080" },
    { name: "Pale Green", hex: "#98FB98" }, { name: "Sky Blue", hex: "#87CEEB" }, { name: "Turquoise", hex: "#40E0D0" },
    { name: "Olive Green", hex: "#808000" }, { name: "Bordeaux", hex: "#4C0013" }, { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#FFD700" }, { name: "Mauve", hex: "#E0B0FF" }, { name: "Mint Green", hex: "#98FF98" }
  ],

  arteza60: [
     // Base 36 included implicitly by repeating logic for clarity
    { name: "Titanium White", hex: "#F2F2F2" }, { name: "Lemon Yellow", hex: "#FFF600" }, { name: "Yellow Ochre", hex: "#C68E17" },
    { name: "Vermilion Red", hex: "#E34234" }, { name: "Crimson Red", hex: "#990000" }, { name: "Burnt Sienna", hex: "#E97451" },
    { name: "Burnt Umber", hex: "#8A3324" }, { name: "Viridian Green", hex: "#40826D" }, { name: "Phthalo Green", hex: "#123524" },
    { name: "Ultramarine Blue", hex: "#4166F5" }, { name: "Phthalo Blue", hex: "#000F89" }, { name: "Lamp Black", hex: "#121212" },
    { name: "Deep Green", hex: "#004000" }, { name: "Orange", hex: "#FF8000" }, { name: "Prussian Blue", hex: "#003153" },
    { name: "Cerulean Blue", hex: "#007BA7" }, { name: "Violet", hex: "#8F00FF" }, { name: "Sap Green", hex: "#507D2A" },
    { name: "Raw Sienna", hex: "#D68A59" }, { name: "Raw Umber", hex: "#826644" }, { name: "Gray", hex: "#808080" },
    { name: "Rose", hex: "#FF007F" }, { name: "Scarlet", hex: "#FF2400" }, { name: "Cobalt Blue", hex: "#0047AB" },
    { name: "Peach", hex: "#FFE5B4" }, { name: "Magenta", hex: "#FF00FF" }, { name: "Purple", hex: "#800080" },
    { name: "Pale Green", hex: "#98FB98" }, { name: "Sky Blue", hex: "#87CEEB" }, { name: "Turquoise", hex: "#40E0D0" },
    { name: "Olive Green", hex: "#808000" }, { name: "Bordeaux", hex: "#4C0013" }, { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#FFD700" }, { name: "Mauve", hex: "#E0B0FF" }, { name: "Mint Green", hex: "#98FF98" },
    // Extension 24
    { name: "Apricot", hex: "#FBCEB1" }, { name: "Naples Yellow", hex: "#FADA5E" }, { name: "Gamboge", hex: "#E49B0F" },
    { name: "Coral", hex: "#FF7F50" }, { name: "Lilac", hex: "#C8A2C8" }, { name: "Lavender", hex: "#E6E6FA" },
    { name: "Indigo", hex: "#4B0082" }, { name: "Lime Green", hex: "#32CD32" }, { name: "Forest Green", hex: "#228B22" },
    { name: "Teal", hex: "#008080" }, { name: "Neon Pink", hex: "#FF6EC7" }, { name: "Neon Blue", hex: "#1F51FF" },
    { name: "Neon Green", hex: "#39FF14" }, { name: "Neon Yellow", hex: "#CCFF00" }, { name: "Neon Orange", hex: "#FF9933" },
    { name: "Pearl White", hex: "#FDFDFD" }, { name: "Payne's Grey", hex: "#40404F" }, { name: "Sage", hex: "#9DC183" },
    { name: "Sea Green", hex: "#2E8B57" }, { name: "Bronze", hex: "#CD7F32" }, { name: "Copper", hex: "#B87333" },
    { name: "Wine Red", hex: "#722F37" }, { name: "Deep Yellow", hex: "#F5C71A" }, { name: "Mid Yellow", hex: "#FFEB00" }
  ],

  // 3. Liquitex Basics Acrylic 24 (New)
  liquitex24: [
    { name: "Light Portrait Pink", hex: "#E5AB99" },
    { name: "Primary Red", hex: "#C61A1A" },
    { name: "Naphthol Crimson", hex: "#A80C34" },
    { name: "Cadmium Orange Hue", hex: "#FF7D00" },
    { name: "Primary Yellow", hex: "#FFD700" },
    { name: "Cadmium Yellow Med", hex: "#FFB800" },
    { name: "Light Green Perm", hex: "#76C356" },
    { name: "Hooker's Green", hex: "#3A6E3B" },
    { name: "Phthalo Green", hex: "#00643C" },
    { name: "Cerulean Blue Hue", hex: "#0084C4" },
    { name: "Cobalt Blue Hue", hex: "#004AAD" },
    { name: "Primary Blue", hex: "#002FA7" },
    { name: "Phthalo Blue", hex: "#141469" },
    { name: "Ultramarine Blue", hex: "#1C1C96" },
    { name: "Dioxazine Purple", hex: "#4A0074" },
    { name: "Burnt Sienna", hex: "#6E3B28" },
    { name: "Burnt Umber", hex: "#42281E" },
    { name: "Raw Sienna", hex: "#C68E42" },
    { name: "Raw Umber", hex: "#5C4630" },
    { name: "Yellow Oxide", hex: "#D6B026" },
    { name: "Unbleached Titanium", hex: "#E8DCCA" },
    { name: "Titanium White", hex: "#FFFFFF" },
    { name: "Ivory Black", hex: "#1A1A1A" },
    { name: "Mars Black", hex: "#0D0D0D" }
  ],

  // 4. Himi Miya Gouache 24 (New)
  himi24: [
    { name: "Deep Red", hex: "#8B0000" },
    { name: "Ochre", hex: "#CC7722" },
    { name: "Violet", hex: "#8F00FF" },
    { name: "Ultramarine", hex: "#120A8F" },
    { name: "Prussian Blue", hex: "#003153" },
    { name: "Black", hex: "#000000" },
    { name: "Ponceau", hex: "#C02E4C" },
    { name: "Earth Yellow", hex: "#E1A95F" },
    { name: "Mid Yellow", hex: "#FFEB00" },
    { name: "Acid Blue", hex: "#1E90FF" },
    { name: "Grass Green", hex: "#7CFC00" },
    { name: "Burnt Umber", hex: "#8A3324" },
    { name: "Rose", hex: "#FF007F" },
    { name: "Lemon Yellow", hex: "#FFF700" },
    { name: "Titanium White", hex: "#FFFFFF" },
    { name: "White", hex: "#F8F8F8" }, // Himi usually has 2 whites
    { name: "Jade Green", hex: "#00A86B" },
    { name: "Oriental Red", hex: "#B22222" },
    { name: "Orange", hex: "#FF7F00" },
    { name: "Vermilion", hex: "#E34234" },
    { name: "Pale Green", hex: "#98FB98" },
    { name: "Cerulean Blue", hex: "#007BA7" },
    { name: "Cobalt Blue", hex: "#0047AB" },
    { name: "Viridian", hex: "#40826D" }
  ],

  // 5. Winsor & Newton Cotman 12 (New)
  cotman12: [
    { name: "Lemon Yellow", hex: "#FFFACD" },
    { name: "Cadmium Yellow", hex: "#FFF600" },
    { name: "Cadmium Red Pale", hex: "#E34234" },
    { name: "Alizarin Crimson", hex: "#E32636" },
    { name: "Ultramarine", hex: "#120A8F" },
    { name: "Intense Blue", hex: "#0099CC" },
    { name: "Emerald Green", hex: "#50C878" },
    { name: "Sap Green", hex: "#507D2A" },
    { name: "Yellow Ochre", hex: "#C68E17" },
    { name: "Burnt Sienna", hex: "#E97451" },
    { name: "Burnt Umber", hex: "#8A3324" },
    { name: "China White", hex: "#F2F2F2" }
  ]
};

const PALETTE_LABELS = {
  generic: "Generic (No limits)",
  arteza24: "Arteza Gouache 24",
  arteza36: "Arteza Gouache 36",
  arteza60: "Arteza Gouache 60",
  himi24: "Himi Miya Gouache 24",
  liquitex24: "Liquitex Basics Acrylic 24",
  cotman12: "W&N Cotman Watercolor 12"
};

const PRINT_SIZES = [
  { label: "Letter (8.5\" x 11\")", w: 8.5, h: 11 },
  { label: "12\" x 16\" (30x40cm)", w: 12, h: 16 },
  { label: "12\" x 20\" (30x50cm)", w: 12, h: 20 },
  { label: "16\" x 16\" (40x40cm)", w: 16, h: 16 },
  { label: "16\" x 20\" (40x50cm)", w: 16, h: 20 },
  { label: "16\" x 24\" (40x60cm)", w: 16, h: 24 },
  { label: "20\" x 20\" (50x50cm)", w: 20, h: 20 },
  { label: "20\" x 24\" (50x60cm)", w: 20, h: 24 },
  { label: "24\" x 32\" (60x80cm)", w: 24, h: 32 },
];

// --- UTILITY FUNCTIONS ---

const rgbToLab = (r, g, b) => {
  let r_ = r / 255, g_ = g / 255, b_ = b / 255;
  r_ = r_ > 0.04045 ? Math.pow((r_ + 0.055) / 1.055, 2.4) : r_ / 12.92;
  g_ = g_ > 0.04045 ? Math.pow((g_ + 0.055) / 1.055, 2.4) : g_ / 12.92;
  b_ = b_ > 0.04045 ? Math.pow((b_ + 0.055) / 1.055, 2.4) : b_ / 12.92;
  let x = (r_ * 0.4124 + g_ * 0.3576 + b_ * 0.1805) / 0.95047;
  let y = (r_ * 0.2126 + g_ * 0.7152 + b_ * 0.0722) / 1.00000;
  let z = (r_ * 0.0193 + g_ * 0.1192 + b_ * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
};

// Parse Hex to RGB
const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

const colorDist = (rgb1, rgb2) => {
    return Math.sqrt(Math.pow(rgb1[0]-rgb2[0], 2) + Math.pow(rgb1[1]-rgb2[1], 2) + Math.pow(rgb1[2]-rgb2[2], 2));
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// --- COMPONENT ---

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageWarning, setImageWarning] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [complexityLevel, setComplexityLevel] = useState(3); 
  const [smoothness, setSmoothness] = useState(2); 
  const [edgeSmoothing, setEdgeSmoothing] = useState(2);
  const [detailLevel, setDetailLevel] = useState(2); 
  const [popLevel, setPopLevel] = useState(0); 
  const [varietyLevel, setVarietyLevel] = useState(0); 
  const [useFondness, setUseFondness] = useState(false); // New Fondness Toggle
  const [fondnessColor, setFondnessColor] = useState('#8A2BE2'); // Default to BlueViolet
  const [viewMode, setViewMode] = useState('compare'); 
  const [palette, setPalette] = useState([]);
  const [selectedPalettes, setSelectedPalettes] = useState(['generic']); 
  const [printSizeIndex, setPrintSizeIndex] = useState(0);
  const [lineLightness, setLineLightness] = useState(220); 
  const [numberLightness, setNumberLightness] = useState(179);
  const [includePaletteOnDownload, setIncludePaletteOnDownload] = useState(true);
  
  const originalCanvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const outlineCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const labelsRef = useRef([]);
  const assignmentsRef = useRef(null);
  const dataDimsRef = useRef({ w: 0, h: 0 });
  
  // Palette Creator State
  const [paletteCreatorMode, setPaletteCreatorMode] = useState('gui'); // 'gui' | 'text' | 'image'
  const [paletteImageSrc, setPaletteImageSrc] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);
  const paletteCanvasRef = useRef(null);
  const [editingPaletteKey, setEditingPaletteKey] = useState(null);
  
  // Custom Palette State
  const [customPalettes, setCustomPalettes] = useState(() => {
      const saved = localStorage.getItem('pbn_custom_palettes');
      return saved ? JSON.parse(saved) : {};
  });
  const [showPaletteCreator, setShowPaletteCreator] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [newPaletteInput, setNewPaletteInput] = useState('');

  // Live update of outline preview when lightness settings change
  useEffect(() => {
    if (assignmentsRef.current && labelsRef.current) {
        const canvas = outlineCanvasRef.current;
        if (!canvas) return;
        const { w, h } = dataDimsRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);
        
        const pixels = ctx.createImageData(w, h);
        const data = pixels.data;
        for(let i=0; i<data.length; i++) data[i] = 255;
        
        const assignments = assignmentsRef.current;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = y * w + x;
                const current = assignments[idx];
                if ((x < w - 1 && assignments[idx + 1] !== current) || 
                    (y < h - 1 && assignments[idx + w] !== current)) {
                    const pIdx = idx * 4;
                    data[pIdx] = lineLightness; 
                    data[pIdx + 1] = lineLightness; 
                    data[pIdx + 2] = lineLightness; 
                    data[pIdx + 3] = 255;
                }
            }
        }
        ctx.putImageData(pixels, 0, 0);
        
        ctx.fillStyle = `rgb(${numberLightness},${numberLightness},${numberLightness})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        labelsRef.current.forEach(l => {
            ctx.font = `${l.s}px sans-serif`;
            ctx.fillText(l.n, l.x, l.y);
        });
    }
  }, [lineLightness, numberLightness]);

  // Draw palette image to canvas when loaded
  useEffect(() => {
      if (showPaletteCreator && paletteCreatorMode === 'image' && paletteImageSrc && paletteCanvasRef.current) {
          const canvas = paletteCanvasRef.current;
          const ctx = canvas.getContext('2d');
          // Simple fit logic to keep it manageable
          const maxH = 300;
          const scale = Math.min(1, maxH / paletteImageSrc.height);
          canvas.width = paletteImageSrc.width * scale;
          canvas.height = paletteImageSrc.height * scale;
          ctx.drawImage(paletteImageSrc, 0, 0, canvas.width, canvas.height);
      }
  }, [showPaletteCreator, paletteCreatorMode, paletteImageSrc]);

  // Save custom palettes to local storage
  useEffect(() => {
      localStorage.setItem('pbn_custom_palettes', JSON.stringify(customPalettes));
  }, [customPalettes]);

  const allPalettes = { ...PAINT_SETS, ...customPalettes };

  // Load image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        
        if (img.width < 800 || img.height < 800) {
            setImageWarning("This image is quite small. For a good printable result (8.5x11), we recommend a larger photo.");
        } else {
            setImageWarning(null);
        }
        
        if (w > maxDim || h > maxDim) {
            const ratio = Math.min(maxDim / w, maxDim / h);
            w *= ratio;
            h *= ratio;
        }

        setImageSrc({ src: img.src, w, h, originalImg: img });
        setPalette([]);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    setTimeout(() => {
        try {
            runKMeans();
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
        }
    }, 100);
  };

  const handlePaletteImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            setPaletteImageSrc(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handlePaletteCanvasClick = (e) => {
      const canvas = paletteCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = canvas.getContext('2d');
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      
      setPickedColors(prev => [...prev, { hex, name: `Color ${prev.length + 1}` }]);
  };

  const switchCreatorMode = (targetMode) => {
      if (paletteCreatorMode === targetMode) return;

      if (paletteCreatorMode === 'text') {
          // Parse text to pickedColors
          const lines = newPaletteInput.split('\n');
          const colors = [];
          for (let line of lines) {
              const hexMatch = line.match(/#([0-9A-Fa-f]{3}){1,2}/);
              if (hexMatch) {
                  let hex = hexMatch[0];
                  // Normalize to 6-digit hex for color inputs
                  const rgb = hexToRgb(hex);
                  hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                  
                  let name = line.replace(hexMatch[0], '').replace(/[,;-]/g, '').trim();
                  if (!name) name = hex;
                  colors.push({ name, hex });
              }
          }
          setPickedColors(colors);
      } else if (targetMode === 'text') {
          // GUI/Image -> Text
          const text = pickedColors.map(c => `${c.name} ${c.hex}`).join('\n');
          setNewPaletteInput(text);
      }
      setPaletteCreatorMode(targetMode);
  };

  const editPalette = (key) => {
      const palette = customPalettes[key];
      if (!palette) return;
      
      setEditingPaletteKey(key);
      setNewPaletteName(key);
      setPickedColors([...palette]);
      setPaletteCreatorMode('gui');
      setShowPaletteCreator(true);
  };

  const handleSavePalette = () => {
    if (!newPaletteName.trim()) {
        alert("Please enter a palette name.");
        return;
    }
    
    let colors = [];

    if (paletteCreatorMode === 'text') {
        if (!newPaletteInput.trim()) return;
        const lines = newPaletteInput.split('\n');
        for (let line of lines) {
            const hexMatch = line.match(/#([0-9A-Fa-f]{3}){1,2}/);
            if (hexMatch) {
                const hex = hexMatch[0];
                let name = line.replace(hex, '').replace(/[,;-]/g, '').trim();
                if (!name) name = hex; 
                colors.push({ name, hex });
            }
        }
        if (colors.length === 0) {
            alert("No valid hex codes found in text!");
            return;
        }
    } else {
        // GUI or Image mode
        if (pickedColors.length === 0) {
            alert("Palette is empty! Add some colors first.");
            return;
        }
        colors = [...pickedColors];
    }
    
    const key = newPaletteName.trim();
    
    setCustomPalettes(prev => {
        const next = { ...prev };
        // If we were editing and the name changed, delete the old key
        if (editingPaletteKey && editingPaletteKey !== key) {
            delete next[editingPaletteKey];
        }
        next[key] = colors;
        return next;
    });

    // If we renamed an active palette, update selectedPalettes
    if (editingPaletteKey && editingPaletteKey !== key && selectedPalettes.includes(editingPaletteKey)) {
        setSelectedPalettes(prev => prev.map(p => p === editingPaletteKey ? key : p));
    }
    
    setNewPaletteName('');
    setNewPaletteInput('');
    setPickedColors([]);
    setPaletteImageSrc(null);
    setEditingPaletteKey(null);
    setShowPaletteCreator(false);
  };

  const deletePalette = (key) => {
      const next = { ...customPalettes };
      delete next[key];
      setCustomPalettes(next);
      if (selectedPalettes.includes(key)) togglePalette(key);
  };

  const exportPalette = (key) => {
      const palette = customPalettes[key];
      if (!palette) return;
      
      const text = palette.map(c => `${c.name} ${c.hex}`).join('\n');
      navigator.clipboard.writeText(text).then(() => {
          alert(`Palette "${key}" copied to clipboard!`);
      }).catch(err => {
          alert('Failed to copy palette to clipboard.');
      });
  };

  const updatePickedColorName = (idx, newName) => {
      const next = [...pickedColors];
      next[idx].name = newName;
      setPickedColors(next);
  };
  
  const removePickedColor = (idx) => {
      setPickedColors(prev => prev.filter((_, i) => i !== idx));
  };

  const updatePickedColorHex = (idx, newHex) => {
      const next = [...pickedColors];
      next[idx].hex = newHex;
      setPickedColors(next);
  };

  const addNewColor = () => {
      setPickedColors(prev => [...prev, { name: 'New Color', hex: '#000000' }]);
  };

  const togglePalette = (key) => {
    setSelectedPalettes(prev => {
      if (key === 'generic') {
        return ['generic'];
      }
      const newSet = prev.filter(k => k !== 'generic');
      if (newSet.includes(key)) {
        return newSet.filter(k => k !== key).length ? newSet.filter(k => k !== key) : ['generic'];
      } else {
        return [...newSet, key];
      }
    });
  };

  const cleanUpSmallRegions = (assignments, w, h, threshold) => {
    const visited = new Uint8Array(w * h);
    const newAssignments = new Uint8Array(assignments);
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    for (let i = 0; i < assignments.length; i++) {
        if (visited[i]) continue;
        const color = assignments[i];
        const region = [i];
        visited[i] = 1;
        let queue = [i];
        
        const neighborColors = {}; 
        let maxNeighborCount = 0;
        let bestNeighbor = -1;

        let head = 0;
        while(head < queue.length) {
            const currIdx = queue[head++];
            const cx = currIdx % w;
            const cy = Math.floor(currIdx / w);

            for (let d = 0; d < 4; d++) {
                const nx = cx + dx[d];
                const ny = cy + dy[d];
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                    const nIdx = ny * w + nx;
                    const nColor = assignments[nIdx];
                    if (nColor === color) {
                        if (!visited[nIdx]) {
                            visited[nIdx] = 1;
                            region.push(nIdx);
                            queue.push(nIdx);
                        }
                    } else {
                        neighborColors[nColor] = (neighborColors[nColor] || 0) + 1;
                        if (neighborColors[nColor] > maxNeighborCount) {
                            maxNeighborCount = neighborColors[nColor];
                            bestNeighbor = nColor;
                        }
                    }
                }
            }
        }
        if (region.length < threshold && bestNeighbor !== -1) {
            for (let idx of region) {
                newAssignments[idx] = bestNeighbor;
            }
        }
    }
    return newAssignments;
  };

  const getSaturation = (rgb) => {
      const max = Math.max(rgb[0], rgb[1], rgb[2]);
      const min = Math.min(rgb[0], rgb[1], rgb[2]);
      if (max === 0) return 0;
      return (max - min) / max;
  };

  const isCool = (rgb) => {
      return (rgb[2] > rgb[0] || (rgb[1] > rgb[0] && rgb[2] > 50));
  };
  
  const isWarm = (rgb) => {
      return (rgb[0] > rgb[2] && rgb[0] > 50);
  };

  const runKMeans = () => {
    const w = Math.floor(imageSrc.w / detailLevel);
    const h = Math.floor(imageSrc.h / detailLevel);
    
    const complexityMap = [10, 20, 30, 45, 60];
    const targetColorCount = complexityMap[complexityLevel - 1];

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(imageSrc.originalImg, 0, 0, w, h);
    
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const pixelCount = w * h;
    const pixels = [];

    for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i], data[i+1], data[i+2]]);
    }

    // 1. Initialize K-Means
    let centroids = [];
    for (let i = 0; i < targetColorCount; i++) {
        centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
    }

    const iterations = 5; 
    let assignments = new Uint8Array(pixelCount);

    // 2. Standard K-Means Loop
    for (let iter = 0; iter < iterations; iter++) {
        const sums = Array(targetColorCount).fill(0).map(() => [0, 0, 0]);
        const counts = Array(targetColorCount).fill(0);

        for (let i = 0; i < pixelCount; i++) {
            let minDist = Infinity;
            let bestK = 0;
            const px = pixels[i];
            
            for (let k = 0; k < targetColorCount; k++) {
                const dr = px[0] - centroids[k][0];
                const dg = px[1] - centroids[k][1];
                const db = px[2] - centroids[k][2];
                const dist = (dr*dr*0.3) + (dg*dg*0.59) + (db*db*0.11);
                
                if (dist < minDist) {
                    minDist = dist;
                    bestK = k;
                }
            }
            assignments[i] = bestK;
            sums[bestK][0] += px[0];
            sums[bestK][1] += px[1];
            sums[bestK][2] += px[2];
            counts[bestK]++;
        }

        let maxShift = 0;
        for (let k = 0; k < targetColorCount; k++) {
            if (counts[k] > 0) {
                const newR = sums[k][0] / counts[k];
                const newG = sums[k][1] / counts[k];
                const newB = sums[k][2] / counts[k];
                const shift = Math.abs(newR - centroids[k][0]) + Math.abs(newG - centroids[k][1]) + Math.abs(newB - centroids[k][2]);
                if (shift > maxShift) maxShift = shift;
                centroids[k] = [newR, newG, newB];
            }
        }
        if (maxShift < 1) break;
    }

    // --- DE-SPECKLE PASS ---
    if (smoothness > 0) {
        const useLargeKernel = smoothness >= 3;
        const radius = useLargeKernel ? 2 : 1;
        const passes = smoothness >= 2 ? 2 : 1; 
        
        let current = new Uint8Array(assignments);
        let next = new Uint8Array(assignments.length);
        
        for (let p = 0; p < passes; p++) {
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = y * w + x;
                    const counts = {};
                    let maxCount = 0;
                    let bestMode = current[idx];

                    for (let dy = -radius; dy <= radius; dy++) {
                        for (let dx = -radius; dx <= radius; dx++) {
                            const nx = x + dx;
                            const ny = y + dy;
                            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                                const nIdx = ny * w + nx;
                                const val = current[nIdx];
                                counts[val] = (counts[val] || 0) + 1;
                                if (counts[val] > maxCount) {
                                    maxCount = counts[val];
                                    bestMode = val;
                                }
                            }
                        }
                    }
                    next[idx] = bestMode;
                }
            }
            current.set(next);
        }
        assignments = current;
    }

    // --- ORGANIC EDGES PASS ---
    // Removes single-pixel protrusions ("jutting spots") to create smoother, more paintable shapes.
    if (edgeSmoothing > 0) {
             let orgCurrent = new Uint8Array(assignments);
             let orgNext = new Uint8Array(assignments.length);
             // Amped up: More passes and 8-neighbor check for rounder, more organic shapes
             const edgePasses = edgeSmoothing * 4;

             for (let ep = 0; ep < edgePasses; ep++) {
                 for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const idx = y * w + x;
                        const val = orgCurrent[idx];
                        
                        const counts = {};
                        let maxCount = 0;
                        let maxColor = val;
                        
                        // Check 8 neighbors (Moore neighborhood)
                        for (let ny = -1; ny <= 1; ny++) {
                            for (let nx = -1; nx <= 1; nx++) {
                                if (nx === 0 && ny === 0) continue;
                                const n_x = x + nx;
                                const n_y = y + ny;
                                if (n_x >= 0 && n_x < w && n_y >= 0 && n_y < h) {
                                    const neighborVal = orgCurrent[n_y * w + n_x];
                                    counts[neighborVal] = (counts[neighborVal] || 0) + 1;
                                    if (counts[neighborVal] > maxCount) {
                                        maxCount = counts[neighborVal];
                                        maxColor = neighborVal;
                                    }
                                }
                            }
                        }
                        
                        // If 5 or more neighbors (majority of 8) are the SAME color, swap.
                        if (maxCount >= 5 && maxColor !== val) {
                            orgNext[idx] = maxColor;
                        } else {
                            orgNext[idx] = val;
                        }
                    }
                 }
                 orgCurrent.set(orgNext);
             }
             assignments = orgCurrent;
    }

    // --- CLEANUP ---
    if (smoothness >= 3) {
        let threshold = 10; 
        if (smoothness === 4) threshold = 50; 
        if (smoothness === 5) threshold = 200; 
        assignments = cleanUpSmallRegions(assignments, w, h, threshold);
    }


    // 3. Snap to Palette + WILD CARD + CHAOS LOGIC
    let finalColors = [];
    
    let targetSet = [];
    if (!selectedPalettes.includes('generic')) {
        const rawColors = selectedPalettes.flatMap(key => allPalettes[key] || []);
        const seen = new Set();
        targetSet = rawColors.filter(c => {
            const duplicate = seen.has(c.hex);
            seen.add(c.hex);
            return !duplicate;
        });
    }

    if (targetSet.length > 0) {
        const targetRgbs = targetSet.map(c => ({ ...c, rgb: hexToRgb(c.hex), sat: 0 }));
        targetRgbs.forEach(t => t.sat = getSaturation(t.rgb));
        
        const fondnessRgb = useFondness ? hexToRgb(fondnessColor) : null;
        
        // Count how many times each paint has been used so far
        const paintUsage = {}; 

        const snappedCentroids = centroids.map(c => {
            let minD = Infinity;
            let match = targetRgbs[0];
            
            const centroidSat = getSaturation(c);
            const centroidLum = (c[0]*0.299 + c[1]*0.587 + c[2]*0.114);

            for (let t of targetRgbs) {
                let d = colorDist(c, t.rgb);

                // --- CHAOS / VARIETY LOGIC ---
                // Applied BEFORE Pop logic to ensure penalties scale correctly
                if (varietyLevel > 0) {
                    const usage = paintUsage[t.hex] || 0;
                    // Increased penalties: [0, 0.5, 2.0, 10.0]
                    const penaltyFactor = [0, 0.5, 2.0, 10.0][varietyLevel]; 
                    // Additive + Multiplicative to ensure even perfect matches (d=0) get penalized
                    d = (d + (usage * 5)) * (1 + (usage * penaltyFactor)); 
                }

                // --- WILDCARD / POP LOGIC ---
                if (popLevel > 0) {
                    let bias = 0;
                    bias += t.sat * (popLevel * 20);
                    if (popLevel >= 2) {
                        if (centroidLum < 80 && isCool(t.rgb)) bias += (popLevel * 15);
                        if (centroidLum > 180 && isWarm(t.rgb)) bias += (popLevel * 15);
                    }
                    d -= bias;
                }

                // --- COLOR FONDNESS LOGIC ---
                if (useFondness && fondnessRgb) {
                    const dFond = colorDist(t.rgb, fondnessRgb);
                    // Strong bias for paints that match the fondness color
                    // Approx max Euclidean dist is ~441
                    const maxInfluence = 250;
                    if (dFond < maxInfluence) {
                        // The closer the paint is to the fondness color, the bigger the bonus
                        const bonus = (1 - (dFond / maxInfluence)) * 150; 
                        d -= bonus;
                    }
                }
                
                if (d < minD) {
                    minD = d;
                    match = t;
                }
            }
            
            paintUsage[match.hex] = (paintUsage[match.hex] || 0) + 1;
            
            return { rgb: match.rgb, name: match.name, hex: match.hex };
        });

        const uniqueMap = new Map(); 
        const newCentroids = [];
        const remapping = new Array(targetColorCount); 

        snappedCentroids.forEach((sc, oldIdx) => {
            if (!uniqueMap.has(sc.hex)) {
                uniqueMap.set(sc.hex, newCentroids.length);
                newCentroids.push(sc);
            }
            remapping[oldIdx] = uniqueMap.get(sc.hex);
        });

        for(let i=0; i<pixelCount; i++) {
            assignments[i] = remapping[assignments[i]];
        }
        
        finalColors = newCentroids.map(c => ({ 
            rgb: c.rgb, 
            name: c.name, 
            hex: c.hex 
        }));

    } else {
        finalColors = centroids.map(c => ({
             rgb: c.map(Math.round), 
             name: null, 
             hex: rgbToHex(Math.round(c[0]), Math.round(c[1]), Math.round(c[2])) 
        }));
    }

    // 4. Sort by Luminance
    const objs = finalColors.map((c, idx) => ({ ...c, idx, lum: c.rgb[0]*0.299 + c.rgb[1]*0.587 + c.rgb[2]*0.114 }));
    objs.sort((a, b) => b.lum - a.lum);
    
    const sortRemap = new Array(finalColors.length);
    const sortedPalette = [];
    
    objs.forEach((o, newIdx) => {
        sortRemap[o.idx] = newIdx;
        sortedPalette.push(o);
    });

    for(let i=0; i<pixelCount; i++) {
        assignments[i] = sortRemap[assignments[i]];
    }

    setPalette(sortedPalette);
    renderResults(w, h, assignments, sortedPalette.map(p => p.rgb));
  };

  const renderResults = (w, h, assignments, centroids) => {
    // 1. Preview
    const prevCanvas = previewCanvasRef.current;
    if (prevCanvas) {
        prevCanvas.width = w;
        prevCanvas.height = h;
        const ctx = prevCanvas.getContext('2d');
        const imgData = ctx.createImageData(w, h);
        
        for (let i = 0; i < assignments.length; i++) {
            const color = centroids[assignments[i]];
            imgData.data[i*4] = color[0];
            imgData.data[i*4+1] = color[1];
            imgData.data[i*4+2] = color[2];
            imgData.data[i*4+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

    // 2. Outlines & Numbers
    const outCanvas = outlineCanvasRef.current;
    if (outCanvas) {
        outCanvas.width = w;
        outCanvas.height = h;
        const ctx = outCanvas.getContext('2d');
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);
        
        const pixels = ctx.createImageData(w, h);
        const data = pixels.data;

        for(let i=0; i<data.length; i++) data[i] = 255; 

        // Edge detection
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = y * w + x;
                const current = assignments[idx];
                let isEdge = false;
                if (x < w - 1 && assignments[idx + 1] !== current) isEdge = true;
                if (y < h - 1 && assignments[idx + w] !== current) isEdge = true;

                if (isEdge) {
                    const pIdx = idx * 4;
                    data[pIdx] = lineLightness; data[pIdx + 1] = lineLightness; data[pIdx + 2] = lineLightness; data[pIdx + 3] = 255;
                }
            }
        }
        ctx.putImageData(pixels, 0, 0);
        assignmentsRef.current = assignments;
        dataDimsRef.current = { w, h };

        // Numbering
        ctx.fillStyle = `rgb(${numberLightness},${numberLightness},${numberLightness})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const visited = new Uint8Array(w * h);
        const totalPixels = w * h;
        const minRegionSize = Math.max(10, Math.floor(totalPixels * 0.0001)); 
        // Increased grid size to reduce repetition frequency
        const labelGridSize = Math.max(80, Math.floor(Math.max(w, h) / 8));
        const allRegions = [];

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = y * w + x;
                if (visited[idx]) continue;
                const colorIdx = assignments[idx];
                let stack = [idx];
                visited[idx] = 1;
                let regionIndices = [];
                
                while (stack.length > 0) {
                    const currIdx = stack.pop();
                    regionIndices.push(currIdx);
                    const cx = currIdx % w;
                    const n_right = currIdx + 1;
                    const n_left = currIdx - 1;
                    const n_down = currIdx + w;
                    const n_up = currIdx - w;

                    if (cx < w - 1 && !visited[n_right] && assignments[n_right] === colorIdx) {
                         visited[n_right] = 1; stack.push(n_right);
                    }
                    if (cx > 0 && !visited[n_left] && assignments[n_left] === colorIdx) {
                         visited[n_left] = 1; stack.push(n_left);
                    }
                    if (n_down < totalPixels && !visited[n_down] && assignments[n_down] === colorIdx) {
                         visited[n_down] = 1; stack.push(n_down);
                    }
                    if (n_up >= 0 && !visited[n_up] && assignments[n_up] === colorIdx) {
                         visited[n_up] = 1; stack.push(n_up);
                    }
                }

                if (regionIndices.length > minRegionSize) {
                    allRegions.push({
                        colorIdx,
                        indices: regionIndices
                    });
                }
            }
        }

        // Sort regions: Smallest first to ensure they get labeled before big regions cover them
        allRegions.sort((a, b) => a.indices.length - b.indices.length);

        const labels = [];
        const placedBoxes = []; // {l, r, t, b}

        const checkCollision = (x, y, fontSize, text) => {
            const w = fontSize * 0.6 * text.length;
            const h = fontSize;
            const pad = 4; // Padding around text
            const box = { l: x - w/2 - pad, r: x + w/2 + pad, t: y - h/2 - pad, b: y + h/2 + pad };
            
            for (let b of placedBoxes) {
                if (!(box.r < b.l || box.l > b.r || box.b < b.t || box.t > b.b)) {
                    return true;
                }
            }
            return false;
        };

        const addLabel = (x, y, fontSize, text) => {
             const w = fontSize * 0.6 * text.length;
             const h = fontSize;
             const pad = 2;
             placedBoxes.push({ l: x - w/2 - pad, r: x + w/2 + pad, t: y - h/2 - pad, b: y + h/2 + pad });
             
             ctx.font = `${fontSize}px sans-serif`;
             ctx.fillText(text, x, y);
             labels.push({ x, y, n: text, s: fontSize });
        };

        for (let region of allRegions) {
            const { colorIdx, indices } = region;
            const labelText = (colorIdx + 1).toString();
            const radius = Math.sqrt(indices.length / Math.PI);
            const fontSize = Math.max(8, Math.min(24, Math.floor(radius * 0.7)));
            
            const useMultiLabel = indices.length > (labelGridSize * labelGridSize / 2);

            if (!useMultiLabel) {
                let sumX = 0, sumY = 0;
                for(let idx of indices) {
                    sumX += (idx % w);
                    sumY += Math.floor(idx / w);
                }
                const centerX = Math.floor(sumX / indices.length);
                const centerY = Math.floor(sumY / indices.length);
                const centerIdx = centerY * w + centerX;
                
                if (assignments[centerIdx] === colorIdx) {
                    if (!checkCollision(centerX, centerY, fontSize, labelText, colorIdx)) {
                        addLabel(centerX, centerY, fontSize, labelText);
                    }
                }
            } else {
                const buckets = {};
                for(let idx of indices) {
                    const rx = idx % w;
                    const ry = Math.floor(idx / w);
                    const bx = Math.floor(rx / labelGridSize);
                    const by = Math.floor(ry / labelGridSize);
                    const key = `${bx}_${by}`;
                    if (!buckets[key]) buckets[key] = { sumX: 0, sumY: 0, count: 0 };
                    buckets[key].sumX += rx;
                    buckets[key].sumY += ry;
                    buckets[key].count++;
                }
                for(let key in buckets) {
                    const b = buckets[key];
                    if (b.count > (labelGridSize * labelGridSize * 0.15)) {
                        const centerX = Math.floor(b.sumX / b.count);
                        const centerY = Math.floor(b.sumY / b.count);
                        const centerIdx = centerY * w + centerX;
                        if (assignments[centerIdx] === colorIdx) {
                            if (!checkCollision(centerX, centerY, fontSize, labelText, colorIdx)) {
                                addLabel(centerX, centerY, fontSize, labelText);
                            }
                        }
                    }
                }
            }
        }
        labelsRef.current = labels;
    }
    
    setIsProcessing(false);
  };

  const downloadCanvas = (ref, filename) => {
      const canvas = ref.current;
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
  };

  const handleDownloadTemplate = () => {
      if (!assignmentsRef.current || !labelsRef.current) return;
      
      const size = PRINT_SIZES[printSizeIndex];
      const dpi = 300;
      
      // Determine orientation match
      // If image is landscape but target is portrait (or vice versa), swap target dims
      const imgAspect = imageSrc.w / imageSrc.h;
      let targetW = size.w;
      let targetH = size.h;
      
      if ((imgAspect > 1 && targetW < targetH) || (imgAspect < 1 && targetW > targetH)) {
          [targetW, targetH] = [targetH, targetW];
      }
      
      const pixelW = Math.floor(targetW * dpi);
      const pixelH = Math.floor(targetH * dpi);
      
      const canvas = document.createElement('canvas');
      canvas.width = pixelW;
      canvas.height = pixelH;
      const ctx = canvas.getContext('2d');
      
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, pixelW, pixelH);
      
      let availH = pixelH;
      
      // Draw Palette if requested
      if (includePaletteOnDownload && palette.length > 0) {
          const margin = 50; 
          const cols = 3;
          const rows = Math.ceil(palette.length / cols);
          const rowHeight = 120; 
          const paletteHeight = (rows * rowHeight) + (margin * 2) + 80; // + header
          
          // Ensure we don't take up more than 50% of the page for palette if possible, 
          // but we must fit the text. Let's just reserve what we need.
          const paletteStartY = pixelH - paletteHeight;
          availH = paletteStartY;
          
          // Draw Separator
          ctx.beginPath();
          ctx.moveTo(margin, paletteStartY);
          ctx.lineTo(pixelW - margin, paletteStartY);
          ctx.strokeStyle = '#999';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Header
          ctx.fillStyle = '#333';
          ctx.font = 'bold 40px sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText("Color Palette", margin, paletteStartY + margin);
          
          const colWidth = (pixelW - (margin * 2)) / cols;
          
          palette.forEach((color, i) => {
              const r = Math.floor(i / cols);
              const c = i % cols;
              const x = margin + (c * colWidth);
              const y = paletteStartY + margin + 80 + (r * rowHeight);
              
              // Index
              ctx.fillStyle = '#333';
              ctx.font = 'bold 30px sans-serif';
              ctx.fillText(`${i + 1}.`, x, y + 15);
              
              // Swatches
              ctx.fillStyle = `rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`;
              ctx.fillRect(x + 60, y, 50, 50);
              ctx.strokeRect(x + 60, y, 50, 50); // Border
              
              // Empty Test Swatch
              ctx.fillStyle = '#fff';
              ctx.fillRect(x + 120, y, 50, 50);
              ctx.strokeRect(x + 120, y, 50, 50);
              
              // Text
              ctx.fillStyle = '#333';
              ctx.font = '24px sans-serif';
              ctx.fillText(color.name || "Custom", x + 180, y);
              ctx.fillStyle = '#666';
              ctx.font = '20px monospace';
              ctx.fillText(color.hex, x + 180, y + 30);
          });
      }
      
      // Calculate scale to fit image into remaining target area
      const scaleX = pixelW / dataDimsRef.current.w;
      const scaleY = availH / dataDimsRef.current.h;
      const scale = Math.min(scaleX, scaleY);
      
      const drawW = Math.floor(dataDimsRef.current.w * scale);
      const drawH = Math.floor(dataDimsRef.current.h * scale);
      const offsetX = Math.floor((pixelW - drawW) / 2);
      const offsetY = Math.floor((availH - drawH) / 2);
      
      // Draw Edges (Vector tracing for crisp lines)
      ctx.lineWidth = 4; // Bolder lines for better visibility in print
      ctx.lineCap = 'round'; // Rounds the corners for a smoother, less pixelated look
      ctx.strokeStyle = `rgb(${lineLightness},${lineLightness},${lineLightness})`;
      
      const srcW = dataDimsRef.current.w;
      const srcH = dataDimsRef.current.h;
      const data = assignmentsRef.current;
      
      ctx.beginPath();
      for (let y = 0; y < srcH; y++) {
          for (let x = 0; x < srcW; x++) {
              const idx = y * srcW + x;
              const curr = data[idx];
              
              // Right neighbor
              if (x < srcW - 1 && data[idx + 1] !== curr) {
                  const lx = offsetX + (x + 1) * scale;
                  const ly_start = offsetY + y * scale;
                  const ly_end = offsetY + (y + 1) * scale;
                  ctx.moveTo(lx, ly_start);
                  ctx.lineTo(lx, ly_end);
              }
              
              // Bottom neighbor
              if (y < srcH - 1 && data[idx + srcW] !== curr) {
                  const ly = offsetY + (y + 1) * scale;
                  const lx_start = offsetX + x * scale;
                  const lx_end = offsetX + (x + 1) * scale;
                  ctx.moveTo(lx_start, ly);
                  ctx.lineTo(lx_end, ly);
              }
          }
          // Flush path every row to prevent memory issues with huge paths
          ctx.stroke();
          ctx.beginPath();
      }
      
      // Draw Numbers (Re-rendered at high resolution)
      ctx.fillStyle = `rgb(${numberLightness},${numberLightness},${numberLightness})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      labelsRef.current.forEach(l => {
          const fontSize = Math.max(10, Math.floor(l.s * scale));
          ctx.font = `${fontSize}px sans-serif`;
          // Offset by scale/2 to center in the scaled pixel grid
          ctx.fillText(l.n, offsetX + (l.x * scale) + (scale/2), offsetY + (l.y * scale) + (scale/2));
      });
      
      const link = document.createElement('a');
      link.download = `pbn-template-${size.w}x${size.h}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
  };

  const triggerPrint = () => {
      window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans print:bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🖌️</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={handleDownloadTemplate}
                disabled={!palette.length}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
                <Download size={16} /> Download Template at {PRINT_SIZES[printSizeIndex].label}
            </button>
            <button 
                onClick={triggerPrint}
                disabled={!palette.length}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
                <Printer size={16} /> Print
            </button>
            <button 
                onClick={() => document.getElementById('file-upload').click()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors shadow-sm"
            >
                <ImageIcon size={16} /> {imageSrc ? 'New Image' : 'Upload Image'}
            </button>
            <input 
                id="file-upload"
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                className="hidden" 
                onChange={handleImageUpload} 
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 flex-grow w-full">
        {!imageSrc ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-gray-300 rounded-2xl bg-white">
            <div className="bg-indigo-50 p-6 rounded-full mb-6">
                <ImageIcon className="w-16 h-16 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your own Paint by Numbers</h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
                Upload any photo to instantly generate a printable paint-by-number template. 
                Running 100% locally in your browser.
            </p>
            <button 
                onClick={() => document.getElementById('file-upload').click()}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
                Select Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-3 space-y-6 print:hidden">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Sliders size={14} /> Settings
                    </h3>
                    
                    <div className="space-y-6">
                        
                        {/* Paint Set Selector */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                                <Box size={14} /> Paint Sets
                            </label>
                            <div className="space-y-1 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50 mb-2">
                                {Object.keys(allPalettes).map(key => (
                                    <div key={key} className="flex items-center justify-between hover:bg-white p-1.5 rounded transition-colors group">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer flex-grow">
                                            <input 
                                                type="checkbox"
                                                checked={selectedPalettes.includes(key)}
                                                onChange={() => togglePalette(key)}
                                                className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="text-gray-700 truncate max-w-[140px]">
                                                {PALETTE_LABELS[key] || key}
                                            </span>
                                        </label>
                                        {customPalettes[key] && (
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => editPalette(key)}
                                                    className="text-gray-400 hover:text-indigo-600 p-1"
                                                    title="Edit Palette"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => exportPalette(key)}
                                                    className="text-gray-400 hover:text-indigo-600 p-1"
                                                    title="Copy Palette to Clipboard"
                                                >
                                                    <Copy size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deletePalette(key)}
                                                    className="text-gray-400 hover:text-red-500 p-1"
                                                    title="Delete Palette"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setEditingPaletteKey(null);
                                    setNewPaletteName('');
                                    setNewPaletteInput('');
                                    setPickedColors([]);
                                    setPaletteImageSrc(null);
                                    setPaletteCreatorMode('gui');
                                    setShowPaletteCreator(true);
                                }}
                                className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                            >
                                <Plus size={12} /> Add Custom Palette
                            </button>

                            {showPaletteCreator && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-lg">{editingPaletteKey ? 'Edit Palette' : 'Add New Palette'}</h3>
                                            <button onClick={() => setShowPaletteCreator(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                                        </div>
                                        
                                        <div className="flex gap-4 border-b border-gray-200 mb-4">
                                            <button 
                                                className={`pb-2 px-1 text-sm font-medium transition-colors ${paletteCreatorMode === 'gui' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                onClick={() => switchCreatorMode('gui')}
                                            >
                                                <div className="flex items-center gap-1"><List size={14}/> Manual List</div>
                                            </button>
                                            <button 
                                                className={`pb-2 px-1 text-sm font-medium transition-colors ${paletteCreatorMode === 'text' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                onClick={() => switchCreatorMode('text')}
                                            >
                                                Text Input
                                            </button>
                                            <button 
                                                className={`pb-2 px-1 text-sm font-medium transition-colors ${paletteCreatorMode === 'image' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                onClick={() => switchCreatorMode('image')}
                                            >
                                                From Photo
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <input 
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Palette Name (e.g. My Golden Acrylics)"
                                                value={newPaletteName}
                                                onChange={e => setNewPaletteName(e.target.value)}
                                            />
                                            
                                            {paletteCreatorMode === 'text' ? (
                                                <textarea 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono h-32 focus:ring-2 focus:ring-indigo-500"
                                                    placeholder={`Paste colors here...\nExample:\nCadmium Red #E34234\nTeal #008080`}
                                                    value={newPaletteInput}
                                                    onChange={e => setNewPaletteInput(e.target.value)}
                                                />
                                            ) : paletteCreatorMode === 'image' ? (
                                                <div className="space-y-4">
                                                    {!paletteImageSrc ? (
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('palette-upload').click()}>
                                                            <Pipette className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-500">Upload a photo of your paints</p>
                                                            <input id="palette-upload" type="file" accept="image/*" className="hidden" onChange={handlePaletteImageUpload} />
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            <p className="text-xs text-gray-500 flex items-center gap-1"><Info size={12}/> Click on the image to pick colors</p>
                                                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex justify-center">
                                                                <canvas 
                                                                    ref={paletteCanvasRef} 
                                                                    onClick={handlePaletteCanvasClick}
                                                                    className="cursor-crosshair max-w-full h-auto"
                                                                />
                                                            </div>
                                                            <button onClick={() => setPaletteImageSrc(null)} className="text-xs text-red-500 hover:underline">Remove Image</button>
                                                        </div>
                                                    )}
                                                    
                                                    {pickedColors.length > 0 && (
                                                        <div className="border-t border-gray-100 pt-4">
                                                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Picked Colors ({pickedColors.length})</h4>
                                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                                                {pickedColors.map((c, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg">
                                                                        <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm flex-shrink-0" style={{backgroundColor: c.hex}} />
                                                                        <input 
                                                                            value={c.name}
                                                                            onChange={(e) => updatePickedColorName(idx, e.target.value)}
                                                                            className="flex-grow text-xs bg-transparent border-none focus:ring-0 p-0"
                                                                        />
                                                                        <span className="text-[10px] text-gray-400 font-mono">{c.hex}</span>
                                                                        <button onClick={() => removePickedColor(idx)} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // GUI Mode
                                                <div className="space-y-4">
                                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                                        {pickedColors.map((c, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                                                <input 
                                                                    type="color"
                                                                    value={c.hex}
                                                                    onChange={(e) => updatePickedColorHex(idx, e.target.value)}
                                                                    className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
                                                                />
                                                                <input 
                                                                    value={c.hex}
                                                                    onChange={(e) => updatePickedColorHex(idx, e.target.value)}
                                                                    className="w-20 text-xs font-mono border border-gray-300 rounded px-2 py-1"
                                                                />
                                                                <input 
                                                                    value={c.name}
                                                                    onChange={(e) => updatePickedColorName(idx, e.target.value)}
                                                                    className="flex-grow text-sm border border-gray-300 rounded px-2 py-1"
                                                                    placeholder="Color Name"
                                                                />
                                                                <button onClick={() => removePickedColor(idx)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={16}/></button>
                                                            </div>
                                                        ))}
                                                        {pickedColors.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No colors yet.</p>}
                                                    </div>
                                                    <button onClick={addNewColor} className="w-full py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center gap-1"><Plus size={14}/> Add Color</button>
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleSavePalette}
                                                className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                                            >
                                                Save Palette
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-1">
                                {selectedPalettes.includes('generic') ? 'Mix your own colors.' : 'Snaps colors to the combined selected sets.'}
                            </p>
                        </div>

                        {/* Complexity Sliders */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Palette Complexity
                                </label>
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                    {['Simple', 'Basic', 'Standard', 'Detailed', 'Intricate'][complexityLevel - 1]}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                value={complexityLevel} 
                                onChange={(e) => setComplexityLevel(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                                <span>Few Colors</span>
                                <span>Many Colors</span>
                            </div>
                        </div>

                        {/* De-speckle Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Droplet size={14} className="text-indigo-500"/> De-speckle
                                </label>
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                    {['None', 'Light', 'Medium', 'Strong', 'Aggressive', 'Blocky'][smoothness]}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="5" 
                                value={smoothness} 
                                onChange={(e) => setSmoothness(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                Merges speckles and noise.
                            </p>
                        </div>

                        {/* Edge Smoothing Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Feather size={14} className="text-teal-500"/> Edge Smoothing
                                </label>
                                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                                    {['None', 'Low', 'Medium', 'High', 'Ultra'][edgeSmoothing]}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="4" 
                                value={edgeSmoothing} 
                                onChange={(e) => setEdgeSmoothing(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                Smooths out jagged lines and sharp corners.
                            </p>
                        </div>
                        
                         {/* POP / WILDCARD Slider */}
                         <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Sparkles size={14} className="text-pink-500"/> Vibe / Pop
                                </label>
                                <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                                    {['Realistic', 'Vibrant', 'Artistic', 'Wildcard'][popLevel]}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="3" 
                                value={popLevel} 
                                onChange={(e) => setPopLevel(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                {popLevel === 0 ? "Strict color matching." : 
                                 popLevel === 3 ? "Replaces boring colors with complementary accents." :
                                 "Favors saturated colors over greys."}
                            </p>
                        </div>

                         {/* CHAOS / VARIETY Slider */}
                         <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Shuffle size={14} className="text-orange-500"/> Palette Variety
                                </label>
                                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                                    {['Strict', 'Balanced', 'Expanded', 'Maximum'][varietyLevel]}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="3" 
                                value={varietyLevel} 
                                onChange={(e) => setVarietyLevel(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                {varietyLevel === 0 ? "Merges similar shades." : "Forces distinct paint colors to increase palette size."}
                            </p>
                        </div>

                        {/* Color Fondness Toggle (NEW) */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Heart size={14} className="text-rose-500"/> Color Fondness
                                </label>
                                <div className="flex items-center gap-2">
                                    {useFondness && (
                                         <input 
                                            type="color" 
                                            value={fondnessColor}
                                            onChange={(e) => setFondnessColor(e.target.value)}
                                            className="w-6 h-6 rounded-full overflow-hidden border-none p-0 cursor-pointer"
                                         />
                                    )}
                                    <button
                                        onClick={() => setUseFondness(!useFondness)}
                                         className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${useFondness ? 'bg-rose-500' : 'bg-gray-200'}`}
                                    >
                                         <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${useFondness ? 'translate-x-4' : 'translate-x-0'}`}
                                        />
                                    </button>
                                </div>
                            </div>
                            {useFondness && (
                                <p className="text-[10px] text-gray-500 mt-1">
                                    Biases selection towards this hue.
                                </p>
                            )}
                        </div>

                        {/* Print Size Selector */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                                <Ruler size={14} /> Target Print Size
                            </label>
                            <select 
                                value={printSizeIndex} 
                                onChange={(e) => setPrintSizeIndex(parseInt(e.target.value))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {PRINT_SIZES.map((size, idx) => (
                                    <option key={idx} value={idx}>{size.label}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">High-res download will match this size.</p>
                        </div>

                        {/* Include Palette Toggle */}
                        <div className="flex items-center gap-2">
                             <input 
                                type="checkbox" 
                                id="includePalette"
                                checked={includePaletteOnDownload}
                                onChange={(e) => setIncludePaletteOnDownload(e.target.checked)}
                                className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                             />
                             <label htmlFor="includePalette" className="text-sm font-medium text-gray-700">Include Palette on Download</label>
                        </div>

                        {/* Visibility Sliders */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                                <Sun size={14} /> Template Visibility
                            </label>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Line Darkness</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="255" 
                                        value={255 - lineLightness} 
                                        onChange={(e) => setLineLightness(255 - parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Number Darkness</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="255" 
                                        value={255 - numberLightness} 
                                        onChange={(e) => setNumberLightness(255 - parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Detail Level
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 4].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setDetailLevel(level)}
                                        className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                                            detailLevel === level 
                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        {level === 1 ? 'High' : level === 2 ? 'Medium' : 'Low'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={processImage}
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                                {isProcessing ? 'Processing...' : 'Generate Template'}
                            </button>
                            
                            <div className="flex gap-2 p-2 bg-yellow-50 text-yellow-800 text-xs rounded-lg items-start">
                                <Info size={14} className="mt-0.5 flex-shrink-0" />
                                <p>Note: Each generation is unique. If you like a result, save it before regenerating!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {palette.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Palette Map</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {palette.map((color, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 group relative">
                                    <div 
                                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: `rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})` }}
                                    />
                                    <span className="text-[10px] text-gray-500 font-mono">{idx + 1}</span>
                                    {color.name && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                            {color.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Canvas Area */}
            <div className="lg:col-span-9 space-y-6">
                
                {imageWarning && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-sm print:hidden">
                        <AlertTriangle className="flex-shrink-0" size={18} />
                        {imageWarning}
                    </div>
                )}

                <div className="flex items-center justify-between print:hidden">
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        {[
                            { id: 'compare', label: 'Split View', icon: Layers },
                            { id: 'outline', label: 'Outline Only', icon: ImageIcon },
                            { id: 'preview', label: 'Paint Preview', icon: Palette },
                            { id: 'palette', label: 'Paint List', icon: List },
                        ].map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                    viewMode === mode.id 
                                    ? 'bg-white text-gray-900 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <mode.icon size={16} />
                                <span className="hidden sm:inline">{mode.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-[500px] flex items-center justify-center overflow-hidden relative">
                    {!palette.length && !isProcessing && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm z-10 text-center p-6">
                           <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                               <RefreshCw className="text-indigo-400 w-8 h-8" />
                           </div>
                           <h3 className="text-lg font-medium text-gray-900">Ready to Generate</h3>
                           <p className="text-gray-500 max-w-sm mt-2">
                               Adjust settings on the left if needed, then click "Generate Template" to create your paint-by-number.
                           </p>
                       </div>
                    )}

                    <div className={`relative w-full h-full flex items-center justify-center ${viewMode === 'compare' ? 'gap-4 flex-col lg:flex-row' : ''}`}>
                        <div className={`
                            relative shadow-lg border-8 border-white bg-white
                            ${viewMode === 'preview' || viewMode === 'palette' ? 'hidden' : 'block'}
                            ${viewMode === 'compare' ? 'w-full lg:w-1/2' : 'w-full'}
                        `}>
                            <canvas ref={outlineCanvasRef} className="w-full h-auto block" />
                            {viewMode === 'compare' && (
                                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Template</div>
                            )}
                        </div>

                        <div className={`
                            relative shadow-lg border-8 border-white bg-white
                            ${viewMode === 'outline' || viewMode === 'palette' ? 'hidden' : 'block'}
                            ${viewMode === 'compare' ? 'w-full lg:w-1/2' : 'w-full'}
                        `}>
                            <canvas ref={previewCanvasRef} className="w-full h-auto block" />
                             {viewMode === 'compare' && (
                                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Result</div>
                            )}
                        </div>

                        {viewMode === 'palette' && (
                            <div className="w-full max-w-4xl mx-auto bg-white p-4">
                                <h2 className="text-xl font-bold mb-6 text-center">
                                    Color Palette {!selectedPalettes.includes('generic') ? `(${selectedPalettes.map(k => PALETTE_LABELS[k] || k).join(', ')})` : '(Generic)'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {palette.map((color, idx) => (
                                        <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-2">
                                            <span className="font-bold text-lg w-8 text-gray-400">{idx + 1}</span>
                                            <img 
                                                src={`data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="${color.hex}"/></svg>`)}`}
                                                className="w-12 h-12 border border-gray-200 rounded-lg shadow-sm"
                                                alt={color.name || "Color swatch"}
                                            />
                                            <div 
                                                className="w-12 h-12 border border-gray-200 rounded-lg bg-white relative shadow-inner"
                                                title="Paint here to test"
                                            />
                                            <div className="text-sm text-gray-600">
                                                <span className="font-bold text-gray-900">{color.name || "Custom Mix"}</span>
                                                <br/>
                                                <span className="font-mono text-xs text-gray-400">{color.hex}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden print:block mt-8 break-before-page">
                    <h2 className="text-xl font-bold mb-4">Color Palette {!selectedPalettes.includes('generic') ? `(${selectedPalettes.map(k => PALETTE_LABELS[k] || k).join(', ')})` : '(Generic)'}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {palette.map((color, idx) => (
                            <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-2">
                                <span className="font-bold text-lg w-8">{idx + 1}</span>
                                <img 
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="${color.hex}"/></svg>`)}`}
                                    className="w-12 h-12 border border-gray-300"
                                    alt={color.name || "Color swatch"}
                                />
                                <div 
                                    className="w-12 h-12 border border-gray-300 bg-white relative"
                                    title="Paint here to test"
                                />
                                <div className="text-sm text-gray-600">
                                    <span className="font-bold">{color.name || "Custom Mix"}</span>
                                    <br/>
                                    Hex: {color.hex}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-gray-500 text-sm">
          <p>Built with ❤️ for artists everywhere.</p>
          <a 
            href="https://ko-fi.com/handsomezebra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#FF5E5B] text-white rounded-full font-bold hover:bg-[#ff4642] transition-colors shadow-sm"
          >
            <Coffee size={16} /> Buy me a coffee
          </a>
        </div>
      </footer>

      <div className="hidden">
          <canvas ref={originalCanvasRef} />
      </div>

      <style>{`
        @media print {
            body { background: white; }
            header, button, input, select { display: none !important; }
            .print\\:hidden { display: none !important; }
            .print\\:block { display: block !important; }
            canvas { max-width: 100%; height: auto; }
        }
      `}</style>
    </div>
  );
}