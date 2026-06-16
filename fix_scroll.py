import os
import re

directory = r"c:\Users\padma\Downloads\iscale-admin-dashboard_1 (3)\iscale-admin-dashboard_1\iscale-admin\src\pages"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for `<div className="... overflow-x-auto ...">` and replace with `overflow-auto`
    # Be careful not to replace it if it's already overflow-auto.
    # Pattern: a div with className containing "overflow-x-auto border"
    new_content, count = re.subn(r'className="([^"]*)overflow-x-auto([^"]*)border', r'className="\1overflow-auto\2border', content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
