import { makeAutoObservable } from 'mobx';
import uuid from 'react-native-uuid';
import { ordersStore } from './ordersStore';
import { Toast } from 'toastify-react-native';

class FormDataStore {
  isOpenDatePicker = false;
  isOpenAddOrder = false;
  currentDate = new Date();
  inputs = { name: '', phone: '', location: '' };
  poultry = [];
  food = [];
  options = [];
  isExpanded = { poultry: false, food: false, options: false };
  initPoultry = { id: '', type: 'Птица', count: 0, price: 0 };
  initFood = { id: '', type: 'Корм', count: 0, price: 0 };
  initOptions = { id: '', type: 'Доп', count: 0, price: 0 };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: true });
  }

  setDate(date) {
    this.currentDate = new Date(date);
  }

  setIsOpenDatePicker(bool) {
    this.isOpenDatePicker = bool;
  }

  setIsOpenAddItem(bool) {
    this.isOpenAddOrder = bool;
  }

  handleSelect({ nativeEvent, type }) {
    switch (type) {
      case 'set':
        this.currentDate = new Date(nativeEvent.timestamp);
        this.setIsOpenDatePicker(false);
        return;
      case 'dismissed':
        this.setIsOpenDatePicker(false);
        return;
      default:
        return null;
    }
  }

  setInputsData(input, value) {
    this.inputs = { ...this.inputs, [input]: value };
  }

  getlistItems(type) {
    switch (type) {
      case 'poultry':
        return this.poultry;
      case 'food':
        return this.food;
      case 'options':
        return this.options;
      default:
        return null;
    }
  }

  setIsExpanded(type) {
    switch (type) {
      case 'poultry':
        this.isExpanded = { poultry: true, food: false, options: false };
        break;
      case 'food':
        this.isExpanded = { poultry: false, food: true, options: false };
        break;
      case 'options':
        this.isExpanded = { poultry: false, food: false, options: true };
        break;
      default:
        return null;
    }
  }

  addItem(type) {
    let id;
    switch (type) {
      case 'poultry':
        id = uuid.v4();
        this.poultry.push({ ...this.initPoultry, id });
        this.setIsExpanded(type);
        break;
      case 'food':
        id = uuid.v4();
        this.food.push({ ...this.initFood, id });
        this.setIsExpanded(type);
        break;
      case 'options':
        id = uuid.v4();
        this.options.push({ ...this.initOptions, id });
        this.setIsExpanded(type);
        break;
      default:
        return null;
    }
  }

  removeItem(type, id) {
    const list = this.getlistItems(type);
    const idx = list.findIndex(el => el.id === id);
    list.splice(idx, 1);
  }

  setCountPickerValues(value, itemType, id, listType) {
    const list = this.getlistItems(listType);
    const [item] = list.filter(el => el.id === id);
    item[itemType] = value;
    switch (listType) {
      case 'poultry':
        this.initPoultry[itemType] = value;
        break;
      case 'food':
        this.initFood[itemType] = value;
        break;
      case 'options':
        this.initOptions[itemType] = value;
        break;
      default:
        return null;
    }
  }

  setProductPickerValues(value, itemType, id, listType) {
    const list = this.getlistItems(listType);
    const [item] = list.filter(el => el.id === id);
    item[itemType] = value;
  }

  handleSubmitAddOrder() {
    const { addOrder } = ordersStore;

    const isInvalid =
      !this.inputs.name || !this.inputs.phone || !this.inputs.location || !this.poultry.length;

    if (isInvalid) {
      Toast.error('Не валидные поля');
      return;
    }

    addOrder({
      date: this.currentDate,
      order: {
        buyer: {
          name: this.inputs.name,
          phone: this.inputs.phone,
          location: this.inputs.location,
        },
        data: this.poultry,
        food: this.food,
        options: this.options,
      },
    });
  }

  resetForm() {
    this.isOpenDatePicker = false;
    this.isOpenAddOrder = false;
    this.currentDate = new Date();
    this.inputs = { name: '', phone: '', location: '' };
    this.poultry = [];
    this.food = [];
    this.options = [];
    this.isExpanded = { poultry: false, food: false, options: false };
    this.initPoultry = { id: '', type: 'Птица', count: 0, price: 0 };
    this.initFood = { id: '', type: 'Корм', count: 0, price: 0 };
    this.initOptions = { id: '', type: 'Доп', count: 0, price: 0 };
  }
}

export const formDataStore = new FormDataStore();
