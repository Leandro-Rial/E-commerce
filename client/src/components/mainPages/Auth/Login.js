import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={user.email} onChange={onInputChange} placeholder="Email" required />
                
                <input type="password" name="password" value={user.password} onChange={onInputChange} placeholder="Password" required />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
