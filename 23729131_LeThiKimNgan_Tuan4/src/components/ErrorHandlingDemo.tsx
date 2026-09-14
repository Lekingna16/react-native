import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { CustomError } from '../types/error';

// Cố tình làm sai URL (đổi products thành products_sai_url)
const WRONG_URL = 'https://dummyjson.com/products_sai_url';

export const ErrorHandlingDemo: React.FC = () => {
  // Hàm hiển thị Alert hỗ trợ cả Native (Android/iOS) và Web
  const notifyError = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'Đóng', style: 'cancel' }]);
    }
  };

  const callApiWithError = async () => {
    try {
      console.log(`[API Request] 🌐 Gửi request đến URL sai: ${WRONG_URL}`);
      const response = await fetch(WRONG_URL);

      if (!response.ok) {
        // Tạo object lỗi khi HTTP status không thành công (ví dụ 404)
        const errObj: CustomError = {
          message: 'Không tìm thấy tài nguyên API (Sai đường dẫn URL)',
          statusCode: response.status,
          details: `Yêu cầu thất bại với mã trạng thái HTTP ${response.status}`,
        };
        throw errObj;
      }

      await response.json();
    } catch (err: unknown) {
      // Ép kiểu lỗi về cấu trúc CustomError
      const customError = err as CustomError;
      console.error('[Catch Block] ⚠️ Đã bắt được lỗi và ép kiểu về CustomError:', customError);

      // Hiện thông báo lên Alert
      notifyError(
        'Thông Báo Lỗi (CustomError)',
        `Nội dung: ${customError.message}\nMã lỗi: ${customError.statusCode ?? 'N/A'}\nChi tiết: ${customError.details ?? 'Không có'}`
      );
    }
  };

  // Tự động gọi API khi mở màn hình để kích hoạt Alert ngay lập tức
  useEffect(() => {
    callApiWithError();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bắt Lỗi API (Sai URL)</Text>
        <Text style={styles.text}>URL gọi: {WRONG_URL}</Text>
        <Text style={styles.subText}>
          Hệ thống đã tự động gọi API sai đường dẫn khi tải trang, bắt lỗi trong khối catch, ép kiểu về CustomError và hiện thông báo lên Alert.
        </Text>

        <TouchableOpacity style={styles.button} onPress={callApiWithError}>
          <Text style={styles.buttonText}>Bấm để hiện lại Alert lỗi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  subText: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
