import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../components/AppButton';
import { theme } from '../../constants/theme';
import { getGameById } from '../../services/rawg.service';
import { Game } from '../../types/game';

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGameById(id).then(setGame).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.colors.neon} />
      </View>
    );
  }

  if (!game) return null;

  return (
    <ScrollView style={styles.container}>
      {game.background_image ? (
        <Image source={{ uri: game.background_image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}>◈</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{game.name}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>★ {game.rating}</Text>
          <Text style={styles.released}>{game.released}</Text>
        </View>

        <View style={styles.tagsRow}>
          {game.genres.map(g => (
            <View key={g.id} style={styles.tag}>
              <Text style={styles.tagText}>{g.name}</Text>
            </View>
          ))}
          {game.platforms.map(p => (
            <View key={p.platform.id} style={[styles.tag, styles.tagCyan]}>
              <Text style={styles.tagTextCyan}>{p.platform.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.desc}>{game.description_raw}</Text>

        <AppButton
          label="Agregar a mi lista"
          onPress={() =>
            router.push({
              pathname: '/mylist/review',
              params: {
                gameId: String(game.id),
                gameName: game.name,
                background_image: game.background_image ?? '',
              },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background },
  image: { width: '100%', height: 200 },
  imagePlaceholder: {
    width: '100%', height: 200, backgroundColor: theme.colors.surface,
    alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 1, borderBottomColor: theme.colors.neonDim,
  },
  placeholderIcon: { fontSize: 48, color: theme.colors.neon },
  content: { padding: theme.spacing.md, gap: theme.spacing.md },
  title: { color: theme.colors.neon, fontSize: theme.font.xl, fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  rating: { color: theme.colors.neon, fontSize: theme.font.lg, fontWeight: '600' },
  released: { color: theme.colors.textMuted, fontSize: theme.font.sm },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs },
  tag: { backgroundColor: theme.colors.neonDim, borderRadius: theme.radius.sm, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs },
  tagCyan: { backgroundColor: theme.colors.cyanDim },
  tagText: { color: theme.colors.neon, fontSize: theme.font.xs, fontWeight: '500' },
  tagTextCyan: { color: theme.colors.cyan, fontSize: theme.font.xs, fontWeight: '500' },
  desc: { color: theme.colors.text, fontSize: theme.font.sm, lineHeight: 22 },
});