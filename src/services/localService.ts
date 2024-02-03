const KEY: string = "USER"

export let localService = {
  set: (user: any): void => {
    return localStorage.setItem(KEY, JSON.stringify(user));
  },
  get: () => {
    let data: any = localStorage.getItem(KEY)
    return JSON.parse(data);
  },
  remove: (): void => {
    localStorage.removeItem(KEY);
    window.location.reload();
  },
};
