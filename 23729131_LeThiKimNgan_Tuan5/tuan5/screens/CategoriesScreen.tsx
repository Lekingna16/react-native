import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CategoryChipsWrap from '../components/CategoryChipsWrap';
import TabBar, { TabKey } from '../components/TabBar';

interface CategoriesScreenProps {
  onTabPress?: (tab: TabKey) => void;
  activeTab?: TabKey;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onTabPress,
  activeTab = 'categories',
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header cố định */}
      <Header />

      {/* Vùng nội dung cuộn */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Khám phá theo Danh mục</Text>
          <Text style={styles.bannerSubtitle}>
            Hơn 10,000+ đầu sách thuộc nhiều chủ đề phong phú
          </Text>
        </View>

        {/* Sử dụng lại component CategoryChipsWrap của Bài tập 1 Giờ 2 */}
        <CategoryChipsWrap
          onSelectCategory={(cat) => console.log(`[CategoriesScreen] Chọn: ${cat}`)}
        />
      </ScrollView>

      {/* Tab Bar dùng chung */}
      <TabBar activeTab={activeTab} onTabPress={onTabPress} positionMode="static" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  banner: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#4338CA',
  },
});

export default CategoriesScreen;
