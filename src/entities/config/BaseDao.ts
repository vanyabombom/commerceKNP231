import GlobalState from "../../features/global_state/GlobalState";
import Config from "./Config";

export default class BaseDao {
    static request = (url: string, init?: RequestInit) => {
        return new Promise<Response>((resolve, reject) => {
          // реалізуємо свій формат api://... який буде адресуватись до бекенду
          if(url.startsWith("api://")) {
            url = url.replace("api://", Config.backendUrl + "/api/");
            // console.log("BaseDao: GlobalState.token = ", GlobalState.token)
            // перевіряємо стан авторизації та додаємо до запиту токен, якщо 
            // він не встановлений ззовні
            if(GlobalState.token) {
              if(!init) {
                init = {};
              }
              if(!init.headers) {
                init.headers = {};
              }
              const headers = new Headers(init.headers);
              if(!headers.has('authorization')) {
                headers.append('authorization', 'Bearer ' + GlobalState.token);
                init.headers = headers;
              }
            }
          }
          fetch(url, init).then(r => {
            if (r.status === 401) {
              window.dispatchEvent(new Event("auth-error"));
            }
            resolve(r);
          }).catch(reject);
      };
}