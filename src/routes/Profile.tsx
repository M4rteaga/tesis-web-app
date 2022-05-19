import '../App.css';
import { styled } from '../../stitches.config';
import { useAuth } from '../lib/auth';
import { Navbar } from '../components/organisms/Navbar';
import { Text } from '../components/atoms';
import { FundFormModal } from '../components/organisms/forms/FundFormModal';
import { TransferFormModal } from '../components/organisms/forms/TransferFormModal';
import { GreenNoneWorld } from '../components/atoms/Logo/GreenNoneWorld';
import { TooltipWithToast } from '../components/molecules/Tooltip';
import { getUserTransactionsHistory, useBalance } from '../lib/solana';
import { useEffect, useState } from 'react';
import { HistoryTable } from '../components/organisms/HistoryTable';
import { useAtom } from 'jotai';
import { userAtom } from '../store';

const Box = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	paddingTop: '1rem',
	paddingLeft: '2rem',
	paddingRight: '2rem',
});

const ActionSection = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	marginTop: '1rem',
	gap: '1rem',
	width: '50%',
});

const WorldBox = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const InfoCards = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	justifyContent: 'space-between',
	marginTop: '8rem ',
});

const ContentCards = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'left',
	backgroundColor: '$gray3',
	width: 303,
	padding: '30px',
	borderRadius: 6,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	gap: '14px',
});

const Span = styled('span', {
	all: 'unset',
	cursor: 'pointer',
	display: 'inline-block',
	backgroundColor: '$colors$gray3',
	padding: '1px 4px',
	borderRadius: '4px',
	width: '80px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	marginLeft: '8px',
	marginRight: '8px',
	verticalAlign: 'middle',

	'&:hover': {
		backgroundColor: '$colors$gray4',
	},
});

const TableSection = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	marginTop: '3rem',
	marginBottom: '3rem',
	alignItems: 'center',
	justifyContent: 'center',
});

const EmptyBox = styled('div', {});

export default function Profile() {
	const [history, setHistory] = useState([]);
	const [user] = useAtom(userAtom);
	const { balance, isLoading, isError } = useBalance();

	const { username, publicAddress } = user!;

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const data = await getUserTransactionsHistory(publicAddress);

				setHistory(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchHistory();
	}, []);

	const copyInfo = () => {
		navigator.clipboard.writeText(publicAddress);
	};

	return (
		<div className="App">
			<Navbar />
			<Box as="main">
				<WorldBox>
					<GreenNoneWorld />
					<Text as="h2" size={'xl'} fontWeight="bold">
						{username}
					</Text>
					<EmptyBox
						css={{
							marginTop: '10px',
							display: 'flex',
							flexWrap: 'wrap',
						}}
					>
						<Text css={{ alignItems: 'center', lineHeight: 2 }} size="sm">
							Identified by public key
							<TooltipWithToast
								trigger={<Span onClick={copyInfo}>{publicAddress}</Span>}
								content={`click to copy ${publicAddress}`}
							/>
							with a balance of{' '}
							{isLoading ? 'loading...' : isError ? 'Error' : `${balance} lmp`}.
						</Text>
					</EmptyBox>
				</WorldBox>
				<ContentCards css={{ marginTop: 20 }}>
					<FundFormModal />
					<TransferFormModal />
				</ContentCards>
				<TableSection>
					<HistoryTable transactionHistory={history} />
				</TableSection>
			</Box>
		</div>
	);
}
function publicAddress(publicAddress: any) {
	throw new Error('Function not implemented.');
}
