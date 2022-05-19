import { useAuth } from './auth';
import { PublicKey } from '@solana/web3.js';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { userAtom } from '../store';
import solanaConnection from './solanaConnection';

const SOL_IN_LAMPORTS = 1e9;

export const fundAccount = async (
	publicAddress: string,
	amount: number,
	currency: 'lamports' | 'sol'
) => {
	if (amount <= 0) {
		throw new Error('Invalid amount');
	}

	if (currency === 'sol') {
		amount = amount * SOL_IN_LAMPORTS;
	}

	const response = await fetch(
		`https://ez03ozr0ha.execute-api.us-east-1.amazonaws.com/dev/tesis/requestAirdrop?${new URLSearchParams(
			{
				address: publicAddress, //address of the account to fund
				lamports: amount.toString(),
			}
		)}`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				origin: '*',
			},
		}
	);

	if (response.status !== 200) {
		throw new Error(`Error ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const transaction = async (
	senderPublicAddress: string,
	amount: number,
	receiverPublicAddress: string,
	currency: 'lamports' | 'sol'
) => {
	if (amount <= 0) {
		throw new Error('Invalid amount');
	}

	if (currency === 'sol') {
		amount = amount * SOL_IN_LAMPORTS;
	}

	const res = await fetch(
		`https://ez03ozr0ha.execute-api.us-east-1.amazonaws.com/dev/tesis/transaction?${new URLSearchParams(
			{
				addressFrom: senderPublicAddress, //address of the account to fund
				addressTo: receiverPublicAddress,
				lamports: amount.toString(),
			}
		)}`
	);
	if (res.status !== 200) {
		throw new Error(`Error ${res.status}`);
	}
	const body = await res.json();
	return body;
};

export const getAccountBalance = async (publicAddress: PublicKey) => {
	const respose = await solanaConnection.getBalance(publicAddress);

	return respose;
};

export const useBalance = () => {
	const [balance, setBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState<null | string>(null);
	const [user] = useAtom(userAtom);
	const { publicAddress } = user!;

	useEffect(() => {
		const getBalance = async () => {
			try {
				setIsLoading(true);
				const myPublicKey = new PublicKey(publicAddress);
				const res = await getAccountBalance(myPublicKey);
				if (typeof res !== 'number') throw new Error('get balance error');
				setBalance(res);
				setIsLoading(false);
			} catch (error) {
				setIsError(error as string);
				console.log(error);
			}
		};
		getBalance();
	}, []);

	return { balance, isLoading, isError };
};

export const getUserTransactionsHistory = async (publicAddress: string) => {
	const response = await fetch(
		`https://none-transaction-history.deno.dev/transactions?${new URLSearchParams(
			{ address: publicAddress }
		)}`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				origin: '*',
			},
		}
	);
	if (response.status !== 200) {
		throw new Error(`Error ${response.status}`);
	}
	const data = await response.json();
	return data;
};
