import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Report } from '../../api/report/report.js';
// import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

Template.Admin_Report_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  reportList() {
    // const owner = Meteor.userId();
    // return owner ? SSession.find({ owner }) : this.ready();
    return Report.find();
  },
  canShowR: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find().count());
    if (Report.find().count() > 0) {
      find = true;
    }
    return find;
  },
});

Template.Admin_Report_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Report');
  });
});
