import type { L } from './i18n';

/**
 * All portfolio content in one place (EN + ID).
 * Edit text here — pages read from this file. Photos live in /public/images.
 */

/** `pos` = CSS object-position, for photos whose subject is off-centre. */
export type Photo = { src: string; alt: L; pos?: string };

const p = (src: string, en: string, id: string, pos?: string): Photo => ({ src, alt: { en, id }, pos });

export const site = {
  name: 'Rizka Amelia Nurazizah Johana',
  shortName: 'Rizka Amelia',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rizka-amelia.vercel.app',
  email: 'ameliarizka353@gmail.com',
  // The number is never printed on the page; it only lives in the wa.me link.
  // Set NEXT_PUBLIC_WHATSAPP=62xxxxxxxxxx (country code, no + or spaces) in .env.local / Vercel.
  // wa.me needs the international form (62…); a local number like 0812… is converted here.
  whatsapp: `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP ?? '').replace(/\D/g, '').replace(/^0/, '62')}`,
  linkedin: 'https://www.linkedin.com/in/rizka-amelia-ba2167350/',
  instagram: 'https://www.instagram.com/rizkamnj',
  arunikaa: 'https://www.instagram.com/arunikaa.makeup',
  cv: '/docs/Rizka-Amelia-CV.pdf',
  location: { en: 'Bandung, Indonesia', id: 'Bandung, Indonesia' } as L,
  /** Pre-cropped so the subject sits in the middle of the frame (arch = tall, circle = square). */
  portrait: p('/images/profile/rizka-arch.jpg', 'Portrait of Rizka Amelia', 'Potret Rizka Amelia', '50% 30%'),
  portraitCircle: p('/images/profile/rizka-circle.jpg', 'Portrait of Rizka Amelia', 'Potret Rizka Amelia', '50% 40%'),
  description: {
    en: 'Portfolio of Rizka Amelia — Operational Staff in Bandung pursuing Operational & Administrative Staff roles, with experience in daily operations, administration, data processing, reporting and customer service; Cum Laude graduate of Universitas Pendidikan Indonesia.',
    id: 'Portofolio Rizka Amelia — Operational Staff di Bandung yang menargetkan posisi Operational & Administrative Staff, berpengalaman dalam operasional harian, administrasi, pengolahan data, pelaporan, dan layanan pelanggan; lulusan Cum Laude Universitas Pendidikan Indonesia.',
  } as L,
};

/**
 * Institution / company logos. Put the image files at these paths (PNG or SVG with a transparent
 * background works best); until a file exists, a monogram badge is shown instead.
 */
export type Logo = { src: string; name: string; mono: string };
export const logos = {
  upi: { src: '/images/logos/upi.png', name: 'Universitas Pendidikan Indonesia', mono: 'UPI' },
  iloveEmas: { src: '/images/logos/ilove-emas.png', name: 'PT Muara Logam Indonesia · I Love Emas', mono: 'ILE' },
  agronesia: { src: '/images/logos/agronesia.png', name: 'PT Agronesia · BMC', mono: 'BMC' },
  momies: { src: '/images/logos/momies-bakery.png', name: 'Momies Bakery', mono: 'MB' },
  bnsp: { src: '/images/logos/bnsp.png', name: 'Badan Nasional Sertifikasi Profesi', mono: 'BNSP' },
} satisfies Record<string, Logo>;

