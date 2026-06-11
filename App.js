import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

// ==============================
// ВЕКТОРНЫЙ ЛОГОТИП КМК
// ==============================
const LogoKMK = ({ width = 210, height = 60, color = "#000000" }) => (
  <Svg width={width} height={height} viewBox="0 0 175 50" fill="none">
    <Path d="M0 0H14V19H14.5L34 0H52L28 23L53 50H35L14.5 27H14V50H0V0Z" fill={color}/>
    <Path d="M58 50V0H75L86 24L97 0H114V50H100V19H99.5L89 41H83L72.5 19H72V50H58Z" fill={color}/>
    <Path d="M120 0H134V19H134.5L154 0H172L148 23L173 50H155L134.5 27H134V50H120V0Z" fill={color}/>
  </Svg>
);

// ==============================
// МОК-ДАННЫЕ
// ==============================
const EVENTS_DATA = [
  { 
    id: '1', 
    status: 'Закончился', 
    title: 'Материал для кровли', 
    subtitle: '«Дом Полазна»',
    fullText: 'Прорабу необходимо согласовать дополнительную закупку металлочерепицы (20 кв.м) для завершения кровельных работ на объекте «Дом Полазна». Ожидаемая задержка: 1-2 дня.',
    date: '11 июня 2026',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: '2', 
    status: 'Завершен', 
    title: 'Этап заливки фундамента', 
    subtitle: '«Дом Пермь»',
    fullText: 'Фундамент успешно залит и оставлен для набора прочности. Следующий этап (возведение каркаса) начнется через 14 дней согласно графику.',
    date: '08 июня 2026',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop' 
  },
];

const NEWS_DATA = [
  { 
    id: '1', 
    title: 'В России резко подорожали стройматериалы', 
    date: '10 июня 2026',
    content: 'За последний месяц зафиксирован рост цен на пиломатериалы и металлопрокат в среднем на 15%.' 
  },
  { 
    id: '2', 
    title: 'ЦБ повысил ставку: как это скажется на ипотеке', 
    date: '01 июня 2026',
    content: 'Аналитика рынка недвижимости и прогнозы экспертов касательно ипотечного кредитования на ИЖС.' 
  },
];

const REPORTS_DATA = [
  { 
    id: '1', 
    type: 'video', 
    date: '12 июля 2026', 
    title: 'Монтаж стропильной системы', 
    description: 'Работы идут строго по графику. Используется калиброванная доска камерной сушки.',
    image: 'https://images.unsplash.com/photo-1541889497003-f1e533ebb3f0?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: '2', 
    type: 'photo', 
    date: '05 июля 2026', 
    title: 'Возведение каркаса 1-го этажа', 
    description: 'Установлены основные несущие конструкции первого этажа.',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop' 
  },
];

const TIMELINE_DATA = [
  { id: '1', date: '16 июн', title: 'Сдача кровли', status: 'done' },
  { id: '2', date: '25 июн', title: 'Монтаж окон и дверей', status: 'done' },
  { id: '3', date: '06 июл', title: 'Сдача обрешетки', status: 'missed' },
  { id: '4', date: '20 июл', title: 'Внутренняя отделка', status: 'upcoming' },
];

// ==============================
// UI КОМПОНЕНТЫ
// ==============================
const InitialsAvatar = ({ initials, size }) => (
  <View style={{
    width: size, 
    height: size, 
    borderRadius: size / 2,
    backgroundColor: '#F0F0F5', 
    justifyContent: 'center', 
    alignItems: 'center'
  }}>
    <Text style={{ color: '#1A1A1A', fontWeight: '600', fontSize: size * 0.4 }}>{initials}</Text>
  </View>
);

