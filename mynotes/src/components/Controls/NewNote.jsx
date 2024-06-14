import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/MapsUgcOutlined';
import React, { useContext } from 'react';
import AppContext from 'contexts/AppContext';
import NoteDialog from '../Dialogs/NoteDialog';
import Modal from '@mui/joy/Modal';

function NewNote() {
	const { openModal } = useContext(AppContext);
	return (
		<>
			<IconButton onClick={() => openModal()} color="success" size="lg">
				<AddIcon sx={{ fontSize: 32 }} />
			</IconButton>
			{/* <NoteDialog /> */}
		</>
	);
}

export default NewNote;
