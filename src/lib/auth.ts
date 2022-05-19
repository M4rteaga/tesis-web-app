import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../store';
import { User } from './types';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
	const [user, setUser] = useAtom(userAtom);

	const connect = (userVals: User) => {
		if (!user) {
			setUser(userVals);
			setIsAuthenticated(true);
		}
	};

	const disconnect = () => {
		if (user) {
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	return { connect, disconnect };
};
