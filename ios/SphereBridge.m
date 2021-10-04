//
//  SaTandModule.m
//  navigatorEx
//
//  Created by ldja on 2021/08/25.
//
@import WebKit;
@import SphereSDK;

#import "SphereBridge.h"
#import <React/RCTLog.h>


@implementation SphereBridge : NSObject

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(postMessage:(NSDictionary *)message){
  RCTLogInfo(@"[Error in]%@", message);
  NSDictionary *message2 = @{@"sphereJsHandler":message};
  [SPRScriptMessageHandler handlePostMessageBody:message2];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(sphereInfo){
  NSDictionary *sphereInfo = @{@"sphereId":[SPRAnalytics sphereId]
                               , @"appKey":[SPRAnalytics sphereAppKey]
                               , @"version":[SPRAnalytics sphereVersion]
                               , @"versionCode":@([SPRAnalytics sphereVersionCode]).stringValue
  };
  NSData* jsonData = [NSJSONSerialization dataWithJSONObject:sphereInfo options:NSJSONWritingPrettyPrinted error:nil];
  NSString* jsonDataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  return jsonDataStr;
}

@end



