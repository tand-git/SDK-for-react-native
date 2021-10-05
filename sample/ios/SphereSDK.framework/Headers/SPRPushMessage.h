//
//  SPRPushMessage.h
//  SphereSDK
//
//  Created by Hwan on 2020/10/13.
//  Copyright © 2020 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SpherePushMessage)
@interface SPRPushMessage : NSObject

+ (void)setFcmToken:(nullable NSString *)token;

+ (BOOL)hasFcmToken;

+ (NSString *)setAPNSDeviceToken:(nullable NSData *)deviceToken;
+ (void)setAPNSDeviceTokenString:(nullable NSString *)deviceTokenString;

+ (void)agreePushMessageForInformation:(BOOL)agree;

+ (void)agreePushMessageForAdvertisement:(BOOL)agree;

+ (void)agreePushMessageAtNight:(BOOL)agree;

+ (BOOL)isSphereNotificationResponse:(UNNotificationResponse *)response API_AVAILABLE(ios(10.0));
+ (BOOL)isSphereNotification:(UNNotification *)notification API_AVAILABLE(ios(10.0));
+ (BOOL)isSphereNotificationUserInfo:(NSDictionary *)userInfo;

+ (BOOL)handlePresentNotification:(UNNotification *)notification API_AVAILABLE(ios(10.0));

+ (BOOL)handleReceiveNotificationResponse:(UNNotificationResponse *)response API_AVAILABLE(ios(10.0));
+ (BOOL)handleReceiveNotificationUserInfo:(NSDictionary *)userInfo;

@end

NS_ASSUME_NONNULL_END
