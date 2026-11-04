const startButton = document.getElementById("startButton");
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

startButton.addEventListener("click", function () {
    document.querySelector(".assistant").scrollIntoView({
        behavior: "smooth"
    });
    userInput.focus();
});

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    chatArea.appendChild(userMessage);

    userInput.value = "";

    const botMessage = document.createElement("div");
    botMessage.className = "bot-message loading";
    botMessage.textContent = "Жауап дайындалуда...";
    chatArea.appendChild(botMessage);

    chatArea.scrollTop = chatArea.scrollHeight;

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

       const data = await response.json();
botMessage.classList.remove("loading");
if (!response.ok) {
    botMessage.textContent = data.error || "Қате пайда болды.";
} else {
    botMessage.textContent = data.reply;

const speakButton = document.createElement("button");
speakButton.className = "speak-button";
speakButton.textContent = "🔊 Тыңдау";
speakButton.onclick = function () {
    speakText(speakButton);
};

botMessage.appendChild(speakButton);
}

    } catch (error) {
        botMessage.textContent =
            "Сервермен байланыс орнатылмады. Қайта көріңіз.";
    }

    chatArea.scrollTop = chatArea.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
function speakText(button) {
    const message = button.parentElement.innerText
        .replace("🔊 Тыңдау", "");

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "kk-KZ";
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
}
const largeTextButton = document.getElementById("largeTextButton");

largeTextButton.addEventListener("click", function () {
    document.body.classList.toggle("large-text");
});