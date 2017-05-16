import React from 'react';

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
  }

  _onChange() {

  }

  render() {

    return <div className="root">
      <div className="container">
        {this.props.form.title}
      </div>
    </div>
  }
}