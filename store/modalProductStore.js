import { makeAutoObservable } from 'mobx';
import { formDataStore } from './formDataStore';

class ModalProductStore {
  isOpenProduct = false;
  id = '';
  listType = '';
  itemType = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsOpenProduct(bool, type = '', id = '', listType = '') {
    this.isOpenProduct = bool;
    this.itemType = type;
    this.id = id;
    this.listType = listType;
  }

  setProduct(target) {
    const { setProductPickerValues } = formDataStore;
    setProductPickerValues(target, this.itemType, this.id, this.listType);
    this.setIsOpenProduct(false);
  }
}

export const modalProductStore = new ModalProductStore();
