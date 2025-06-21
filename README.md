# 🚀 Bug YouTube Skip Ads

[![Version](https://img.shields.io/badge/version-1.3-blue.svg)](https://github.com/leodigory/Bug-YouTube-Skip-Ads)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)](https://chrome.google.com/webstore)

<div align="center">
  <img src="icon.png" alt="Bug YouTube Skip Ads Logo" width="128" height="128">
  <h1 align="center">Bug YouTube Skip Ads</h1>
  <p align="center">
    <strong>Uma extensão que automatiza um bug para pular anúncios no YouTube de forma simples e eficaz.</strong>
  </p>
  <p align="center">
    <img alt="Versão" src="https://img.shields.io/badge/version-1.0-blue?style=for-the-badge">
    <img alt="Licença" src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge">
    <img alt="Plataforma" src="https://img.shields.io/badge/platform-Chrome%20%7C%20Edge-yellow?style=for-the-badge">
  </p>
</div>

---

## 📖 A História por Trás do Bug

Esta extensão não é apenas um código, é a automação de uma descoberta pessoal. **Eu descobri este bug de forma independente por volta de 2018**, muito antes de se tornar notícia. Ao notar que adicionar um simples ponto (`.`) ao final da URL de um vídeo do YouTube pulava toda a publicidade, comecei a usá-lo manualmente.

Em 2020, o site [Olhar Digital](https://olhardigital.com.br/2020/06/12/noticias/um-ponto-na-url-faz-com-que-youtube-seja-exibido-sem-anuncios/) e outras comunidades, como o Reddit, noticiaram o mesmo truque. Vendo que a falha persistia e que poderia ajudar mais pessoas, decidi criar esta extensão para automatizar o processo, tornando-o acessível a todos com um único clique.

## ✨ Como a Mágica Acontece

A lógica é simples, mas poderosa. A extensão monitora sua navegação no YouTube e, ao identificar um vídeo, executa o seguinte fluxo de forma automática e inteligente:

<div align="center">
  <img src="https://mermaid.ink/svg/pako:eNqNVMtqwzAQ_Jd8iimS_wAFHhQhDYW2uNSHHlY_KCu2k5gdyU4S6r_vJGEnFwYvc8878x5Z0wI6EaJ5V4J0JigWnFpI14Uj5XFezjBq6R6FkG6Q_xZJ82d2n8zWn-UqV4R5CqU7w6I-51J95sF6m2992-U9oB5o7zU7B2K9G6iYc2pQzMvKz9Jc16i_iSg4-Kk1h231rXm-2K8nSj2-b34XpX0B_QfB-wVgr74hB6qB5p4i3p5H7H2f2T3E4jG2cI7Z-xXkG2x2vL0n0V20uL27b_1rFm_8S8g49dI-lO2cI3b_A3QW6B-WjTz7r2-E0g4-dE3t-BwR2iYd2oQ3vE0g2-E4g2-E2gY2jZ5S0bB3s_I3J5r-wVgpwJ-tB2y9g_FvUa8w" alt="Diagrama de Funcionamento da Extensão">
</div>

### Principais Características
- 🔄 **100% Automático**: Sem cliques ou qualquer intervenção manual.
- 🧠 **Prevenção de Loop**: Usa `localStorage` para "lembrar" o último vídeo e evitar recarregamentos infinitos.
- ⚡ **Leve e Rápido**: Otimizado para não impactar a performance do seu navegador.
- 🛡️ **Seguro e Privado**: Não coleta ou armazena nenhum dado pessoal.
- 🎯 **Compatibilidade Ampla**: Funciona com múltiplos formatos de URL do YouTube (vídeos, shorts, embeds).
- ⏱️ **Timing Inteligente**: Aguarda o momento certo para agir, garantindo que a página esteja carregada.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as tecnologias essenciais da web, mantendo-o simples e eficiente.

<p align="center">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img alt="Manifest V3" src="https://img.shields.io/badge/Manifest%20V3-Google%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white">
</p>

## 📦 Instalação

Siga os passos abaixo para ter a extensão funcionando em menos de um minuto.

1.  **Baixe os Arquivos**: Faça o download do código-fonte, clicando em `Code` > `Download ZIP`, ou clone o repositório.
    ```bash
    git clone https://github.com/leodigory/Bug-YouTube-Skip-Ads.git
    ```
2.  **Acesse as Extensões**: Abra seu navegador (Chrome, Edge, etc.) e vá para a página de gerenciamento de extensões.
    -   **Chrome**: `chrome://extensions/`
    -   **Edge**: `edge://extensions/`
3.  **Ative o Modo Desenvolvedor**: Procure por um interruptor chamado "Modo do desenvolvedor" ou "Developer mode" e ative-o.
4.  **Carregue a Extensão**:
    -   Clique no botão "Carregar sem compactação" ou "Load unpacked".
    -   Selecione a pasta onde você salvou os arquivos do projeto.
5.  **Pronto!** A extensão aparecerá na sua lista e já estará ativa e funcionando.

## 🎮 Como Usar

É simples:
1. Instale a extensão.
2. Acesse qualquer vídeo no YouTube.
3. **É isso.** A extensão faz todo o trabalho sozinha. Assista seus vídeos sem interrupções!

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>⭐ Se esta extensão te ajudou, considere dar uma estrela no repositório! ⭐</p>
  <p>Desenvolvido com ❤️ por <a href="https://github.com/leodigory">@leodigory</a></p>
</div>
