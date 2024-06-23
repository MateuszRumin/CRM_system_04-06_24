import { ButtonTopBar } from '../ButtonTopBar/ButtonTopBar'
import settings from '../../assets/TopBarIcons/settings.svg'

export const Settings = () => {
	return (
		<>
			<ButtonTopBar src={settings} alt="ikona ustawień" onClick={() => console.log('Settings')} />
		</>
	)
}
