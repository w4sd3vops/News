document.addEventListener('DOMContentLoaded', () => {
    // Configurações da API
    const API_KEY = '22f76f063e3246c1949244be84cbec34'; // Obtenha em https://newsapi.org/
    const NEWS_API = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`;

    // Elementos do DOM
    const newsContainer = document.getElementById('newsContainer');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');

    // Carregar Notícias
    async function loadNews() {
        try {
            newsContainer.innerHTML = '<div class="loading">Carregando notícias...</div>';
            const response = await fetch(NEWS_API);
            const data = await response.json();
            
            newsContainer.innerHTML = data.articles.map(article => `
                <article class="news-card">
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="news-image">` : ''}
                    <h2>${article.title}</h2>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank" rel="noopener" class="read-more">
                        Leia mais →
                    </a>
                </article>
            `).join('');
        } catch (error) {
            newsContainer.innerHTML = `<div class="error">Erro ao carregar notícias: ${error.message}</div>`;
        }
    }

    // Chatbot Logic
    function createChatMessage(content, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event Listeners
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    document.querySelector('.chatbot-close').addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    document.getElementById('sendMessage').addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            createChatMessage(message);
            // Simular resposta do bot
            setTimeout(() => {
                createChatMessage('Olá! Como posso ajudar você hoje?', true);
            }, 1000);
            userInput.value = '';
        }
    });

    // Inicialização
    loadNews();
    createChatMessage('Olá! Sou seu assistente virtual. Como posso ajudar?', true);

    // Acessibilidade do Teclado
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('sendMessage').click();
        }
    });
});