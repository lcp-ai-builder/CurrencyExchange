import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import createSettingsScreenStyles from './styles/SettingsScreenStyles';

// 设置页面暂时展示占位信息，但依旧遵循主题色彩，以便未来快速扩展
function SettingsScreen() {
  const theme = useTheme();
  // 每次主题变化时重新生成样式，确保背景与文字颜色匹配
  const styles = useMemo(
    () => createSettingsScreenStyles(theme),
    [theme],
  );

  return (
    <View style={styles.container}>
      {/* 此处可替换为真实的设置项列表 */}
      <Text style={styles.text}>设置页面内容敬请期待</Text>
    </View>
  );
}

export default SettingsScreen;
