import Stack from '@mui/joy/Stack';
import Settings from './Settings';
import Search from './Search';
import NewNote from './NewNote';

function Controls() {
	return (
		<Stack
			direction="row"
			borderRadius={3}
			justifyContent="space-between"
			position="sticky"
			top={0}
			zIndex={999}
			sx={{
				transition: 'box-shadow 2300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
				boxShadow:
					'0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
				backgroundColor: 'var(--joy-palette-background-level1)',
				borderBottomLeftRadius: '10px',
				borderBottomRightRadius: '10px',
				p: 1,
				br: 3,
			}}
		>
			<Settings />
			<Search />
			<NewNote />
		</Stack>
	);
}

export default Controls;
