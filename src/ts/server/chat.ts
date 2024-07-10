export function initializeChat(chatName: string, userId: string, userName: string): void {
    const messageForm = document.getElementById('chatInput') as HTMLFormElement;
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const messagesList = document.getElementById('messages') as HTMLUListElement;

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/messages/${chatName}`);
            const messages = await response.json();
            messagesList.innerHTML = '';
            messages.forEach((message: { posterName: string; content: string; timestamp: string; }) => {
                const messageElement = document.createElement('li');
                messageElement.textContent = `${message.posterName}: ${message.content} (${new Date(message.timestamp).toLocaleTimeString()})`;
                messagesList.appendChild(messageElement);
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    fetchMessages();

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const messageContent = messageInput.value;

        const messageData = {
            content: messageContent,
            posterName: userName,
            posterId: userId,
            chatName
        };

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                messageInput.value = '';
                fetchMessages();
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
}

// Exemple
// document.addEventListener('DOMContentLoaded', () => {
//     initializeChat('general', 'user1', 'User1');
// });
