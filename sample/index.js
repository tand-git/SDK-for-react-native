/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


import PushNotification from "react-native-push-notification";
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    onNotification: function (notification) {
        let dataCheck = true;
        //sphere 푸시 메세지 확인
        if (Platform.OS === 'android' && notification.data.sphereMsg ) {
            if (notification.data.sphereMsg === "true" ) {
                dataCheck = false;
                notification.data.sphereMsg = "false"
                PushNotification.localNotification(notification)
            }
        }
        if(dataCheck){
            //sphere 푸시 메세지 확인
            if(notification.data['sphere_analytics_id']){
                // 푸시메세지 커스텀 데이터 전달 처리
                let link = (notification.data['KEY_YOUR_PUSH_LINK']);
                // 링크 페이지로 이동
            }

        }
    },
    onRegistrationError: function(err) {
        console.error(err.message, err);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    requestPermissions: true,
});


