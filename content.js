// Este script é executado no contexto da página do YouTube

// Função para verificar se a URL é de um vídeo do YouTube
function isYoutubeVideo(url) {
  // Uma URL de vídeo do YouTube geralmente tem "watch?v="
  const isVideo = url.includes("watch?v=");
  console.log(`[YouTube Skip Ads] isYoutubeVideo(${url}): ${isVideo}`);
  return isVideo;
}

// Executa a lógica principal no início do carregamento da página
(async () => {
  const currentUrl = window.location.href;
  console.log(`[YouTube Skip Ads] Página carregada. URL atual: ${currentUrl}`);

  // 1. Armazenar a última URL geral acessada
  await chrome.storage.local.set({ lastVisitedUrl: currentUrl });
  console.log(`[YouTube Skip Ads] lastVisitedUrl armazenada: ${currentUrl}`);

  // 2. Verificar se a URL atual é um vídeo do YouTube
  if (isYoutubeVideo(currentUrl)) {
    console.log(`[YouTube Skip Ads] URL é um vídeo do YouTube.`);

    // 3. Obter a última URL de vídeo do YouTube armazenada
    const result = await chrome.storage.local.get(['lastYoutubeVideoUrl']);
    const lastYoutubeVideoUrl = result.lastYoutubeVideoUrl;
    console.log(`[YouTube Skip Ads] lastYoutubeVideoUrl do storage: ${lastYoutubeVideoUrl}`);

    // Remove o ponto temporariamente para comparação, se ele existir
    // ATENÇÃO: Esta linha é crítica. O '.com./watch' no replace precisa ser EXATO.
    // Se o ponto foi adicionado de outra forma, isso não vai remover.
    const currentUrlWithoutDot = currentUrl.replace(".com./watch", ".com/watch");
    console.log(`[YouTube Skip Ads] currentUrlWithoutDot (para comparação): ${currentUrlWithoutDot}`);

    // 4. Se a URL atual não tiver o ponto E não for a mesma que a última armazenada (sem o ponto)
    const hasDot = currentUrl.includes(".com./watch");
    const isDifferentVideo = currentUrlWithoutDot !== lastYoutubeVideoUrl;

    console.log(`[YouTube Skip Ads] Checando condições:`);
    console.log(`  - URL já tem o ponto (.com./watch)? ${hasDot}`);
    console.log(`  - URL sem ponto (${currentUrlWithoutDot}) é diferente da última armazenada (${lastYoutubeVideoUrl})? ${isDifferentVideo}`);


    if (!hasDot && isDifferentVideo) {
      console.log(`[YouTube Skip Ads] Condições atendidas: Redirecionando!`);

      // 5. Adicionar o ponto e redirecionar
      // O ponto é adicionado entre '.com' e '/watch'
      const newUrl = currentUrl.replace(".com/watch", ".com./watch");
      console.log(`[YouTube Skip Ads] Nova URL para redirecionar: ${newUrl}`);

      // 6. Armazenar a URL do vídeo do YouTube para futuras comparações (a original, sem o ponto)
      await chrome.storage.local.set({ lastYoutubeVideoUrl: currentUrlWithoutDot });
      console.log(`[YouTube Skip Ads] lastYoutubeVideoUrl (atualizada no storage): ${currentUrlWithoutDot}`);

      // Redireciona para a nova URL
      window.location.replace(newUrl);
    } else {
      console.log(`[YouTube Skip Ads] Condições NÃO atendidas. Não redirecionando.`);
    }
  } else {
    console.log(`[YouTube Skip Ads] URL NÃO é um vídeo do YouTube.`);
  }
})();