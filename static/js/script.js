// script.js
document.getElementById("chatbot-button").onclick = async function() {
    const chatWindow = document.getElementById('chat-window');

    if (chatWindow.style.display === 'none') {
      const response = await fetch('/chatbot');

        if (response.ok) {
            const text = await response.text();
            chatWindow.innerHTML = text;
        } else {
            console.error('Không thể tải nội dung từ chatbot.html');
        }
    }

    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('send-button').onclick = async function() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('Bạn: ' + userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    appendMessage('Bot: ' + data.reply);
};

function appendMessage(message) {
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += '<div>' + message + '</div>';
}
//document.getElementById('chatbot-button').onclick = function() {
//    console.log("ChatBot button clicked!"); // Kiểm tra nếu sự kiện được kích hoạt
//};
