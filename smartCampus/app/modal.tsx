import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * ModalScreen Component
 * 
 * Layout Decisions:
 * - Fluid view container (`flex: 1`, `padding: 24`) avoiding fixed modal box heights.
 * - Text centering with multi-line text wrapping (`flexShrink: 1`, `textAlign: 'center'`).
 */
export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Hộp thoại Thông báo Chi tiết & Hướng dẫn Sử dụng SmartCampus
        </ThemedText>

        <ThemedText style={styles.description}>
          Đây là cửa sổ hộp thoại mẫu (Modal Screen) được cấu hình theo kiểu hiển thị đè lên màn hình chính. Cấu hình định tuyến này được thiết lập trong tập tin app/_layout.tsx.
        </ThemedText>

        <Link href="/" dismissTo style={styles.linkButton}>
          <ThemedText type="link" style={styles.linkText}>
            &larr; Quay lại màn hình trang chủ chính của ứng dụng
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Container: Flex 1 centered layout with responsive padding
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  // Card Wrapper: Soft background outline with dynamic auto-sizing height
  card: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.08)',
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 36,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    opacity: 0.9,
  },
  linkButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 126, 164, 0.12)',
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

