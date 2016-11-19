/**
 * Created by Ian O'Connor on 11/19/2016.
 */
import { Template } from 'meteor/templating';
import { Course } from '../../api/course/course.js';

Template.Admin_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  courseList() {
    return Course.find();
  },
});

Template.Admin_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Course');
  });
});
