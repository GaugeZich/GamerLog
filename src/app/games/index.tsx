import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { GameCard } from '../../components/GameCard';
import { getGames } from '../../services/rawn.service';
import { Game } from '../../types/game';
import { theme } from '../../constants/theme';

export default function GamesScreen() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  // Recarga cuando cambia el texto de búsqueda (con debounce simple)
  useEffect(() => {
    const timeout = setTimeout(() => loadGames(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  async function loadGames(query?: string) {
    setLoading(true);
    try {
      const data = await getGames(query);
      setGames(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar juego..."
        placeholderTextColor={theme.colors.textMuted}
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={theme.colors.neon} />
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => String(item.id)}
          style={styles.list}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => (
            <GameCard
              game={item}
              onPress={() => router.push(`/games/${item.id}`)}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingTop: theme.spacing.md, paddingBottom: theme.spacing.xl },
  searchInput: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    margin: theme.spacing.md,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: theme.font.md,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background },
});