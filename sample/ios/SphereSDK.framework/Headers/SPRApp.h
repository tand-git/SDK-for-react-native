//
//  SPRApp.h
//  SphereSDK
//
//  Created by Hwan on 12/07/2019.
//  Copyright © 2019 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SphereApp)
@interface SPRApp : NSObject

+ (void)configureWithAppKey:(NSString *)appKey NS_SWIFT_NAME(configure(appKey:)) __attribute__((deprecated("Replaced by configureWithAppKey: in SPRAnalytics")));
+ (void)setUserLevel:(NSString *)user;
+ (void)setUserLevel:(NSString *)user param:(nullable NSString *)param;

@end

NS_ASSUME_NONNULL_END
