import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

const createUsersScreenStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.colors.background,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant ?? theme.colors.outline,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: theme.colors.surface,
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    button: {
      marginTop: 4,
      borderRadius: 8,
    },
    buttonContent: {
      paddingVertical: 8,
    },
    resultContainer: {
      marginTop: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      padding: 16,
    },
    resultText: {
      fontSize: 16,
      color: theme.colors.onSurface,
      marginBottom: 8,
    },
  });

export default createUsersScreenStyles;
