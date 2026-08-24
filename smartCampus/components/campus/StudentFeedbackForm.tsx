import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/ui/buttons';

interface FormErrors {
  fullName?: string;
  studentId?: string;
  email?: string;
  feedbackNotes?: string;
}

/**
 * StudentFeedbackForm Component
 * 
 * Actionable Field Validation Architecture:
 * 1. Spaces-only Names: Detects strings consisting purely of whitespace (`!fullName.trim()`).
 *    Error Message: "Họ và tên không được chỉ chứa khoảng trắng. Vui lòng nhập họ và tên đầy đủ của sinh viên."
 * 2. Malformed Student IDs: Detects IDs that fail the 8-digit numeric regex (`!/^\d{8}$/.test(studentId)`).
 *    Error Message: "Mã số sinh viên (MSSV) không đúng định dạng. MSSV phải gồm đúng 8 chữ số (ví dụ: 20268888)."
 * 3. Invalid Email Format: Detects invalid email syntax (`!/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
 *    Error Message: "Địa chỉ Email không đúng định dạng. Vui lòng nhập email hợp lệ dạng sinhvien@smartcampus.edu.vn."
 * 4. Overlong Summary: Detects notes exceeding 300 characters (`feedbackNotes.length > 300`).
 *    Error Message: "Nội dung ghi chú quá dài (hiện tại {len}/300 ký tự). Vui lòng rút gọn dưới 300 ký tự."
 * 5. Inline Error UI: Renders clear red error messages directly underneath the invalid input fields 
 *    along with highlighted red input borders.
 */
