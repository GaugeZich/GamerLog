import { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { EmptyState } from '../../components/EmptyState';
import { getSavedGames, removeGame } from '../../services/storage.service';
import { SavedGame } from '../../types/game';
import { theme } from '../../constants/theme';

export default function MyListScreen() {
  const router = useRouter();

  const [list, setList] = useState<SavedGame[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      getSavedGames().then(setList);
    }, [])
  );

  if (!list.length) {
    return (
      <EmptyState
        message="Tu lista está vacía. Explorá juegos y agregá los que jugaste."
        icon="◻"
      />
    );
  }

  return (
    <>
      <FlatList
        data={list}
        keyExtractor={(item) => item.gameId}
        style={styles.list}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{item.gameName}</Text>

              {item.score > 0 ? (
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>★ {item.score}/5</Text>
                </View>
              ) : (
                <View style={[styles.scoreBadge, styles.scoreBadgeMuted]}>
                  <Text style={styles.scoreTextMuted}>Sin puntuar</Text>
                </View>
              )}
            </View>

            <Text style={styles.status}>{item.status}</Text>

            {item.review ? (
              <Text style={styles.review} numberOfLines={2}>
                "{item.review}"
              </Text>
            ) : (
              <Text style={styles.reviewEmpty}>Sin reseña aún</Text>
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.8}
              onPress={() => setSelectedGameId(item.gameId)}
            >
              <MaterialIcons
                name="delete-outline"
                size={18}
                color={theme.colors.delete}
              />
              <Text style={styles.deleteText}>Eliminar reseña</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        visible={!!selectedGameId}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>¿Estás seguro?</Text>

            <Text style={styles.modalText}>
              Esta acción no se puede deshacer.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedGameId(null)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={async () => {
                  if (selectedGameId) {
                    await removeGame(selectedGameId);
                    setList((prev) =>
                      prev.filter((g) => g.gameId !== selectedGameId)
                    );
                    setSelectedGameId(null);
                  }
                }}
              >
                <Text style={styles.confirmText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },

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

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardName: {
    color: theme.colors.text,
    fontSize: theme.font.md,
    fontWeight: '500',
    flex: 1,
  },

  scoreBadge: {
    backgroundColor: theme.colors.neonDim,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },

  scoreBadgeMuted: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  scoreText: {
    color: theme.colors.neon,
    fontSize: theme.font.xs,
    fontWeight: '600',
  },

  scoreTextMuted: {
    color: theme.colors.textMuted,
    fontSize: theme.font.xs,
  },

  status: {
    color: theme.colors.cyan,
    fontSize: theme.font.xs,
    letterSpacing: 0.5,
  },

  review: {
    color: theme.colors.textMuted,
    fontSize: theme.font.sm,
    fontStyle: 'italic',
  },

  reviewEmpty: {
    color: theme.colors.border,
    fontSize: theme.font.sm,
  },

  deleteButton: {
    marginTop: theme.spacing.sm,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,

    borderRadius: theme.radius.sm,

    borderWidth: 1,
    borderColor: theme.colors.delete,

    backgroundColor: theme.colors.deleteDim,

    gap: 6,
  },

  deleteText: {
    color: theme.colors.delete,
    fontSize: theme.font.sm,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: theme.spacing.lg,
  },

  modalCard: {
    width: '100%',

    backgroundColor: theme.colors.surface,

    borderRadius: theme.radius.md,

    padding: theme.spacing.lg,

    borderWidth: 1,
    borderColor: theme.colors.border,

    gap: theme.spacing.md,
  },

  modalTitle: {
    color: theme.colors.text,
    fontSize: theme.font.lg,
    fontWeight: '700',
  },

  modalText: {
    color: theme.colors.textSemiMuted,
    fontSize: theme.font.sm,
    lineHeight: 22,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  cancelButton: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: theme.radius.sm,

    backgroundColor: theme.colors.cancel,

    borderWidth: 1,
    borderColor: theme.colors.borderMuted,

    alignItems: 'center',
  },

  cancelText: {
    color: theme.colors.textSemiMuted,
    fontWeight: '600',
  },

  confirmButton: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: theme.radius.sm,

    backgroundColor: theme.colors.deleteDim,

    borderWidth: 1,
    borderColor: theme.colors.delete,

    alignItems: 'center',
  },

  confirmText: {
    color: theme.colors.delete,
    fontWeight: '700',
  },
});