import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.events({
  'click .upvote'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { points: this.points+1 },
    });
  },
  'click .downvote'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { points: this.points-1 },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});

