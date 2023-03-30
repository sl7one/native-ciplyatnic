import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

axios.defaults.baseURL = 'https://ciplyatnic.onrender.com/cyplyatnic/api/';

class CategoriesStore {
  isLoading = false;
  poultryCategories = [];
  error = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAll() {
    try {
      this.isLoading = true;
      const { data } = await axios.get('/categories');
      const [categories] = data.data.result;
      runInAction(() => (this.poultryCategories = categories.poultry));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}

export const categoriesStore = new CategoriesStore();
