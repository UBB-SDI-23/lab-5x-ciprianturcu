import { Button, Card, CardActions, CardContent, IconButton, InputLabel, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Client, ClientType } from "../../models/Client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const ClientAdd = () => {
	const navigate = useNavigate();
	const [client, setClient] = useState<Client>({
		name: "",
		phoneNumber: "",
		city:"",
		date_of_birth: "",
		type: ClientType.PHISICAL,
	});

	const addClient = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/client/`, client);
			navigate("/client");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addClient}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClient({ ...client, name: event.target.value })}
						/>
						<TextField
							id="phoneNumber"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClient({ ...client, phoneNumber: event.target.value })}
						/>
						<TextField
							id="city"
							label="City"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClient({ ...client, city: event.target.value })}
						/>
						<TextField
							id="date_of_birth"
							label="Birthday"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClient({ ...client, date_of_birth: event.target.value })}
						/>
						{/* <TextField
							id="type"
							label="Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClient({ ...client, type: event.target.value })}
						/> */}
						<InputLabel id="client-type-label">Client Type</InputLabel>
						<Select
							labelId="client-type-label"
							id="client-type"
							value={client.type}
							onChange={(event) => setClient({...client, type: event.target.value as ClientType})}
						>
							{Object.values(ClientType).map((typeVal) => (
								<option key={typeVal} value={typeVal}>
									{typeVal}
								</option>
							))}
						</Select>

						<Button type="submit">Add Course</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};