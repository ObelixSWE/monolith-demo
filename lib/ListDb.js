/*
*  Name :   ListDb.js
*  Location : /lib/ListDb.js
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: {ListDb}
*/


import Monolith from 'meteor/monolith-sdk';


let BubbleDatabase = Monolith.Monolith.BubbleDatabase;
let aBubbleCollection = Monolith.Monolith.aBubbleCollection;

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Promise from 'bluebird';

export const ListDb = new BubbleDatabase('list');

/*
export const BubbleCheckList = new Mongo.Collection('BubbleCheckList');
export const aBubbleCheckList = Promise.promisifyAll(BubbleCheckList);
*/
