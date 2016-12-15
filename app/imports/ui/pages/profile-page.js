import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Profile, ProfileSchema } from '../../api/profile/profile.js';
import { SSession, SessionSchema } from '../../api/session/session.js';

/* eslint-disable object-shorthand, no-unused-vars */

const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfileSchema.namedContext('Profile_Page');
  this.autorun(() => {
    this.subscribe('SSession');
  });
});


Template.Profile_Page.helpers({
  profileField(fieldName) {
    // change it later
    const profile = Profile.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profile && profile[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  canShowS: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (SSession.find({ owner }).count() > 0) {
      find = true;
    }
    return find;
  },
  sessionList() {
    const owner = Meteor.userId();
    return owner ? SSession.find({ owner }) : this.ready();
  },
  size: function () {
    return SSession.find().count();
  },
  sizeded: function (fieldname) {
    let ok = false;
    if (SSession.find({ students: fieldname} ).count() > 0) {
      ok = true;
    }
    return ok;
    // return SSession.find( {students: fieldname}).count();
  },
  sizedad: function(first, last){
    // const name = first + " " + last;
    // return SSession.find( {sensei: name} ).count();
    let ok = false;
    const name = first + " " + last;
    if (SSession.find( {sensei: name} ).count() > 0) {
      ok = true;
    }
    // return SSession.find( {sensei: name} ).count();
    return ok;
  },
  total: function (owner, first, last) {
    const name = first + " " + last;
    const students = SSession.find( {students: owner} ).count();
    const sensei = SSession.find( {sensei: name} ).count();
    return students + sensei;
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

Template.Profile_Page.events({
  'click .delete'(event, instance) {
    event.preventDefault();
    const r = window.confirm('Do you really want to delete this entry?');
    if (r === true) {
      Profile.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('Home_Page');
    } else {
      FlowRouter.go('Home_Page');
    }
  },
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const first = event.target.first.value;
    const last = event.target.last.value;
    const preCourse = event.target.preCourse.value;
    const currCourse = event.target.currCourse.value;
    const description = event.target.description.value;
    const owner = Meteor.userId();
    const updateProfile = { first, last, preCourse, currCourse, description, owner };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfileSchema.clean(updateProfile);
    // Determine validity.
    instance.context.validate(updateProfile);
    if (instance.context.isValid()) {
      Profile.update(FlowRouter.getParam('_id'), { $set: updateProfile });
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Your profile updated!');
      FlowRouter.go('User_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

