// Bug YouTube Skip Ads - Content Script
// Versão 1.3 - Otimizada para adicionar ponto no final da URL

// Configuração
const CONFIG = {
  DEBUG: false, // Mude para true para logs de debug
  STORAGE_KEY: "lastYoutubeVideoUrl"
};

// Verifica se é um vídeo do YouTube
function isYoutubeVideo(url) {
  return url.includes("watch?v=");
}

// Adiciona ponto ao final da URL, se não houver
function addDotToEndOfUrl(url) {
  return url.endsWith('.') ? url : url + '.';
}

// Remove ponto do final da URL, se houver
function removeDotFromEndOfUrl(url) {
  return url.endsWith('.') ? url.slice(0, -1) : url;
}

// Função principal
async function processYouTubeVideo() {
  const currentUrl = window.location.href;
  
  if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Processando URL: ${currentUrl}`);

  if (!isYoutubeVideo(currentUrl)) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Não é vídeo do YouTube, ignorando.`);
    return;
  }

  // Se a URL já termina com ponto, não faz nada
  if (currentUrl.endsWith('.')) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] URL já tem ponto no final, ignorando.`);
    return;
  }
  
  const urlWithoutDot = removeDotFromEndOfUrl(currentUrl);
  
  try {
    const result = await chrome.storage.local.get([CONFIG.STORAGE_KEY]);
    const lastUrl = result[CONFIG.STORAGE_KEY];
    
    // Se a URL (sem ponto) for a mesma da última navegação, evita loop
    if (urlWithoutDot === lastUrl) {
      if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Mesma URL do último redirect, ignorando para evitar loop.`);
      return;
    }

    const newUrl = addDotToEndOfUrl(currentUrl);
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Redirecionando para: ${newUrl}`);

    // Salva a URL (sem ponto) e redireciona
    await chrome.storage.local.set({ [CONFIG.STORAGE_KEY]: urlWithoutDot });
    window.location.replace(newUrl);

  } catch (error) {
    if (CONFIG.DEBUG) console.error(`[YouTube Skip Ads] Erro:`, error);
  }
}

// Executa a lógica
processYouTubeVideo();