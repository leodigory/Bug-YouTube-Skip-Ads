// Bug YouTube Skip Ads - Content Script
// Versão otimizada para melhor performance

// Configuração
const CONFIG = {
  DEBUG: false, // Set to true for debugging
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: "lastYoutubeVideoUrl"
};

// Função otimizada para verificar se é vídeo do YouTube
function isYoutubeVideo(url) {
  return url.includes("watch?v=");
}

// Função otimizada para adicionar ponto na URL
function addDotToUrl(url) {
  return url.replace(CONFIG.NORMAL_PATTERN, CONFIG.DOT_PATTERN);
}

// Função otimizada para remover ponto da URL
function removeDotFromUrl(url) {
  return url.replace(CONFIG.DOT_PATTERN, CONFIG.NORMAL_PATTERN);
}

// Função principal otimizada
async function processYouTubeVideo() {
  const currentUrl = window.location.href;
  
  if (CONFIG.DEBUG) {
    console.log(`[YouTube Skip Ads] Processando URL: ${currentUrl}`);
  }

  // Verificação rápida se é vídeo
  if (!isYoutubeVideo(currentUrl)) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Não é vídeo do YouTube`);
    return;
  }

  // Verificação se já tem o ponto
  const hasDot = currentUrl.includes(CONFIG.DOT_PATTERN);
  if (hasDot) {
    if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] URL já tem ponto, ignorando`);
    return;
  }

  // Obter URL sem ponto para comparação
  const currentUrlWithoutDot = removeDotFromUrl(currentUrl);
  
  try {
    // Obter última URL armazenada (otimizado para buscar apenas a chave necessária)
    const result = await chrome.storage.local.get([CONFIG.STORAGE_KEY]);
    const lastYoutubeVideoUrl = result[CONFIG.STORAGE_KEY];
    
    // Verificar se é vídeo diferente
    if (currentUrlWithoutDot === lastYoutubeVideoUrl) {
      if (CONFIG.DEBUG) console.log(`[YouTube Skip Ads] Mesmo vídeo, ignorando`);
      return;
    }

    if (CONFIG.DEBUG) {
      console.log(`[YouTube Skip Ads] Redirecionando para: ${addDotToUrl(currentUrl)}`);
    }

    // Armazenar nova URL e redirecionar (operações paralelas)
    await Promise.all([
      chrome.storage.local.set({ [CONFIG.STORAGE_KEY]: currentUrlWithoutDot }),
      new Promise(() => {
        window.location.replace(addDotToUrl(currentUrl));
      })
    ]);

  } catch (error) {
    if (CONFIG.DEBUG) {
      console.error(`[YouTube Skip Ads] Erro:`, error);
    }
  }
}

// Executar apenas uma vez quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processYouTubeVideo);
} else {
  processYouTubeVideo();
}