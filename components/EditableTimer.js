import React, { Component } from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends Component {

  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    this.openForm();
  };

  handleFormClose = () => {
    console.log('here')
    this.closeForm();
  };

  handleSubmit = timer => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
    console.log('hello')
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    const { title, project, id, elapsed, isRunning } = this.props
    const { editFormOpen } = this.state

    if (editFormOpen) {
      return (
        <TimerForm
          id={id}
          title={title}
          project={project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      )
    }

    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
      />
    );
  }
}

