import React, { Component } from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editFormOpen: false
    };
  };

  render() {
    const { title, project, id, elapsed, isRunning } = this.props
    const { editFormOpen } = this.state

    if (editFormOpen) {
      return <TimerForm id={id} title={title} project={project} />
    }

    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
      />
    );
  }
}

