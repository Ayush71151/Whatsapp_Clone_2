## For creating Project-

    expo init Whatsapp      //create project

    expo start              // run project


## Library Used -

    // Firebase
        npm install firebase 
                npm install firebase/app
                npm install firebase/auth
                @react-native-firebase/storage

    // For running in Website
        npm install react-native-web @expo/webpack-config

    // Navigation
        npm install @react-navigation/native
        npx expo install react-native-screens react-native-safe-area-context

        npm install react-native-paper
        npm install react-native-gifted-chat
        npm install react-native-vector-icons

        for expo -
        npx expo install expo-image-picker    -----   instead of this    -----     npm install react-native-image-picker


## For connecting with Firebase make two file -->

--> config.jsx   // this will make connection betn firebase and react native
--> metro.config.js  // expo not suppport cjs type file of firebase so this will resolve.