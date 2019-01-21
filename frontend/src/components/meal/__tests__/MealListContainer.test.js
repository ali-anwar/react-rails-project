import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createMemoryHistory from 'history/createMemoryHistory';
import { MealListContainer } from '../MealListContainer';


describe('MealListContainer.test.js', () => {

  it('renders without crashing', () => {
    const props = {
      meals: [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }],
      action: { getCoursesAction: jest.fn() },
      history: createMemoryHistory(),
      currentUser: {
        role: 'ADMIN_ROLE'
      },
      filteredMeals: []
    };

    const wrapper = shallow(<MealListContainer {...props} />);

    expect(wrapper).toHaveLength(1);

    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();

    expect(wrapper.find('button')).toHaveLength(3);
  });

  
});
