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
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Lawsuit } from "../../models/Lawsuit";

export const AllLawsuits = () => {
	const [loading, setLoading] = useState(false);
	const [lawsuits, setLawsuit] = useState<Lawsuit[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/lawsuit/`)
			.then((response) => response.json())
			.then((data) => {
				setLawsuit(data);
				setLoading(false);
			});
	}, []);

	console.log(lawsuits)

	return (
		<Container>
			<h1>All Lawsuits</h1>

			{loading && <CircularProgress />}
			{!loading && lawsuits.length === 0 && <p>No Lawsuits Found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/lawsuit/add`}>
					<Tooltip title="Add a new lawsuit" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}

			{!loading && lawsuits.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Type</TableCell>
								<TableCell align="right">State</TableCell>
								<TableCell align="center">Court Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lawsuits.map((lawsuit, index) => (
								<TableRow key={lawsuit.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/lawsuit/${lawsuit.id}/details`} title="View lawsuit details">
											{lawsuit.description}
										</Link>
									</TableCell>
									<TableCell align="right">{lawsuit.type}</TableCell>
									<TableCell align="right">{lawsuit.state}</TableCell>
									<TableCell align="right">{lawsuit.court_date}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/lawsuit/${lawsuit.id}/details`}>
											<Tooltip title="View lawsuit details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/lawsuit/${lawsuit.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/lawsuit/${lawsuit.id}/delete`}>
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