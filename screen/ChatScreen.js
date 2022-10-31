import React, { useState, useCallback, useEffect } from 'react'
// import { View } from 'react-native'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { db } from '../config'
import { addDoc, collection, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore'

export default function ChatScreen({ user, route }) {
    const [messages, setMessages] = useState([]);
    const { uid } = route.params;

    const getAllMsg = async () => {
        const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
        const chatroomsref2 = doc(db, 'chatrooms', docid)
        const chatroomsref3 = collection(chatroomsref2, 'message')
        const chatroomsref4 = await getDocs(chatroomsref3)
        // console.log(chatroomsref4)
        let allUsers = [];
        chatroomsref4.forEach((element) => {
            allUsers.push({
                ...element.data(),
                // id: element.id,
                createdAt: element.data().createdAt.toDate()
            })
        });
        setMessages(allUsers)
    };

    useEffect(() => {
        // getAllMsg() 
        const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
        const chatroomsref2 = doc(db, 'chatrooms', docid)
        const chatroomsref3 = query(collection(chatroomsref2, 'message'),orderBy('createdAt','desc'))

        onSnapshot(chatroomsref3, (querysnap) => {
            let allUsers = [];
            querysnap.forEach((element) => {
                allUsers.push({
                    ...element.data(),
                    createdAt: element.data().createdAt.toDate()
                })
            });
            setMessages(allUsers)
        })
    }, []);

    const onSend = useCallback((messages = []) => {
        const msg = messages[0]
        const mymsg = {
            ...msg,
            sentby: user.uid,
            sentTo: uid,
            createdAt: new Date()
        }
        // console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        let docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
        const chatroomsref = collection(db, 'chatrooms')
        addDoc(collection(chatroomsref, docid, 'message'), mymsg)
    }, []);

    return (
        // <View style={{ flex: 1, backgroundColor:'lightgrey' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.uid
                }}
                renderBubble={(props) => {
                    return (
                        <Bubble {...props} wrapperStyle={{
                            right: { backgroundColor: "#25D366", textColors: 'white' },
                            left: { backgroundColor: "white", marginLeft:-40 }
                        }} />
                    );
                }}
                renderInputToolbar={(props) => {
                    return <InputToolbar {...props} containerStyle={{ marginHorizontal: 15, marginBottom: 3, borderRadius: 25 }} />
                }}
            />
        // </View>
    )
}