import { Profile } from '../../api/profile/profile.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeeds = [
  {
    first: 'Minako',
    last: 'Doi',
    // preCourse: 'ICS311',
    // sensei: 'ICS311',
    // currCourse: 'ICS314',
    // grasshopper: 'ICS314',
    description: 'Hello, I am a Senior majoring in ICS.' },
  {
    first: 'Chad',
    last: 'Naka',
    // preCourse: 'PHYS151',
    // sensei: 'PHYS151',
    // currCourse: 'PHYS152',
    // grasshopper: 'PHYS152',
    description: 'Hi, I am a freshman.' },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Profile.find().count() === 0) {
  _.each(profileSeeds, function seedProfiles(profile) {
    Profile.insert(profile);
  });
}
