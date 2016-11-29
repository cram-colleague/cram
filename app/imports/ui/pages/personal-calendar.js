import { Template } from 'meteor/templating';
import { SSession } from '../../api/session/session.js';

Template.personal_calendar.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  sessionList() {
    return SSession.find();
  },
});

Template.personal_calendar.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
});