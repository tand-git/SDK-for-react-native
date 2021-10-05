//
//  SPRMessageDisplayDelegate.h
//  SphereSDK
//
//  Created by Hwan on 2020/07/14.
//  Copyright © 2020 TanD. All rights reserved.
//

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(SphereMessageDisplayDelegate)
@protocol SPRMessageDisplayDelegate <NSObject>

- (void)messageShownForCampaign:(NSString *)campaignName;
- (void)messageDismissedForCampaign:(NSString *)campaignName;
- (void)messageClickedForCampaign:(NSString *)campaignName linkUrl:(NSString *)linkUrl;

@end
NS_ASSUME_NONNULL_END
