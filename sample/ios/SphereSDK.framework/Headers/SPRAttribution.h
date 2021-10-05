//
//  SPRAttribution.h
//  SphereSDK
//
//  Created by Hwan on 2020/11/16.
//  Copyright © 2020 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static NSString * const kVendorAdjust = @"adjust";

NS_SWIFT_NAME(SphereVendorCallback)
@protocol SPRVendorCallback <NSObject>

- (void)updateAttributionId;

@end

NS_SWIFT_NAME(SphereAttribution)
@interface SPRAttribution : NSObject

+ (void)setVendorCallback:(nullable id<SPRVendorCallback>)callback;

+ (void)setAttributionId:(nullable NSString *)attributionId forVendor:(NSString *)vendor;

@end

NS_ASSUME_NONNULL_END
