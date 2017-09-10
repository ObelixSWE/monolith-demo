monolith-demo
============

Intro
-----

Monolith is an SDK to build interactive bubbles in Rocket.Chat
environment. The following document explains how to install and use
Monolith SDK. It provides code snippet and examples on how to create a
custom bubble on Rocket.chat using the SDK. There are 4 repositories
containing relevant code:

-   **monolith-sdk**\
    It contains the code for the SDK. Here core funtionalities are
    provided. All other packages depends on this.\
    <https://github.com/ObelixSWE/monolith-sdk>\
    This package includes some built-in bubbles:

    -   **CurrencyBubble**\
        This bubble allows to convert monetary values from one currency
        to another.

    -   **PollBubble**\
        This bubble allows to make a survey.

    -   **RandomBubble**\
        This bubble allow to roll a dice.

-   **monolith-hellobubble**\
    It contains the code for the simplest example possible of how to use
    Monolith-SDK.\
    <https://github.com/ObelixSWE/monolith-hellobubble>

-   **monolith-demo**\
    It contains the code for the official Monolith Demo. It represents a
    more complex use case than monolith-hello. See description for
    details.\
    <https://github.com/ObelixSWE/monolith-demo>

-   **monolith-emptybubble**\
    It contains the code for the empty bubble i.e. a set of files you
    can use to start to build your own bubble. See the developer guide
    for details.\
    <https://github.com/ObelixSWE/monolith-emptybubble>

How to install monolith-sdk
---------------------------

To install Monolith SDK on Rocket.chat you need to follow the following
steps:

        git clone https://github.com/RocketChat/Rocket.Chat.git
        cd Rocket.Chat
        meteor npm start # when finished close meteor
        meteor add templating blaze-html-templates
                react-meteor-data maxharris9:classnames
                react-template-helper   
        meteor npm i react react-dom bluebird simple-schema
                react-addons-pure-render-mixin money
                request request-promise  --save
        # copy monolith-sdk folder inside
        # the packages folder on Rocket.chat
        meteor add monolith-sdk
        meteor

How to install monolith-hello
-----------------------------

**Precondition:** monolith-sdk must be already installed as seen in the
previous section.

    # download from the repository monolith-hello
    # and put the directory in Rocket.Chat/packages
    # execute in the main directory of RocketChat:
    meteor add monolith-hello

How to install monolith-demo
----------------------------

**Precondition:** monolith-sdk must be already installed as seen in the
previous section.

    # download from the repository monolith-demo 
    # and put the directory in Rocket.Chat/packages
    # execute in the main directory of RocketChat:
    meteor add monolith-demo

Error and bug reporting
-----------------------

If you encounter any error or bug during the normal use of the
application, please report it to us by opening an issue on our GitHub
repository at the following URL:
<https://github.com/ObelixSWE/monolith-sdk/issues>.\
We will work to continuously improve our application and fix all the
bugs and error that will be reported.

New bubble creation
===================

A new bubble from an empty bubble
---------------------------------

monolith-emptybubble is provided as a starting point to develop a new
bubble. The first thing to do is to choose a name for your bubble. From
now will be used \<yourbubble\> to indicate your project. Once you
downloaded the directory modify files as follow:

-   rename the main directory and all files to a different name such it
    includes \<yourbubble\>

-   **package.js**

    -   change package name to \<yourbubble\> in Package.describe name.

    -   substitute empty with \<yourbubble\> in api.addFiles

-   **client/main.js**: correct file path

-   **server/main.js**: correct file path

-   **server/Methods.js**: write your own Meteor.method. It is required
    for update but is optional for insertion. Usage is explained in
    section *Database configuration and possible uses*

-   **lib/emptyDb.js**: rename the collection using \<yourbubble\>

-   **lib/emptyCheck.js**: rename the check object and insert your data
    schema as described in *Data schema description*

-   **lib/emptyBubble.jsx**: Gui component. See *Gui requirement* for
    details.

-   **lib/emptyBubbleConfig.jsx**: Gui component. See *Gui requirement*
    for details.

-   **lib/emptyBubbleCreationButton.jsx**: Gui component. See *Gui
    requirement* for details.

-   **lib/emptyCreator.jsx**: substitute empty for \<yourbubble\>. This
    file is required to integrate your graphical elements with
    monolith’s gui.

