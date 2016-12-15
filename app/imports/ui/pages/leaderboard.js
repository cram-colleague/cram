import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
import { Report } from '../../api/report/report.js';
// import { Meteor } from 'meteor/meteor';
import { SSession } from '../../api/session/session.js';

Template.Leaderboard_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    // const owner = Meteor.userId();
    // return owner ? Profile.find({ owner }) : this.ready();
    return Profile.find();
  },
  sessionList() {
    // const owner = Meteor.userId();
    // return owner ? SSession.find({ owner }) : this.ready();
    return SSession.find();
  },
  reportList() {
    // const owner = Meteor.userId();
    // return owner ? SSession.find({ owner }) : this.ready();
    return Report.find();
  },
  canShowP: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find().count());
    if (Profile.find().count() > 0) {
      find = true;
    }
    return find;
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
  canShowR: function canShow() {
    let find = false;
    // const owner = Meteor.userId();
    // console.log(Profile.find().count());
    if (Report.find().count() > 0) {
      find = true;
    }
    return find;
  },
  size: function () {
    return SSession.find().count();
  },
  sizeded: function (fieldname) {
    console.log(SSession.find({ students: fieldname }).count());
    return SSession.find({ students: fieldname }).count();
  },
  sizedad: function (first, last) {
    const name = first + " " + last;
    return SSession.find({ sensei: name }).count();
  },
  total: function (owner, first, last) {
    const name = first + " " + last;
    const students = SSession.find({ students: owner }).count();
    const sensei = SSession.find({ sensei: name }).count();
    return students + sensei;
  },
});

Template.Leaderboard_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('SSession');
  });
  this.autorun(() => {
    this.subscribe('Report');
  });
});
