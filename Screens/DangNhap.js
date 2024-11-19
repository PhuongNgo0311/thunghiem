import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://671c7a012c842d92c382f99d.mockapi.io/user';

const DangNhap = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError(''); // Xóa thông báo lỗi trước đó
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch(API_URL);
      const users = await response.json();

      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        dispatch({ type: 'addData', payload: user });
        dispatch({ type: 'log_in' });
        navigation.goBack();
      } else {
        setError('Email hoặc mật khẩu không chính xác!');
      }
    } catch (err) {
      console.error('Lỗi khi đăng nhập:', err.message);
      Alert.alert('Lỗi', 'Không thể kết nối với máy chủ. Vui lòng thử lại sau!');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/backgroundYoutube1.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>SignIn </Text>
          

          <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
              <Text style={styles.registerLink}>Đăng ký tại đây</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Text style={styles.socialButtonText}>Connect With google</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
  position: 'absolute',
  top: 40,
  left: 20,
  zIndex: 1,
  backgroundColor: 'black', // Thêm màu nền đen
  borderRadius: 70, // Tạo hình tròn cho nút
  padding: 5, // Thêm khoảng cách xung quanh biểu tượng
},
  formContainer: {
    width: 380,
    height: 800,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 200,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 70,
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'black',
    fontSize: 24,
    marginBottom: 10,
  },
loginButton: {
  width: 90,
  height: 40,
  backgroundColor: 'red', // Thay đổi màu nền thành đỏ
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginBottom: 20,
},
loginButtonText: {
  fontSize: 15,
  fontWeight: 'bold',
  color: 'black', // Giữ chữ màu đen
},
registerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
registerText: {
  color: 'black',
},
registerLink: {
  color: 'green',
  fontWeight: 'bold',
},
socialButton: {
  width: 300, // Độ rộng cố định
  height: 30, // Chiều cao cố định
  justifyContent: 'center', // Canh giữa nội dung theo chiều dọc
  alignItems: 'center', // Canh giữa nội dung theo chiều ngang
  backgroundColor: 'black', // Nền màu đen
  borderRadius: 0, // Bỏ bo tròn để có góc vuông
},

  
socialButtonText: {
  color: '#fff',
  fontSize: 14,
  marginLeft: 10, // Space between icon and text
  flex: 1, // This makes the text take up the available space
  textAlign: 'center', // Centers the text within its space
},
});
