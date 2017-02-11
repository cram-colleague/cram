import { Profile } from '../../api/profile/profile.js';
import { Course } from '../../api/course/course.js';
import { SSession } from '../../api/session/session.js';
import { Report } from '../../api/report/report.js';
import { Messenger } from '../../api/messenger/messenger.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Profile', function publishProfileData() {
  // const owner = this.userId;
  // return owner ? Profile.find({ owner }) : this.ready();
  return Profile.find();
});

Meteor.publish('Course', function publishCourseData() {
  return Course.find();
});

Meteor.publish('SSession', function publishSSessionData() {
  return SSession.find();
});

Meteor.publish('Report', function publishReportData() {
  return Report.find();
});

Meteor.publish('Messenger', function publishReportData() {
  return Messenger.find();
});
