import os

def replace_in_file(path, old_str, new_str):
    with open(path, 'r') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(path, 'w') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"String not found in {path}")

# Topbar
topbar_path = 'src/components/layout/Topbar.tsx'
replace_in_file(topbar_path,
    'className="absolute right-0 top-full mt-2 w-56',
    'className="absolute right-0 sm:right-0 sm:top-full top-14 sm:mt-2 fixed sm:absolute w-56 top-16 right-4 sm:top-auto sm:right-auto'
)
replace_in_file(topbar_path,
    '<div className="absolute right-0 top-full mt-2 w-56 bg-cream dark:bg-mistral-black border border-mistral-black/20 dark:border-warm-ivory/20 shadow-mistral z-50 animate-in fade-in slide-in-from-top-2 duration-200">',
    '<div className="absolute right-[-10px] md:right-0 top-full mt-2 w-56 bg-cream dark:bg-mistral-black border border-mistral-black/20 dark:border-warm-ivory/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">'
)

# About Page (remaining)
about_path = 'src/pages/public/AboutPage.tsx'
replace_in_file(about_path, 
    '<div className="bg-cream p-8 my-12 border-l-4 border-mistral-orange shadow-mistral">',
    '<div className="bg-cream dark:bg-mistral-black transition-colors p-8 my-12 border-l-4 border-mistral-orange shadow-mistral">'
)
replace_in_file(about_path,
    '<h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 tracking-tight">Our Technology</h2>',
    '<h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10 tracking-tight">Our Technology</h2>'
)
replace_in_file(about_path,
    '<h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 tracking-tight">Our Mission</h2>',
    '<h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10 tracking-tight">Our Mission</h2>'
)

# Legal Page
legal_path = 'src/pages/public/LegalPage.tsx'
replace_in_file(legal_path,
    '<div className="bg-warm-ivory min-h-[100dvh] text-mistral-black py-20 px-6">',
    '<div className="bg-warm-ivory dark:bg-[#111] transition-colors min-h-[100dvh] text-mistral-black dark:text-warm-ivory py-20 px-6">'
)
replace_in_file(legal_path,
    '<div className="prose prose-mistral prose-lg max-w-none bg-white p-8 md:p-12 border border-mistral-black/10 shadow-mistral">',
    '<div className="prose prose-mistral prose-lg max-w-none bg-white dark:bg-mistral-black transition-colors p-8 md:p-12 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral">'
)
replace_in_file(legal_path,
    '<p className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 mb-8 border-b border-mistral-black/10 pb-4">Last Updated: April 2026</p>',
    '<p className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-8 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-4">Last Updated: April 2026</p>'
)

# ProfilePage
profile_path = 'src/pages/app/ProfilePage.tsx'
replace_in_file(profile_path,
    '<h1 className="text-[48px] md:text-[64px] font-normal leading-[0.95] tracking-display uppercase mb-12">',
    '<h1 className="text-[clamp(32px,8vw,64px)] font-normal leading-[0.95] tracking-display uppercase mb-12 break-words">'
)
replace_in_file(profile_path,
    '<div className="max-w-4xl mx-auto py-12 px-6">',
    '<div className="max-w-4xl mx-auto py-12 px-4 md:px-6 w-full">'
)

# ProductPreview Overlay & Dark Mode
preview_path = 'src/features/product/components/PreviewDrawer.tsx'
replace_in_file(preview_path,
    'className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:static lg:w-[400px] lg:min-w-[400px] bg-white border-l border-mistral-black/10 flex flex-col z-50 outline-none shrink-0"',
    'className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white dark:bg-mistral-black border-l border-mistral-black/10 dark:border-warm-ivory/10 flex flex-col z-50 outline-none shrink-0 transition-colors shadow-2xl"'
)
replace_in_file(preview_path,
    '<div className="fixed inset-0 z-40 bg-mistral-black/20 backdrop-blur-sm lg:hidden transition-opacity"',
    '<div className="fixed inset-0 z-40 bg-mistral-black/40 backdrop-blur-sm transition-opacity"'
)
replace_in_file(preview_path,
    '<div className="h-14 flex items-center justify-between px-6 border-b border-mistral-black/10 bg-cream shrink-0">',
    '<div className="h-14 flex items-center justify-between px-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-cream dark:bg-[#111] shrink-0 transition-colors">'
)
replace_in_file(preview_path,
    '<h2 id="drawer-title" className="font-normal uppercase text-xs tracking-widest text-mistral-black/80">Product Preview</h2>',
    '<h2 id="drawer-title" className="font-normal uppercase text-xs tracking-widest text-mistral-black/80 dark:text-warm-ivory/80">Product Preview</h2>'
)
replace_in_file(preview_path,
    '<button \n            onClick={onClose} \n            className="text-mistral-black/50 hover:text-mistral-orange py-2 -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-mistral-orange focus:ring-offset-2"\n            aria-label="Close drawer"\n          >',
    '<button \n            onClick={onClose} \n            className="text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-orange dark:hover:text-mistral-orange py-2 -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-mistral-orange focus:ring-offset-2"\n            aria-label="Close drawer"\n          >'
)
replace_in_file(preview_path,
    '<div className="flex-1 overflow-y-auto p-6 scrollbar-thin">',
    '<div className="flex-1 overflow-y-auto p-6 scrollbar-thin bg-warm-ivory dark:bg-mistral-black transition-colors">'
)
replace_in_file(preview_path,
    '<div className="w-full h-64 bg-mistral-black/5 flex items-center justify-center text-mistral-black/40 uppercase mb-6 overflow-hidden ">',
    '<div className="w-full h-64 bg-mistral-black/5 dark:bg-warm-ivory/5 flex items-center justify-center text-mistral-black/40 dark:text-warm-ivory/40 uppercase mb-6 overflow-hidden ">'
)
replace_in_file(preview_path,
    '<h1 className="text-2xl sm:text-[32px] font-normal text-mistral-black tracking-tight leading-[1.15]">{product.title}</h1>',
    '<h1 className="text-2xl sm:text-[32px] font-normal text-mistral-black dark:text-warm-ivory tracking-tight leading-[1.15]">{product.title}</h1>'
)
replace_in_file(preview_path,
    '<div \n            className="prose prose-sm sm:prose-base text-mistral-black/80 max-w-none break-words"\n            dangerouslySetInnerHTML={{ __html: safeHtml }}\n          />',
    '<div \n            className="prose prose-sm sm:prose-base text-mistral-black/80 dark:text-warm-ivory/80 max-w-none break-words"\n            dangerouslySetInnerHTML={{ __html: safeHtml }}\n          />'
)
replace_in_file(preview_path,
    '<div className="p-6 border-t border-mistral-black/10 bg-warm-ivory shrink-0">',
    '<div className="p-6 border-t border-mistral-black/10 dark:border-warm-ivory/10 bg-warm-ivory dark:bg-[#111] shrink-0 transition-colors">'
)
replace_in_file(preview_path,
    'product.url \n                ? \'bg-mistral-black text-white hover:bg-mistral-orange hover:shadow-lg\' \n                : \'bg-mistral-black/10 text-mistral-black/40 cursor-not-allowed\'',
    'product.url \n                ? \'bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black hover:bg-mistral-orange dark:hover:bg-warm-ivory hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)]\' \n                : \'bg-mistral-black/10 dark:bg-warm-ivory/10 text-mistral-black/40 dark:text-warm-ivory/40 cursor-not-allowed\''
)



