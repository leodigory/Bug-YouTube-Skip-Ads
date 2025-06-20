// Bug YouTube Skip Ads - Content Script
// v1.0 (Lógica Refinada)

const CONFIG = {
  DEBUG: false,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: "lastUrl"
};

function isYoutubeVideo(url) {
  return url.includes("watch?v=");
}

function addDotToUrl(url) {
  return url.replace(CONFIG.NORMAL_PATTERN, CONFIG.DOT_PATTERN);
}

function removeDotFromUrl(url) {
  return url.replace(CONFIG.DOT_PATTERN, CONFIG.NORMAL_PATTERN);
}

async function processUrlChange() {
  const currentUrl = window.location.href;
  if (CONFIG.DEBUG) console.log(`[Skip Ads] URL mudou para: ${currentUrl}`);

  if (!isYoutubeVideo(currentUrl) || currentUrl.includes(CONFIG.DOT_PATTERN)) {
    return;
  }

  const { [CONFIG.STORAGE_KEY]: lastUrl } = await chrome.storage.session.get(CONFIG.STORAGE_KEY);
  const urlWithoutDot = removeDotFromUrl(currentUrl);

  if (urlWithoutDot === lastUrl) {
    if (CONFIG.DEBUG) console.log(`[Skip Ads] Mesma URL da anterior, ignorando para evitar loop.`);
    await chrome.storage.session.remove(CONFIG.STORAGE_KEY); // Limpa para permitir a próxima visita
    return;
  }

  if (CONFIG.DEBUG) console.log(`[Skip Ads] Redirecionando...`);

  await chrome.storage.session.set({ [CONFIG.STORAGE_KEY]: urlWithoutDot });
  window.location.replace(addDotToUrl(currentUrl));
}

// Observa mudanças na navegação do YouTube (Single Page Application)
document.addEventListener('yt-navigate-finish', processUrlChange);

// Execução inicial no carregamento da página
processUrlChange();