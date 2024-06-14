import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import AppContext from 'contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

function Search() {
	const { notes, setFilteredNotes, setCurrentNote } = useContext(AppContext);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (searchValue.length > 0) {
			const filteredNotes = notes.filter((note) =>
				note.content.toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilteredNotes(filteredNotes);
		} else {
			setFilteredNotes(null);
		}
	}, [searchValue, notes]);

	return (
		<Input
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			onFocus={() => setCurrentNote(null)}
			sx={{ width: '50%' }}
			endDecorator={<SearchIcon />}
			placeholder="Поиск"
		/>
	);
}

export default Search;
