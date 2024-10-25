import { View, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";

export default function About() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const typeColors = {
    fire: "#FF5733",
    water: "#33B5FF",
    grass: "#6BCB3A",
    electric: "#FFD700",
    ice: "#ADD8E6",
    fighting: "#C62828",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#FF80A0",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const getPokemon = async (name) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await response.json();
      if (data) {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const spanishDescription = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );

        setPokemonData({ 
          ...data, 
          description: spanishDescription ? spanishDescription.flavor_text : "Descripción no disponible en español",
          color: speciesData.color.name,
        });
        setError("");
      }
    } catch (error) {
      setError("Error al obtener la información del Pokémon");
      setPokemonData(null);
    }
  };

  const handleSearch = () => {
    if (pokemonName) {
      getPokemon(pokemonName);
    } else {
      setError("Por favor ingresa un nombre de Pokémon");
    }
  };

  const backgroundColor = pokemonData ? pokemonData.color : "#87CEEB";

  return (
    <View style={{ flex: 1, backgroundColor, justifyContent: "center", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          
          {/* Tarjeta de búsqueda */}
          <View style={{ 
              width: 300, // Ajustamos el ancho de ambas tarjetas
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
              marginRight: 20,
              alignItems: "center", // Centramos el contenido
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
                width: "100%" // Aseguramos que el TextInput ocupe todo el ancho
              }}
            />
            <Pressable
              onPress={handleSearch}
              style={{
                backgroundColor: "#ff3366",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                width: "100%", // Aseguramos que el botón ocupe todo el ancho
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Buscar</Text>
            </Pressable>
            {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
          </View>

          {/* Tarjeta de detalles del Pokémon */}
          {pokemonData && (
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
              }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: pokemonData.color || "#000", marginBottom: 10 }}>
                {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
              </Text>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                  source={{ uri: pokemonData.sprites.front_default }}
                  style={{ width: 150, height: 150 }}
                />
              </View>

              <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Tipo(s): </Text>
                {pokemonData.types.map((typeInfo, index) => (
                  <Text key={index} 
                    style={{ 
                      backgroundColor: typeColors[typeInfo.type.name] || '#ffcc00', 
                      borderRadius: 5, 
                      padding: 5, 
                      marginVertical: 2, 
                      marginLeft: 5,
                      color: "#000", 
                    }}>
                    {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                  </Text>
                ))}
              </View>

              <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Habilidades: </Text>
                {pokemonData.abilities.map((abilityInfo, index) => (
                  <Text key={index} 
                    style={{ 
                      backgroundColor: '#b3e5fc', 
                      borderRadius: 5, 
                      padding: 5, 
                      marginVertical: 2, 
                      marginLeft: 5,
                      color: "#000", 
                    }}>
                    {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
                  </Text>
                ))}
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Peso: <Text>{(pokemonData.weight / 10).toFixed(1)} kg</Text></Text>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Altura: <Text>{(pokemonData.height / 10).toFixed(1)} m</Text></Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Descripción:</Text>
                <Text style={{ fontStyle: "italic", marginTop: 5, color: "#000" }}>{pokemonData.description}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
