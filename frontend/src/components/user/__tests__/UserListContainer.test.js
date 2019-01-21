import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createMemoryHistory from 'history/createMemoryHistory';
import { UserListContainer } from '../UserListContainer';


describe('UserListContainer.test.js', () => {

  it('renders without crashing', () => {
    const props = {
      users: [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }],
      action: { getCoursesAction: jest.fn() },
      history: createMemoryHistory()
    };

    const wrapper = shallow(<UserListContainer {...props} />);

    expect(wrapper).toHaveLength(1);

    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();

    expect(wrapper.find('button')).toHaveLength(1);
  });

  
});
