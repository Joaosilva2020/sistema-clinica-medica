// script.js - Versão

document.addEventListener("DOMContentLoaded", () => {
    // Referências aos elementos da página (alguns não serão usados, mas mantidos)
    const loginForm = document.getElementById("loginForm");
    const loginScreen = document.getElementById("loginScreen");
    const attendantDashboard = document.getElementById("attendantDashboard");
    const managerDashboard = document.getElementById("managerDashboard");

    const logoutBtn = document.getElementById("logoutBtn");
    const managerLogoutBtn = document.getElementById("managerLogoutBtn");

    const conversationList = document.getElementById("conversationList");
    const chatHeader = document.getElementById("chatHeader");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const patientName = document.getElementById("patientName");
    const patientStatus = document.getElementById("patientStatus");
    const sendBtn = document.getElementById("sendBtn");
    const messageText = document.getElementById("messageText");

    // Usuários demo (mantido apenas como referência)
    const users = {
        "manager@clinica.com": { role: "gerente", name: "Dr. Maria Silva" },
        "atendente@clinica.com": { role: "atendente", name: "Ana Santos" },
        "teste@clinica.com": { role: "atendente", name: "Usuário Teste" }
    };

    // Conversas fictícias
    const conversations = [
        { id: 1, name: "Carlos Pereira", status: "Esperando atendimento", messages: ["Bom dia, preciso reagendar minha consulta."] },
        { id: 2, name: "Fernanda Lima", status: "Em atendimento", messages: ["Oi, gostaria de informações sobre exames."] },
        { id: 3, name: "João Costa", status: "Consulta marcada", messages: ["Minha consulta é hoje às 15h, certo?"] }
    ];

    // Variável para rastrear a conversa ativa
    let activeConversation = null;

    // Ações de LOGIN e Inicialização: IGNORAR LOGIN e CARREGAR DASHBOARD DO ATENDENTE
    // O bloco de loginForm.addEventListener("submit", ...) foi removido
    // e substituído por uma inicialização direta.

    // --- FUNÇÃO DE INICIALIZAÇÃO AUTOMÁTICA ---
    function initializeAttendantDashboard() {
        // 1. Oculta a tela de login
        loginScreen.classList.add("hidden");

        // 2. Exibe o dashboard do atendente
        attendantDashboard.classList.remove("hidden");

        // 3. Define um nome de usuário padrão para visualização
        document.getElementById("userName").innerText = users["teste@clinica.com"].name;

        // 4. Carrega a lista de conversas
        loadConversations();

        // 5. Abre a primeira conversa automaticamente para interatividade imediata
        if (conversations.length > 0) {
            openConversation(conversations[0]);
        }
    }

    // Chamada imediata para iniciar o dashboard
    initializeAttendantDashboard();
    // ------------------------------------------

    // LOGOUT (mantido, mas agora levará de volta ao loginScreen, que estará vazio)
    logoutBtn?.addEventListener("click", () => {
        attendantDashboard.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    });

    managerLogoutBtn?.addEventListener("click", () => {
        managerDashboard.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    });

    // LISTA DE CONVERSAS
    function loadConversations() {
        conversationList.innerHTML = "";
        conversations.forEach(conv => {
            const div = document.createElement("div");
            div.classList.add("conversation-item");

            // Marca a conversa ativa
            if (activeConversation && activeConversation.id === conv.id) {
                div.classList.add("active");
            }
            div.innerHTML = `
                <strong>${conv.name}</strong>
                <p>${conv.status}</p>
            `;
            div.addEventListener("click", () => {
                // Alterna a classe 'active'
                document.querySelectorAll(".conversation-item").forEach(item => item.classList.remove("active"));
                div.classList.add("active");
                openConversation(conv)
            });
            conversationList.appendChild(div);
        });
    }

    // ABRIR CONVERSA
    function openConversation(conv) {
        activeConversation = conv;
        chatHeader.classList.remove("hidden");
        chatInput.classList.remove("hidden");
        patientName.innerText = conv.name;
        patientStatus.innerText = conv.status;

        chatMessages.innerHTML = "";
        conv.messages.forEach(msg => addMessage("paciente", msg));
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para o final
        loadConversations(); // Recarrega para atualizar o estado 'active'
    }

    // ENVIAR MENSAGEM
    sendBtn?.addEventListener("click", () => {
        const text = messageText.value.trim();
        if (text !== "") {
            addMessage("atendente", text);
            // Salva a mensagem na conversa ativa para persistir visualmente
            if (activeConversation) {
                activeConversation.messages.push(text);
            }
            messageText.value = "";
        }
    });

    // Permite enviar mensagem pressionando Enter
    messageText?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

    function addMessage(sender, text) {
        const div = document.createElement("div");
        div.classList.add("chat-message", sender);
        div.innerText = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // TABS DO GERENTE (mantido para funcionalidade de tabs, mesmo que o painel não seja o padrão)
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(panel => panel.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab + "Tab").classList.add("active");
        });
    });
});
