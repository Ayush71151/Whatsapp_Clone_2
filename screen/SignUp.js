import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
// import { launchImageLibrary } from 'react-native-image-picker'   //not work with expo
import * as ImagePicker from 'expo-image-picker'
// import { Platform } from 'react-native'
// import storage from '@react-native-firebase/storage'
import { db, auth, } from '../config'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function SignUp({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={styles.loder}>
                <ActivityIndicator color={'#25D366'} size={60} />
            </View>
        );
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let path = await ImagePicker.launchImageLibraryAsync({ quality: 0 });
        // firebase
        // console.log('path = ', path.uri)
        // const storageRef = ref(storage, `profile/${Date.now()}`);
        // uploadBytes(storageRef,uploadUri).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });

        // @react-native-firebase
        // const uploadTask = storage().ref().child(`userprofile/${Date.now()}`).putFile(path.uri)
        // uploadTask.snapshot.ref.getDownloadURL().then((storageurl) => {
        //     console.log(storageurl)
        //     setImage(storageurl)
        // });
    }

    const userSignUp = async () => {
        setLoading(true)
        if (!email || !password || !name || !phone) {
            alert('Please Add Details')
            return
        }
        const result = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(result.user.uid)
        setDoc(doc(db, "authUser", result.user.uid), {
            uid: result.user.uid,
            email: email,
            pass: password,
            name: name,
            phone: phone,
        }).then(() => {
            Alert.alert('Alert msg', 'success');
            setLoading(false)
        }).catch((error) => {
            console.warn(error);
        });
    }

    return (
        <KeyboardAvoidingView behavior='position'>
            <View style={styles.box1}>
                <Image source={require('../assets/whatsapp_logo.png')} style={{ height: 100, width: 100, justifyContent: 'center' }} />
                <Text style={{ color: '#25D366', fontWeight: 'bold', fontSize: 50, marginBottom: 25 }}>WhatsApp</Text>
            </View>
            <View style={styles.box2}>
                {!showNext &&
                    <>
                        <TextInput label='Email' value={email} onChangeText={(email) => { setEmail(email) }} style={styles.textInput1} />
                        <TextInput label='Password' value={password} onChangeText={(password) => { setPassword(password) }} secureTextEntry={true} style={styles.textInput1} />
                    </>
                }
                {
                    showNext ?
                        <>
                            <TextInput label='Name' value={name} onChangeText={(name) => { setName(name) }} style={styles.textInput1} />
                            <TextInput label='Phone' value={phone} onChangeText={(phone) => { setPhone(phone) }} style={styles.textInput1} />
                            <Button mode='contained' style={styles.button} onPress={() => pickImage()}>Select Profile Pic</Button>
                            <Button mode='contained' style={styles.button} onPress={() => userSignUp()}>SignUp</Button>
                        </>
                        :
                        <Button mode='contained' style={styles.button} onPress={() => setShowNext(true)}>Next</Button>
                }
                <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ alignSelf: 'center', color: '#25D366' }}>Already have an account?</Text></TouchableOpacity>

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