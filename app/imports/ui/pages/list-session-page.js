import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';
import { Profile } from '../../api/profile/profile.js';

Template.List_Session_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  sessionList() {
    return SSession.find();
  },
  profileList() {
    const owner = Meteor.userId();
    return owner ? Profile.find({ owner }) : this.ready();
    // return Profile.find();
  },
});

Template.List_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
  this.autorun(() => {
    this.subscribe('Profile');
  });
});
