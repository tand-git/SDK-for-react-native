//
//  SPRMessageOpenLinkDelegate.h
//  SphereSDK
//
//  Created by Hwan on 2020/07/14.
//  Copyright © 2020 TanD. All rights reserved.
//

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SphereMessageOpenLinkDelegate)
@protocol SPRMessageOpenLinkDelegate <NSObject>

- (BOOL)openMessageLink:(NSString *)linkUrl;

@end
NS_ASSUME_NONNULL_END
