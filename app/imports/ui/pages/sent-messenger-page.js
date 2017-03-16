import { Template } from 'meteor/templating';
import { Profile } from '../../api/profile/profile.js';
// import { Meteor } from 'meteor/meteor';
import { Messenger } from '../../api/messenger/messenger.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Sent_Messenger_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  profileList() {
    // const owner = Meteor.userId();
    // return owner ? Profile.find({ owner }) : this.ready();
    return Profile.find();
  },
  profileListO() {
    const owner = Meteor.userId();
    return owner ? Profile.find({ owner }) : this.ready();
    // return Profile.find();
  },
  messengerList() {
    const owner = Meteor.userId();;
    // const receiver = Profile.findOne({ owner: owner })._id;
    // console.log(receiver);
    return owner ? Messenger.find({ sender: owner }).fetch().reverse() : this.ready();
    // return Messenger.find();
  },
  canShowM: function canShow() {
    let find = false;
    const owner = Meteor.userId();
    // const receiver = Profile.findOne({ owner: owner })._id;
    // console.log(receiver);
    // console.log(Messenger.find({ receiver: receiver }).count());
    if (Messenger.find({ sender: owner }).count() > 0) {
      find = true;
    }
    return find;
  },
  profileShowS: function (field1, field2) {
    const message = Messenger.findOne(field2);
    const owner = message.receiver;
    if (field1 === owner) {
      return true;
    }
    return false;
  },
  // canShowMs: function canShow() {
  //   let find = false;
  //   const owner = Meteor.userId();
  //   // console.log(Profile.find( { owner: owner, noti: "1"} ).count());
  //   if (Profile.find( { owner: owner, mess: "1"} ).count() > 0) {
  //     find = true;
  //   }
  //   return find;
  // },
});

Template.Sent_Messenger_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Profile');
  });
  this.autorun(() => {
    this.subscribe('Messenger');
  });
});

