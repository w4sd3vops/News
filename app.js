document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'SUA_CHAVE_API_AQUI'; // Chave válida
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const API_URL = `${PROXY_URL}https://newsapi.org/v2/top-headlines?country=br&pageSize=10`;

    async function loadNews() {
        try {
            newsContainer.innerHTML = '<div class="loading">📡 Buscando últimas notícias...</div>';
            
            const response = await fetch(`${API_URL}&apiKey=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status !== "ok" || !data.articles) {
                throw new Error('Resposta inválida da API');
            }

            renderNews(data.articles);
            
        } catch (error) {
            console.error('Erro detalhado:', error);
            newsContainer.innerHTML = `
                <div class="error">
                    ❌ Erro ao carregar notícias: ${error.message}
                    <button onclick="location.reload()">Tentar novamente</button>
                </div>
            `;
        }
    }

    function renderNews(articles) {
        newsContainer.innerHTML = articles.map((article, index) => `
            <article class="news-card" role="article" aria-labelledby="news-title-${index}">
                ${article.urlToImage ? `
                    <img src="${article.urlToImage}" 
                         alt="${article.title}" 
                         class="news-image"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='./assets/fallback-image.jpg'"> 
                ` : ''}
                
                <div class="news-content">
                    <h2 id="news-title-${index}">${article.title}</h2>
                    <p class="news-description">${article.description || 'Descrição não disponível'}</p>
                    <div class="news-meta">
                        <span class="news-source">${article.source.name}</span>
                        <time datetime="${new Date(article.publishedAt).toISOString()}">
                            ${new Date(article.publishedAt).toLocaleDateString()}
                        </time>
                    </div>
                    <a href="${article.url}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="read-more"
                       aria-label="Ler notícia completa: ${article.title}">
                        Ler completo ↗
                    </a>
                </div>
            </article>
        `).join('');
    }

    // Restante do código do chatbot...
});
