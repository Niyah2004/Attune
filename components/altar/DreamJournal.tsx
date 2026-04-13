import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export default function DreamJournal({ onBack }: any) {
  const { colors } = useTheme();
  const [entries, setEntries] = useState([{ id: '1', date: 'Oct 24', text: 'Woke up feeling light and focused.' }]);
  const [draft, setDraft] = useState('');

  const submitEntry = () => {
    if (!draft.trim()) return;
    setEntries([{ id: Date.now().toString(), date: 'Today', text: draft }, ...entries]);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Dream Journal</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>LOG FEELINGS & EMOTIONS</Text>

      <View style={[styles.cardOffset, { backgroundColor: colors.border, marginBottom: 24 }]}>
        <View style={[styles.entryBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <TextInput 
             style={[styles.input, { color: colors.text }]}
             placeholder="How are you feeling right now?"
             placeholderTextColor={colors.textMuted}
             multiline
             value={draft}
             onChangeText={setDraft}
           />
           <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.border }]} onPress={submitEntry}>
             <Feather name="send" size={16} color={colors.background} />
           </TouchableOpacity>
        </View>
      </View>

      <View style={styles.list}>
        {entries.map(e => (
          <View key={e.id} style={[styles.historyCard, { backgroundColor: colors.cardAlt, borderLeftColor: colors.highlight }]}>
             <Text style={[styles.historyDate, { color: colors.textMuted }]}>{e.date}</Text>
             <Text style={[styles.historyText, { color: colors.text }]}>{e.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 24,
  },
  cardOffset: {
    borderRadius: 8,
  },
  entryBox: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    minHeight: 120,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 60,
  },
  submitBtn: {
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  list: {
    gap: 16,
  },
  historyCard: {
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  historyDate: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  historyText: {
    fontSize: 14,
    lineHeight: 20,
  }
});
