import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../config';
import { getDocs, collection } from 'firebase/firestore';
import { FAB } from 'react-native-paper';

export default function HomeScreen({ navigation, user }) {

    const [users, setUsers] = useState(null);

    const getUsers = () => {
        getDocs(collection(db, 'authUser')).then((snapAllData) => {
            let allUsers = [];
            snapAllData.forEach((element) => {
                if (element.id != user.uid) {
                    allUsers.push({ ...element.data(), id: element.id })
                }
            });
            setUsers(allUsers)
            // console.log("Document Users = ", allUsers);
        });
    }
    useEffect(() => {
        getUsers()
    }, [])

    const RenderCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { namee: item.name, uid: item.uid })}>

                <View style={styles.myCard}>
                    <Image source={require('../assets/favicon48px.png')} style={styles.image1} />
                    <View>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={{ marginLeft: 12 }}>{item.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
  
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={users}
                renderItem={({ item }) => <RenderCard item={item} />}
                keyExtractor={(item) => item.id} />
            <FAB style={styles.FAB} medium icon='chat' color='white' onPress={() =>navigation.navigate('Profile')}></FAB>
        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        marginTop: 20,
        alignSelf: 'center',
    },
    image1: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12
    },
    myCard: {
        flexDirection: 'row',
        margin: 5,
        padding: 2,
    },
    FAB: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#128C7E'
    }

});