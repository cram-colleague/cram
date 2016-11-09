import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Course = new Mongo.Collection('Course');

/**
 * Create the schema for Stuff
 */
export const CourseSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
    max: 200,
  },
  sensei: {
    label: 'sensei',
    type: String,
    optional: false,
    max: 200,
  },
  grasshopper: {
    label: 'grasshopper',
    type: String,
    optional: false,
    max: 200,
  },
});

Course.attachSchema(CourseSchema);
