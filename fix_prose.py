import os

path = 'tailwind.config.js'
with open(path, 'r') as f:
    content = f.read()

invert_css = """
            '--tw-prose-invert-body': theme('colors.warm.ivory'),
            '--tw-prose-invert-headings': theme('colors.warm.ivory'),
            '--tw-prose-invert-lead': theme('colors.warm.ivory'),
            '--tw-prose-invert-links': theme('colors.mistral.flame'),
            '--tw-prose-invert-bold': theme('colors.warm.ivory'),
            '--tw-prose-invert-counters': theme('colors.mistral.flame'),
            '--tw-prose-invert-bullets': theme('colors.mistral.flame'),
            '--tw-prose-invert-hr': 'rgba(255, 250, 235, 0.1)',
            '--tw-prose-invert-quotes': theme('colors.warm.ivory'),
            '--tw-prose-invert-quote-borders': theme('colors.mistral.flame'),
            '--tw-prose-invert-captions': 'rgba(255, 250, 235, 0.6)',
            '--tw-prose-invert-code': theme('colors.mistral.flame'),
            '--tw-prose-invert-pre-code': theme('colors.mistral.black'),
            '--tw-prose-invert-pre-bg': theme('colors.warm.ivory'),
            '--tw-prose-invert-th-borders': 'rgba(255, 250, 235, 0.2)',
            '--tw-prose-invert-td-borders': 'rgba(255, 250, 235, 0.1)',
"""

# insert right after --tw-prose-td-borders...
content = content.replace(
    "'--tw-prose-td-borders': theme('colors.mistral.black / 0.1'),\n          },",
    f"'--tw-prose-td-borders': theme('colors.mistral.black / 0.1'),{invert_css}          },"
)

with open(path, 'w') as f:
    f.write(content)
