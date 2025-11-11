/**
 * CurrencyExchange – simple React Native app with three inputs and a button.
 *
 * @format
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';
import {
  Appbar,
  IconButton,
  List,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import SettingsScreen from './screens/SettingsScreen';
import UsersScreen from './screens/UsersScreen';
import createAppStyles, { DRAWER_WIDTH } from './styles/appStyles';

type RootStackParamList = {
  Users: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

enableScreens();

function App() {
  const systemPrefersDark = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemPrefersDark);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRoute, setCurrentRoute] =
    useState<keyof RootStackParamList>('Users');
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  const animateDrawer = useCallback(
    (open: boolean) => {
      setIsDrawerOpen(open);
      Animated.timing(drawerAnim, {
        toValue: open ? 0 : -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }).start();
    },
    [drawerAnim],
  );

  const openDrawer = useCallback(() => animateDrawer(true), [animateDrawer]);
  const closeDrawer = useCallback(() => animateDrawer(false), [animateDrawer]);

  const edgePanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          if (isDrawerOpen) {
            return false;
          }
          return gestureState.moveX <= 25 && gestureState.dx > 5;
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx > 60) {
            openDrawer();
          }
        },
      }),
    [isDrawerOpen, openDrawer],
  );

  const closePanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => isDrawerOpen,
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -40) {
            closeDrawer();
          }
        },
      }),
    [closeDrawer, isDrawerOpen],
  );

  const handleMenuSelect = useCallback(
    (item: DrawerItem) => {
      const target = item.target ?? 'Users';
      navigationRef.current?.navigate(target);
      closeDrawer();
    },
    [closeDrawer],
  );

  const handleStateChange = useCallback(() => {
    const routeName = navigationRef.current?.getCurrentRoute()?.name as
      | keyof RootStackParamList
      | undefined;
    if (routeName) {
      setCurrentRoute(routeName);
    }
  }, []);

  const handleBackToUsers = useCallback(() => {
    navigationRef.current?.navigate('Users');
  }, []);

  const currentTitle = currentRoute === 'Settings' ? '设置' : '用户';

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = useMemo(() => createAppStyles(theme), [theme]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.safeArea}
          edges={['top', 'right', 'bottom', 'left']}
        >
          <View style={styles.content} {...edgePanResponder.panHandlers}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Appbar.Header elevated style={styles.header}>
              {currentRoute === 'Settings' && (
                <Appbar.BackAction onPress={handleBackToUsers} />
              )}
              <Appbar.Content title={currentTitle} />
              <IconButton
                icon={isDarkMode ? 'white-balance-sunny' : 'weather-night'}
                onPress={toggleTheme}
                accessibilityLabel="切换主题"
              />
            </Appbar.Header>
            <GestureHandlerRootView style={styles.navigatorWrapper}>
              <NavigationContainer
                ref={navigationRef}
                onStateChange={handleStateChange}
              >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Users" component={UsersScreen} />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </GestureHandlerRootView>
            {isDrawerOpen && (
              <Pressable
                style={styles.overlay}
                onPress={closeDrawer}
                {...closePanResponder.panHandlers}
              />
            )}
            <Animated.View
              style={[
                styles.drawer,
                {
                  transform: [{ translateX: drawerAnim }],
                },
              ]}
            >
              <Text style={styles.drawerTitle}>菜单</Text>
              <List.Section>
                {DRAWER_ITEMS.map(item => (
                  <List.Item
                    key={item.label}
                    title={item.label}
                    style={styles.drawerItem}
                    left={props => <List.Icon {...props} icon={item.icon} />}
                    onPress={() => handleMenuSelect(item)}
                  />
                ))}
              </List.Section>
            </Animated.View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

type DrawerItem = {
  label: string;
  icon: string;
  target?: keyof RootStackParamList;
};

const DRAWER_ITEMS: DrawerItem[] = [
  { label: '用户', icon: 'account-circle', target: 'Users' },
  { label: '订单', icon: 'clipboard-list' },
  { label: '设置', icon: 'cog-outline', target: 'Settings' },
];

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007aff',
    background: '#f5f5f5',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4da3ff',
    background: '#1f1f24',
    surface: '#2b2b32',
    surfaceVariant: '#3a3a42',
    shadow: '#000',
  },
};

export default App;
