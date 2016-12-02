import { SSession } from '../../api/session/session.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const sessionSeeds = [
  { name: 'ICS314',
    time: '2016-10-25 12:00:00',
    place: 'ICSpace',
    sensei: 'Minako Doi',
    students: null,
    owner: 'temp',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (SSession.find().count() === 0) {
  _.each(sessionSeeds, function seedSessions(session) {
    SSession.insert(session);
  });
}
