import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const SSession = new Mongo.Collection('SSession');

/**
 * Create the schema for Stuff
 */
export const SessionSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
  },
  sdate: {
    label: 'sdate',
    type: String,
  },
  start: {
    label: 'start',
    type: String,
  },
  end: {
    label: 'end',
    type: String,
    optional: true,
  },
  startV: {
    label: 'Start Time Value',
    type: Number,
    optional: false,
  },
  endV: {
    label: 'End Time Value',
    type: Number,
    optional: false,
    custom: function startAndEnd() {
      let x = 0;
      if (this.value < this.field('startV').value || this.value === this.field('startV').value) {
        x = 'endV';
      }
      //console.log('x: ' + x);
      return x;
    },
  },
  startString: {
    label: 'Start time of event represented as a string',
    type: String,
    optional: false,
  },
  endString: {
    label: 'End time of event represented as a string',
    type: String,
    optional: false,
  },
  place: {
    label: 'place',
    type: String,
    optional: false,
    max: 200,
  },
  sensei: {
    label: 'sensei',
    type: Array,
    maxCount: 2,
    optional: true,
  },
  "sensei.$": {
    type: String,
  },
  students: {
    label: 'students',
    type: Array,
    maxCount: 5,
    optional: true,
  },
  "students.$": {
    type: String,
  },
  detail: {
    label: 'detail',
    type: String,
    optional: false,
  },
  owner: {
    label: 'owner',
    type: String,
  },
});

SSession.attachSchema(SessionSchema);
