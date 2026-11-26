import { STORAGE_KEYS } from './storage-keys';

/**
 * Inline script that runs before React hydrates, so the night theme never flashes light.
 * Order: saved choice → OS preference → light.
 */
export const noFlashScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${STORAGE_KEYS.theme}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;var l=localStorage.getItem('${STORAGE_KEYS.lang}');if(l==='id'||l==='en'){d.lang=l}}catch(e){}})();`;
