import React, { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles/HomeScreenStyles';

function HomeScreen() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState<string[] | null>(null);

  const placeholders = useMemo(
    () => ['请输入第一个值', '请输入第二个值', '请输入第三个值'],
    [],
  );

  const handleSubmit = () => {
    setSubmittedValues([firstValue, secondValue, thirdValue]);
  };

  return (
    <View style={styles.container}>
      {[firstValue, secondValue, thirdValue].map((value, index) => (
        <TextInput
          key={`input-${index}`}
          style={styles.input}
          placeholder={placeholders[index]}
          placeholderTextColor="#999"
          onChangeText={
            index === 0
              ? setFirstValue
              : index === 1
              ? setSecondValue
              : setThirdValue
          }
          value={value}
        />
      ))}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit}
        contentStyle={styles.buttonContent}>
        显示输入内容
      </Button>
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

export default HomeScreen;