/* ---------------- HOME ---------------- */
export const home = {
  hello: { en: "Hello, I'm", id: 'Halo, saya' },
  headline: { en: 'Operational & Administrative Staff', id: 'Operational & Administrative Staff' },
  intro: {
    en: 'Organized, detail-oriented, and adaptable professional with experience in daily operations, administrative tasks, data management, reporting, and customer service.',
    id: 'Profesional yang terorganisir, teliti, dan mudah beradaptasi, berpengalaman dalam operasional harian, tugas administrasi, pengelolaan data, pelaporan, dan layanan pelanggan.',
  },
  interestsLabel: { en: 'Additional Interests', id: 'Minat Lainnya' },
  interests: [
    { label: { en: 'Makeup Artist', id: 'Makeup Artist' }, href: '/experience/makeup-artist' },
    { label: { en: 'Model & Talent', id: 'Model & Talent' }, href: '/experience/model-talent' },
    { label: { en: 'Public Speaking', id: 'Public Speaking' }, href: '/speaking' },
  ],
  /** Scrolling ribbon under the hero: the professional strengths an HR reader scans for. */
  roles: [
    { en: 'Daily Operations', id: 'Operasional Harian' },
    { en: 'Administration', id: 'Administrasi' },
    { en: 'Data Management', id: 'Pengelolaan Data' },
    { en: 'Reporting', id: 'Pelaporan' },
    { en: 'Stock Management', id: 'Pengelolaan Stok' },
    { en: 'Customer Service', id: 'Layanan Pelanggan' },
    { en: 'Team Coordination', id: 'Koordinasi Tim' },
  ] as L[],
  ctaPrimary: { en: 'View My Experience', id: 'Lihat Pengalaman Saya' },
  ctaSecondary: { en: 'Download CV', id: 'Unduh CV' },
  badge: { en: 'operations · admin · Rizka Amelia · ', id: 'operasional · admin · Rizka Amelia · ' },
  worksTitle: { en: 'Selected Works', id: 'Karya Pilihan' },
  worksSub: { en: 'Operations and administration first — creative work alongside.', id: 'Operasional dan administrasi di depan — karya kreatif menyertai.' },
  worksAll: { en: 'View All Experience', id: 'Lihat Semua Pengalaman' },
  works: [
    { href: '/experience/i-love-emas', label: { en: 'Operations', id: 'Operasional' }, photo: p('/images/work/ilove-emas-3.jpg', 'Serving a customer at the I Love Emas counter', 'Melayani pelanggan di konter I Love Emas') },
    { href: '/experience/agronesia-bmc', label: { en: 'Reporting & QC', id: 'Laporan & QC' }, photo: p('/images/internship/agronesia-1.jpg', 'PT Agronesia production floor', 'Area produksi PT Agronesia') },
    { href: '/experience/makeup-artist', label: { en: 'Makeup', id: 'Makeup' }, photo: p('/images/makeup/mua-5.jpg', 'Sundanese bridal makeup by Arunikaa', 'Riasan pengantin Sunda oleh Arunikaa', '50% 22%') },
    { href: '/speaking', label: { en: 'Speaking', id: 'Pembicara' }, photo: p('/images/speaking/unpad-2-speaker.jpg', 'Speaking on stage at FMIPA UNPAD', 'Menjadi pembicara di FMIPA UNPAD', '50% 35%') },
  ],
  footnote: {
    en: 'Outside office hours I also work freelance as a makeup artist (Arunikaa), model and speaker — the creative side of the same organised person.',
    id: 'Di luar jam kerja, saya juga aktif secara freelance sebagai makeup artist (Arunikaa), model, dan pembicara — sisi kreatif dari pribadi yang sama-sama rapi.',
  },
  footnoteLink: { en: 'See the creative work', id: 'Lihat karya kreatif' },
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
  valuesTitle: { en: 'My values', id: 'Nilai saya' },
  values: [
    { icon: 'gem', title: { en: 'Creative mindset', id: 'Pola pikir kreatif' }, caption: { en: 'Always looking for new ideas and solutions.', id: 'Selalu mencari ide dan solusi baru.' } },
    { icon: 'heart', title: { en: 'Kind & collaborative', id: 'Ramah & kolaboratif' }, caption: { en: 'Working with care and respect.', id: 'Bekerja dengan peduli dan hormat.' } },
    { icon: 'star', title: { en: 'Continuous growth', id: 'Terus bertumbuh' }, caption: { en: 'Eager to learn and be better than before.', id: 'Haus belajar dan menjadi lebih baik.' } },
  ],
  journeyEyebrow: { en: 'My journey', id: 'Perjalanan saya' },
  journeyTitle: [{ en: 'Turning passion', id: 'Mengubah passion' }, { en: 'into purpose.', id: 'menjadi tujuan.' }] as [L, L],
  journey: {
    en: 'I currently work as an Operational Staff at PT Muara Logam Indonesia (I Love Emas): I run daily operations to SOP, maintain operational administration and process data, prepare daily, weekly and monthly reports, coordinate facilities, equipment and supplies, and serve customers in person and online. My goal is to grow as an Operational & Administrative Staff. I am a Cum Laude graduate in Agroindustrial Technology Education from Universitas Pendidikan Indonesia, with a thesis on developing an SOP for hedonic testing. Beyond the office, I am the makeup artist behind Arunikaa, a freelance model, and a speaker on grooming and beauty.',
    id: 'Saat ini saya bekerja sebagai Operational Staff di PT Muara Logam Indonesia (I Love Emas): menjalankan operasional harian sesuai SOP, menjaga administrasi operasional dan mengolah data, menyusun laporan harian, mingguan, dan bulanan, mengoordinasikan fasilitas, peralatan, dan perlengkapan, serta melayani pelanggan secara langsung maupun online. Tujuan saya adalah berkembang sebagai Operational & Administrative Staff. Saya lulusan Cum Laude Pendidikan Teknologi Agroindustri, Universitas Pendidikan Indonesia, dengan skripsi tentang pengembangan SOP uji hedonik. Di luar kantor, saya adalah makeup artist di balik Arunikaa, model freelance, dan pembicara seputar grooming dan kecantikan.',
  },
  cv: { en: 'Download CV', id: 'Unduh CV' },
  photos: [
    p('/images/speaking/unpad-1.jpg', 'Receiving a token of appreciation at UNPAD', 'Menerima tanda terima kasih di UNPAD', '50% 30%'),
    p('/images/makeup/mua-1.jpg', 'Behind the chair with Arunikaa Makeup', 'Di balik kursi rias bersama Arunikaa Makeup'),
  ],
  quote: [{ en: 'Turning ideas', id: 'Mengubah ide' }, { en: 'into meaningful impact.', id: 'menjadi dampak bermakna.' }] as [L, L],
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
      logo: logos.upi as Logo | null,
      sub: { en: 'Bachelor of Agroindustrial Technology Education · Faculty of Technology and Industrial Education (FPTI)', id: 'S1 Pendidikan Teknologi Agroindustri · Fakultas Pendidikan Teknologi dan Industri (FPTI)' },
      photo: p('/images/thesis/lab-2.jpg', 'Rizka in the sensory lab at FPTI UPI', 'Rizka di laboratorium sensori FPTI UPI', '50% 30%') as Photo | null,
    },
    {
      period: { en: 'During studies', id: 'Selama kuliah' },
      title: { en: 'SMKN 4 Garut', id: 'SMKN 4 Garut' },
      logo: null as Logo | null,
      sub: { en: 'Teaching practicum — lesson plans, teaching, evaluation', id: 'PPL — menyusun RPP, mengajar, evaluasi' },
      photo: p('/images/teaching/smkn4-garut-2.jpg', 'With the class at SMKN 4 Garut', 'Bersama kelas di SMKN 4 Garut') as Photo | null,
    },
    {
      period: { en: 'Jan 2025', id: 'Jan 2025' },
      title: { en: 'Graduated Cum Laude · S.Pd.', id: 'Lulus Cum Laude · S.Pd.' },
      logo: logos.upi as Logo | null,
      sub: { en: 'GPA 3.49 / 4.00', id: 'IPK 3,49 / 4,00' },
      // No graduation photo of Rizka exists, so this stop shows a diploma illustration instead.
      photo: null as Photo | null,
    },
  ],
  quote: [{ en: 'Keep learning,', id: 'Terus belajar,' }, { en: 'keep growing.', id: 'terus bertumbuh.' }] as [L, L],
  thesisEyebrow: { en: 'Thesis · 2024', id: 'Skripsi · 2024' },
  thesisTitle: [{ en: 'A standard procedure', id: 'Prosedur standar' }, { en: 'for hedonic testing.', id: 'untuk uji hedonik.' }] as [L, L],
  thesisBody: {
    en: 'Development of a Standard Operating Procedure (SOP) for Hedonic Testing at the Food Technology Sensory Evaluation Laboratory, FPTI UPI.',
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
  /** Key areas shown as chips on the role card and detail page. */
  focus?: L[];
  logo?: Logo;
  points: L[];
  cover: Photo;
  gallery: Photo[];
};

