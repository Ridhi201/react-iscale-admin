import os
import re

directory = r"c:\Users\padma\Downloads\iscale-admin-dashboard_1 (3)\iscale-admin-dashboard_1\iscale-admin\src\pages"

pattern = re.compile(
    r'<div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-\[#f6f6ff\] dark:bg-\[#1f1b2e\]">\s*'
    r'<h2[^>]*>(.*?)</h2>\s*'
    r'(.*?)'
    r'</div>',
    re.DOTALL
)

template = """<div className="bg-[#144f36] rounded-t p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">{0}</h2>
          </div>
          {1}
        </div>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        title = match.group(1)
        buttons = match.group(2).strip()
        
        new_buttons = buttons
        if new_buttons:
            new_buttons = re.sub(r'bg-slate-500 text-white[^"]*', 'bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5', new_buttons)
            new_buttons = re.sub(r'bg-\[#144f36\] text-white[^"]*', 'bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5', new_buttons)
            new_buttons = re.sub(r'btn-glossy-[a-z]+', 'bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5', new_buttons)
            
        return template.format(title, new_buttons)

    new_content, count = pattern.subn(replacer, content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
