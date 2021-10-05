//
//  SPRAnalytics.h
//  sphere_analytics
//
//  Created by Hwan on 18/02/2019.
//  Copyright © 2019 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <SphereSDK/SPRParamBuilder.h>

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SphereAnalytics)
@interface SPRAnalytics : NSObject

+ (BOOL)configureWithAppKey:(NSString *)appKey NS_SWIFT_NAME(configure(appKey:));

+ (NSString *)sphereId;

+ (void)printSphereId;

+ (NSString *)sphereAppKey;

+ (NSString *)sphereVersion;

+ (int)sphereVersionCode;

+ (void)logEventWithName:(NSString *)name
            paramBuilder:(nullable SPRParamBuilder *)builder NS_SWIFT_NAME(logEvent(_:paramBuilder:));

+ (void)setUserId:(nullable NSString *)userId;

+ (void)setGrade:(nullable NSString *)grade;

+ (void)setEmail:(nullable NSString *)email;

+ (void)setPhoneNumber:(nullable NSString *)number;

+ (void)setGender:(nullable NSString *)gender;

+ (void)setBirthYear:(int)year;

/* 기본 포인트 사용*/
+ (void)setRemainingPoint:(int)point;

+ (void)setTotalEarnedPoint:(int)point;

+ (void)setTotalUsedPoint:(int)point;

+ (void)removePoints;

/* 커스텀 포인트 사용
 * - 기본포인트 함수를 사용하고있는 경우 assetName에 'point' 사용불가)
 */
+ (void)setRemainingPoint:(int)point forAssetName:(NSString *)assetName;

+ (void)setTotalEarnedPoint:(int)point forAssetName:(NSString *)assetName;

+ (void)setTotalUsedPoint:(int)point forAssetName:(NSString *)assetName;

+ (void)removePoints:(NSString *)assetName;

/* 전체 포인트 삭제 */
+ (void)resetPoints;

+ (void)setUserProperty:(nullable NSString *)value forName:(NSString *)name;

+ (void)setUserPropertyLong:(long)value forName:(NSString *)name;

+ (void)removeUserProperty:(NSString *)name;

+ (void)resetUserProperties;

+ (void)enableLog:(BOOL)enable;

+ (void)setSessionTimeoutInterval:(NSTimeInterval)timeout;

+ (void)requestUpload;

+ (void)setAppLanguage:(nullable NSString *)language;

+ (void)setAnalyticsCollectionEnabled:(BOOL)enabled;

+ (void)handleOpenUrl:(nullable NSURL *)url;

+ (void)handleContinueUserActivity:(nullable NSUserActivity *)userActivity;

@end

NS_ASSUME_NONNULL_END
