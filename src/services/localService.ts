const KEY: string = "USER"

export let localService = {
  set: (user: any) => {
    return localStorage.setItem(KEY, JSON.stringify(user));
  },
  get: () => {
    let data: any = localStorage.getItem(KEY)
    return JSON.parse(data);
  },
  remove: () => {
    localStorage.removeItem("USER");
    window.location.reload();
  },
};
