/*
*  Name :   ListBubbleCreationButton.jsx
*  Location : /lib/ListBubbleCreationButton.jsx
*  Author: Emanuele Crespan
*  Creation Data: 2017-06-27
*  Description: class ListBubbleCreationButton
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


export default class ListBubbleCreationButton extends AbsButton {
	constructor(props) {
		super(props);
		this.handleSecondButton = this.handleSecondButton.bind(this);
	}

	bubbleButtonName() {
		return 'List Bubble';
	}

	bubbleName() {
		return 'list';
	}

	secondAreaName() {
	    return 'checklist';
	}

}


/*
how to use:

<ListBubbleCreationButton generate={this."function name"}/>
*/
