import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.klameet.app',
  appName: 'kla-meet',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;