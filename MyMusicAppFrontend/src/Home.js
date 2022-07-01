import React, { Component, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'
import './home.css';
import { FaAngleLeft, FaAngleRight, FaArrowDown, FaArrowUp, FaFilter, FaHeart, FaMicrophoneAlt, FaMusic, FaPlus, FaRegHeart, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import InfoPopup from './components/InfoPupup';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';



function Table({ columns, data }) {
    const [openInfo, setOpenInfo] = useState(false);
    const [songId, setSongId] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    )

    function handleFilterButtonClickRT() {
        var filterDiv = document.getElementById("hiddenFilterDivRT")
        if (filterDiv.style.display === 'flex')
            filterDiv.style.display = 'none'
        else
            filterDiv.style.display = 'flex'
    }

    function handleFilterButtonClick() {
        var filterDiv = document.getElementById("hiddenFilterDiv")
        if (filterDiv.style.display === 'flex')
            filterDiv.style.display = 'none'
        else
            filterDiv.style.display = 'flex'
    }

    function handleAddButtonClick() {
        navigate("../add-new-song", { state: { user: location.state.user } });
    }

    return (
        <>
            <div class="filterDiv">
                <div>
                    Show&nbsp;
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 15, 20].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}
                            </option>
                        ))}
                    </select>
                    &nbsp;songs
                </div>
                <div>
                    <button class="filtBtn" onClick={handleAddButtonClick}>
                        <FaPlus />
                    </button>
                    <button class="filtBtn" onClick={handleFilterButtonClickRT}>
                        <FaMicrophoneAlt />
                    </button>
                    <button class="filtBtn" onClick={handleFilterButtonClick}>
                        <FaMusic />
                    </button>
                </div>
            </div>
            <table class="songTable" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <FaArrowDown />
                                                : <FaArrowUp />
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} onClick={() => {
                                    console.log(row.original);
                                    setOpenInfo(true);
                                    fetch("https://localhost:5001/api/Song/" + row.original.id)
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log("Giving song:");
                                            console.log(data);
                                            setSongId(data);
                                        }).catch(function (error) {
                                            console.log("ERROR FETCHING SONG");
                                            console.log(error);
                                        });
                                }}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>

                            )
                        }
                    )}
                    {openInfo && <InfoPopup openInfo={setOpenInfo} songId={songId} />}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'Previous'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'Next'}
                </button>{' '}
            </div>
        </>
    )
}

