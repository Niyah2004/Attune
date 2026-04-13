import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useTheme } from '../theme/ThemeContext';

const LofiAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { colors, isDark } = useTheme();

  // The requested Spotify playlist link
  const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn'; 

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
          // Play the audio requested from assets
          const { sound: newSound } = await Audio.Sound.createAsync(
            require('../assets/ambient.mp3'),
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

  const openSpotify = useCallback(async () => {
    try {
      const supported = await Linking.canOpenURL(SPOTIFY_PLAYLIST_URL);
      if (supported) {
        await Linking.openURL(SPOTIFY_PLAYLIST_URL);
      } else {
        if (typeof window !== 'undefined' && window.alert) {
          window.alert("Couldn't open Spotify URL. Please check your browser.");
        } else {
          Alert.alert("Couldn't open Spotify", "Please check if you have a web browser installed.");
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }, []);

  return (
    <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SONIC FLOW</Text>

        <TouchableOpacity 
          style={[styles.pill, { 
            backgroundColor: isDark ? colors.card : '#faf8f5', 
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
            <Text style={[styles.caption, { color: colors.textMuted }]}>IN-APP PLAYBACK</Text>
            <Text style={[styles.title, { color: colors.text }]}>Ambient / Lofi Asset</Text>
          </View>
          <Feather 
            name="volume-2" 
            size={16} 
            color={colors.textMuted} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.pill, { 
            backgroundColor: isDark ? colors.card : '#1DB95410', 
            borderColor: colors.border,
            marginTop: 16,
            shadowColor: isDark ? colors.shadow : 'transparent',
            shadowOpacity: isDark ? 0.8 : 0,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: isDark ? 10 : 0
          }]}
          onPress={openSpotify}
          activeOpacity={0.8}
        >
          <Feather 
            name="music" 
            size={18} 
            color="#1DB954" 
          />
          <View style={styles.textStack}>
            <Text style={[styles.caption, { color: colors.textMuted }]}>SPOTIFY</Text>
            <Text style={[styles.title, { color: colors.text }]}>Deep ambient & rest lofi</Text>
          </View>
          <Feather 
            name="external-link" 
            size={16} 
            color={colors.textMuted} 
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowOffset: {
    borderRadius: 8,
  },
  card: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
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
