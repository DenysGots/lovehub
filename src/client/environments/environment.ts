// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
<<<<<<< Updated upstream
  CHAR_URL: 'ws://localhost:5400'
=======
  CHAR_URL: 'ws://localhost:5400/chat?chat_id=1',
  firebase: {
    apiKey: '[AIzaSyAiekoph6xCh46f7RbPRoUNV3gtXWkPcUk]',
    authDomain: '[lovehub-1518604195157.firebaseapp.com]',
    databaseURL: '[https://lovehub-1518604195157.firebaseio.com]',
    projectId: '[lovehub-1518604195157]',
    storageBucket: '[lovehub-1518604195157.appspot.com]',
    messagingSenderId: '[487898966150]'
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiY3JvZnR5IiwiYSI6ImNqZnVuN3NiYzBheWkyenA1bXlucWZ6OHUifQ.N-6EsuJJEHAdzPjLPFBKGQ'
  }
>>>>>>> Stashed changes
};