export const experiencePage = {
  eyebrow: { en: 'Experience', id: 'Pengalaman' },
  title: [{ en: 'Organised work,', id: 'Kerja rapi,' }, { en: 'real impact.', id: 'dampak nyata.' }] as [L, L],
  desc: {
    en: 'Operations, administration, data and reporting first — with freelance creative work alongside.',
    id: 'Operasional, administrasi, data, dan pelaporan di depan — ditemani karya kreatif freelance.',
  },
  cta: { en: 'View Details', id: 'Lihat Detail' },
  focusTitle: { en: 'Key responsibilities', id: 'Fokus pekerjaan' },
  docsTitle: { en: 'Work documentation', id: 'Dokumentasi pekerjaan' },
};

export const experiences: Experience[] = [
  {
    slug: 'i-love-emas',
    logo: logos.iloveEmas,
    role: { en: 'Operational Staff', id: 'Operational Staff' },
    org: { en: 'PT Muara Logam Indonesia · I Love Emas', id: 'PT Muara Logam Indonesia · I Love Emas' },
    period: { en: 'Apr 2025 – Present', id: 'Apr 2025 – Sekarang' },
    type: { en: 'Full-time', id: 'Penuh waktu' },
    summary: {
      en: 'Administration, data processing, daily/weekly/monthly reports, stock monitoring and team coordination — with customer service in store and online.',
      id: 'Administrasi, pengolahan data, laporan harian/mingguan/bulanan, pemantauan stok, dan koordinasi tim — serta layanan pelanggan di toko dan online.',
    },
    focus: [
      { en: 'Operational coordination', id: 'Koordinasi operasional' },
      { en: 'Administration', id: 'Administrasi' },
      { en: 'Reporting', id: 'Pembuatan laporan' },
      { en: 'Data processing', id: 'Pengolahan data' },
      { en: 'Stock & supplies', id: 'Stok & perlengkapan' },
      { en: 'Customer service', id: 'Layanan pelanggan' },
    ],
    points: [
      { en: 'Operational coordination — manage and monitor daily operations in line with SOP, coordinating with internal teams and organising work priorities so operational targets are met.', id: 'Koordinasi operasional — mengelola dan memantau operasional harian sesuai SOP, berkoordinasi dengan tim internal, dan mengatur prioritas kerja agar target operasional tercapai.' },
      { en: 'Administration & reporting — prepare daily, weekly and monthly operational reports and maintain operational administration as input for management monitoring and decisions.', id: 'Administrasi & laporan — menyusun laporan operasional harian, mingguan, dan bulanan serta menjaga administrasi operasional sebagai bahan pemantauan dan pengambilan keputusan manajemen.' },
      { en: 'Data processing — process and record operational data accurately to support periodic reporting.', id: 'Pengolahan data — mengolah dan mencatat data operasional secara akurat untuk mendukung pelaporan berkala.' },
      { en: 'Stock & supplies — monitor operational needs, coordinate the availability of facilities, equipment and supplies, and follow up process issues with solutions.', id: 'Stok & perlengkapan — memantau kebutuhan operasional, mengoordinasikan ketersediaan fasilitas, peralatan, dan perlengkapan, serta menindaklanjuti kendala proses dengan solusi.' },
      { en: 'Customer service — serve customers in person and through digital platforms, handling inquiries and complaints to improve the Customer Satisfaction Score (CSAT).', id: 'Layanan pelanggan — melayani pelanggan secara langsung maupun melalui platform digital, menangani pertanyaan dan keluhan untuk meningkatkan Customer Satisfaction Score (CSAT).' },
      { en: 'Digital promotion — manage social media: content planning, publication scheduling, production coordination and content performance evaluation.', id: 'Promosi digital — mengelola media sosial: perencanaan konten, penjadwalan publikasi, koordinasi produksi, dan evaluasi performa konten.' },
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
    logo: logos.agronesia,
    role: { en: 'Operational Staff (Internship)', id: 'Operational Staff (Magang)' },
    org: { en: 'PT Agronesia · Unit Bandoengsche Melk Centrale', id: 'PT Agronesia · Unit Bandoengsche Melk Centrale' },
    period: { en: 'Oct 2023 – Jan 2024', id: 'Okt 2023 – Jan 2024' },
    type: { en: 'Internship', id: 'Magang' },
    summary: {
      en: 'Accurate production reports, Quality Control before distribution, and monitoring processes against standards.',
      id: 'Laporan produksi yang akurat, Quality Control sebelum distribusi, dan pemantauan proses sesuai standar.',
    },
    focus: [
      { en: 'Production reports', id: 'Laporan produksi' },
      { en: 'Quality Control', id: 'Quality Control' },
      { en: 'Process monitoring', id: 'Pemantauan proses' },
      { en: 'Cross-division coordination', id: 'Koordinasi lintas divisi' },
    ],
    points: [
      { en: 'Prepared accurate, timely production reports for evaluation and decisions.', id: 'Menyusun laporan produksi yang akurat dan tepat waktu untuk evaluasi dan pengambilan keputusan.' },
      { en: 'Ensured every product passed Quality Control before distribution.', id: 'Memastikan setiap produk lolos Quality Control sebelum didistribusikan.' },
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
    role: { en: 'Professional Makeup Artist', id: 'Professional Makeup Artist' },
    org: { en: 'Freelance · Arunikaa Makeup', id: 'Freelance · Arunikaa Makeup' },
    period: { en: 'Jan 2024 – Feb 2025', id: 'Jan 2024 – Feb 2025' },
    type: { en: 'Freelance', id: 'Freelance' },
    summary: {
      en: 'Makeup for weddings, photoshoots and commercial events; client scheduling and team delegation.',
      id: 'Makeup untuk pernikahan, photoshoot, dan acara komersial; penjadwalan klien dan pembagian tugas tim.',
    },
    points: [
      { en: 'Ran an independent makeup service for weddings, photoshoots and commercial events, tailored to each client.', id: 'Menjalankan jasa makeup mandiri untuk pernikahan, photoshoot, dan acara komersial sesuai kebutuhan klien.' },
      { en: 'Planned client and project schedules and delegated jobs by each team member’s strengths.', id: 'Merencanakan jadwal klien dan proyek serta membagi tugas sesuai keahlian anggota tim.' },
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
    logo: logos.momies,
    role: { en: 'Model and Talent', id: 'Model and Talent' },
    org: { en: 'Freelance · Momies Bakery', id: 'Freelance · Momies Bakery' },
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
    cover: p('/images/model/momies-3.jpg', 'Momies Bakery campaign shoot', 'Sesi kampanye Momies Bakery', '50% 35%'),
    gallery: [
      p('/images/model/momies-3.jpg', 'Presenting the bakes for Momies Bakery', 'Menampilkan kue untuk Momies Bakery', '50% 35%'),
      p('/images/model/momies-4.jpg', 'Tasting the bakes on set', 'Mencicipi kue di lokasi'),
      p('/images/model/momies-1.jpg', 'Concept briefing with the creative team', 'Briefing konsep bersama tim kreatif'),
      p('/images/model/momies-2.jpg', 'Going through the shot list', 'Membahas daftar foto'),
    ],
  },
];

export const makeupPage = {
  eyebrow: { en: 'Makeup Artist', id: 'Makeup Artist' },
  title: [{ en: 'Enhance your', id: 'Tonjolkan' }, { en: 'natural beauty.', id: 'kecantikan alami.' }] as [L, L],
  desc: { en: 'Makeup for every moment, with love and care — as Arunikaa Makeup.', id: 'Makeup untuk setiap momen, dengan cinta dan perhatian — bersama Arunikaa Makeup.' },
  cta: { en: 'Book Now', id: 'Pesan Sekarang' },
  galleryTitle: { en: 'The portfolio', id: 'Portofolio' },
  looksTitle: { en: 'Freelance beauty shoot', id: 'Sesi beauty freelance' },
  looksSub: {
    en: 'Studio beauty looks I created as a freelance makeup artist. Frames of the same look are stacked — hover to fan them out, tap to see every frame.',
    id: 'Tampilan beauty studio yang saya kerjakan sebagai makeup artist freelance. Bingkai dari tampilan yang sama ditumpuk — arahkan kursor untuk membukanya, ketuk untuk melihat semua.',
  },
  /** Freelance beauty-shoot documentation (mua-6 … mua-13), grouped by look. */
  looks: [
    {
      title: { en: 'Blush cardigan', id: 'Cardigan blush' },
      note: { en: 'Soft pink, dewy skin', id: 'Merah muda lembut, kulit dewy' },
      photos: [
        p('/images/makeup/mua-6.jpg', 'Blush makeup look', 'Riasan blush', '50% 25%'),
        p('/images/makeup/mua-10.jpg', 'Blush makeup look, close frame', 'Riasan blush, bingkai dekat', '50% 25%'),
      ],
    },
    {
      title: { en: 'Marigold', id: 'Marigold' },
      note: { en: 'Warm peach glow', id: 'Kilau peach hangat' },
      photos: [
        p('/images/makeup/mua-7.jpg', 'Marigold makeup look', 'Riasan marigold', '50% 25%'),
        p('/images/makeup/mua-9.jpg', 'Marigold makeup look with a pink gerbera', 'Riasan marigold dengan gerbera merah muda', '50% 25%'),
      ],
    },
    {
      title: { en: 'Gerbera', id: 'Gerbera' },
      note: { en: 'One look, three moods', id: 'Satu riasan, tiga suasana' },
      photos: [
        p('/images/makeup/mua-8.jpg', 'Gerbera makeup look', 'Riasan gerbera', '50% 25%'),
        p('/images/makeup/mua-11.jpg', 'Gerbera makeup look, smiling', 'Riasan gerbera, tersenyum', '50% 25%'),
        p('/images/makeup/mua-13.jpg', 'Gerbera makeup look, side glance', 'Riasan gerbera, melirik', '50% 25%'),
      ],
    },
    {
      title: { en: 'Orchid', id: 'Anggrek' },
      note: { en: 'Magenta accents', id: 'Aksen magenta' },
      photos: [p('/images/makeup/mua-12.jpg', 'Orchid makeup look', 'Riasan anggrek', '50% 25%')],
    },
  ],
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
    en: 'Operational and administrative skills first, backed by communication, technical and creative strengths.',
    id: 'Kemampuan operasional dan administrasi di depan, didukung kemampuan komunikasi, teknis, dan kreatif.',
  },
  featured: [
    // Groups and items follow the SKILLS section of the CV.
    { icon: 'compass', name: { en: 'Operations', id: 'Operasional' }, items: [{ en: 'Daily operations management', id: 'Manajemen operasional harian' }, { en: 'SOP implementation', id: 'Penerapan SOP' }, { en: 'Operational monitoring', id: 'Monitoring operasional' }, { en: 'Workflow coordination', id: 'Koordinasi alur kerja' }, { en: 'Work scheduling', id: 'Penjadwalan kerja' }] },
    { icon: 'file', name: { en: 'Administration & Reporting', id: 'Administrasi & Laporan' }, items: [{ en: 'Data processing', id: 'Pengolahan data' }, { en: 'Operational reporting', id: 'Laporan operasional' }, { en: 'Production reporting', id: 'Laporan produksi' }, { en: 'Documentation', id: 'Dokumentasi' }, { en: 'Meeting minutes', id: 'Notulensi rapat' }, { en: 'Correspondence', id: 'Korespondensi' }] },
    { icon: 'laptop', name: { en: 'Software', id: 'Software' }, items: [{ en: 'Microsoft Excel', id: 'Microsoft Excel' }, { en: 'Microsoft Word', id: 'Microsoft Word' }, { en: 'Microsoft PowerPoint', id: 'Microsoft PowerPoint' }, { en: 'Google Workspace', id: 'Google Workspace' }, { en: 'Canva', id: 'Canva' }, { en: 'CapCut', id: 'CapCut' }] },
  ],
  more: [
    { icon: 'mic', name: { en: 'Customer Service', id: 'Layanan Pelanggan' }, items: [{ en: 'In-person & digital customer service', id: 'Layanan pelanggan langsung & digital' }, { en: 'Inquiry & complaint handling', id: 'Penanganan pertanyaan & keluhan' }] },
    { icon: 'flask', name: { en: 'Quality Control & Research', id: 'Quality Control & Riset' }, items: [{ en: 'Product quality inspection', id: 'Inspeksi mutu produk' }, { en: 'QC monitoring', id: 'Monitoring QC' }, { en: 'SOP development', id: 'Pengembangan SOP' }, { en: 'Sensory evaluation (hedonic testing)', id: 'Evaluasi sensori (uji hedonik)' }] },
    { icon: 'people', name: { en: 'Digital Marketing', id: 'Pemasaran Digital' }, items: [{ en: 'Social media management', id: 'Manajemen media sosial' }, { en: 'Content planning', id: 'Perencanaan konten' }, { en: 'Content performance monitoring', id: 'Monitoring performa konten' }] },
    { icon: 'globe', name: { en: 'Languages', id: 'Bahasa' }, items: [{ en: 'Indonesian (native)', id: 'Indonesia (bahasa ibu)' }, { en: 'English (intermediate)', id: 'Inggris (menengah)' }] },
    { icon: 'brush', name: { en: 'Additional interests', id: 'Minat lainnya' }, items: [{ en: 'Makeup artistry', id: 'Tata rias' }, { en: 'Modelling', id: 'Modeling' }, { en: 'Public speaking', id: 'Public speaking' }] },
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
  // Pre-cropped from unpad-2.jpg so the speaker sits in the middle of the arch.
  hero: p('/images/speaking/unpad-2-speaker.jpg', 'Speaking on stage at FMIPA UNPAD', 'Menjadi pembicara di FMIPA UNPAD', '50% 30%'),
  highlightsTitle: { en: 'Event highlights', id: 'Sorotan acara' },
  highlights: [
    p('/images/speaking/sman1-subang-1.jpg', 'With SMAN 1 Subang students', 'Bersama siswa SMAN 1 Subang'),
    p('/images/speaking/unpad-1.jpg', 'Token of appreciation at UNPAD', 'Menerima tanda terima kasih di UNPAD'),
    p('/images/speaking/sman1-subang-2.jpg', 'Live makeup demo', 'Demo makeup langsung'),
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
  /** SOP-style walkthrough; each step carries the photos that show it. */
  steps?: { title: L; body: L; photos: Photo[] }[];
  /** Near-identical frames grouped into looks, shown as one stack per look. */
  looks?: { title: L; note: L; photos: Photo[] }[];
};

export const projectsPage = {
  eyebrow: { en: 'Projects', id: 'Proyek' },
  title: [{ en: 'Little projects,', id: 'Proyek kecil,' }, { en: 'lasting lessons.', id: 'pelajaran besar.' }] as [L, L],
  desc: { en: 'A thesis that became a lab procedure, and a campaign shoot in front of the camera.', id: 'Skripsi yang menjadi prosedur laboratorium, dan sesi kampanye di depan kamera.' },
  cta: { en: 'See Projects', id: 'Lihat Proyek' },
  backToProjects: { en: 'Back to Projects', id: 'Kembali ke Proyek' },
  caseKicker: { en: 'Project case study', id: 'Studi kasus proyek' },
  caseCta: { en: 'See the case study', id: 'Lihat studi kasus' },
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
    cover: p('/images/thesis/lab-5.jpg', 'Scoring samples in the sensory lab', 'Menilai sampel di laboratorium sensori'),
    gallery: [],
    steps: [
      {
        title: { en: 'Prepare the station', id: 'Siapkan meja uji' },
        body: { en: 'Samples are portioned, coded with random numbers and set out on clean plates.', id: 'Sampel diporsikan, diberi kode acak, dan disajikan di piring bersih.' },
        photos: [
          p('/images/thesis/lab-6.jpg', 'Preparing the serving station', 'Menyiapkan meja penyajian'),
          p('/images/thesis/lab-8.jpg', 'Coded samples ready to serve', 'Sampel berkode siap disajikan'),
        ],
      },
      {
        title: { en: 'Brief the panelists', id: 'Beri arahan panelis' },
        body: { en: 'Each panelist is welcomed and walked through the procedure before tasting.', id: 'Setiap panelis disambut dan dijelaskan prosedurnya sebelum mencicipi.' },
        photos: [
          p('/images/thesis/lab-2.jpg', 'Reviewing the SOP draft', 'Meninjau draf SOP'),
          p('/images/thesis/lab-1.jpg', 'A panelist arriving at the lab', 'Panelis tiba di laboratorium'),
        ],
      },
      {
        title: { en: 'Taste in the booths', id: 'Mencicipi di bilik' },
        body: { en: 'Panelists taste in separate booths so no one influences anyone else.', id: 'Panelis mencicipi di bilik terpisah agar tidak saling memengaruhi.' },
        photos: [
          p('/images/thesis/lab-3.jpg', 'Panelists in their booths', 'Panelis di bilik masing-masing'),
          p('/images/thesis/lab-9.jpg', 'A panelist in a testing booth', 'Panelis di bilik uji'),
          p('/images/thesis/lab-4.jpg', 'Filling in the form', 'Mengisi formulir'),
        ],
      },
      {
        title: { en: 'Score and record', id: 'Menilai dan mencatat' },
        body: { en: 'Liking is scored on the hedonic scale and every sheet is recorded for analysis.', id: 'Tingkat kesukaan dinilai dengan skala hedonik dan setiap lembar dicatat untuk dianalisis.' },
        photos: [
          p('/images/thesis/lab-5.jpg', 'Scoring the samples', 'Menilai sampel'),
          p('/images/thesis/lab-10.jpg', 'The hedonic score sheet', 'Lembar penilaian hedonik'),
          p('/images/thesis/lab-7.jpg', 'Recording results in the sensory lab', 'Mencatat hasil di laboratorium sensori'),
        ],
      },
    ],
  },
  {
    slug: 'momies-bakery',
    kicker: { en: 'Campaign · Model · Momies Bakery', id: 'Kampanye · Model · Momies Bakery' },
    title: [{ en: 'Momies Bakery', id: 'Momies Bakery' }, { en: 'campaign lookbook.', id: 'lookbook kampanye.' }],
    summary: {
      en: 'From the concept briefing with the creative team to the lifestyle set at the bakery table — grouped by moment.',
      id: 'Dari briefing konsep bersama tim kreatif hingga set lifestyle di meja bakery — dikelompokkan per momen.',
    },
    cover: p('/images/model/momies-3.jpg', 'Lifestyle shoot for Momies Bakery', 'Sesi foto lifestyle Momies Bakery', '50% 35%'),
    gallery: [],
    looks: [
      {
        title: { en: 'The briefing', id: 'Briefing' },
        note: { en: 'Concept meeting with the creative team', id: 'Rapat konsep bersama tim kreatif' },
        photos: [
          p('/images/model/momies-1.jpg', 'Concept briefing with the creative team', 'Briefing konsep bersama tim kreatif'),
          p('/images/model/momies-2.jpg', 'Going through the shot list', 'Membahas daftar foto'),
        ],
      },
      {
        title: { en: 'At the table', id: 'Di meja' },
        note: { en: 'Lifestyle set with the bakes', id: 'Set lifestyle bersama kue' },
        photos: [
          p('/images/model/momies-3.jpg', 'Presenting the bakes', 'Menampilkan kue', '50% 35%'),
          p('/images/model/momies-4.jpg', 'Tasting at the bakery table', 'Mencicipi di meja bakery'),
        ],
      },
    ],
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
    { photo: p('/images/certificates/bnsp-page-1.jpg', 'BNSP certificate — Skilled Instructor', 'Sertifikat BNSP — Instruktur Terampil'), title: { en: 'BNSP · Skilled Instructor', id: 'BNSP · Instruktur Terampil' }, logo: logos.bnsp as Logo | null, meta: { en: 'Nov 2024 · No. 74321.2351.3.0018224.2024', id: 'Nov 2024 · No. 74321.2351.3.0018224.2024' } },
    { photo: p('/images/certificates/bnsp-page-2.jpg', 'BNSP certificate — competency units', 'Sertifikat BNSP — unit kompetensi'), title: { en: 'BNSP · Competency units', id: 'BNSP · Unit kompetensi' }, logo: logos.bnsp as Logo | null, meta: { en: 'Page 2', id: 'Halaman 2' } },
    { photo: p('/images/certificates/makeup-training-upi.jpg', 'Makeup training certificate, UPI', 'Sertifikat pelatihan tata rias, UPI'), title: { en: 'Makeup training', id: 'Pelatihan tata rias' }, logo: logos.upi as Logo | null, meta: { en: 'Universitas Pendidikan Indonesia · Mar 2024', id: 'Universitas Pendidikan Indonesia · Mar 2024' } },
    { photo: p('/images/speaking/sman1-subang-3.jpg', 'Speaker certificate, SMAN 1 Subang', 'Piagam narasumber, SMAN 1 Subang'), title: { en: 'Speaker certificate', id: 'Piagam narasumber' }, logo: null as Logo | null, meta: { en: 'SMAN 1 Subang · Jun 2024', id: 'SMAN 1 Subang · Jun 2024' } },
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
