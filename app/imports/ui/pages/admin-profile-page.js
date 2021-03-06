import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Report } from '../../api/report/report.js';
// import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

Template.Admin_Profile_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    // const owner = Meteor.userId();
    // return owner ? Profile.find({ owner }) : this.ready();
    return Profile.find();
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
});

Template.Admin_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
});
