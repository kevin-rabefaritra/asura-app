import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as defaultTheme } from './theme.json';
import { default as mapping } from './mapping.json';
import { FeatherIconsPack } from './feather-icons';
import AppNavigator from './components/screens/AppNavigator';
import { ThemeContext } from './components/theme-context';
import { getPreference, savePreference } from './components/services/PreferenceServices';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf')
  });
};

export default function App() {

  const [theme, setTheme] = React.useState('light');
  const [loaded, setLoaded] = React.useState(false);

  // Set the applyTheme() implementation (will be passed by Provider)
  const applyTheme = (value) => {
    setTheme(value);
    savePreference('theme', value);
  }

  // Load the current theme from preferences (default light)
  getPreference('theme', 'light').then((result) => {
    applyTheme(result);
  });

  React.useEffect(() => {
    async function loadApp() {
      await loadFonts();
      setLoaded(true);
    }
    loadApp();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[FeatherIconsPack, EvaIconsPack]} />
      <ThemeContext.Provider value={{ theme, applyTheme }}>
        <ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}} customMapping={mapping}>
          <AppNavigator {...eva} />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};