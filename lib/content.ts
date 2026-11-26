import type { L } from './i18n';

/**
 * All portfolio content in one place (EN + ID).
 * Edit text here — pages read from this file. Photos live in /public/images.
 */

export type Photo = { src: string; alt: L };

const p = (src: string, en: string, id: string): Photo => ({ src, alt: { en, id } });

export const site = {
  name: 'Rizka Amelia Nurazizah Johana',
  shortName: 'Rizka Amelia',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rizka-amelia.vercel.app',
  email: 'ameliarizka353@gmail.com',
  // The number is never printed on the page; it only lives in the wa.me link.
  // Set NEXT_PUBLIC_WHATSAPP=62xxxxxxxxxx (country code, no + or spaces) in .env.local / Vercel.
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? ''}`,
  linkedin: 'https://www.linkedin.com/in/rizka-amelia-ba2167350/',
  instagram: 'https://www.instagram.com/rizkamnj',
  arunikaa: 'https://www.instagram.com/arunikaa.makeup',
  cv: '/docs/Rizka-Amelia-CV.pdf',
  location: { en: 'Bandung, Indonesia', id: 'Bandung, Indonesia' } as L,
  portrait: p('/images/profile/rizka.jpg', 'Portrait of Rizka Amelia', 'Potret Rizka Amelia'),
  description: {
    en: 'Portfolio of Rizka Amelia — Operation & Administration Staff, Cum Laude graduate of Universitas Pendidikan Indonesia, freelance makeup artist (Arunikaa Makeup), model and speaker based in Bandung.',
    id: 'Portofolio Rizka Amelia — Operation & Administration Staff, lulusan Cum Laude Universitas Pendidikan Indonesia, makeup artist freelance (Arunikaa Makeup), model, dan pembicara di Bandung.',
  } as L,
};

/* ---------------- HOME ---------------- */
export const home = {
  hello: { en: "Hello, I'm", id: 'Halo, saya' },
  tagline1: { en: 'Dream Bigger,', id: 'Bermimpi Lebih Besar,' },
  tagline2: { en: 'Create More.', id: 'Berkarya Lebih Banyak.' },
  intro: {
    en: 'An operations professional with a passion for beauty, communication, and creativity.',
    id: 'Profesional operasional yang mencintai dunia kecantikan, komunikasi, dan kreativitas.',
  },
  ctaPrimary: { en: 'Explore My Journey', id: 'Jelajahi Perjalanan Saya' },
  ctaSecondary: { en: 'Get in Touch', id: 'Hubungi Saya' },
  badge: { en: 'personal portfolio · Rizka Amelia · ', id: 'portofolio pribadi · Rizka Amelia · ' },
  worksTitle: { en: 'Selected Works', id: 'Karya Pilihan' },
  worksSub: { en: 'A collection of my best works.', id: 'Kumpulan karya terbaik saya.' },
  worksAll: { en: 'View All Works', id: 'Lihat Semua Karya' },
  works: [
    { href: '/experience/makeup-artist', photo: p('/images/makeup/mua-1.jpg', 'Makeup work behind the scenes', 'Proses makeup di balik layar') },
    { href: '/speaking', photo: p('/images/speaking/unpad-2.jpg', 'Speaking on stage at FMIPA UNPAD', 'Menjadi pembicara di FMIPA UNPAD') },
    { href: '/projects/momies-bakery', photo: p('/images/model/momies-3.jpg', 'Momies Bakery campaign portrait', 'Potret kampanye Momies Bakery') },
    { href: '/organization', photo: p('/images/organization/himagrin.jpg', 'With fellow organization members', 'Bersama rekan organisasi') },
  ],
};

/* ---------------- ABOUT ---------------- */
export const about = {
  eyebrow: { en: 'About me', id: 'Tentang saya' },
  title: [{ en: 'A little story', id: 'Sedikit cerita' }, { en: 'about me.', id: 'tentang saya.' }] as [L, L],
  desc: {
    en: "I'm Rizka Amelia — a Cum Laude graduate who believes in the power of creativity, kindness, and continuous learning.",
    id: 'Saya Rizka Amelia — lulusan Cum Laude yang percaya pada kekuatan kreativitas, kebaikan, dan belajar tanpa henti.',
  },
  cta: { en: 'Know More', id: 'Selengkapnya' },
  values: [
    { icon: 'gem', title: { en: 'Creative Mind', id: 'Pikiran Kreatif' }, caption: { en: 'Always learning', id: 'Selalu belajar' } },
    { icon: 'star', title: { en: 'Kind Heart', id: 'Hati yang Baik' }, caption: { en: 'Always caring', id: 'Selalu peduli' } },
    { icon: 'heart', title: { en: 'Big Dreams', id: 'Mimpi Besar' }, caption: { en: 'Always growing', id: 'Selalu bertumbuh' } },
  ],
  journeyEyebrow: { en: 'My journey', id: 'Perjalanan saya' },
  journeyTitle: [{ en: 'Turning passion', id: 'Mengubah passion' }, { en: 'into purpose.', id: 'menjadi tujuan.' }] as [L, L],
  journey: {
    en: 'A Cum Laude graduate in Agroindustrial Technology Education from Universitas Pendidikan Indonesia, with a thesis on developing an SOP for hedonic testing. Today I run daily operations, administration and reporting as an Operational Staff, and serve customers in person and online. Beyond the office, I am the makeup artist behind Arunikaa, a freelance model, and a speaker on grooming and beauty.',
    id: 'Lulusan Cum Laude Pendidikan Teknologi Agroindustri, Universitas Pendidikan Indonesia, dengan skripsi tentang pengembangan SOP uji hedonik. Kini saya mengelola operasional harian, administrasi, dan pelaporan sebagai Operational Staff, serta melayani pelanggan secara langsung maupun online. Di luar kantor, saya adalah makeup artist di balik Arunikaa, model freelance, dan pembicara seputar grooming dan kecantikan.',
  },
  cv: { en: 'Download CV', id: 'Unduh CV' },
  photos: [
    p('/images/work/ilove-emas-3.jpg', 'Serving a customer at the store counter', 'Melayani pelanggan di konter toko'),
    p('/images/work/ilove-emas-2.jpg', 'With the store team', 'Bersama tim toko'),
  ],
};

/* ---------------- EDUCATION ---------------- */
export const education = {
  eyebrow: { en: 'Education', id: 'Pendidikan' },
  title: [{ en: 'Building a strong', id: 'Membangun fondasi' }, { en: 'foundation.', id: 'yang kuat.' }] as [L, L],
  desc: {
    en: 'A solid foundation in agroindustrial technology and education to achieve greater dreams.',
    id: 'Fondasi kuat di bidang teknologi agroindustri dan pendidikan untuk meraih mimpi yang lebih besar.',
  },
  cta: { en: 'See My Education', id: 'Lihat Pendidikan Saya' },
  timeline: [
    {
      period: { en: '2020 – 2025', id: '2020 – 2025' },
      title: { en: 'Universitas Pendidikan Indonesia', id: 'Universitas Pendidikan Indonesia' },
      sub: { en: 'Agroindustrial Technology Education · FPTI', id: 'Pendidikan Teknologi Agroindustri · FPTI' },
      photo: p('/images/thesis/lab-7.jpg', 'Sensory lab at FPTI UPI', 'Laboratorium sensori FPTI UPI'),
    },
    {
      period: { en: 'During studies', id: 'Selama kuliah' },
      title: { en: 'SMKN 4 Garut', id: 'SMKN 4 Garut' },
      sub: { en: 'Teaching practicum — lesson plans, teaching, evaluation', id: 'PPL — menyusun RPP, mengajar, evaluasi' },
      photo: p('/images/teaching/smkn4-garut-1.jpg', 'With students at SMKN 4 Garut', 'Bersama siswa SMKN 4 Garut'),
    },
    {
      period: { en: 'Jan 2025', id: 'Jan 2025' },
      title: { en: 'Graduated Cum Laude · S.Pd.', id: 'Lulus Cum Laude · S.Pd.' },
      sub: { en: 'GPA 3.49 / 4.00', id: 'IPK 3,49 / 4,00' },
      photo: p('/images/teaching/smkn4-garut-2.jpg', 'Class photo at SMKN 4 Garut', 'Foto kelas di SMKN 4 Garut'),
    },
  ],
  quote: [{ en: 'Keep learning,', id: 'Terus belajar,' }, { en: 'keep growing.', id: 'terus bertumbuh.' }] as [L, L],
  thesisEyebrow: { en: 'Thesis · 2024', id: 'Skripsi · 2024' },
  thesisTitle: [{ en: 'A standard procedure', id: 'Prosedur standar' }, { en: 'for hedonic testing.', id: 'untuk uji hedonik.' }] as [L, L],
  thesisBody: {
    en: 'Developed an SOP for consumer-preference tests at the Food Technology Sensory Evaluation Laboratory, FPTI UPI.',
    id: 'Mengembangkan SOP uji kesukaan konsumen di Laboratorium Evaluasi Sensori Teknologi Pangan, FPTI UPI.',
  },
  thesisCta: { en: 'Read the Case Study', id: 'Baca Studi Kasus' },
};

/* ---------------- EXPERIENCE ---------------- */
export type Experience = {
  slug: string;
  role: L;
  org: L;
  period: L;
  type: L;
  summary: L;
  points: L[];
  cover: Photo;
  gallery: Photo[];
};

export const experiencePage = {
  eyebrow: { en: 'Experience', id: 'Pengalaman' },
  title: [{ en: 'Turning ideas', id: 'Mengubah ide' }, { en: 'into impact.', id: 'menjadi dampak.' }] as [L, L],
  desc: { en: 'A journey of growth, creativity, and meaningful contributions.', id: 'Perjalanan bertumbuh, berkreasi, dan berkontribusi.' },
  cta: { en: 'View Details', id: 'Lihat Detail' },
};

export const experiences: Experience[] = [
  {
    slug: 'i-love-emas',
    role: { en: 'Operational Staff', id: 'Staf Operasional' },
    org: { en: 'PT Muara Logam Indonesia · I Love Emas', id: 'PT Muara Logam Indonesia · I Love Emas' },
    period: { en: 'Apr 2025 – Present', id: 'Apr 2025 – Sekarang' },
    type: { en: 'Full-time', id: 'Penuh waktu' },
    summary: {
      en: 'Daily operations to SOP, periodic reports, customer service in store and online, and social-media content.',
      id: 'Operasional harian sesuai SOP, laporan berkala, layanan pelanggan di toko dan online, serta konten media sosial.',
    },
    points: [
      { en: 'Managed and monitored daily operations in line with company SOP.', id: 'Mengelola dan memantau operasional harian sesuai SOP perusahaan.' },
      { en: 'Handled administration, data processing and daily, weekly and monthly reports to management.', id: 'Menangani administrasi, pengolahan data, serta laporan harian, mingguan, dan bulanan kepada manajemen.' },
      { en: 'Served customers in person and online, handling inquiries and complaints.', id: 'Melayani pelanggan secara langsung dan online, menangani pertanyaan dan keluhan.' },
      { en: 'Coordinated with teams and supervised stock, facilities and operational schedules.', id: 'Berkoordinasi dengan tim serta mengawasi stok, fasilitas, dan jadwal operasional.' },
      { en: 'Managed social media: planning, scheduling and evaluating content.', id: 'Mengelola media sosial: merencanakan, menjadwalkan, dan mengevaluasi konten.' },
    ],
    cover: p('/images/work/ilove-emas-1.jpg', 'The I Love Emas store team', 'Tim toko I Love Emas'),
    gallery: [
      p('/images/work/ilove-emas-1.jpg', 'The I Love Emas store team', 'Tim toko I Love Emas'),
      p('/images/work/ilove-emas-2.jpg', 'With the store team', 'Bersama tim toko'),
      p('/images/work/ilove-emas-3.jpg', 'Serving a customer at the counter', 'Melayani pelanggan di konter'),
    ],
  },
  {
    slug: 'agronesia-bmc',
    role: { en: 'Operational Intern', id: 'Magang Operasional' },
    org: { en: 'PT Agronesia · Unit Bandoengsche Melk Centrale', id: 'PT Agronesia · Unit Bandoengsche Melk Centrale' },
    period: { en: 'Oct 2023 – Jan 2024', id: 'Okt 2023 – Jan 2024' },
    type: { en: 'Internship', id: 'Magang' },
    summary: {
      en: 'Quality Control before distribution, accurate production reports and process monitoring.',
      id: 'Quality Control sebelum distribusi, laporan produksi yang akurat, dan pemantauan proses.',
    },
    points: [
      { en: 'Ensured every product passed Quality Control before distribution.', id: 'Memastikan setiap produk lolos Quality Control sebelum didistribusikan.' },
      { en: 'Prepared accurate, timely production reports for evaluation and decisions.', id: 'Menyusun laporan produksi yang akurat dan tepat waktu untuk evaluasi dan pengambilan keputusan.' },
      { en: 'Monitored operational processes against established standards.', id: 'Memantau proses operasional agar sesuai standar.' },
      { en: 'Worked across divisions and contributed ideas to improve operations.', id: 'Bekerja lintas divisi dan menyumbang ide perbaikan operasional.' },
    ],
    cover: p('/images/internship/agronesia-1.jpg', 'PT Agronesia production floor', 'Area produksi PT Agronesia'),
    gallery: [
      p('/images/internship/agronesia-1.jpg', 'PT Agronesia production floor', 'Area produksi PT Agronesia'),
      p('/images/internship/agronesia-2.jpg', 'Visit to DKPP Jawa Barat', 'Kunjungan ke DKPP Jawa Barat'),
      p('/images/internship/agronesia-3.jpg', 'Visit to Jabar Command Center', 'Kunjungan ke Jabar Command Center'),
      p('/images/internship/agronesia-4.jpg', 'Visit to Dinas Sosial Jawa Barat', 'Kunjungan ke Dinas Sosial Jawa Barat'),
    ],
  },
  {
    slug: 'makeup-artist',
    role: { en: 'Makeup Artist', id: 'Makeup Artist' },
    org: { en: 'Freelance · Arunikaa Makeup', id: 'Freelance · Arunikaa Makeup' },
    period: { en: 'Jan 2024 – Feb 2025', id: 'Jan 2024 – Feb 2025' },
    type: { en: 'Freelance', id: 'Freelance' },
    summary: {
      en: 'Makeup for weddings, photoshoots and commercial events; scheduling and team delegation.',
      id: 'Makeup untuk pernikahan, photoshoot, dan acara komersial; penjadwalan dan pembagian tugas tim.',
    },
    points: [
      { en: 'Ran an independent makeup service for weddings, photoshoots and commercial events, tailored to each client.', id: 'Menjalankan jasa makeup mandiri untuk pernikahan, photoshoot, dan acara komersial sesuai kebutuhan klien.' },
      { en: "Planned project schedules and delegated jobs by each team member's strengths.", id: 'Merencanakan jadwal proyek dan membagi tugas sesuai keahlian anggota tim.' },
    ],
    cover: p('/images/makeup/mua-5.jpg', 'Sundanese bridal makeup with siger', 'Makeup pengantin Sunda dengan siger'),
    gallery: [
      p('/images/makeup/mua-5.jpg', 'Sundanese bridal look', 'Riasan pengantin Sunda'),
      p('/images/makeup/mua-2.jpg', 'Graduation day look', 'Riasan wisuda'),
      p('/images/makeup/mua-3.jpg', 'Traditional look', 'Riasan tradisional'),
      p('/images/makeup/mua-4.jpg', 'Soft editorial look', 'Riasan editorial lembut'),
      p('/images/makeup/mua-1.jpg', 'Behind the chair', 'Di balik layar'),
      p('/images/speaking/sman1-subang-2.jpg', 'Live makeup demo at SMAN 1 Subang', 'Demo makeup langsung di SMAN 1 Subang'),
    ],
  },
  {
    slug: 'model-talent',
    role: { en: 'Model & Talent', id: 'Model & Talent' },
    org: { en: 'Freelance · e.g. Momies Bakery', id: 'Freelance · mis. Momies Bakery' },
    period: { en: 'Jan 2024 – Present', id: 'Jan 2024 – Sekarang' },
    type: { en: 'Freelance', id: 'Freelance' },
    summary: {
      en: 'Photoshoot, fashion and commercial projects with creative teams.',
      id: 'Proyek photoshoot, fashion, dan komersial bersama tim kreatif.',
    },
    points: [
      { en: 'Took on model and talent roles for photoshoot, fashion and commercial projects.', id: 'Menjadi model dan talent untuk proyek photoshoot, fashion, dan komersial.' },
      { en: 'Adapted to varied concepts and worked professionally with creative teams.', id: 'Beradaptasi dengan berbagai konsep dan bekerja profesional bersama tim kreatif.' },
    ],
    cover: p('/images/model/momies-11.jpg', 'Lifestyle shoot for Momies Bakery', 'Sesi foto lifestyle Momies Bakery'),
    gallery: Array.from({ length: 12 }, (_, i) => p(`/images/model/momies-${i + 1}.jpg`, `Momies Bakery campaign, frame ${i + 1}`, `Kampanye Momies Bakery, foto ${i + 1}`)),
  },
];

export const makeupPage = {
  eyebrow: { en: 'Makeup Artist', id: 'Makeup Artist' },
  title: [{ en: 'Enhance your', id: 'Tonjolkan' }, { en: 'natural beauty.', id: 'kecantikan alami.' }] as [L, L],
  desc: { en: 'Makeup for every moment, with love and care — as Arunikaa Makeup.', id: 'Makeup untuk setiap momen, dengan cinta dan perhatian — bersama Arunikaa Makeup.' },
  cta: { en: 'Book Now', id: 'Pesan Sekarang' },
  galleryTitle: { en: 'The portfolio', id: 'Portofolio' },
  stats: [
    { value: { en: '13 mo', id: '13 bln' }, label: { en: 'Freelance, Jan 2024 – Feb 2025', id: 'Freelance, Jan 2024 – Feb 2025' } },
    { value: { en: '2', id: '2' }, label: { en: 'Beauty classes taught', id: 'Kelas kecantikan dibawakan' } },
    { value: { en: '1', id: '1' }, label: { en: 'Makeup training certificate', id: 'Sertifikat pelatihan tata rias' } },
  ],
};

/* ---------------- SKILLS ---------------- */
export const skillsPage = {
  eyebrow: { en: 'Skills', id: 'Keahlian' },
  title: [{ en: 'My skills', id: 'Keahlian' }, { en: 'and expertise.', id: 'dan kemampuan.' }] as [L, L],
  desc: {
    en: 'A combination of operational, communication, creative and technical skills to bring ideas to life.',
    id: 'Perpaduan kemampuan operasional, komunikasi, kreatif, dan teknis untuk mewujudkan ide.',
  },
  photo: p('/images/makeup/mua-1.jpg', 'Makeup work in progress', 'Proses merias'),
  featured: [
    { name: { en: 'Communication', id: 'Komunikasi' }, items: [{ en: 'Public speaking', id: 'Public speaking' }, { en: 'Customer service', id: 'Layanan pelanggan' }, { en: 'Complaint handling', id: 'Penanganan keluhan' }] },
    { name: { en: 'Beauty & Creative', id: 'Kecantikan & Kreatif' }, items: [{ en: 'Makeup artistry', id: 'Tata rias' }, { en: 'Modelling', id: 'Modeling' }, { en: 'Grooming classes', id: 'Kelas grooming' }] },
    { name: { en: 'Technical', id: 'Teknis' }, items: [{ en: 'Canva', id: 'Canva' }, { en: 'CapCut', id: 'CapCut' }, { en: 'Microsoft Office', id: 'Microsoft Office' }, { en: 'Google Workspace', id: 'Google Workspace' }] },
  ],
  more: [
    { name: { en: 'Operations', id: 'Operasional' }, items: [{ en: 'Daily operations', id: 'Operasional harian' }, { en: 'SOP implementation', id: 'Penerapan SOP' }, { en: 'Monitoring', id: 'Monitoring' }, { en: 'Scheduling', id: 'Penjadwalan' }] },
    { name: { en: 'Admin & Reporting', id: 'Administrasi & Laporan' }, items: [{ en: 'Data processing', id: 'Pengolahan data' }, { en: 'Reports', id: 'Laporan' }, { en: 'Minutes', id: 'Notulensi' }, { en: 'Correspondence', id: 'Korespondensi' }] },
    { name: { en: 'Quality & Research', id: 'Mutu & Riset' }, items: [{ en: 'QC monitoring', id: 'Monitoring QC' }, { en: 'SOP development', id: 'Pengembangan SOP' }, { en: 'Hedonic testing', id: 'Uji hedonik' }] },
    { name: { en: 'Marketing & Language', id: 'Pemasaran & Bahasa' }, items: [{ en: 'Social media', id: 'Media sosial' }, { en: 'Content planning', id: 'Perencanaan konten' }, { en: 'Indonesian (native)', id: 'Indonesia (bahasa ibu)' }, { en: 'English (intermediate)', id: 'Inggris (menengah)' }] },
  ],
};

/* ---------------- ORGANIZATION ---------------- */
export const organizationPage = {
  eyebrow: { en: 'Organization', id: 'Organisasi' },
  title: [{ en: 'Growing together', id: 'Tumbuh bersama' }, { en: 'in great community.', id: 'dalam komunitas hebat.' }] as [L, L],
  desc: { en: 'Active in student organisations at FPTI UPI to create positive impact.', id: 'Aktif di organisasi mahasiswa FPTI UPI untuk menciptakan dampak positif.' },
  cta: { en: 'See My Organization', id: 'Lihat Organisasi Saya' },
  rolesTitle: [{ en: 'Leadership', id: 'Peran' }, { en: 'roles.', id: 'kepemimpinan.' }] as [L, L],
  rolesBody: { en: 'Keeping student organisations organised — minutes, records and the coordination in between.', id: 'Menjaga organisasi tetap rapi — notulen, arsip, dan koordinasi di antaranya.' },
  photos: [
    p('/images/organization/himagrin.jpg', 'With HIMAGRIN members', 'Bersama anggota HIMAGRIN'),
    p('/images/organization/fpti-board.jpg', 'With the FPTI student board', 'Bersama pengurus organisasi mahasiswa FPTI'),
  ],
  roles: [
    {
      period: { en: 'Sep 2022 – Jan 2023', id: 'Sep 2022 – Jan 2023' },
      role: { en: 'General Assembly Secretary', id: 'Sekretaris Sidang Umum' },
      org: { en: 'FPTI UPI Student Organization Board (DPM/BEM)', id: 'Dewan Perwakilan Mahasiswa / BEM FPTI UPI' },
      body: { en: 'Recorded, summarised and documented every outcome of the BEM General Assembly; managed its administration and minutes.', id: 'Mencatat, merangkum, dan mendokumentasikan seluruh hasil Sidang Umum BEM; mengelola administrasi dan notulensinya.' },
    },
    {
      period: { en: 'Jan 2021 – Jan 2022', id: 'Jan 2021 – Jan 2022' },
      role: { en: 'General Secretary Staff', id: 'Staf Sekretaris Umum' },
      org: { en: 'BEM HIMAGRIN FPTI UPI', id: 'BEM HIMAGRIN FPTI UPI' },
      body: { en: "Managed the association's administration, correspondence and activity records; supported reports, minutes and coordination.", id: 'Mengelola administrasi, surat-menyurat, dan arsip kegiatan himpunan; mendukung laporan, notulensi, dan koordinasi.' },
    },
  ],
};

/* ---------------- SPEAKING ---------------- */
export const speakingPage = {
  eyebrow: { en: 'Speaking', id: 'Pembicara' },
  title: [{ en: 'Sharing ideas,', id: 'Berbagi ide,' }, { en: 'inspiring others.', id: 'menginspirasi sesama.' }] as [L, L],
  desc: { en: 'Sharing knowledge and experiences through talks, workshops, and classes.', id: 'Berbagi ilmu dan pengalaman lewat talkshow, workshop, dan kelas.' },
  cta: { en: 'View Events', id: 'Lihat Acara' },
  hero: p('/images/speaking/unpad-2.jpg', 'Speaking on stage at FMIPA UNPAD', 'Menjadi pembicara di FMIPA UNPAD'),
  highlightsTitle: { en: 'Event highlights', id: 'Sorotan acara' },
  highlights: [
    p('/images/speaking/sman1-subang-1.jpg', 'With SMAN 1 Subang students', 'Bersama siswa SMAN 1 Subang'),
    p('/images/speaking/unpad-1.jpg', 'Token of appreciation at UNPAD', 'Menerima tanda terima kasih di UNPAD'),
    p('/images/speaking/sman1-subang-2.jpg', 'Live makeup demo', 'Demo makeup langsung'),
    p('/images/speaking/unpad-2.jpg', 'On stage at FMIPA UNPAD', 'Di panggung FMIPA UNPAD'),
  ],
  events: [
    {
      when: { en: 'Sep 2024 · Jatinangor', id: 'Sep 2024 · Jatinangor' },
      title: { en: 'Grooming & Beauty Class — PUTRA-PUTRI MIPA 2024', id: 'Grooming & Beauty Class — PUTRA-PUTRI MIPA 2024' },
      host: { en: 'Faculty of Mathematics and Natural Sciences, Universitas Padjadjaran', id: 'FMIPA Universitas Padjadjaran' },
      body: { en: 'Makeup, professional appearance and self-confidence — interactive training on makeup techniques, skincare, dressing and body language.', id: 'Makeup, penampilan profesional, dan kepercayaan diri — pelatihan interaktif teknik makeup, skincare, berpakaian, dan bahasa tubuh.' },
    },
    {
      when: { en: 'Jun 2024 · Subang', id: 'Jun 2024 · Subang' },
      title: { en: 'Arunikaa Class — Inspirational Class (P5)', id: 'Arunikaa Class — Kelas Inspirasi (P5)' },
      host: { en: 'SMAN 1 Subang', id: 'SMAN 1 Subang' },
      body: { en: 'Makeup from professional and entrepreneurial perspectives: basic techniques, current trends, and its role in the creative industry.', id: 'Makeup dari sisi profesional dan kewirausahaan: teknik dasar, tren terkini, dan perannya di industri kreatif.' },
    },
  ],
};

/* ---------------- PROJECTS ---------------- */
export type Project = {
  slug: string;
  kicker: L;
  title: [L, L];
  summary: L;
  cover: Photo;
  gallery: Photo[];
  steps?: { title: L; body: L }[];
};

export const projectsPage = {
  eyebrow: { en: 'Projects', id: 'Proyek' },
  title: [{ en: 'Little projects,', id: 'Proyek kecil,' }, { en: 'lasting lessons.', id: 'pelajaran besar.' }] as [L, L],
  desc: { en: 'A thesis that became a lab procedure, and a campaign shoot in front of the camera.', id: 'Skripsi yang menjadi prosedur laboratorium, dan sesi kampanye di depan kamera.' },
  cta: { en: 'See Projects', id: 'Lihat Proyek' },
  backToProjects: { en: 'Back to Projects', id: 'Kembali ke Proyek' },
};

export const projects: Project[] = [
  {
    slug: 'sop-hedonic-testing',
    kicker: { en: 'Undergraduate thesis · FPTI UPI · 2024', id: 'Skripsi · FPTI UPI · 2024' },
    title: [{ en: 'A standard procedure', id: 'Prosedur standar' }, { en: 'for hedonic testing.', id: 'untuk uji hedonik.' }],
    summary: {
      en: 'Development of a Standard Operating Procedure (SOP) for hedonic testing at the Food Technology Sensory Evaluation Laboratory, FPTI UPI.',
      id: 'Pengembangan Standard Operating Procedure (SOP) uji hedonik di Laboratorium Evaluasi Sensori Teknologi Pangan, FPTI UPI.',
    },
    cover: p('/images/thesis/lab-7.jpg', 'The sensory evaluation laboratory', 'Laboratorium evaluasi sensori'),
    gallery: [
      p('/images/thesis/lab-1.jpg', 'Setting up samples', 'Menyiapkan sampel'),
      p('/images/thesis/lab-3.jpg', 'Panel booths', 'Bilik panelis'),
      p('/images/thesis/lab-5.jpg', 'Scoring the samples', 'Menilai sampel'),
      p('/images/thesis/lab-4.jpg', 'Lab workstation', 'Meja kerja laboratorium'),
      p('/images/thesis/lab-8.jpg', 'Coded samples', 'Sampel berkode'),
      p('/images/thesis/lab-9.jpg', 'Panelist session', 'Sesi panelis'),
      p('/images/thesis/lab-6.jpg', 'Preparing the station', 'Menyiapkan meja uji'),
      p('/images/thesis/lab-10.jpg', 'Hedonic score sheet', 'Lembar penilaian hedonik'),
    ],
    steps: [
      // TODO(Rizka): replace the bracketed parts with the real details from the thesis.
      { title: { en: 'Context', id: 'Latar belakang' }, body: { en: 'Why the lab needed one consistent procedure. [to be completed]', id: 'Mengapa laboratorium membutuhkan satu prosedur baku. [akan dilengkapi]' } },
      { title: { en: 'Process', id: 'Proses' }, body: { en: 'Coded samples, prepared stations and scored panel sessions. [method, number of panelists]', id: 'Sampel berkode, meja uji, dan sesi penilaian panelis. [metode, jumlah panelis]' } },
      { title: { en: 'Output', id: 'Hasil' }, body: { en: 'A written SOP for the sensory evaluation lab. [validation result]', id: 'Dokumen SOP untuk laboratorium evaluasi sensori. [hasil validasi]' } },
    ],
  },
  {
    slug: 'momies-bakery',
    kicker: { en: 'Campaign · Model · Momies Bakery', id: 'Kampanye · Model · Momies Bakery' },
    title: [{ en: 'Momies Bakery', id: 'Momies Bakery' }, { en: 'campaign lookbook.', id: 'lookbook kampanye.' }],
    summary: {
      en: 'From the concept briefing to the studio beauty set and the lifestyle shoot — twelve frames.',
      id: 'Dari briefing konsep, sesi studio, hingga foto lifestyle — dua belas bingkai.',
    },
    cover: p('/images/model/momies-12.jpg', 'Lifestyle shoot for Momies Bakery', 'Sesi foto lifestyle Momies Bakery'),
    gallery: Array.from({ length: 12 }, (_, i) => p(`/images/model/momies-${i + 1}.jpg`, `Momies Bakery campaign, frame ${i + 1}`, `Kampanye Momies Bakery, foto ${i + 1}`)),
  },
];

/* ---------------- CERTIFICATES ---------------- */
export const certificatesPage = {
  eyebrow: { en: 'Certificates', id: 'Sertifikat' },
  title: [{ en: 'Proof of growth,', id: 'Bukti bertumbuh,' }, { en: 'framed with care.', id: 'dibingkai penuh makna.' }] as [L, L],
  desc: { en: 'Certification and recognition along the way — tap any certificate to view it.', id: 'Sertifikasi dan penghargaan di sepanjang perjalanan — ketuk untuk melihat.' },
  cta: { en: 'View Certificates', id: 'Lihat Sertifikat' },
  openPdf: { en: 'Open BNSP certificate (PDF)', id: 'Buka sertifikat BNSP (PDF)' },
  pdf: '/docs/BNSP-Certificate.pdf',
  items: [
    { photo: p('/images/certificates/bnsp-page-1.jpg', 'BNSP certificate — Skilled Instructor', 'Sertifikat BNSP — Instruktur Terampil'), title: { en: 'BNSP · Skilled Instructor', id: 'BNSP · Instruktur Terampil' }, meta: { en: 'Nov 2024 · No. 74321.2351.3.0018224.2024', id: 'Nov 2024 · No. 74321.2351.3.0018224.2024' } },
    { photo: p('/images/certificates/bnsp-page-2.jpg', 'BNSP certificate — competency units', 'Sertifikat BNSP — unit kompetensi'), title: { en: 'BNSP · Competency units', id: 'BNSP · Unit kompetensi' }, meta: { en: 'Page 2', id: 'Halaman 2' } },
    { photo: p('/images/certificates/makeup-training-upi.jpg', 'Makeup training certificate, UPI', 'Sertifikat pelatihan tata rias, UPI'), title: { en: 'Makeup training', id: 'Pelatihan tata rias' }, meta: { en: 'Universitas Pendidikan Indonesia · Mar 2024', id: 'Universitas Pendidikan Indonesia · Mar 2024' } },
    { photo: p('/images/speaking/sman1-subang-3.jpg', 'Speaker certificate, SMAN 1 Subang', 'Piagam narasumber, SMAN 1 Subang'), title: { en: 'Speaker certificate', id: 'Piagam narasumber' }, meta: { en: 'SMAN 1 Subang · Jun 2024', id: 'SMAN 1 Subang · Jun 2024' } },
  ],
};

/* ---------------- CONTACT ---------------- */
export const contactPage = {
  eyebrow: { en: 'Contact', id: 'Kontak' },
  title: [{ en: "Let's", id: 'Mari' }, { en: 'connect!', id: 'terhubung!' }] as [L, L],
  desc: { en: 'Feel free to reach out for collaboration, projects, a role — or just to say hello.', id: 'Silakan hubungi saya untuk kolaborasi, proyek, peluang kerja — atau sekadar menyapa.' },
  email: { en: 'Email', id: 'Email' },
  whatsapp: { en: 'WhatsApp', id: 'WhatsApp' },
  whatsappValue: { en: 'Chat with me', id: 'Chat dengan saya' },
  location: { en: 'Location', id: 'Lokasi' },
  send: { en: 'Send Message', id: 'Kirim Pesan' },
};

export const notFoundPage = {
  title: { en: 'Oops! Page not found', id: 'Ups! Halaman tidak ditemukan' },
  body: { en: 'The page you are looking for might have been removed, or is temporarily unavailable.', id: 'Halaman yang kamu cari mungkin sudah dihapus atau sedang tidak tersedia.' },
  cta: { en: 'Back to Home', id: 'Kembali ke Beranda' },
};

/* ---------------- NAV / SEARCH ---------------- */
export const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'education', href: '/education' },
  { key: 'experience', href: '/experience' },
  { key: 'makeup', href: '/experience/makeup-artist' },
  { key: 'skills', href: '/skills' },
  { key: 'organization', href: '/organization' },
  { key: 'speaking', href: '/speaking' },
  { key: 'projects', href: '/projects' },
  { key: 'certificates', href: '/certificates' },
] as const;
