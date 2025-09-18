// script.js

document.addEventListener("DOMContentLoaded", () => {
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

    // Usuários demo
    const users = {
        "manager@clinica.com": { role: "gerente", name: "Dr. Maria Silva" },
        "atendente@clinica.com": { role: "atendente", name: "Ana Santos" }
    };

    // Conversas fictícias
    const conversations = [
        { id: 1, name: "Carlos Pereira", status: "Esperando atendimento", messages: ["Bom dia, preciso reagendar minha consulta."] },
        { id: 2, name: "Fernanda Lima", status: "Em atendimento", messages: ["Oi, gostaria de informações sobre exames."] },
        { id: 3, name: "João Costa", status: "Consulta marcada", messages: ["Minha consulta é hoje às 15h, certo?"] }
    ];

    // LOGIN
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (users[email]) {
            const user = users[email];
            loginScreen.classList.add("hidden");

            if (user.role === "gerente") {
                managerDashboard.classList.remove("hidden");
                document.getElementById("managerName").innerText = user.name;
            } else {
                attendantDashboard.classList.remove("hidden");
                document.getElementById("userName").innerText = user.name;
                loadConversations();
            }
        } else {
            alert("Usuário não encontrado!");
        }
    });

    // LOGOUT
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
            div.innerHTML = `
                <strong>${conv.name}</strong>
                <p>${conv.status}</p>
            `;
            div.addEventListener("click", () => openConversation(conv));
            conversationList.appendChild(div);
        });
    }

    // ABRIR CONVERSA
    function openConversation(conv) {
        chatHeader.classList.remove("hidden");
        chatInput.classList.remove("hidden");
        patientName.innerText = conv.name;
        patientStatus.innerText = conv.status;

        chatMessages.innerHTML = "";
        conv.messages.forEach(msg => addMessage("paciente", msg));
    }

    // ENVIAR MENSAGEM
    sendBtn?.addEventListener("click", () => {
        const text = messageText.value.trim();
        if (text !== "") {
            addMessage("atendente", text);
            messageText.value = "";
        }
    });

    function addMessage(sender, text) {
        const div = document.createElement("div");
        div.classList.add("chat-message", sender);
        div.innerText = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // TABS DO GERENTE
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
