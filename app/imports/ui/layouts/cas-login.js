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
    return false;
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
// Template.Cas_Login.onRendered(function enableDropDown() {
//   this.$('.dropdown').dropdown({
//     action: 'select',
//   });
// });

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
