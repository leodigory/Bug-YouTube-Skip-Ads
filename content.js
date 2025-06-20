// Bug YouTube Skip Ads - Content Script
// Versão 1.3 - Lógica corrigida para adicionar ponto após o domínio

// Configuração
const CONFIG = {
  DEBUG: false, // Mude para true para logs de debug
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: "lastYoutubeVideoUrl"
};

// Verifica se é um vídeo do YouTube
function isYoutubeVideo(url) {
  return url.includes(CONFIG.NORMAL_PATTERN);
}

// Adiciona o ponto na URL
function addDotToUrl(url) {
  return url.replace(CONFIG.NORMAL_PATTERN, CONFIG.DOT_PATTERN);
}

// Remove o ponto da URL
function removeDotFromUrl(url) {
  return url.replace(CONFIG.DOT_PATTERN, CONFIG.NORMAL_PATTERN);
}

// Função principal
async function processYouTubeVideo() {
  const currentUrl = window.location.href;
  
  if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Processando URL: ${currentUrl}`);

  if (!isYoutubeVideo(currentUrl)) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Não é vídeo do YouTube, ignorando.`);
    return;
  }

  // Se a URL já tem o ponto, não faz nada
  if (currentUrl.includes(CONFIG.DOT_PATTERN)) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] URL já tem o padrão com ponto, ignorando.`);
    return;
  }
  
  const urlWithoutDot = removeDotFromUrl(currentUrl);
  
  try {
    const result = await chrome.storage.local.get([CONFIG.STORAGE_KEY]);
    const lastUrl = result[CONFIG.STORAGE_KEY];
    
    if (urlWithoutDot === lastUrl) {
      if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Mesma URL do último redirect, ignorando para evitar loop.`);
      return;
    }

    const newUrl = addDotToUrl(currentUrl);
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Redirecionando para: ${newUrl}`);

    await chrome.storage.local.set({ [CONFIG.STORAGE_KEY]: urlWithoutDot });
    window.location.replace(newUrl);

  } catch (error) {
    if (CONFIG.DEBUG) console.error(`[YouTube Skip Ads] Erro:`, error);
  }
}

// Executa a lógica
processYouTubeVideo();