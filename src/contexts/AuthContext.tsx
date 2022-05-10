import React, { useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';

export interface User {
    username?: string | undefined;
    password?: string | undefined;
}

export interface AuthContextType {
    user: User | undefined;
    loading: boolean;
    login: (email: string, password: string) => void;
    signUp: (email: string, name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const login = (username: string, password: string) => {
        setLoading(true)
        setTimeout(() => {
            console.log("Login process");
            setUser({
                username: username,
                password: password
            })
            navigate("/dashboard");
            setLoading(false)
        }, 5000);
    }

    const signUp = (username: string, email: string, password: string) => {
        setLoading(true)
        setTimeout(() => {
            console.log("Sign Up process");
            setUser({
                username: username,
                password: password
            })
            navigate("/dashboard");
            setLoading(false)
        }, 5000);
    }

    const logout = () => {
        console.log("Logout process");
        setUser(undefined);
        navigate("/login");
    }

    useEffect(() => {
        if (user !== undefined) {
            setUser(user);
        } else {
            setUser(undefined);
        }
    }, []);

    const values = {
        user,
        loading,
        login,
        signUp,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {loading ?
                <div className="loading-text">
                    <div>Sayfa Yükleniyor...</div>
                </div>
                :
                children
            }
        </AuthContext.Provider>
    );
}