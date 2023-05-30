const socket = new WebSocket('ws://10.87.230.121:8080/ws');

const chatlogs = document.querySelector('.chatlogs');
const messageInput = document.querySelector('#message');
const sendButton = document.querySelector('#send');

// 发送消息
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const chat = document.createElement('div');
        chat.classList.add('chat');
        chat.innerHTML = `
            <img src="img/robot.png" alt="机器人头像" class="avatar">
            <div class="message">
                <p>${message}</p>
            </div>
        `;
        chatlogs.appendChild(chat);
        chatlogs.scrollTop = chatlogs.scrollHeight;
        socket.send(message);
        messageInput.value = '';
    }
}

// 接收消息
socket.onmessage = function(event) {
    const message = event.data;
    const chat = document.createElement('div');
    chat.classList.add('chat');
    chat.innerHTML = `
        <img src="img/avatar.png" alt="头像" class="avatar">
        <div class="message">
            <p>${message}</p>
        </div>
    `;
    chatlogs.appendChild(chat);
    chatlogs.scrollTop = chatlogs.scrollHeight;
}

// 发送按钮点击事件
sendButton.addEventListener('click', sendMessage);

// 回车键发送消息
messageInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});