export function StudentFeedbackForm() {
  const [isSafeMode, setIsSafeMode] = useState<boolean>(true);

  // Form Field State
  const [fullName, setFullName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('Khoa Công nghệ Thông tin');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');

  // Inline Validation Error State
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Actionable Field Validation Handler
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Check Spaces-only / Empty Name
    if (!fullName || fullName.trim().length === 0) {
      newErrors.fullName =
        'Họ và tên không được chỉ chứa khoảng trắng. Vui lòng nhập họ và tên đầy đủ của sinh viên.';
    }

    // 2. Check Malformed Student ID (Must be exactly 8 digits)
    const trimmedId = studentId.trim();
    if (!trimmedId || !/^\d{8}$/.test(trimmedId)) {
      newErrors.studentId =
        'Mã số sinh viên (MSSV) không đúng định dạng. MSSV phải gồm đúng 8 chữ số (ví dụ: 20268888).';
    }

    // 3. Check Email Syntax Format
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email =
        'Địa chỉ Email không đúng định dạng. Vui lòng nhập email hợp lệ dạng sinhvien@smartcampus.edu.vn.';
    }

    // 4. Check Overlong Summary / Feedback Notes (> 300 characters)
    if (feedbackNotes.length > 300) {
      newErrors.feedbackNotes = `Nội dung ghi chú quá dài (hiện tại ${feedbackNotes.length}/300 ký tự). Vui lòng rút gọn nội dung đóng góp dưới 300 ký tự.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const isValid = validateForm();
    if (isValid) {
      alert(`Gửi phản hồi thành công!\nCảm ơn sinh viên ${fullName.trim()} đã đóng góp ý kiến.`);
      setErrors({});
    }
  };

  // Test Error Presets
  const triggerSpacesNameError = () => {
    setFullName('   ');
    validateForm();
  };

  const triggerMalformedIdError = () => {
    setStudentId('ABC123');
    validateForm();
  };

  const triggerEmailError = () => {
    setEmail('email-sai-dinh-dang');
    validateForm();
  };

  const triggerOverlongSummaryError = () => {
    setFeedbackNotes(
      'Nội dung phản hồi này được viết cố tình kéo dài vượt quá 300 ký tự nhằm mục đích kiểm tra khả năng bắt lỗi nhập liệu văn bản quá dài trên biểu mẫu đóng góp ý kiến sinh viên SmartCampus. ' +
        'Văn bản này bổ sung thêm rất nhiều thông tin chi tiết trùng lặp cho đến khi tổng số ký tự đạt mốc lớn hơn 300 ký tự để hệ thống kiểm soát kích thước đoạn văn phát hiện và cảnh báo chính xác!'
    );
    validateForm();
  };

  /**
   * Form Content Inputs (6 Fields + Actionable Inline Errors)
   */
  const renderFormFields = () => (
    <View style={styles.formFieldsContainer}>
      {/* Field 1: Full Name */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>1. Họ và tên sinh viên *</ThemedText>
        <TextInput
          style={[styles.textInput, errors.fullName ? styles.inputErrorBorder : null]}
          placeholder="Nhập đầy đủ họ và tên..."
          placeholderTextColor="#64748B"
          accessibilityLabel="Họ và tên sinh viên"
          accessibilityHint="Nhập đầy đủ họ và tên của sinh viên"
          accessibilityState={{ disabled: false }}
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
        />
        {errors.fullName && (
          <ThemedText
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite">
            {errors.fullName}
          </ThemedText>
        )}
      </View>

      {/* Field 2: Student ID */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>2. Mã số sinh viên (MSSV) *</ThemedText>
        <TextInput
          style={[styles.textInput, errors.studentId ? styles.inputErrorBorder : null]}
          placeholder="Nhập MSSV gồm 8 chữ số (ví dụ: 20268888)"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
          accessibilityLabel="Mã số sinh viên MSSV"
          accessibilityHint="Nhập đúng 8 chữ số mã số sinh viên"
          value={studentId}
          onChangeText={(val) => {
            setStudentId(val);
            if (errors.studentId) setErrors((prev) => ({ ...prev, studentId: undefined }));
          }}
        />
        {errors.studentId && (
          <ThemedText
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite">
            {errors.studentId}
          </ThemedText>
        )}
      </View>

      {/* Field 3: Faculty */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>3. Khoa / Viện đào tạo</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tên Khoa / Viện..."
          placeholderTextColor="#64748B"
          accessibilityLabel="Khoa hoặc Viện đào tạo"
          value={faculty}
          onChangeText={setFaculty}
        />
      </View>

      {/* Field 4: Email */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>4. Địa chỉ Email sinh viên *</ThemedText>
        <TextInput
          style={[styles.textInput, errors.email ? styles.inputErrorBorder : null]}
          placeholder="sinhvien@smartcampus.edu.vn"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          accessibilityLabel="Địa chỉ Email sinh viên"
          accessibilityHint="Nhập địa chỉ email hợp lệ của trường"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && (
          <ThemedText
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite">
            {errors.email}
          </ThemedText>
        )}
      </View>

      {/* Field 5: Phone */}
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>5. Số điện thoại liên hệ</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="0912 xxx xxx"
          placeholderTextColor="#64748B"
          keyboardType="phone-pad"
          accessibilityLabel="Số điện thoại liên hệ"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Field 6: Overlong Feedback Summary Notes */}
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <ThemedText style={styles.inputLabel}>
            6. Ghi chú & Ý kiến đóng góp (Tối đa 300 ký tự)
          </ThemedText>
          <ThemedText style={[styles.charCounter, feedbackNotes.length > 300 ? styles.overlimitCounter : null]}>
            {feedbackNotes.length}/300
          </ThemedText>
        </View>
        <TextInput
          style={[
            styles.textInput,
            styles.multilineInput,
            errors.feedbackNotes ? styles.inputErrorBorder : null,
          ]}
          placeholder="Nhập chi tiết nội dung đóng góp ý kiến (dưới 300 ký tự)..."
          placeholderTextColor="#64748B"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          accessibilityLabel="Nội dung ghi chú và ý kiến đóng góp chi tiết"
          accessibilityHint="Tối đa 300 ký tự"
          value={feedbackNotes}
          onChangeText={(val) => {
            setFeedbackNotes(val);
            if (errors.feedbackNotes) setErrors((prev) => ({ ...prev, feedbackNotes: undefined }));
          }}
        />
        {errors.feedbackNotes && (
          <ThemedText
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite">
            {errors.feedbackNotes}
          </ThemedText>
        )}
      </View>

      {/* Preset Error Test Buttons */}
      <View style={styles.testPresetsBox}>
        <ThemedText style={styles.testPresetsTitle}>Thử nghiệm nhanh các trường hợp lỗi nhập liệu:</ThemedText>
        <View style={styles.presetButtonsRow}>
          <TouchableOpacity style={styles.presetBtn} onPress={triggerSpacesNameError}>
            <ThemedText style={styles.presetBtnText}>1. Họ tên chỉ có khoảng trắng</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetBtn} onPress={triggerMalformedIdError}>
            <ThemedText style={styles.presetBtnText}>2. MSSV sai chữ số</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetBtn} onPress={triggerEmailError}>
            <ThemedText style={styles.presetBtnText}>3. Email không đúng định dạng</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetBtn} onPress={triggerOverlongSummaryError}>
            <ThemedText style={styles.presetBtnText}>4. Ghi chú quá 300 ký tự</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Submit Button */}
      <View style={styles.submitButtonWrapper}>
        <PrimaryButton
          title="Kiểm tra & Gửi phản hồi đóng góp"
          iconName="graduationcap.fill"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.cardWrapper}>
      {/* Header Mode Switcher Controls */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.cardTitle}>
          Biểu mẫu Phản hồi Sinh viên
        </ThemedText>
        <TouchableOpacity
          style={[styles.modeBadge, isSafeMode ? styles.safeModeBadge : styles.failureModeBadge]}
          onPress={() => setIsSafeMode((prev) => !prev)}
          activeOpacity={0.8}>
          <ThemedText style={[styles.modeBadgeText, isSafeMode ? styles.safeText : styles.failureText]}>
            {isSafeMode ? 'Chế độ: An toàn bàn phím (Sửa)' : 'Chế độ: Lỗi che bàn phím (Lỗi)'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Mode 1: FAILURE MODE (Plain View) */}
      {!isSafeMode ? (
        <View style={styles.failureContainer}>
          {renderFormFields()}
        </View>
      ) : (
        /* Mode 2: KEYBOARD-SAFE SCROLLING STRUCTURE FIX */
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <Pressable style={styles.pressableDismiss} onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {renderFormFields()}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
  },
  modeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  safeModeBadge: {
    backgroundColor: '#DCFCE7',
  },
  failureModeBadge: {
    backgroundColor: '#FEE2E2',
  },
  modeBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  safeText: {
    color: '#15803D',
  },
  failureText: {
    color: '#B91C1C',
  },
  failureContainer: {
    // Non-scrolling container causing keyboard obstruction
  },
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  pressableDismiss: {
    flexGrow: 1,
  },
  scrollContentContainer: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  formFieldsContainer: {
    gap: 14,
    marginTop: 6,
  },
  inputGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    flexShrink: 1,
  },
  charCounter: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#64748B',
  },
  overlimitCounter: {
    color: '#DC2626',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#0F172A',
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  multilineInput: {
    minHeight: 100,
  },
  errorText: {
    fontSize: 13,
    color: '#B91C1C',
    fontWeight: 'bold',
    marginTop: 2,
    lineHeight: 18,
  },
  testPresetsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 4,
  },
  testPresetsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
  },
  presetButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  presetBtn: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  presetBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  submitButtonWrapper: {
    marginTop: 8,
  },
});
