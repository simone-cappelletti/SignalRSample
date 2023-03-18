﻿let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

//Create the connection
var connectionHouse = new signalR
    .HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/houseGroup")
    .build();

//Subscribe buttons eventlistener
btn_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Griffyndor");
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Slytherin");
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

//Unsubscribe buttons eventlistener
btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Griffyndor");
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

connectionHouse.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            case 'griffyndor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            default:
                break;
        }

        toastr.success(`You have subscribed Successfully to ${houseName}.`)
    }
    else {
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            case 'griffyndor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            default:
                break;
        }

        toastr.success(`You have unsubscribed Successfully to ${houseName}.`)
    }
});

function fulfilled() {
    console.log("Connection to House Group Hub Successful");
}

function rejected() {
    console.log("Connection to House Group Hub Rejected");
}

//Start connection
connectionHouse.start().then(fulfilled, rejected);