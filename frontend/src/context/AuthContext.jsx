import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const login = (token) => {

        localStorage.setItem("token", token);

        fetchProfile();

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    const fetchProfile = async () => {

        try {

            const res = await getProfile();

            setUser(res.data.data);

        }

        catch {

            logout();

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            fetchProfile();

        }

        else {

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

export const useAuth = () => useContext(AuthContext);