import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getInnerSeason } from '../services/CycleWisdom';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const MoonPhaseDial = ({ cycleDay, cycleLength = 28 }: any) => {
  const { colors, isDark } = useTheme();
  const normDay = (cycleDay / cycleLength) * 28;
  const wisdom = getInnerSeason(cycleDay, cycleLength);
  
  const fullness = Math.sin((normDay / 28) * Math.PI - (Math.PI / 2)); 
  const phaseValue = (fullness + 1) / 2;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.moonHalo, { transform: [{ scale: pulseAnim }], shadowOpacity: phaseValue * 0.8 + 0.2, shadowColor: isDark ? 'rgba(253, 245, 201, 1)' : 'rgba(18, 16, 26, 0.4)' }]}>
        <LinearGradient
          colors={isDark ? ['#fdf5c9', '#12101a'] : ['#faf8f5', '#12101a']}
          locations={[phaseValue, phaseValue + 0.1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.moon, { borderColor: colors.border }]}
        >
          {/* Subtle crater details */}
          <View style={[styles.crater, { top: '20%', left: '30%', width: 10, height: 10 }]} />
          <View style={[styles.crater, { top: '60%', left: '60%', width: 15, height: 15 }]} />
        </LinearGradient>
      </Animated.View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: isDark ? wisdom.color : colors.text }]}>
          Day {cycleDay} • {wisdom.name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{wisdom.vibe}</Text>
      </View>

      <View style={[styles.insightsTray, { backgroundColor: colors.background, borderColor: colors.border }]}>
         <View style={styles.insightBox}>
            <Text style={[styles.insightLabel, { color: colors.text }]}>How You Might Feel</Text>
            <Text style={[styles.insightText, { color: colors.textMuted }]}>{wisdom.feelings}</Text>
         </View>
         <View style={styles.insightBox}>
            <Text style={[styles.insightLabel, { color: colors.text }]}>Maintaining Balance</Text>
            <Text style={[styles.insightText, { color: colors.textMuted }]}>{wisdom.balance}</Text>
         </View>
         <View style={styles.insightBox}>
            <Text style={[styles.insightLabel, { color: colors.text }]}>Daily Affirmation</Text>
            <Text style={[styles.insightText, { color: colors.textMuted, fontStyle: 'italic' }]}>"{wisdom.affirmation}"</Text>
         </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    marginVertical: 16
  },
  moonHalo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    shadowColor: 'rgba(253, 245, 201, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  moon: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#2d263f',
    overflow: 'hidden',
    position: 'relative'
  },
  crater: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 50,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b80a6',
  },
  insightsTray: {
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    gap: 16,
    shadowColor: '#12101a',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    transform: [{ translateX: 4 }, { translateY: 4 }], // Reverse shadow logic to keep layout bound
  },
  insightBox: {
  },
  insightLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 22,
  }
});

export default MoonPhaseDial;
