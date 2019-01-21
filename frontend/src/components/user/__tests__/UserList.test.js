import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import UserList from '../UserList';


describe('UserList.test.js', () => {

  it('renders without crashing', () => {
    const props = {
      users: [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }],
      handleRowSelect: jest.fn(),
      handleDeleteButton: jest.fn(),
      handleEditButton: jest.fn(),
    };
    
    const wrapper = shallow(<UserList {...props}/>);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('BootstrapTable')).toHaveLength(1);

    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
