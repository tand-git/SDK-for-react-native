# Sphere Android SDK

* [기본 연동](#기본-연동)
  * [Sphere Analytics 시작하기](#sphere-analytics-시작하기)
  * [샘플 소스 및 연동 검증 가이드](#샘플-소스-및-연동-검증-가이드)
  * [SDK 다운로드](#sdk-다운로드)
  * [안드로이드 스튜디오 프로젝트 설정](#안드로이드-스튜디오-프로젝트-설정)
  * [SDK 업데이트](#sdk-업데이트)
  * [프로가드 설정](#프로가드-설정)
  * [AndroidManifest 설정](#androidmanifest-설정)
  * [SDK 초기화하기](#sdk-초기화하기)
  * [SphereBridge 설정](#spherebridge-설정)
  * [프로세스 강제 종료 시 추가 설정](#프로세스-강제-종료-시-추가-설정)
* [추가 설정](#추가-설정)
  * [로그 출력](#로그-출력)
  * [이벤트 즉시 전송](#이벤트-즉시-전송)
  * [이벤트 수집 비활성화](#이벤트-수집-비활성화)
  * [Sphere ID 확인](#Sphere-ID-확인)

* [Push 연동](#push-연동)
  * [FCM 등록 토큰 설정](#fcm-등록-토큰-설정)
  * [푸시 메시지 서비스 등록](#푸시-메시지-서비스-등록)
  * [앱 실행 시 인텐트 설정](#앱-실행-시-인텐트-설정)
* [푸시메시지 데이터 전달](#푸시메시지-데이터-전달)
## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

### Sphere Analytics 시작하기

Sphere Analytics 사용을 위해서는 기본적으로 앱키(App key)가 필요합니다.  
앱키가 없는 경우 Sphere Analytics 콘솔([https://analytics.tand.kr](https://analytics.tand.kr), Chrome 브라우저 활용)을 방문하여 회원 가입 및 로그인 후 앱등록 단계에서 앱키를 발급받습니다.

### 샘플 소스 및 연동 검증 가이드

* [SDK 샘플 소스](sample) : 최신 버전의 Sphere SDK가 연동된 샘플 소스를 확인할 수 있습니다.
* [SDK 연동 검증 가이드](https://github.com/tand-git/sphere-sdk/blob/master/guide/SDK_Inspection.md) : 기본 연동이 완료되었다면 SDK 연동 검증 가이드에 따라 SDK 동작 상태를 확인할 수 있습니다.

### SDK 다운로드

SDK 라이브러리를 다운로드하기 위해서는 [SDK 다운로드 페이지](https://github.com/tand-git/android-sdk/releases)를 방문하면 현재까지 릴리즈된 SDK 버전들을 확인할 수 있으며 가장 최신 버전의 SDK 파일(sphere_sdk.aar)을 선택하여 다운로드 합니다.

### 안드로이드 스튜디오 프로젝트 설정

1. 해당 모듈의 libs 폴더에 SDK 파일(.aar)을 복사합니다.
2. 해당 모듈의 `build.gradle` 파일에 아래 내용을 추가합니다.

`<build.gradle>`

```script
dependencies {
    implementation files('libs/sphere_sdk.aar')
}
```

### SDK 업데이트

SDK 업데이트를 위해 라이브러리(sphere_sdk.aar) 파일을 교체하는 경우 반드시 프로젝트 동기화 작업이 필요합니다.  
동기화 방법은 안드로이드 스튜디오 상단 메뉴 중 "File" > "Sync Project with Gradle Files"를 선택하면 프로젝트 동기화 작업이 시작됩니다.

### 프로가드 설정

프로가드를 사용 중인 경우 다음 코드를 프로가드 파일에 추가합니다.

```script
-keep class com.sphere.core.* { *;}
-keep class com.sphere.analytics.* { *;}
-keep class com.sphere.message.* { *;}
```

### AndroidManifest 설정

1. 권한 설정

인터넷 연결 및 네트워크 연결 상태 확인을 위해 사용 권한이 필요합니다.

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
   <uses-permission android:name="android.permission.INTERNET"/>
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   ...
</manifest>
```

2. 패키지 공개 상태 설정

Android 11에서는 앱이 사용자가 기기에 설치한 다른 앱을 쿼리하기 위해서는 패키지 공개 상태를 설정해야 합니다.  
앱이 아래 조건에 모두 해당되는 경우에는 패키지 공개 상태 설정이 필요합니다.

* 앱의 targetSdkVersion이 30 이상인 경우
* Sphere 콘솔에서 “App trends” (앱 설치 패턴 분석)에 대한 서비스 사용을 원하는 경우

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
    <queries>
        <intent>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent>
    </queries>
   ...
</manifest>
```

### SDK 초기화하기

Sphere SDK 라이브러리를 프로젝트에 추가하였다면 다음 코드와 같이 앱키와 함께 Sphere SDK를 초기화합니다.  
앱키가 없는 경우 [Sphere Analytics 시작하기](#sphere-analytics-시작하기)을 참고하여 앱키를 발급받습니다.

`<AndroidManifest.xml>`

```xml
<application
       android:name=".MyApplication">
    ...
</application>
```

`<Java> - MyApplication.java`

```java
import android.app.Application;
import com.sphere.analytics.SphereAnalytics;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");
    }
}
```

### SphereBridge 설정
1. [SDK for ReactNative 다운로드 페이지]()에서 SphereBridge.java, SphereBridgePackage.java 파일을 다운받아 프로젝트에 추가합니다. 
2. 추가된 패키지를 MyApplication.java에서 주석된 부분을 확인 후 추가하여 설정합니다. 
`<Java> - MyApplication.java`

```java
import android.app.Application;
import com.sphere.analytics.SphereAnalytics;

public class MyApplication extends Application {
    
    private final ReactNativeHost mReactNativeHost =
        new ReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
                // 아래와 같이 SphereBridgePackage를 추가합니다.
                packages.add(new SphereBridgePackage());
            
            return packages;
            }

            @Override
            protected String getJSMainModuleName() {
            return "index";
            }
        };
    ...
    ...
}
```

### 프로세스 강제 종료 시 추가 설정

앱 종료 시 강제적으로 프로세스를 종료 시키는 앱의 경우만 해당된 설정입니다. 앱이 강제 종료가 되면 앱의 사용 시간을 정확히 알 수가 없기 때문에 추가적인 연동이 필요합니다.

만약 `android.os.Process.killProcess` 또는 `System.exit`와 같은 코드를 이용하여 앱을 강제 종료한다면 정상적인 세션 기록을 위해 해당 코드 이전에 `updateSessionBeforeProcessKill` 함수를 호출해야 합니다.

```java
// 강제 종료 이전에 세션 업데이트 함수 호출
SphereAnalytics.updateSessionBeforeProcessKill();

// 앱 종료 시 강제적으로 프로세스를 종료한다면 위의 코드 호출 필요
android.os.Process.killProcess(android.os.Process.myPid());
```

## 추가 설정

> 추가 설정은 필수적인 연동 사항은 아니며 필요한 경우 선택적으로 사용이 가능합니다.

### 로그 출력

로그 출력 함수를 활성화 하면 세션의 시작과 종료 및 이벤트 기록 로그와 에러 로그들을 확인할 수 있습니다.  
기본 설정은 비활성화 상태이며 출력되는 로그들은 [SDK 로그를 통한 검증](#sdk-로그를-통한-검증)에서 확인 가능합니다.

`<Java>`

```java
SphereAnalytics.enableLog(true); // 활성화
```

### 이벤트 즉시 전송

기본적으로 Sphere Analytics는 앱이 실행된 후 비활성화되는 시점에 자동으로 기록된 모든 이벤트들을 서버에 전송합니다.  
하지만 `requestUpload` 함수를 호출할 경우 호출 시점까지 기록된 모든 이벤트들을 즉시 서버로 전송이 가능하며 해당 시점에 즉시 이벤트 수집이 필요한 경우에만 사용하기를 권장합니다.

`<Java>`

```java
SphereAnalytics.requestUpload();
```

### 이벤트 수집 비활성화

Sphere Analytics의 이벤트 수집 기능을 비활성화하기를 원할 경우 아래와 같은 코드를 추가합니다.
기본 설정은 활성화 상태이며 비활성화된 이후로는 다시 활성화하기 전까지 이벤트가 수집되지 않습니다.

`<Java>`

```java
SphereAnalytics.setAnalyticsCollectionEnabled(false); // 비활성화
```

### Sphere ID 확인

Sphere ID는 Sphere에서 기기를 식별하는 고유한 식별자로서 앱 설치 시 SDK 내부에서 항상 새롭게 생성이 되므로 삭제 후 재설치 시 새로운 Sphere ID가 생성이 됩니다.  
Sphere ID를 확인하기 위해서는 `getSphereId` 함수를 호출하여 SDK로부터 Sphere ID를 가져온 후 로그를 출력하여 확인할 수 있습니다.

`<Java>`

```java
String sphereId = SphereAnalytics.getSphereId(context);
Log.v("Sphere", "Sphere ID: " + sphereId);
```



## Push 연동

> 푸시 메시지 기능을 사용하기 위해서는 Sphere SDK 연동가이드의 기본 연동 및 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정이 필수적으로 완료되어야 메시지 수신이 가능합니다.

* [Sphere SDK Android 연동가이드](https://github.com/tand-git/sdk-for-react-native/tree/master/android) : [기본 연동](https://github.com/tand-git/sdk-for-react-native/tree/master/android#기본-연동)
* [Android 기반 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정](https://firebase.google.com/docs/cloud-messaging/android/client)

SDK 기본 연동 및 푸시 메시지 연동이 모두 완료된 샘플 프로젝트는 아래 샘플 소스 참조 사이트에서 확인이 가능합니다.  
샘플 프로젝트를 통해 단말에서 메시지 전송 테스트를 하기 위해서는 Firebase 콘솔에서 샘플앱 프로젝트를 생성 후 발급받은 `google-services.json` 파일로 교체해야 테스트가 가능합니다.

* 샘플 소스: [https://github.com/tand-git/android-sdk/tree/master/message/sample](https://github.com/tand-git/android-sdk/tree/master/message/sample)

### FCM 등록 토큰 설정

> FCM(Firebase Cloud Messaging)을 통해 푸시 메시지를 전송하기 위해서는 FCM 등록 토큰이 필요합니다.

기존 앱 사용자들의 FCM 등록 토큰을 설정하기 위해서 다음 코드와 같이 Firebase로 부터 등록된 토큰을 가져오거나  
만약 앱에서 FCM 토큰을 저장하고 있다면 앱에 저장된 토큰을 `setFcmToken`를 통해 SDK에 전달합니다.

`<Java> - MyApplication.java`

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
            @Override
            public void onComplete(@NonNull Task<String> task) {
                // Sphere SDK 푸시 토큰 설정
                if (task.isSuccessful()) {
                    String token = task.getResult();
                    SpherePushMessage.setFcmToken(token);
                }
            }
        });
    }
}
```

### 푸시 메시지 서비스 등록

> 푸시 메시지 서비스 등록이 연동되지 않을 경우 앱 실행 중 푸시 메시지 전송 시 메시지가 알림창에 표시되지 않습니다.

`FirebaseMessagingService` 클래스를 상속한 푸시 메시지 서비스를 등록하고 아래 샘플 코드와 같이 `onNewToken`, `onMessageReceived` 메소드를 재정의합니다. 앱에 이미 등록된 `FirebaseMessagingService`가 있다면 기존 등록된 서비스에 `onNewToken`, `onMessageReceived` 메소드를 재정의해야 합니다.  
만약 앱에서 타사의 푸시 메시지 SDK를 연동 중이라면 해당 SDK 내부에서 `FirebaseMessagingService`를 등록하고 있는 지 확인이 필요하며 ***중복 등록 시 정상적인 푸시 서비스가 불가능합니다***.

`<AndroidManifest.xml>`

```xml
<application>
    <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_name"
            android:value="SphereChannel"/>
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_description"
            android:value="SphereChannel"/>
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationActions" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                <action android:name="com.htc.intent.action.QUICKBOOT_POWERON"/>
            </intent-filter>
        </receiver>

    <service
        android:name=".MyFirebaseMessagingService"
        android:exported="false">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</application>
```

`<Java> - MyFirebaseMessagingService.java`

```java
public class MyFirebaseMessagingService extends RNPushNotificationListenerService {
    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        if (SpherePushMessage.isSpherePushMessage(remoteMessage.getData())) {
            // Sphere 푸시 메시지 데이터 처리: 앱이 실행 중인 경우 알림창에 메시지 표시
            SpherePushMessage.handleMessageReceived(remoteMessage.getData());
        } else {
            // Sphere 푸시 메시지가 아닌 경우 처리
        }
        super.onMessageReceived(remoteMessage);
    }
}
```


### 앱 실행 시 인텐트 설정

> 앱 실행 시 인텐트 설정이 연동되지 않을 경우 Sphere 콘솔에서 "메시지 오픈"에 대한 통계 데이터가 부정확할 수 있습니다.

사용자가 발송된 푸시 메시지를 클릭하여 실행되는 Activity에 `onNewIntent`를 재정의 하여 아래 샘플 코드와 같이 `Intent`를 Sphere SDK에 전달해야 합니다.

앱 실행 시 시작되는 Activity
1. AndroidManifest.xml에 카테고리가 `android.intent.category.LAUNCHER`인 Activity
2. 앱 링크를 사용하고 있다면 앱 링크를 통해 실행되는 Activity

`<Java> - MyActivity.java`

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
        SpherePushMessage.handleNewIntent(intent);
    }
}
```

## 푸시메시지 데이터 전달

> 푸시 메시지 전송 시 데이터(키/값)를 함께 전달하기 위해서는 [키-값 이용 가이드](https://www.notion.so/Key-value-c65b4843b7cd4b6e80e91ad994af52b2)를 참고하여 Sphere 콘솔에서 푸시메시지 입력 시 키/값을 설정해야 합니다.

데이터(키/값)와 함께 푸시메시지를 전송하면 메시지 클릭 시 실행되는 `Activity`로 데이터가 전달됩니다.  
만약 링크를 통해 앱 내 특정 페이지로 이동할 경우 링크에 해당하는 키/값이 `Activity`로 전달되면 해당 링크를 확인하여 링크 페이지로 이동하는 코드를 구현해야 합니다.

`<Java>`

```java
public class MainActivity extends AppCompatActivity {

    private static final String KEY_YOUR_PUSH_LINK = "key_your_push_link";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 푸시메시지 커스텀 데이터 전달 처리
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            String link = extras.getString(KEY_YOUR_PUSH_LINK);
            // 링크 페이지로 이동
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        // 푸시메시지 커스텀 데이터 전달 처리
        Bundle extras = intent.getExtras();
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            String link = extras.getString(KEY_YOUR_PUSH_LINK);
            // 링크 페이지로 이동
        }
    }
}
```
