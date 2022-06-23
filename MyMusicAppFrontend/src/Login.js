import "./login.css"
import {FaMusic} from 'react-icons/fa';

const Login = () => {

    return(
        <div>

<body>
    <div class="login-dark">
        <form method="post">
            <h2>MyMusicApp</h2>
            <h2 class="sr-only">Login</h2>
            <div class="illustration"><FaMusic/></div>
            <div class="form-group"><input class="form-control" type="username" name="username" placeholder="Username"/></div>
            <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"/></div>
            <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div></form>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
</body>

        </div>
        

    );
}

export default Login;