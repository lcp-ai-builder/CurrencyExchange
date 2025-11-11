import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import createSettingsScreenStyles from './styles/SettingsScreenStyles';

function SettingsScreen() {
  const theme = useTheme();
  const styles = useMemo(
    () => createSettingsScreenStyles(theme),
    [theme],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>设置页面内容敬请期待</Text>
    </View>
  );
}

export default SettingsScreen;
