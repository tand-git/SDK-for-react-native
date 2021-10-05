//
//  SPRInAppMessage.h
//  SphereSDK
//
//  Created by Hwan on 2020/01/28.
//  Copyright © 2020 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "SPRMessageDisplayDelegate.h"
#import "SPRMessageOpenLinkDelegate.h"

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SphereInAppMessage)
@interface SPRInAppMessage : NSObject

+ (BOOL)start;

+ (void)setMessageDisplayDelegate:(id<SPRMessageDisplayDelegate>)delegate;
+ (void)setMessageOpenLinkDelegate:(id<SPRMessageOpenLinkDelegate>)delegate;

@end

NS_ASSUME_NONNULL_END
