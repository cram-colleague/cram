import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {_} from 'meteor/underscore';

/* eslint-disable object-shorthand, no-unused-vars */

let initialize_calendar;
initialize_calendar = function () {
  $('.calendar').each(function () {
    let calandar = $(this);
    calendar.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
    });
  })
};
$(document).on('turbolinks:load', initialize_calendar);



