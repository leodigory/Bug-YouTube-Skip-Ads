# 🚀 Bug YouTube Skip Ads

[![Version](https://img.shields.io/badge/version-1.1-blue.svg)](https://github.com/leodigory/Bug-YouTube-Skip-Ads)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)](https://chrome.google.com/webstore)

> **Uma extensão inovadora que aproveita um bug descoberto para pular anúncios no YouTube automaticamente**

<div align="center">
  <img src="icon.svg" alt="Bug YouTube Skip Ads Logo" width="128" height="128">
</div>

## 📖 Sobre o Projeto

Esta extensão foi desenvolvida baseada em uma descoberta pessoal de um bug no YouTube que permite pular anúncios adicionando um ponto (`.`) na URL. O bug foi documentado em 2020 pelo [Olhar Digital](https://olhardigital.com.br/2020/06/12/noticias/um-ponto-na-url-faz-com-que-youtube-seja-exibido-sem-anuncios/) e continua funcional até hoje.

### 🎯 Como Funciona

A extensão detecta automaticamente quando você acessa um vídeo do YouTube e adiciona um ponto na URL, transformando:
- `youtube.com/watch?v=VIDEO_ID` → `youtube.com./watch?v=VIDEO_ID`

Este simples truque faz com que o YouTube exiba o vídeo sem anúncios, como se você tivesse uma assinatura premium.

## ✨ Características

- 🔄 **Automático**: Funciona sem intervenção manual
- 🛡️ **Prevenção de Loop**: Evita redirecionamentos infinitos
- 📱 **Compatível**: Funciona em desktop e mobile (modo desktop)
- ⚡ **Leve**: Código otimizado e eficiente
- 🔒 **Seguro**: Não coleta dados pessoais
- 🎨 **Interface Limpa**: Sem popups ou notificações intrusivas

## 🛠️ Tecnologias Utilizadas

- **JavaScript ES6+**: Lógica principal da extensão
- **Chrome Extension Manifest V3**: API moderna do Chrome
- **SVG**: Ícone vetorial escalável
- **GitHub**: Versionamento e distribuição

## 📦 Instalação

### Método 1: Instalação Manual (Recomendado)

1. **Baixe os arquivos**
   ```bash
   git clone https://github.com/leodigory/Bug-YouTube-Skip-Ads.git
   cd Bug-YouTube-Skip-Ads
   ```

2. **Abra o Chrome**
   - Digite `chrome://extensions/` na barra de endereços
   - Ou vá em Menu → Mais ferramentas → Extensões

3. **Ative o Modo Desenvolvedor**
   - Clique no toggle "Modo do desenvolvedor" no canto superior direito

4. **Carregue a extensão**
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `Bug-YouTube-Skip-Ads`
   - Clique em "Selecionar pasta"

5. **Confirme a instalação**
   - A extensão aparecerá na lista com o ícone personalizado
   - O status deve mostrar "Ativado"

### Método 2: Download Direto

1. Baixe os arquivos `manifest.json` e `content.js` deste repositório
2. Crie uma nova pasta e coloque os arquivos dentro
3. Siga os passos 2-5 do Método 1

## 🎮 Como Usar

1. **Instale a extensão** seguindo os passos acima
2. **Acesse qualquer vídeo do YouTube**
3. **A extensão funcionará automaticamente**
4. **Aproveite os vídeos sem anúncios!**

### 📱 Uso no Mobile

Para usar no celular:
1. Abra o YouTube no navegador
2. Ative a "Versão para computador" nas configurações
3. A extensão funcionará normalmente

## 🔧 Estrutura do Projeto

```
Bug-YouTube-Skip-Ads/
├── manifest.json      # Configuração da extensão
├── content.js         # Script principal
├── icon.svg          # Ícone da extensão
├── LICENSE           # Licença MIT
├── INSTALACAO.md     # Guia de instalação detalhado
└── README.md         # Este arquivo
```

## 📋 Manifest.json

```json
{
  "manifest_version": 3,
  "name": "Bug YouTube Skip Ads @leodigory",
  "version": "1.1",
  "description": "Adiciona automaticamente um ponto aos URLs de vídeos do YouTube para pular anúncios",
  "permissions": ["activeTab", "scripting", "storage"],
  "host_permissions": ["*://*.youtube.com/*"],
  "content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["content.js"],
      "run_at": "document_start"
    }
  ]
}
```

## 🧠 Como o Código Funciona

### Detecção de Vídeos
```javascript
function isYoutubeVideo(url) {
  return url.includes("watch?v=");
}
```

### Prevenção de Loop
```javascript
const hasDot = currentUrl.includes(".com./watch");
const isDifferentVideo = currentUrlWithoutDot !== lastYoutubeVideoUrl;

if (!hasDot && isDifferentVideo) {
  // Adiciona o ponto e redireciona
  const newUrl = currentUrl.replace(".com/watch", ".com./watch");
  window.location.replace(newUrl);
}
```

### Armazenamento Local
```javascript
await chrome.storage.local.set({ lastYoutubeVideoUrl: currentUrlWithoutDot });
```

## 🚨 Limitações e Considerações

- ⚠️ **Bug do YouTube**: Esta extensão aproveita um bug que pode ser corrigido a qualquer momento
- 📺 **Apenas Anúncios de Vídeo**: Não afeta anúncios de banner ou overlay
- 🔄 **Redirecionamento**: Há um pequeno delay devido ao redirecionamento
- 📱 **Mobile**: Requer modo desktop no navegador mobile

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Olhar Digital**: Por documentar o bug original em 2020
- **Comunidade Reddit**: Por compartilhar e discutir o bug
- **Chrome Extension Community**: Por fornecer documentação e exemplos

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/leodigory/Bug-YouTube-Skip-Ads/issues)
- **Email**: [leodigory@github.com](mailto:leodigory@github.com)
- **Discord**: [Servidor do Projeto](https://discord.gg/example)

## 🔗 Links Úteis

- [Artigo Original - Olhar Digital](https://olhardigital.com.br/2020/06/12/noticias/um-ponto-na-url-faz-com-que-youtube-seja-exibido-sem-anuncios/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!</p>
  <p>Desenvolvido com ❤️ por <a href="https://github.com/leodigory">@leodigory</a></p>
</div>
