import { makeAutoObservable } from 'mobx';
import { formDataStore } from './formDataStore';

class ModalNumbersStore {
  number = '';
  isOpenCount = false;
  itemType = '';
  id = '';
  listType = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setNumbers(target) {
    switch (target) {
      case 'Очистить':
        this.number = '';
        break;
      case 'Добавить':
        const { setCountPickerValues } = formDataStore;
        setCountPickerValues(Number(this.number), this.itemType, this.id, this.listType);
        this.number = '';
        this.setIsOpenCount(false);
        break;
      default:
        this.number = this.number + target;
    }
  }

  setIsOpenCount(bool, itemType = '', id = '', listType = '') {
    this.isOpenCount = bool;
    this.itemType = itemType;
    this.id = id;
    this.listType = listType;
  }
}

export const modalNumbersStore = new ModalNumbersStore();
