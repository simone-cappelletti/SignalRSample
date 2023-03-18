using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        //These two overrides are gonna track the total active connection
        //in terms of users connected counter
        public override Task OnConnectedAsync()
        {
            TotalUsers++;

            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;

            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();

            return base.OnDisconnectedAsync(exception);
        }

        //This is gonna track the total views of the page
        //incrementing the value of the total views for each new view.
        public async Task<string> NewWindowLoaded(string name)
        {
            TotalViews++;

            await Clients.All.SendAsync("updateTotalViews", TotalViews);

            return $"Hi from {name} - Total Views: {TotalViews}";
        }
    }
}
