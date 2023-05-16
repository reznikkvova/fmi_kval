let tg = {
    token: "6256601842:AAHQltBgZxfoRhw4-XNFKLubhwPI0fPg8Pg",
    chat_id: "772020446"
}

export default function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request
    const obj = {
        chat_id: tg.chat_id, // Telegram chat id
        text: text // The text to send
    };

    const xht = new XMLHttpRequest();
    xht.open("POST", url, true);
    xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xht.send(JSON.stringify(obj));
}