import { Profile } from '../../api/profile/profile.js';
import { Course } from '../../api/course/course.js';
import { SSession } from '../../api/session/session.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Profile', function publishProfileData() {
  return Profile.find();
});

Meteor.publish('Course', function publishCourseData() {
  return Course.find();
});

Meteor.publish('SSession', function publishSSessionData() {
  return SSession.find();
});
