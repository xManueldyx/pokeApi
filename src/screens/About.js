import { View, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";

export default function About() {
  const [pokemonName, setPokemonName] = useState(""); // Cadena vacía para iniciar la búsqueda
  const [pokemonData, setPokemonData] = useState(null); // Almacena los datos del Pokémon
  const [error, setError] = useState(""); // Almacena posibles errores

  const getPokemon = async (name) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await response.json();
      if (data) {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        setPokemonData({ ...data, description: speciesData.flavor_text_entries[0].flavor_text });
        setError(""); // Limpia el error si la búsqueda es exitosa
      }
    } catch (error) {
      setError("Error al obtener la información del Pokémon");
      setPokemonData(null); // Limpia los datos anteriores en caso de error
    }
  };

  const handleSearch = () => {
    if (pokemonName) {
      getPokemon(pokemonName);
    } else {
      setError("Por favor ingresa un nombre de Pokémon");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB", justifyContent: "center", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <View style={{ 
            width: 300, 
            backgroundColor: "#ffffff", // Fondo blanco de la tarjeta
            padding: 20, 
            borderRadius: 10, 
            elevation: 5, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4,
            borderColor: "#6BCB3A", // Color verde para simular hierba
            borderWidth: 3,
          }}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {pokemonData && pokemonData.sprites ? (
              <Image
                source={{ uri: pokemonData.sprites.front_default }}
                style={{ width: 150, height: 150 }}
              />
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={{ width: 150, height: 150 }}
              />
            )}
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#FFD700" }}>
            {pokemonData ? `¿Quién es ese Pokémon?` : "Nombre del Pokémon"}
          </Text>
          <TextInput
            placeholder="Buscar Pokémon"
            value={pokemonName}
            onChangeText={setPokemonName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              width: "100%",
              backgroundColor: "#f0f8ff", // Fondo del input
            }}
          />
          <Pressable
            onPress={handleSearch}
            style={{
              backgroundColor: "#ff3366", // Color del botón
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Buscar</Text>
          </Pressable>
          {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}

          {/* Mostrar tipos de Pokémon */}
          {pokemonData && pokemonData.types ? (
            <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>Tipo(s): </Text>
              {pokemonData.types.map((typeInfo, index) => (
                <Text key={index} style={{ backgroundColor: '#ffcc00', borderRadius: 5, padding: 5, marginVertical: 2, marginLeft: 5 }}>
                  {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                </Text>
              ))}
            </View>
          ) : null}

          {/* Mostrar habilidades */}
          {pokemonData && pokemonData.abilities ? (
            <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>Habilidades: </Text>
              {pokemonData.abilities.map((abilityInfo, index) => (
                <Text key={index} style={{ backgroundColor: '#b3e5fc', borderRadius: 5, padding: 5, marginVertical: 2, marginLeft: 5 }}>
                  {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
                </Text>
              ))}
            </View>
          ) : null}

          {/* Mostrar peso y altura */}
          {pokemonData && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>Peso: <Text>{(pokemonData.weight / 10).toFixed(1)} kg</Text></Text>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>Altura: <Text>{(pokemonData.height / 10).toFixed(1)} m</Text></Text>
            </View>
          )}

          {/* Mostrar descripción */}
          {pokemonData && pokemonData.description ? (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>Descripción:</Text>
              <Text style={{ fontStyle: "italic", marginTop: 5 }}>{pokemonData.description}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
