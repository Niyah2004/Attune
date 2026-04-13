import { Feather } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LofiAudioPlayer from '../../components/LofiAudioPlayer';
import { useTheme } from '../../theme/ThemeContext';

const TopNavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const { isDark, toggleTheme, colors } = useTheme();

  const getIconColor = (route: string) => {
    if (path === '/' && route === '/') return colors.background;
    if (path === `/${route}`) return colors.background;
    return colors.text;
  };

  const getIconBg = (route: string) => {
    if (path === '/' && route === '/') return colors.text;
    if (path === `/${route}`) return colors.text;
    return 'transparent';
  };

  return (
    <SafeAreaView style={[styles.navSafe, { backgroundColor: colors.background }]}>
      <View style={styles.navContainer}>
        {/* Left Logo & Toggle */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Feather name={isDark ? "sun" : "moon"} size={16} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.logoText, { color: colors.text }]}>Attune</Text>
        </View>

        {/* Right Navigation */}
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => router.navigate('/')} style={[styles.iconWrapper, { backgroundColor: getIconBg('/') }]}>
            <Feather name="star" size={18} color={getIconColor('/')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/constellation')} style={[styles.iconWrapper, { backgroundColor: getIconBg('constellation') }]}>
            <Feather name="calendar" size={18} color={getIconColor('constellation')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/oracle')} style={[styles.iconWrapper, { backgroundColor: getIconBg('oracle') }]}>
            <Feather name="wind" size={18} color={getIconColor('oracle')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/altar')} style={[styles.iconWrapper, { backgroundColor: getIconBg('altar') }]}>
            <Feather name="book-open" size={18} color={getIconColor('altar')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <View style={[styles.layout, { backgroundColor: colors.background }]}>
      {/* Top Navigation */}
      <TopNavBar />

      {/* Screens content */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            sceneStyle: { backgroundColor: colors.background }
          }}>
          <Tabs.Screen name="index" />
          <Tabs.Screen name="constellation" />
          <Tabs.Screen name="oracle" />
          <Tabs.Screen name="altar" />
        </Tabs>
      </View>

      {/* Persistent Floating Player */}
      <View style={styles.floatingPlayerContainer}>
        <LofiAudioPlayer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  navSafe: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  themeToggle: {
    padding: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moonCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#12101a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#12101a',
  },
  navIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingPlayerContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 9999,
    elevation: 9999,
  }
});
