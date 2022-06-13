# Sphere SDK Guide for React-native

* [기본 연동](#기본-연동)
  * [Sphere Analytics 시작하기](#sphere-analytics-시작하기)
  * [샘플 소스 및 연동 검증 가이드](#샘플-소스-및-연동-검증-가이드)
  * [SDK 다운로드](#sdk-다운로드-for-react-native)
  * [프로젝트 내 설정](#프로젝트-내-설정)
  * [OS별 Bridge 설정하기](#os별-bridge-설정하기)
  * [웹뷰 설정](#웹뷰-설정)
  * [프로가드 설정](#프로가드-설정)
* [iOS/Android SDK 설정](#ios-android-sdk-설정)
* [Web SDK 설정](#web-sdk-설정)
* [이벤트 연동하기](#이벤트-연동하기)
* [사용자 속성 연동하기](#사용자-속성-연동하기)
  * [사용자 아이디 설정](#사용자-아이디-설정)
  * [사용자 정보 설정](#사용자-정보-설정)
  * [커스텀 사용자 속성 설정](#커스텀-사용자-속성-설정)
  * [커스텀 사용자 포인트 설정](#커스텀-사용자-포인트-설정)
* [사용자 푸시 동의 설정 (네이티브 SDK 연동 시)](#사용자-푸시-동의-설정)
* [추가 설정](#추가-설정)
    * [로그 출력](#로그-출력)
    * [비로그인 사용자 이벤트 수집](#비로그인-사용자-이벤트-수집)
* [Push 설정](#Push-설정)
    * [Library 설치](#library-설치)
    * [Push알림 권한 설정](#push알림-권한-설정)
    * [iOS/Android Push 연동](#ios-android-push-설정)
    * [푸시메시지 데이터 전달](#푸시메시지-데이터-전달)
    
## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

### Sphere Analytics 시작하기

Sphere Analytics 사용을 위해서는 기본적으로 앱키(App key)가 필요합니다.  
앱키가 없는 경우 Sphere Analytics 콘솔([https://analytics.tand.kr](https://analytics.tand.kr), Chrome 브라우저 활용)을 방문하여 회원 가입 및 로그인 후 앱등록 단계에서 앱키를 발급받습니다.

### 샘플 소스 및 연동 검증 가이드

* [SDK 샘플 소스](sample) : 최신 버전의 Sphere SDK가 연동된 샘플 소스를 확인할 수 있습니다.
* [SDK 연동 검증 가이드](https://github.com/tand-git/sphere-sdk/blob/master/guide/SDK_Inspection.md) : 기본 연동이 완료되었다면 SDK 연동 검증 가이드에 따라 SDK 동작 상태를 확인할 수 있습니다.

### SDK 다운로드 for react native

* SDK 다운로드 : [iOS SDK](https://github.com/tand-git/ios-sdk/releases) | [Android SDK](https://github.com/tand-git/android-sdk/releases) | [React native SDK](https://github.com/tand-git/react-native-sdk/releases)
각 OS별 SDK를 방문하여 현재까지 릴리즈된 SDK 버전들을 확인할 수 있으며 가장 최신 버전의 SDK 파일을 선택하여 다운로드 합니다.

### 프로젝트 내 설정

1. iOS 설정가이드 : 링크 - 기본연동(SDK 초기화 부분까지)
2. android 설정가이드 : 링크 - 기본연동(SDK 초기화 부분까지)
3. SDK 파일(sphereSDK.js)을 해당 프로젝트의 libs 폴더에 복사합니다.

### OS별 Bridge 설정하기
 * iOS
    1. SDK Bridge 파일들을(SphereBridge.h,SphereBridge.m)프로젝트로 복사합니다.
        
        `<Objective-C> - AppDelegate.m`
        ```objectivec
        @import SphereSDK;

        - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{

            //SphereBridge 코드를 추가합니다.(view페이지에 삽입)
            RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
            RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"testRn" initialProperties:nil];

            // Sphere Analytics SDK 초기화
            [SPRAnalytics configureWithAppKey:@"Your Sphere Analytics App Key"];

            return YES;
        }
        @end

        ```
* Android
    1. SDK Bridge 파일들을(SphereBridge.java,SphereBridgePackage.java)프로젝트로 복사합니다.
    `<JAVA> - MainApplication.java`
        ```java
        import com.sphere.analytics.SphereAnalytics;

        public class MainApplication extends Application implements ReactApplication {
            private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                
                @Override
                protected List<ReactPackage> getPackages() {
                @SuppressWarnings("UnnecessaryLocalVariable")
                List<ReactPackage> packages = new PackageList(this).getPackages();
                    //SphereBridge 코드를 추가합니다.
                    packages.add(new SphereBridgePackage());
                return packages;
                }
            }

            @Override
            public void onCreate() {
                super.onCreate();

                // Sphere Analytics SDK 초기화
                SphereAnalytics.configure(this, "Your Sphere SDK App Key");
            }
        }
        ```


### 웹뷰 설정
1. 메인화면 onload 시점에 webView로 Sphere정보를 전달합니다.(onLoad)
2. webSDK에서 전달된 내용을 받아 Android/iOS SDK로 전달합니다.

```js
import {SphereAnalytics} from "../lib/sphereSDK";

// 1번
let onLoadWebView = () =>{
    SphereAnalytics.getSphereInfo().then((rst) => {webview.postMessage(rst)})
};
return (
    <WebView
        ...
        // 1번
        onLoad={onLoadWebView}

        onMessage={(event) => {
            try {
                let msg = JSON.parse(event.nativeEvent.data);
                // 2번
                if (msg.msgType && msg.msgType === 'sphereRnMsg') {
                    SphereAnalytics._postMessage(msg);
                }
            } catch (e) {
                console.log(e)
            }
    }}
    />
)
```

## Web SDK 설정
웹뷰를 사용하는 경우 Web SDK를 설치해야합니다. 

### Web SDK 다운로드 및 설치
[SDK 다운로드 페이지](https://github.com/tand-git/web-sdk/releases)에서 최신 버전의 자바스크립트 SDK 파일(`sphereAnalytics.min.js`)을 웹서버에 다운로드한 후 웹페이지의 `<head>` 태그 내 또는 Sphere 자바스크립트 API 호출 이전 시점에 자바스크립트 SDK 파일을 추가합니다.

```html
<script src="sphereAnalytics.min.js"></>
```

### Web SDK 초기화

webSDK 설치가 완료되었다면 [Sphere Analytics 콘솔](https://analytics.tand.kr)에서 발급받은 앱키로 `init`을 호출하여 자바스크립트 SDK를 초기화합니다.  
초기화가 완료되지 않았거나 정상적인 앱키를 사용하지 않은 경우 데이터가 수집되지 않습니다.
단, webview가 url이 아닌 내부 html인 경우는 다음과 같이 초기화합니다. SphereAnalytics.init();

```js
SphereAnalytics.init("Your Sphere Analytics App Key");
```

## 이벤트 연동하기

> 이벤트는 가장 기본이 되는 수집 정보이며 이벤트는 이벤트명과 파라미터들로 구성이 됩니다.

SDK가 초기화 되었다면 `logEvent` 함수를 이용하여 이벤트를 연동할 수 있으며, 한 이벤트는 최대 25개의 파라미터를 설정할 수 있습니다.
파라미터는 파라미터명과 파라미터값의 쌍으로 구성되며 JSON 타입을 통해 설정이 가능합니다.

이벤트명은 필수이며 파라미터는 없는 경우 `null`로 설정 가능합니다. 이벤트명과 파라미터에 관한 규칙은 다음과 같습니다.

1. 이벤트명
    * 최대 40자  
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용  
    * 첫 글자는 영문 대소문자만 허용

2. 파라미터명
    * 최대 40자  
    * 영문 대소문자, 숫자, 특수 문자 중 ‘_’ 만 허용  
    * 첫 글자는 영문 대소문자만 허용

3. 파라미터값
    * 지원 타입 : String(최대 100자), Number

```js
// 파라미터를 포함한 이벤트 기록
// 파라미터 형식: JSON 타입 { name:value, ... }
var params = { param_name_1: "param_value", param_name_2: 9.9, param_name_3: 1 };
SphereAnalytics.logEvent("event_name_1", params);

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("event_name_2", null);
```

## 사용자 속성 연동하기

> 사용자 속성을 사용할 경우 수집된 이벤트들을 세분화하여 더욱 자세한 분석 정보를 얻을 수 있으며 개인 정보들은 암호화되어 서버에 저장됩니다. 사용자 속성들은 한번 설정되면 이후 재설정 또는 초기화될 때까지 설정된 값으로 유지됩니다.

사용자 속성 연동 시 고려해야 할 사항은 다음과 같으며 해당되는 모든 시점에 사용자 속성들을 설정해야 정확한 분석이 가능합니다.

1. (필수) 실행 후 현재 로그인 여부를 알 수 있는 가장 빠른 시점에 로그온 또는 로그오프 상태에 따라 사용자 아이디 및 사용자 정보를 설정 또는 초기화
2. 로그인 또는 로그아웃 상태 변경 시 해당 상태에 따라 해당 사용자 아이디 및 사용자 정보를 설정 또는 초기화
3. 사용자 정보 변경 시 변경된 속성 설정 또는 사용자 전체 정보 설정

### 사용자 아이디 설정

사용자 아이디는 고객이 고객사의 서비스에 로그인할 때 사용되는 아이디가 아니라, 고객사의 시스템에서 사용자를 관리하는 고유한 식별값을 의미합니다.
고유한 사용자를 구분하기 위한 사용자 아이디로서 설정 여부에 따라 로그인 여부를 판단합니다.  
해당 정보는 유저를 구분하기 위한 용도로만 사용되므로 사용자를 식별하는 고유한 (Unique) 어떠한 식별 아이디도 사용 가능합니다.  
사용자 아이디는 최대 256자까지 설정가능하고 `null`로 설정 시 사용자 아이디 정보는 초기화되고 로그아웃 상태로 설정됩니다.  

```js
if (isLogIn) { // 로그인: ON 상태
    // 사용자 아이디 설정 - 로그인: ON 상태
    SphereAnalytics.setUserId("USER_ID");
} else { // 로그아웃: OFF 상태
    // 사용자 아이디 초기화 - 로그아웃: OFF 상태
    SphereAnalytics.setUserId(null);
}
```

### 사용자 정보 설정

추가적인 사용자 정보(보유 포인트, 등급, 성별, 출생년도)를 설정합니다.  
로그아웃 상태 시 다음과 같이 설정된 사용자 정보들을 초기화해야 합니다.

1. 문자형(등급, 성별) 초기화 : `null`로 설정
2. 숫자형(보유 포인트) 초기화 : `removePoints` 함수 호출
3. 숫자형(출생년도) 초기화 : `0`으로 설정

```js
if (isLogIn) { // 로그인: ON 상태 및 사용자 정보 변경 시 설정

    // 사용자 아이디 설정
    SphereAnalytics.setUserId("USER_ID");
    // 등급 설정
    SphereAnalytics.setGrade("vip");
    // 성별 설정 
    SphereAnalytics.setGender("m"); // 남성: "m", 여성: "f"
    // 출생년도 설정
    SphereAnalytics.setBirthYear(1995);
    // 보유 포인트 설정
    SphereAnalytics.setRemainingPoint(1000);

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null);
    // 등급 초기화
    SphereAnalytics.setGrade(null);
    // 성별 초기화
    SphereAnalytics.setGender(null);
    // 출생년도 초기화
    SphereAnalytics.setBirthYear(0);
    // 보유 포인트 초기화
    SphereAnalytics.removePoints();
}
```

### 커스텀 사용자 속성 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setUserProperty`(문자형) 또는 `setUserPropertyLong`(정수형) 함수를 이용하여 커스텀 사용자 속성을 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removeUserProperty` 함수를 이용하여 초기화가 가능합니다.
또한 문자형 사용자 속성의 경우 속성값을 `null`로 설정 시 해당 속성은 초기화 됩니다.

1. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * "sap"으로 시작되는 속성명은 사전 정의된 속성명으로 사용 불가

2. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name_1", "user_property_value");
SphereAnalytics.setUserPropertyLong("user_property_name_2", 12345);
// 커스텀 사용자 속성 초기화
SphereAnalytics.removeUserProperty("user_property_name_1");
SphereAnalytics.removeUserProperty("user_property_name_2");
```

### 커스텀 사용자 포인트 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setRemainingPoint`(보유 포인트) 함수를 이용하여 커스텀 사용자 포인트를 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removePoints` 함수를 이용하여 초기화가 가능합니다.
또한 사용자의 전체 포인트를 초기화하는 경우 `resetPoints`함수를 이용하여 초기화 가능합니다.

1. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

2. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * setRemainingPoint(포인트) 함수사용 시 "point"로 사전 정의된 포인트명임으로 사용 불가

```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setRemainingPoint( 1234567, "user_point_name");
// 커스텀 사용자 속성 초기화
SphereAnalytics.removePoints("user_point_name");
// 사용자 포인트 전체 초기화(기본포인트 + 커스텀포인트)
SphereAnalytics.resetPoints();
```


## 사용자 푸시 동의 설정

> 사용자의 푸시 동의 설정에 따라 푸시 메시지 발송 허용 여부를 판단하기 위해서는 해당 정보를 SDK에 설정해야 합니다.  

정보성, 광고성 푸시 발송 동의 설정은 필수 항목이며, 야간 푸시 발송은 미설정 시 동의 거부 상태로서 야간에 푸시 메시지가 발송되지 않습니다.

```js
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true);
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(true);
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(true);
```

## 추가 설정

> 추가 설정은 필수적인 연동 사항은 아니며 필요한 경우 선택적으로 사용이 가능합니다.

### 로그 출력

로그 출력을 활성화 하면 SDK 초기화 성공 여부 및 이벤트, 사용자 속성 설정에 관한 로그를 확인할 수 있습니다. 출력되는 로그들은 [SDK 로그를 통한 검증](#sdk-로그를-통한-검증)에서 확인 가능합니다.

```js
SphereAnalytics.setLogLevel("info"); //default: error, 로그 레벨: ['none' | 'error' | 'info']
```

### 비로그인 사용자 이벤트 수집

인터넷 웹브라우저 환경에서는 기본적으로 로그인 사용자의 이벤트들만 수집을 합니다. 만약 비로그인 사용자의 이벤트들 또한 수집하길 원하는 경우 초기화 시 `trackAnonymous` 정보를 true로 설정해야 합니다.

```js
let sphereAs_options  = new Object();
sphereAs_options.trackAnonymous = true; //default: false, 비로그인 사용자 수집 여부

// SDK 초기화
SphereAnalytics.init(
        '[Your Sphere App Key]', sphereAs_options
);
```

## Push 설정
> 푸시메세지 설정은 선택적으로 사용이 가능합니다.

### Library 설치
>NPM
```js
npm install --save react-native-push-notification
```
>Yarn
```js
yarn add react-native-push-notification 
```

### Push알림 권한 설정
> 프로젝트 내 `index.js`에 아래의 권한요청 코드를 추가합니다. 

```js
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    // IOS ONLY
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    requestPermissions: true,
});
```
### iOS Android Push 설정
>각 플랫폼에 맞는 설정을 진행합니다.

* Push 가이드 : [iOS](https://github.com/tand-git/sdk-for-react-native/tree/master/ios#push-%EC%97%B0%EB%8F%99) / [Android](https://github.com/tand-git/sdk-for-react-native/tree/master/android#push-%EC%97%B0%EB%8F%99)

### 푸시메시지 데이터 전달

> 프로젝트 내 `index.js`의 앞서 작성된`PushNotification.configure`에 아래의 코드를 추가합니다. 

> 데이터(키/값)와 함께 푸시메시지를 전송하면 메시지 클릭 시 데이터가 전달됩니다.

> 만약 링크를 통해 앱 내 특정 페이지로 이동할 경우 링크에 해당하는 키/값이 해당 메소드로 전달되면 해당 링크를 확인하여 링크 페이지로 이동하는 코드를 구현해야 합니다.

```js
import PushNotification from "react-native-push-notification";

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
    },
    // IOS ONLY
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    requestPermissions: true,
});
```