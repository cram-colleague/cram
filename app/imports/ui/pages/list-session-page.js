import { Template } from 'meteor/templating';
import { SSession } from '../../api/session/session.js';

Template.List_Session_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  sessionList() {
    return SSession.find();
  },
});

Template.List_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
});