// ==============================
// ЭКРАН АВТОРИЗАЦИИ
// ==============================
function LoginScreen({ navigation }) {
  const [objectNumber, setObjectNumber] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (objectNumber === '0000') {
      setError(false);
      navigation.replace('MainApp');
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex1}>
        <ScrollView contentContainerStyle={styles.loginContainer} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View style={styles.topSection}>
            <LogoKMK color="#000000" />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Введите номер объекта</Text>
            <TextInput
              style={error ? styles.inputError : styles.input}
              keyboardType="number-pad"
              maxLength={4}
              value={objectNumber}
              onChangeText={(text) => { setObjectNumber(text); setError(false); }}
              placeholder="0000"
              placeholderTextColor="#C4C4C4"
              secureTextEntry
            />
            {error && <Text style={styles.errorText}>Объект не найден. Попробуйте еще раз.</Text>}

            <TouchableOpacity activeOpacity={0.8} style={styles.buttonPrimary} onPress={handleLogin}>
              <Text style={styles.buttonTextWhite}>Войти</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==============================
// ГЛАВНЫЙ ЭКРАН
// ==============================
function HomeScreen({ navigation }) {
  
  const renderEventCard = (event) => {
    if (event.image) {
      return (
        <ImageBackground source={{ uri: event.image }} style={styles.eventCardImage} imageStyle={styles.cardRadius}>
          <View style={styles.cardOverlayGradient}>
            <View style={styles.badgeLight}>
              <Text style={styles.badgeText}>{event.status}</Text>
            </View>
            <View>
              <Text style={styles.cardTitleWhite} numberOfLines={3}>{event.title}</Text>
              <Text style={styles.cardSubtitleLight}>{event.subtitle}</Text>
            </View>
          </View>
        </ImageBackground>
      );
    }
    return (
      <View style={styles.eventCardTextOnly}>
        <View style={styles.badgeLight}>
          <Text style={styles.badgeText}>{event.status}</Text>
        </View>
        <Text style={styles.cardTitleDark} numberOfLines={4}>{event.title}</Text>
        <Text style={styles.cardDateGray}>{event.date}</Text>
      </View>
    );
  };

  const renderNewsCard = (news) => {
    if (news.image) {
      return (
        <ImageBackground source={{ uri: news.image }} style={styles.newsCardImage} imageStyle={styles.cardRadius}>
          <View style={styles.cardOverlayGradient}>
            <Text style={styles.newsCardTitleWhite} numberOfLines={3}>{news.title}</Text>
          </View>
        </ImageBackground>
      );
    }
    return (
      <View style={styles.newsCardTextOnly}>
        <Text style={styles.newsCardTitleDark} numberOfLines={3}>{news.title}</Text>
        <Text style={styles.cardDateGray} numberOfLines={1}>{news.date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.bgScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.paddingH}>
          <TouchableOpacity activeOpacity={0.8} style={styles.headerProfile} onPress={() => navigation.navigate('Profile')}>
            <InitialsAvatar initials="РГ" size={50} />
            <View style={styles.headerProfileText}>
              <Text style={styles.greeting}>Здравствуйте, Роман!</Text>
              <Text style={styles.subtitleGray}>Объект: «Дом Полазна»</Text>
            </View>
            <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>События</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EventsList')}>
            <Text style={styles.seeAllText}>Все</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={EVENTS_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.sliderPadding}
          renderItem={({ item }) => (
            <TouchableOpacity 
              activeOpacity={0.9} 
              style={styles.eventCardWrapper} 
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
              {renderEventCard(item)}
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          {/* ИСПРАВЛЕНО: "Новости компании" изменены на просто "Новости" */}
          <Text style={styles.sectionTitle}>Новости</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewsList')}>
            <Text style={styles.seeAllText}>Все</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.newsGrid}>
          {NEWS_DATA.map((news) => (
            <TouchableOpacity 
              key={news.id} activeOpacity={0.9} 
              style={styles.newsGridItem} 
              onPress={() => navigation.navigate('NewsDetails', { news })}
            >
              {renderNewsCard(news)}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================
// ЭКРАН ПРОФИЛЯ
// ==============================
function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.bgScreen} contentContainerStyle={styles.paddingH}>
      <View style={styles.profileHeaderBox}>
        <InitialsAvatar initials="РГ" size={100} />
        <Text style={styles.profileName}>Роман Гослингов</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Начало строительства</Text>
          <Text style={styles.statValue}>23.10.2022</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Текущие расходы</Text>
          <Text style={styles.statValue}>60 434 ₽</Text>
        </View>
        <View style={styles.statRowNoBorder}>
          <Text style={styles.statLabel}>Доступный баланс</Text>
          <Text style={styles.statValue}>3 452 ₽</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.buttonSecondary} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
        <Text style={styles.buttonTextDark}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ==============================
// ЭКРАН ОТЧЕТОВ
// ==============================
function ReportScreen() {
  return (
    <SafeAreaView style={styles.bgScreen}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Отчеты</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.paddingHBottom}>
        {REPORTS_DATA.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <ImageBackground source={{ uri: report.image }} style={styles.reportImage} imageStyle={styles.cardRadius}>
              <View style={styles.badgeLightAbsolute}>
                <Text style={styles.badgeText}>{report.date}</Text>
              </View>
              {report.type === 'video' && (
                <View style={styles.playOverlayRounded}>
                  <Ionicons name="play" size={28} color="#FFFFFF" style={{ marginLeft: 4 }} />
                </View>
              )}
            </ImageBackground>
            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportDescription}>{report.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================
// ЭКРАН СРОКОВ (ТАЙМЛАЙН)
// ==============================
function DeadlinesScreen() {
  return (
    <SafeAreaView style={styles.bgScreen}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Сроки работ</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.paddingHBottom}>
        <View style={styles.timelineWrapper}>
          {TIMELINE_DATA.map((item, index) => {
            const isLast = index === TIMELINE_DATA.length - 1;
            const isDone = item.status === 'done';
            const isMissed = item.status === 'missed';

            return (
              <View key={item.id} style={styles.timelineItem}>
                {!isLast && <View style={styles.timelineLine} />}
                
                <View style={styles.timelineDotContainer}>
                  <View style={isDone ? styles.dotDone : (isMissed ? styles.dotMissed : styles.dotUpcoming)}>
                    {isDone && <Ionicons name="checkmark" size={14} color="#FFF" />}
                    {isMissed && <Ionicons name="close" size={14} color="#FFF" />}
                  </View>
                </View>

                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                  <Text style={isMissed ? styles.textStrikethrough : styles.timelineItemTitle}>
                    {item.title}
                  </Text>
                  {isMissed && <Text style={styles.missedLabel}>Пропущен</Text>}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================
// ЭКРАНЫ СПИСКОВ И ДЕТАЛИЗАЦИИ
// ==============================
function EventsListScreen({ navigation }) {
  return (
    <ScrollView style={styles.bgScreen} contentContainerStyle={styles.paddingHBottom}>
      {EVENTS_DATA.map((event) => (
        <TouchableOpacity key={event.id} activeOpacity={0.8} style={styles.listCard} onPress={() => navigation.navigate('EventDetails', { event })}>
          {event.image ? (
             <Image source={{ uri: event.image }} style={styles.listImage} />
          ) : (
             <View style={styles.listImagePlaceholder}><Ionicons name="calendar-outline" size={24} color="#A0A0A0" /></View>
          )}
          <View style={styles.listInfo}>
            <Text style={styles.listTitle} numberOfLines={2}>{event.title}</Text>
            <Text style={styles.listDate}>{event.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function EventDetailsScreen({ route }) {
  const { event } = route.params;
  return (
    <ScrollView style={styles.bgScreen} showsVerticalScrollIndicator={false}>
      {event.image && (
        <View style={styles.paddingH}>
          <Image source={{ uri: event.image }} style={styles.detailImage} />
        </View>
      )}
      <View style={styles.paddingH}>
        <Text style={styles.detailDate}>{event.date}</Text>
        <Text style={styles.detailTitle}>{event.title}</Text>
        <Text style={styles.detailBody}>{event.fullText}</Text>
      </View>
    </ScrollView>
  );
}

function NewsListScreen({ navigation }) {
  return (
    <ScrollView style={styles.bgScreen} contentContainerStyle={styles.paddingHBottom}>
      {NEWS_DATA.map((news) => (
        <TouchableOpacity key={news.id} activeOpacity={0.8} style={styles.listCard} onPress={() => navigation.navigate('NewsDetails', { news })}>
          {news.image ? (
             <Image source={{ uri: news.image }} style={styles.listImage} />
          ) : (
             <View style={styles.listImagePlaceholder}><Ionicons name="newspaper-outline" size={24} color="#A0A0A0" /></View>
          )}
          <View style={styles.listInfo}>
            <Text style={styles.listTitle} numberOfLines={2}>{news.title}</Text>
            <Text style={styles.listDate}>{news.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function NewsDetailsScreen({ route }) {
  const { news } = route.params;
  return (
    <ScrollView style={styles.bgScreen} showsVerticalScrollIndicator={false}>
      {news.image && (
        <View style={styles.paddingH}>
           <Image source={{ uri: news.image }} style={styles.detailImage} />
        </View>
      )}
      <View style={styles.paddingH}>
        <Text style={styles.detailDate}>{news.date}</Text>
        <Text style={styles.detailTitle}>{news.title}</Text>
        <Text style={styles.detailBody}>{news.content}</Text>
      </View>
    </ScrollView>
  );
}

// ==============================
// НАВИГАЦИЯ
// ==============================
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F2F2F2', height: 60, paddingBottom: 8, paddingTop: 8, elevation: 0 },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 10 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Главная') iconName = 'home';
          else if (route.name === 'Сроки') iconName = 'calendar';
          else if (route.name === 'Отчеты') iconName = 'albums';
          return <Ionicons name={iconName} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Сроки" component={DeadlinesScreen} />
      <Tab.Screen name="Отчеты" component={ReportScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ 
          headerStyle: { backgroundColor: '#FFFFFF', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
          headerTitleStyle: { fontWeight: '700', fontSize: 17, color: '#1A1A1A' },
          headerTintColor: '#1A1A1A',
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerBackTitleVisible: false
        }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainApp" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
          <Stack.Screen name="EventsList" component={EventsListScreen} options={{ title: 'Все события' }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Событие' }} />
          <Stack.Screen name="NewsList" component={NewsListScreen} options={{ title: 'Все новости' }} />
          <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: 'Новость' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// ==============================
// ЕДИНАЯ ТАБЛИЦА СТИЛЕЙ
// ==============================
const styles = StyleSheet.create({
  flex1: { flex: 1, backgroundColor: '#FFFFFF' },
  bgScreen: { flex: 1, backgroundColor: '#FFFFFF' },
  paddingH: { paddingHorizontal: 20 },
  paddingHBottom: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Headers
  pageHeader: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', letterSpacing: -0.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  seeAllText: { fontSize: 15, color: '#007AFF', fontWeight: '600' },

  // Login
  loginContainer: { flexGrow: 1, padding: 30, justifyContent: 'center' },
  topSection: { alignItems: 'center', marginBottom: 60 },
  formSection: { width: '100%', paddingBottom: 20 },
  label: { fontSize: 14, color: '#737373', marginBottom: 10, fontWeight: '500', textAlign: 'center' },
  input: { backgroundColor: '#F8F8F9', borderRadius: 16, padding: 20, fontSize: 24, fontWeight: '600', letterSpacing: 8, textAlign: 'center', color: '#1A1A1A' },
  inputError: { backgroundColor: '#FFF0F0', borderWidth: 1, borderColor: '#FF4B4B', borderRadius: 16, padding: 20, fontSize: 24, fontWeight: '600', letterSpacing: 8, textAlign: 'center', color: '#1A1A1A' },
  errorText: { color: '#FF4B4B', marginTop: 10, fontWeight: '500', fontSize: 13, textAlign: 'center' },
  buttonPrimary: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 25 },
  buttonSecondary: { backgroundColor: '#F0F0F5', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 25 },
  buttonTextWhite: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  buttonTextDark: { color: '#1A1A1A', fontSize: 16, fontWeight: '700' },

  // Home Screen
  headerProfile: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  headerProfileText: { flex: 1, marginLeft: 15 },
  greeting: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  subtitleGray: { fontSize: 14, color: '#737373', marginTop: 2 },
  
  // Events Slider (FlatList)
  sliderPadding: { paddingLeft: 20, paddingRight: 5, paddingBottom: 10 },
  eventCardWrapper: { width: 280, marginRight: 15 },
  cardRadius: { borderRadius: 16 },
  eventCardImage: { width: '100%', height: 180, justifyContent: 'flex-end', backgroundColor: '#F8F8F9', borderRadius: 16 },
  cardOverlayGradient: { width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'space-between', padding: 15, borderRadius: 16 },
  badgeLight: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  badgeLightAbsolute: { position: 'absolute', top: 15, left: 15, backgroundColor: '#FFFFFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  badgeText: { color: '#1A1A1A', fontWeight: '700', fontSize: 12 },
  cardTitleWhite: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', lineHeight: 24, marginBottom: 4 },
  cardSubtitleLight: { color: '#FFFFFF', fontSize: 14, fontWeight: '500', opacity: 0.9 },
  eventCardTextOnly: { width: '100%', height: 180, backgroundColor: '#F8F8F9', borderRadius: 16, padding: 20, justifyContent: 'space-between', borderWidth: 1, borderColor: '#E5E5E5' },
  cardTitleDark: { color: '#1A1A1A', fontSize: 18, fontWeight: '700', lineHeight: 24 },
  cardDateGray: { color: '#999999', fontSize: 13, fontWeight: '600' },

  // News Grid
  newsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 },
  newsGridItem: { width: '48%', marginBottom: 15 },
  newsCardImage: { width: '100%', height: 160, justifyContent: 'flex-end', backgroundColor: '#F8F8F9', borderRadius: 16 },
  newsCardTitleWhite: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', lineHeight: 20 },
  newsCardTextOnly: { width: '100%', height: 160, backgroundColor: '#F8F8F9', borderRadius: 16, padding: 15, justifyContent: 'space-between', borderWidth: 1, borderColor: '#E5E5E5' },
  newsCardTitleDark: { color: '#1A1A1A', fontSize: 14, fontWeight: '700', lineHeight: 20 },

  // Reports
  reportCard: { marginBottom: 30 },
  reportImage: { width: '100%', height: 220, backgroundColor: '#F8F8F9', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  playOverlayRounded: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  reportInfo: { paddingTop: 15 },
  reportTitle: { fontSize: 18, color: '#1A1A1A', fontWeight: '700', lineHeight: 24, marginBottom: 6 },
  reportDescription: { fontSize: 15, color: '#737373', lineHeight: 22 },

  // Profile
  profileHeaderBox: { alignItems: 'center', paddingVertical: 30 },
  profileName: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginTop: 15 },
  statsContainer: { marginBottom: 10, marginTop: 10 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  statRowNoBorder: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18 },
  statLabel: { fontSize: 15, color: '#737373', fontWeight: '500' },
  statValue: { fontSize: 16, color: '#1A1A1A', fontWeight: '600' },

  // Deadlines (Timeline)
  timelineWrapper: { paddingLeft: 10, paddingTop: 10 },
  timelineItem: { flexDirection: 'row', minHeight: 70 },
  timelineLine: { position: 'absolute', left: 13, top: 28, bottom: -10, width: 2, backgroundColor: '#F0F0F5', zIndex: 0 },
  timelineDotContainer: { width: 28, alignItems: 'center', marginRight: 15, zIndex: 1, marginTop: 2 },
  dotDone: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  dotMissed: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF4B4B', justifyContent: 'center', alignItems: 'center' },
  dotUpcoming: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F0F0F5', borderWidth: 2, borderColor: '#FFFFFF', marginTop: 4 },
  timelineContent: { flex: 1, paddingBottom: 30 },
  timelineDate: { fontSize: 13, fontWeight: '600', color: '#999999', marginBottom: 4 },
  timelineItemTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  textStrikethrough: { fontSize: 16, fontWeight: '600', color: '#999999', textDecorationLine: 'line-through' },
  missedLabel: { fontSize: 14, color: '#FF4B4B', fontWeight: '500', textDecorationLine: 'none', marginTop: 4 },

  // Lists
  listCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F5' },
  listImage: { width: 70, height: 70, borderRadius: 12, marginRight: 15 },
  listImagePlaceholder: { width: 70, height: 70, borderRadius: 12, marginRight: 15, backgroundColor: '#F0F0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E5E5' },
  listInfo: { flex: 1, justifyContent: 'center', paddingRight: 10 },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', lineHeight: 22, marginBottom: 6 },
  listDate: { fontSize: 13, color: '#999999', fontWeight: '500' },
  
  // Details
  detailImage: { width: '100%', height: 250, borderRadius: 16, backgroundColor: '#F8F8F9', marginBottom: 20 },
  detailDate: { fontSize: 14, color: '#999999', fontWeight: '500', marginBottom: 10 },
  detailTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 15, lineHeight: 32 },
  detailBody: { fontSize: 16, color: '#444444', lineHeight: 26 },
});
