package com.testrn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sphere.analytics.SphereJsInterface;

import org.json.JSONException;
import org.json.JSONObject;

class SphereBridge extends ReactContextBaseJavaModule{
    private static ReactApplicationContext reactContext;
    public SphereBridge(ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName(){
        return "SphereBridge";
    }

    @ReactMethod
    public void postMessage(String message) throws JSONException {
        SphereJsInterface.postMessage(message);
    }

    @ReactMethod
    public void sphereInfo(Promise promise) throws JSONException {
        JSONObject msgObj = new JSONObject();
        msgObj.put("commandType","sphereInfo");
        msgObj.put("command","getSphereInfo");
        try{
            promise.resolve(SphereJsInterface.handleSphereData(msgObj));
        }catch (Exception e){
            promise.reject("getSphereInfo Fail", e );
        }
    }
}
