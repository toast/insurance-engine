hack = {};

hack.bindFileUpload = function() {
    var fileInput = document.querySelectorAll('.file-input')[0];
    fileInput.addEventListener("change", function(e) {
        EXIF.getData(e.target.files[0], function() {
            var upload = EXIF.getAllTags(this);
            if(upload.Make){
                alert(upload.Make);
            }
            if(upload.Model){
                alert(upload.Model);
            }
        });
    });
};

function afterAngular(){

}

document.addEventListener("DOMContentLoaded", function(event) {
    window.setTimeout(afterAngular, 2000);
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var user = {
    'userID': guid(),
    'facebook': '',
    'twitter': ''
};

if (localStorage.getItem("user") === null) {
    localStorage.setItem('user', JSON.stringify(user));
} else {
    user = localStorage.getItem('user');
}

console.log('user: ', JSON.parse(user));


angular.module('ionicApp', ['ionic'])

// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            'returnClose': '=',
            'onReturn': '&',
            'onFocus': '&',
            'onBlur': '&'
        },
        link: function(scope, element, attr) {
            element.bind('focus', function(e) {
                if (scope.onFocus) {
                    $timeout(function() {
                        scope.onFocus();
                    });
                }
            });
            element.bind('blur', function(e) {
                if (scope.onBlur) {
                    $timeout(function() {
                        scope.onBlur();
                    });
                }
            });
            element.bind('keydown', function(e) {
                if (e.which == 13) {
                    if (scope.returnClose) element[0].blur();
                    if (scope.onReturn) {
                        $timeout(function() {
                            scope.onReturn();
                        });
                    }
                }
            });
        }
    }
})


.controller('Messages', function($scope, $timeout, $ionicScrollDelegate, $http, $window) {

    $scope.hideTime = true;

    var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.botID = '54321';
    $scope.userID = '12345';


    $scope.newLocalDate = function(){
        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        return d;
    };

    $scope.sendMessage = function() {

        $http({
            url: "/messages",
            method: "POST",
            data: {
                "text": $scope.data.message,
                "user": user
            }
        }).success(function(data, status, headers, config) {
            $scope.data = data;
            $window.console.log(data);
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });

        alternate = !alternate;

        $scope.messages.push({
            userId: alternate ? $scope.userID : $scope.botID,
            text: $scope.data.message,
            htmlSnippet: '',
            time: $scope.newLocalDate()
        });

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    };


    $scope.inputUp = function() {
        if (isIOS) $scope.data.keyboardHeight = 216;
        $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    };

    $scope.inputDown = function() {
        if (isIOS) $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function() {
        // cordova.plugins.Keyboard.close();
    };


    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

});