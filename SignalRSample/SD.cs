namespace SignalRSample
{
    public static class SD
    {
        public const string Wand = "wand";
        public const string Stone = "stone";
        public const string Cloak = "cloak";

        public static Dictionary<string, int> DealtyHallowRace;

        static SD()
        {
            DealtyHallowRace = new Dictionary<string, int>();

            DealtyHallowRace.Add(Wand, 0);
            DealtyHallowRace.Add(Stone, 0);
            DealtyHallowRace.Add(Cloak, 0);
        }
    }
}
