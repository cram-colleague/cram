import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Report, ReportSchema } from '../../api/report/report.js';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Report_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Report');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ReportSchema.namedContext('Add_Report_Page');
});

Template.Add_Report_Page.helpers({
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
  profileListO() {
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

Template.Add_Report_Page.events({
  'submit .report-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const name = event.target.name.value;
    const title = event.target.title.value;
    const content = event.target.content.value;
    const reporter = Meteor.userId();
    const newReport = { name, title, content, reporter };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean
    ReportSchema.clean(newReport);
    instance.context.validate(newReport);

    if (instance.context.isValid()) {
      // const _id = Meteor.user().profile.name;
      Report.insert(newReport);
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Your report just sent to admin');
      FlowRouter.go('User_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
