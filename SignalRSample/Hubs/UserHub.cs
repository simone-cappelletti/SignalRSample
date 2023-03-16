using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    //This hub is gonna track the total views of the page
    //incrementing the value of the total views for each new view 
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public async Task NewWindowLoaded()
        {
            //Update the counter
            TotalViews++;

            //Notify to ALL clients the new TotalViews value
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    }
}
