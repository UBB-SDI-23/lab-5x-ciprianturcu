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
import { AttorneyOnLawsuit } from "../../models/AttorneyOnLawsuit";

export const AllAOLs = () => {
	const [loading, setLoading] = useState(false);
	const [aols, setAOLs] = useState<AttorneyOnLawsuit[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/aol/`)
			.then((response) => response.json())
			.then((data) => {
				setAOLs(data);
				setLoading(false);
			});
	}, []);

	console.log(aols)

	return (
		<Container>
			<h1>All Attorney-Lawsuit </h1>

			{loading && <CircularProgress />}
			{!loading && aols.length === 0 && <p>No Relations Found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/attorney-on-lawsuit/add`}>
					<Tooltip title="Add a new Attorney-Lawsuit" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}

			{!loading && aols.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Attorney</TableCell>
								<TableCell align="right">Lawsuit</TableCell>
								<TableCell align="right">Attorney Role</TableCell>
								<TableCell align="center">Work Type</TableCell>
                                <TableCell align="center">Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{aols.map((aol, index) => (
								<TableRow key={aol.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/aol/${aol.id}/details`} title="View attorney-lawsuit details">
											{aol.attorney.name}
										</Link>
									</TableCell>
									<TableCell align="right">{aol.lawsuit.description}</TableCell>
									<TableCell align="right">{aol.att_role}</TableCell>
									<TableCell align="right">{aol.work_type}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/aol/${aol.id}/details`}>
											<Tooltip title="View attorney-lawsuit details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/aol/${aol.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/aol/${aol.id}/delete`}>
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