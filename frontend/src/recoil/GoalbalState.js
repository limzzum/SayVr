import {atom} from 'recoil';

export const tokenState = atom({
    key: 'tokenState',
    default: '',
});

export const loggedIdState = atom({
    key: 'loggedIdState',
    default: '',
});