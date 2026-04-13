import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const phaseFoods = [
  {
    id: 'menstrual',
    title: 'Menstrual (Winter)',
    color: '#d94b58',
    focus: 'Remineralize & Warmth',
    foods: 'Kelp, nori, bone broth, stews, kidney beans, mushrooms, dark leafy greens.',
    recipe: 'Grounding Root Vegetable Stew'
  },
  {
    id: 'follicular',
    title: 'Follicular (Spring)',
    color: '#76a68f',
    focus: 'Fresh & Vibrant',
    foods: 'Sprouts, sauerkraut, kimchi, broccoli, berries, pumpkin seeds, string beans.',
    recipe: 'Spring Greens & Seed Salad'
  },
  {
    id: 'ovulation',
    title: 'Ovulation (Summer)',
    color: '#6b8cae',
    focus: 'Raw & Cooling',
    foods: 'Bell peppers, spinach, tomatoes, quinoa, lentils, strawberries, coconut.',
    recipe: 'Cooling Quinoa & Veggie Bowl'
  },
  {
    id: 'luteal',
    title: 'Luteal (Autumn)',
    color: '#a67b5b',
    focus: 'Complex Carbs & Comfort',
    foods: 'Sweet potatoes, squash, chickpeas, apples, walnuts, dark chocolate, ginger.',
    recipe: 'Roasted Squash & Chickpea Curry'
  }
];

export default function SeasonalRecipes({ onBack }: any) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Seasonal Nutrition</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>NOURISH YOUR CYCLE</Text>

      <View style={styles.list}>
        {phaseFoods.map((phase) => (
          <View key={phase.id} style={[styles.cardOffset, { backgroundColor: colors.border }]}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.dot, { backgroundColor: phase.color }]} />
                <Text style={[styles.phaseTitle, { color: colors.text }]}>{phase.title}</Text>
              </View>
              
              <Text style={[styles.focusText, { color: colors.textMuted }]}>Target: {phase.focus}</Text>
              <Text style={[styles.foodsText, { color: colors.text }]}>{phase.foods}</Text>
              
              <View style={[styles.recipeBox, { backgroundColor: colors.cardAlt }]}>
                <Feather name="coffee" size={14} color={colors.textMuted} />
                <Text style={[styles.recipeText, { color: colors.text }]}>{phase.recipe}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingBottom: 40,
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
  list: {
    gap: 20,
  },
  cardOffset: {
    borderRadius: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  focusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  foodsText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  recipeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 6,
  },
  recipeText: {
    fontSize: 12,
    fontWeight: '600',
  }
});
