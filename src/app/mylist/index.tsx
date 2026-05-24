import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '../../components/EmptyState';
import { theme } from '../../constants/theme';

// Mock para diseño
const LIST_MOCK = [
    { gameId: '1', gameName: 'Elden Ring', score: 9, status: 'Terminado', review: 'Obra maestra del género.' },
    { gameId: '2', gameName: 'Hades II', score: 0, status: 'Jugando', review: '' },
    { gameId: '3', gameName: 'Forza Horizon 5', score: 8, status: 'Terminado', review: 'El mejor juego de carreras.' },
];

export default function MyListScreen() {
    const router = useRouter();

    if (!LIST_MOCK.length) {
        return <EmptyState message="Tu lista está vacía. Explorá juegos y agregá los que jugaste." icon="◻" />;
    }

    return (
        <FlatList
            data={LIST_MOCK}
            keyExtractor={(item) => item.gameId}
            style={styles.list}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardName}>{item.gameName}</Text>
                        {item.score > 0 ? (
                            <View style={styles.scoreBadge}>
                                <Text style={styles.scoreText}>★ {item.score}/10</Text>
                            </View>
                        ) : (
                            <View style={[styles.scoreBadge, styles.scoreBadgeMuted]}>
                                <Text style={styles.scoreTextMuted}>Sin puntuar</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.status}>{item.status}</Text>
                    {item.review ? (
                        <Text style={styles.review} numberOfLines={2}>"{item.review}"</Text>
                    ) : (
                        <Text style={styles.reviewEmpty}>Sin reseña aún</Text>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.md, gap: theme.spacing.sm },
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.cyan,
        gap: theme.spacing.xs,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardName: { color: theme.colors.text, fontSize: theme.font.md, fontWeight: '500', flex: 1 },
    scoreBadge: { backgroundColor: theme.colors.neonDim, borderRadius: theme.radius.sm, paddingHorizontal: theme.spacing.sm, paddingVertical: 2 },
    scoreBadgeMuted: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
    scoreText: { color: theme.colors.neon, fontSize: theme.font.xs, fontWeight: '600' },
    scoreTextMuted: { color: theme.colors.textMuted, fontSize: theme.font.xs },
    status: { color: theme.colors.cyan, fontSize: theme.font.xs, letterSpacing: 0.5 },
    review: { color: theme.colors.textMuted, fontSize: theme.font.sm, fontStyle: 'italic' },
    reviewEmpty: { color: theme.colors.border, fontSize: theme.font.sm },
});