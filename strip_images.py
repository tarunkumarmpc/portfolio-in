import re
with open('/home/tarun/Desktop/new_websit/personal_portfilo/new_wesite/index.html', 'r') as f:
    content = f.read()

# Pattern for standard cards
pattern1 = r'\s*<div class="project-image">\s*<div class="placeholder-image"></div>\s*<div class="project-overlay">\s*<p>[^<]*</p>\s*</div>\s*</div>'
content = re.sub(pattern1, '', content)

# Pattern for compact cards (which still have gradients)
pattern2 = r'\s*<div class="project-image-compact">\s*<div class="placeholder-image-compact" style="[^"]*"></div>\s*<div class="project-overlay-compact">\s*<p>[^<]*</p>\s*</div>\s*</div>'
content = re.sub(pattern2, '', content)

with open('/home/tarun/Desktop/new_websit/personal_portfilo/new_wesite/index.html', 'w') as f:
    f.write(content)
