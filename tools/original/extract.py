import re,sys,os,json
P=os.path.join(os.path.dirname(__file__),'entry.pretty.js')
lines=open(P,encoding='utf-8').read().split('\n')
# modules start at a line exactly "__d(" and end at a line exactly ");" following the id/deps
starts=[i for i,l in enumerate(lines) if l=='__d(']
mods={}
for k,s in enumerate(starts):
    e=starts[k+1] if k+1<len(starts) else len(lines)
    body='\n'.join(lines[s:e])
    m=re.search(r'\n  (\d+),\n  \[([^\]]*)\],?\n\);\s*$',body)
    if not m:
        m=re.search(r'\n  (\d+),\n  \[([\s\S]*?)\],?\n\);\s*$',body)
    if m:
        mid=int(m.group(1)); deps=[int(x) for x in re.findall(r'\d+',m.group(2))]
        mods[mid]=(s+1,e,deps,body)
os.makedirs(os.path.join(os.path.dirname(__file__),'mods'),exist_ok=True)
if sys.argv[1]=='list':
    print(len(mods),'modules')
else:
    for a in sys.argv[1:]:
        mid=int(a); s,e,deps,body=mods[mid]
        out=os.path.join(os.path.dirname(__file__),'mods',f'{mid}.js')
        open(out,'w').write(body)
        print(f'module {mid}: lines {s}-{e} ({e-s} lines) deps={deps}')
