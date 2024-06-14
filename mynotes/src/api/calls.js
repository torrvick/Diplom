const getNotes = async () => {
	try {
		const response = await fetch('/api/notes');
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		}
		return data;
	} catch (e) {
		throw new Error(e);
	}
};

const addNote = async (content) => {
	try {
		const response = await fetch('/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content }),
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		} else {
			return data;
		}
	} catch (e) {
		throw new Error(e);
	}
};

const editNote = async (id, content) => {
	try {
		const response = await fetch(`/api/notes/${id}/content`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content }),
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		} else {
			return data;
		}
	} catch (e) {
		throw new Error(e);
	}
};

const pinNote = async (id, pin) => {
	try {
		const response = await fetch(`/api/notes/${id}/pin`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ pin }),
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		} else {
			return data;
		}
	} catch (e) {
		throw new Error(e);
	}
};

const deleteNote = async (id) => {
	try {
		const response = await fetch('/api/notes/' + id, {
			method: 'DELETE',
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		} else {
			return data;
		}
	} catch (e) {
		throw new Error(e);
	}
};

const getSettings = async () => {
	try {
		const response = await fetch('/api/settings');
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		}
		return data;
	} catch (e) {
		throw new Error(e);
	}
};

const editSettings = async (param, value) => {
	try {
		const response = await fetch(`/api/settings`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ param, value }),
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Неизвестная ошибка');
		} else {
			return data;
		}
	} catch (e) {
		throw new Error(e);
	}
};

export { getNotes, addNote, editNote, pinNote, deleteNote, getSettings, editSettings };
