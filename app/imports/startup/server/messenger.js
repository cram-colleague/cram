import { Messenger } from '../../api/messenger/messenger.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const messengerSeeds = [
  { sender: 'Kq4QJ7uGPuTWnTXk2',
    name: 'Minako Doi',
    title: 'ICS311',
    content: 'Was not great',
    receiver: 'Kq4QJ7uGPuTWnTXk2',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Messenger.find().count() === 0) {
  _.each(messengerSeeds, function seedMessenger(messenger) {
    Messenger.insert(messenger);
  });
}