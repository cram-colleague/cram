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
  sessionDate() {
    let newSession = Session.get('eventModal');
    return newSession.date;
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
    let newSession = Session.get('eventModal');
    // Get name (text field)
    const sdate = event.target.sdate.value;
    const e = document.getElementById(event.target.name.id);
    const name = e.options[e.selectedIndex].value;
    // const time = newSessionTemp.date;
    // const h = document.getElementById(event.target.ts.id);
    // const ts = h.options[h.selectedIndex].value;
    const f = document.getElementById(event.target.start.id);
    let start = sdate+"T"+f.options[f.selectedIndex].value+"-10:00";
    const g = document.getElementById(event.target.end.id);
    let end = sdate+"T"+g.options[g.selectedIndex].value+"-10:00";
    const startV = parseInt(event.target.start.value);
    const endV = parseInt(event.target.end.value);
    // const sdate = event.target.sdate.value;
    const startString = f.options[f.selectedIndex].text;
    const endString = g.options[g.selectedIndex].text;
    // const time = event.target.time.value;
    const place = event.target.place.value;
    const detail = event.target.detail.value;
    const owner = Meteor.userId();
    Meteor.call('newSess');
    const h = document.getElementById(event.target.sensei.id);
    const senseiinput = h.options[h.selectedIndex].value;
    if (senseiinput == 1) {
      const sensei = Meteor.userId();
      newSession = { name, sdate, start, end, startV, endV, startString, endString, place, sensei, detail, owner };
    } else {
      newSession = { name, sdate, start, end, startV, endV, startString, endString, place, detail, owner };
    }
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SessionSchema.clean(newSession);
    // Determine validity.
    instance.context.validate(newSession);
    if (instance.context.isValid()) {
      const id = SSession.insert(newSession);
      // console.log(id);
      if (senseiinput == 0) {
        const student = Meteor.userId();
        SSession.update(id, { $push: { students: student } });
      }
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Thank you! Your study session added!');
      FlowRouter.go('Calendar_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

