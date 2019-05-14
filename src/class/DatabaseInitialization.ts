import SQLite from "react-native-sqlite-storage";

export class DatabaseInitialization {

  // Perform updates to the database schema
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then(version => {
        dbVersion = version;

        // Perform DB updates based on this version
        if (dbVersion < 1) {
          // Uncomment the next line, and include the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    // Logs table
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS logs( " +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "title TEXT, " +
        "description TEXT" +
        ");"
    );

    // Version table
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS version( " +
        "version_id INTEGER PRIMARY KEY NOT NULL, " +
        "number INTEGER" +
        ");"
    );
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
      // Select the highest version number from the version table
      return database
        .executeSql("SELECT number FROM version ORDER BY number DESC LIMIT 1;")
        .then(([results]) => {
          if (results.rows && results.rows.length > 0) {
            const version = results.rows.item(0).number;
            return version;
          } else {
            return 0;
          }
        })
        .catch(error => {
          console.log(`No version set. Returning 0. Details: ${error}`);
          return 0;
        }
      );
  }
}