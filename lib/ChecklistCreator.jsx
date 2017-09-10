/*
*  Name :   ChecklistCreator.jsx
*  Location : /lib/ChecklistCreator.jsx
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: class ChecklistCreator
*/

import MonolithUI from 'meteor/monolith-sdk';

let BubbleCreator = MonolithUI.MonolithUI.BubbleCreator;
let BubbleDiscriminator = MonolithUI.MonolithUI.BubbleDiscriminator;


import React from 'react';
import ChecklistConfigContainer from './ChecklistConfig';

class ChecklistCreator extends BubbleCreator {
	constructor(bubbleName) {
		super(bubbleName);
	}
	doMakeBubbleSender() {
		return null;
	}
	doMakeBubbleReceiver() {
		return null;
	}
	doMakeConfigurationMenu(closeMenufun) {
		return React.createElement(ChecklistConfigContainer, {closeMenu: closeMenufun});
	}
	doMakeButton() {
		return null;
	}
}


const lc = new ChecklistCreator('checklist');
BubbleDiscriminator.BubbleDiscriminator.registerBubbleCreator(lc);
