import { Profile } from '../../api/profile/profile.js';
import { SSession, SessionSchema } from '../../api/session/session.js';
import { Messenger, MessengerSchema } from '../../api/messenger/messenger.js';
import { _ } from 'meteor/underscore';
// import { Meteor } from 'meteor/meteor';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeeds = [
  {
    first: 'Minako',
    last: 'Doi',
    preCourse: 'ICS311',
    // sensei: 'ICS311',
    currCourse: 'ICS314',
    // grasshopper: 'ICS314',
    description: 'Hello, I am a Senior majoring in ICS.',
    // user: Meteor.user.username,
    owner: 'temp',
    // owner: Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username })._id,
  },
  {
    first: 'Chad',
    last: 'Naka',
    preCourse: 'PHYS151',
    // sensei: 'PHYS151',
    currCourse: 'PHYS152',
    // grasshopper: 'PHYS152',
    description: 'Hi, I am a freshman.',
    // user: Meteor.user.username,
    owner: 'temp',
    // owner: Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username })._id,
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Profile.find().count() === 0) {
  _.each(profileSeeds, function seedProfiles(profile) {
    Profile.insert(profile);
  });
}

Meteor.methods({
  newProf: function() {
    Profile.update({ notiP: "0" }, { $set: { notiP: "1" } });
  },
  watchProf: function() {
    const owner = Meteor.userId();
    Profile.update({ owner: owner, notiP: "1" }, { $set: { notiP: "0" } });
  },
  deleteSess: function() {
    const owner = Meteor.userId();
    SSession.remove({ owner:owner });
  },
  newMess: function() {
    const owner = Meteor.userId();
    const receiver = Messenger.findOne({ sender: owner }).receiver;
    Profile.update({ _id: receiver, mess: "0" }, { $set: { mess: "1" } });
  },
  readMess: function() {
    const owner = Meteor.userId();
    Profile.update({ owner: owner, mess: "1" }, { $set: { mess: "0" } });
  }
});

