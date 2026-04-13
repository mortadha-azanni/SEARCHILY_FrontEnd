import re

with open('src/components/common/Drawer.tsx', 'r') as f:
    text = f.read()

# Fix Drawer to only lock body overflow on mobile!
text = re.sub(
    r"if \(open\) \{\n      document\.addEventListener\('keydown', handleEscape\);\n      document\.body\.style\.overflow = 'hidden';\n    \}",
    r"if (open) {\n      document.addEventListener('keydown', handleEscape);\n      if (window.innerWidth < 768) {\n        document.body.style.overflow = 'hidden';\n      }\n    }",
    text
)

with open('src/components/common/Drawer.tsx', 'w') as f:
    f.write(text)

