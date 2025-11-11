/**
 * CurrencyExchange – simple React Native app with three inputs and a button.
 *
 * @format
 */

import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Currency Exchange</Text>
      </View>
      <CurrencyExchangeForm />
    </SafeAreaView>
  );
}

function CurrencyExchangeForm() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState<string[] | null>(null);

  const hasSubmitted = submittedValues !== null;

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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>显示输入内容</Text>
      </Pressable>
      {hasSubmitted && submittedValues && (
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default App;
