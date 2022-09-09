import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true,
    })
  }

  handleFormClose = () => {
    this.state = {
      isOpen: false,
    }
  }

  handleFormSubmit = (timer) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.setState({ isOpen: false });
  }


  render() {
    const { isOpen } = this.state;

    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? <TimerForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit} /> : <TimerButton
          title="+"
          color="black"
          onPress={this.handleFormOpen}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 10,
  },

  buttonPadding: {
    paddingHorizontal: 15,
  },
});
