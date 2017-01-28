import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Profile_Page.onCreated(function onCreated() {
  // this.autorun(() => {
  //   this.subscribe('Profile');
  // });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('Add_Profile_Page');
});

Template.Add_Profile_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },

  //Get username
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
  // profileField(fieldName) {
  //   // return Meteor.user().profile.Cprofile[fieldName];
  //   return Profile.find();
  // },
});

// Template.Add_Contact_Page.onRendered(function enableSemantic() {
//   const instance = this;
//   instance.$('select.ui.dropdown').dropdown();
//   instance.$('.ui.selection.dropdown').dropdown();
//   instance.$('select.dropdown').dropdown();
//   instance.$('.ui.checkbox').checkbox();
//   instance.$('.ui.radio.checkbox').checkbox();
// });

Template.Add_Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const first = event.target.first.value;
    const last = event.target.last.value;
    const preCourse = event.target.preCourse.value;
    //const sensei = event.target.sensei.value;
    const currCourse = event.target.currCourse.value;
    //const grasshopper = event.target.sensei.value;
    const description = event.target.description.value;
    const owner = Meteor.userId();
    const pic = event.target.pic.value;
    const notiP = 0;
    const notiS = 0;
    // Profile.update({noti: "0"}, {$set: {noti: "1"}});
    Meteor.call('newProf');
    const newProfile = { first, last, preCourse, currCourse, description, owner, pic, notiP, notiS };

    //Testing
    // const newProfile = { first, last, preCourse, currCourse, description };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean
    ProfileSchema.clean(newProfile);
    //determine validity
    instance.context.validate(newProfile);

    if (instance.context.isValid()) {
      // const _id = Meteor.user().profile.name;
      Profile.insert(newProfile);
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Thank you! Your profile updated!');
      FlowRouter.go('User_Page');
    // Meteor.users.update(Meteor.userId(),{$set: {profile: {Cprofile: newProfile, name: Meteor.user().profile.name}}});
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

// Meteor.methods({
//   newProf: function() {
//     Profile.update({ noti: "0" }, { $set: { noti: "1" } });
//   }
// });