import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
//Reducers
//@todo

const firebaseConfig = {
  apiKey: "AIzaSyCOxBdPn9_dMJchMSRw5wwAM_ErsCUNL-c",
  authDomain: "client-panel-ff284.firebaseapp.com",
  databaseURL: "https://client-panel-ff284.firebaseio.com",
  projectId: "client-panel-ff284",
  storageBucket: "client-panel-ff284.appspot.com",
  messagingSenderId: "543862773592"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create Initial state
const initialState = {};

// Create store 
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;