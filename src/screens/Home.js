import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";

export default function Home({ navigation }) {
  const [pokemonName, setPokemonName] = useState("");
  const [history, setHistory] = useState([]);

  const handleSearch = () => {
    if (pokemonName) {
      // Agregar al historial y navegar a la pantalla Principal
      setHistory((prev) => {
        const newHistory = [pokemonName, ...prev];
        return newHistory.slice(0, 10); // Limita el historial a 10 elementos
      });
      navigation.navigate("Principal", { pokemonName }); // Asegúrate de que "Principal" sea el nombre correcto
      setPokemonName(""); // Limpiar el input
    } else {
      alert("Por favor ingresa un nombre de Pokémon");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB", justifyContent: "center", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View style={{ 
            width: 300, 
            backgroundColor: "#ffffff", 
            padding: 20, 
            borderRadius: 10, 
            elevation: 5, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4,
            borderColor: "#000", 
            borderWidth: 5, 
            alignItems: "center" 
          }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#000", marginBottom: 20 }}>
            Buscar Pokémon
          </Text>
          <TextInput
            placeholder="Ingresa el nombre del Pokémon"
            value={pokemonName}
            onChangeText={setPokemonName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              backgroundColor: "#f0f8ff",
              width: "100%",
            }}
          />
          <Pressable
            onPress={handleSearch}
            style={{
              backgroundColor: "#ff3366",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Buscar</Text>
          </Pressable>

          <Text style={{ marginTop: 20 }}>Historial de Búsquedas:</Text>
          {history.length > 0 ? (
            history.map((item, index) => (
              <Text key={index} style={{ color: "#000" }}>{item}</Text>
            ))
          ) : (
            <Text style={{ color: "#aaa" }}>No hay búsquedas anteriores.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
