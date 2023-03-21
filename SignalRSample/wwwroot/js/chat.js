//Create the connection
var connectionChat = new signalR
    .HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/chat")
    .build();

document.getElementById("sendMessage").disabled = true;

document.getElementById("sendMessage").addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    var receiver = document.getElementById("receiverEmail").value;

    if (receiver.length > 0) {
        connectionChat.send("SendMessageToReceiver", sender, receiver, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else {
        connectionChat.send("SendMessageToAll", sender, message).catch(function (err) {
            return console.error(err.toString());
        });
    }

    event.preventDefault();
});

connectionChat.on("MessageReceived", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${user} - ${message}`;
});

function fulfilled() {
    document.getElementById("sendMessage").disabled = false;

    console.log("Connection to Chat Hub Successful");
}

function rejected() {
    console.log("Connection to Chat Hub Rejected");
}

//Start connection
connectionChat.start().then(fulfilled, rejected);