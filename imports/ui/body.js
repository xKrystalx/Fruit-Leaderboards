import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks(){
        const instance = Template.instance();
        if(instance.state.get('isAscending')){
            return Tasks.find({},{sort: {points: 1}});
        }
        return Tasks.find({},{sort: {points: -1}});
    },

    state(){
        const instance = Template.instance();
        if(instance.state.get('isAscending')){
            return 1;
        }
        return 0;
    },
});

Template.body.events({
    'submit .new-item' (event){
        event.preventDefault();

        const text = event.target.text.value;

        event.target.text.value = "";

        Tasks.insert({
            text,
            points: 0,
            createdAt: new Date(),
        });
    },

    'click .toggle-sort' (event, instance){
        console.log("click");
        instance.state.set('isAscending', event.target.checked);
    },
})

