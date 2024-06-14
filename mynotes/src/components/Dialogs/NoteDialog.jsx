import { useContext, useState, useEffect, useRef } from 'react';
import AppContext from 'contexts/AppContext';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import ModalDialog from '@mui/joy/ModalDialog';
import { addNote, editNote } from 'api/calls';

function NoteDialog() {
	const { dialogOpen, closeModal, currentNote, setApiStatus } = useContext(AppContext);
	const { id, content } = currentNote || { id: '', content: '' };
	const editMode = !!id;
	const [noteContent, setNoteContent] = useState('');
	const textareaRef = useRef(null);

	textareaRef.current?.focus();

	useEffect(() => {
		setNoteContent(content || '');
	}, [currentNote]);

	const handleAddNote = async (content) => {
		try {
			const response = await addNote(content);
			setApiStatus({ status: 'success', data: response.message });
		} catch (e) {
			setApiStatus({ status: 'error', data: e.message });
			console.log(e.message);
		}
	};

	const handleEditNote = async (id, content) => {
		try {
			const response = await editNote(id, content);
			setApiStatus({ status: 'success', data: response.message });
		} catch (e) {
			setApiStatus({ status: 'error', data: e.message });
			console.log(e.message);
		}
	};

	return (
		<Modal open={dialogOpen} onClose={() => closeModal()}>
			<ModalDialog sx={{ width: '90vw', maxWidth: 'md' }}>
				<DialogTitle>
					{editMode ? 'Редактирование заметки' : 'Добавление заметки'}
				</DialogTitle>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						editMode ? handleEditNote(id, noteContent) : handleAddNote(noteContent);
						closeModal();
					}}
				>
					<Stack spacing={2}>
						<FormControl>
							<Textarea
								value={noteContent}
								placeholder="Нужно не забыть, что..."
								slotProps={{ textarea: { ref: textareaRef } }}
								onChange={(e) => {
									setNoteContent(e.target.value);
								}}
								sx={{ fontFamily: 'Monospace' }}
								minRows={5}
								maxRows={30}
								required
							/>
						</FormControl>
						<Button type="submit">Сохранить</Button>
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
}

export default NoteDialog;
