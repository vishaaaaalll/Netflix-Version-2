// =====================================================================
// OUR NETFLIX — Memory Configuration
// =====================================================================
// This is the ONLY file you need to edit to customize your website.
// Everything below uses simple, plain-English values.
//
// HOW TO ADD A NEW MEMORY:
//   1. Copy any memory object below (everything inside { } including the
//      trailing comma).
//   2. Paste it at the end of the memories array (before the closing ]).
//   3. Change the values to match your real memory.
//   4. Save the file. The website updates automatically.
//
// FIELD GUIDE:
//   id          — A unique short name, no spaces (e.g. "goa-trip-2024")
//   title       — The display name shown on the card
//   description — A short sentence about this memory
//   date        — Any date text you like (e.g. "October 2025" or "June 2022")
//   year        — The year as a string (used for sorting and display)
//   category    — A group name (e.g. "Our Story", "Adventures", "Just Us")
//   type        — Either "photo" or "video"
//   thumbnail   — URL for the card cover image (Cloudinary or any URL)
//   media        — For photos: a list of image URLs shown in the gallery
//   youtubeId   — For videos: the YouTube video ID (e.g. "dQw4w9WgXcQ")
//   tags        — Keywords for search (e.g. ["goa", "trip", "beach"])
//   featured    — true if this memory should appear in the hero spotlight
//   favourite   — true if this should be pre-marked as a favourite
//   duration    — Optional: video length text (e.g. "02:16")
//   episode     — Optional: episode label (e.g. "Episode 1")
// =====================================================================

export type MemoryType = 'photo' | 'video';

export type Memory = {
  id: string;
  title: string;
  description: string;
  date: string;
  year: string;
  category: string;
  type: MemoryType;
  thumbnail: string;
  media: string[];
  youtubeId?: string;
  tags: string[];
  featured?: boolean;
  favourite?: boolean;
  duration?: string;
  episode?: string;
};

export type Row = {
  title: string;
  subtitle?: string;
  ids: string[];
};

export type Chapter = {
  year: string;
  title: string;
  description: string;
  ids: string[];
};

// ---------------------------------------------------------------------
// HERO CONFIGURATION
// ---------------------------------------------------------------------
// Change these values to update the hero (top) section of the website.
// heroImage: Replace with your own image URL (Cloudinary or any URL).
// heroTitle: The big title displayed over the hero image.
// heroSubtitle: The line below the title.
// heroTimeline: The year range shown in the eyebrow.
// heroMeta: The small metadata items shown below the title.
// heroDescription: The paragraph below the metadata.
// ---------------------------------------------------------------------

export const heroConfig = {
  heroImage: '/IMG_8643.jpg',
  heroTitle: 'Anusha & Vishal',
  heroTitleAccent: 'Forever',
  heroSubtitle: 'A love story, streaming only for us.',
  heroTimeline: '2022 — CONTINUING',
  heroMeta: ['2022', 'All love', 'Continuing', 'Countless episodes'],
  heroDescription: 'Four years of late-night talks, secret meetups, metro rides and mountain trips.\nThis is us — every lovely chapter, in one place.',
};

// ---------------------------------------------------------------------
// SURPRISE / EASTER EGG MESSAGE
// ---------------------------------------------------------------------
// This is the hidden message revealed when someone clicks the secret
// heart or taps the logo 5 times. Change the text and photo to make it
// personal.
// ---------------------------------------------------------------------

export const surpriseConfig = {
  kicker: 'One more thing...',
  line1: 'Out of all the memories\non this website,',
  line2: 'my favourite one\nis still... us.',
  photo: 'https://images.pexels.com/photos/1176581/pexels-photo-1176581.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000',
  loveNote: 'I love you, Anusha. More than yesterday, less than tomorrow.',
};

// ---------------------------------------------------------------------
// PHOTOS (placeholder URLs — replace with your Cloudinary URLs)
// ---------------------------------------------------------------------

