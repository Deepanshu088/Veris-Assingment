import React, { Suspense } from 'react';
// import logo from './logo.svg';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Shared/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';

function App() {
	const user = useSelector((state: any)  => state.userData);

	return <div className="App">
		<Router>
			<Header />
			<main>
				<Suspense fallback={
					<div className='center'>
						<h1>LoadingSpinner</h1>
					</div>
				}>
					<Routes>
						{
							!user.isLoggedIn ?
								<Route path="/" element={<Login />} />
							:
								<Route path="/" element={<Home />} />
						}

						<Route path="*" element={<Navigate replace={true} to={"/"} />}/>

					</Routes>

				</Suspense>
			</main>
		</Router>
	</div>;
}

export default App;
