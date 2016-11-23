import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

Template.User_Profile_Page.helpers({
  //Get username
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
  //Get information from Cprofile
  profileField(fieldName) {
    return Meteor.user().profile.Cprofile[fieldName];
  },
});

if (Meteor.user()) {
  new Confirmation({
    message: 'This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system.   All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code. The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site.',
    title: 'Terms of use',
    cancelText: 'Disagree',
    okText: 'Agree',
    success: true, // whether the button should be green or red
    focus: 'cancel', // which button to autofocus, "cancel" (default) or "ok", or "none"
  }, function (ok) {
    if (!ok) {
      FlowRouter.go('');
    }
    // ok is true if the user clicked on "ok", false otherwise
  });
}