const photos = {
  hero: 'https://res.cloudinary.com/uzxk6hk7/image/upload/f_auto,q_auto/cd2cde3caa126231b993291184a6a373',
  sunset: 'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hands: 'https://images.pexels.com/photos/4529772/pexels-photo-4529772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  selfie: 'https://images.pexels.com/photos/27087259/pexels-photo-27087259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dinner: 'https://images.pexels.com/photos/5086620/pexels-photo-5086620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jaipur: 'https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  goa: 'https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  birthday: 'https://images.pexels.com/photos/3859921/pexels-photo-3859921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  anniversary: 'https://images.pexels.com/photos/15198293/pexels-photo-15198293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beach: 'https://images.pexels.com/photos/27869489/pexels-photo-27869489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  travel: 'https://images.pexels.com/photos/15804623/pexels-photo-15804623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cozy: 'https://images.pexels.com/photos/6288706/pexels-photo-6288706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beginning1: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724419/8d98f4f43o64c0d04cb3363ff18ddaa9.jpg',
  beginning2: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724418/69022d677o1a2ee0f3ef74056b238858.jpg',
  beginning3: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724418/480d435f9n83248f938af5a71a229006.jpg',
  beginning4: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724417/135076febk825c6738fa54d3b29f6208.jpg',
  beginning5: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724415/4d41ec602m36463b27cd4fa380167a2e.jpg',
  beginning6: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724414/77dd09f20j4a5b64d66ef1ca540e7c49.jpg',
  beginning7: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724413/83ad66f4dme9ce7f68ff863919546190.jpg',
  beginning8: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724325/e3e5eb5far6c52aecd062181984c4a10.jpg',
  beginning9: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724323/e9b901a07g0ed1455abe63851baebe2c.jpg',
  beginning10: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724322/e917f58b5i2f20d8ec2b36cd12458409.jpg',
  beginning11: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724320/dedf14337pb0f74d386fcee31aa4d05e.jpg',
  beginning12: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788724320/ecd1738d3i721d81cfc0dcdb4fd5f53b.jpg',
  beginning13: 'https://res.cloudinary.com/uzxk6hk7/image/upload/v1788723121/cd2cde3caa126231b993291184a6a373.jpg',
};

// ---------------------------------------------------------------------
// MEMORIES
// ---------------------------------------------------------------------
// Add, remove, or edit memories here. Each one becomes a card on the
// home page and a detail page when clicked.
// ---------------------------------------------------------------------

