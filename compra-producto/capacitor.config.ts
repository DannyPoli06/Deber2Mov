import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'compra-producto',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 8000,
      launchAutoHide: true,
      launchFadeOutDuration: 200,
      backgroundColor: "#121212", 
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashImmersive: true
    }
  }
};

export default config;