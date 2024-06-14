import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentNote, setCurrentNote] = useState(null);
	const [apiStatus, setApiStatus] = useState({ status: '', data: '' });
	const [appSettings, setAppSettings] = useState({
		cols: 2,
		pinnedFirst: true,
		theme: 'system',
		appWidth: 'lg',
	});

	const openModal = (currentNote) => {
		setCurrentNote(currentNote);
		setDialogOpen(true);
	};

	const closeModal = () => {
		setDialogOpen(false);
		setCurrentNote(null);
	};
	return (
		<AppContext.Provider
			value={{
				dialogOpen,
				openModal,
				closeModal,
				notes,
				setNotes,
				filteredNotes,
				setFilteredNotes,
				currentNote,
				setCurrentNote,
				apiStatus,
				setApiStatus,
				appSettings,
				setAppSettings,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
