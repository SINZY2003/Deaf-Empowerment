import { useState, useEffect } from "react";
import { X, Minus, Plus, Type, Eye, Volume2, Maximize2, Info, Accessibility } from "lucide-react";

interface AccessibilityToolbarProps {
  visible: boolean;
  onClose: () => void;
  onFontSizeChange: (size: number) => void;
  onContrastToggle: (highContrast: boolean) => void;
  fontSize: number;
  highContrast: boolean;
}

export default function AccessibilityToolbar({
  visible,
  onClose,
  onFontSizeChange,
  onContrastToggle,
  fontSize,
  highContrast,
}: AccessibilityToolbarProps) {
  const [toolbarVisible, setToolbarVisible] = useState(visible);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    setToolbarVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }, [focusMode]);

  const decreaseFontSize = () => {
    if (fontSize > 70) {
      onFontSizeChange(fontSize - 10);
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 150) {
      onFontSizeChange(fontSize + 10);
    }
  };

  const resetFontSize = () => {
    onFontSizeChange(100);
  };

  const toggleContrast = () => {
    onContrastToggle(!highContrast);
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  if (!toolbarVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-primary to-secondary text-white p-4 z-50 shadow-md slide-in"
      id="accessibilityToolbar"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold flex items-center">
            <Accessibility className="h-5 w-5 mr-2" /> Accessibility Options
          </h2>
          <button
            id="closeAccessibility"
            className="text-white hover:bg-white/20 rounded-full p-1 transition-all duration-200"
            onClick={onClose}
            aria-label="Close accessibility toolbar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Text size control */}
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center mb-2 text-white">
              <Type className="h-4 w-4 mr-2" />
              <span className="font-medium">Text Size</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-md p-1">
              <button
                id="decreaseText"
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-md transition-all duration-200"
                aria-label="Decrease text size"
                onClick={decreaseFontSize}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="font-medium">{fontSize}%</div>
              <button
                id="increaseText"
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-md transition-all duration-200"
                aria-label="Increase text size"
                onClick={increaseFontSize}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              id="resetText"
              className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white p-1 rounded-md text-sm transition-all duration-200"
              aria-label="Reset text size"
              onClick={resetFontSize}
            >
              Reset to Default
            </button>
          </div>
          
          {/* Contrast mode */}
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center mb-2 text-white">
              <Eye className="h-4 w-4 mr-2" />
              <span className="font-medium">Display</span>
            </div>
            <button
              id="contrastToggle"
              className={`w-full p-2 rounded-md text-white transition-all duration-200 ${
                highContrast 
                  ? "bg-black text-white border border-white" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle high contrast mode"
              onClick={toggleContrast}
            >
              {highContrast ? "Normal Contrast" : "High Contrast"}
            </button>
            <button
              id="focusModeToggle"
              className={`w-full mt-2 p-2 rounded-md text-white transition-all duration-200 ${
                focusMode 
                  ? "bg-accent text-white" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle focus mode"
              onClick={toggleFocusMode}
            >
              <div className="flex items-center justify-center">
                <Maximize2 className="h-4 w-4 mr-2" />
                {focusMode ? "Disable Focus Mode" : "Enable Focus Mode"}
              </div>
            </button>
          </div>
          
          {/* Reading preferences */}
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center mb-2 text-white">
              <Volume2 className="h-4 w-4 mr-2" />
              <span className="font-medium">Reading Guides</span>
            </div>
            <div className="text-sm text-white/80 mb-2">
              Tools to help with reading and focus
            </div>
            <div className="space-y-2">
              <button className="w-full bg-white/10 hover:bg-white/20 text-white p-2 rounded-md transition-all duration-200">
                Text-to-Speech
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white p-2 rounded-md transition-all duration-200">
                Reading Mask
              </button>
            </div>
          </div>
          
          {/* Shortcuts and Info */}
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center mb-2 text-white">
              <Info className="h-4 w-4 mr-2" />
              <span className="font-medium">Keyboard Shortcuts</span>
            </div>
            <div className="text-xs space-y-1 text-white/90">
              <div className="flex justify-between">
                <span>Increase text size:</span>
                <kbd className="bg-white/20 px-2 py-0.5 rounded text-white">Ctrl +</kbd>
              </div>
              <div className="flex justify-between">
                <span>Decrease text size:</span>
                <kbd className="bg-white/20 px-2 py-0.5 rounded text-white">Ctrl -</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle high contrast:</span>
                <kbd className="bg-white/20 px-2 py-0.5 rounded text-white">Alt C</kbd>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-white/80 text-center">
          This accessibility toolbar helps make our website more accessible for users with various needs.
          <br />Your preferences will be saved for your next visit.
        </div>
      </div>
    </div>
  );
}
