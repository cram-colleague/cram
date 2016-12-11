import { Report } from '../../api/report/report.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const reportSeeds = [
  { name: 'Minako Doi',
    title: 'ICS311',
    content: 'Was not great',
    reporter: 'Kq4QJ7uGPuTWnTXk2',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Report.find().count() === 0) {
  _.each(reportSeeds, function seedReports(report) {
    Report.insert(report);
  });
}
