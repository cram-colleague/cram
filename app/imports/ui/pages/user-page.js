import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profile } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

serverMessages = new ServerMessages();

Template.User_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    const owner = Meteor.userId();
    return owner ? Profile.find({ owner }) : this.ready();
    // return Profile.find();
  },
  sessionList() {
    const owner = Meteor.userId();
    return owner ? SSession.find({ owner }) : this.ready();
  },
  canShowP: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (Profile.find({ owner }).count() > 0) {
      find = true;
    } else {
      new Confirmation({
        message: 'This application has been developed by students at the University of Hawaii. It is provided on a pilot basis and there are no guarantees regarding future access to this system. All users are expected to adhere to the principles specified in the University of Hawaii Systemwide Student Conduct Code. The developers reserve the right to ban access to this system by any students who violate this code of conduct or otherwise display inappropriate behavior on the site.',
        title: 'Terms of use',
        cancelText: 'Disagree',
        okText: 'Agree',
        success: true, // whether the button should be green or red
        focus: 'cancel', // which button to autofocus, "cancel" (default) or "ok", or "none"
      }, function (ok) {
        if (!ok) {
          Meteor.logout();
          FlowRouter.go('');
        } else {
          // let user = Meteor.userId();
          // if()
        }
        // ok is true if the user clicked on "ok", false otherwise
      });
    }
    return find;
  },
  canShowS: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (SSession.find({ owner }).count() > 0) {
      find = true;
    }
    return find;
  },
  canShowNP: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find( { owner: owner, noti: "1"} ).count());
    if (Profile.find( { owner: owner, notiP: "1"} ).count() > 0) {
      find = true;
    }
    return find;
  },
  canShowNS: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find( { owner: owner, noti: "1"} ).count());
    if (Profile.find( { owner: owner, notiS: "1"} ).count() > 0) {
      find = true;
    }
    return find;
  },
});

Template.User_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('SSession');
  });
});

Template.User_Page.events({
  'click .js-btn-clientN': function (event, template) {
    Notifications.warn('New friend is added!', 'Lets check the profile :)');
    Meteor.call('watchProf');
  },
  'click .js-btn-clientS': function (event, template) {
    Notifications.info('New stusy session is added!', 'Lets check what is up :)');
    Meteor.call('watchSess');
  }
});

Meteor.startup(function () {
  _.extend(Notifications.defaultOptions, {
    timeout: 5000
  });
});

