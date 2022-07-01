import "./login.css"
import { FaMusic } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validPw = async (e) => {
        e.preventDefault();
        const user = { username, password };

        fetch("https://localhost:5001/api/Authentication", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => {

                console.log("Data: ");
                console.log(data);
                navigate("../home", { state: { user: data } });

            }).catch(function (error) {
                console.log(error);
                alert("Wrong login credentials");
            });
    }

    useEffect(() => {

    }, []);
    return (
        <div>

            <body>
                <div class="login-dark">
                    <form method="post">
                        <h1>MyMusicApp</h1>
                        <h1 class="sr-only">Login</h1>
                        <div class="illustration"><FaMusic /></div>
                        <div class="form-group1"><input class="form-control" type="username" name="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                        <div class="form-group2"><input class="form-control" type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                        <div class="form-group"><button class="btn btn-primary btn-block" type="submit" onClick={validPw}>Log In</button></div></form>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
            </body>

        </div>


    );
}

export default Login;