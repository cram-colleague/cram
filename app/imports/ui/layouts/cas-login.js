import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profile } from '../../api/profile/profile';

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('');
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);
    FlowRouter.go('User_Page');
    // const owner = Meteor.userId();
    // console.log(Profile.find().count());
    // if (Profile.find({ owner }).count() === 0) {
    //   new Confirmation({
    //     message: 'This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system. All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code. The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site.',
    //     title: 'Terms of use',
    //     cancelText: 'Disagree',
    //     okText: 'Agree',
    //     success: true, // whether the button should be green or red
    //     focus: 'cancel', // which button to autofocus, "cancel" (default) or "ok", or "none"
    //   }, function (ok) {
    //     if (!ok) {
    //       Meteor.logout();
    //       FlowRouter.go('');
    //     } else {
    //       // let user = Meteor.userId();
    //       // if()
    //     }
    //     // ok is true if the user clicked on "ok", false otherwise
    //   });
    // }
    // new Confirmation({
    //   message: 'This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system. All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code. The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site.',
    //   title: 'Terms of use',
    //   cancelText: 'Disagree',
    //   okText: 'Agree',
    //   success: true, // whether the button should be green or red
    //   focus: 'cancel', // which button to autofocus, "cancel" (default) or "ok", or "none"
    // }, function (ok) {
    //   if (!ok) {
    //     Meteor.logout();
    //     FlowRouter.go('');
    //   } else {
    //     // let user = Meteor.userId();
    //     // if()
    //   }
    //   // ok is true if the user clicked on "ok", false otherwise
    // });
    return false;
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Cas_Login.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});

Template.Cas_Login.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
});

Template.Cas_Login.helpers({
  first: function (field) {
    console.log(field);
    const owner = Meteor.userId();
    console.log(owner);
    if (field === owner) {
      return false;
    }
    return true;
  },
  profileList() {
    return Profile.find();
  },
});
