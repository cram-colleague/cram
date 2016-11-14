import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/* eslint-disable object-shorthand */

Session.setDefault('key', false);

Template.Term_Page.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  }
});

Template.Term_Page.events({
  'change #checker': function() {
    if(document.getElementById('checker').checked)
      Session.set('key', true);
    else
      Session.set('key', false);
  }
});

Template.check.helpers({
  'isTrue': function() {
    return Session.get('key');
  }
});
