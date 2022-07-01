using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMusicAppAPI.Data;
using MyMusicAppAPI.Models;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Login(UserDto request)
        {
            if (request == null) return BadRequest("Error logging in.");

            User user = await _context.Users.Where(u => u.UserName == request.Username).FirstOrDefaultAsync();

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(request.Password)));

            if (user is null)
                return BadRequest("User doesn't exist");
            if (!passwordHash.Equals(user.Password))
                return BadRequest("Wrong password");
                
            return Ok(user);
        }

    }
}
