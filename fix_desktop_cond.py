import re

with open('src/features/chat/components/ChatLayout.tsx', 'r') as f:
    text = f.read()

# Revert all them back to basic:
text = text.replace('&& window.innerWidth < 768 && (', '&& (')
text = text.replace('&& window.innerWidth < 768 && window.innerWidth < 768 && (', '&& (')

# Only inject window.innerWidth < 768 for Drawer components!
text = re.sub(
    r'\{sidebarOpen && \(\n\s*<Drawer side="left"', 
    r'{sidebarOpen && window.innerWidth < 768 && (\n        <Drawer side="left"',
    text
)

text = re.sub(
    r'\{resultsPanelOpen && \(\n\s*<Drawer side="right"', 
    r'{resultsPanelOpen && window.innerWidth < 768 && (\n        <Drawer side="right"',
    text
)

with open('src/features/chat/components/ChatLayout.tsx', 'w') as f:
    f.write(text)

