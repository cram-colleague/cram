import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

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
});

Template.User_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('SSession');
  });
});