export const memories: Memory[] = [
  {
    id: 'beginning',
    title: 'Where It All Started',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.hero,
    media: [
  photos.beginning1,
  photos.beginning2,
  photos.beginning3,
  photos.beginning4,
  photos.beginning5,
  photos.beginning6,
  photos.beginning7,
  photos.beginning8,
  photos.beginning9,
  photos.beginning10,
  photos.beginning11,
  photos.beginning12,
  photos.beginning13,
],
    description: 'Where everything started. Two people, one unexpected hello, and a story that keeps getting better.',
    tags: ['beginning', 'story', 'special'],
    episode: 'Chapter 1',
    featured: true,
    favourite: true,
  },
  {
    id: 'conversation',
    title: 'Our First Conversation',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.selfie,
    media: [photos.selfie],
    description: 'A tiny conversation that somehow became our favourite part of every day.',
    tags: ['conversation', 'beginning'],
    episode: 'Chapter 1',
  },
  {
    id: 'first-date',
    title: 'The First Date',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.dinner,
    media: [photos.dinner, photos.cozy],
    description: 'The day we finally met, talked for hours, and forgot to check the time.',
    tags: ['date', 'special', 'story'],
    episode: 'Chapter 1',
  },
  {
    id: 'growing-together',
    title: 'Growing Together',
    date: '2023',
    year: '2023',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.sunset,
    media: [photos.sunset],
    description: 'No plans. No schedule. Just us finding a little magic in an ordinary afternoon.',
    tags: ['growing', 'us', 'sunset'],
    episode: 'Chapter 2',
  },
  {
    id: 'first-trip',
    title: 'The First Trip',
    date: '2023',
    year: '2023',
    category: 'Adventures',
    type: 'video',
    thumbnail: photos.travel,
    media: [photos.travel],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'New roads, shared playlists, and the kind of view you wish you could keep forever.',
    tags: ['trip', 'travel', 'adventure'],
    duration: '01:24',
  },
  {
    id: 'jaipur',
    title: 'Jaipur Diaries',
    date: '2024',
    year: '2024',
    category: 'Adventures',
    type: 'photo',
    thumbnail: photos.jaipur,
    media: [photos.jaipur, photos.hands],
    description: 'Pink skies, old stories, and getting happily lost together.',
    tags: ['trip', 'jaipur', 'travel'],
  },
  {
    id: 'goa',
    title: 'Goa, With You',
    date: '2024',
    year: '2024',
    category: 'Adventures',
    type: 'video',
    thumbnail: photos.goa,
    media: [photos.goa, photos.beach],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Salt in the air, sand everywhere, and nowhere else we needed to be.',
    tags: ['trip', 'goa', 'beach'],
    duration: '02:16',
  },
  {
    id: 'selfies',
    title: 'Random Selfies',
    date: '2024',
    year: '2024',
    category: 'Just Us',
    type: 'photo',
    thumbnail: photos.selfie,
    media: [photos.selfie, photos.sunset],
    description: 'Proof that our best photos are usually the ones we never planned.',
    tags: ['selfie', 'fun', 'us'],
  },
  {
    id: 'late-night',
    title: 'Late Night Calls',
    date: 'Every night',
    year: '2024',
    category: 'Just Us',
    type: 'video',
    thumbnail: photos.cozy,
    media: [photos.cozy],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'The conversations that made midnight feel like the best time of day.',
    tags: ['late night', 'calls', 'us'],
    duration: '02:16',
  },
  {
    id: 'birthday',
    title: 'Birthday Magic',
    date: '2025',
    year: '2025',
    category: 'Special Moments',
    type: 'photo',
    thumbnail: photos.birthday,
    media: [photos.birthday, photos.anniversary],
    description: 'Candles, wishes, and the warmest kind of celebration.',
    tags: ['birthday', 'celebration', 'special'],
  },
  {
    id: 'anniversary',
    title: 'Another Year Of Us',
    date: '2025',
    year: '2025',
    category: 'Special Moments',
    type: 'photo',
    thumbnail: photos.anniversary,
    media: [photos.anniversary, photos.dinner],
    description: 'One more chapter, countless more reasons to choose each other.',
    tags: ['anniversary', 'celebration', 'special'],
    favourite: true,
  },
  {
    id: 'best-day',
    title: 'Best Day Ever',
    date: '2026',
    year: '2026',
    category: 'Favourite Memories',
    type: 'photo',
    thumbnail: photos.beach,
    media: [photos.beach],
    description: 'The kind of day that ends too quickly and stays with you forever.',
    tags: ['favourite', 'beach', 'special'],
    featured: true,
  },
];

// ---------------------------------------------------------------------
// CONTENT ROWS (home page)
// ---------------------------------------------------------------------
// Each row shows a horizontal scrolling list of memory cards.
// The ids refer to memory ids from the memories array above.
// ---------------------------------------------------------------------

export const rows: Row[] = [
  {
    title: 'Continue Watching',
    subtitle: 'Pick up where you left off',
    ids: ['conversation', 'first-date', 'growing-together', 'first-trip', 'late-night'],
  },
  {
    title: 'Our Favourite Memories',
    ids: ['beginning', 'best-day', 'anniversary', 'birthday', 'selfies'],
  },
  {
    title: 'Our Adventures',
    subtitle: 'Out there, together',
    ids: ['first-trip', 'jaipur', 'goa', 'best-day'],
  },
  {
    title: 'Just Us',
    ids: ['selfies', 'late-night', 'first-date', 'growing-together', 'conversation'],
  },
  {
    title: 'Special Moments',
    ids: ['birthday', 'anniversary', 'beginning', 'best-day'],
  },
];

