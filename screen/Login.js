import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { auth } from '../config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={styles.loder}>
        <ActivityIndicator color={'#25D366'} size={60} />
      </View>
    );
  }

  const userLogin = async () => {
    setLoading(true)
    if (!email || !password) {
      alert('Please Add Details')
      setLoading(false);
    }
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in 
        setLoading(false);
        navigation.navigate('HomeScreen')
        // ...
      })
      .catch(() => {
        alert("Wrong Credentials")
        setLoading(false);
        navigation.navigate('Login')

      });
 
    }
  }


return (
  <KeyboardAvoidingView behavior='position' >
    <View style={styles.box1}>
      <Image source={require('../assets/whatsapp_logo.png')} style={{ height: 100, width: 100, justifyContent: 'center' }} />
      <Text style={{ color: '#25D366', fontWeight: 'bold', fontSize: 50, marginBottom: 25 }}>WhatsApp</Text>
    </View>
    <View style={styles.box2}>

      <TextInput label='Email' value={email} onChangeText={(email) => { setEmail(email) }} style={styles.textInput1} />
      <TextInput label='Password' value={password} onChangeText={(password) => { setPassword(password) }} secureTextEntry={true} style={styles.textInput1} />
      <Button mode='contained' style={styles.button} onPress={() => { userLogin() }}>LogIn</Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={{ alignSelf: 'center', color: '#25D366' }}>Don't have an account?</Text></TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
)
}
const styles = StyleSheet.create({
  box1: {
    alignItems: 'center',
    marginTop: 100,
  },
  box2: {
    padding: 5,
    margin: 5,
  },
  textInput1: {
    margin: 5,
    paddingHorizontal: 40,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loder: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});