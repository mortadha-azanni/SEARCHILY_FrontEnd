import re

with open('src/features/chat/components/ChatLayout.tsx', 'r') as f:
    text = f.read()

# Add a resize hook / ref in ChatLayout:
# Wait, let's inject a new effect and state for the draggable right panel!
text = text.replace('const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);', 
'''const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Right panel resize state
  const [rightPanelWidth, setRightPanelWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
''')

# Now change the right sidebar render logic from "hidden md:flex shrink-0" to dynamic conditionally based on `resultsPanelOpen`
# Old left sidebar: <div className="hidden md:flex shrink-0">
# New left sidebar: 
text = text.replace('<div className="hidden md:flex shrink-0">', 
'''{sidebarOpen && (
        <div className="hidden md:flex shrink-0 animate-in slide-in-from-left duration-200">
''', 1)

# we need to close the div for left sidebar: (it's around line 35)
text = re.sub(r'(<Sidebar \n          loadSession=\{loadSession\} \n          currentSessionId=\{sessionId\}\n          removeSession=\{removeSession\}\n        />\n      </div>)', r'\1\n      )}', text, 1)

# Now right sidebar:
# The right panel is currently wrapped with:
# <div className="hidden md:flex shrink-0">
#   <ResultsPanel ... />
# </div>
# We need to change that to handle width directly!

text = text.replace('''<div className="hidden md:flex shrink-0">
        <ResultsPanel 
          products={activeProducts} 
          onProductSelect={setSelectedProduct} 
          isSearching={isLoading && activeMessageId === messages[messages.length - 1]?.id} 
        />
      </div>''', 
'''{resultsPanelOpen && (
        <div 
          className="hidden md:flex shrink-0 animate-in slide-in-from-right duration-200"
          style={{ width: rightPanelWidth }}
        >
          <ResultsPanel 
            products={activeProducts} 
            onProductSelect={setSelectedProduct} 
            isSearching={isLoading && activeMessageId === messages[messages.length - 1]?.id} 
          />
        </div>
      )}''')

# The resizable divider needs to handle logic!
text = text.replace('''{/* Resizable Divider (No Logic, UI Only, Hidden on mobile) */}
      <div 
        className={`${activeProducts.length === 0 && !isLoading ? 'hidden' : 'hidden md:flex'} w-[1px] md:w-1 bg-mistral-black/5 dark:bg-warm-ivory/5 hover:bg-mistral-orange dark:hover:bg-mistral-orange cursor-col-resize transition-colors flex-col justify-center items-center`}
      >
        <div className="h-8 w-[1px] bg-mistral-black/20 dark:bg-warm-ivory/20"></div>
      </div>''',
'''{/* Resizable Divider */}
      {resultsPanelOpen && (
        <div 
          className="hidden md:flex w-1 hover:bg-mistral-orange cursor-col-resize shrink-0 transition-colors flex-col justify-center items-center group relative z-10"
          onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startWidth = rightPanelWidth;
            
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = startX - moveEvent.clientX; // Moving left increases right panel width
              // Clamp width between 250px and 600px
              const newWidth = Math.max(250, Math.min(600, startWidth + deltaX));
              setRightPanelWidth(newWidth);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
              document.body.style.cursor = 'default';
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
          }}
        >
          <div className="h-8 w-1 bg-mistral-black/20 dark:bg-warm-ivory/20 group-hover:bg-mistral-orange rounded-full"></div>
        </div>
      )}''')

# Fix Drawer conditionally rendering on mobile only:
text = text.replace('{sidebarOpen && (', '{sidebarOpen && window.innerWidth < 768 && (')
text = text.replace('{resultsPanelOpen && (', '{resultsPanelOpen && window.innerWidth < 768 && (')

with open('src/features/chat/components/ChatLayout.tsx', 'w') as f:
    f.write(text)

