//Create the connection
var connectionUserCount = new signalR
    .HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
    .build();

//Connect to methods that ahub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");

    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newUsersSpan = document.getElementById("totalUsersCounter");

    newUsersSpan.innerText = value.toString();
});

//Invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "Simone").then((value) => console.log(value));
}

function fulfilled() {
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection to User Hub Rejected");
}

//Start connection
connectionUserCount.start().then(fulfilled, rejected);