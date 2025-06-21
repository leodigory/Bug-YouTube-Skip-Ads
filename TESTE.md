# Como Testar a Extensão Skip Ads

## Passos para Teste:

1. **Recarregue a extensão no Chrome:**
   - Vá para `chrome://extensions/`
   - Encontre a extensão "Bug YouTube Skip Ads"
   - Clique no botão de recarregar (ícone de refresh)

2. **Abra o Console do Navegador:**
   - Pressione F12 ou Ctrl+Shift+I
   - Vá para a aba "Console"

3. **Navegue para um vídeo do YouTube:**
   - Vá para `https://www.youtube.com`
   - Clique em qualquer vídeo
   - Observe os logs no console

## O que você deve ver nos logs:

### Se a extensão estiver funcionando corretamente:
```
[HH:MM:SS] Skip Ads: Script carregado. Acionando verificação inicial.
[HH:MM:SS] Skip Ads: Iniciando verificação... URL é: "https://www.youtube.com/watch?v=VIDEO_ID"
[HH:MM:SS] Skip Ads: Verificando URL: "https://www.youtube.com/watch?v=VIDEO_ID"
[HH:MM:SS] Skip Ads: Padrão válido encontrado: /youtube\.com\/watch\?v=/
[HH:MM:SS] Skip Ads: Tudo certo! Adicionando ponto no final.
[HH:MM:SS] Skip Ads: EXECUTANDO REDIRECIONAMENTO PARA: "https://www.youtube.com/watch?v=VIDEO_ID."
[HH:MM:SS] Skip Ads: Redirecionando agora para: "https://www.youtube.com/watch?v=VIDEO_ID."
```

### Se não for uma página de vídeo:
```
[HH:MM:SS] Skip Ads: Verificando URL: "https://accounts.youtube.com/..."
[HH:MM:SS] Skip Ads: Nenhum padrão de vídeo válido encontrado
[HH:MM:SS] Skip Ads: URL não é uma página de vídeo válida do YouTube.
```

### Se a URL já termina com ponto:
```
[HH:MM:SS] Skip Ads: URL já termina com ponto. Nenhuma ação.
```

## URLs Válidas Suportadas:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

## Problemas Comuns e Soluções:

### 1. **Erro de Storage (Versão 1.2 e anteriores):**
```
Uncaught (in promise) Error: Access to storage is not allowed from this context.
```
**Solução:** Atualize para a versão 1.3 que usa localStorage em vez de chrome.storage

### 2. **Extensão não aparece nos logs:**
- Verifique se a extensão está ativada
- Recarregue a extensão
- Verifique se está na página correta do YouTube

### 3. **URL não é detectada como válida:**
- Certifique-se de estar em uma página de vídeo
- Verifique se a URL segue um dos padrões suportados

### 4. **Redirecionamento não acontece:**
- Verifique se a URL já não termina com ponto
- Verifique se não há loop de redirecionamento
- Aguarde o tempo de carregamento (500ms)

## Teste Específico:

Para testar com o vídeo específico que você mencionou:
1. Vá para: `https://www.youtube.com/watch?v=bxmEXYdj7Ro`
2. Abra o console (F12)
3. Observe os logs
4. A extensão deve redirecionar para: `https://www.youtube.com/watch?v=bxmEXYdj7Ro.`

## Verificação de Funcionamento:

Após o redirecionamento, você deve ver:
1. A URL no navegador termina com ponto (.)
2. O vídeo carrega normalmente
3. Não há anúncios antes do vídeo
4. Os logs mostram o processo completo 