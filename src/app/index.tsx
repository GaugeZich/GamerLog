import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppButton } from '../components/AppButton';
import { theme } from '../constants/theme';

const RECENT_MOCK = [
    { id: '1', name: 'Elden Ring', score: 4.5, addedAgo: 'Agregado hace 2 días' },
    { id: '2', name: 'Hades II', score: 0, addedAgo: null },
    { id: '3', name: 'Left 4 Dead 2', score: 0, addedAgo: null },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
           
        <View style={styles.hero}>
           
            <Text style={styles.title}>GAMERLOG</Text>
            <Text style={styles.sub}>Tu biblioteca de juegos definitiva</Text>
        </View>
            <View style={styles.buttons}>
                <AppButton
                    label="Explorar juegos"
                    onPress={() => router.push('/games')}
                />
                <AppButton
                    label="Mi lista"
                    onPress={() => router.push('/mylist')}
                    variant="secondary"
                />
            </View>

            <View style={styles.recentBox}>
                <Text style={styles.recentTitle}>RECIENTE</Text>
                {RECENT_MOCK.map(item => (
                    <View key={item.id} style={styles.recentItem}>
                        <View style={styles.recentIcon}>
                            {/* podés poner la portada del juego acá con un Image */}
                        </View>
                        <View style={styles.recentInfo}>
                            <Text style={styles.recentName}>{item.name}</Text>
                            <Text style={styles.recentSub}>
                                {item.addedAgo ?? 'Sin puntuar'}
                            </Text>
                        </View>
                        <Text style={[styles.recentScore, item.score === 0 && styles.recentScoreMuted]}>
                            {item.score > 0 ? `★ ${item.score}` : '—'}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
        justifyContent: 'center',
        gap: theme.spacing.lg,
    },
    hero: {
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 16,
    },
    title: {
        color: theme.colors.neon,
        fontSize: theme.font.xxl,
        fontWeight: '700',
        letterSpacing: 6,
    },
    sub: {
        color: theme.colors.textMuted,
        fontSize: theme.font.sm,
        letterSpacing: 2,
    },
    buttons: {
        gap: theme.spacing.sm,
    },
    recentBox: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 0,
    },
    recentTitle: {
        color: theme.colors.textMuted,
        fontSize: theme.font.xs,
        letterSpacing: 3,
        fontWeight: '500',
        marginBottom: theme.spacing.sm,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    recentIcon: {
        width: 36,
        height: 36,
        backgroundColor: theme.colors.border,
        borderRadius: 8,
    },
    recentInfo: {
        flex: 1,
        gap: 2,
    },
    recentName: {
        color: theme.colors.text,
        fontSize: theme.font.sm,
        fontWeight: '500',
    },
    recentSub: {
        color: theme.colors.textMuted,
        fontSize: 11,
    },
    recentScore: {
        color: theme.colors.neon,
        fontSize: theme.font.sm,
        fontWeight: '600',
    },
    recentScoreMuted: {
        color: theme.colors.border,
    },
});