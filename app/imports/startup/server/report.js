import { Report } from '../../api/report/report.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const reportSeeds = [
  { name: 'Minako Doi',
    reporter: 'Chad Naka',
    title: 'ICS311',
    content: 'Was not great',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Report.find().count() === 0) {
  _.each(reportSeeds, function seedCourses(course) {
    Report.insert(course);
  });
}
