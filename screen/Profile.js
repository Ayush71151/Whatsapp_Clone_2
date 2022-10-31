import { ActivityIndicator, Image, StyleSheet, Alert, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config'
import { Button } from 'react-native-paper'

const Profile = ({ user }) => {

  const [profile, setProfile] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getDoc(doc(db, 'authUser', user.uid)).then((data) => {
      if (data.exists()) {
        setProfile(data.data())
        setName(data.data().name)
        setPhone(data.data().phone)
        setEmail(data.data().email)
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  if (!profile) {
    return (
      <View style={styles.loder}>
        <ActivityIndicator color={'#25D366'} size={60} />
      </View>
    );
  }

  const update = () => {
    updateDoc(doc(db, "authUser", user.uid), {
      name: name,
      email: email,
      phone: phone,
    }).then(() => {
      // console.log('data Submitted');
      Alert.alert('Alert msg', 'success');
    }).catch((error) => {
      console.warn(error);
    });
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/whatsapp_logo.png')} style={styles.image} />
      {/* <Text style={styles.txt}> Name - {profile.name}</Text> */}
      <View style={{ flex: 1 }}>
        <TextInput value={name} onChangeText={(txt) => { setName(txt) }} style={styles.textInput1} />
        <TextInput value={email} onChangeText={(email) => { setEmail(email) }} style={styles.textInput1} />
        <TextInput value={phone} onChangeText={(phone) => { setPhone(phone) }} style={styles.textInput1} />
        <Button mode='contained' style={styles.button} onPress={() => { update() }}>Update</Button>
        <Button mode='contained' style={styles.button}>LogOut</Button>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25D366',
    alignItems: 'center',
  },
  loder: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white'
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  },
  textInput1: {
    margin: 5,
    paddingHorizontal: 5,
    height: 50,
    width: 325,
    backgroundColor: 'white',
    borderRadius: 20,
  },
})