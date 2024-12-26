import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');

            navigate('/userLogin');
        } catch (e) {
            console.log('Error during logout:', e);
        }
    };

    useEffect(() => {
        logout();
    }, []);

    return null;
};

export default UserLogout;
