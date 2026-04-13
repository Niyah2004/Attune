import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';
import { getPrivateData } from '../../services/PrivateStorage';
import { getInnerSeason } from '../../services/CycleWisdom';

function computeCycleDay(data: any): { day: number; cycleLength: number } {
  const cycleLength = data?.settings?.averageCycleLength || 28;
  if (!data?.cycles?.length) return { day: 13, cycleLength };
  const lastCycle = data.cycles[data.cycles.length - 1];
  const start = new Date(lastCycle.startDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { day: Math.max(1, Math.min(diff, cycleLength)), cycleLength };
}

const SEASON_ICONS: Record<string, string> = {
  Winter: 'moon',
  Spring: 'sun',
  Summer: 'zap',
  Autumn: 'wind',
};

export default function OracleScreen() {
  const { colors } = useTheme();
  const [phase, setPhase] = useState<any>(null);
  const [cycleDay, setCycleDay] = useState(13);
  const [totalDays, setTotalDays] = useState(28);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data = await getPrivateData();
        const { day, cycleLength } = computeCycleDay(data);
        setCycleDay(day);
        setTotalDays(cycleLength);
        setPhase(getInnerSeason(day, cycleLength));
      })();
    }, [])
  );

  if (!phase) return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} />
  );

  const iconName = (SEASON_ICONS[phase.season] || 'moon') as any;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>The Oracle</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>CYCLE INSIGHTS & HOROSCOPES</Text>
        </View>

        {/* Horoscope Card */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>

            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.highlight }]}>
                <Feather name={iconName} size={16} color={colors.textMuted} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Your Cycle Horoscope</Text>
                <Text style={[styles.cardDayLabel, { color: colors.textMuted }]}>Day {cycleDay} of {totalDays}</Text>
              </View>
            </View>

            {/* Phase badges */}
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.badgeText, { color: colors.textMuted }]}>DAY {cycleDay} OF {totalDays}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.badgeText, { color: colors.textMuted }]}>{phase.season.toUpperCase()}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.badgeText, { color: colors.textMuted }]}>{phase.vibe.toUpperCase()}</Text>
              </View>
            </View>

            {/* Cosmic message */}
            <Text style={[styles.cosmicText, { color: colors.text }]}>{phase.cosmicMessage}</Text>

            {/* How you may feel */}
            <View style={[styles.insightBlock, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.insightLabel, { color: colors.textMuted }]}>HOW YOU MAY FEEL</Text>
              <Text style={[styles.insightText, { color: colors.text }]}>{phase.feelings}</Text>
            </View>

            {/* Balance guidance */}
            <View style={[styles.insightBlock, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.insightLabel, { color: colors.textMuted }]}>YOUR GUIDE</Text>
              <Text style={[styles.insightText, { color: colors.text }]}>{phase.balance}</Text>
            </View>

            {/* Affirmation */}
            <View style={[styles.affirmationBlock, { borderColor: colors.border }]}>
              <Text style={[styles.affirmationText, { color: colors.text }]}>"{phase.affirmation}"</Text>
            </View>

            {/* Ritual Recommendation */}
            <View style={styles.recommendationBox}>
              <Text style={[styles.caption, { color: colors.textMuted }]}>RITUAL RECOMMENDATION</Text>
              <View style={[styles.ritualRow, { backgroundColor: colors.highlight }]}>
                <Feather name="wind" size={14} color={colors.textMuted} />
                <Text style={[styles.ritualText, { color: colors.text }]}>{phase.ritual}</Text>
              </View>

              {/* Numbered steps */}
              <View style={styles.stepsContainer}>
                <Text style={[styles.stepsHeader, { color: colors.textMuted }]}>HOW TO ACHIEVE THIS</Text>
                {phase.steps.map((step: string, i: number) => (
                  <View key={i} style={styles.stepRow}>
                    <View style={[styles.stepNumber, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={[styles.stepNumberText, { color: colors.textMuted }]}>{i + 1}</Text>
                    </View>
                    <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>
        </View>

        {/* Nourishment Guide Card */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.highlight }]}>
                <Feather name="droplet" size={16} color={colors.textMuted} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Nourishment Guide</Text>
            </View>

            {phase.recommendations.map((rec: string, i: number) => (
              <View key={i} style={[styles.row, { borderBottomColor: colors.highlight }]}>
                <Feather name="check-circle" size={14} color={colors.textMuted} style={{ marginTop: 2 }} />
                <Text style={[styles.rowValue, { color: colors.text }]}>{rec}</Text>
              </View>
            ))}

            <View style={[styles.quoteBox, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.quoteText, { color: colors.textMuted }]}>"Eat with the seasons of your body."</Text>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 100, gap: 24 },

  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  shadowOffset: {
    borderRadius: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  cardDayLabel: {
    fontSize: 12,
    marginTop: 2,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },

  cosmicText: {
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 20,
  },

  insightBlock: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  insightLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 22,
  },

  affirmationBlock: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  affirmationText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
  },

  recommendationBox: {
    marginTop: 4,
  },
  caption: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  ritualRow: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ritualText: {
    fontSize: 14,
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 22,
  },

  stepsContainer: {
    marginTop: 20,
  },
  stepsHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 13,
    lineHeight: 21,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowValue: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  quoteBox: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 14,
  },
});
