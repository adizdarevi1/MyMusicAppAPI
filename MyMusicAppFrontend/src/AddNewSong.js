import "./editSong.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddNewSong = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState(1);
    const [isFavourite, setIsFavourite] = useState(false);
    const [categories, setCategories] = useState([]);

    const validSongAdd = async (e) => {
        e.preventDefault();
        var today = new Date();
        var day = today.getDate();
        if (day < 10)
            day = "0" + day;
        var month = today.getMonth() + 1;
        if (month < 10)
            month = "0" + month;
        var lastEditedInApp = today.getFullYear() + '.' + month + '.' + day;
        var enteredIntoApp = lastEditedInApp;
        var userId = location.state.user.id;
        var categoryIndex = document.getElementById("category-edit").selectedIndex;
        var categoryName = document.getElementById("category-edit")[categoryIndex].value;

        const responseCat = await fetch("https://localhost:5001/api/Category/cat/" + categoryName, {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
            },
        });
        var category = await responseCat.json();
        var categoryId = category.id;

        const song = { name, artist, url, rating, isFavourite, enteredIntoApp, lastEditedInApp, categoryId, userId };
        console.log("I am giving this song into post");
        console.log(song);

        const responsePost = await fetch("https://localhost:5001/api/Song", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(song)
        });
        var data = await responsePost.json();
        alert("Song added.");
        exit();
    }

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'same-origin'
            };
            const responseCategory = await fetch("https://localhost:5001/api/Category", requestOptions);
            var dataCategory = await responseCategory.json()
            setCategories(dataCategory)
        }

        fetchData().catch(console.error);
    }, [])

    const returnBack = async (e) => {
        e.preventDefault();
        exit();
    }

    function exit() {
        navigate("../home", { state: { user: location.state.user } });
    }

    const handleChange = () => {
        setIsFavourite(!isFavourite);
        document.getElementById('songfavourite').checked = isFavourite;
        console.log(isFavourite);
    };

    return (
        <div>

            <body>
                <div class="login-dark">
                    <form method="post">
                        <h1>Add Song</h1>
                        <div class="form-group1">
                            <input class="form-control" type="text" id="songName" placeholder="Song name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class="form-group1">
                            <input class="form-control" type="text" id="songArtist" placeholder="Song artist" required value={artist} onChange={(e) => setArtist(e.target.value)} />
                        </div>
                        <div class="form-group1">
                            <input class="form-control" type="text" id="songUrl" placeholder="Song url" required value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div class="form-group1">
                            <input class="form-control" type="number" id="songRating" required value={rating} min="1" max="5" onChange={(e) => setRating(e.target.value)} />
                        </div>
                        <div class="form-group1">
                            <label for="category-edit">Category&nbsp;</label>
                            <select id="category-edit">
                                {categories.map(x => <option>{x.categoryName}</option>)}
                            </select>
                        </div>
                        <div class="form-group1">
                            <label>Is favourite?</label>
                            <input id="songfavourite" class="form-checkbox" type="checkbox" name="songfavourite" checked={isFavourite} onChange={handleChange} />
                        </div>
                        <div class="form-group">
                            <button class="apply-btn btn-primary btn-block" type="submit" onClick={validSongAdd}>Add song</button>
                            <button class="cancel-btn btn-primary btn-block" type="cancel" onClick={returnBack}>Cancel</button>
                        </div>
                    </form>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
            </body >

        </div >
    );
}

export default AddNewSong;