import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories-ts/category.saga';
import { userSagas } from './user-ts/user.saga';

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}