import React, { Component } from 'react';
import './home.css';
import { FaAngleLeft, FaAngleRight, FaEdit, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ModalBody } from 'react-bootstrap';
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossorigin="anonymous" />

const pjesme = [
    {
        id: 1,
        title: "Pjesma1",
        artist: "Pjevac1",
        favourite: "true",
        added: "20.6.2022.",
        category: "Pop"
    },
    {
        id: 4,
        title: "Pjesma4",
        artist: "Pjevac4",
        favourite: "true",
        added: "20.6.2022.",
        category: "Pop"
    },
    {
        id: 3,
        title: "Pjesma2",
        artist: "Pjevac2",
        favourite: "true",
        added: "20.6.2022.",
        category: "Pop"
    },
    {
        id: 2,
        title: "Pjesma3",
        artist: "Pjevac3",
        favourite: "true",
        added: "20.6.2022.",
        category: "Pop"
    },
];

const Home = () => {

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);




    useEffect(() => {
        fetch('http://localhost:5001/api/Song/user/' + 4).then(res => {
            if (res.ok) {
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

    return (


        <div class="container">
            <div class="row">
                <div class="col-lg-10 mx-auto mb-4">
                    <div class="section-title text-center ">
                        <h3 class="top-c-sep">MyMusicApp</h3>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="career-search mb-60">

                        <form action="#" class="career-form mb-60">
                            <div class="row">
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="input-group position-relative">
                                        <input type="text" class="form-control" placeholder="Enter Your Keywords" id="keywords" />
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="select-container">
                                        <select class="custom-select">
                                            <option selected="">Location</option>
                                            <option value="1">Jaipur</option>
                                            <option value="2">Pune</option>
                                            <option value="3">Bangalore</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <div class="select-container">
                                        <select class="custom-select">
                                            <option selected="">Select Job Type</option>
                                            <option value="1">Ui designer</option>
                                            <option value="2">JS developer</option>
                                            <option value="3">Web developer</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 my-3">
                                    <button type="button" class="btn btn-lg btn-block btn-light btn-custom" id="contact-submit">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div class="filter-result">
                            <p class="mb-30 ff-montserrat">Number of songs in app : 89</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th class="filterId">#</th>
                                        <th class="filterTitle">Title</th>
                                        <th class="filterArtist">Artist</th>
                                        <th class="filterFav"><FaRegHeart /></th>
                                        <th class="filterAdded">Added</th>
                                        <th class="filterCat">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pjesme.map((item) => (
                                        <tr key={item.id}>
                                            {Object.values(item).map((val) => (
                                                <td>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-reset justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    <FaAngleLeft />
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">2</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">8</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    <FaAngleRight />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    );
}

function AddSongsToList(i) {
    return (<tr>
        <td>{pjesme[i].id}</td >
        <td>{pjesme[i].title}</td>
        <td>{pjesme[i].artist}</td>
        <td>{pjesme[i].favourite}</td>
        <td>{pjesme[i].added}</td>
        <td>{pjesme[i].category}</td>
    </tr >
    );
}

export default Home;