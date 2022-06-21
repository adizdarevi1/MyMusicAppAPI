namespace MyMusicAppAPI
{
    public class Song
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Url { get; set; }
        public float Rating { get; set; }
        public bool IsFavourite { get; set; }
        public string EnteredIntoApp { get; set; }
        public string LastEditedInApp { get; set; }
        public int CategoryId { get; set; }

    }
}
