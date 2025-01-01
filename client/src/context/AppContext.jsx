import { createContext } from "react";

import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const navigate = useNavigate();

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const value = {};
	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
export default AppContextProvider;
