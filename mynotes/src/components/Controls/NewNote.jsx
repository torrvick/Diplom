import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/MapsUgcOutlined';
import React, { useContext } from 'react';
import AppContext from 'contexts/AppContext';

function NewNote() {
	const { openModal } = useContext(AppContext);
	return (
		<>
			<IconButton onClick={() => openModal()} color="success" size="lg">
				<AddIcon sx={{ fontSize: 32 }} />
			</IconButton>
		</>
	);
}

export default NewNote;
