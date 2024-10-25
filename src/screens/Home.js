import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDogImage = async () => {
    setLoading(true); // Establecemos el estado de carga en verdadero
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    } finally {
      setLoading(false); // Terminamos la carga
    }
  };

  useEffect(() => {
    fetchDogImage(); // Cargar una imagen al montar el componente
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Home</Text>
      <View style={styles.card}>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <>
            <Image source={{ uri: dogImage }} style={styles.image} />
            <TouchableOpacity style={styles.button} onPress={fetchDogImage}>
              <Text style={styles.buttonText}>Cargar otra imagen</Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
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
