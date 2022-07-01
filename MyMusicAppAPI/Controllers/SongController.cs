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
            if (song == null) 
                return BadRequest("Song not found.");

            return Ok(song);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<Song>> GetSongsForUser(int userId)
        {
            var songs = await _context.Songs.Where(req => req.UserId == userId).ToListAsync();
            if (songs == null)
                return BadRequest("Users song list is empty");

            var cat = await _context.Categories.ToListAsync();

            var songsDto = new List<SongDto>();
            foreach(var song in songs)
            {

                songsDto.Add(new SongDto(
                    song.Id,
                    song.Name,
                    song.Artist,
                    song.Rating,
                    song.IsFavourite,
                    song.LastEditedInApp,
                    cat.First(x => x.Id == song.CategoryId).CategoryName
                    ));
            }

            return Ok(songsDto);
        }

        [HttpPost]
        public async Task<ActionResult<List<Song>>> AddSong(Song song)
        {
            if (song.Rating > 5 || song.Rating < 1) 
                return BadRequest("Rating must be in range 1-5");

            _context.Songs.Add(song);
            await _context.SaveChangesAsync();

            return Ok(await _context.Songs.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Song>>> UpdateSong(Song newSong)
        {
            var dbSong = await _context.Songs.FindAsync(newSong.Id);
            if (dbSong == null) return BadRequest("Song not found.");

            if(newSong.Rating > 5 || newSong.Rating < 1)
                return BadRequest("Rating must be in range 1-5");

            dbSong.Name = newSong.Name;
            dbSong.Artist = newSong.Artist;
            dbSong.Url = newSong.Url;
            dbSong.Rating = newSong.Rating;
            dbSong.IsFavourite = newSong.IsFavourite;
            dbSong.EnteredIntoApp = newSong.EnteredIntoApp;
            dbSong.LastEditedInApp = newSong.LastEditedInApp;
            dbSong.CategoryId = newSong.CategoryId;
            dbSong.UserId = newSong.UserId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Songs.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Song>>> Delete(int id)
        {
            var dbSong = await _context.Songs.FindAsync(id);
            if (dbSong == null) 
                return BadRequest("Song not found.");

            _context.Songs.Remove(dbSong);
            await _context.SaveChangesAsync();

            return Ok(await _context.Songs.ToListAsync());
        }
    }
}
