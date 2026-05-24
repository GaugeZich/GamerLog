import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppButton } from '../components/AppButton';
import { theme } from '../constants/theme';

// Datos de actividad reciente — mock para diseño
const RECENT_MOCK = [
    { id: '1', name: 'Elden Ring', score: 9 },
    { id: '2', name: 'Hades II', score: 0 },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={styles.logo}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="12vh" viewBox="0 -960 960 960" width="12vh" fill="#00ff88"><path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm510.5-165.5Q720-463 720-480t-11.5-28.5Q697-520 680-520t-28.5 11.5Q640-497 640-480t11.5 28.5Q663-440 680-440t28.5-11.5Zm-80-120Q640-583 640-600t-11.5-28.5Q617-640 600-640t-28.5 11.5Q560-617 560-600t11.5 28.5Q583-560 600-560t28.5-11.5ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z"/></svg>
                </Text>
                <Text style={styles.title}>GAMERLOG</Text>
                <Text style={styles.sub}>Tu historial gamer personal</Text>
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
                        <Text style={styles.recentName}>{item.name}</Text>
                        <Text style={styles.recentScore}>
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
        fontSize: 48,
        color: theme.colors.neon,
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
        letterSpacing: 1,
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
        gap: theme.spacing.sm,
    },
    recentTitle: {
        color: theme.colors.textMuted,
        fontSize: theme.font.xs,
        letterSpacing: 2,
        fontWeight: '500',
    },
    recentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.xs,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    recentName: {
        color: theme.colors.text,
        fontSize: theme.font.sm,
    },
    recentScore: {
        color: theme.colors.neon,
        fontSize: theme.font.sm,
        fontWeight: '600',
    },
});