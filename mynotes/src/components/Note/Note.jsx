import Card from '@mui/joy/Card';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import renderers from './renderers';
import NoteMenu from './NoteMenu';
import AppContext from 'contexts/AppContext';
import { useState, useContext } from 'react';

function Note({ note }) {
	const { id, content, pin } = note;
	const extractContent = (content) => {
		const match = content.match(/^#\s*(.+)\n/);
		if (match) {
			return [match[1], content.slice(match[0].length)];
		}
		return [`Заметка #${id}`, content];
	};

	const [noteTitle, noteContent] = extractContent(content);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { setCurrentNote } = useContext(AppContext);

	return (
		<Card
			size="sm"
			sx={{
				'--Card-padding': '16px',
				'&:hover': { boxShadow: '0px 0px 8px 1px #afafafde' },
				filter: isMenuOpen ? 'blur(5px) brightness(0.5)' : 'none',
			}}
			onClick={() => setCurrentNote(note)}
		>
			{pin ? (
				<Badge
					badgeContent={''}
					size="lg"
					sx={{
						position: 'absolute',
						top: 3,
						left: '50%',
					}}
				></Badge>
			) : (
				''
			)}

			<Typography level="title-lg">{noteTitle}</Typography>
			<NoteMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} note={note}></NoteMenu>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkBreaks]}
				children={noteContent}
				components={renderers}
			/>
		</Card>
	);
}

export default Note;
