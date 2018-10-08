import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShalowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
* Return ShallowWrapper containing nodes with the given data-test value
* @param {ShallowWrapper} wrapper - Enzyme shallow to search within.
* @param {string} val -Value of data-test attribute for search.
* @returns {ShallowWrapper}
*/

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('render without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app');
  expect(appComponent.length).toBe(1)
});


test('render counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.length).toBe(1)
});

test('counter start at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

describe('Increment', () => {
  test('render increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper,'increment-button');
    expect(button.length).toBe(1)
  });

  test('clicking button icrements counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    //find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    //find display and test value
    const counterDisplay = findByTestAttr(wrapper,'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe('Decrement', () => {
  test('render decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button')
    expect(button.length).toBe(1);
  })

  test('clicking button decrements counter display',() => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    const button = findByTestAttr(wrapper,'decrement-button')
    button.simulate('click');
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper,'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  test('error does not show when not needed', () => {
    const wrapper = setup();
    const errorMessageDiv = findByTestAttr(wrapper, 'error-message-div');

    const errorMessageDivClass = errorMessageDiv.hasClass('error-message-hidden');
    expect(errorMessageDivClass).toBe(true);
  })
});

describe('counter is 0 and decrement is clicked', function() {

  // describe block'u icindeki her test ten once beforeEach calisir.
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');

    button.simulate('click');
    wrapper.update();
  })
  //error gosteren div in class degerini kontrol ediyorum
  test('error shows', () => {
    const errorMessageDiv = findByTestAttr(wrapper, 'error-message-div');
    const errorMessageDivClass = errorMessageDiv.hasClass('error-message-show');
    expect(errorMessageDivClass).toBe(true);
  })

  // counter hala 0 gosteriyormu onu kontrol ediyorum.
  test('counter still displays 0', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(0);
  })

 //increment butonunu basildiginda bakiyorum hatayi temizlenmis mi?
  test('clicking increment clears the error', () => {
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');

    const errorMessageDiv = findByTestAttr(wrapper, 'error-message-div');
    const errorMessageDivClass = errorMessageDiv.hasClass('error-message-hidden');

    expect(errorMessageDivClass).toBe(true);
  })



  test('showing error if counter below 0 and not decrement', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper,'decrement-button');

    button.simulate('click');
    wrapper.update();

    const errorMessage = findByTestAttr(wrapper, 'error-message-div');
    expect(errorMessage.hasClass('error-message-show')).toBe(true);
  })
});
