// Import the 'openDB' function from the 'idb' NPM package
// 'openDB' is used to create and manage an IndexedDB database
import { openDB } from 'idb';

// 'initdb' opens the database, upgrade is used with an if statement to check if the database already contains a store called 'jate' if it does it returns a console log, and if it doesn't exist it creates the object store with the name 'jate', keyPath of 'id', and sets autoincrement to true.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts the text editor content and adds it to the 'jate' database
export const putDb = async (content) => {
  console.log("Update the database");
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database", result);
};

// Method that gets all the text editor content from the 'jate' database
export const getDb = async () => {
  console.log("GET from the database");
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// Call initdb function to initialise the database when the module is loaded.
initdb();
