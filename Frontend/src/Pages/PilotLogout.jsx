import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PilotLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/pilot/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');

            navigate('/pilotLogin');
        } catch (e) {
            console.log('Error during logout:', e);
        }
    };

    useEffect(() => {
        logout();
    }, []);

    return null;
};

export default PilotLogout;
