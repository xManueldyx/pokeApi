import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const pokemonList = [
  {
    name: "Bulbasaur",
    types: ["grass", "poison"],
    weight: 6.9,
    height: 0.7,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    name: "Ivysaur",
    types: ["grass", "poison"],
    weight: 13.0,
    height: 1.0,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  {
    name: "Venusaur",
    types: ["grass", "poison"],
    weight: 100.0,
    height: 2.0,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  },
  {
    name: "Charmander",
    types: ["fire"],
    weight: 8.5,
    height: 0.6,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    name: "Charmeleon",
    types: ["fire"],
    weight: 19.0,
    height: 1.1,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  },
  {
    name: "Charizard",
    types: ["fire", "flying"],
    weight: 90.5,
    height: 1.7,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
  {
    name: "Squirtle",
    types: ["water"],
    weight: 9.0,
    height: 0.5,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  {
    name: "Wartortle",
    types: ["water"],
    weight: 22.5,
    height: 1.0,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  },
  {
    name: "Blastoise",
    types: ["water"],
    weight: 85.5,
    height: 1.6,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  },
  {
    name: "Caterpie",
    types: ["bug"],
    weight: 3.2,
    height: 0.3,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  },
];

export default function PokemonCards() {
  const typeColors = {
    grass: "#6BCB3A",
    poison: "#A040A0",
    fire: "#FF5733",
    flying: "#A890F0",
    water: "#33B5FF",
    bug: "#A8B820",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB", padding: 20 }}>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {pokemonList.map((pokemon, index) => (
            <View key={index} style={{
              width: "30%", // Ajustar el ancho para que quepan tres tarjetas en la fila
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
              marginBottom: 15,
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
                {pokemon.name}
              </Text>
              <Image
                source={{ uri: pokemon.sprite }}
                style={{ width: 100, height: 100, marginBottom: 10 }} // Tamaño ajustado
              />
              <Text style={{ fontWeight: "bold" }}>Tipo(s): </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
                {pokemon.types.map((type, idx) => (
                  <Text key={idx}
                    style={{
                      backgroundColor: typeColors[type] || '#ffcc00',
                      borderRadius: 5,
                      padding: 5,
                      marginVertical: 2,
                      marginLeft: 5,
                      color: "#000",
                    }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                ))}
              </View>
              <Text style={{ fontWeight: "bold" }}>Peso: {pokemon.weight} kg</Text>
              <Text style={{ fontWeight: "bold" }}>Altura: {pokemon.height} m</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
