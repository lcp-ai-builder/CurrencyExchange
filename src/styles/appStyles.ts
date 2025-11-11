import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const DRAWER_WIDTH = 260;

const createAppStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
      zIndex: 1,
    },
    navigatorWrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.dark
        ? 'rgba(0,0,0,0.55)'
        : 'rgba(0,0,0,0.25)',
    },
    drawer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: DRAWER_WIDTH,
      backgroundColor: theme.colors.surface,
      paddingTop: 80,
      paddingHorizontal: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 5,
    },
    drawerTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    drawerItem: {
      paddingVertical: 4,
    },
  });

export default createAppStyles;
