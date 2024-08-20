import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentials = { email, password };
            const { token } = await login(credentials);
            localStorage.setItem('token', token);
            navigate('/wordlist');
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                Online <span style={styles.highlight}>Dictionary</span>
            </h1>
            <h2 style={styles.subtitle}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
            {error && <div style={styles.error}>{error}</div>}
            <p style={styles.loginText}>
                Don't have an account?{' '}
                <Link to="/signup" style={styles.loginLink}>
                    Sign up here
                </Link>
                .
            </p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: '3rem',
        textAlign: 'center',
    },
    highlight: {
        color: '#FF914D',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        width: '95%',
        padding: '10px',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '2px solid #FF914D',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#FF914D',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '1rem',
    },
};

export default Login;
