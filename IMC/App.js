import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [result1, setResult1] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateImc = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch(
        `http://172.16.7.11:3000/imc?peso=${peso}&altura=${altura}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult1(data.result1);
      } else {
        setError(data.error);
        setResult1(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult1(null);
    }
  };

  /*const getButtonStyle = (op) => {
    return operation === op ? styles.selectedButton : styles.button;
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IMC</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Altura"
        value={altura}
        onChangeText={setAltura}
      />


       

      <Button title="Calcular" onPress={handleCalculateImc} />

      {result1 !== null && <Text style={styles.result}>Resultado: {result1}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});