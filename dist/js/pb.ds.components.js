!function(){"use strict";angular.module("pb.ds.components",[])}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsCheckbox",["$log",function(n){return{restrict:"E",require:"ngModel",template:'<span class="pbds-checkbox"><label class="control checkbox" ng-required="ctrl.required" ng-class="{\'disabled\':ctrl.disabled}"><input name="{{ctrl.name}}" ng-disabled="ctrl.disabled" type="checkbox" ng-model="ctrl.ngModel" ng-true-value="{{ctrl.ngTrueValue}}" ng-false-value="{{ctrl.ngFalseValue}}" ng-required="{{ctrl.ngRequired}}" ng-model-options="{allowInvalid: true}" ng-change="ctrl.ngChange({val:ctrl.ngModel})"><span class="control-indicator"></span> {{ctrl.label}}</label><span ng-transclude></span></span>',replace:!0,transclude:!0,scope:{},bindToController:{label:"@",name:"@",disabled:"=",ngModel:"=",ngTrueValue:"@?",ngFalseValue:"@?",ngRequired:"=?",ngChange:"&"},controllerAs:"ctrl",controller:["$scope","$element","$attrs",function(n,e,l){var t=this;if(angular.isUndefined(l.ngModel))throw Error("pbds-checkbox directive ng-model is missing");angular.isUndefined(l.ngTrueValue)&&(t.ngTrueValue=!0),angular.isUndefined(l.ngFalseValue)&&(t.ngFalseValue=!1),angular.isUndefined(l.ngRequired)&&(t.ngRequired=!1)}]}}])}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsRadio",function(){return{restrict:"E",require:"ngModel",template:'<span class="pbds-radiobutton"><label class="control radio" ng-class="{\'disabled\':ctrl.disabled}"><input name="{{ctrl.name}}" type="radio" ng-disabled="ctrl.disabled" value="{{ctrl.value}}" ng-model="ctrl.ngModel" ng-change="ctrl.ngChange({val:ctrl.ngModel})()" ng-required="ctrl.ngRequired"><span class="control-indicator"></span> {{ctrl.label}}</label><span ng-transclude></span></span>',scope:{},transclude:!0,replace:!0,bindToController:{disabled:"=",name:"@",value:"@?",ngModel:"=",ngChange:"&",label:"@",ngValue:"=?",ngRequired:"=?"},controllerAs:"ctrl",controller:["$element",function(n){var e=this;if(angular.isUndefined(e.value)&&angular.isUndefined(e.ngValue))throw Error("pbds-radio directive value is missing, add value or ng-value attribute.");angular.isUndefined(e.ngRequired)&&(e.ngRequired=!1)}]}})}(),function(){"use strict";var n=angular.module("pb.ds.components");n.directive("pbdsAlertGlobal",["$log","$window","$timeout",function(n,e,l){return{restrict:"A",link:function(t,s,i){function a(){c=o.outerHeight()||0,d.css({top:c+"px"})}function r(){angular.element(e).off("resize",a)}n.debug(t,i);var o=angular.element(s),c=o.outerHeight(),d=angular.element("header");if(n.debug(c,d),o.addClass("alert-global"),a(),angular.element(e).on("resize",a),t.$on("$destroy",r),i.close||o.hasClass("alert-dismissable")){var u=o.find("button.close");u.on("click",function(n){l(function(){a()},0)})}}}}])}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsAccordion",function(){return{restrict:"AE",link:function(n,e){$(e).find(".panel-default").on({"show.bs.collapse":function(n){$(this).addClass("active")},"hide.bs.collapse":function(n){$(this).removeClass("active")}})}}})}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsHeaderShadow",["$window",function(n){return{restrict:"AE",link:function(e,l){angular.element(n).on("scroll",function(){this.pageYOffset>20?l.addClass("shadow"):l.removeClass("shadow")})}}}])}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsProgressButton",function(){return{restrict:"E",template:'<button class="btn" ng-class="ctrl.btnClass" ng-disabled="ctrl.isDisabled" type="button" ng-click="ctrl.btnClick($event)"><i ng-show="ctrl.isLoading" class="nc-icon-mini {{ctrl.iconClass}}" ng-class="{spin: ctrl.isLoading}" aria-hidden="true"></i> <span ng-hide="ctrl.isLoading">{{ctrl.label}}</span><span ng-show="ctrl.isLoading">{{ctrl.loadingLabel}}</span></button>',scope:{},bindToController:{isDisabled:"=?",ngClick:"&",btnClass:"@",iconClass:"@?",label:"@",loadingLabel:"@",isLoading:"="},controllerAs:"ctrl",controller:["$log","$scope",function(n,e){var l=this;l.iconClass=l.iconClass||"loader_circle-04",l.btnClick=function(n){if(l.isLoading)return n.preventDefault(),n.stopPropagation(),!1}}]}})}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsPasswordReveal",function(){return{restrict:"E",transclude:!0,template:'<span class="password-reveal"><ng-transclude></ng-transclude><a class="small" href="" ng-click="ctrl.click()"><span ng-if="!ctrl.isHidden">{{ctrl.linkShow}}</span><span ng-if="ctrl.isHidden">{{ctrl.linkHide}}</span></a></span>',scope:{},bindToController:{linkShow:"@?",linkHide:"@?"},controllerAs:"ctrl",controller:["$log",function(n){var e=this;e.isHidden=!1,e.linkShow=e.linkShow||"Show",e.linkHide=e.linkHide||"Hide",e.click=function(){e.isHidden=!e.isHidden}}],link:function(n,e,l){var t=angular.element(e).find("input");n.$watch("ctrl.isHidden",function(n,e){t.attr("type",n?"text":"password")})}}})}(),function(){"use strict";angular.module("pb.ds.components").directive("pbdsTransitoryAlert",function(){return{restrict:"E",transclude:!0,template:'<span ng-transclude></span><span ng-show="ctrl.isVisible" class="btn-response" ng-class="ctrl.messageClass" ng-bind-html="ctrl.message" translate-attr-ng-bind-html translate></span>',scope:{},bindToController:{message:"=",messageClass:"=",isVisible:"=",duration:"@?"},controllerAs:"ctrl",controller:["$log","$scope","$timeout",function(n,e,l){var t=this;t.duration=t.duration||"3000",e.$watch("ctrl.isVisible",function(n,e){if(n!==e){if("0"===t.duration)return!1;l(function(){t.isVisible=!1},t.duration)}})}]}})}();