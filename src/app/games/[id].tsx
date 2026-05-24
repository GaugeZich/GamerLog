import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppButton } from '../../components/AppButton';
import { theme } from '../../constants/theme';

// Mock para diseño
const GAME_MOCK = {
    name: 'Elden Ring',
    rating: 9.5,
    released: '2022-02-25',
    genres: [{ name: 'RPG' }, { name: 'Acción' }],
    platforms: [{ platform: { name: 'PC' } }, { platform: { name: 'PS5' } }],
    description_raw: 'Un RPG de mundo abierto con combate desafiante ambientado en las Tierras Intermedias, diseñado por Hidetaka Miyazaki y George R.R. Martin.',
};

export default function GameDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>◈</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{GAME_MOCK.name}</Text>

                <View style={styles.ratingRow}>
                    <Text style={styles.rating}>★ {GAME_MOCK.rating}</Text>
                    <Text style={styles.released}>{GAME_MOCK.released}</Text>
                </View>

                <View style={styles.tagsRow}>
                    {GAME_MOCK.genres.map(g => (
                        <View key={g.name} style={styles.tag}>
                            <Text style={styles.tagText}>{g.name}</Text>
                        </View>
                    ))}
                    {GAME_MOCK.platforms.map(p => (
                        <View key={p.platform.name} style={[styles.tag, styles.tagCyan]}>
                            <Text style={styles.tagTextCyan}>{p.platform.name}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.desc}>{GAME_MOCK.description_raw}</Text>

                <AppButton
                    label="Agregar a mi lista"
                    onPress={() =>
                        router.push({
                            pathname: '/mylist/review',
                            params: { gameId: String(id), gameName: GAME_MOCK.name },
                        })
                    }
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.neonDim,
    },
    placeholderIcon: { fontSize: 48, color: theme.colors.neon },
    content: { padding: theme.spacing.md, gap: theme.spacing.md },
    title: { color: theme.colors.neon, fontSize: theme.font.xl, fontWeight: '700' },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    rating: { color: theme.colors.neon, fontSize: theme.font.lg, fontWeight: '600' },
    released: { color: theme.colors.textMuted, fontSize: theme.font.sm },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs },
    tag: {
        backgroundColor: theme.colors.neonDim,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
    },
    tagCyan: { backgroundColor: theme.colors.cyanDim },
    tagText: { color: theme.colors.neon, fontSize: theme.font.xs, fontWeight: '500' },
    tagTextCyan: { color: theme.colors.cyan, fontSize: theme.font.xs, fontWeight: '500' },
    desc: { color: theme.colors.text, fontSize: theme.font.sm, lineHeight: 22 },
});