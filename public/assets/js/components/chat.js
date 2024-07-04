"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatDisplay');
    const messageInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('chatSubmit');
    const chatRoomId = 'chatRoom'; // Id de la salle de chat, à ajuster selon votre logique
    // Fonction pour charger les messages
    async function loadMessages() {
        const response = await fetch(`/api/messages/${chatRoomId}`);
        const messages = await response.json();
        chatMessages.innerHTML = messages.map((msg) => `<p><strong>${msg.author}:</strong> ${msg.text}</p>`).join('');
    }
    // Charger les messages au démarrage
    loadMessages();
    // Envoyer un nouveau message
    sendMessageButton.addEventListener('click', async () => {
        const text = messageInput.value;
        const author = 'Anonymous'; // Remplacez par l'auteur actuel
        const response = await fetch('/api/messages/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, author, chatRoomId }),
        });
        if (response.ok) {
            messageInput.value = '';
            loadMessages();
        }
        else {
            alert('Erreur lors de l\'envoi du message');
        }
    });
});
