/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
export default function Main() {
    return (
      
      <PaperProvider>
        <ApplicationProvider {...eva} theme={{...eva.light,...theme}}>
        <App />
        </ApplicationProvider>
      </PaperProvider>
      
     );
  }

AppRegistry.registerComponent(appName, () => Main);
