import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as defaultTheme } from './theme.json';
import { FeatherIconsPack } from './feather-icons';
import AppNavigator from './components/screens/AppNavigator';
import { ThemeContext } from './components/theme-context';
import { getPreference, savePreference } from './components/services/PreferenceServices';

export default function App() {

  const [theme, setTheme] = React.useState('light');

  // Set the applyTheme() implementation (will be passed by Provider)
  const applyTheme = (value) => {
    setTheme(value);
    savePreference('theme', value);
  }

  // Load the current theme from preferences (default light)
  getPreference('theme', 'light').then((result) => {
    applyTheme(result);
  });

  return (
    <>
      <IconRegistry icons={[FeatherIconsPack, EvaIconsPack]} />
      <ThemeContext.Provider value={{ theme, applyTheme }}>
        <ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}}>
          <AppNavigator {...eva} />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};