import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import App from './App';
import Home from './Home'

const wrapper = (obj) => shallow(<Home location={ {state: obj} }/>);

it ('Username', () => {
  
  expect(wrapper({username: ''}).state().username).toEqual('');

});

it ('id', () => {

  const user = {id: 1};
  expect (wrapper(user).state().user.id).toEqual(1);

})