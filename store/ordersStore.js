import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

axios.defaults.baseURL = 'https://ciplyatnic.onrender.com/cyplyatnic/api/';

class OrdersStore {
  isLoading = false;
  orders = [];
  salledOrders = [];
  purchasesOrders = [];
  error = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: true });
  }

  async getAllOrders() {
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

  async getAllSalledOrders() {
    try {
      this.isLoading = true;
      const { data } = await axios.get('/salles');
      runInAction(() => (this.salledOrders = data.data.result));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async getAllPurchaseOrders() {
    try {
      this.isLoading = true;
      const { data } = await axios.get('/purchases');
      runInAction(() => (this.purchasesOrders = data.data.result));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async addOrder(newOrder) {
    try {
      this.isLoading = true;
      const { data } = await axios.post('/orders', newOrder);
      runInAction(() => this.orders.unshift(data.data.result));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async removeOrder(id) {
    try {
      this.isLoading = true;
      await axios.delete(`/orders/${id}`);
      runInAction(() => (this.orders = this.orders.filter(el => el._id !== id)));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async salleOrder(id) {
    try {
      this.isLoading = true;
      await axios.patch(`/orders/${id}`);
      runInAction(() => (this.orders = this.orders.filter(el => el._id !== id)));
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async updateSalledOrder(id) {
    try {
      this.isLoading = true;
      const { data } = await axios.patch(`/salles/${id}`);
      runInAction(() => {
        this.salledOrders = this.salledOrders.filter(el => el._id !== id);
        this.orders.unshift(data.data.result);
      });
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async updateOrder(id, payload) {
    try {
      this.isLoading = true;
      const { data } = await axios.post(`/orders/${id}`, payload);
      runInAction(() => {
        this.orders = this.orders.filter(el => el._id !== id);
        this.orders.unshift(data.data.result);
      });
    } catch (e) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}

export const ordersStore = new OrdersStore();
