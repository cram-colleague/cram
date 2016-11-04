import { Profile } from '../../api/profile/profile.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeeds = [
  { first: 'Minako',
    last: 'Doi',
    preCourse: 'ICS311',
    currCourse: 'ICS314' },
  { first: 'Chad',
    last: 'Naka',
    preCourse: 'PHYS151',
    currCourse: 'PHYS152' },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Profile.find().count() === 0) {
  _.each(profileSeeds, function seedProfiles(profile) {
    Profile.insert(profile);
  });
}
