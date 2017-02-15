import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Messenger, MessengerSchema } from '../../api/messenger/messenger.js';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Messenger_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Messenger');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = MessengerSchema.namedContext('Add_Messenger_Page');
  this.autorun(() => {
    this.subscribe('Profile');
  });
});

Template.Add_Messenger_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
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

Template.Add_Messenger_Page.events({
  'submit .messenger-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const sender = Meteor.userId();
    const title = event.target.title.value;
    const name = event.target.name.value;
    const content = event.target.content.value;
    const receiver = FlowRouter.getParam('_id');
    const newMessenger = { sender, name, title, content, receiver };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean
    MessengerSchema.clean(newMessenger);
    instance.context.validate(newReport);

    if (instance.context.isValid()) {
      // const _id = Meteor.user().profile.name;
      Messenger.insert(newMessenger);
      Meteor.call('newMess');
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Your report just sent to admin');
      FlowRouter.go('User_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
