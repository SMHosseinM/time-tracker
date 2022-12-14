import React from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, } from 'react-native';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import uuidv4 from 'react-uuid';
import { newTimer } from './utils/TimerUtils';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timers: [
        {
          title: 'Mow the lawn',
          project: 'House Chores',
          id: uuidv4(),
          elapsed: 5456099,
          isRunning: false,
        },
        {
          title: 'Bake squash',
          project: 'Kitchen Chores',
          id: uuidv4(),
          elapsed: 1273998,
          isRunning: false,
        },
      ],
    }
  }

  componentDidMount() {
    const INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer
          return {
            ...timer,
            elapsed: isRunning ? elapsed + INTERVAL : elapsed,
          }
        })
      })
    }, INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleFormSubmit = (item) => {
    const { timers } = this.state;
    let isUpdate = false;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === item.id) {
          const { title, project } = item;
          isUpdate = !isUpdate;

          return {
            ...timer,
            title,
            project
          };
        }
        return timer;
      })
    })

    if (!isUpdate) {
      this.setState({
        timers: [newTimer(item), ...timers]
      })
    }
  }

  handleFormRemove = (id) => {
    const { timers } = this.state;

    this.setState({
      timers: timers.filter(timer => timer.id !== id),
    })
  }

  toggleTimer = (timerId) => {

    this.setState(prevState => {
      const { timers } = prevState;

      return {
        timers: timers.map(timer => {
          if (timer.id === timerId) {
            return {
              ...timer,
              isRunning: !(timer.isRunning),
            }
          }
          return timer;
        })
      }
    })
  }

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleFormSubmit} />
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleFormRemove}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerListContainer: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});