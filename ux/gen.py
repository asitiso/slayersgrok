import os
A='assets/'
def w(n,s): open(A+n,'w').write(s)
D='''<defs><linearGradient id="hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d"/><stop offset="1" stop-color="#b3201a"/></linearGradient>
<radialGradient id="skin" cx=".5" cy=".4"><stop offset="0" stop-color="#ffe8d6"/><stop offset="1" stop-color="#f3c3a3"/></radialGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff6c0"/><stop offset=".4" stop-color="#ffb02e"/><stop offset="1" stop-color="#ff3d00" stop-opacity="0"/></radialGradient>
<linearGradient id="cape" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a6a"/><stop offset="1" stop-color="#1a1236"/></linearGradient>
<filter id="sh"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".35"/></filter></defs>'''
def hero(hair='url(#hair)',outfit='#d9a441',cape='url(#cape)',extra='',eye='#c0392b',sword=False,glow=True):
  return f'''<g filter="url(#sh)">
<path d="M60 150 Q40 260 30 330 L170 330 Q160 260 140 150Z" fill="{cape}"/>
<path d="M58 95 Q40 160 50 230 Q70 200 75 150Z M142 95 Q160 160 150 230 Q130 200 125 150Z" fill="{hair}"/>
<path d="M78 165 L122 165 L135 300 L65 300Z" fill="{outfit}"/><path d="M78 165 L122 165 L115 200 L85 200Z" fill="#fff" opacity=".25"/>
<rect x="72" y="225" width="56" height="10" fill="#5a3a1a"/><circle cx="100" cy="230" r="7" fill="#e74c3c" stroke="#ffd36b" stroke-width="2"/>
<path d="M65 300 L80 300 L82 335 L64 335Z M120 300 L135 300 L136 335 L118 335Z" fill="#4a2c1a"/>
<rect x="92" y="140" width="16" height="26" fill="url(#skin)"/>
<ellipse cx="100" cy="110" rx="38" ry="42" fill="url(#skin)"/>
<path d="M60 112 Q58 62 100 58 Q144 62 140 112 Q132 82 112 78 Q104 96 82 92 Q72 100 60 112Z" fill="{hair}"/>
<path d="M66 70 L50 45 L80 62Z M134 70 L150 45 L120 62Z" fill="{hair}"/>
<ellipse cx="86" cy="115" rx="7" ry="10" fill="#fff"/><ellipse cx="114" cy="115" rx="7" ry="10" fill="#fff"/>
<ellipse cx="87" cy="117" rx="5" ry="7" fill="{eye}"/><ellipse cx="113" cy="117" rx="5" ry="7" fill="{eye}"/>
<circle cx="88" cy="114" r="2" fill="#fff"/><circle cx="114" cy="114" r="2" fill="#fff"/>
<path d="M92 135 Q100 141 108 135" stroke="#8a3a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<ellipse cx="78" cy="128" rx="6" ry="3" fill="#ff8a8a" opacity=".5"/><ellipse cx="122" cy="128" rx="6" ry="3" fill="#ff8a8a" opacity=".5"/>
{extra}
{'<rect x="150" y="120" width="8" height="150" fill="#c9d3e0" transform="rotate(15 154 195)"/><rect x="140" y="250" width="28" height="6" fill="#d4a017" transform="rotate(15 154 253)"/>' if sword else ''}
{'<circle cx="40" cy="200" r="34" fill="url(#glow)"/><circle cx="40" cy="200" r="10" fill="#fffbe0"/>' if glow else ''}
</g>'''
def svg(vb,body,bg=''): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{D}{bg}{body}</svg>'
band='<path d="M64 80 Q100 70 136 80" stroke="#2c3e50" stroke-width="6" fill="none"/><circle cx="100" cy="74" r="5" fill="#e74c3c"/>'
w('hero_lina.svg',svg('0 0 200 340',hero(extra=band)))
w('ally_gourry.svg',svg('0 0 200 340',hero(hair='#f2cf5b',outfit='#5577aa',cape='#2a3b5c',eye='#2b5f9e',sword=True,glow=False)))
w('ally_zelgadis.svg',svg('0 0 200 340',hero(hair='#b8c4cc',outfit='#c9b99a',cape='#5b5b5b',eye='#3a3a3a',sword=True,glow=False,extra='<circle cx="80" cy="128" r="3" fill="#7f8c8d"/><circle cx="122" cy="100" r="3" fill="#7f8c8d"/>')))
w('ally_amelia.svg',svg('0 0 200 340',hero(hair='#2c2c54',outfit='#f5f5f5',cape='#e0c068',eye='#2b4c9e',extra='<rect x="78" y="70" width="44" height="6" fill="#d4af37"/>')))
w('ally_xellos.svg',svg('0 0 200 340',hero(hair='#5b3e8c',outfit='#3e2a5c',cape='#1c1030',eye='#5b3e8c',glow=False,extra='<rect x="40" y="90" width="6" height="230" fill="#4a3020"/><circle cx="43" cy="88" r="10" fill="#c0392b"/>')))
def mon(col,horn,sc=1,name='m'):
  return f'''<g filter="url(#sh)" transform="scale({sc})"><ellipse cx="100" cy="150" rx="70" ry="55" fill="{col}"/>
<path d="M45 120 L25 60 L70 105Z M155 120 L175 60 L130 105Z" fill="{horn}"/>
<ellipse cx="78" cy="135" rx="12" ry="9" fill="#ffeb3b"/><ellipse cx="122" cy="135" rx="12" ry="9" fill="#ffeb3b"/>
<rect x="74" y="128" width="5" height="15" fill="#111"/><rect x="118" y="128" width="5" height="15" fill="#111"/>
<path d="M70 170 L80 160 L90 172 L100 160 L110 172 L120 160 L130 170 Q100 195 70 170Z" fill="#fff"/>
<path d="M40 175 L20 205 M160 175 L180 205" stroke="{horn}" stroke-width="10" stroke-linecap="round"/></g>'''
w('mon_goblin.svg',svg('0 0 200 220',mon('#5d9e4c','#3c5c2a')))
w('mon_bandit.svg',svg('0 0 200 220',mon('#8e6b4a','#4b3621')))
w('boss_demon.svg',svg('0 0 200 220','<circle cx="100" cy="120" r="95" fill="url(#glow)" opacity=".4"/>'+mon('#3b1f4f','#c0392b')+'<path d="M60 70 L100 30 L140 70" stroke="#ffd700" stroke-width="6" fill="none"/>'))
w('boss_dragon.svg',svg('0 0 200 220','<path d="M20 90 Q0 30 70 70Z M180 90 Q200 30 130 70Z" fill="#8e1a1a"/>'+mon('#c0392b','#2c2c2c')))
def icon(n,inner,c1,c2):
  w(n,svg('0 0 100 100',f'<defs><radialGradient id="ig"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></radialGradient></defs><rect x="4" y="4" width="92" height="92" rx="18" fill="url(#ig)" stroke="#ffd98a" stroke-width="3"/>'+inner))
