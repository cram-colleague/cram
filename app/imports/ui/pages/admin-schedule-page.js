import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Report } from '../../api/report/report.js';
// import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

Template.Admin_Schedule_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  sessionList() {
    return SSession.find({}, {sort: {sdate: 1}});
  },
  canShowS: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find({ owner }).count());
    if (SSession.find().count() > 0) {
      find = true;
    }
    return find;
  },
});

Template.Admin_Schedule_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
});
