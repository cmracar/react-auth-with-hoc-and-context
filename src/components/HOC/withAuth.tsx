import { FC } from "react";
import Login from "../../pages/Login/Login";
import { useAuth } from "../../contexts/AuthContext";


const withAuth = (Component: FC) => {

    const Auth = (props: any) => {
        const { user } = useAuth();

        return (
            <>
                {user !== undefined ? <Component {...props} /> : <Login />}
            </>
        );

    }

    return Auth;

};

export default withAuth;