using System.ComponentModel.DataAnnotations;

namespace MyMusicAppAPI.Models
{
    public class Category
    {
        public Category(string name)
        {
            CategoryName = name;
        }
        public Category()
        {

        }
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; }

    }
}
