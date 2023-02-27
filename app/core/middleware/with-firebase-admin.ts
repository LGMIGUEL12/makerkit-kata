import initializeFirebaseAdminApp from '../firebase/admin/initialize-firebase-admin-app';

/**
 * @description This middleware wraps an API handler so that the Firebase
 * admin is initialized when the handler gets executed
 */
function withFirebaseAdmin() {
  return initializeFirebaseAdminApp();
}

export default withFirebaseAdmin;
