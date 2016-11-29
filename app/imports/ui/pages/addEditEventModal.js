/**
 * Created by lam on 11/28/2016.
 */
let closeModal = () => {
  $('#add-edit-event-modal').modal('hide');
  $('.modal-backdrop').fadeOut();
};

Template.addEditEventModal.helpers({
  modalType(type) {
    let eventModal = Session.get('eventModal');
    if (eventModal) {
      return eventModal.type === type;
    }
  },
  modalLabel() {
    let eventModal = Session.get('eventModal');

    if (eventModal) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected(v1, v2) {
    return v1 === v2;
  },
  event() {
    let eventModal = Session.get('eventModal');

    if (eventModal) {
      return eventModal.type === 'edit' ? Events.findOne(eventModal.event) : {
        start: eventModal.date,
        end: eventModal.date
      };
    }
  }
});

Template.addEditEventModal.calendar({
  'submit form' (event, template) {
    event.preventDefault();

    let eventModal = Session.get('eventModal'),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
        eventItem = {
          title: template.find('[name="title"]').value,
          start: template.find('[name="start"]').value,
          end: template.find('[name="end"]').value,
          type: template.find('[name="type"] option:selected').value,
          guests: parseInt(template.find('[name="guests"]').value, 10)
        };

    if (submitType === 'editEvent') {
      eventItem._id = eventModal.event;
    }

    Meteor.call(submitType, eventItem, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Event ${ eventModal.type }ed!`, 'success');
        closeModal();
      }
    });
  }
});