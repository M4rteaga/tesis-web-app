import { CustomLink, Text } from '../atoms';
import { styled } from '../../../stitches.config';
import { useAuth } from '../../lib/auth';
import { UserPlaceholder } from '../molecules';
import { ConnectFormModal } from './forms';
import { NoneLogo } from '../atoms/Logo/Logo';
import { Separator } from '../atoms/Separator';
import { createRef, useImperativeHandle, useRef } from 'react';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../store';

const Nav = styled('nav', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1rem 2rem',
});

const NavText = styled(Text, {
	cursor: 'pointer',
});

const NavSection = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '1rem',
	height: 20,
});

export const triggerConnectionRef = createRef<{
	triggerButton: () => void;
}>();

export const Navbar = () => {
	const [isAuthenticated] = useAtom(isAuthenticatedAtom);

	const connectRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(triggerConnectionRef, () => {
		return {
			triggerButton: () => {
				connectRef.current?.click();
			},
		};
	});

	return (
		<Nav>
			<CustomLink to="/">
				<NoneLogo />
			</CustomLink>
			<NavSection>
				<CustomLink to="/">
					<NavText>Home</NavText>
				</CustomLink>
				<NavText>Pricing</NavText>
				<NavText>About</NavText>
				<Separator
					decorative
					orientation="vertical"
					css={{ margin: '0 5px' }}
				/>
				{isAuthenticated ? (
					<UserPlaceholder />
				) : (
					<ConnectFormModal
						trigger={
							<Text
								as="button"
								fontWeight={'bold'}
								css={{ cursor: 'pointer' }}
								ref={connectRef}
							>
								Connect
							</Text>
						}
					/>
				)}
			</NavSection>
		</Nav>
	);
};
