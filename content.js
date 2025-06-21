// Bug YouTube Skip Ads - Content Script
// v1.5 (Corrigida - Delays para Carregamento Completo)

const CONFIG = {
  // ATENÇÃO: Logs de debug estão ativados para diagnóstico.
  DEBUG: true,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: 'yt-skip-ads-last-processed-url', // Chave para o localStorage
  INITIAL_DELAY: 2000, // 2 segundos para carregamento inicial
  REDIRECT_DELAY: 1000, // 1 segundo antes do redirecionamento
  NAVIGATION_DELAY: 300, // 300ms após navegação
  MUTATION_DELAY: 500   // 500ms após mudança de URL
};

function log(message) {
  if (CONFIG.DEBUG) {
    // Adiciona um prefixo claro e um timestamp para cada log
    console.log(`[${new Date().toLocaleTimeString()}] Skip Ads: ${message}`);
  }
}

function removeDotFromUrl(url) {
    return url.replace(CONFIG.DOT_PATTERN, CONFIG.NORMAL_PATTERN);
}

function getUrlWithoutDot(url) {
  // Remove o ponto do final da URL se existir
  return url.endsWith('.') ? url.slice(0, -1) : url;
}

function isValidYouTubeVideoUrl(url) {
  log(`Verificando URL: "${url}"`);
  
  // Verifica se é uma URL do YouTube
  if (!url || !url.includes('youtube.com')) {
    log("URL não contém 'youtube.com'");
    return false;
  }
  
  // Lista de padrões válidos para páginas de vídeo
  const videoPatterns = [
    /youtube\.com\/watch\?v=/,
    /youtube\.com\/embed\//,
    /youtube\.com\/v\//,
    /youtu\.be\//,
    /youtube\.com\/shorts\//
  ];
  
  const isValid = videoPatterns.some(pattern => {
    const matches = pattern.test(url);
    if (matches) {
      log(`Padrão válido encontrado: ${pattern}`);
    }
    return matches;
  });
  
  if (!isValid) {
    log("Nenhum padrão de vídeo válido encontrado");
  }
  
  return isValid;
}

function runCheck() {
  const currentUrl = window.location.href;
  log(`Iniciando verificação... URL é: "${currentUrl}"`);

  // Verifica se é uma URL válida do YouTube
  if (!isValidYouTubeVideoUrl(currentUrl)) {
    log(`URL não é uma página de vídeo válida do YouTube. Padrões suportados: /watch?v=, /embed/, /v/, /shorts/, youtu.be`);
    log(`URL atual: ${currentUrl}`);
    return;
  }

  // 2. Se a URL já termina com ponto, o trabalho está feito.
  if (currentUrl.endsWith('.')) {
    log("URL já termina com ponto. Nenhuma ação necessária.");
    return;
  }

  // 3. Verifica se esta URL já foi processada anteriormente
  const lastProcessedUrl = localStorage.getItem(CONFIG.STORAGE_KEY);
  const urlWithoutDot = getUrlWithoutDot(currentUrl);
  
  if (lastProcessedUrl === urlWithoutDot) {
    log(`URL já foi processada anteriormente: "${urlWithoutDot}". Nenhuma ação necessária.`);
    return;
  }

  // 4. Se tudo passou, redireciona.
  const newUrl = currentUrl + '.';
  log(`Tudo certo! Adicionando ponto no final.`);
  
  // Armazena apenas a URL atual (sem ponto) como última processada
  localStorage.setItem(CONFIG.STORAGE_KEY, urlWithoutDot);
  
  log(`EXECUTANDO REDIRECIONAMENTO PARA: "${newUrl}"`);
  log(`Aguardando ${CONFIG.REDIRECT_DELAY}ms para garantir carregamento completo...`);
  
  // Aguarda o tempo configurado para garantir que a página carregou completamente
  setTimeout(() => {
    log(`Redirecionando agora para: "${newUrl}"`);
    window.location.href = newUrl;
  }, CONFIG.REDIRECT_DELAY);
}

// Ouve o evento de navegação do YouTube
document.addEventListener('yt-navigate-finish', () => {
  log(`Evento 'yt-navigate-finish' detectado. Acionando verificação em ${CONFIG.NAVIGATION_DELAY}ms.`);
  setTimeout(runCheck, CONFIG.NAVIGATION_DELAY); 
});

// Listener adicional para mudanças na URL (History API)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    log(`Mudança na URL detectada via MutationObserver. Acionando verificação em ${CONFIG.MUTATION_DELAY}ms.`);
    setTimeout(runCheck, CONFIG.MUTATION_DELAY);
  }
}).observe(document, {subtree: true, childList: true});

// Executa também no carregamento inicial da página
log(`Script carregado. Acionando verificação inicial em ${CONFIG.INITIAL_DELAY}ms.`);
setTimeout(runCheck, CONFIG.INITIAL_DELAY);