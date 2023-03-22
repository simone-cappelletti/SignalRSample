var dataTable;
$(document).ready(function () {
    loadDataTable();
});

//Create the connection
var connectionOrder = new signalR
    .HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/order")
    .build();

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="w-75 btn-group" role="group">
                        <a href=""
                        class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> </a>
                      
					</div>
                        `
                },
                "width": "5%"
            }
        ]
    });
}

connectionOrder.on("newOrder", () => {
    dataTable.ajax.reload();

    toastr.succes("New order received.");
});

function fulfilled() {
    console.log("Connection to Notification Hub Successful");
}

function rejected() {
    console.log("Connection to Notification Hub Rejected");
}

//Start connection
connectionOrder.start().then(fulfilled, rejected);
