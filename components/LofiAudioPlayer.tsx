import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const LofiAudioPlayer = () => {
  const { colors, isDark } = useTheme();

  // You can customize this link to your exact preferred indie soft lofi playlist for the menstrual phase
  const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn'; 

  const openPlaylist = useCallback(async () => {
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
      <TouchableOpacity 
        style={[styles.pill, { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
          shadowColor: isDark ? colors.shadow : 'transparent',
          shadowOpacity: isDark ? 0.8 : 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: isDark ? 10 : 0
        }]}
        onPress={openPlaylist}
        activeOpacity={0.8}
      >
        <Feather 
          name="music" 
          size={18} 
          color={colors.text} 
        />
        <View style={styles.textStack}>
          <Text style={[styles.caption, { color: colors.textMuted }]}>SONIC FLOW</Text>
          <Text style={[styles.title, { color: colors.text }]}>Menstrual Phase Soft Lofi</Text>
        </View>
        <Feather 
          name="external-link" 
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
