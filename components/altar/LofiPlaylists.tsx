import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const curatedPlaylists = [
  {
    phase: 'Menstrual Phase',
    title: 'Deep Ambient & Rest Lofi',
    desc: 'Binaural beats and slow tempos to help your nervous system wind down.',
    color: '#d94b58',
    links: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7zs',
      apple: 'https://music.apple.com/us/playlist/sleep/pl.2b1e4fa0693c4a169bba29fdf3a4bc4a',
      youtube: 'https://youtube.com/playlist?list=PLofht4PTcKYnaH8w5olJCI-wUVxuoMHqM'
    }
  },
  {
    phase: 'Follicular Phase',
    title: 'Upbeat Morning Chillhop',
    desc: 'Bouncy, hopeful kicks and snares for planning and starting fresh.',
    color: '#76a68f',
    links: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXc8kgYqQLKcO',
      apple: 'https://music.apple.com/us/playlist/chill/pl.16104eb8b8c548a88372691bedc9eeba',
      youtube: 'https://youtube.com/playlist?list=PLofht4PTcKYnaH8w5olJCI-wUVxuoMHqM'
    }
  },
  {
    phase: 'Ovulation Phase',
    title: 'Focus & Flow Beats',
    desc: 'High energy groove for connecting, creating, and outputting.',
    color: '#6b8cae',
    links: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      apple: 'https://music.apple.com/us/playlist/focus/pl.c955e8d77d7042a0b14af08a8e1bafef',
      youtube: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
    }
  },
  {
    phase: 'Luteal Phase',
    title: 'Late Night Study Vibes',
    desc: 'Nostalgic, dusty vinyl samples to ground you during the transition back to rest.',
    color: '#a67b5b',
    links: {
      spotify: 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM',
      apple: 'https://music.apple.com/us/playlist/late-night-lofi/pl.ecca3bcbb5ef4e16bb6e42b27af8bdce',
      youtube: 'https://www.youtube.com/watch?v=rUxyKA_-grg'
    }
  }
];

export default function LofiPlaylists({ onBack }: any) {
  const { colors } = useTheme();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Sonic Flow</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>LOFI BEATS FOR EVERY PHASE</Text>

      <View style={styles.list}>
        {curatedPlaylists.map((playlist, idx) => (
          <View key={idx} style={[styles.cardOffset, { backgroundColor: colors.border }]}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.dot, { backgroundColor: playlist.color }]} />
                <Text style={[styles.phaseTitle, { color: colors.textMuted }]}>{playlist.phase}</Text>
              </View>
              
              <Text style={[styles.playlistTitle, { color: colors.text }]}>{playlist.title}</Text>
              <Text style={[styles.descText, { color: colors.textMuted }]}>{playlist.desc}</Text>
              
              <View style={styles.linksRow}>
                <TouchableOpacity 
                   style={[styles.linkBtn, { backgroundColor: '#1DB954' }]} 
                   onPress={() => handleOpenLink(playlist.links.spotify)}
                   activeOpacity={0.8}
                >
                  <FontAwesome5 name="spotify" size={14} color="#FFF" />
                  <Text style={styles.linkText}>Spotify</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={[styles.linkBtn, { backgroundColor: '#FA243C' }]} 
                   onPress={() => handleOpenLink(playlist.links.apple)}
                   activeOpacity={0.8}
                >
                  <FontAwesome5 name="apple" size={14} color="#FFF" />
                  <Text style={styles.linkText}>Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={[styles.linkBtn, { backgroundColor: '#FF0000' }]} 
                   onPress={() => handleOpenLink(playlist.links.youtube)}
                   activeOpacity={0.8}
                >
                  <FontAwesome5 name="youtube" size={14} color="#FFF" />
                  <Text style={styles.linkText}>YouTube</Text>
                </TouchableOpacity>
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
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  phaseTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 12,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  linkText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
