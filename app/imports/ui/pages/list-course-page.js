import { Template } from 'meteor/templating';
import { Course } from '../../api/course/course.js';

Template.List_Course_Page.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  courseList() {
    return Course.find();
  },
});

Template.List_Course_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Course');
  });
});
