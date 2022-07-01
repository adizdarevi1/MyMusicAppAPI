import React from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './infoPopup.css';
import { useNavigate } from "react-router-dom";

function InfoPopup({ openInfo, songId }) {
    // songId is the whole song object
    const navigate = useNavigate();

    const editSong = async (e) => {
        e.preventDefault();
        console.log("going to edit song with:");
        console.log(songId);
        openInfo(false);
        navigate("../edit-song", { state: { song: songId } });
    }

    const deleteSong = async (e) => {
        e.preventDefault();

        fetch("https://localhost:5001/api/Song/" + songId.id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => {
                alert("Song deleted.");
                openInfo(false);
            }).catch(function (error) {
                console.log(error);
                alert("Wrong song info");
            });
    }

    return (
        <div className="info-popup">
            <div className="info-popup-inner">
                <button class="modal__closed" onClick={() => openInfo(false)}></button>
                <div class="modal__details">
                    <h1 class="modal__title">{songId.name}</h1>
                    <p class="modal__description"> Artist of the song: {songId.artist}.</p>
                </div>

                <p class="modal__text">Song url : {songId.url}</p>
                <p class="modal__text">Is your favourite? {songId.isFavourite === true ? (<FaHeart />) : (<FaRegHeart />)}</p>
                <p class="modal__text">Rating : {(() => {
                    if (songId.rating >= 1 && songId.rating < 1.5)
                        return <FaStar />;
                    if (songId.rating >= 1.5 && songId.rating < 2.5)
                        return <><FaStar /><FaStar /></>;
                    if (songId.rating >= 2.5 && songId.rating < 3.5)
                        return <><FaStar /><FaStar /><FaStar /></>;
                    if (songId.rating >= 3.5 && songId.rating < 4.5)
                        return <><FaStar /><FaStar /><FaStar /><FaStar /></>;
                    if (songId.rating >= 4.5)
                        return <><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>;
                })()}</p>
                <p class="modal__text">Last modified : {songId.lastEditedInApp}</p>
                <p class="modal__text">Added : {songId.enteredIntoApp}</p>


                <button class="modal__btn" onClick={editSong}>Edit</button>
                <button class="modal__btn" onClick={deleteSong}>Delete</button>
            </div>
        </div>
    );
}

export default InfoPopup;