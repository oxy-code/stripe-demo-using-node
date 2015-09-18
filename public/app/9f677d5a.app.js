"use strict";angular.module("stripePaymentsApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","auth0","angular-storage","angular-jwt"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","authProvider","jwtInterceptorProvider",function(a,b,c,d,e,f){e.init({domain:"oxycode.auth0.com",clientID:"nZ75IlzdsYsp1lvbyiFC0PQIf6MPXpun"}),b.otherwise("/"),c.html5Mode(!0),f.tokenGetter=["store",function(a){return a.get("token")}],d.interceptors.push("jwtInterceptor")}]).run(["auth",function(a){a.hookEvents()}]),angular.module("stripePaymentsApp").service("userService",["$http",function(a){this.signup=function(b){return a.post("/api/users/",b)},this.signin=function(b){return a.post("/api/users/login",b)}}]),angular.module("stripePaymentsApp").controller("MainCtrl",["$scope","userService",function(a,b){a.years=function(){for(var a=2015,b=2025,c=[],d=a;b>=d;d++)c.push(d);return c},a.accountSetup=function(c){if(angular.isUndefined(c))return alert("Please fill all the details"),!1;var d=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return d.test(c.email)?isNaN(c.no)?(alert("Enter the valid card number"),a.card.no="",!1):isNaN(c.cvc)?(alert("Enter the valid CVC number"),a.card.cvc="",!1):void b.signup(c).then(function(a){alert(a.data.message)},function(a){alert(a.data.message)}):(alert("Enter the valid email address"),!1)},a.login=function(a){if(angular.isUndefined(a))return alert("Please fill all the details"),!1;var c=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return c.test(a.email)?void b.signin(a).then(function(a){alert(a.data.message)},function(a){alert(a.data.message)}):(alert("Enter the valid email address"),!1)}}]),angular.module("stripePaymentsApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("login",{url:"/login",templateUrl:"app/main/login.html",controller:"MainCtrl"})}]),angular.module("stripePaymentsApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("stripePaymentsApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"},{title:"Login",link:"/login"}],a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("stripePaymentsApp").run(["$templateCache",function(a){a.put("app/main/login.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class=hero-unit id=banner><div class=container><h1>Sample App - Login</h1></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Login</h1><div class=row><div class=col-md-4><form novalidate ng-submit=login(user)><div class=form-group><label>Email Address</label><input class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password class=form-control ng-model=user.password required></div><button class="btn btn-lg btn-block btn-primary">Login</button></form></div><div class="col-md-8 panel panel-default"><h3>Admin Login details</h3><hr><p>Email : admin@proisc.com<br>Password : admin</p></div></div></div></div></div><footer class=footer><div class=container><p>Stripe-Payment App v1.0</p></div></footer>'),a.put("app/main/main.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><header class=hero-unit id=banner><div class=container><h1>Sample App</h1><p class=lead>A sample account setup form can work through with stripe payment gateway and the payment transactions will be accessed by the admin.</p></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Account setup <span class=text-danger style=font-size:14px>1$ will be charged per account</span></h1><form class=row ng-submit=accountSetup(card) novalidate><div class=col-md-4><div class=form-group><label>Name</label><input ng-model=card.name class=form-control required></div><div class=form-group><label>Email</label><input type=email ng-model=card.email class=form-control required></div><div class=form-group><label>Password</label><input type=password ng-model=card.password class=form-control required></div><div class=form-group><label>Card Number</label><input ng-model=card.no class=form-control required></div><div class=form-group><label>Card Validity (MM &amp; YYYY)</label><br><select ng-model=card.month class=form-control style=width:100px;display:inline required><option value=\"\">-MM-</option><option ng-repeat=\"month in ['01','02','03','04','05','06','07','08','09','10','11','12']\" value=\"{{ month }}\">{{ month }}</option></select><select ng-model=card.year class=form-control style=width:100px;display:inline;margin-left:10px required><option value=\"\">-YYYY-</option><option ng-repeat=\"year in years()\" value=\"{{ year }}\">{{ year }}</option></select></div><div class=form-group><label>CVC Number</label><input type=password ng-model=card.cvc class=form-control required></div><button class=\"btn btn-primary btn-block btn-lg\">Setup</button></div><div class=\"col-md-8 panel panel-default\"><h3>Demo Card details</h3><hr><p>Card Number : 4242424242424242<br>MM &amp; YYYY : 08 / 2019<br>CVC : 123</p></div></form></div></div></div><footer class=footer><div class=container><p>Stripe-Payment App v1.0</p></div></footer>"),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>stripe-payments</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);