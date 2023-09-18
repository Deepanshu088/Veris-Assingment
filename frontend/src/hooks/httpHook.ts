import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserType, logout } from "../redux/slices/user/userSlice";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);
	const authToken = useSelector<UserType, string>((state: any) => state.userData.authToken)
	const dispatch = useDispatch();

	const sendRequest = useCallback(async (path : string, method?: string, body?:any, headers?: any) => {
		let responseData;
		setIsLoading(true);
		setError(null);
		
		let url = process.env.REACT_APP_BACKEND_URL + path;
		let defaultHeaders: any = {
			"Content-Type": "application/json",
		}
		if(authToken)
			defaultHeaders["Authorization"] = `Bearer ${authToken}`

		console.log(url);

		try {
			const response = await fetch(url, {
				method: method || 'GET',
				body: JSON.stringify(body),
				headers: headers || defaultHeaders
			});
			
			if(response.status === 401) {
				dispatch(logout());
			}

			if (!response.ok) {
				throw new Error('Something Went Wrong, Some unknown error with api' + url);
			}

			responseData = await response.json();

			setIsLoading(false);
			return responseData;
		} catch (e: any) {
			setIsLoading(false);
			setError(e.message || 'Something Went Wrong, Some unknown error');
			throw e;
		}
	}, [authToken, dispatch])

	const clearError = useCallback(() => {
		setError(null);
	}, [])

	return ({
		isLoading,
		error,
		sendRequest,
		clearError
	})
};

export default useHttp;