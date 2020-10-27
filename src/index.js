import $ from 'jquery';

import store from './store';
import api from './api';
import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list';

const main = () => {
  api.getItems()
  .then((items) => {
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  })

  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);
