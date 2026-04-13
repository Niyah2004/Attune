import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export default function OracleScreen() {
  const { colors } = useTheme();
  
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
                  <Feather name="moon" size={16} color={colors.textMuted} />
               </View>
               <Text style={[styles.cardTitle, { color: colors.text }]}>Your Cycle Horoscope</Text>
            </View>
            <Text style={[styles.cardText, { color: colors.text }]}>
              The moon is shifting into your follicular house. This is a time of <Text style={{fontWeight: 'bold'}}>new beginnings</Text>. Your body is asking for expression and movement.
            </Text>
            
            <View style={styles.recommendationBox}>
               <Text style={[styles.caption, { color: colors.textMuted }]}>RITUAL RECOMMENDATION</Text>
               <View style={[styles.ritualRow, { backgroundColor: colors.cardAlt }]}>
                  <Feather name="wind" size={14} color={colors.textMuted} />
                  <Text style={[styles.ritualText, { color: colors.text }]}>Plant a physical seed or set one clear intention for this month.</Text>
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
            
            <View style={styles.row}>
               <Text style={[styles.rowLabel, { color: colors.textMuted }]}>Recommended Diet</Text>
               <Text style={[styles.rowValue, { color: colors.text }]}>Fermented Foods</Text>
            </View>
            <View style={styles.row}>
               <Text style={[styles.rowLabel, { color: colors.textMuted }]}>Movement Style</Text>
               <Text style={[styles.rowValue, { color: colors.text }]}>Light Jogging</Text>
            </View>
            
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
  container: { flex: 1, backgroundColor: '#dad6d3' },
  scroll: { padding: 24, paddingBottom: 100, gap: 24 },
  
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 28,
    color: '#2d263f',
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#8b80a6',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  shadowOffset: {
    backgroundColor: '#12101a',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#faf8f5',
    borderWidth: 2,
    borderColor: '#12101a',
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
    backgroundColor: '#e6e2f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#12101a',
    fontStyle: 'italic',
  },
  cardText: {
    fontSize: 15,
    color: '#2d263f',
    lineHeight: 22,
    marginBottom: 24,
  },
  
  recommendationBox: {
    marginTop: 8,
  },
  caption: {
    fontSize: 10,
    color: '#8b80a6',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  ritualRow: {
    backgroundColor: '#fcf3e3',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ritualText: {
    fontSize: 14,
    color: '#2d263f',
    fontStyle: 'italic',
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: '#8b80a6',
  },
  rowValue: {
    fontSize: 15,
    color: '#12101a',
    fontWeight: '600',
  },
  quoteBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  quoteText: {
    color: '#8b80a6',
    fontStyle: 'italic',
    fontSize: 14,
  }
});
