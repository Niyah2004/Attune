import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import PomodoroTimer from '../../components/altar/PomodoroTimer';
import DreamJournal from '../../components/altar/DreamJournal';
import TodoList from '../../components/altar/TodoList';
import SeasonalRecipes from '../../components/altar/SeasonalRecipes';
import WaysToMove from '../../components/altar/WaysToMove';
import LofiPlaylists from '../../components/altar/LofiPlaylists';

const libraryItems = [
  { id: 'meditation', title: '2-MIN MEDITATION', icon: 'wind' },
  { id: 'playlists', title: 'LOFI PLAYLISTS', icon: 'music' },
  { id: 'recipes', title: 'SEASONAL RECIPES', icon: 'droplet' },
  { id: 'dream', title: 'DREAM JOURNAL', icon: 'moon' },
  { id: 'todo', title: 'TO-DO LIST', icon: 'check-square' },
  { id: 'move', title: 'WAYS TO MOVE', icon: 'activity' },
];

export default function AltarScreen() {
  const { colors } = useTheme();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {activeTool === 'meditation' && <PomodoroTimer onBack={() => setActiveTool(null)} />}
        {activeTool === 'playlists' && <LofiPlaylists onBack={() => setActiveTool(null)} />}
        {activeTool === 'dream' && <DreamJournal onBack={() => setActiveTool(null)} />}
        {activeTool === 'todo' && <TodoList onBack={() => setActiveTool(null)} />}
        {activeTool === 'recipes' && <SeasonalRecipes onBack={() => setActiveTool(null)} />}
        {activeTool === 'move' && <WaysToMove onBack={() => setActiveTool(null)} />}

        {!activeTool && (
          <>
            <View style={styles.header}>
               <Text style={[styles.title, { color: colors.text }]}>The Altar</Text>
               <Text style={[styles.subtitle, { color: colors.textMuted }]}>LIBRARY OF RITUALS & REST</Text>
            </View>

            <View style={styles.grid}>
              {libraryItems.map((item) => (
                <View key={item.id} style={styles.itemWrapper}>
                  <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
                    <TouchableOpacity 
                      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} 
                      activeOpacity={0.8}
                      onPress={() => setActiveTool(item.id)}
                    >
                      <Feather name={item.icon as any} size={18} color={colors.textMuted} style={styles.icon} />
                      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

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
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  itemWrapper: {
    width: '47%',
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
    padding: 16,
    height: 100,
    justifyContent: 'center',
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  icon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#12101a',
    letterSpacing: 1,
  }
});
