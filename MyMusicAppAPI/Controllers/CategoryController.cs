using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyMusicAppAPI.Data;
using System.Collections.Generic;

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
    }
}
