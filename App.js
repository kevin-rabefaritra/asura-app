import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json';
import { FeatherIconsPack } from './feather-icons';
import AppNavigator from './components/screens/AppNavigator';


export default function App() {
  return (
    <>
      <IconRegistry icons={[FeatherIconsPack, EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <AppNavigator {...eva} />
      </ApplicationProvider>
    </>
  );
};