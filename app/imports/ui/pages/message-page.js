import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Messenger, MessengerSchema } from '../../api/messenger/messenger.js';
import { Profile } from '../../api/profile/profile.js';

/* eslint-disable object-shorthand, no-unused-vars */

const displayErrorMessages = 'displayErrorMessages';

Template.Message_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Messenger');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = MessengerSchema.namedContext('Message_Page');
  this.autorun(() => {
    this.subscribe('Profile');
  });
  Meteor.call('readMess');
});


Template.Message_Page.helpers({
  messageField(fieldName) {
    // change it later
    const message = Messenger.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return message && message[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  profileField(fieldName) {
    // change it later
    const report = Messenger.findOne(FlowRouter.getParam('_id'));
    const owner = report.receiver;
    // const profile = Profile.findOne({ createdBy: owner });
    const profile = Profile.findOne({ _id: owner });
    // const profile = Profile.findOne(owner);
    // console.log(profile);
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profile && profile[fieldName];
  },
  profileList() {
    return Profile.find();
  },
  profileShowS: function (field) {
    const message = Messenger.findOne(FlowRouter.getParam('_id'));
    const owner = message.sender;
    if (field === owner) {
      return true;
    }
    return false;
  },
  profileShowR: function (field) {
    const message = Messenger.findOne(FlowRouter.getParam('_id'));
    const owner = message.receiver;
    if (field === owner) {
      return true;
    }
    return false;
  },
});

// Template.Edit_Contact_Page.onRendered(function enableSemantic() {
//   const template = this;
//   template.subscribe('StudentData', () => {
//     // Use this template.subscribe callback to guarantee that the following code executes after subscriptions OK.
//     Tracker.afterFlush(() => {
//       // Use Tracker.afterFlush to guarantee that the DOM is re-rendered before calling JQuery.
//       template.$('select.ui.dropdown').dropdown();
//       template.$('.ui.selection.dropdown').dropdown();
//       template.$('select.dropdown').dropdown();
//       template.$('.ui.checkbox').checkbox();
//       template.$('.ui.radio.checkbox').checkbox();
//     });
//   });
// });

Template.Message_Page.events({
  'click .delete'(event, instance) {
    event.preventDefault();
    const r = window.confirm('Do you really want to delete this message?');
    if (r === true) {
      Messenger.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('List_Messenger_Page');
    } else {
      FlowRouter.go('List_Messenger_Page');
    }
  },
});

