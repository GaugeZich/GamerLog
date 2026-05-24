import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AppButton } from '../../components/AppButton';
import { theme } from '../../constants/theme';

const ESTADOS = ['Jugando', 'Terminado', 'Pendiente', 'Abandonado'];

export default function ReviewScreen() {
    const { gameName } = useLocalSearchParams<{ gameName: string }>();

    // Estado local para diseño — en programación irá al hook useReviewForm
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('');
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleSubmit() {
        const e: Record<string, string> = {};
        if (score === 0) e.score = 'Seleccioná un puntaje';
        if (!status) e.status = 'Seleccioná un estado';
        if (!review.trim()) e.review = 'Escribí tu reseña';
        setErrors(e);
        if (Object.keys(e).length === 0) {
            Alert.alert('Diseño', 'En programación esto guardará la reseña.');
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.gameName}>{gameName ?? 'Nombre del juego'}</Text>

            <Text style={styles.label}>Tu puntaje</Text>
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <TouchableOpacity key={n} onPress={() => setScore(n)}>
                        <Text style={[styles.star, n <= score && styles.starActive]}>★</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {score > 0 && <Text style={styles.scoreLabel}>{score} / 10</Text>}
            {errors.score && <Text style={styles.error}>{errors.score}</Text>}

            <Text style={styles.label}>Estado</Text>
            <View style={styles.estadosRow}>
                {ESTADOS.map(e => (
                    <TouchableOpacity
                        key={e}
                        style={[styles.estadoBtn, status === e && styles.estadoActive]}
                        onPress={() => setStatus(e)}
                    >
                        <Text style={[styles.estadoText, status === e && styles.estadoTextActive]}>
                            {e}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {errors.status && <Text style={styles.error}>{errors.status}</Text>}

            <Text style={styles.label}>Tu reseña</Text>
            <TextInput
                style={[styles.input, errors.review ? styles.inputError : null]}
                placeholder="Escribí tu opinión sobre el juego..."
                placeholderTextColor={theme.colors.textMuted}
                multiline
                numberOfLines={4}
                value={review}
                onChangeText={setReview}
                textAlignVertical="top"
            />
            {errors.review && <Text style={styles.error}>{errors.review}</Text>}

            <AppButton label="Guardar reseña" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.md, gap: theme.spacing.md },
    gameName: { color: theme.colors.neon, fontSize: theme.font.xl, fontWeight: '700' },
    label: {
        color: theme.colors.textMuted,
        fontSize: theme.font.xs,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    starsRow: { flexDirection: 'row', gap: theme.spacing.xs },
    star: { fontSize: 26, color: theme.colors.border },
    starActive: { color: theme.colors.neon },
    scoreLabel: { color: theme.colors.neon, fontSize: theme.font.sm, fontWeight: '600' },
    estadosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
    estadoBtn: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    estadoActive: { backgroundColor: theme.colors.neon, borderColor: theme.colors.neon },
    estadoText: { color: theme.colors.textMuted, fontSize: theme.font.sm },
    estadoTextActive: { color: theme.colors.textDark, fontWeight: '600' },
    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        color: theme.colors.text,
        fontSize: theme.font.md,
        minHeight: 110,
    },
    inputError: { borderColor: theme.colors.error },
    error: { color: theme.colors.error, fontSize: theme.font.xs },
});