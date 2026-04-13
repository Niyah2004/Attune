import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useTheme } from '../theme/ThemeContext';

const LofiAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        if (sound) await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!sound) {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { shouldPlay: true, isLooping: true }
          );
          setSound(newSound);
        } else {
          await sound.playAsync();
        }
        setIsPlaying(true);
      }
    } catch (error: any) {
      console.log('Error attempting to play audio:', error);
      if (typeof window !== 'undefined') {
        window.alert('Audio failed: ' + error.message);
      }
    }
  };

  return (
    <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
      <TouchableOpacity 
        style={[styles.pill, { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
          shadowColor: isDark ? colors.shadow : 'transparent',
          shadowOpacity: isDark ? 0.8 : 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: isDark ? 10 : 0
        }]}
        onPress={togglePlay}
        activeOpacity={0.8}
      >
        <Feather 
          name={isPlaying ? "pause" : "play"} 
          size={18} 
          color={colors.text} 
        />
        <View style={styles.textStack}>
          <Text style={[styles.caption, { color: colors.textMuted }]}>NOW STREAMING</Text>
          <Text style={[styles.title, { color: colors.text }]}>Midnight Tea (Lofi)</Text>
        </View>
        <Feather 
          name="volume-2" 
          size={16} 
          color={colors.textMuted} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowOffset: {
    borderRadius: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  textStack: {
    flex: 1,
  },
  caption: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  }
});

export default LofiAudioPlayer;
