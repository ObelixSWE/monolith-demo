/*
*  Name :   ChecklistDb.js
*  Location : /lib/ChecklistDb.js
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: class ChecklistDb
*/


import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Promise from 'bluebird';

export const BubbleCheckList = new Mongo.Collection('BubbleCheckList');
export const aBubbleCheckList = Promise.promisifyAll(BubbleCheckList);




if (Meteor.isServer) {
	Meteor.publish(
		'monolith-checklists',
		function CheckListPublish(roomId) {
			return BubbleCheckList.find({roomId: {$eq: roomId}});
		}
	);
	BubbleCheckList.allow({
		insert(userId, doc) {
			return true;
		},
		update(userId, doc, fields, modifier) {
			return true;
		},
		remove(userId, doc) {
			return true;
		}
	});

}
