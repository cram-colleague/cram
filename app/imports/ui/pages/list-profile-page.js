import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';

Template.List_Profile_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
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

Template.List_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
});
