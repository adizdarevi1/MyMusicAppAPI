using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMusicAppAPI.Data;
using MyMusicAppAPI.Models;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet]
        public async Task<ActionResult<Song>> CreateFirstData()
        {
            if (!_context.Users.Any())
            {
                _context.Users.Add(new User("User1", "user1"));
                _context.Users.Add(new User("User2", "user2"));
                _context.Users.Add(new User("User3", "user3"));
            }
            if (!_context.Categories.Any())
            {
                _context.Categories.Add(new Category("jazz"));
                _context.Categories.Add(new Category("rap"));
                _context.Categories.Add(new Category("pop"));
                _context.Categories.Add(new Category("EDM"));
            }
            if (!_context.Songs.Any())
            {
                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, true, "20.6.2022", "22.6.2022.", 1,4));
                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, true, "20.6.2022", "22.6.2022.", 1, 5));
                _context.Songs.Add(new Song("Je veux", "Zaz", "https://www.youtube.com/watch?v=7X9kpHB7Aow", 3, true, "20.6.2022", "22.6.2022.", 1, 6));
                _context.Songs.Add(new Song("Suspus", "Ceza", "https://www.youtube.com/watch?v=mY--4-vzY6E", (float)3.4, true, "19.6.2022", "20.6.2022.", 2,4));
                _context.Songs.Add(new Song("Suspus", "Ceza", "https://www.youtube.com/watch?v=mY--4-vzY6E", (float)3.4, true, "19.6.2022", "20.6.2022.", 2,5));
                _context.Songs.Add(new Song("Baskin", "Ceza", "https://www.youtube.com/watch?v=xDaBNcB4J3I", (float)4.5, true, "18.6.2022", "18.6.2022.", 2,4));
            }
            
            await _context.SaveChangesAsync();
            return Ok(await _context.Songs.ToListAsync());
        }
    }
}
