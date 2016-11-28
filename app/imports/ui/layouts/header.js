import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.

// Template.Header.onRendered(function enableDropDown() {
//   this.$('.dropdown').dropdown();
// });
//
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});

Template.Header.helpers({
  canShow: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    console.log(Profile.find({ owner }).count());
    if (Profile.find({ owner }).count() > 0) {
      find = true;
    }
    return find;
  },
});
