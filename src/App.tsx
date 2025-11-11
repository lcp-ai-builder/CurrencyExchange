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

// 定义导航堆栈可用的页面与参数，用于类型安全的跳转
type RootStackParamList = {
  Users: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 启用原生屏幕组件，减少导航栈的额外开销
enableScreens();

function App() {
  // 根据系统偏好初始化主题，并维护一系列 UI 状态（主题、抽屉开关、当前路由）
  const systemPrefersDark = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemPrefersDark);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRoute, setCurrentRoute] =
    useState<keyof RootStackParamList>('Users');
  // drawerAnim 控制抽屉在 X 轴的平移，实现平滑开关
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  // navigationRef 允许在 Appbar、抽屉等非屏幕组件内部执行导航操作
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  // 将抽屉的开关逻辑抽离，方便按钮、手势等复用
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

  // 监听屏幕左缘的轻扫手势，拉出抽屉
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

  // 抽屉区域内的手势，向左滑动可收起抽屉
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

  // 点击抽屉菜单时跳转对应页面
  const handleMenuSelect = useCallback(
    (item: DrawerItem) => {
      const target = item.target ?? 'Users';
      navigationRef.current?.navigate(target);
      closeDrawer();
    },
    [closeDrawer],
  );

  // 每当导航栈变化时更新 currentRoute，驱动标题与返回按钮
  const handleStateChange = useCallback(() => {
    const routeName = navigationRef.current?.getCurrentRoute()?.name as
      | keyof RootStackParamList
      | undefined;
    if (routeName) {
      setCurrentRoute(routeName);
    }
  }, []);

  // 设置页左上角返回键回到用户列表
  const handleBackToUsers = useCallback(() => {
    navigationRef.current?.navigate('Users');
  }, []);

  // 根据当前路由动态设置 Appbar 标题
  const currentTitle = currentRoute === 'Settings' ? '设置' : '用户';

  // 用户触发图标按钮后切换主题
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // theme 由 Paper 提供，styles 使用当前 theme 即时生成，保障颜色一致
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
              {/* 抽屉顶部标题 */}
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

// 侧边菜单的静态数据，方便未来继续扩展
const DRAWER_ITEMS: DrawerItem[] = [
  { label: '用户', icon: 'account-circle', target: 'Users' },
  { label: '订单', icon: 'clipboard-list' },
  { label: '设置', icon: 'cog-outline', target: 'Settings' },
];

// 浅色主题在 Material3 的基础上强化品牌主色与背景，对齐产品设计
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007aff',
    background: '#f5f5f5',
  },
};

// 深色主题整体稍亮，避免 OLED 纯黑导致文字难读
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
