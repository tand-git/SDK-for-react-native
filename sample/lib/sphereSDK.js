import {NativeModules, Platform} from 'react-native';

// SphereSDK v1.0.1
export let SphereAnalytics = {
    _sphereNative : NativeModules.SphereBridge,
    logEvent:function(name, params) {
        try {
            let message = {
                command: "logEvent",
                name: name,
                parameters: params
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserId:function(userId) {
        try {
            let message = {
                command: "setUserId",
                userId: userId
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGrade:function(grade) {
        try {
            let message = {
                command: "setGrade",
                grade: grade
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGender:function(gender) {
        try {
            let message = {
                command: "setGender",
                gender: gender
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setBirthYear:function(year) {
        try {
            if (!this._isNumberValue(year)) {
                this._consoleError("setBirthYear: Invalid parameter.");
                return;
            }
            let message = {
                command: "setBirthYear",
                year: year
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setPhoneNumber:function(number) {
        try {
            let message = {
                command: "setPhoneNumber",
                number: number
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setEmail:function(email) {
        try {
            let message = {
                command: "setEmail",
                email: email
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }

    },
    setRemainingPoint:function(point , name) {
        try {
            if (!this._isNumberValue(point)) {
                this._consoleError("setRemainingPoint: Invalid parameter.");
                return;
            }
            let message = {
                command: "setRemainingPoint",
                name: name || 'point',
                point: point
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setTotalEarnedPoint:function(point , name) {
        try {
            if (!this._isNumberValue(point)) {
                this._consoleError("setTotalEarnedPoint: Invalid parameter.");
                return;
            }
            let message = {
                command: "setTotalEarnedPoint",
                name: name || 'point',
                point: point
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setTotalUsedPoint:function(point , name) {
        try {
            if (!this._isNumberValue(point)) {
                this._consoleError("setTotalUsedPoint: Invalid parameter.");
                return;
            }
            let message = {
                command: "setTotalUsedPoint",
                name: name || 'point',
                point: point
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    removePoints:function() {
        try {
            let message = {
                command: "resetPoints"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserProperty:function(name, value) {
        try {
            let message = {
                command: 'setUserProperty',
                name: name,
                value: value
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserPropertyLong:function(name, value) {
        try {
            let message = {
                commandType: "analytics",
                command: 'setUserPropertyLong',
                name: name,
                value: value
            };
            SphereAnalytics._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    removeUserProperty:function(name) {
        try {
            let message = {
                commandType: "analytics",
                command: 'removeUserProperty',
                name: name
            };
            SphereAnalytics._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    resetUserProperties:function() {
        try {
            let message = {
                command: "resetUserProperties"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserPropertyArray:function(name, value) {
        try {
            if(Array.isArray(value) || value == null){
                let message = {
                    command: 'setUserPropertyArray',
                    name: name,
                    value: value
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    requestUpload:function() {
        try {
            let message = {
                command: "requestUpload"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    enableLog:function(enable) {
        try {
            this.isLogEnabled = enable;
            let message = {
                command: "enableLog",
                enable: enable
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setLogLevel:function(level) {
        this.enableLog(!(level == "none"));
    },

    // private functions
    _postMessage:function(message) {
        this._sphereNative.postMessage( Platform.OS === 'ios' ? message : JSON.stringify(message));
    },
    async getSphereInfo(){
        try{
            return await this._sphereNative.sphereInfo();
        }catch (e){
            this._consoleLog(e)
        }
    },
    _isNumberValue:function(value) {
        return (typeof value === "number");
    },
    isLogEnabled: false,
    _consoleLog:function(message) {
        if (this.isLogEnabled) {
            console.log(message);
        }
    },
    _consoleError:function(message) {
        if (this.isLogEnabled) {
            console.error(message);
        }
    },

};

export let SpherePushMessage = {
    agreePushMessageForInformation:function(agree) {
        this._agreePushMessage("agreePushMessageForInformation", agree);
    },
    agreePushMessageForAdvertisement:function(agree) {
        this._agreePushMessage("agreePushMessageForAdvertisement", agree);
    },
    agreePushMessageAtNight:function(agree) {
        this._agreePushMessage("agreePushMessageAtNight", agree);
    },
    setFcmToken:function(token) {
        try {
            let message = {
                commandType: "pushMessage",
                command: "setFcmToken",
                token: token
            };
            SphereAnalytics._postMessage(message);
        } catch(error) {
            SphereAnalytics._consoleError(error);
        }
    },
    // private functions
    _agreePushMessage:function(command, agree) {
        try {
            let message = {
                commandType: "pushMessage",
                command: command,
                agree: agree
            };
            SphereAnalytics._postMessage(message);
        } catch(error) {
            SphereAnalytics._consoleError(error);
        }
    }
};

