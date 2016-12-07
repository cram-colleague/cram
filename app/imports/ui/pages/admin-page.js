import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

Template.Admin_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    // const owner = Meteor.userId();
    // return owner ? Profile.find({ owner }) : this.ready();
    return Profile.find();
  },
  sessionList() {
    // const owner = Meteor.userId();
    // return owner ? SSession.find({ owner }) : this.ready();
    return SSession.find();
  },
  canShowP: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find().count());
    if (Profile.find().count() > 0) {
      find = true;
    }
    return find;
  },
  canShowS: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (SSession.find().count() > 0) {
      find = true;
    }
    return find;
  },
});

Template.Admin_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('SSession');
  });
});
