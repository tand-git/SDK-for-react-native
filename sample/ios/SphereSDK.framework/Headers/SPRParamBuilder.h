//
//  SPRParamBuilder.h
//  sphere_analytics
//
//  Created by Hwan on 18/02/2019.
//  Copyright © 2019 TanD. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SPRParamBuilder : NSObject

+ (instancetype)builder;
+ (instancetype)builderWithDictionary:(NSDictionary<NSString *, id> *)dict;

- (instancetype)initWithDictionary:(NSDictionary *)dict;

- (NSDictionary *)build;

- (instancetype)setParamWithString:(nullable NSString *)value forName:(NSString *)name NS_SWIFT_NAME(setStringParam(_:forName:));
- (instancetype)setParamWithInt:(int)value forName:(NSString *)name NS_SWIFT_NAME(setIntParam(_:forName:));
- (instancetype)setParamWithLong:(long long)value forName:(NSString *)name NS_SWIFT_NAME(setLongParam(_:forName:));
- (instancetype)setParamWithDouble:(double)value forName:(NSString *)name NS_SWIFT_NAME(setDoubleParam(_:forName:));
- (instancetype)setParamWithFloat:(float)value forName:(NSString *)name NS_SWIFT_NAME(setFloatParam(_:forName:));

@end

NS_ASSUME_NONNULL_END
