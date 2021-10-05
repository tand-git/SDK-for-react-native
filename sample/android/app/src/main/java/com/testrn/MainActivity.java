package com.testrn;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.sphere.message.SpherePushMessage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "testRn";
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // 푸시메시지 커스텀 데이터 전달 처리
    super.onCreate(savedInstanceState);
    Bundle extras = getIntent().getExtras();
    Log.d("create", String.valueOf(extras));
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
    SpherePushMessage.handleNewIntent(intent);
    Bundle extras = intent.getExtras();
    Log.d("newIntent", String.valueOf(extras));
  }


}
