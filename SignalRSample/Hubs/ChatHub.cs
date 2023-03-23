using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Data;
using System.Security.Claims;

namespace SignalRSample.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _db;

        public ChatHub(ApplicationDbContext db)
        {
            _db = db;
        }

        public override Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(!string.IsNullOrWhiteSpace(userId))
            {
                var username = _db.Users.FirstOrDefault(u => u.Id == userId).UserName;

                Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceiveUserConnected", userId, username);

                HubConnections.AddUserConnection(userId, Context.ConnectionId);
            }

            return base.OnConnectedAsync();
        }

        //public async Task SendMessageToAll(string user, string message)
        //{
        //    await Clients.All.SendAsync("MessageReceived", user, message);
        //}

        //[Authorize]
        //public async Task SendMessageToReceiver(string sender, string receiver, string message)
        //{
        //    var userId = _db.Users.SingleOrDefault(user => user.Email.ToLower() == receiver.ToLower())?.Id;

        //    if(!string.IsNullOrWhiteSpace(userId))
        //    {
        //        await Clients.User(userId).SendAsync("MessageReceived", sender, message);
        //    }
        //}
    }
}
