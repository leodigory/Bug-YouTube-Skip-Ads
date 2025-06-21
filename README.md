# 🚀 Bug YouTube Skip Ads

[![Version](https://img.shields.io/badge/version-1.3-blue.svg)](https://github.com/leodigory/Bug-YouTube-Skip-Ads)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)](https://chrome.google.com/webstore)

<div align="center">
  <img src="icon.png" alt="Bug YouTube Skip Ads Logo" width="128" height="128">
  <h1 align="center">Bug YouTube™ Skip Ads</h1>
  <p align="center">
    <strong>Uma extensão que automatiza um bug para pular anúncios no YouTube de forma simples e eficaz.</strong>
    <br />
    <em>Um projeto que transforma uma descoberta casual de 2015 em uma ferramenta poderosa.</em>
  </p>
  <p align="center">
    <img alt="Versão" src="https://img.shields.io/badge/version-1.0-blue?style=for-the-badge">
    <img alt="Licença" src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge">
    <img alt="Plataforma" src="https://img.shields.io/badge/platform-Chrome%20%7C%20Edge-yellow?style=for-the-badge">
  </p>
</div>

---

## 🚀 A Gênese de uma Descoberta

A história desta extensão começa muito antes do código. **Por volta de 2015, por pura curiosidade e experimentação, descobri um comportamento peculiar no YouTube:** adicionar um simples ponto (`.`) ao final da URL de um vídeo parecia quebrar a lógica de carregamento de anúncios, pulando-os completamente.

Na época, presumi que fosse uma falha isolada, um truque que só funcionava para mim. Guardei a descoberta e a utilizei por anos. Qual não foi minha surpresa quando, em 2020, vi a notícia se espalhar por portais como o [Olhar Digital](https://olhardigital.com.br/2020/06/12/noticias/um-ponto-na-url-faz-com-que-youtube-seja-exibido-sem-anuncios/) e comunidades no Reddit. Aquele pequeno "hack" pessoal era, na verdade, um bug persistente na plataforma.

Essa validação pública foi o gatilho para transformar um truque manual em uma ferramenta automatizada. Este projeto nasceu da vontade de aplicar minhas habilidades de desenvolvimento para criar uma solução elegante para um problema que eu conhecia intimamente, tornando-a acessível a todos.

## ✨ Como a Mágica Acontece: O Fluxo de Trabalho

A extensão opera de forma inteligente e discreta em segundo plano. O objetivo é ser totalmente "instale e esqueça". O fluxograma abaixo ilustra o processo lógico que garante a eficácia e evita loops indesejados.

<div align="center">
  <img src="https://mermaid.ink/svg/pako:eNqNVMtqwzAQ_Jd8iimS_wAFHhQhDYW2uNSHHlY_KCu2k5gdyU4S6r_vJGEnFwYvc8878x5Z0wI6EaJ5V4J0JigWnFpI14Uj5XFezjBq6R6FkG6Q_xZJ82d2n8zWn-UqV4R5CqU7w6I-51J95sF6m2992-U9oB5o7zU7B2K9G6iYc2pQzMvKz9Jc16i_iSg4-Kk1h231rXm-2K8nSj2-b34XpX0B_QfB-wVgr74hB6qB5p4i3p5H7H2f2T3E4jG2cI7Z-xXkG2x2vL0n0V20uL27b_1rFm_8S8g49dI-lO2cI3b_A3QW6B-WjTz7r2-E0g4-dE3t-BwR2iYd2oQ3vE0g2-E4g2-E2gY2jZ5S0bB3s_I3J5r-wVgpwJ-tB2y9g_FvUa8w" alt="Diagrama de Funcionamento da Extensão">
</div>

### Destaques do Projeto (Habilidades em Ação)
- 🧠 **Prevenção de Loop Inteligente**: Usa `localStorage` para armazenar **apenas a última URL processada**, uma abordagem eficiente em memória que garante que cada vídeo seja modificado apenas uma vez por sessão.
- ⚡ **Performance Otimizada**: Código JavaScript leve e sem dependências, com delays estratégicos (`setTimeout`) para garantir que o script só rode após o carregamento dos elementos essenciais da página, evitando erros de timing.
- 🛡️ **Segurança e Privacidade**: A extensão opera inteiramente no lado do cliente, não coleta dados e solicita apenas as permissões mínimas necessárias para funcionar.
- 🎯 **Detecção Robusta**: Suporte a múltiplos formatos de URL do YouTube (`/watch`, `/embed`, `/shorts`), garantindo uma cobertura ampla.

## 🛠️ Tech Stack

<p align="center">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" title="JavaScript moderno usado para toda a lógica da extensão.">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" title="Estrutura base da web.">
  <img alt="Manifest V3" src="https://img.shields.io/badge/Manifest%20V3-Google%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" title="A mais recente e segura API para extensões do Chrome.">
</p>

## 📦 Instalação Rápida

Siga os passos abaixo para ter a extensão funcionando em menos de um minuto.

1.  **Baixe o Projeto**: Faça o download do código-fonte clicando em `Code` > `Download ZIP` no topo da página, ou clone o repositório.
    ```bash
    git clone https://github.com/leodigory/Bug-YouTube-Skip-Ads.git
    ```
2.  **Acesse a Página de Extensões**:
    -   No Chrome, digite `chrome://extensions/` na barra de endereço.
    -   No Edge, digite `edge://extensions/`.
3.  **Ative o Modo Desenvolvedor**: Procure e ative o interruptor "Modo do desenvolvedor" (geralmente no canto superior direito).
4.  **Carregue a Extensão**:
    -   Clique no botão "Carregar sem compactação" (ou "Load unpacked").
    -   Selecione a pasta onde você extraiu ou clonou os arquivos do projeto.
5.  **Pronto!** A extensão aparecerá na sua lista e já estará ativa, pronta para pular anúncios.

## 🎮 Como Usar

É simples:
1. Instale a extensão.
2. Acesse qualquer vídeo no YouTube.
3. **É isso.** A extensão faz todo o trabalho sozinha. Assista seus vídeos sem interrupções!

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>⭐ Achou este projeto útil? Considere dar uma estrela no repositório! ⭐</p>
  <p>Desenvolvido com ❤️ e curiosidade por <a href="https://github.com/leodigory">@leodigory</a></p>
</div>
