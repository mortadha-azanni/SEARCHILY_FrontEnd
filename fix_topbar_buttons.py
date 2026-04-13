import re

with open('src/components/layout/Topbar.tsx', 'r') as f:
    text = f.read()

# Fix any instance of md:hidden in buttons!
text = re.sub(r'className="md:hidden ([^"]+)"', r'className="\1"', text)

with open('src/components/layout/Topbar.tsx', 'w') as f:
    f.write(text)

