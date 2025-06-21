// Bug YouTube Skip Ads - Content Script
// v1.0 (Lógica Final e Logs Detalhados)

const CONFIG = {
  // ATENÇÃO: Logs de debug estão ativados para diagnóstico.
  DEBUG: true,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: 'yt-skip-ads-last-url' // Chave para o armazenamento da sessão
};

function log(message) {
  if (CONFIG.DEBUG) {
    console.log(`[Skip Ads v1.0] ${message}`);
  }
}

function removeDotFromUrl(url) {
    return url.replace(CONFIG.DOT_PATTERN, CONFIG.NORMAL_PATTERN);
}

async function processUrl() {
  const currentUrl = window.location.href;
  log(`Iniciando verificação na URL: ${currentUrl}`);

  // 1. Se a URL já termina com ponto, o trabalho está feito.
  if (currentUrl.endsWith('.')) {
    log("URL já termina com ponto. Nenhuma ação necessária.");
    return;
  }
  
  // 2. Se não for uma página de vídeo, ignora.
  // Usamos includes('watch?v=') que é o padrão de vídeos.
  if (!currentUrl.includes('watch?v=')) {
    log("Não é uma página de vídeo. Ignorando.");
    return;
  }

  // 3. Lógica de Prevenção de Loop
  const { [CONFIG.STORAGE_KEY]: lastUrl } = await chrome.storage.session.get(CONFIG.STORAGE_KEY);
  if (lastUrl === currentUrl) {
    log(`Loop detectado. A URL atual é a mesma que a última processada. Bloqueando.`);
    await chrome.storage.session.remove(CONFIG.STORAGE_KEY); // Limpa para a próxima navegação
    return;
  }

  // 4. Se todas as checagens passaram, fazemos o redirecionamento.
  log("Adicionando ponto na URL...");
  const newUrl = currentUrl + '.';
  
  // Armazena a URL que estamos PRESTES a visitar para evitar o loop.
  await chrome.storage.session.set({ [CONFIG.STORAGE_KEY]: currentUrl });
  
  log(`Redirecionando para a nova URL: ${newUrl}`);
  window.location.replace(newUrl);
}

// Observa a navegação interna do YouTube
document.addEventListener('yt-navigate-finish', () => {
  log("Navegação detectada ('yt-navigate-finish'). Verificando URL...");
  // Pequeno timeout para garantir que o DOM e a URL estejam 100% atualizados.
  setTimeout(processUrl, 100); 
});

// Executa no carregamento inicial da página
log("Script carregado. Verificação inicial.");
processUrl();