using Microsoft.EntityFrameworkCore;

namespace MyMusicAppAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Song> Songs { get; set; }

    }
}
