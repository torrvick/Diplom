const express = require('express');

const ld = require('lodash');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3003;
const DATABASE = 'notes.db';

const db = new sqlite3.Database(DATABASE, (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the SQLite database.');
		db.run(`
			CREATE TABLE IF NOT EXISTS notes (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				content TEXT,
				pin INTEGER DEFAULT (0) NOT NULL
      		)
    	`);
		db.run(`
			CREATE TABLE IF NOT EXISTS settings (
				param TEXT NOT NULL,
				value TEXT NOT NULL
			)
		`);
		// db.run(`
		// 	INSERT INTO settings (param,value) VALUES
		// 		('cols','2'),
		// 		('pinnedFirst','0'),
		// 		('theme','light'),
		// 		('appWidth','lg');
		// 	`);
		// db.run('DROP table settings');
	}
});

app.use(express.json());

app.get('/api/notes', (_req, res) => {
	db.all('SELECT * FROM notes ORDER BY id DESC', (err, rows) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json(rows);
		}
	});
});

app.get('/api/notes/:id', (req, res) => {
	const noteId = req.params.id;
	db.get('SELECT * FROM notes WHERE id = ?', [noteId], (err, row) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else if (row) {
			res.json(row);
		} else {
			res.status(404).json({ error: 'Заметка не найдена' });
		}
	});
});

app.post('/api/notes', (req, res) => {
	let { content } = req.body;
	content = content.replace(
		/```([\s\S]*?)```|([^`]+)(?=(?:[^`]*`[^`]*`)*[^`]*$)/g,
		(match, p1, p2) => {
			if (p1) {
				return match;
			} else {
				return ld.escape(p2);
			}
		}
	);
	db.run('INSERT INTO notes (content) VALUES (?)', [content], (err) => {
		if (err) {
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json({ message: 'Заметка успешно добавлена' });
		}
	});
});

app.put('/api/notes/:id/content', (req, res) => {
	const { content } = req.body;
	const id = req.params.id;
	db.run(`UPDATE notes SET content = ? WHERE id = ?`, [content, id], (err) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json({ message: 'Заметка успешно обновлена' });
		}
	});
});

app.put('/api/notes/:id/pin', (req, res) => {
	const { pin } = req.body;
	const id = req.params.id;
	db.run(`UPDATE notes SET pin = ? WHERE id = ?`, [pin, id], (err) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json({ message: `Заметка успешно ${pin ? 'закреплена' : 'откреплена'}` });
		}
	});
});

app.delete('/api/notes/:id', (req, res) => {
	const id = req.params.id;
	db.run('DELETE FROM notes WHERE id = ?', id, (err) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json({ message: 'Заметка успешно удалена' });
		}
	});
});

app.get('/api/settings', (_req, res) => {
	db.all('SELECT * FROM settings', (err, rows) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json(rows);
		}
	});
});

app.put('/api/settings/', (req, res) => {
	const { param, value } = req.body;
	db.run(`UPDATE settings SET value = ? WHERE param = ?`, [value, param], (err) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		} else {
			res.json({ message: 'Настройки сохранены' });
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

