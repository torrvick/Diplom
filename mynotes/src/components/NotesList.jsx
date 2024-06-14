import Masonry from '@mui/lab/Masonry';
import Box from '@mui/joy/Box';
import Note from './Note/Note';
import AppContext from 'contexts/AppContext';
import { getNotes } from 'api/calls';
import { useState, useEffect, useContext } from 'react';

function NotesList() {
	const { apiStatus, notes, setNotes, filteredNotes, appSettings } = useContext(AppContext);
	const [resultNotes, setResultNotes] = useState([]);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const data = await getNotes();
				setNotes(data);
			} catch (e) {
				console.error('Ошибка при получении заметок:', e.message);
			}
		};

		fetchNotes();
	}, [apiStatus]);

	useEffect(() => {
		if (filteredNotes) {
			setResultNotes(filteredNotes);
			return;
		}

		if (appSettings.pinnedFirst) {
			const pinedNotes = notes.filter((note) => note.pin);
			const unPinedNotes = notes.filter((note) => !note.pin);
			const sortedNotes = [...pinedNotes, ...unPinedNotes];
			setResultNotes(sortedNotes);
			return;
		}
		setResultNotes(notes);
	}, [filteredNotes, notes, appSettings.pinnedFirst]);

	return (
		<Box pt={2}>
			<Masonry columns={appSettings.cols} spacing={2} sx={{ margin: 0 }}>
				{resultNotes.map((note) => {
					return <Note key={note.id} note={note}></Note>;
				})}
			</Masonry>
		</Box>
	);
}

export default NotesList;
