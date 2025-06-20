import { useNavigate } from 'react-router-dom';

export default function useLogout() {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    return logout;
}