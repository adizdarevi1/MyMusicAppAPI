using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyMusicAppAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyMusicAppAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpGet("id/{id}")]
        public async Task<ActionResult<List<User>>> GetUserFromId(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null)
                return BadRequest("User doesn't exist");

            return Ok(user);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<List<User>>> GetUserFromUsername(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(req => req.UserName.Equals(username));
            if (user is null)
                return BadRequest("User doesn't exist");

            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User user)
        {
            var sha = SHA256.Create();
            user.Password = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(user.Password)));

            _context.Users.Add(user);

            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.Id);
            if (dbUser is null)
                return BadRequest("User not found");

            var sha = SHA256.Create();

            dbUser.UserName = user.UserName;
            dbUser.Password = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(user.Password)));
            dbUser.UserSongs = user.UserSongs;

            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found.");

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
