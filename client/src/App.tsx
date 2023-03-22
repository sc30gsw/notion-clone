import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AppLayout from "./components/layout/AppLayout";
import Home from "./components/pages/Home";

const App = () => {
	const theme = createTheme({
		palette: { primary: { main: "#0000ff" } },
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path="login" element={<Login />}></Route>
						<Route path="register" element={<Register />}></Route>
					</Route>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="memo" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
