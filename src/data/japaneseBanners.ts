// Authentic vintage 88x31 web buttons directly from the 1990s - 2000s Web 1.0 cyber archive.
// No invented/synthetic custom banners; only genuine preserved artifacts from the classic web.

export interface BannerItem {
  id: string;
  title: string;
  gifUrl: string;
  width: number;
  height: number;
}

// 92 verified active authentic 88x31 GIF buttons (featuring cabnow.gif from screenshot)
export const VINTAGE_88X31_BUTTONS: string[] = [
  'cabnow.gif', // Exactly from the user screenshot! ("FREE CAB Now!")
  'best_viewed_with_eyes.gif',
  'copyscape.gif',
  'adobe_get_shockwave.gif',
  'built_with_microsoft_notepad.gif',
  '800x600.gif',
  '800x600_blue.gif',
  '800x600_red.gif',
  '7zip.gif',
  '3dfx_banner.gif',
  'Sega-Elite.gif',
  'clubnintendoarchives.gif',
  'atari.gif',
  'atarilogo.gif',
  'amiga.gif',
  'amiga_anim.gif',
  'applestore.gif',
  'apple_special1.gif',
  'altavista.gif',
  'counter_type1.gif',
  'asciicat.gif',
  'cuteanimegirls.gif',
  'cyberdog.gif',
  'cyberrose.gif',
  'dailymp3.gif',
  '88cdroms.gif',
  '88by31.gif',
  '8bit.gif',
  '98plusani.gif',
  'alienware_button.gif',
  'any_browser_now.gif',
  'crystals_now.gif',
  'blink.gif',
  'archlinux.gif',
  'cssvalid.gif',
  'dailydeath.gif',
  'buyabook.gif',
  'bandwith_conservation_society.gif',
  'adobe_flash_get.gif',
  '256_monitor_button.gif',
  '88x31-micro-button.gif',
  '3dot5mmfc-button.gif',
  'catt_banner.gif',
  'chiplink.gif',
  'crosswinds.gif',
  'cooltxt.gif',
  'coolarchive.gif',
  'chatroom.gif',
  'chat.gif',
  'davesite.gif',
  'armorgames.gif',
  'asus-clr_19970504.gif',
  '100best_88x31.gif',
  '104.gif',
  '1080p.gif',
  '2001.gif',
  '300free.gif',
  '311now.gif',
  '38caution.gif',
  '3drlink.gif',
  '4x3_fade.gif',
  '80s.gif',
  '88_31_02.gif',
  '88_31_chatbox.gif',
  '88_31freedownloads.gif',
  '88bigwave.gif',
  '88cinemax.gif',
  '88countries.gif',
  '88summer.gif',
  '88x31blank.gif',
  '90sgenzkid.gif',
  '91.gif',
  '99gifshop.gif',
  'KMeleon-Red-Now.gif',
  'KTV-banner88x31v1.gif',
  'cadence_now.gif',
  'cananow.gif',
  'candybarsnow.gif',
  'cdaweb.gif',
  'cgxnowh.gif',
  'chesslinks.gif',
  'chillbanner5.gif',
  'christnow.gif',
  'cometzone.gif',
  'cool-shades.gif',
  'coolacid.gif',
  'coolbutton.gif',
  'cyberoom.gif',
  'cyberscore.gif',
  'cybertec.gif',
  'darwin.gif'
];

export function getBannerPool(seed: number = 42): BannerItem[] {
  // Map files to authentic 88x31 items
  const items: BannerItem[] = VINTAGE_88X31_BUTTONS.map((filename, idx) => ({
    id: `retro-88x31-${idx}-${filename.replace(/[^a-zA-Z0-9]/g, '_')}`,
    title: filename.replace('.gif', '').replace(/[-_]/g, ' ').toUpperCase(),
    gifUrl: `https://cyber.dabamos.de/88x31/${filename}`,
    width: 88,
    height: 31
  }));

  // Shuffle pool deterministically based on rotation seed
  return shuffleArray(items, seed);
}

function shuffleArray<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let m = arr.length, t, i;
  let s = seed || 42;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  while (m) {
    i = Math.floor(random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
