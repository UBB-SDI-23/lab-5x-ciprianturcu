import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllClients } from "./components/client/AllClients";
import { ClientDetails } from "./components/client/ClientDetail";
import { ClientDelete } from "./components/client/ClientDelete";
import { ClientAdd } from "./components/client/ClientAdd";
import { ClientUpdate } from "./components/client/ClientUpdate";

function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/client" element={<AllClients />} />
					<Route path="/client/:clientId/details" element={<ClientDetails />} />
					<Route path="/client/:clientId/edit" element={<ClientUpdate />} />
					<Route path="/client/:clientId/delete" element={<ClientDelete />} />
					<Route path="/client/add" element={<ClientAdd />} />
					
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;