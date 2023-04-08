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
										<Link to={`/client/${client.id}/`} title="View client details">
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
											to={`/client/${client.id}/`}>
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