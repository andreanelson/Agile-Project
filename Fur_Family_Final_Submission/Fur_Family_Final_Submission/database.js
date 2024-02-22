import { openDatabase } from 'expo-sqlite';

const db = openDatabase('Forum.db');


// Create the posts table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, likes INTEGER)'
  );
});

db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, text TEXT)'
  );
});

db.transaction((tx) => {
  tx.executeSql('SELECT COUNT(*) as count FROM posts', [], (_, { rows }) => {
    const count = rows.item(0).count;

    // If the table is empty, insert the initial posts
    if (count === 0) {
      tx.executeSql(
        'INSERT INTO posts (title, content, likes) VALUES (?, ?, ?)',
        ['My cat is moody.', 'My cat is moody, how can I cheer her up?', 0],
        (_, { insertId }) => {
          console.log('Inserted post with ID:', insertId);

          // Insert comments for the first post
          tx.executeSql(
            'INSERT INTO comments (post_id, text) VALUES (?, ?)',
            [insertId, 'You can try giving her treats']
          );

          tx.executeSql(
            'INSERT INTO comments (post_id, text) VALUES (?, ?)',
            [insertId, 'Try using any chasing-type toys']
          );
        }
      );

      tx.executeSql(
        'INSERT INTO posts (title, content, likes) VALUES (?, ?, ?)',
        ['My puppy hates to shower!', 'My puppy hates it when its time for him to shower. Do you guys face the same problem?', 0],
        (_, { insertId }) => {
          console.log('Inserted post with ID:', insertId);

          // Insert comments for the second post
          tx.executeSql(
            'INSERT INTO comments (post_id, text) VALUES (?, ?)',
            [insertId, 'Not mine! He loves his shower.']
          );
        }
      );

    }
  });
});


export default db;