// ---------------------------------------------------------------------
// STORY CHAPTERS (Our Story page)
// ---------------------------------------------------------------------
// The timeline is chronological from 2022 to continuing.
// Each chapter references memory ids that belong to that period.
// Edit the titles and descriptions to match your real story.
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// OUR STORY — Timeline Chapters (built from our chat history, Jul 2022 – Sep 2026)
// ---------------------------------------------------------------------
// Each chapter is one moment from our real conversations.
// To add a photo later: put the image URL in a memory in the
// MEMORIES section above, then add that memory's id to the
// chapter's `ids` array. Until then, chapters show a
// [PHOTO TO BE ADDED] placeholder automatically.
// ---------------------------------------------------------------------

export const chapters: Chapter[] = [
  {
    year: "2022",
    title: "The Watch That Started Everything",
    description: "July 2022. We were just two CA coaching classmates at TTN/AVJ in Laxmi Nagar — I sat at the back in Income Tax class, you sat in front and turned around to clear my doubts. Somehow my watch ended up with you — \u201CHaina terepe watch, sambhal kar rkhioo.\u201D Then came the rain banter, the late-night talks, and my first compliment to you: \u201Cteri dp achi h.\u201D Honestly? Even in that tiny display picture, you looked beautiful. Neither of us knew it yet, but this is exactly where \u201Cwe\u201D started.",
    ids: [],
  },
  {
    year: "2022",
    title: "\u201CKbhi Nhi\u201D",
    description: "7th August 2022 — the night everything turned. I asked you straight: \u201CTera koi bf h?\u201D You said, \u201CKbhi nhi\u201D — never had one. We traded secrets: I told you how I used to wait in class just for you to turn and look at me — \u201CMujhe tera intzaar hota tha\u201D — and you admitted, \u201Ctujhe special dekhti thii.\u201D That night our nicknames were born — my Vishuu, my \u201CMeri Anushaa\u201D — and we ended with \u201CBye bye love.\u201D Your laugh that night is still my favourite sound.",
    ids: [],
  },
  {
    year: "2022",
    title: "\u201CDonoooooo\u201D",
    description: "14th August 2022. You were stressed about studies, I was trying to comfort you — \u201Cbta na meri jaan, ho jayga sab\u201D — and you said \u201CTu itna acha kyuu haiii.\u201D Then the famous heart exchange: \u201Cye tera dil h? Tune mereko de diya kya?\u201D … \u201CHaa hogyaaaaaa.\u201D \u201CPossession or ownership? Kya di?\u201D \u201CDonoooooo.\u201D I announced to the world: \u201CMummyyyy bahu mil gyiiiii.\u201D You confessed you were possessive — \u201CI am possessivee\u201D — and honestly, my beautiful girl, it was the cutest thing I had ever heard. We planned our first date for 5th September. You even told your friend about me.",
    ids: [],
  },
  {
    year: "2022",
    title: "\u201CMerko Tu Pasand Aai H\u201D",
    description: "26th August 2022 — our deepest night that year. You confessed your first impression of me: \u201CMaine jab tjhe dekha thaa naa, mjhe laga ye to apne standard ka nhi haii.\u201D Mine of you was simpler: \u201CYe bhohot shi ladki h — tu trouser pehen k aa jati thi.\u201D We figured out how we found each other on Instagram, and I finally said it straight: \u201CMerko tu pasand aai h… hint de rha hu me.\u201D Anusha, you are beautiful in every photo, but that night I fell for the girl behind them — brave, honest, and entirely herself.",
    ids: [],
  },
  {
    year: "2022",
    title: "Ten Minutes on Your Shoulder",
    description: "5th September 2022 — our first meeting, at the AVJ farewell party. The big plans fizzled, but the small moments landed: my hand resting on your leg, and you sleeping on my shoulder for ten minutes — \u201CBht achi neend ayi thi.\u201D Your heartbeat was racing when you arrived. You had dressed up after an entire year, and you looked absolutely stunning. That night came our first real \u201CI love you\u201D — \u201Clove you yarr\u201D … \u201CI love youu.\u201D I still wish that metro had never come.",
    ids: [],
  },
  {
    year: "2022",
    title: "\u201COurs\u201D",
    description: "Christmas 2022. After a quiet few months, you called me — and my mummy picked up my phone. You panicked and hung up; she called back and you didn't pick up. We laughed about it for days. That night we wrote the last word of our year together: \u201CThe future is… yours? Ours.\u201D Just \u201COurs.\u201D And look at us now, my love — it really became ours.",
    ids: [],
  },
  {
    year: "2023",
    title: "Mere Birthday Pe Aaya Tha Maza",
    description: "February 2023 — our second beginning. You said it yourself: \u201CMere birthday pe aaya tha maza.\u201D I was there for your birthday, and then we went to the mall at Adventure Island — the whole place empty except one couple doing a photoshoot, where the boy was putting a mangalsutra on the girl. \u201CAlag style tha bhai ka propose karne ka.\u201D Somewhere around those days came our first kiss — \u201Cdono ko kiss bhi nhi aati thi shi se\u201D — and we laughed about it together. \u201CI love you baby\u201D became our everyday language. You looked so happy that month, and that made me the happiest.",
    ids: [],
  },
  {
    year: "2023",
    title: "Our First Little Getaway",
    description: "June 2023. Our first trip together — just the two of us, away from coaching and families and the whole world. No big plans, no itinerary — just us, finally alone with all the time in the world. I came back from that trip grinning like an idiot for days. Every time I think of that summer, I think of how easy everything felt with you, my beautiful Anushaa.",
    ids: [],
  },
  {
    year: "2023",
    title: "Secret Agents of Laxmi Nagar",
    description: "Summer 2023 — our secret-agent era. You waiting at the nearby mall while I texted \u201Cpass vale mall m rehna, jab m boluga tab aa jana.\u201D Quick meetups, cover stories, stolen minutes. I found out you had saved my number as \u201Cneshu\u201D ages ago, and my photo was your phone wallpaper — while yours was mine. We were each other's lock screens before we were anything official. Tell me that's not the cutest thing.",
    ids: [],
  },
  {
    year: "2023",
    title: "Mummy's Blessing (Almost)",
    description: "11th September 2023 — the night our story became real. Your mummy had read our romantic chats, and instead of anger, she spoke to me warmly: \u201CBaat karte ho beta? Batao beta.\u201D Her verdict: no objection — just finish CA first, \u201CCA karlo, fir baat kar lena.\u201D The first parent who knew about us and didn't forbid it. I always knew you got your warmth from somewhere, my love — now I know where.",
    ids: [],
  },
  {
    year: "2023",
    title: "Chapri to Charming",
    description: "18th September 2023. You made me share my 6th-class photos — glasses, spiky hair, the works — and roasted me without mercy: \u201CSmart thodi tha tu pehle. Ab hua h, wo to.\u201D We joked about what would have happened if we'd gone to college together. Amid all the teasing, I told you something I meant deeply: everything with us is always with your consent, always. You said, \u201CWo to emotional hoke, tere pyaar me.\u201D Even your roasting feels like love to me.",
    ids: [],
  },
  {
    year: "2024",
    title: "The Photo That Made Her Fall",
    description: "31st January 2024. Interview season — you were \u201Calready selected\u201D at SS Kothari, both of us about to start our articleships. And that day you confessed something adorable: you hadn't fully liked me at first — it was one photo that did it. \u201CDil ko chuu gyi, soo beautiful handsome boyyy.\u201D My gorgeous girl fell for a photograph. I think about that every time I doubt myself — Anusha chose me, twice: once in class, once in a photo.",
    ids: [],
  },
  {
    year: "2024",
    title: "You Are My Oxygen",
    description: "30th March 2024. You were lonely at your new articleship — no real friends yet, cold seniors — and I stayed up with you till 12:45 AM: \u201CJabtak aapka mood thik nhi hoga, m kahi nhi jauga, chahe subh ho jaay.\u201D That night I told you what you are to me: \u201CYou are my oxygen… you are my water… you are my heart… you are my loveee.\u201D You said, \u201CI love you so much baby… aap kaafi hi ho mere liye.\u201D You are enough for me too, my love. More than enough.",
    ids: [],
  },
  {
    year: "2024",
    title: "Typhoid Days & Office Fame",
    description: "April 2024. I was down with typhoid for two weeks, and you turned into my personal nurse — pushing me to skip office and rest, worrying about me more than I worried about myself. That month our relationship also stopped being a secret at work: my colleagues told me \u201Cmerko PKF m bolte h ki m lucky hu, Anusha achi h\u201D — and at your office they said you were the lucky one. They were both right. I am lucky, every single day, that you're mine.",
    ids: [],
  },
  {
    year: "2024",
    title: "\u201CBheed Bheed Bheed… Masttt\u201D",
    description: "5th May 2024 — our Laxmi Nagar date. We coordinated over metro messages like a heist: Rajiv Chowk to Laxmi Nagar. That evening you described it perfectly: \u201CBheed bheed bheed… masttt.\u201D Crowded, chaotic, completely ours — and absolutely mast. I came home that night replaying every minute. Every Delhi outing with you ends the same way: me smiling at my phone on the metro ride back.",
    ids: [],
  },
  {
    year: "2024",
    title: "\u201CAagya Saket\u201D",
    description: "7th July 2024. Another metro-coordinated date — Hauz Khas to Saket — sealed with a live location pin and my message: \u201CAagya Saket.\u201D No occasion, no plan, just us stealing a few hours from our articleship lives. You in that Saket evening light — I don't think I've ever told you how beautiful you looked just walking toward me. These small, normal dates are my favourite kind of happiness.",
    ids: [],
  },
  {
    year: "2024",
    title: "Two Years, Counted",
    description: "15th August 2024. I sent you two dates — \u201C20 jul 2022\u201D and \u201C28 aug 2022\u201D — the day we started talking, and the day we became us. You replied, \u201CHn to 2 hi to hue.\u201D Two years. No party, no gifts that day — just the two of us quietly counting. Some anniversaries are loud. Ours was a whisper, and it meant everything.",
    ids: [],
  },
  {
    year: "2024",
    title: "The New Delhi Metro Run",
    description: "11th October 2024. You reached New Delhi station — \u201CPahuch gyi hu m\u201D — I was at Shivaji Park — \u201CM shivaji park hu\u201D — then \u201CAa gya New Delhi.\u201D Two people navigating metro stations toward each other, no drama, just the quiet thrill of knowing you're about to see her. October was full of work and late-night Excel rescues, but this — this was the good part.",
    ids: [],
  },
  {
    year: "2024",
    title: "\u201CMera Hubbyyy\u201D",
    description: "24th December 2024. Christmas Eve, and you gave me a new word — \u201CYesss, meraa hubbyyy.\u201D The first time you ever called me that. We planned to meet on the 29th, you half-joked about spending New Year at my place, and we ended the year on voice calls at midnight. After everything that year, we closed it soft — teasing, planning, calling. My beautiful future wifey, practising early.",
    ids: [],
  },
  {
    year: "2025",
    title: "Beautiful Dimsum Baby",
    description: "6th April 2025. One late night we played a game — outdoing each other's I-love-yous with increasingly ridiculous compliments: \u201Cbeautiful dimsum baby,\u201D \u201Ccookie baby,\u201D \u201Cmiss universe of my universe buba,\u201D \u201Cyou are my mosquito that bite me whole day.\u201D You said, \u201CKhoon chusle tu mera, khoon chusle.\u201D The silliest, sweetest half hour of that whole year. This is us at our best, my love — laughing at 2 AM over nothing.",
    ids: [],
  },
  {
    year: "2025",
    title: "Our First Staycation",
    description: "Spring 2025. Our first stay together — we never announced it; the chat just goes quiet, and afterwards there are only soft references: \u201Cpaise bhar diye the OYO ke to,\u201D \u201Clast OYO m.\u201D The chat never describes it — only the before and after. Some things are just ours, my love. What I remember is the feeling after: calm, close, and completely sure about you.",
    ids: [],
  },
  {
    year: "2025",
    title: "\u201CPropose Kardoge Pahado Pe?\u201D",
    description: "7th December 2025. In the middle of planning our December trip, I teased you: \u201CLgta h aap pahado pe propose kardoge mereko, with gold ring.\u201D You played along instantly — \u201COuuuuuuuuuuu, you got to know my plan.\u201D My beautiful Anusha, proposing to me in the mountains with a gold ring — honestly? I wouldn't say no. Consider this my advance acceptance.",
    ids: [],
  },
  {
    year: "2025",
    title: "Jibhi: The Trip of Our Lives",
    description: "12th to 17th December 2025 — our first real trip together. Jibhi, Himachal Pradesh, with Abhishek and Monika. The night before, you almost cancelled — and then I told you I'd brought you something special all the way from a Rajasthan wedding, and suddenly we were running a covert operation at Kashmere Gate bus stand at 10:30 PM so your parents wouldn't spot me. Five days later we were sitting in tents playing Uno, and you said it best: \u201CIsse acha to Jibhi m tha.\u201D Nothing has ever topped it, my love. Take me back.",
    ids: [],
  },
  {
    year: "2025",
    title: "\u201CSirf Hum Dono\u201D",
    description: "28th December 2025. Still glowing from Jibhi, we started dreaming bigger: \u201CAb plan bnayga to sirf hum dono jayge, koi bhi nhi or.\u201D Just the two of us next time. We planned a 4-day birthday getaway for your January birthday and started whispering about Udaipur. My love, every trip with you ends the same way — already planning the next one before we've even unpacked.",
    ids: [],
  },
  {
    year: "2026",
    title: "NSP & The Shoe Swap",
    description: "24th January 2026 — your birthday. NSP at 2:30 PM, Nandini and Priyanshu joining for lunch, your family thinking you were at Yashasvi's. On the way, your new sandals started hurting your feet — so I said, \u201CTu mere shoes pehen liyo, m teri chappal pehen lunga.\u201D Then two whole days together — the chat goes completely silent on the 25th. You, walking beside me in my shoes: my beautiful birthday girl. I have never been happier to have sore feet by proxy.",
    ids: [],
  },
  {
    year: "2026",
    title: "The Night This Website Was Born",
    description: "27th January 2026 — my birthday night. I finally told you my secret: for weeks I had been building you a Netflix-style website as your birthday gift — \u201CJisme login ID password daalne se, fir ese website pe dikhti teri videos photos.\u201D I was building it with AI, stuck on problems I couldn't fix, too shy to tell you it existed. You said the loveliest thing: \u201CMere liye to wahi gift hogya\u201D — the trying was the gift. My love, this website you're looking at right now? It started that night, for you.",
    ids: [],
  },
  {
    year: "2026",
    title: "\u201CHum Shadi Karke Rhege\u201D",
    description: "8th February 2026. After a heavy week, we did what we always do — we dreamed out loud. \u201CHum shadi karke rhege baby.\u201D \u201CYes… yesss.\u201D Both of us CAs, opening our own firm together. You were practical about it, of course — we'd need to earn well, see 100 countries before forty, and you'd have to fix my spending habits. For the first time, marriage didn't sound like a wish, my love. It sounded like a plan. Our plan.",
    ids: [],
  },
  {
    year: "2026",
    title: "\u201CSath Bethegi?\u201D",
    description: "31st March 2026. Exam season turned us into classmates again — 5 AM good-mornings, both of us glued to CA lectures. Then we landed in the same IT/OC training batch: \u201CM aa gya hu uper, tu kab aari h? Sath bethegi? Rakhu na seat.\u201D Back to where we started — me saving you a seat, like Income Tax class in 2022. Later we played skribbl.io like kids. Four years later, my beautiful girl, and I'm still just happy sitting next to you.",
    ids: [],
  },
  {
    year: "2026",
    title: "The Uttam Nagar Visit",
    description: "April 2026. You came to my side of Delhi — Uttam Nagar — and some of our best days left no messages at all; the chat is silent because we were together. Afterwards you wrote: \u201CBada mast laga bubu, dobara to aane ka man karra h.\u201D That night you promised me, \u201CI will never leave you my bubu\u201D — and I said, \u201CIn any case na bebu… no case.\u201D No case, my love. Not now, not ever.",
    ids: [],
  },
  {
    year: "2026",
    title: "\u201CKoi Nahi Samjhata Merko Ese\u201D",
    description: "May 2026. Exam anxiety was eating you up every night, and I became your nightly anchor — talking you down, staying till you felt okay. You thanked me over and over: \u201CBaby thankyou so much bebu, mere saath rehke merko samjhane ke liye… koi nahi samjhata merko ese to.\u201D On Mother's Day you ordered a cheesecake slice for your mummy — and I messaged her too. My caring, beautiful girl — the way you love your mummy tells me exactly the kind of heart I'm marrying one day.",
    ids: [],
  },
  {
    year: "2026",
    title: "The World Trip List",
    description: "19th June 2026. In a quiet, honest conversation you told me: \u201CNahi kara esa kabhi kuch jo maaf hi na kr paaye.\u201D I had never done anything you couldn't forgive. And I dreamed out loud: \u201CBaby list bnayge, or duniya ki saari country visit krege.\u201D A list. Every country in the world. You and me. My love, I meant every word — pack your bags, we're going everywhere.",
    ids: [],
  },
  {
    year: "2026",
    title: "You're My Asthma Pump",
    description: "25th July 2026. Late that night you were unwell — ghabrahat, nausea — and you told me the most poetic thing you have ever said: \u201CMerko asthma h, jiska wo jo pump hota h, wo aap ho.\u201D I am your inhaler, my love. You were scared of becoming a burden — \u201Cbojh ban rhi hu\u201D — and I told you the truth: \u201CTu already wanted h.\u201D You could never be a burden, Anusha. You are the air I breathe.",
    ids: [],
  },
  {
    year: "2026",
    title: "The Burger That Tasted Like Missing Me",
    description: "15th August 2026. Independence Day, and we were apart — you at Haldiram's with your mummy, me eating thali with family. You had a Burger King veggie burger after ages and texted me: \u201CBade time baad khaya burger… nostalgia hogya babudi… or apki yaad bhi agyi.\u201D A burger that tasted like missing me. My love, even your fast food reminds you of me — I must be doing something right.",
    ids: [],
  },
  {
    year: "2026",
    title: "The 23-Minute Whisper Call",
    description: "18th August 2026. I left my phone at home so I'd actually study at the library — and the reward was a 23-minute video call that evening, me whispering because family was around. We ended with \u201CGood nightt\u201D and your \u201CNenu, I love you, good night.\u201D Small discipline, small devotion. My love, even your goodnight texts feel like home.",
    ids: [],
  },
  {
    year: "CONTINUING",
    title: "My Forever Letter to You",
    description: "Anusha, my love — if you're reading this, it means I finally finished what I started for you. So here it is, everything I feel, in one place. I love you. I love you in a way I didn't know was possible before you — not the filmy kind, the real kind. The kind where I notice your sandals hurting and give you my shoes. The kind where I stay up till 12:45 AM just so you don't feel alone. The kind where a burger reminds you of me and I grin like an idiot. You are beautiful, Anusha — not just your face, which genuinely stops my heart every time you walk toward me, but the way you laugh, the way you care for your mummy, the way you dream about our firm and our hundred countries, the way you call me neshu when you're soft and Vishuu when you're happy. I care about you more than I've ever cared about anything — your health, your exams, your mood, your silly 2 AM cravings, all of it is my business now, forever. Thank you for choosing me — in that Income Tax class, in that photograph, on that shoulder, in Jibhi, and every day since. Thank you for staying, through every version of me. I don't know what the future holds, but I know who I want to hold while facing it: you. Tu meri sab kuch h, baby — my oxygen, my water, my heart, my loveee. And I promise you this: I will spend the rest of my life making sure you never doubt it. I love you, my beautiful Anushaa. Always. Forever. No case.",
    ids: [],
  },
];
