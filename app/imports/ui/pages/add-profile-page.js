import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
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
  profileField(fieldName) {
    return Meteor.user().profile.Cprofile[fieldName];
  }
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
    //const preCourse = event.target.preCourse.value;
    //const sensei = event.target.sensei.value;
    //const currCourse = event.target.currCourse.value;
    //const grasshopper = event.target.sensei.value;
    const description = event.target.description.value;
   // const newProfile = { first, last, preCourse, sensei, currCourse, grasshopper, description };

    //Testing
    const newProfile = { first, last, description};

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean
    ProfileSchema.clean(newProfile);
    //determine validity
    instance.context.validate(newProfile);

    /////////////////////////////////////////////////
    //Figure out why valdation doesnt work anymore
    /////////////////////////////////////////////////

    //if (instance.context.isValid()) {
      Meteor.users.update(Meteor.userId(),{$set: {profile: {Cprofile: newProfile, name: Meteor.user().profile.name}}});
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Thank you! Your profile added!');
      FlowRouter.go('Home_Page');
    //} else {
      instance.messageFlags.set(displayErrorMessages, true);
    //}
  },
});

