using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyMusicAppAPI.Models
{
    [Index(nameof(UserName), IsUnique = true)]
    public class User
    {
        public User(string userName, string password)
        {
            UserName = userName;
            Password = password;
            UserSongs = new List<Song>();
        }

        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public List<Song> UserSongs { get; set; }

    }
}
