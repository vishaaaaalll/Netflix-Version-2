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
  heroTitleAccent: 'Story',
  heroSubtitle: 'Because our story deserves its own streaming service.',
  heroTimeline: '2022 — CONTINUING',
  heroMeta: ['2022', 'All love', 'Continuing', 'Countless episodes'],
  heroDescription: 'One story. Two people. Countless memories.\nAnd the story is still being written.',
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
  loveNote: 'I love you.',
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
    year: '2022',
    title: 'July 2022 — The watch, the rain, and Income Tax class',
    description: 'You were holding on to my watch and telling me to take care of it. We were just two CA coaching classmates — me sitting at the back of Income Tax class asking doubts so you would turn around, you in front pretending not to notice. Neither of us knew that July was the start of everything.',
    ids: [],
  },
  {
    year: '2022',
    title: 'August 2022 — "Tera koi bf h?" "Kbhi nhi."',
    description: 'I asked you straight that night — do you see me as a bhai? You laughed it off. Then "tera koi bf h?" and you said "kbhi nhi" — never had one. You told me you used to look at me specially in class; I told you I had been waiting for you to look. We ended the night with new names — Vishuu, meri Anushaa — and a "bye bye love".',
    ids: [],
  },
  {
    year: '2022',
    title: 'August 2022 — Possession and ownership',
    description: 'You were stressed about studies, half-crying over the phone, and somehow that night became the most important one. "Ye tera dil h? Tune mereko de diya kya... ab mera ho gya?" — "Haa hogyaaaaaa." I asked: possession or ownership, what did you give? You said "donoooooo" — both. Then you admitted it plainly: "I am possessivee." My girl.',
    ids: [],
  },
  {
    year: '2022',
    title: '5 September 2022 — Your head on my shoulder',
    description: 'Our first meeting, at the AVJ farewell. The big plans fizzled — we barely got ten minutes together — but my hand rested on your leg and you slept on my shoulder, and you told me later it was the best sleep of your life. You cried at home for everything we had imagined. That night we said it first: "love you yarr" — "I love youu." Three years later, we would still be counting from that week.',
    ids: [],
  },
  {
    year: '2022',
    title: 'Winter 2022 — The first silence, and "Ours"',
    description: 'After September\'s fire, we went almost silent for four months — eleven messages in total. The meetup we had promised never happened. Then Christmas: you called, my mummy picked up my phone, you panicked and hung up. We closed that year with a single word between us. You wrote "Ours likha hai, shayad." I wrote back: "Ours."',
    ids: [],
  },
  {
    year: '2023',
    title: 'February 2023 — Your birthday, and our first kiss',
    description: 'February brought us back at full speed. Your birthday — I was there, and you said "maza aaya tha." The Adventure Island mall trip, empty except a couple doing a mangalsutra photoshoot. And by the 21st we were laughing about it over chat — "dono ko kiss bhi nhi aati thi shi se." Neither of us knew how to kiss properly. "Dono ko hi nahi aati — to fir barabar hogya."',
    ids: [],
  },
  {
    year: '2023',
    title: 'June 2023 — Our first trip, and our first real fight',
    description: '"Kal milege, maza aayga." Our first trip together — and that same night, our first real couple fight, because you thought I had deleted every photo of us. You admitted later you were genuinely hurt — "haan bilkul, mana." Everything was backed up; nothing was lost. We turned it into teasing. That became our pattern: fight hard, forgive fast.',
    ids: [],
  },
  {
    year: '2023',
    title: '11 September 2023 — When your mummy called me',
    description: 'Your mummy read our chats — all of them — and then called me herself, warmly: "Baat karte ho beta? Batao beta." Her verdict: no objection, just finish CA first. "Padhai karo, baat karo." That same night I told you I had failed my attempt, and you told me you had not even given yours. The first parent who knew about us — and did not try to end it.',
    ids: [],
  },
  {
    year: '2024',
    title: 'January 2024 — The photo that made you fall for me',
    description: 'Interview season. You were already selected at SS Kothari; both of us about to start articleship. And that day you finally admitted it — "pehle thodi pasand the aap merko... ye photo dekhke pasand aaye. Dil ko chuu gyi, soo beautiful handsome boyyy." Even you fell for me slowly. I will take it.',
    ids: [],
  },
  {
    year: '2024',
    title: 'March 2024 — "You are my oxygen"',
    description: 'You were lonely at the new office — "koi dhanka dost to h nhi" — and a jealous flare over your solo Himachal plan turned into the most romantic night of that year. "You are my oxygen, you are my water, you are my heart, you are my loveee." I stayed up with you till 12:45: "jabtak aapka mood thik nhi hoga, m kahi nhi jauga — chahe subh ho jaay." You said I was enough for you.',
    ids: [],
  },
  {
    year: '2024',
    title: 'May 2024 — Laxmi Nagar, then the Akshardham storm',
    description: 'A Sunday date planned like a heist over metro messages — Rajiv Chowk to Laxmi Nagar. "Bheed bheed bheed... masttt." Days later, the year\'s first big storm: you wanted to visit Akshardham with Gaurav, and I lost it — "meri hi gf lad rhi h kisi or ladke k sath jaane k liye." You apologised in floods, promised never to go anywhere without me, and we reset the way we always do: "sorry = sorry... 0 = 0."',
    ids: [],
  },
  {
    year: '2024',
    title: '17 September 2024 — 1 AM to 5 AM',
    description: 'The Meha fight. Four hours in the middle of the night — you asked for a break, said "hogya end," and when I asked if you wanted to stay, you said "rehna hi merko to." And somewhere in those hours came the plainest thing either of us has ever said: "girlfriend h tu meri... m bhi tera boyfriend hu." And about marriage — "shadi to ekdum full and final h, F&F." September was our highest-volume month ever, mostly because of that one night.',
    ids: [],
  },
  {
    year: '2024',
    title: 'December 2024 — "Hubbyyy"',
    description: 'Christmas Eve, you called me "mera hubbyyy" for the first time — the year\'s last new word. We planned to meet on the 29th; you half-joked about spending New Year at my place, and I said my plan was to sleep straight into the next year. No party in the end — just voice calls at midnight. After a year of storms, we closed it soft.',
    ids: [],
  },
  {
    year: '2025',
    title: '24 January 2025 — 3:14 AM: you unblocked me',
    description: 'After weeks of silence — "You unblocked this person," at 3:14 in the morning. We started with careful one-liners — "kya hua aapko," "merese gussa ho kya" — and by evening you were calling me bebu and googli again. Everything that came after was the aftermath of that restart.',
    ids: [],
  },
  {
    year: '2025',
    title: 'February 2025 — Your baba',
    description: 'Your grandfather passed away in early February, and I did not even ask — "kabhi tune pucha hi nahi itne din m." You told me your mornings started with crying and your evenings with a pain in your chest. It was the heaviest thing we had ever faced, and the clearest you ever named your wound: that I am absent in the moments you need me most. I have been trying to be better at that ever since.',
    ids: [],
  },
  {
    year: '2025',
    title: 'March 2025 — The relationship contract',
    description: 'Two CA-track kids, so naturally we tried to fix our fights with a legal document. I said I would bring the stamp paper. Blocking: banned — "kyoki kya pta kab aakhri block ho." Breakup talk: strictly prohibited. Fights: with civic sense. And my favourite clause — "it will protect both of us... from your hate speech." You called it a fun activity. The joke lived on for months.',
    ids: [],
  },
  {
    year: '2025',
    title: '6 April 2025 — The I-love-you game',
    description: 'One late night we tried to outdo each other\'s I-love-yous: "you are my mosquito that bite me whole day," "you are my cow for my milk," "beautiful dimsum baby." You said "khoon chusle tu mera, khoon chusle." The silliest, sweetest half hour of that whole year — the calm after March\'s storms.',
    ids: [],
  },
  {
    year: '2025',
    title: 'Spring 2025 — Our first stay together',
    description: 'We never announced it — the chat just goes quiet, and afterwards there are only references: "paise bhar diye the OYO ke to," "last OYO m." Our first stay together, sometime that spring. The chat never describes it, only the before and after. Some things are just ours.',
    ids: [],
  },
  {
    year: '2025',
    title: '26 August 2025 — The negotiation',
    description: 'After three blocked days you opened with "hum breakup krlete h" — and instead, we negotiated like a treaty. My condition: promise me you will never drink again. Your boundary: no more making you feel small for my words. That night you asked, "hum sex ke liye hi h kya saath me?" I said, "nhi baby... tu to meri sab kuch h." You asked if I trust you. "Bhohott saara."',
    ids: [],
  },
  {
    year: '2025',
    title: '5 September 2025 — Three years, three promises',
    description: 'Three years since I first said I love you — right after that same AVJ outing in 2022. This night you almost left for real: "me chat bhi delete krne wali thi ekdum." I begged from my office desk — "rona aara h bhohot, sabke saamne." And then we pinned three promises: 1. Never block. 2. Never ignore. 3. Never mention breakup. "Meri taraf se wada h." "Meri taraf se bhi." The closest we ever came to losing this — and the night we wrote down the rules for keeping it.',
    ids: [],
  },
  {
    year: '2025',
    title: '13 September 2025 — Trust without the apps',
    description: 'You ended Life360 yourself — "in apps se esa lagta h ki tracking ho rhi h, jese tu trust nhi karta." You wanted us to trust each other "bina kisi proof ya apps ke." I was suspicious for exactly one minute, then I understood. "Me kabhi tera trust nhi todungi, pakka." The surveillance era ended because you decided it should.',
    ids: [],
  },
  {
    year: '2025',
    title: 'December 2025 — Jibhi: the trip that almost didn\'t happen',
    description: 'Our first real trip — Jibhi, Himachal, with Abhishek and Monika. The night before, you cancelled: "thik h to tum teeno jao, me nahi ari." I said something stupid. Then I told you I had brought you something special from a Rajasthan wedding, and by 10:30 PM we were running a covert op at the Kashmere Gate bus stand so your parents would not spot me. The night before, you had joked I would propose in the mountains with a gold ring. "You got to know my plan."',
    ids: [],
  },
  {
    year: '2026',
    title: 'January 2026 — Your birthday: the shoe swap',
    description: 'Your birthday weekend — NSP at 2:30, Nandini and Priyanshu at lunch, your family thinking you were at Yashasvi\'s. Your new sandals were hurting your feet, so I offered: "tu mere shoes pehen liyo, m teri chappal pehen lunga." Then two whole days together — the chat goes completely silent on the 25th. The most romantic stretch of that whole year.',
    ids: [],
  },
  {
    year: '2026',
    title: '27 January 2026 — My birthday, and the birth of this website',
    description: 'My birthday started with your midnight wish — "i am so lucky to have you my baby" — and exploded into the biggest fight we had ever had: 1,300 messages, breakup demands, "pathar dil." And in the middle of that same night, at 11 PM, mid-reconciliation, I told you my secret: I had been building you a Netflix-style website for your birthday — "jisme login id password daalne se, fir ese website pe dikhti teri videos photos." It was stuck, full of issues I could not fix. You said, "mere liye to wahi gift hogya" — the trying was the gift. This website you are looking at? It started that night.',
    ids: [],
  },
  {
    year: '2026',
    title: 'February 2026 — Marriage, and a firm of our own',
    description: 'After the storms — your mummy knew everything by then, and she had stayed on our side — we started dreaming out loud: "hum shadi karke rhege baby." Both of us CAs, opening a firm together. You were practical about it, of course — we would need to earn well, see the world before forty, and you would have to fix my spending habits. A plan, not just a wish. The first time marriage sounded like something we were building toward.',
    ids: [],
  },
  {
    year: '2026',
    title: 'Spring 2026 — Classmates again',
    description: 'Exam season turned us into classmates again — 5 AM good-mornings, both of us watching CA lectures. On March 31st we landed in the same IT/OC batch: "sath bethegi? rakhu na seat." Later we played skribbl.io like kids. And some of our best days left no messages at all — April 10th and 19th are completely silent in the chat, because we were together. On the 21st you wrote: "i will never leave you my bubu."',
    ids: [],
  },
  {
    year: '2026',
    title: '26 July 2026 — You\'re my asthma pump',
    description: 'Late that night you were unwell — ghabrahat, nausea — and you told me the most vulnerable thing you have ever said: "merko asthma h, jiska wo jo pump hota h, wo aap ho." I am your inhaler. And when I do not meet you on time, it gets "life taking." You were scared of becoming a burden — "bojh ban rhi hu." I told you: "tu already wanted h." We agreed to save the hard conversations for after the exams.',
    ids: [],
  },
  {
    year: '2026',
    title: '15 August 2026 — The burger that tasted like missing me',
    description: 'Independence Day, and we were apart — you at Haldiram\'s with your mummy, me eating thali with family. You had a Burger King veggie burger after ages and texted me: "nostalgia hogya babudi... or apki yaad bhi agyi." A burger that tasted like missing me. You ended the day confessing DT exam tension. An ordinary day holding everything at once — that is us.',
    ids: [],
  },
  {
    year: '2026',
    title: '25 September 2026 — The money fight, and the FR tip',
    description: 'The worst day in our chat. A money-splitting argument — "paise ki kadar tu dono ki kre... sirf apne ki kre, wo mujhe bardaasht nahi" — spiralled into breakup talk and the cruelest things we have said. And then, at 4 PM the same day, I sent you an FR teacher\'s tip — 181 questions covering most of the paper — because your exam mattered to me more than the fight. You said "thanku." That is the whole story, really: we say the worst things, and we still do not let go.',
    ids: [],
  },
  {
    year: 'CONTINUING',
    title: 'The Story Isn\'t Over Yet',
    description: 'The best chapters are still unwritten. Here\'s to everything that comes next. To be continued...',
    ids: [],
  },
];
