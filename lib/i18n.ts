export type Lang = 'en' | 'id';

/** A localized string. Every piece of copy on the site is one of these. */
export type L = Record<Lang, string>;

export const LANGS: Lang[] = ['en', 'id'];

/** Shared UI strings (navigation, buttons, footer). Page copy lives in lib/content.ts. */
export const ui = {
  nav: {
    home: { en: 'Home', id: 'Beranda' },
    about: { en: 'About', id: 'Tentang' },
    education: { en: 'Education & Certifications', id: 'Pendidikan & Sertifikasi' },
    experience: { en: 'Experience', id: 'Pengalaman' },
    makeup: { en: 'Makeup Artist', id: 'Makeup Artist' },
    skills: { en: 'Skills', id: 'Keahlian' },
    organization: { en: 'Organization', id: 'Organisasi' },
    speaking: { en: 'Speaking', id: 'Pembicara' },
    projects: { en: 'Projects', id: 'Proyek' },
    certificates: { en: 'Certificates', id: 'Sertifikat' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
  a11y: {
    mainNav: { en: 'Main navigation', id: 'Navigasi utama' },
    openMenu: { en: 'Open menu', id: 'Buka menu' },
    closeMenu: { en: 'Close menu', id: 'Tutup menu' },
    search: { en: 'Search pages', id: 'Cari halaman' },
    language: { en: 'Language', id: 'Bahasa' },
    close: { en: 'Close', id: 'Tutup' },
    prev: { en: 'Previous photo', id: 'Foto sebelumnya' },
    next: { en: 'Next photo', id: 'Foto berikutnya' },
    enlarge: { en: 'Enlarge photo', id: 'Perbesar foto' },
  },
  search: {
    placeholder: { en: 'Search a page…', id: 'Cari halaman…' },
    empty: { en: 'No page matches that.', id: 'Tidak ada halaman yang cocok.' },
  },
  footer: {
    eyebrow: { en: "Let's connect", id: 'Mari terhubung' },
    title1: { en: 'Open to operations', id: 'Terbuka untuk peran' },
    title2: { en: '& administrative roles.', id: 'operasional & administrasi.' },
    body: {
      en: 'Interested in my professional background and experience? Feel free to get in touch to discuss opportunities in operations and administration.',
      id: 'Tertarik dengan latar belakang dan pengalaman profesional saya? Silakan hubungi saya untuk mendiskusikan peluang di bidang operasional dan administrasi.',
    },
    cta: { en: 'Contact Me', id: 'Hubungi Saya' },
    cv: { en: 'Download CV', id: 'Unduh CV' },
    rights: { en: 'All rights reserved.', id: 'Hak cipta dilindungi.' },
  },
  common: {
    back: { en: 'Back', id: 'Kembali' },
    backTo: { en: 'Back to', id: 'Kembali ke' },
    viewDetails: { en: 'View details', id: 'Lihat detail' },
    photos: { en: 'photos', id: 'foto' },
    present: { en: 'Present', id: 'Sekarang' },
  },
} as const;