Keep in mind that names you gave here need to precise. Monolith relies
on that.

Gui requirements
----------------

These are the gui components you must realize to obtain a bubble. You
can ease your work using the component library provided with Monolith.

### emptyBubble.jsx

You can realize up to 2 versione of this, for sender and for receiver,
or just use one as in examples. Just modify accordingly
\<yourbubble\>Creator.js.

You have to realize a React component that will receive in props all
database data for that bubble. If you need to modify bubble server
status you’ll have to use \<yourbubble\>Db.

### emptyBubbleConfig.jsx

You have to realize a React component that will receive in props a
*closeMenu* function. Use this to close menu when finished to configure
your bubble like this:

        send(){
            let insProm = <yourbubble>Db.insert({...});
            insProm.then(
                (result) => {this.props.closeMenu();},
                (error) => {console.log(error);}
            );
        }

The example uses the promise syntax. If operation succeedes the menu is
closed.

To insert a bubble into server side database you’ll have to use
\<yourbubble\>Db.

### emptyBubbleCreationButton.jsx

This is the button in the menu to start to configure \<yourbubble\>. For
a basic usage you can simply insert \<yourbubble\> in the given file.

If you need two button (like monolith-demo) you can redefine the method
*secondAreaName* (commented in empty). You also have to pass as props
*secondButtonName*. Note that you will need a second configmenu and
creator named accordingly.

Data schema description
-----------------------

In \<yourbubble\>Check.js you have to define a schema to validate data
you put in database. Define it with SimpleSchema syntax:
<https://www.npmjs.com/package/simpl-schema>

Database configuration and possible uses
----------------------------------------

In \<yourbubble\>Db.js you simply have to insert the correct name for
your bubble. In \<yourbubble\>Methods.js you can insert you can put
Meteor methods to be called at insertion or update of bubble:

#### Method for insertion

*Use is optional.*

    newDataObj method(dataObj);

This alters the data Object sent from client before it is checked. Note
the modified object must be returned. Call it by inserting the method’s
name as argument of \<yourbubble\>Db.

#### Method for update

*Use is mandatory.*

    boolean method(bubbleId, argument);

In this method you have to put all database update operation for
\<yourbubble\>. It must return true for success, false for failure. Call
it by inserting the method’s name as argument of \<yourbubble\>Db.

Sdk’s Classes Description
=========================

This section explains how to use the Monolith library classes.

SingleComponents
----------------

Singlecomponent classes represent the components that can be rendered.

#### CheckButton

CheckButton represent a HTML \<checkbox\> tag.

    <CheckButton
        id="HTML id"
        classes="CSS classes"
        getCheck={this.functionName}
        value="checkbox value"
    />

getCheck is a props that hold a function called when the checkbox
onChange event is called and passes to the function a variable
containing the state of the checkbox.

    functionName(m){...}

    m={id:"id", value:"value", check:[true/false]};

#### CheckBoxList

CheckBoxList represent a group of CheckButton. CheckBoxList needs to
have an array passed like this:

    let opt=[{id: 1, value: 'Hello World'},{id: 2, value: 'Installation'}];

    <CheckBoxList
        classes="CSS classes"
        options={opt}
        getCheck={this.functionName}
    />

getCheck like the CheckButton getCheck.

    functionName(m){...}

    m={id:"id", value:"value", check:[true/false]};

#### ComboBox

ComboBox represent a HTML \<select\> tag.

    <ComboBox
        id="HTML id"
        classes="CSS classes"
        options={["a","b","c"]}
        getSelection={this.functionName}
    />

getSelection is a props that hold a function called when the select
onChange event is called and passes to the function a variable
containing the selected option.

    functionName(m){...}

    m="selected option";

#### Image

Image represent a HTML \<img\> tag.

    <Image
        id="HTML id"
        classes="CSS classes"
        src="img source location"
        alt="image description"
        width="image width"
        height="image height"
    />

#### ImageButton

ImageButton represent a button with an image.

    <ImageButton
        id="HTML id"
        src="img source location"
        alt="image description"
        width="image width"
        height="image height"
        handleClick={this.functionName}
    />

