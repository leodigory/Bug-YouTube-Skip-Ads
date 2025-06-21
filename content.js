// Bug YouTube Skip Ads - Content Script
// v1.0 (Correção Final com Logs Detalhados)

const CONFIG = {
  // ATENÇÃO: Logs de debug estão ativados para diagnóstico.
  DEBUG: true,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: 'yt-skip-ads-last-url' // Chave para o armazenamento da sessão
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

async function runCheck() {
  const currentUrl = window.location.href;
  log(`Iniciando verificação... URL é: "${currentUrl}"`);

  if (!currentUrl || !currentUrl.startsWith("https://www.youtube.com/")) {
    log("URL inválida ou não é do YouTube. Abortando.");
    return;
  }

  // 1. Se não for uma página de vídeo, ignora.
  const isWatchPage = currentUrl.includes('watch?v=');
  const isEmbedPage = currentUrl.includes('/embed/');

  if (!isWatchPage && !isEmbedPage) {
    log("Não é uma página de vídeo ou embed. Nenhuma ação.");
    return;
  }
  
  // 2. Se a URL já termina com ponto, o trabalho está feito.
  if (currentUrl.endsWith('.')) {
    log("URL já termina com ponto. Nenhuma ação.");
    return;
  }

  // 3. Prevenção de Loop
  const { [CONFIG.STORAGE_KEY]: lastUrl } = await chrome.storage.session.get(CONFIG.STORAGE_KEY);
  if (lastUrl === currentUrl) {
    log(`Loop detectado. Bloqueando redirecionamento para a mesma URL: "${currentUrl}"`);
    // Limpa a chave para que a próxima navegação voluntária do usuário funcione
    await chrome.storage.session.remove(CONFIG.STORAGE_KEY);
    return;
  }

  // 4. Se tudo passou, redireciona.
  const newUrl = currentUrl + '.';
  log(`Tudo certo! Adicionando ponto no final.`);
  
  // Armazena a URL ATUAL para a verificação de loop na próxima página
  await chrome.storage.session.set({ [CONFIG.STORAGE_KEY]: currentUrl });
  
  log(`EXECUTANDO REDIRECIONAMENTO PARA: "${newUrl}"`);
  window.location.replace(newUrl);
}

// Ouve o evento de navegação do YouTube
document.addEventListener('yt-navigate-finish', () => {
  log("Evento 'yt-navigate-finish' detectado. Acionando verificação em 100ms.");
  setTimeout(runCheck, 100); 
});

// Executa também no carregamento inicial da página
log("Script carregado. Acionando verificação inicial.");
runCheck();