// app/assets/javascripts/app/controllers/AccountCtrl.js

'use strict';

angular.module('clientApp')
  .controller('AccountController',
    function ($scope, $q, DoctorService, PatientService, LoginService, $location, GroupService, $state) {
      var service;

      $scope.userType = LoginService.getType();
      $scope.currentUser = { email: LoginService.getEmail() };

      if ($scope.userType === "patient") { service = PatientService; }
      else if ($scope.userType === "doctor" || $scope.userType === "admin") { service = DoctorService; }      

      service.info($scope.currentUser.email).then(function (data) {
      	delete data.__v;
        delete data._id;

        $scope.first_name = data.first_name;
        $scope.last_name = data.last_name;
        $scope.email = data.email;

        delete data.first_name;
        delete data.last_name;
        delete data.email;

        $scope.account_info = data;

        $scope.change_states = {};

        if ($scope.userType==="patient") {
          GroupService.groups().then(function(groups) {
            $scope.list_of_groups = [];
            for (var group in groups) {
              $scope.list_of_groups.push(groups[group]._id);
            }
            $scope.new_fields.group = {};
            for (var each in $scope.list_of_groups) {
              $scope.new_fields.group[$scope.list_of_groups[each]] = ($scope.account_info.group.indexOf($scope.list_of_groups[each])>=0) ? true : false;
            }          
          });
        }

        for (var each in $scope.account_info) {
          $scope.change_states[each] = false;
        }

        $scope.change_states.first_name = false;
        $scope.change_states.last_name = false;
        $scope.change_states.email = false;



      });

      $scope.new_entry = {
        first_name : "first name",
        last_name : "last name",
        email : "email",
        hospital : "hospital",
        specialty : "specialty",
        age : "age",
        height : "height",
        weight : "weight",
        sex : "sex",
      };

      var change__all = [
	      "change__first_name",
				"change__last_name",
				"change__email",
				"change__hospital",
				"change__specialty",
        "change__age",
        "change__height",
        "change__weight",
        "change__sex",
			];

      $scope.selected_groups = ($scope.group) ? [$scope.group] : [];
      $scope.remove_group = function (group) {
        $scope.new_fields.group = null;
        $scope.list_of_groups.push(group);
        $scope.selected_groups.splice($scope.selected_groups.indexOf(group),1);
      };
      $scope.setGroup = function(group){
        $scope.list_of_groups.splice($scope.list_of_groups.indexOf(group),1);
        $scope.selected_groups.push(group);
      };

      $scope.changeState = function (changeMe) {
      	$scope.change_states[changeMe] = ($scope.change_states[changeMe]) ? false : true;

      	// set all others to false
      	change__all.splice(change__all.indexOf(changeMe),1);

      	for (var each in $scope.change_states) {
      		$scope.change_states[change__all[each]] = false;
      	}

      	// set $scope.change__all back to original value
      	change__all.push(changeMe);
      };

      $scope.new_fields = {};
      $scope.changeField = function (field, groups) {
        if (field==='doctor') { 
          $scope.new_fields[field] = $scope.new_fields[field].doctor; 
        }
        if (field==='group') { 
          var tmp = [];
          for (var each in $scope.new_fields[field]) {
            if ($scope.new_fields[field][each]) {
              tmp.push(each);
            }
          }
          $scope.new_fields[field] = tmp; 
        }
        LoginService.authenticated(LoginService.getEmail(), $scope.new_fields.confirmation).then(function (isAuthenticated) {
          if (!isAuthenticated) { 
            $scope.new_fields = {};
            return;
          }
          $scope.changeFieldConfirm(field, groups);
        });
      };

      $scope.changeFieldConfirm = function (field, groups) {
        var tmp;
        var api_call;

        if (field === 'pass') { tmp = {}; }
        else if (field in $scope.account_info) { tmp = $scope.account_info; }
        else if (field in $scope) { tmp = $scope; }

        if (field === 'email' || field === 'pass') { api_call = "update_account"; }
        else { api_call = "update_info"; }

        //POST request to API
        var packet = {};
        packet[field] = $scope.new_fields[field];

        // because this line: LoginService.login($scope.new_fields.email || LoginService.getEmail() is send undefined for email
        var tmpEmail = $scope.new_fields.email || LoginService.getEmail();
        var tmpPass = $scope.new_fields.pass || $scope.new_fields.confirmation;

        service[api_call](packet).then(function (updated) {

          // pass needs to use token that already exists
          if (field === "pass" || field === "email") {
            LoginService.login(tmpEmail, tmpPass).then(function (err, data) {

              tmp[field] = $scope.new_fields[field];
              $scope.change_states[field] = false;
              $scope.new_fields.confirmation = "";
            });
          }
          else {
            tmp[field] = $scope.new_fields[field];
            $scope.change_states[field] = false;
            $scope.new_fields.confirmation = "";
          }
        });
      };

      $scope.deleteAccount = function() {
        var ans = confirm("Are you sure you want to delete your account? This action is NOT reversable");
        if (ans) {
          service.remove().then(function (removed) {
            LoginService.logout().then(function () {
              alert('here');
              $scope.currentUser = null;
              $scope.userType = null;
              $state.go('app');
            });
          });          
        }
      };

      // Load doctors for 'change me' options for doctor field
      DoctorService.doctors().then(function (doctors) {
        var all = [];
        $scope.list_of_doctors = [];
        for (var doctor in doctors) {
          all.push(DoctorService.info(doctors[doctor]));
        }
        $q.all(all).then(function (doctors_info) {
          for (var doctor in doctors_info) {
            $scope.list_of_doctors.push({
              doctor: doctors_info[doctor].email,
              doctor_email: doctors_info[doctor].email,
              full_name: doctors_info[doctor].first_name + " " + doctors_info[doctor].last_name
            });
          }
        });
      });


  });