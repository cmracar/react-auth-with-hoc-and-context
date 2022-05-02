import axios from "axios";
import { useEffect, useState } from "react";
import withAuth from "../../components/HOC/withAuth";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";

type Response = {
    data: ExampleData[]
}

type ExampleData = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: object;
    phone: string;
    website: string;
    company: object;
}

const Dashboard = () => {

    const [response, setResponse] = useState<Response>();
    const { user, logout } = useAuth();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        let res = await axios.get("https://jsonplaceholder.typicode.com/users")
        setResponse(res)
    }

    return (
        <>
            <div className="dashboard-box">
                <h3>Dashboard</h3>
                <p>This area is private. You are logged as <b>{user?.username}</b></p>
                <p>You can log out here {`-->`} <a className="logout-button" onClick={() => logout()}>Logout</a></p>
                <div>
                    {response?.data.map((item:ExampleData, id:number) =>
                        <p key={id}>
                            {item.id} - {item.name} | ({item.username})
                        </p>)
                    }
                </div>
            </div>
        </>
    );
}

export default withAuth(Dashboard);