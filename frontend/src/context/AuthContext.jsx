import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getProfile } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // =====================================
    // Login
    // =====================================

    const login = async (token) => {

        localStorage.setItem(
            "token",
            token
        );

        try {

            const res = await getProfile();

            setUser(res.data.data);

            return res.data.data;

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);

            throw error;

        } finally {

            setLoading(false);

        }
    };

    // =====================================
    // Logout
    // =====================================

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    // =====================================
    // Fetch Existing Profile
    // =====================================

    const fetchProfile = async () => {

        try {

            const res = await getProfile();

            setUser(res.data.data);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    // =====================================
    // Check Existing Session
    // =====================================

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (token) {

            fetchProfile();

        } else {

            setLoading(false);

        }

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
};

export const useAuth = () =>
    useContext(AuthContext);