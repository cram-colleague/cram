import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
// import { Meteor } from 'meteor/meteor';
import { Messenger, MessengerSchema } from '../../api/report/report.js';
import { Profile } from '../../api/profile/profile.js';

/* eslint-disable object-shorthand, no-unused-vars */

const displayErrorMessages = 'displayErrorMessages';

Template.Message_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Message');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = MessengerSchema.namedContext('Message_Page');
  this.autorun(() => {
    this.subscribe('Profile');
  });
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
    const profile = Profile.findOne('receiver');
    // console.log(profile);
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profile && profile[fieldName];
  },
  profileList() {
    return Profile.find();
  },
  profileShow: function (field) {
    const report = Report.findOne(FlowRouter.getParam('_id'));
    const owner = report.receiver;
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
    const r = window.confirm('Do you really want to delete this entry?');
    if (r === true) {
      Messenger.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('Home_Page');
    } else {
      FlowRouter.go('Home_Page');
    }
  },
  // 'submit .contact-data-form'(event, instance) {
  //   event.preventDefault();
  //   // Get name (text field)
  //   // const first = event.target.first.value;
  //   // const last = event.target.last.value;
  //   // const preCourse = event.target.preCourse.value;
  //   // const currCourse = event.target.currCourse.value;
  //   // const description = event.target.description.value;
  //   const students = Meteor.userId();
  //   // const updateProfile = { first, last, preCourse, currCourse, description, students };
  //   // Clear out any old validation errors.
  //   instance.context.resetValidation();
  //   // Invoke clean so that newStudentData reflects what will be inserted.
  //   // SessionSchema.clean(updateProfile);
  //   // Determine validity.
  //   // instance.context.validate(updateProfile);
  //   // if (instance.context.isValid()) {
  //   Report.update(FlowRouter.getParam('_id'), { $set: {'SSession.students': students} });
  //     instance.messageFlags.set(displayErrorMessages, false);
  //     window.alert('Your profile updated!');
  //     FlowRouter.go('List_Session_Page');
  //   // } else {
  //   //   instance.messageFlags.set(displayErrorMessages, true);
  //   // }
  // },
});

