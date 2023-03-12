import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