handleClick is a props that hold a function called when the ImageButton
is clicked.

    functionName(id){...}
    id="id of the clicked button"

#### LineEdit

LineEdit represent a HTML text \<input\> tag.

    <LineEdit
        id="HTML id"
        classes="CSS classes"
        updateState={this.functionName}
        value="default value"
     />

updateState is a props that hold a function called when onChange event
of the text input is called.

    updateState(text,id){...}

    text="text of the text input"
    id="id of the text input"

#### LineEditComboBox

LineEditComboBox represent a HTML text \<input\> and a HTML \<select\>
tag.

    <LineEditComboBox
        idle="LineEdit HTML id"
        idcb="ComboBox  HTML id"
        classesle="LineEdit CSS classes"
        classescb="ComboBox CSS classes"
        textUpdate={this.functionName1}
        options={["a","b","c"]}
        comboUpdate={this.functionName2}
    />

textUpdate is a props that hold a function passed to the LineEdit.
comboUpdate is a props that hold a function passed to the ComboBox.

    functionName1(text,id){...}

    text="text of the text input"
    id="id of the text input"

    functionName2(m){...}

    m="selected option";

#### PushButton

PushButton represent a HTML \<button\> tag.

    <PushButton
        id="HTML id"
        classes="CSS classes"
        handleClick={this.functionName}
        buttonName="button name"
    />

handleClick is a props that hold a function called when the button is
clicked.

    functionName(id){...}

    id="id of the button"

#### LineEditPushButton

LineEditPushButton represent LineEdit and a PushButton.

    <LineEditPushButton
        idle="LineEdit HTML id"
        idpb="PushButton HTML id"
        classesle="LineEdit CSS classes"
        classespb="PushButton CSS classes"
        getText={this.functionName}
        buttonName="button name"
    />

getText is a props that hold a function called when the PushButton is
clicked and passes to the function a variable containing the text of the
LineEdit.

    functionName(text){...}

    text="text of the LineEdit"

#### RadioButtonGroup

RadioButtonGroup represent a group of HTML radio button \<input\>.

    <RadioButtonGroup
        classes="CSS classes"
        options={["a","b","c"]}
        getValue={this.functionName}
    />

getValue is a props that hold a function called when a radio button is
clicked and passes to the function a variable containing the selected
radio information.

    functionName(value){...}

    value="value of the selected radio button"

#### TextAreaButton

TextAreaButton represent a HTML \<textarea\> tag and a PushButton.

    <TextAreaButton
        idta="textArea HTML id"
        classesta="textArea CSS classes"
        idpb="PushButton HTML id"
        classespb="PushButton CSS classes"
        getText={this.functionName}
        width="textarea width"
        height="textarea height"
        buttonName="button name"
    />

getText is a props that hold a function called when the PushButton is
clicked and passes to the function a variable containing the text of the
textarea.

    functionName(text){...}

    text="text of the textarea"

#### TextAreaComboBox

TextAreaComboBox represent a HTML \<textarea\> tag and a ComboBox.

    <TextAreaComboBox
        idtx="textArea HTML id"
        classestx="textArea CSS classes"
        idcb="combobox HTML id"
        classescb="combobox CSS classes"
        width="textarea width"
        height="textarea height"
        textUpdate={this.functionName1}
        options={["a","b","c"]}
        comboUpdate={this.functionName2}
    />

textUpdate is a props that hold a function called when onChange event of
the textarea is called.\
comboUpdate is a props that hold a function called when the select
onChange event is called and passes to the function a variable
containing the selected option.

    functionName1(text){...}

    text="text of the textarea"

    functionName2(m){...}

    m="selected option";

Layout
------

Layout are classes that represent are containers that place the elements
conteined in a certain way.

#### VerticalLayout

VerticalLayout represent a container that place the elements contained
in a vertically.

    <VerticalLayout hide={"visibility state(true or false)"}>
        <Children/>
        <Children/>
        .
        .
        .
    </VerticalLayout>

#### HorizontalLayout

HorizontalLayout represent a container that place the elements contained
in a horizontally.\
The maximum number of element that can be displayed horizontally is 12
due to Bootstrap limits.

    <HorizontalLayout hide={"visibility state(true or false)"}>
        <Children/>
        <Children/>
        .
        .
        .
    </HorizontalLayout>
