import Snackbar from '@mui/joy/Snackbar';
import AppContext from 'contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

function StatusMessage() {
	const [open, setOpen] = useState(false);
	const { apiStatus } = useContext(AppContext);
	const { status, data } = apiStatus;

	useEffect(() => {
		if (status) {
			setOpen(true);
		}
	}, [apiStatus]);

	return (
		<Snackbar
			autoHideDuration={1000}
			open={open}
			variant="solid"
			size="lg"
			color={status === 'success' ? 'success' : 'danger'}
			onClose={(_event, reason) => {
				if (reason === 'clickaway') {
					return;
				}
				setOpen(false);
			}}
			sx={{ justifyContent: 'center' }}
		>
			{data}
		</Snackbar>
	);
}

export default StatusMessage;
