/*
*  Name :   ListCreator.jsx
*  Location : /lib/ListCreator.jsx
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: {class ListCreator}
*/

import MonolithUI from 'meteor/monolith-sdk';

let CheckBoxList = MonolithUI.MonolithUI.CheckBoxList;
let CheckButton = MonolithUI.MonolithUI.CheckButton;
let ComboBox = MonolithUI.MonolithUI.ComboBox;
let Image = MonolithUI.MonolithUI.Image;
let ImageButton = MonolithUI.MonolithUI.ImageButton;
let LineEdit = MonolithUI.MonolithUI.LineEdit;
let LineEditComboBox = MonolithUI.MonolithUI.LineEditComboBox;
let PushButton = MonolithUI.MonolithUI.PushButton;
let RadioButtonGroup = MonolithUI.MonolithUI.RadioButtonGroup;
let TextAreaButton = MonolithUI.MonolithUI.TextAreaButton;
let TextAreaComboBox = MonolithUI.MonolithUI.TextAreaComboBox;
let VerticalLayout = MonolithUI.MonolithUI.VerticalLayout;
let HorizontalLayout = MonolithUI.MonolithUI.HorizontalLayout;
let AbsBubble = MonolithUI.MonolithUI.AbsBubble;
let AbsButton = MonolithUI.MonolithUI.AbsButton;
let AbsBubbleConfig = MonolithUI.MonolithUI.AbsBubbleConfig;
let BubbleCreator = MonolithUI.MonolithUI.BubbleCreator;
let BubbleDiscriminator = MonolithUI.MonolithUI.BubbleDiscriminator;

import React from 'react';
import ListBubble from './ListBubble';
import ListBubbleConfig from './ListBubbleConfig';
import ListBubbleCreationButton from './ListBubbleCreationButton';

class ListCreator extends BubbleCreator {
	constructor(bubbleName) {
		super(bubbleName);
	}
	doMakeBubbleSender(props) {
		return React.createElement(ListBubble, props);
	}
	doMakeBubbleReceiver(props) {
		return React.createElement(ListBubble, props);
	}
	doMakeConfigurationMenu(closeMenufun) {
		return React.createElement(ListBubbleConfig, {closeMenu: closeMenufun});
	}
	doMakeButton(createConfigArea) {
		return React.createElement(ListBubbleCreationButton, {
			onClick: createConfigArea,
			secondButtonName: 'Set checklists'
		});
	}
}


const lc = new ListCreator('list');
BubbleDiscriminator.BubbleDiscriminator.registerBubbleCreator(lc);
