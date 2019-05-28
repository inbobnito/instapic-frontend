import thunk from 'redux-thunk'
import expect from 'expect'
import configureMockStore from 'redux-mock-store';

import { registerUser, signInUser, fetchImagePreview, uploadImageAction, actionLoadImages } from './actions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('App Actions', () => {
    beforeEach(() => { 
      store.clearActions();
    });

    describe('registerUser', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: 'LOGGED_IN'
        };

        store
          .dispatch(registerUser({user_name: 'testUser', password: 'testPass'}))
          .then(() => {
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedResult);
          });
        });
    });

    describe('signInUser', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: 'LOGGED_IN'
        };

        store
          .dispatch(signInUser({user_name: 'testUser', password: 'testPass'}))
          .then(() => {
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedResult);
          });
      });
    });


    describe('fetchImagePreview', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: 'IMAGE_PREVIEW'
        };

        store
          .dispatch(fetchImagePreview({file: new Blob()}))
          .then(() => {
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedResult);
          });
      });
    });

    describe('uploadImageAction', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: 'UPLOAD_SUCCESS'
        };

        store
          .dispatch(uploadImageAction({}))
          .then(() => {
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedResult);
          });
      });
    });

    describe('actionLoadImages', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: 'UPLOAD_SUCCESS'
        };

        store
          .dispatch(actionLoadImages({}))
          .then(() => {
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedResult);
          });
      });
    });
});
