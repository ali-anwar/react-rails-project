import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import MealList from '../MealList';


describe('MealList.test.js', () => {

  it('renders without crashing', () => {
    const props = {
      meals: [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }],
      handleRowSelect: jest.fn(),
      isCurrentAdminUser: false,
      handleDeleteButton: jest.fn(),
      handleEditButton: jest.fn(),
    };
    
    const wrapper = shallow(<MealList {...props}/>);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('BootstrapTable')).toHaveLength(1);

    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
