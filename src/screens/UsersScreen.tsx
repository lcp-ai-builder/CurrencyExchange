import React, { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import createUsersScreenStyles from './styles/UsersScreenStyles';

// “用户”页面展示输入表单与最近提交的内容，可视为示例数据录入界面
function UsersScreen() {
  const theme = useTheme();
  // 根据当前主题动态生成样式，保持明暗模式的视觉一致性
  const styles = useMemo(
    () => createUsersScreenStyles(theme),
    [theme],
  );
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState<string[] | null>(null);

  // 统一维护输入框的占位文案，便于未来拓展国际化
  const placeholders = useMemo(
    () => ['请输入第一个值', '请输入第二个值', '请输入第三个值'],
    [],
  );

  // 点击按钮后记录当前输入，供下方结果区域展示
  const handleSubmit = () => {
    setSubmittedValues([firstValue, secondValue, thirdValue]);
  };

  return (
    <View style={styles.container}>
      {/* 通过遍历数组一次性渲染三个输入框，避免重复模板代码 */}
      {[firstValue, secondValue, thirdValue].map((value, index) => (
        <TextInput
          key={`input-${index}`}
          style={styles.input}
          placeholder={placeholders[index]}
          placeholderTextColor={
            theme.colors.onSurfaceVariant ?? 'rgba(0,0,0,0.5)'
          }
          onChangeText={
            index === 0
              ? setFirstValue
              : index === 1
              ? setSecondValue
              : setThirdValue
          }
          value={value}
          selectionColor={theme.colors.primary}
        />
      ))}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit}
        contentStyle={styles.buttonContent}>
        显示输入内容
      </Button>
      {/* 当用户提交过数据时，渲染结果列表 */}
      {submittedValues && (
        <View style={styles.resultContainer}>
          {submittedValues.map((value, index) => (
            <Text key={`result-${index}`} style={styles.resultText}>
              {`输入${index + 1}：${value || '（空）'}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default UsersScreen;
