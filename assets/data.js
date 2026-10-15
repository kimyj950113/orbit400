export const EVENT = {
  title: 'ORβIT 400',
  url: 'https://orbit400.vercel.app',
  date: '2026.12.20',
  dow: 'SUN',
  open: '16:00',
  start: '17:00',
  price: 7000,
  venue: '홍대 우주정거장',
  venueJp: '宇宙ステーション',
  address: '서울 마포구 와우산로29길 16, 지하 1층',
  addressOld: '서교동 328-13',
  walk: '홍대입구역에서 걸어서 7~8분',
  bank: { name: '카카오뱅크', number: '3333-04-5032780', holder: '김예지' },
};

export const TEAMS = [
  {
    id: 'homura', k: '炎', color: 'var(--t1)', ko: '호무라엔진바스터즈', jp: 'ホムラエンジンバスターズ', en: 'HOMURA ENGINE BUSTERS',
    art: 'flame', start: '17:00', end: '17:40',
    parts: { V: ['정시엽'], G: ['주성헌', '길민지', '사영준'], B: ['윤태웅'], K: ['정시엽', '사영준'], D: ['김보경'] },
    songs: [['Orange', 'SPYAIR', '3:55'], ['Inferno', 'Mrs. GREEN APPLE', '3:33'], ['역광', 'Ado', '3:58'], ['Lily', 'LUCK LIFE', '4:24'], ['White Noise', 'Official髭男dism', '4:14'], ['벚꽃만월', 'SPYAIR', '3:39'], ['Chainsaw Blood', 'Vaundy', '3:21'], ['사랑감기에 실려', 'Vaundy', '4:16']],
    total: '31:20',
  },
  {
    id: 'chomecha', k: '超', color: 'var(--t2)', ko: '쵸-멧챠스기루★', jp: 'チョーメッチャスギル★', en: 'CHO-MECCHA SUGIRU',
    art: 'burst', start: '17:45', end: '18:25',
    parts: { V: ['최윤영', '이영서'], G: ['백하늘', '함서현', '김민주'], B: ['장민제'], D: ['최선주', '조민수'] },
    songs: [['잔혹한 천사의 테제', '타카하시 요코', '4:04'], ['취할 줄을 모르고', 'Kanaria', '2:18'], ['실루엣', 'KANA-BOON', '4:00'], ['BLUE BIRD', '이키모노가카리', '3:33'], ['표정이나 가면따위', '까치산', '3:18'], ['마타사부로', '요루시카', '3:47'], ['시퍼런 봄 (불구경 ver)', '쏜애플', '6:20'], ['Butter-Fly', '전영호', '4:36']],
    total: '31:56',
  },
  {
    id: 'cosmos', k: '怪', color: 'var(--t3)', ko: '코스모스 괴수단', jp: 'コスモス怪獣団', en: 'COSMOS KAIJU-DAN',
    art: 'planet', start: '18:30', end: '19:10',
    links: { instagram: 'https://instagram.com/cosmos_kaijyudan', youtube: 'https://youtube.com/@cosmos_kaijyudan' },
    parts: { V: ['김예지', '조하경'], G: ['이종민', '정승연'], B: ['박정인', '장준호'], K: ['김예지'], D: ['김재진', '조하경'] },
    songs: [['후와후와 타임', '방과 후 티타임', '4:18'], ['Super Driver', '히라노 아야', '4:14'], ['Re:Re', '결속밴드', '4:00'], ['1000일간', 'Noa', '3:05'], ['more than words', '히츠지분카쿠', '4:19'], ['Pray', 'tommy heavenly6', '4:11'], ["Don't say lazy", '방과 후 티타임', '4:15'], ['Samurai Heart', 'SPYAIR', '4:12']],
    total: '32:34',
  },
  {
    id: 'seishun', k: '青', color: 'var(--t4)', ko: '청춘철야', jp: '青春徹夜', en: 'SEISHUN TETSUYA',
    art: 'dawn', start: '19:15', end: '19:45',
    links: { instagram: 'https://instagram.com/youthovernight', youtube: 'https://youtube.com/@youthovernight' },
    parts: { V: ['이세희', '김예나'], G: ['한현규', '설여진', '이세희'], B: ['임도현', '조아연'], K: ['김예나', '설여진'], D: ['이동호'] },
    songs: [['Rat Dance', '', '2:50'], ['Ugly', '2NE1', '3:50'], ['1999', '양문학', '4:47'], ['너는 록을 듣지 않아', '아이묭', '4:03'], ['잘부탁드립니다', '익스', '3:25'], ['고민중독', 'QWER', '3:13'], ['군청', 'YOASOBI', '4:09'], ['친애하는 소년이여', 'Hump Back', '3:10']],
    total: '29:27',
  },
];

export const PART = { V: 'VOCAL', G: 'GUITAR', B: 'BASS', K: 'KEYS', D: 'DRUMS' };

export const ICON = {
  V: '<svg viewBox="0 0 32 32"><rect x="11" y="3" width="10" height="16" rx="5"/><path d="M7 15a9 9 0 0 0 18 0M16 24v5M11 29h10"/></svg>',
  G: '<svg viewBox="0 0 32 32"><path d="M20 12 29 3M26 3l3 3"/><path d="M19 13c-3-1-6 0-7 3-1 2-4 1-6 3-3 3-1 9 4 9 3 0 4-3 5-5 1-3 5-3 5-6 0-2-1-3-1-4z"/><circle cx="13.5" cy="20.5" r="2"/></svg>',
  B: '<svg viewBox="0 0 32 32"><path d="M19 13 29 3M25 3l4 4"/><path d="M18 14c-3-1-6 1-7 4-1 2-4 1-6 3-2 3 0 8 5 8 3 0 4-3 6-5 2-3 5-3 4-7"/><path d="M8 24l3 3"/></svg>',
  K: '<svg viewBox="0 0 32 32"><rect x="3" y="8" width="26" height="16" rx="2"/><path d="M9 8v10M15 8v10M21 8v10M7 18v6M13 18v6M19 18v6M25 18v6"/></svg>',
  D: '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="13" rx="11" ry="4"/><path d="M5 13v9c0 2 5 4 11 4s11-2 11-4v-9"/><path d="M6 3l8 7M26 3l-8 7"/></svg>',
};

export const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
export const won = n => n.toLocaleString('ko-KR') + '원';
