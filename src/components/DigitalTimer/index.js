import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    isTimerRunning: false,
    timerSetterDisplay: 25,
    isTimerStopped: true,
  }

  runTimer = () => {
    const {minutes, seconds} = this.state

    if (seconds === 0 && minutes !== 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59,
        isTimerRunning: true,
        isTimerStopped: false,
      })
    } else if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState({
        minutes: 0,
        seconds: 0,
        isTimerRunning: false,
        isTimerStopped: true,
      })
    } else {
      this.setState({
        seconds: seconds - 1,
        isTimerRunning: true,
        isTimerStopped: false,
      })
    }
  }

  onStartPauseClick = () => {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)
    if (!isTimerRunning) {
      console.log(1)
      this.timerId = setInterval(this.runTimer, 1000)
      console.log(2)
    } else {
      clearInterval(this.timerId)
      this.setState({isTimerRunning: !isTimerRunning})
    }
  }

  onResetClick = () => {
    clearInterval(this.timerId)
    this.setState({
      minutes: 25,
      seconds: 0,
      isTimerRunning: false,
      isTimerStopped: true,
    })
  }

  onMinusClick = () => {
    const {timerSetterDisplay} = this.state

    if (timerSetterDisplay > 1) {
      this.setState({
        timerSetterDisplay: timerSetterDisplay - 1,
        minutes: timerSetterDisplay - 1,
      })
    }
  }

  onPlusClick = () =>
    this.setState(prevState => ({
      minutes: prevState.timerSetterDisplay + 1,
      timerSetterDisplay: prevState.timerSetterDisplay + 1,
    }))

  //  rendering starts below

  render() {
    const {
      minutes,
      seconds,
      isTimerRunning,
      timerSetterDisplay,
      isTimerStopped,
    } = this.state
    const startPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const presentState = isTimerRunning ? 'Running' : 'Paused'
    const disableButton = isTimerStopped ? '' : 'disable-button'
    const timerCardClass =
      minutes === 0 && seconds === 0 ? 'timer-card-when-time-up' : ''
    const timeUpClass =
      minutes === 0 && seconds === 0 ? 'count-down-time-up' : ''

    return (
      <div className="home-container">
        <div className="timer-container">
          <h1 className="main-heading">Digital Timer</h1>
          <div className="timer-image-container-and-controller-container">
            <div className="timer-image-container">
              <div
                className={`timer-and-present-state-container ${timerCardClass}`}
              >
                <h1 className={`count-down ${timeUpClass}`}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
                <p className="present-state">{presentState}</p>
              </div>
              {minutes === 0 && seconds === 0 && (
                <p className="time-up-warning">Time Up</p>
              )}
            </div>
            <div className="all-controllers-container">
              <div className="start-reset-container">
                <div className="icon-and-state-container-start-pause">
                  <button
                    onClick={this.onStartPauseClick}
                    type="button"
                    className="start-pause-reset-button"
                  >
                    <img
                      src={startPauseImageUrl}
                      className="start-or-pause-icon"
                      alt={isTimerRunning ? 'pause icon' : 'play icon'}
                    />
                    <p className="button-indicators">
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="icon-and-state-container-reset">
                  <button
                    onClick={this.onResetClick}
                    type="button"
                    className="start-pause-reset-button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="start-or-pause-icon"
                      alt="reset icon"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <div className="set-timer-limit-text-and-timer-setters-container">
                <p className="set-timer-text">Set Timer Limit</p>
                <div className="minus-button-time-set-display-plus-button-container">
                  <button
                    onClick={this.onMinusClick}
                    type="button"
                    className={`plus-button ${disableButton}`}
                  >
                    -
                  </button>
                  <p className="timer-set-display">{timerSetterDisplay}</p>
                  <button
                    onClick={this.onPlusClick}
                    type="button"
                    className={`plus-button ${disableButton}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
