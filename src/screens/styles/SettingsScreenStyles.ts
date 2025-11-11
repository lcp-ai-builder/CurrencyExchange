import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

const createSettingsScreenStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: 18,
      color: theme.colors.onSurface,
    },
  });

export default createSettingsScreenStyles;
