import './App.css';
import Box from '@mui/joy/Box';
import { useContext } from 'react';
import { AppProvider } from 'contexts/AppContext';
import AppContext from 'contexts/AppContext';
import NotesList from './components/NotesList';
import Controls from './components/Controls/Controls';
import NoteDialog from './components/Dialogs/NoteDialog';
import StatusMessage from 'components/Controls/StatusMessage';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

function App() {
	return (
		<CssVarsProvider disableNestedContext>
			<CssBaseline />
			<div className="App">
				<AppProvider>
					<AppContent />
					<NoteDialog />
					<StatusMessage />
				</AppProvider>
			</div>
		</CssVarsProvider>
	);
}

function AppContent() {
	const { appSettings } = useContext(AppContext);
	return (
		<Box
			sx={{
				pl: 2,
				pr: 2,
				pb: 2,
				m: '0 auto',
				maxWidth: appSettings.appWidth,
			}}
		>
			<Controls />
			<NotesList />
		</Box>
	);
}

export default App;

