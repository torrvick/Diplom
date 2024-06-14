import IconButton from '@mui/joy/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Fragment, useContext, useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import AppContext from 'contexts/AppContext';
import { useColorScheme } from '@mui/joy/styles';
import { getSettings, editSettings } from 'api/calls';

function Settings() {
	const [open, setOpen] = useState(false);
	const { appSettings, setAppSettings } = useContext(AppContext);

	const { setMode } = useColorScheme();

	useEffect(() => {
		fetchSettings();
	}, []);

	useEffect(() => {
		setMode(appSettings.theme);
	}, [appSettings.theme]);

	const fetchSettings = async () => {
		try {
			const settings = await getSettings();
			const newSettings = settings.reduce((acc, obj) => {
				acc[obj.param] = +obj.value || convertToNumber(obj.value);
				return acc;
			}, {});
			setAppSettings(newSettings);
		} catch (e) {
			console.error('Ошибка при получении заметок:', e.message);
		}
	};

	const convertToNumber = (value) => {
		if (value === '1' || value === 'true') {
			return true;
		} else if (value === '0' || value === 'false') {
			return false;
		} else {
			return value;
		}
	};

	const handleEditSettings = async (param, value) => {
		try {
			await editSettings(param, value);
		} catch (e) {
			console.log(e.message);
		} finally {
			setAppSettings((sets) => ({ ...sets, [param]: value }));
		}
	};

	return (
		<Fragment>
			<IconButton color="primary" size="lg" onClick={() => setOpen(!open)}>
				<SettingsOutlinedIcon sx={{ fontSize: 32 }} />
			</IconButton>

			<Drawer
				open={open}
				onClose={() => setOpen(false)}
				slotProps={{
					content: {
						sx: {
							bgcolor: 'transparent',
							p: { md: 3, sm: 0 },
							boxShadow: 'none',
							maxWidth: '480px',
						},
					},
				}}
			>
				<Sheet
					sx={{
						borderRadius: 'md',
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						height: '100%',
						overflow: 'hidden',
					}}
				>
					<DialogTitle>Настройки</DialogTitle>
					<ModalClose />
					<Divider sx={{ mt: 'auto' }} />
					<DialogContent sx={{ gap: 4 }}>
						<FormControl sx={{ overflow: 'hidden' }}>
							<Typography level="title-md" fontWeight="bold">
								Количество колонок
							</Typography>
							<RadioGroup
								sx={{ pl: 2 }}
								value={appSettings.cols}
								onChange={(e) => handleEditSettings('cols', e.target.value)}
							>
								<Radio value="1" label="1" />
								<Radio value="2" label="2" />
								<Radio value="3" label="3" />
							</RadioGroup>
						</FormControl>

						<FormControl orientation="horizontal" sx={{ overflow: 'hidden' }}>
							<Box sx={{ flex: 1 }}>
								<Typography level="title-md" fontWeight="bold">
									Избранные заметки сверху
								</Typography>
							</Box>
							<Switch
								checked={!!appSettings.pinnedFirst}
								onChange={(e) =>
									handleEditSettings('pinnedFirst', e.target.checked)
								}
							/>
						</FormControl>

						<FormControl sx={{ overflow: 'hidden' }}>
							<Typography level="title-md" fontWeight="bold">
								Тема приложения
							</Typography>
							<RadioGroup
								sx={{ pl: 2 }}
								value={appSettings.theme}
								onChange={(e) => {
									handleEditSettings('theme', e.target.value);
									setMode(e.target.value);
								}}
							>
								<Radio value="light" label="Светлая" />
								<Radio value="dark" label="Темная" />
								<Radio value="system" label="Системная" />
							</RadioGroup>
						</FormControl>

						<FormControl sx={{ overflow: 'hidden' }}>
							<Typography level="title-md" fontWeight="bold">
								Размер рабочей области
							</Typography>
							<RadioGroup
								sx={{ pl: 2 }}
								value={appSettings.appWidth}
								onChange={(e) => handleEditSettings('appWidth', e.target.value)}
							>
								<Radio value="md" label="Маленький" />
								<Radio value="lg" label="Средний" />
								<Radio value="100%" label="Вся ширина" />
							</RadioGroup>
						</FormControl>
					</DialogContent>
				</Sheet>
			</Drawer>
		</Fragment>
	);
}

export default Settings;
