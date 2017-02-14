import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
// import { Meteor } from 'meteor/meteor';
import { Messenger } from '../../api/messenger/messenger.js';

Template.List_Messenger_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    // const owner = Meteor.userId();
    // return owner ? Profile.find({ owner }) : this.ready();
    return Profile.find();
  },
  messengerList() {
    const owner = Meteor.userId();
    return owner ? Messenger.find({ receiver: owner }) : this.ready();
    // return Messenger.find();
  },
  canShowM: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    console.log(Messenger.find({ receiver: owner }).count());
    if (Messenger.find({ receiver: owner }).count() > 0) {
      find = true;
    }
    return find;
  },
});

Template.List_Messenger_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('Messenger');
  });
});