const Home = () => {

    const location = useLocation();
    const [songs, setSongs] = useState([]);
    const [filtSongs, setFiltSongs] = useState([])
    const [helpfulSongs, setHelpfulSongs] = useState([])
    const [namme, setNamme] = useState("");
    const [songgName, setSonggName] = useState("");
    const [categories, setCategories] = useState([]);

    const [buttonPopup, setButtonPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'same-origin'
            };
            const response = await fetch("https://localhost:5001/api/Song/user/" + location.state.user.id, requestOptions);
            var data = await response.json()
            setSongs(data)
            setFiltSongs(data)
            setHelpfulSongs(data)
            const responseCategory = await fetch("https://localhost:5001/api/Category", requestOptions);
            var dataCategory = await responseCategory.json()
            setCategories(dataCategory)
        }

        fetchData().catch(console.error);
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',

            },
            {
                Header: 'Artist',
                accessor: 'artist',
            },
            {
                Header: 'Rating',
                accessor: 'rating',
            },
            {
                Header: <FaHeart />,
                accessor: 'isFavourite',
                Cell: props => {
                    return props.value === true ? (
                        <FaHeart />
                    ) : (
                        <FaRegHeart />
                    );
                }
            },
            {
                Header: 'LastEdited',
                accessor: 'lastEditedInApp',
            },
            {
                Header: 'Category',
                accessor: 'categoryName',
            },

        ],
        []
    )



    function nameFilter(e) {
        var name = e.target.value;
        setNamme(name);
        if (songgName !== "")
            setFiltSongs(helpfulSongs.filter(x => x.name.toLowerCase().includes(name.toLowerCase())));
        else {
            setFiltSongs(songs.filter(x => x.name.toLowerCase().includes(name.toLowerCase())));
            setHelpfulSongs(filtSongs);
        }
        clearFiltersFunction1();
    }

    function artistFilter(e) {
        var artist = e.target.value;
        setSonggName(artist);
        if (namme !== "")
            setFiltSongs(helpfulSongs.filter(x => x.artist.toLowerCase().includes(artist.toLowerCase())));
        else {
            setFiltSongs(songs.filter(x => x.artist.toLowerCase().includes(artist.toLowerCase())));
            setHelpfulSongs(filtSongs)
        }
        clearFiltersFunction1();
    }

    function applyFiltersFunction() {
        var list = songs;
        var catIndex = document.getElementById("category").selectedIndex;
        var cat = document.getElementById("category")[catIndex].value;
        var name = document.getElementById("name").value;
        var artist = document.getElementById("artist").value;
        var isFavIndex = document.getElementById("favourite").selectedIndex;
        var isFav = "";
        switch (isFavIndex) {
            case 1:
                isFav = true;
                break;
            case 2:
                isFav = false;
                break;
            default:
                break;
        }

        console.log("this is list");
        console.log(list);
        console.log("This is category0");
        console.log(cat);
        if (!cat !== "") {
            list = list.filter(x => x.categoryName.toLowerCase().includes(cat.toLowerCase()));
        }
        if (isFav !== "")
            list = list.filter(x => x.isFavourite === isFav);
        if (name !== "")
            list = list.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
        if (artist !== "")
            list = list.filter(x => x.artist.toLowerCase().includes(artist.toLowerCase()));

        console.log(list);
        setFiltSongs(list);

    }

    function clearFiltersFunction() {
        setFiltSongs(songs);
        document.getElementById("name").value = "";
        document.getElementById("artist").value = "";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("favourite").selectedIndex = 0;
    }

    function clearFiltersFunction1() {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("favourite").selectedIndex = 0;
    }

    const logout = async () => {
        navigate("../", { replace: true });
    }

    return (
        <Box class="container" sx={{
            width: '70%',
            padding: '20px',
            height: '40%',
            boxShadow: 16,
            borderRadius: '0 0 20px 20px',
            position: 'relative',
            overflow: 'auto',
            margin: 'auto'
        }}>
            <h1>My Music App</h1>
            <button class="logout-btn" onClick={logout}><FaSignOutAlt /></button>
            <div class="mainDiv">
                <div class="mainFilterDiv">
                    <div id="hiddenFilterDivRT">
                        <div>
                            <label for="name">Filter by name&nbsp;</label>
                            <input type="text" name="name" id="name" onChange={nameFilter}></input>
                        </div>
                        <div>
                            <label for="artist">Filter by artist&nbsp;</label>
                            <input type="text" name="artist" id="artist" onChange={artistFilter}></input>
                        </div>
                    </div>
                    <div id="hiddenFilterDiv">
                        <div id="insideHiddenFilterDiv">

                            <div>
                                <label for="favourite">Favourite&nbsp;</label>
                                <select id="favourite" class="fav-select">
                                    <option></option>
                                    <option>Favourite</option>
                                    <option>Nonfavourite</option>
                                </select>
                            </div>
                            <div>
                                <label for="category">Category&nbsp;</label>
                                <select id="category">
                                    <option></option>
                                    {categories.map(x => <option>{x.categoryName}</option>)}
                                </select>
                            </div>
                        </div>
                        <div id="insideHiddenFilterDiv2">
                            <button onClick={applyFiltersFunction}>
                                {'Apply'}
                            </button>
                            <button onClick={clearFiltersFunction}>
                                {'Clear'}
                            </button>
                        </div>
                    </div>
                </div>
                <Table columns={columns} data={filtSongs} />
            </div>
        </Box>
    );
}

export default Home;