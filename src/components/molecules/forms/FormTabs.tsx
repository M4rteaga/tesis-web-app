import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { styled } from '../../../../stitches.config';

const TabsContainter = styled('section', {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '630px',
	height: '441px',
	backgroundColor: '$AppBg',
	borderRadius: '6px',
	fontFamily: '$RedHatMono',
});

const TabsList = styled(Tabs.List, {
	all: 'unset',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	justifyContent: 'space-between',
	borderBottom: '1px solid $gray12',
});

const TabsRoot = styled(Tabs.Root, {
	all: 'unset',
	display: 'inline-block',
	width: '100%',
});

const TabsTrigger = styled(Tabs.Trigger, {
	all: 'unset',
	width: '100%',
	height: '100%',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	backgroundColor: '$gray12',
	padding: ' 18px 8px ',
	fontWeight: 'bold',

	variants: {
		state: {
			active: {
				backgroundColor: '$gray12',
				color: 'white',
			},
			disabled: {
				backgroundColor: '$gray1',
				color: '$gray12',
			},
		},
		position: {
			left: {
				borderTopLeftRadius: '6px',
			},
			right: {
				borderTopRightRadius: '6px',
			},
		},
	},

	defaultVariants: {
		state: 'disabled',
	},
});

const Description = styled('p', {
	all: 'unset',
	fontSize: 16,
	color: '$gray11',
	textAlign: 'center',
	margin: '1.5rem 0 1.5rem',
});

const TabsContent = styled(Tabs.TabsContent, {
	color: '$gray11',
	display: 'flex',
	flexDirection: 'column',
});

interface TabsProps {
	tabs: {
		name: string;
		description?: string;
		content: JSX.Element;
	}[];
}

export const TabsMenu: React.FC<TabsProps> = ({ tabs }) => {
	let newObj: { [key: string]: boolean } = {};
	const [active, setActive] = useState(newObj);

	tabs.forEach((tab, key) => (newObj[tab.name] = key === 0 ? true : false));

	const handleTabChange = (tabName: string) => {
		if (active[tabName]) {
		}
		const otherTab = Object.keys(active).find((key) => key !== tabName);
		setActive({
			...active,
			[otherTab!]: false,
			[tabName]: true,
		});
	};

	return (
		<TabsContainter>
			<TabsRoot defaultValue={tabs[0].name} orientation="vertical">
				<TabsList aria-label="tabs example">
					{tabs.map((tab, key) => (
						<TabsTrigger
							key={key}
							value={tab.name}
							state={active[tab.name] ? 'active' : 'disabled'}
							position={key === 0 ? 'left' : 'right'}
							onClick={() => handleTabChange(tab.name)}
						>
							{tab.name.toUpperCase()}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab, key) => (
					<TabsContent value={tab.name} key={key}>
						{tab.description ? (
							<Description>{tab.description}</Description>
						) : null}
						{tab.content}
					</TabsContent>
				))}
			</TabsRoot>
		</TabsContainter>
	);
};
