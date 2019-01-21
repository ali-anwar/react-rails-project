import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {App} from '../App';


describe('App.test.js', () => {
  const props = {
    location: 'https://caloriessystem.com'
  };

  it('renders as expected', () => {
    const wrapper = shallow(<App {...props} />);
    const tree = toJson(wrapper);
    
    expect(wrapper.length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });
});
