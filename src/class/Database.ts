import SQLite from "react-native-sqlite-storage";
import { DatabaseInitialization } from "./DatabaseInitialization";
import { Log } from "../dao/Log";

export class Database implements Database {
  private status:number;
  private db: Promise<SQLite.SQLiteDatabase>;

  constructor() {
    SQLite.DEBUG(false);
    SQLite.enablePromise(true);
    this.db = Promise.reject("[db] not initialised")
    this.status = -1;
  }

  // Open the connection to the database
  public open(): Promise<SQLite.SQLiteDatabase> {
    let databaseInstance: SQLite.SQLiteDatabase;

    if(this.status <= 0){
      this.status = 1
      this.db = SQLite.openDatabase({
          name: "SQLite.db",
          location: "Library"
      })
      .then(db => {
          if(this.status == 1){
            this.status = 2;
            databaseInstance = db;
            // Perform any database initialization or updates, if needed
            const databaseInitialization = new DatabaseInitialization();
            return databaseInitialization.updateDatabaseTables(databaseInstance);
          }
      })
      .then(() => {
        this.status = 2;
        return databaseInstance;
      });
    }
    return this.db
  }

  // Close the connection to the database
  public async close(): Promise<void> {
    return (await this.db).close().then(status => {
      this.status = 0;
      this.db = Promise.reject("[db] closed.");
    });
  }

  // Insert a new log into the database
  public createLog(title: string, description:string): Promise<number|void> {
    return this.db
      .then(db =>
        db.executeSql("INSERT INTO logs (title, description) VALUES (?, ?);", [title, description])
      )
      .then(([results]) => {
        const { insertId } = results;
        return(insertId)
      })
  }

  // Delete a log
  public deleteLog(log:Log): Promise<boolean|void> {
    return this.db
      .then(db =>
        db.executeSql("DELETE FROM logs WHERE id= ?;", [log.id])
      )
      .then(([results]) => {
        const { rowsAffected } = results;
        return rowsAffected > 0
      })
  }

  // Get an array of all the logs in the database
  public getLog(offset:number, size:number): Promise<Log[]> {
    return this.db
      .then(db =>
        // Get all the lists, ordered by newest lists first
        db.executeSql("SELECT id, title, description FROM logs ORDER BY id ASC LIMIT ?,?;", [offset, size])
      )
      .then(([results]) => {
        if (results === undefined) {
          return [];
        }
        const count = results.rows.length;
        const lists: Log[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const { id, title, description } = row;
          lists.push({ id, title, description });
        }
        return lists;
      });
  }

}
