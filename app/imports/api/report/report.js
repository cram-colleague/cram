import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Report = new Mongo.Collection('Report');

/**
 * Create the schema for Stuff
 */
export const ReportSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
    max: 200,
  },
  title: {
    label: 'title',
    type: String,
    optional: false,
    max: 200,
  },
  content: {
    label: 'content',
    type: String,
    optional: false,
    max: 10000,
  },
  reporter: {
    label: 'reporter',
    type: String,
  },
});

Report.attachSchema(ReportSchema);
