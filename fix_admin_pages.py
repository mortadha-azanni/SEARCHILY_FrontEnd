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

# AdminReports
reports_path = 'src/pages/admin/AdminReports.tsx'
replace_in_file(reports_path,
    '<div className="p-6 md:p-8 flex-1 w-full bg-warm-ivory">',
    '<div className="flex-1 w-full min-w-0 bg-transparent text-mistral-black dark:text-warm-ivory transition-colors">'
)
replace_in_file(reports_path,
    '<h1 className="text-[32px] font-normal tracking-tight text-mistral-black break-words">',
    '<h1 className="text-[clamp(24px,6vw,32px)] font-normal tracking-tight text-mistral-black dark:text-warm-ivory break-words">'
)
replace_in_file(reports_path,
    '<p className="text-mistral-black/60 mt-2">',
    '<p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-2">'
)
replace_in_file(reports_path,
    '<button className="bg-mistral-black text-white px-6 py-3 font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange transition-colors">',
    '<button className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-3 font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors whitespace-nowrap">'
)
replace_in_file(reports_path,
    '<div className="bg-white border border-mistral-black/10 rounded-none shadow-[0_8px_30px_rgba(250,82,15,0.05)] overflow-hidden">',
    '<div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none shadow-[0_8px_30px_rgba(250,82,15,0.05)] dark:shadow-mistral overflow-hidden w-full min-w-0 transition-colors">'
)
replace_in_file(reports_path,
    '<tr className="border-b border-mistral-black/10 bg-cream">',
    '<tr className="border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-cream dark:bg-[#111] transition-colors">'
)
replace_in_file(reports_path,
    '<th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60">',
    '<th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">'
)
replace_in_file(reports_path,
    '<th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 text-right">',
    '<th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 text-right whitespace-nowrap">'
)
replace_in_file(reports_path,
    '<tr key={report.id} className="hover:bg-mistral-black/5 transition-colors">',
    '<tr key={report.id} className="hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors border-b border-mistral-black/5 dark:border-warm-ivory/5 last:border-0">'
)
replace_in_file(reports_path,
    '<td className="p-4 font-mono text-[14px] text-mistral-black/80">{report.id}</td>',
    '<td className="p-4 font-mono text-[14px] text-mistral-black/80 dark:text-warm-ivory/80 whitespace-nowrap">{report.id}</td>'
)
replace_in_file(reports_path,
    '<td className="p-4 font-normal text-mistral-black">{report.name}</td>',
    '<td className="p-4 font-normal text-mistral-black dark:text-warm-ivory whitespace-nowrap">{report.name}</td>'
)
replace_in_file(reports_path,
    '<td className="p-4 text-[14px] text-mistral-black/60">{report.date}</td>',
    '<td className="p-4 text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">{report.date}</td>'
)
replace_in_file(reports_path,
    '<div className="px-6 py-4 border-t border-mistral-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">',
    '<div className="px-6 py-4 border-t border-mistral-black/10 dark:border-warm-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">'
)
replace_in_file(reports_path,
    '<p className="text-[14px] text-mistral-black/60 font-normal uppercase tracking-wider">',
    '<p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-normal uppercase tracking-wider text-center sm:text-left">'
)
replace_in_file(reports_path,
    '<button className="px-4 py-2 bg-mistral-black/5 text-mistral-black/50 text-xs font-normal uppercase tracking-wider rounded-none cursor-not-allowed">',
    '<button className="px-4 py-2 bg-mistral-black/5 dark:bg-warm-ivory/5 text-mistral-black/50 dark:text-warm-ivory/50 text-xs font-normal uppercase tracking-wider rounded-none cursor-not-allowed transition-colors">'
)
replace_in_file(reports_path,
    '<button className="px-4 py-2 bg-mistral-black text-white text-xs font-normal uppercase tracking-wider rounded-none hover:bg-mistral-orange transition-colors">',
    '<button className="px-4 py-2 bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black text-xs font-normal uppercase tracking-wider rounded-none hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors">'
)
replace_in_file(reports_path,
    '<td className="p-4 text-right">',
    '<td className="p-4 text-right whitespace-nowrap">'
)
replace_in_file(reports_path,
    '<tbody className="divide-y divide-mistral-black/10">',
    '<tbody className="divide-y divide-mistral-black/10 dark:divide-warm-ivory/10">'
)

