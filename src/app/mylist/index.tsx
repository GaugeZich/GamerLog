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
import Svg, { Path } from 'react-native-svg';

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
      <View style={styles.emptyContainer}>
        <Svg
          width={80}
          height={80}
          viewBox="0 -960 960 960"
          fill="none"
        >
          <Path
            d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm510.5-165.5Q720-463 720-480t-11.5-28.5Q697-520 680-520t-28.5 11.5Q640-497 640-480t11.5 28.5Q663-440 680-440t28.5-11.5Zm-80-120Q640-583 640-600t-11.5-28.5Q617-640 600-640t-28.5 11.5Q560-617 560-600t11.5 28.5Q583-560 600-560t28.5-11.5ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z"
            fill={theme.colors.textMuted}
          />
        </Svg>

        <Text style={styles.emptyText}>
          Tu lista está vacía. Explorá juegos y agregá los que jugaste.
        </Text>
      </View>
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

              <Text style={styles.deleteText}>
                Eliminar reseña
              </Text>
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

  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,

    justifyContent: 'center',
    alignItems: 'center',

    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },

  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.font.md,
    textAlign: 'center',
    lineHeight: 24,
  },
});