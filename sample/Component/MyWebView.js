/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import {BackHandler
} from 'react-native';
import {WebView} from "react-native-webview";
import {SphereAnalytics} from "../lib/sphereSDK";

const MyWebView =({handleClose}) =>{

    const BASE_URL = 'https://cdn-test.tand.kr/sdk/demo/rn/index2.html';
    const[goBackable] = useState(false);
    useEffect( ()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBAckPress',
            ()=>{
                if( goBackable) webview.goBack();
                else handleClose();
                return true;
            },
        );
        return () => backHandler.remove();
    }, [goBackable]);

    let onLoadWebView = () =>{
        SphereAnalytics.getSphereInfo().then(
            (rst) => {
                // rst 타입 : 'string'
                // json parse 결과값은 아래와 같습니다.
                // "appKey" : "제공된 앱키",
                // "versionCode" : "버전코드",
                // "sphereId" : "sphereId",
                // "version" : "버전정보"
                webview.postMessage(rst)
            }
        )
    };

    return (
        <WebView
    pullToRefreshEnabled={true}
    startInLoadingState={true}
    allowsBackForwardNavigationGestures={true}
    source={{uri: BASE_URL}}
    mixedContentMode={'compatibility'}
    originWhitelist={['https://*', 'http://*']}
    overScrollMode={'never'}
    ref={(webview) => {
        this.webview = webview
    }}
    onMessage={(event) => {
        try {
            let msg = JSON.parse(event.nativeEvent.data);
            if (msg.msgType && msg.msgType === 'sphereRnMsg') {
                SphereAnalytics._postMessage(msg);
            }
        } catch (e) {
            console.log(e)
        }
    }}
    onLoad={onLoadWebView}
    />
    )
}
export default MyWebView;
