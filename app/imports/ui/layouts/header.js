import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Profile } from '../../api/profile/profile';

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
    const user = Meteor.user().profile.name;
    // console.log(Profile.find({ owner }).count());
    if (user === 'minakod' || user === 'lambert3' || user === 'seantshi' || user === 'io' || user === 'johnson') {
      find = true;
    }
    return find;
  },
  activeUser: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (Profile.find({ owner }).count() > 0) {
      find = true;
    }
    return find;
  }
});
