//
//  NotificationService.m
//  testRnExt
//
//  Created by ldja on 2021/09/29.
//

@import Firebase;
#import "NotificationService.h"


@interface NotificationService ()  <NSURLSessionDelegate>

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    // Modify the notification content here...
    self.bestAttemptContent.title = [NSString stringWithFormat:@"%@", self.bestAttemptContent.title];
    
//    self.contentHandler(self.bestAttemptContent);
  // Call FIRMessaging extension helper API.
    [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent
                                              withContentHandler:contentHandler];
  
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
