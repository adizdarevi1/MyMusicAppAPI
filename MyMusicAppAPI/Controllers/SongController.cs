using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMusicAppAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {

        
        private readonly DataContext _context;
        public SongController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Song>>> Get()
        {
            return Ok(await _context.Songs.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> Get(int id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null) return BadRequest("Song not found.");
            return Ok(song);
        }

        [HttpPost]
        public async Task<ActionResult<List<Song>>> AddSong(Song song)
        {
            _context.Songs.Add(song);
            await _context.SaveChangesAsync();
            return Ok(await _context.Songs.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Song>>> UpdateSong(Song newSong)
        {
            var dbSong = await _context.Songs.FindAsync(newSong.Id);
            if (dbSong == null) return BadRequest("Song not found.");

            dbSong.Name = newSong.Name;
            dbSong.Artist = newSong.Artist;
            dbSong.Url = newSong.Url;
            dbSong.Rating = newSong.Rating;
            dbSong.IsFavourite = newSong.IsFavourite;
            dbSong.EnteredIntoApp = newSong.EnteredIntoApp;
            dbSong.LastEditedInApp = newSong.LastEditedInApp;
            dbSong.CategoryId = newSong.CategoryId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Songs.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Song>>> Delete(int id)
        {
            var dbSong = await _context.Songs.FindAsync(id);
            if (dbSong == null) return BadRequest("Song not found.");
            _context.Songs.Remove(dbSong);
            await _context.SaveChangesAsync();
            return Ok(await _context.Songs.ToListAsync());
        }
    }
}
