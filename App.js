import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as defaultTheme } from './theme.json';
import { default as mapping } from './mapping.json';
import { FeatherIconsPack } from './feather-icons';
import AppNavigator from './components/screens/AppNavigator';
import { DefaultContext } from './components/default-context';
import * as PreferenceServices  from './components/services/PreferenceServices';
import * as Font from 'expo-font';
import User from './components/models/User';
import { initDatabase } from './components/services/DatabaseServices';

// Fonts
const loadFonts = async () => {
	await Font.loadAsync({
		'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
		'PixeloidSans': require('./assets/fonts/PixeloidSans-mLxMm.ttf')
	});
};

// Default App
export default function App() {

	// App theme (light, dark)
	const [theme, setTheme] = React.useState('light');

	// Font loading state
	const [loaded, setLoaded] = React.useState(false);

	// Store user info in memory
	const [user, setUser] = React.useState(null);

	// Set the applyTheme() implementation (will be passed by Provider)
	const applyTheme = (value) => {
		setTheme(value);
		PreferenceServices.savePreference(PreferenceServices.THEME, value);
	}

	// Update the user info
	const updateUser = (user) => {
		setUser(user);
		if (user) {
			PreferenceServices.savePreference(PreferenceServices.UUID, user.uuid);
		}
		else {
			PreferenceServices.removePreference([PreferenceServices.UUID]);
		}
	}

	const init = async () => {
		await initDatabase();
		await loadFonts();
		setLoaded(true);
	};

  	// Load the current theme from preferences (default light)
	PreferenceServices.getPreference(PreferenceServices.THEME, 'light').then((result) => {
		applyTheme(result);
	});

	// Check if there is any user already signed in
	PreferenceServices.getPreference(PreferenceServices.UUID, null).then((uuid) => {
		if (user === null && uuid !== null) {
			Promise.all([
				PreferenceServices.getPreference(PreferenceServices.USERNAME, null),
				PreferenceServices.getPreference(PreferenceServices.NAME, null),
				PreferenceServices.getPreference(PreferenceServices.EMAIL, null)
			]).then((response) => {
				const [firstName, lastName] = response[1].split(";");
				const user = new User(response[0], uuid, firstName, lastName, response[2]);
				setUser(user);
			})
		}
	});

	// Load fonts
	React.useEffect(() => {
		init();
	}, []);

	// Return null if the fonts haven't loaded yet
	if (!loaded) {
		return null;
	}

	return (
		<>
			<IconRegistry icons={[FeatherIconsPack, EvaIconsPack]} />
			<DefaultContext.Provider value={{ theme, applyTheme, user, updateUser }}>
				<ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}} customMapping={mapping}>
					<AppNavigator {...eva} />
				</ApplicationProvider>
			</DefaultContext.Provider>
		</>
	);
};