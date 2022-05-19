import { User } from './lib/types';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<User | null>('user', null);
export const isAuthenticatedAtom = atomWithStorage<boolean>(
	'isAuthenticated',
	false
);
