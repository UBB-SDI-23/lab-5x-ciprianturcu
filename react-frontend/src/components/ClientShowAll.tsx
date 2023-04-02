import { useEffect, useState } from "react";
import { Client } from "../models/Client";

export const BACKEND_API_URL = "http://13.49.173.54/api"

export const ClientShowAll = () => {
    const [clients, setClients] = useState([]);
    
    useEffect(()=>{
        fetch(`${BACKEND_API_URL}/client/`)
            .then(res => res.json())
            .then(data => setClients(data));
    }, []);

    if(clients.length === 0)
    {
        return <div>No courses.</div>
    }

    return (
            <div className="App">
            <h1>Clients list</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>City</th>
                    <th>Type</th>
                    <th>Lawsuits</th>
                </tr>
                {clients.map((client: Client, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{client.name}</td>
                        <td>{client.phoneNumber}</td>
                        <td>{client.city}</td>
                        <td>{client.date_of_birth}</td>
                        <td>{client.type}</td>
                        <td>{client.lawsuits.description}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
  }