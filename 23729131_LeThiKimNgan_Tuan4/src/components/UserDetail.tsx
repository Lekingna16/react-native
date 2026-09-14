import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

export const UserDetail: React.FC = () => {
  // State quản lý thông tin user với kiểu User | null, ban đầu là null
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải thông tin user:', error);
      });
  }, []);

  // Khi chưa có dữ liệu: hiện màn hình trống
  if (!user) {
    return <View style={styles.container} />;
  }

  // Khi có dữ liệu: Đổ đúng các trường trong API vào giao diện bằng Optional Chaining (user?.name)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Thông tin liên hệ</Text>
        <View style={styles.row}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{user?.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại</Text>
          <Text style={styles.value}>{user?.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Website</Text>
          <Text style={styles.valueLink}>{user?.website}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Địa chỉ</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Đường</Text>
          <Text style={styles.value}>{user?.address?.street}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Căn hộ/Phòng</Text>
          <Text style={styles.value}>{user?.address?.suite}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thành phố</Text>
          <Text style={styles.value}>{user?.address?.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mã bưu điện</Text>
          <Text style={styles.value}>{user?.address?.zipcode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tọa độ</Text>
          <Text style={styles.value}>
            {user?.address?.geo?.lat}, {user?.address?.geo?.lng}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Công ty</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Tên công ty</Text>
          <Text style={styles.value}>{user?.company?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Khẩu hiệu</Text>
          <Text style={styles.value}>{user?.company?.catchPhrase}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lĩnh vực</Text>
          <Text style={styles.value}>{user?.company?.bs}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  valueLink: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
});
