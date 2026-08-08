const messages = {
  'auth/email-already-in-use': 'Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.',
  'auth/invalid-email': 'Địa chỉ email không hợp lệ.',
  'auth/weak-password': 'Mật khẩu quá yếu, vui lòng dùng tối thiểu 6 ký tự.',
  'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
  'auth/wrong-password': 'Sai mật khẩu, vui lòng thử lại.',
  'auth/invalid-credential': 'Email hoặc mật khẩu không đúng.',
  'auth/invalid-login-credentials': 'Email hoặc mật khẩu không đúng.',
  'auth/too-many-requests': 'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau ít phút.',
  'auth/network-request-failed': 'Lỗi kết nối mạng, vui lòng kiểm tra internet và thử lại.',
  'auth/user-disabled': 'Tài khoản này đã bị vô hiệu hóa.',
  'auth/missing-password': 'Vui lòng nhập mật khẩu.',
  'auth/configuration-not-found':
    'Firebase Authentication chưa được bật cho dự án này. Vào Firebase Console → Authentication → Sign-in method → bật Email/Password.',
  'auth/operation-not-allowed':
    'Phương thức đăng nhập Email/Password chưa được bật trong Firebase Console.',
};

export function getAuthErrorMessage(error) {
  const code = error?.code || '';
  return messages[code] || 'Đã có lỗi xảy ra, vui lòng thử lại.';
}
