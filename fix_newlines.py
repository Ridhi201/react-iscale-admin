import os

broken = "csv += rowData.join(',') + '\n';"
fixed = "csv += rowData.join(',') + '\\n';"

src_dir = r'c:\Users\padma\Downloads\iscale-admin-dashboard_1 (3)\iscale-admin-dashboard_1\iscale-admin\src'
count = 0
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if broken in content:
                content = content.replace(broken, fixed)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print(f'Fixed {file}')

print(f'Total files fixed: {count}')
