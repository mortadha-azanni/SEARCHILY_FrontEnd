import os

path = 'src/pages/app/ProfilePage.tsx'
with open(path, 'r') as f:
    content = f.read()

content = content.replace(
    '<button onClick={() => alert(\'Feature coming soon!\')} className="w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Edit Profile</button>',
    '<Link to="/app/profile/edit" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Edit Profile</Link>'
)
content = content.replace(
    '<button onClick={() => alert(\'Feature coming soon!\')} className="w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Billing</button>',
    '<Link to="/app/profile/billing" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Billing</Link>'
)
content = content.replace(
    '<button onClick={() => alert(\'Feature coming soon!\')} className="w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Notifications</button>',
    '<Link to="/app/profile/notifications" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Notifications</Link>'
)

with open(path, 'w') as f:
    f.write(content)
