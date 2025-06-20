// Bug YouTube Skip Ads - Content Script
// v1.0 (Lógica Robusta)

const CONFIG = {
  // ATENÇÃO: Logs de debug estão ativados para ajudar a resolver o problema.
  DEBUG: true,
  DOT_PATTERN: ".com./watch",
  NORMAL_PATTERN: ".com/watch"
};

const DottedUrlCache = {
    url: null,
    timestamp: null,
    // Cache de 5 segundos para evitar loops em casos de navegação rápida
    isValid: function(url) {
        return this.url === url && (Date.now() - this.timestamp < 5000);
    },
    set: function(url) {
        this.url = url;
        this.timestamp = Date.now();
    }
};

function log(message) {
    if (CONFIG.DEBUG) {
        console.log(`[Skip Ads v1.0] ${message}`);
    }
}

function redirectToDottedUrl() {
    const currentUrl = window.location.href;
    log(`Verificando URL: ${currentUrl}`);

    // 1. Se não for uma página de vídeo (não contém o padrão normal), ignora
    if (!currentUrl.includes(CONFIG.NORMAL_PATTERN)) {
        log("Não é uma página de vídeo. Ignorando.");
        return;
    }

    // 2. Se já tiver o ponto, ignora (prevenção de loop principal)
    if (currentUrl.includes(CONFIG.DOT_PATTERN)) {
        log("URL já contém o ponto. Ignorando.");
        DottedUrlCache.set(currentUrl);
        return;
    }

    // 3. Prevenção de loop para navegação rápida (ex: botão "voltar")
    const dottedVersion = currentUrl.replace(CONFIG.NORMAL_PATTERN, CONFIG.DOT_PATTERN);
    if (DottedUrlCache.isValid(dottedVersion)) {
        log(`URL com ponto está no cache recente. Ignorando para evitar loop reverso.`);
        return;
    }

    // 4. Se todas as checagens passaram, redireciona
    log(`Redirecionando para: ${dottedVersion}`);
    window.location.replace(dottedVersion);
}

// Observador para a navegação SPA do YouTube
document.addEventListener('yt-navigate-finish', () => {
    log("'yt-navigate-finish' detectado. Executando verificação.");
    setTimeout(redirectToDottedUrl, 100); // Timeout para garantir que a URL do DOM foi atualizada
});

// Execução inicial no carregamento da página
log("Script carregado. Executando verificação inicial.");
redirectToDottedUrl();