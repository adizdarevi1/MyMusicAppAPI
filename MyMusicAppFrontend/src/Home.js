import React,{Component} from 'react';
import { FaEdit, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import {useState, useEffect} from 'react';

const Home = () => {

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:5001/api/Song/user/'+4).then(res => {
            if(res.ok){
                return res.json()
            } throw res;
        }).then(data => {
            setSongs(data);
        }).catch(err => {
            console.error("Err or fetching data: ", err);
            setError(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return(
        <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">SongName</th>
              <th scope="col">URL</th>
              <th scope="col">Rating</th>
              <th scope="col">Favourite</th>
              <th scope="col">Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map(song=>
                <tr key={song.Id}>
                    <td>{song.Artist}</td>
                    <td>{song.Name}</td>
                    <td>{song.Url}</td>
                    <td>{song.Rating}</td>
                    <td>
                        <button className="favBtn"><FaRegHeart /></button>
                    </td>
                    <td>{song.CategoryId}</td>
                    <td>
                        <button className="editBtn"><FaEdit /></button>
                        <button className="deleteBtn"><FaTrashAlt /></button>
                    </td>
                </tr>)}
          </tbody>
        </table>
      </div>
    );
}

export default Home;