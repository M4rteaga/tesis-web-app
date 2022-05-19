import '../App.css';
import { styled } from '../../stitches.config';
import { Button, logoSolana, Text } from '../components/atoms';
import { Navbar } from '../components/organisms/Navbar';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { HomeCard } from '../components/molecules/HomeCard';
import { ConnectFormModal } from '../components/organisms/forms';
import { useAuth } from '../lib/auth';
import { triggerConnectionRef } from '../components/organisms/Navbar';

const Box = styled('main', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	paddingTop: '4rem',
	paddingLeft: '3rem',
	paddingRight: '3rem',
});

const Section = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'left',
	width: '50%',
});

const ButtonBox = styled('div', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	gap: '1rem',
});

const Logo = styled('img', {
	height: 14,
});

export default function Home() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="App">
			<Navbar />
			<Box>
				<Section>
					<Text as="h4" size={'sm'}>
						POWERED BY{' '}
						<a href="https://solana.com/">
							<Logo src={logoSolana} alt="logo de solana" />
						</a>
					</Text>
					<Text
						as="h1"
						size="xxl"
						fontWeight={'bold'}
						css={{ marginTop: '1rem' }}
					>
						Infraestructura DeFi para transacciones seguras
					</Text>
					<ButtonBox css={{ marginTop: '3rem' }}>
						<Button
							onClick={() => {
								triggerConnectionRef.current?.triggerButton();
							}}
							disabled={isAuthenticated}
						>
							Connect
							<ArrowRightIcon />
						</Button>
						<Button color={'transparent'}>
							Conocer mas
							<ArrowRightIcon />
						</Button>
					</ButtonBox>
				</Section>
				<Section
					css={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<HomeCard />
				</Section>
			</Box>
		</div>
	);
}
