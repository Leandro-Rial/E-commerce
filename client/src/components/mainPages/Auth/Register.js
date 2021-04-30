import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={user.name} onChange={onInputChange} placeholder="Name" required />
                
                <input type="email" name="email" value={user.email} onChange={onInputChange} placeholder="Email" required />
                
                <input type="password" name="password" value={user.password} onChange={onInputChange} placeholder="Password" required />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register
