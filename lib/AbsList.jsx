/*
*  Name : AbsList.jsx
*  Location : /lib/AbsList.jsx
*  Author: Emanuele Crespan
*  Creation Data: 2017-06-27
*  Description: class AbsList
*/


import React, { Component } from 'react';
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



export default class AbsList extends AbsBubbleConfig {
	constructor(props) {
		super(props);
		this.state={ops:[], title:''};
		this.addOpt=this.addOpt.bind(this);
		this.delOpt=this.delOpt.bind(this);
		this.titleChange=this.titleChange.bind(this);
		this.optChange=this.optChange.bind(this);
	}


	addOpt(element) {
		const newOptions=this.state.ops;
		const newEl = element ? element : '';
		newOptions.push(newEl);
		this.setState({ops: newOptions});
		/*
		const id=`lopt${ this.state.op.length+1 }`;
		const m={id, value:'', check:false};
		const v=this.state.op;
		v.push(m);
		this.setState({op:v});
		this.optChange('', id);*/
	}

	delOpt(id) {
		const newOptions = this.state.ops;
		newOptions.splice(id, 1);
		this.setState({ops: newOptions});
	}

	titleChange(txt) {
		this.setState({title:txt});
	}


	optChange(text, id) {
		const newOptions = this.state.ops;
		newOptions[id] = text;
		this.setState({ops:newOptions});
	}
}
