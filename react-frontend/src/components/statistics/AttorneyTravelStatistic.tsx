import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import { AttorneyTravel } from "../../models/AttorneyTravel";

export const AttorneyTravelStatistic = () =>{
    const[loading, setLoading] = useState(true);
    const[travels, setTravels] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/travel_sheet/`)
            .then(response => response.json())
            .then(data => {
                setTravels(data);
                setLoading(false);
            })
    }, []);

    console.log(travels);

    return(
        <Container>
        <h1>Attorneys that need to travel for a lawsuit</h1>
        {loading && <CircularProgress />}

        {!loading && travels.length == 0 && <div>No attorneys that need to travel were found</div>}

        {!loading && travels.length > 0 && (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">City of attorney</TableCell>
                            <TableCell align="center">Lawsuit state</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {travels.map((travels:AttorneyTravel, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{travels.name}</TableCell>
                                <TableCell align="center">{travels.city}</TableCell>
                                <TableCell align="center">{travels.lawsuit_state}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )}
    </Container>
    )

}