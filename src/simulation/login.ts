const USERNAME = 'admin'
const PASSWORD = '123'

export const loginSimulation = (username: string, password: string) => {
  return new Promise<{ status: string; name: string }>((resolve, reject) => {
    setTimeout(() => {
      if (username === USERNAME && password === PASSWORD) {
        resolve({ status: 'success', name: 'Admin' });
      } else {
        reject({ status: 'error', name: '' });
      }
    }, 1000);
  });
};