import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Principal() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true); // Establecemos el estado de carga en verdadero
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false); // Terminamos la carga
    }
  };

  useEffect(() => {
    fetchJoke(); // Cargar un chiste al montar el componente
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Principal</Text>
      <View style={styles.card}>
        {loading ? (
          <Text>Cargando chiste...</Text>
        ) : (
          <>
            <Text style={styles.jokeText}>{joke}</Text>
            <TouchableOpacity style={styles.button} onPress={fetchJoke}>
              <Text style={styles.buttonText}>Cargar otro chiste</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

// Estilos
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Sombra en Android
  },
  jokeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};
