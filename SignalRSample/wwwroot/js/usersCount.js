//Create the connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//Connect to methods that ahub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");

    newCountSpan.innerText = value.toString();
});

//Invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

//Start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection to User Hub Rejected");
}

connectionUserCount.start().then(fulfilled, rejected);