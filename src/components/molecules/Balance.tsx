import { Text } from '../atoms';
import { useBalance } from '../../lib/solana';

export const Balance = () => {
	const { balance, isLoading, isError } = useBalance();

	if (isError) {
		return <Text>Error</Text>;
	}

	if (isLoading) return <Text>Loading...</Text>;

	return <Text>Balance: {balance} lamports</Text>;
};
