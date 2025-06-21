// Bug YouTube Skip Ads - Content Script
// v1.0 (Correção de Loop de Redirecionamento)

const CONFIG = {
  // ATENÇÃO: Logs de debug estão ativados para diagnóstico.
  DEBUG: true,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch",
  STORAGE_KEY: 'yt-skip-ads-target' // Chave para o armazenamento da sessão
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
  log(`Iniciando verificação. URL: ${currentUrl}`);

  // Se a URL já tem o ponto, o trabalho está feito.
  if (currentUrl.includes(CONFIG.DOT_PATTERN)) {
    log("URL já tem o ponto. Nenhuma ação necessária.");
    return;
  }

  // Se não for uma página de vídeo, não faz nada.
  if (!currentUrl.includes(CONFIG.NORMAL_PATTERN)) {
    log("Não é uma página de vídeo. Nenhuma ação necessária.");
    return;
  }

  // --- Lógica de Prevenção de Loop ---
  // Verifica se acabamos de ser redirecionados de volta pelo YouTube.
  const { [CONFIG.STORAGE_KEY]: targetUrl } = await chrome.storage.session.get(CONFIG.STORAGE_KEY);
  
  // Se o nosso "alvo" (URL com ponto) corresponde à URL atual (sem ponto), é um loop.
  if (targetUrl && removeDotFromUrl(targetUrl) === currentUrl) {
    log(`Loop de redirecionamento detectado. Bloqueando novo redirecionamento.`);
    // Limpa a chave para que a próxima navegação manual do usuário funcione.
    await chrome.storage.session.remove(CONFIG.STORAGE_KEY);
    return;
  }
  
  // --- Lógica de Redirecionamento ---
  const newUrl = currentUrl.replace(CONFIG.NORMAL_PATTERN, CONFIG.DOT_PATTERN);
  log(`Redirecionamento necessário. Alvo: ${newUrl}`);

  // Armazena nosso alvo ANTES de redirecionar.
  await chrome.storage.session.set({ [CONFIG.STORAGE_KEY]: newUrl });
  
  // Executa o redirecionamento.
  window.location.replace(newUrl);
}

// O YouTube usa navegação de SPA. Precisamos observar as mudanças.
document.addEventListener('yt-navigate-finish', () => {
    log("Evento 'yt-navigate-finish' detectado.");
    setTimeout(processUrl, 100); 
});

// Executa também no carregamento inicial da página.
log("Script injetado. Executando verificação inicial.");
processUrl();