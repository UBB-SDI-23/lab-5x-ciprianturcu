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
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Client } from "../../models/Client";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllClients = () => {
	const [loading, setLoading] = useState(false);
	const [clients, setClients] = useState<Client[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`../api/client/`)
			.then((response) => response.json())
			.then((data) => {
				setClients(data);
				setLoading(false);
			});
	}, []);

	console.log(clients)

	const sortClient = () => {
        const sortedClients = [... clients].sort((a:Client, b:Client)=>{
			const [year1, month1, day1] = a.date_of_birth.split('-').map(Number);
  			const [year2, month2, day2] = b.date_of_birth.split('-').map(Number);
			
			  const dateObj1 = new Date(year1, month1 - 1, day1);
			  const dateObj2 = new Date(year2, month2 - 1, day2);

			  if (dateObj1.getTime() < dateObj2.getTime()) {
				return -1;
			  } else if (dateObj1.getTime() > dateObj2.getTime()) {
				return 1;
			  } else {
				return 0;
			  }
		})
		console.log(sortedClients);
		setClients(sortedClients);
    }

	return (
		<Container>
			<h1>All Clients</h1>

			{loading && <CircularProgress />}
			{!loading && clients.length === 0 && <p>No clients found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/client/add`}>
					<Tooltip title="Add a new client" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}

			{!loading && (
            	<Button sx={{color:"red"}} onClick={sortClient}>
                	Sort Clients By Age
            	</Button>
        	)}

			{!loading && clients.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Phone Number</TableCell>
								<TableCell align="right">City</TableCell>
								<TableCell align="center">Birthday</TableCell>
								<TableCell align="center">Type</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((client, index) => (
								<TableRow key={client.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/client/${client.id}/details`} title="View client details">
											{client.name}
										</Link>
									</TableCell>
									<TableCell align="right">{client.phoneNumber}</TableCell>
									<TableCell align="right">{client.city}</TableCell>
									<TableCell align="right">{client.date_of_birth}</TableCell>
									<TableCell align="right">{client.type}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/client/${client.id}/details`}>
											<Tooltip title="View client details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/client/${client.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/client/${client.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};