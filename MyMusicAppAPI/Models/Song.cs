using System.ComponentModel.DataAnnotations;

namespace MyMusicAppAPI.Models
{
    public class Song
    {
        public Song(string name, string artist, string url, float rating, bool isFavourite, string enteredIntoApp, string lastEditedInApp, int categoryId, int userId)
        {
            Name = name;
            Artist = artist;
            Url = url;
            Rating = rating;
            IsFavourite = isFavourite;
            EnteredIntoApp = enteredIntoApp;
            LastEditedInApp = lastEditedInApp;
            CategoryId = categoryId;
            UserId = userId;
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Url { get; set; }
        public float Rating { get; set; }
        public bool IsFavourite { get; set; }
        public string EnteredIntoApp { get; set; }
        public string LastEditedInApp { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }

    }
}
