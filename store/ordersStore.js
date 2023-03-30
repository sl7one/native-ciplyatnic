import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { formDataStore } from './formDataStore';
import { Toast } from 'toastify-react-native';

axios.defaults.baseURL = 'https://ciplyatnic.onrender.com/cyplyatnic/api/';

class OrdersStore {
  isLoading = false;
  orders = [];
  error = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: true });
  }

  async getAll() {
    try {
      this.isLoading = true;
      const { data } = await axios.get('/orders');
      runInAction(() => (this.orders = data.data.result));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async addOrder(newOrder) {
    const { resetForm } = formDataStore;
    try {
      this.isLoading = true;
      const { data } = await axios.post('/orders', newOrder);
      runInAction(() => {
        resetForm();
        Toast.success('Заказ Добавлен');
        return this.orders.unshift(data.data.result);
      });
    } catch (e) {
      runInAction(() => {
        Toast.error(e.message);
        return (this.error = e.message);
      });
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}

export const ordersStore = new OrdersStore();
