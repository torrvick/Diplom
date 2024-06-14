import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import PinIcon from '@mui/icons-material/BookmarkAddOutlined';
import UnPinIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import AppContext from 'contexts/AppContext';
import { useContext } from 'react';
import { deleteNote, pinNote } from 'api/calls';

function NoteMenu({ isMenuOpen, setIsMenuOpen, note }) {
	const { openModal, setApiStatus, setCurrentNote } = useContext(AppContext);

	const handlePinToggle = async (id, pin) => {
		try {
			const response = await pinNote(id, pin);
			setApiStatus({ status: 'success', data: response.message });
		} catch (e) {
			setApiStatus({ status: 'error', data: e.message });
			console.log(e.message);
		} finally {
			setCurrentNote(null);
		}
	};

	const handleDeleteNote = async (id) => {
		try {
			const response = await deleteNote(id);
			setApiStatus({ status: 'success', data: response.message });
		} catch (e) {
			setApiStatus({ status: 'error', data: e.message });
			console.log(e.message);
		} finally {
			setCurrentNote(null);
		}
	};

	return (
		<Dropdown
			open={isMenuOpen}
			onOpenChange={(_, isMenuOpen) => {
				setIsMenuOpen(isMenuOpen);
			}}
		>
			<MenuButton
				slots={{ root: IconButton }}
				sx={{
					position: 'absolute',
					top: '0.5rem',
					right: '0.5rem',
				}}
			>
				<MoreVert sx={{ fontSize: 18 }} />
			</MenuButton>
			<Menu
				placement="left"
				size="sm"
				sx={{
					'--List-padding': '0.25rem',
					'--ListItem-radius': '5px',
					'--List-display': 'flex',
					flexDirection: 'row',
				}}
				slotProps={{ fontSize: 18 }}
			>
				<MenuItem onClick={() => openModal(note)}>
					<EditIcon />
				</MenuItem>
				<MenuItem onClick={() => handlePinToggle(note.id, !note.pin)}>
					{note.pin ? <UnPinIcon /> : <PinIcon />}
				</MenuItem>

				<MenuItem onClick={() => handleDeleteNote(note.id)} variant="soft" color="danger">
					<DeleteIcon />
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}

export default NoteMenu;
