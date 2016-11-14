import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';

Template.User_Profile_Page.helpers({
  //Get username
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
  //Get information from Cprofile
  profileField(fieldName) {
    return Meteor.user().profile.Cprofile[fieldName];
  },
});