icon('sp_fireball.svg','<circle cx="55" cy="45" r="22" fill="url(#glow)"/><path d="M20 80 Q40 60 50 50" stroke="#ffb02e" stroke-width="8" stroke-linecap="round"/>','#5a1a0a','#200a05')
icon('sp_dragonslave.svg','<circle cx="50" cy="50" r="34" fill="none" stroke="#ff5a1f" stroke-width="4"/><path d="M50 18 L58 42 L84 42 L63 57 L71 82 L50 66 L29 82 L37 57 L16 42 L42 42Z" fill="#ffcf3a"/>','#6a0d0d','#1a0000')
icon('sp_gigaslave.svg','<circle cx="50" cy="50" r="30" fill="#000"/><circle cx="50" cy="50" r="30" fill="none" stroke="#b07cff" stroke-width="5"/><path d="M50 22 Q70 50 50 78 Q30 50 50 22" fill="#7a3cff"/>','#2a1050','#05010c')
icon('sp_freeze.svg','<path d="M50 15 V85 M20 32 L80 68 M80 32 L20 68" stroke="#bff0ff" stroke-width="7" stroke-linecap="round"/>','#1a5a8a','#061a2c')
icon('sp_ragna.svg','<path d="M50 12 L44 60 L50 88 L56 60Z" fill="#111" stroke="#ff2b5a" stroke-width="3"/><rect x="30" y="58" width="40" height="6" fill="#ff2b5a"/>','#3c0a1e','#0a0005')
icon('sp_heal.svg','<rect x="42" y="20" width="16" height="60" rx="4" fill="#9effa8"/><rect x="20" y="42" width="60" height="16" rx="4" fill="#9effa8"/>','#1e6a3a','#06200f')
icon('it_staff.svg','<rect x="46" y="28" width="8" height="62" rx="3" fill="#8a5a2b"/><circle cx="50" cy="24" r="12" fill="#e74c3c" stroke="#ffd36b" stroke-width="3"/>','#3a2a6a','#120a24')
icon('it_cape.svg','<path d="M30 20 H70 L80 85 Q50 75 20 85Z" fill="#3a2a6a" stroke="#ffd36b" stroke-width="3"/>','#4a4a6a','#14141f')
icon('it_amulet.svg','<path d="M30 20 Q50 50 70 20" stroke="#d4af37" stroke-width="4" fill="none"/><path d="M50 45 L62 60 L50 80 L38 60Z" fill="#e74c3c" stroke="#ffd36b" stroke-width="3"/>','#5a1a2a','#1a050a')
icon('it_orb.svg','<circle cx="50" cy="52" r="28" fill="url(#glow)"/><circle cx="50" cy="52" r="28" fill="none" stroke="#ffd36b" stroke-width="3"/><circle cx="42" cy="42" r="6" fill="#fff" opacity=".8"/>','#4a2a0a','#120700')
icon('it_boots.svg','<path d="M35 20 H55 V60 L80 70 V82 H35Z" fill="#6b3e1f" stroke="#ffd36b" stroke-width="3"/>','#3a2a1a','#100a05')
icon('it_ring.svg','<circle cx="50" cy="58" r="20" fill="none" stroke="#d4af37" stroke-width="7"/><circle cx="50" cy="34" r="10" fill="#3498db" stroke="#fff" stroke-width="2"/>','#1a3a5a','#05101a')
# backgrounds
sky=lambda a,b:f'<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient></defs><rect width="390" height="844" fill="url(#sky)"/>'
town='<path d="M0 520 Q100 470 200 510 T390 490 V844 H0Z" fill="#3e6b4a"/><path d="M0 600 Q120 560 240 600 T390 590 V844 H0Z" fill="#2d5238"/>'+''.join(f'<g transform="translate({x},{y})"><rect width="44" height="50" fill="#e8d6b3"/><path d="M-6 0 L22 -26 L50 0Z" fill="#b5443a"/><rect x="16" y="22" width="12" height="28" fill="#6b3e1f"/></g>' for x,y in [(30,470),(110,490),(250,465),(320,485)])+'<g transform="translate(180,380)"><rect width="40" height="110" fill="#cfc6b8"/><path d="M-8 0 L20 -40 L48 0Z" fill="#3a2a6a"/></g>'
w('bg_lobby.svg',svg('0 0 390 844',sky('#ffb37a','#7aa7e0')+'<circle cx="300" cy="150" r="50" fill="#fff3c0" opacity=".8"/>'+town))
w('bg_battle.svg',svg('0 0 390 844',sky('#2a1640','#7a2e2e')+'<circle cx="80" cy="140" r="40" fill="#ffe7a0" opacity=".6"/><path d="M0 430 L60 330 L120 410 L190 300 L260 420 L330 340 L390 400 V844 H0Z" fill="#2a1a2a"/><path d="M0 520 H390 V844 H0Z" fill="#5a3a2a"/><path d="M0 520 H390" stroke="#8a5a3a" stroke-width="4"/>'+''.join(f'<circle cx="{x}" cy="{y}" r="2" fill="#fff" opacity=".7"/>' for x,y in [(40,60),(150,90),(220,40),(330,110),(280,200),(100,220)])))
w('bg_map.svg',svg('0 0 390 844','<rect width="390" height="844" fill="#e9d8b0"/><path d="M0 0 H390 V844 H0Z" fill="none" stroke="#8a6a3a" stroke-width="16"/><path d="M40 120 Q120 60 200 140 T360 180 M20 500 Q150 420 260 520 T380 600" stroke="#7fb3d5" stroke-width="18" fill="none" opacity=".6"/>'+''.join(f'<path d="M{x} {y} l18 -30 l18 30Z" fill="#8a7a5a"/>' for x,y in [(60,300),(90,320),(280,700),(310,690),(300,260)])+''.join(f'<circle cx="{x}" cy="{y}" r="14" fill="#2f7d4a" opacity=".7"/>' for x,y in [(150,650),(170,670),(200,640),(60,420)])))
w('key_title.svg',svg('0 0 390 844',sky('#1b0f3a','#c2401d')+'<circle cx="195" cy="420" r="230" fill="url(#glow)" opacity=".55"/>'+''.join(f'<circle cx="{x}" cy="{y}" r="1.8" fill="#fff"/>' for x,y in [(30,40),(90,120),(200,60),(320,90),(360,200),(60,250),(250,180)])+'<g transform="translate(70,300) scale(1.25)">'+hero(extra=band)+'</g><path d="M0 700 Q195 640 390 700 V844 H0Z" fill="#140a20"/>'))
