using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMusicAppAPI.Data;
using MyMusicAppAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitializeController : ControllerBase
    {
        private readonly DataContext _context;
        public InitializeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("Users")]
        public async Task<ActionResult<List<User>>> CreateFirstDataUsers()
        {
            if (!_context.Users.Any())
            {
                var sha = SHA256.Create();
                var passwordHash1 = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("userpw1")));
                var passwordHash2 = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("userpw2")));
                var passwordHash3 = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("userpw3")));

                _context.Users.Add(new User("User1", passwordHash1));
                _context.Users.Add(new User("User2", passwordHash2));
                _context.Users.Add(new User("User3", passwordHash3));

                await _context.SaveChangesAsync();
            }
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpGet("Categories")]
        public async Task<ActionResult<List<Category>>> CreateFirstDataCategories()
        {
            if (!_context.Categories.Any())
            {
                _context.Categories.Add(new Category("jazz"));
                _context.Categories.Add(new Category("rap"));
                _context.Categories.Add(new Category("pop"));
                _context.Categories.Add(new Category("EDM"));
                _context.Categories.Add(new Category("DNB"));

                await _context.SaveChangesAsync();
            }
            return Ok(await _context.Categories.ToListAsync());
        }
        [HttpGet("Songs")]
        public async Task<ActionResult<List<Song>>> CreateFirstDataSongs()
        {
            if (!_context.Songs.Any())
            {
                var categories = await _context.Categories.ToListAsync();
                var users = await _context.Users.ToListAsync();

                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, false, "2022.07.01.", "2022.06.22.", categories[0].Id, users[0].Id));
                _context.Songs.Add(new Song("Suspus", "Ceza", "https://www.youtube.com/watch?v=mY--4-vzY6E", (float)3.4, false, "2022.06.22.", "2022.06.22.", categories[1].Id, users[0].Id));
                _context.Songs.Add(new Song("Baskin", "Ceza", "https://www.youtube.com/watch?v=xDaBNcB4J3I", (float)4.6, true, "2022.06.22.", "2022.06.22.", categories[0].Id, users[0].Id));
                _context.Songs.Add(new Song("Hold Your Color", "Pendulum", "https://www.youtube.com/watch?v=9mWLig0s_9k", (float)2.1, true, "2022.06.22.", "2022.06.22.", categories[4].Id, users[0].Id));
                _context.Songs.Add(new Song("Watercolour", "Pendulum", "https://www.youtube.com/watch?v=6tb0CwlQW0M", (float)3.1, false, "2022.06.22.", "2022.06.22.", categories[4].Id, users[0].Id));
                _context.Songs.Add(new Song("Reverse The Bass", "TNT", "https://www.youtube.com/watch?v=oteAfvKjcwI", (float)4.1, true, "2022.06.22.", "2022.06.22.", categories[3].Id, users[0].Id));
                _context.Songs.Add(new Song("Diamonds", "Rihanna", "https://www.youtube.com/watch?v=lWA2pjMjpBs", (float)4.8, false, "2022.06.22.", "2022.06.22.", categories[2].Id, users[0].Id));
                _context.Songs.Add(new Song("Rehab", "Rihanna and Timberlake", "https://www.youtube.com/watch?v=rJYcmq__nDM", (float)4.4, false, "2022.06.22.", "2022.06.22.", categories[2].Id, users[0].Id));
                _context.Songs.Add(new Song("Mockingbird", "Eminem", "https://www.youtube.com/watch?v=S9bCLPwzSC0", (float)3.8, false, "2022.06.22.", "2022.06.22.", categories[1].Id, users[0].Id));
                _context.Songs.Add(new Song("Sharks", "Imagine Dragons", "https://www.youtube.com/watch?v=Te3_VlimRw0", (float)3.8, true, "2022.06.22.", "2022.06.22.", categories[2].Id, users[0].Id));
                _context.Songs.Add(new Song("Take Five", "Dave Brubeck", "https://www.youtube.com/watch?v=vmDDOFXSgAs", (float)3.8, false, "2022.06.22.", "2022.06.22.", categories[0].Id, users[0].Id));

                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, true, "2022.07.01.", "22.06.2022.", categories[0].Id, users[1].Id));
                _context.Songs.Add(new Song("Suspus", "Ceza", "https://www.youtube.com/watch?v=mY--4-vzY6E", (float)3.4, true, "2022.06.29.", "20.06.2022.", categories[1].Id, users[1].Id));

                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, true, "2022.07.01.", "22.06.2022.", categories[0].Id, users[2].Id));




                await _context.SaveChangesAsync();
            }
            
            await _context.SaveChangesAsync();
            return Ok(await _context.Songs.ToListAsync());
        }
    }
}
