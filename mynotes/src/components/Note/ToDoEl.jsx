import AppContext from 'contexts/AppContext';
import Checkbox from '@mui/joy/Checkbox';
import { useContext, useEffect, useState } from 'react';
import { editNote } from 'api/calls';

function ToDoEl({ isChecked, label }) {
	const [checked, setChecked] = useState(isChecked);
	const { currentNote, setCurrentNote, setApiStatus } = useContext(AppContext);

	useEffect(() => {
		setChecked(isChecked);
	}, [isChecked]);

	useEffect(() => {
		if (currentNote) {
			const { id, content } = currentNote;
			let todoContent = content;
			const checkIndex = todoContent.indexOf(label[1]) - 3;
			String.prototype.replaceAt = function (index, replacement) {
				return (
					this.substring(0, index) +
					replacement +
					this.substring(index + replacement.length)
				);
			};

			if (checked) {
				todoContent = todoContent.replaceAt(checkIndex, 'x');
			} else {
				todoContent = todoContent.replaceAt(checkIndex, ' ');
			}
			handleEditNote(id, todoContent);
		}
	}, [checked]);

	const handleEditNote = async (id, content) => {
		try {
			const response = await editNote(id, content);
			setApiStatus({ status: 'success', data: response.message });
		} catch (e) {
			setApiStatus({ status: 'error', data: e.message });
			console.log(e.message);
		} finally {
			setCurrentNote(null);
		}
	};

	const handleCheck = () => {
		setChecked(!checked);
	};

	return <li>{<Checkbox size="sm" checked={checked} label={label} onChange={handleCheck} />}</li>;
}

export default ToDoEl;
