import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { SSession, SessionSchema } from '../../api/session/session.js';
import { Profile } from '../../api/profile/profile.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SessionSchema.namedContext('Add_Session_Page');
  this.autorun(() => {
    this.subscribe('Profile');
  });
});

Template.Add_Session_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  profileList() {
    const owner = Meteor.userId();
    return owner ? Profile.find({ owner }) : this.ready();
    // return Profile.find();
  },
});

// Template.Add_Contact_Page.onRendered(function enableSemantic() {
//   const instance = this;
//   instance.$('select.ui.dropdown').dropdown();
//   instance.$('.ui.selection.dropdown').dropdown();
//   instance.$('select.dropdown').dropdown();
//   instance.$('.ui.checkbox').checkbox();
//   instance.$('.ui.radio.checkbox').checkbox();
// });

Template.Add_Session_Page.events({
  'submit .session-data-form'(event, instance) {
    event.preventDefault();
    let newSessionTemp = Session.get('eventModal');
    // Get name (text field)
    const name = event.target.name.value;
    const time = newSessionTemp.date;
    // const time = event.target.time.value;
    const place = event.target.place.value;
    const sensei = event.target.sensei.value;
    const detail = event.target.detail.value;
    const owner = Meteor.userId();
    Meteor.call('newSess');
    const newSession = { name, time, place, sensei, detail, owner };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SessionSchema.clean(newSession);
    // Determine validity.
    instance.context.validate(newSession);
    if (instance.context.isValid()) {
      SSession.insert(newSession);
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Thank you! Your study session added!');
      FlowRouter.go('List_Session_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

