import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { SSession, SessionSchema } from '../../api/session/session.js';

/* eslint-disable object-shorthand, no-unused-vars */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SessionSchema.namedContext('Edit_Session_Page');
});


Template.Edit_Session_Page.helpers({
  sessionField(fieldName) {
    const session = SSession.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return session && session[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
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

Template.Edit_Session_Page.events({
  'click .delete'(event, instance) {
    event.preventDefault();
    const r = window.confirm('Do you really want to delete this entry?');
    if (r === true) {
      SSession.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('Home_Page');
    }
    else {
      FlowRouter.go('Home_Page');
    }
  },
  'submit .session-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const name = event.target.name.value;
    const time = event.target.time.value;
    const place = event.target.place.value;
    const sensei = event.target.sensei.value;
    const updateSession = { name, time, place, sensei };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SessionSchema.clean(updateSession);
    // Determine validity.
    instance.context.validate(updateSession);
    if (instance.context.isValid()) {
      SSession.update(FlowRouter.getParam('_id'), { $set: updateSession });
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Your study session updated!');
      FlowRouter.go('List_Session_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

