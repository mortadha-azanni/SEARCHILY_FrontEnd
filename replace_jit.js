const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('src', (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/#ffe295/g, 'theme(colors.block.gold)')
            .replace(/bg-\[#ffe295\]/g, 'bg-block-gold')
            .replace(/hover:bg-\[#ffe295\]/g, 'hover:bg-block-gold')
            .replace(/bg-\[#ffa110\]/g, 'bg-sunshine-700')
            .replace(/bg-\[#ffd900\]/g, 'bg-sunshine-500') 
            .replace(/text-\[#fb6424\]/g, 'text-mistral-flame')
            .replace(/hover:text-\[#fb6424\]/g, 'hover:text-mistral-flame')
            .replace(/shadow-\[rgba\(127,99,21,0\.12\)_-8px_16px_39px\]/g, 'shadow-mistral')
            .replace(/shadow-\[0_16px_40px_rgba\(127,99,21,0\.1\)\]/g, 'shadow-mistral')
            .replace(/shadow-\[0_16px_40px_rgba\(127,99,21,0\.05\)\]/g, 'shadow-mistral')
            .replace(/shadow-\[0_8px_30px_rgba\(250,82,15,0\.05\)\]/g, 'shadow-sm')
            .replace(/shadow-\[0_8px_30px_rgba\(220,38,38,0\.1\)\]/g, 'shadow-sm')
            .replace(/shadow-\[0_16px_40px_rgba\(250,82,15,0\.2\)\]/g, 'shadow-mistral')
            .replace(/shadow-\[0_16px_40px_rgba\(250,82,15,0\.1\)\]/g, 'shadow-mistral')
            .replace(/border-\[hsl\(240,5\.9%,90%\)\]/g, 'border-mistral-black/10')
            .replace(/shadow-\[4px_4px_0px_0px_rgba\(30,30,30,1\)\]/g, 'shadow-[4px_4px_0px_0px_theme(colors.mistral.black)]')
            .replace(/shadow-\[2px_2px_2px_rgba\(250,82,15,0\.1\)\]/g, 'shadow-sm')
            .replace(/text-\[clamp\(40px,8vw,82px\)\]/g, 'text-5xl md:text-7xl')
            .replace(/text-\[clamp\(3rem,6vw,82px\)\]/g, 'text-5xl md:text-7xl')
            .replace(/text-\[82px\]/g, 'text-7xl')
            .replace(/text-\[64px\]/g, 'text-6xl')
            .replace(/text-\[56px\]/g, 'text-5xl')
            .replace(/text-\[48px\]/g, 'text-5xl')
            .replace(/text-\[32px\]/g, 'text-3xl')
            .replace(/text-\[30px\]/g, 'text-3xl')
            .replace(/text-\[20px\]/g, 'text-xl')
            .replace(/text-\[18px\]/g, 'text-lg')
            .replace(/text-\[16px\]/g, 'text-base')
            .replace(/text-\[15px\]/g, 'text-base')
            .replace(/text-\[14px\]/g, 'text-sm')
            .replace(/text-\[12px\]/g, 'text-xs')
            .replace(/text-\[10px\]/g, 'text-[10px]')
            .replace(/h-\[500px\]/g, 'h-96')
            .replace(/max-h-\[60vh\]/g, 'max-[60vh]')
            .replace(/h-\[200px\]/g, 'h-48')
            .replace(/h-\[64px\]/g, 'h-16')
            .replace(/h-\[100dvh\]/g, 'h-screen')
            .replace(/min-h-\[100dvh\]/g, 'min-h-screen')
            .replace(/w-\[500px\]/g, 'w-[500px]')
            .replace(/w-\[400px\]/g, 'w-[400px]')
            .replace(/min-w-\[400px\]/g, 'min-w-[400px]')
            .replace(/w-\[350px\]/g, 'w-[350px]')
            .replace(/w-\[280px\]/g, 'w-72')
            .replace(/p-\[12px\]/g, 'p-3')
            .replace(/px-\[1px\]/g, 'px-[1px]')
            .replace(/tracking-\[-1px\]/g, 'tracking-tighter')
            .replace(/tracking-\[-2\.05px\]/g, 'tracking-tighter')
            .replace(/leading-\[0\.95\]/g, 'leading-none')
            .replace(/leading-\[1\.15\]/g, 'leading-tight')
            .replace(/leading-\[1\.2\]/g, 'leading-tight');
            
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
