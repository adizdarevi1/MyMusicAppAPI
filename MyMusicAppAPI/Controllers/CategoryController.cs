using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMusicAppAPI.Data;
using MyMusicAppAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Category>> Get()
        {
            return Ok(await _context.Categories.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetFromID(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if (cat == null)
                return BadRequest("Category with this ID doesn't exist.");

            return Ok(cat);
        }
        [HttpGet("cat/{name}")]
        public async Task<ActionResult<List<Category>>> GetCategoryFromName(string name)
        {
            var cat = await _context.Categories.FirstOrDefaultAsync(req => req.CategoryName.Equals(name));
            if (cat is null)
                return BadRequest("Category doesn't exist");

            return Ok(cat);
        }
    }
}
