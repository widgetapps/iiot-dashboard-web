import { JwtHelperService } from "@auth0/angular-jwt";
import { UserModel } from "../models";

const jwtHelper = new JwtHelperService();

export function processJwt(jwt: string) {
  const decodedUser: UserModel = jwtHelper.decodeToken((jwt));
  localStorage.setItem('currentUser', JSON.stringify(decodedUser));
  localStorage.setItem('jwt', jwt);
}

export function savePubicKey(key: string) {
  localStorage.setItem('publicKey', key);
}

export function getPublicKey() {
  return localStorage.getItem('publicKey');
}

export function getJwt() {
  return localStorage.getItem('jwt');
}

export function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('jwt');
  localStorage.removeItem('publicKey');
}

export function getUser() {
  const user: UserModel = JSON.parse(localStorage.getItem('currentUser'));
  return user;
}

export function getApiKey() {
  const user: UserModel = getUser();
  return user.apiKey;
}
