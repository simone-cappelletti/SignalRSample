//Create the connection
var connectionChat = new signalR
    .HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/chat")
    .withAutomaticReconnect([0, 1000, 5000, null])
    .build();

connectionChat.on("ReceiveUserConnected", function (userId, username) {
    addMessage(`${username} is online`);
})

function addMessage(msg) {
    if (msg == null && msg == '')
        return;

    let ui = document.getElementById('messagesList');
    let li = document.createElement("li");

    li.innerHTML = msg;
    ui.appendChild(li);
}

function fulfilled() {
    console.log("Connection to Chat Hub Successful");
}

function rejected() {
    console.log("Connection to Chat Hub Rejected");
}

//Start connection
connectionChat.start().then(fulfilled, rejected);