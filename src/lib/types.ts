import { objectKeys } from './utils';

export type inferObjectFirstLevel<T extends object> = {
	[K in keyof T]?: string;
};

export type FormFields = {
	[key: string]: {
		name: string;
		id?: string;
		label: string;
		type: React.HTMLInputTypeAttribute;
		placeholder?: string;
		options?: string[];
	};
};

export interface User {
	username: string;
	publicAddress: string;
}

export interface ConnectionResponse {
	rowCount: 0 | 1;
	username: string;
	address: string;
}
