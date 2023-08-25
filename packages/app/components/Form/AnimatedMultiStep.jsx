import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';

const defaultInOnNext = 'fadeInRight';
const defaultOutOnNext = 'fadeOutLeft';
const defaultInOnBack = 'fadeInLeft';
const defaultOutOnBack = 'fadeOutRight';

export class AnimatedMultiStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      totalSteps: 0,
      userState: props.defaultState || {},
      action: 'fadeInLeft',
      animationFinished: false
    };
  }

  componentDidMount() {
    const { steps = [] } = this.props;
    const { comeInOnNext = defaultInOnNext } = this.props;
    this.setState({ action: comeInOnNext });
    this.setState({ totalSteps: steps.length - 1 });
  }

  next = () => {
    const { currentStep, totalSteps } = this.state;
    const { animate = true, OutOnNext = defaultOutOnNext, duration = 1000 } = this.props;
    if (currentStep !== totalSteps) {
      this.onNext();
      this.setState({ action: OutOnNext, animationFinished: false });
      if (animate) {
        setTimeout(() => {
          this.setState({ currentStep: currentStep + 1 });
        }, duration);
      }
    } else {
      this.finish();
    }
  };

  back = () => {
    const { currentStep } = this.state;
    const { animate = true, OutOnBack = defaultOutOnBack, duration = 1000 } = this.props;
    if (currentStep !== 0) {
      this.onBack();
      this.setState({ action: OutOnBack, animationFinished: false });
      if (animate) {
        setTimeout(() => {
          this.setState({ currentStep: currentStep - 1 });
        }, duration);
      }
    }
  };

  onNext = () => {
    const { onNext } = this.props;
    if (onNext) {
      if (typeof onNext != 'function') {
        throw new Error('onNext parameter should be a function');
      }
      onNext();
    }
  };

  onBack = () => {
    const { onBack } = this.props;
    if (onBack) {
      if (typeof onBack != 'function') {
        throw new Error('onBack parameter should be a function');
      }
      onBack();
    }
  };

  finish = () => {
    const { onFinish } = this.props;
    const { userState } = this.state;
    if (onFinish) {
      onFinish(userState);
    }
  };

  saveState = state => {
    const { userState } = this.state;
    if (typeof state !== 'object') {
      throw new Error('State must be an object');
    }
    this.setState({ userState: { ...userState, ...state } });
  };

  // eslint-disable-next-line
  resetState = (state = {}) => {
    this.setState({ userState: state });
  };

  getState = () => {
    return this.state.userState;
  };

  getCurrentStep = () => {
    const { currentStep } = this.state;
    return currentStep + 1;
  };

  setCurrentStep = currentStep => {
    this.setState({ currentStep });
  };

  getTotalSteps = () => {
    const { totalSteps } = this.state;
    return totalSteps + 1;
  };

  animationEnd = () => {
    const { action, animationFinished } = this.state;
    const {
      OutOnBack = defaultOutOnBack,
      comeInOnBack = defaultInOnBack,
      comeInOnNext = defaultInOnNext
    } = this.props;
    if (!animationFinished) {
      this.setState({
        action: action == OutOnBack ? comeInOnBack : comeInOnNext,
        animationFinished: true
      });
    }
  };

  render() {
    const { steps = [], duration = 1000 } = this.props;
    const { currentStep, action } = this.state;
    const Step = steps[currentStep].component;
    return (
      <Animatable.View
        ref={this.handleViewRef}
        animation={action}
        onAnimationEnd={this.animationEnd}
        style={{ flex: 1 }}
        duration={duration}
      >
        <Step
          next={this.next}
          back={this.back}
          saveState={this.saveState}
          resetState={this.resetState}
          getState={this.getState}
          getCurrentStep={this.getCurrentStep}
          setCurrentStep={this.setCurrentStep}
          getTotalSteps={this.getTotalSteps}
        />
      </Animatable.View>
    );
  }
}

AnimatedMultiStep.propTypes = {
  steps: PropTypes.array,
  onFinish: PropTypes.func,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  comeInOnNext: PropTypes.string,
  OutOnNext: PropTypes.string,
  comeInOnBack: PropTypes.string,
  OutOnBack: PropTypes.string,
  duration: PropTypes.number,
  defaultState: PropTypes.object
};

export default Animatable.createAnimatableComponent(AnimatedMultiStep);
