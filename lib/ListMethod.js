/*
*  Name :   ListMethod.js
*  Location : /lib/ListMethod.js
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: {ListMethod}
*/


import { Meteor } from 'meteor/meteor';

import Monolith from 'meteor/monolith-sdk';


let BubbleDatabase = Monolith.Monolith.BubbleDatabase;
let aBubbleCollection = Monolith.Monolith.aBubbleCollection;


Meteor.methods({
	listInsertion(data) {
		if (data.ops === undefined) {
			throw Meteor.error('format-error', 'List does not have a ops field');
		} else {
			const newOps = [];
			for (let i=0;i<data.ops.length;i++) {
				newOps.push({item: data.ops[i], check:false, id: i});
			}
			return {title: data.title, ops:newOps};
		}
	},
	updateCheckListItem(bubbleId, position) {
		aBubbleCollection.updateAsync({_id: bubbleId, 'ops.id': position}, {$set: {'ops.$.check': true}});
		return true;
	}
});
