import React, { useEffect, useState } from 'react';

export const OnlineStatusContext = React.createContext(window.navigator.onLine);

const NetworkStatusProvider: React.FC = ({ children }) => {
	const [onlineStatus, setOnlineStatus] = useState<boolean>(
		window.navigator.onLine
	);

	useEffect(() => {
		window.addEventListener('offline', () => {
			setOnlineStatus(false);
		});
		window.addEventListener('online', () => {
			setOnlineStatus(true);
		});

		return () => {
			window.removeEventListener('offline', () => {
				setOnlineStatus(false);
			});
			window.removeEventListener('online', () => {
				setOnlineStatus(true);
			});
		};
	}, []);

	return (
		<OnlineStatusContext.Provider value={onlineStatus}>
			{children}
		</OnlineStatusContext.Provider>
	);
};

export default NetworkStatusProvider;
