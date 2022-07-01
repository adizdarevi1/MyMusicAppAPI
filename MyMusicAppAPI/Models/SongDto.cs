namespace MyMusicAppAPI.Models
{
    public class SongDto
    {
        public SongDto(int id, string name, string artist, float rating, bool isFavourite, string lastEditedInApp, string category)
        {
            Id = id;
            Name = name;
            Artist = artist;
            Rating = rating;
            IsFavourite = isFavourite;
            LastEditedInApp = lastEditedInApp;
            CategoryName = category;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public float Rating { get; set; }
        public bool IsFavourite { get; set; }
        public string LastEditedInApp { get; set; }
        public string CategoryName { get; set; }

    }
}
