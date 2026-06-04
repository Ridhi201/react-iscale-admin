import os
import re

PAGE_DIR = r"c:\Users\hp\Downloads\iscale-admin-dashboard_1\iscale-admin\src\pages"

def refactor_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig_content = content
    
    # 1. Inputs: <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" />
    # We will search for standard inputs with labels
    input_pattern = re.compile(
        r'<label className="block text-sm font-bold text-slate-700 mb-1">(.*?)</label>\s*<input\s*type="text"\s*(placeholder="(.*?)")?\s*className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"\s*/>',
        re.DOTALL
    )
    
    def input_repl(m):
        label = m.group(1).strip()
        # remove span red star from label string for the prop if we want, or keep it.
        # It's safer to just replace the whole block with <InputField> if possible.
        # But this might be too brittle.
        return m.group(0) # skip for now, let's focus on buttons which are safer
        
    # Let's focus on Buttons which are very safe to regex
    
    # primary button
    content = re.sub(
        r'<button[^>]*className="[^"]*bg-\[#428bca\] text-white[^"]*px-4 py-1\.5[^"]*"[^>]*>\s*« Back\s*</button>',
        r'<Button onClick={() => navigate(-1)} className="px-4 py-1.5">« Back</Button>',
        content
    )
    
    content = re.sub(
        r'<button[^>]*className="[^"]*bg-\[#428bca\] text-white[^"]*px-6 py-2[^"]*flex-1[^"]*"[^>]*>\s*Submit\s*</button>',
        r'<Button fullWidth className="py-2">Submit</Button>',
        content
    )
    
    content = re.sub(
        r'<button[^>]*className="[^"]*bg-\[#1b365d\] text-white[^"]*px-6 py-2[^"]*flex-1[^"]*"[^>]*>\s*Cancel\s*</button>',
        r'<Button variant="dark" fullWidth className="py-2">Cancel</Button>',
        content
    )
    
    # Small action buttons
    # Edit
    content = re.sub(
        r'<button className="bg-green-600 text-white p-1\.5 rounded-full hover:bg-green-700 transition-colors">\s*<Edit2 size=\{14\} />\s*</button>',
        r'<IconButton icon={Edit2} variant="success" />',
        content
    )
    
    # Delete
    content = re.sub(
        r'<button className="bg-\[#e98036\] text-white p-1\.5 rounded-full hover:bg-\[#d87025\] transition-colors">\s*<Trash2 size=\{14\} />\s*</button>',
        r'<IconButton icon={Trash2} variant="danger" />',
        content
    )
    
    # Check if we modified anything
    if content != orig_content:
        # add imports
        imports = []
        if '<Button' in content and 'import Button' not in content:
            imports.append("import Button from '../components/common/Button'")
        if '<IconButton' in content and 'import IconButton' not in content:
            imports.append("import IconButton from '../components/common/IconButton'")
            
        if imports:
            # Add to top
            # find first import
            import_idx = content.find("import ")
            if import_idx != -1:
                content = content[:import_idx] + "\n".join(imports) + "\n" + content[import_idx:]
            else:
                content = "\n".join(imports) + "\n\n" + content
                
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Refactored {os.path.basename(filepath)}")

for filename in os.listdir(PAGE_DIR):
    if filename.endswith(".jsx"):
        refactor_file(os.path.join(PAGE_DIR, filename))

print("Done")
