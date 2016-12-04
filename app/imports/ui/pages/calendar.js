// import { ReactiveDict } from 'meteor/reactive-dict';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Template } from 'meteor/templating';
// import { _ } from 'meteor/underscore';

 //eslint-disable object-shorthand, no-unused-vars

 /*
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
 */

let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

Template.calendar.onCreated(() => {
  let template = Template.instance();
  template.subscribe('calendar');
});

Template.calendar.onRendered(() => {
  $('#calendar-calendar').fullCalendar({
    calendar(start, end, timezone, callback) {
      let data = Events.find().fetch().map((event) => {
        event.editable = !isPast(event.start);
        return event;
      });

      if (data) {
        callback(data);
      }
    },
    eventRender(event, element) {
      element.find('.fc-content').html(
          `<h4>${ event.title }</h4>
         <p class="guest-count">${ event.guests } Guests</p>
         <p class="type-${ event.type }">#${ event.type }</p>
        `
      );
    },
    dayClick(date) {
      Session.set('eventModal', { type: 'add', date: date.format() });
      $('#add-edit-event-modal').modal('show');
    },
    eventClick(event) {
      Session.set('eventModal', { type: 'edit', event: event._id });
      $('#add-edit-event-modal').modal('show');
    }
  });
  Tracker.autorun(() => {
    Events.find().fetch();
    $('#calendar-calendar').fullCalendar('refetchEvents');
  });
});
