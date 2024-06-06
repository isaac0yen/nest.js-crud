// This class is a wrapper for the mysql library, providing methods to start, commit and rollback transactions,
// as well as methods to insert, update, delete and select rows from the database.
// It also provides methods to backup the entire database to a local file or a remote ftp directory.

// list of methods provided by the _MySQL class along with short instructions for developers:

// transaction()
// Description: Starts a database transaction.
// Usage: Call this method before a series of database operations that should be treated as a single transaction.

// commit()
// Description: Commits the current transaction.
// Usage: Call this method after successfully completing a series of database operations within a transaction.

// rollback()
// Description: Rolls back the current transaction.
// Usage: Call this method if an error occurs during a transaction, undoing any changes made within the transaction.

// query(sql: string)
// Description: Executes a custom SQL query on the database.
// Usage: Pass a valid SQL query string as an argument. Returns the result of the query.

// insertOne(tableName: string, data: object)
// Description: Inserts a single row into the specified table.
// Usage: Provide the table name and an object containing the data to be inserted. Returns the ID of the inserted row.

// insertMany(tableName: string, data: array)
// Description: Inserts multiple rows into the specified table.
// Usage: Provide the table name and an array of objects, each representing data for a row.
// Returns the number of affected rows.

// updateOne(tableName: string, data: object, condition: object)
// Description: Updates a single row in the specified table based on a given condition.
// Usage: Provide the table name, data to be updated, and a condition to identify the row. Returns the number of affected rows.

// updateMany(tableName: string, data: object, condition: object)
// Description: Updates multiple rows in the specified table based on a given condition.
// Usage: Provide the table name, data to be updated, and a condition to identify rows. Returns the number of affected rows.

// updateDirect(query: string, params: object)
// Description: Executes a custom update query directly on the database.
// Usage: Provide a valid update SQL query and parameters. Returns the number of affected rows.

// deleteOne(tableName: string, condition: object)
// Description: Deletes a single row from the specified table based on a given condition.
// Usage: Provide the table name and a condition to identify the row to be deleted. Returns the number of affected rows.

// deleteMany(tableName: string, condition: object)
// Description: Deletes multiple rows from the specified table based on a given condition.
// Usage: Provide the table name and a condition to identify rows to be deleted. Returns the number of affected rows.

// deleteDirect(query: string, condition: object)
// Description: Executes a custom delete query directly on the database.
// Usage: Provide a valid delete SQL query and parameters. Returns the number of affected rows.

// findOne(tableName: string, condition: object, options: object)
// Description: Retrieves a single row from the specified table based on a given condition.
// Usage: Provide the table name, condition, and optional parameters like columns and useIndex. Returns the selected row.

// findMany(tableName: string, condition: object, options: object)
// Description: Retrieves multiple rows from the specified table based on a given condition.
// Usage: Provide the table name, condition, and optional parameters like columns and useIndex. Returns an array of selected rows.

// findDirect(query: string, condition: object)
// Description: Executes a custom select query directly on the database.
// Usage: Provide a valid select SQL query and parameters. Returns an array of selected rows.

// upsertOne(tableName: string, data: object)
// Description: Inserts or updates a single row into the specified table (based on a unique key).
// Usage: Provide the table name and an object containing the data. Returns the number of affected rows.

// upsertMany(tableName: string, data: array)
// Description: Inserts or updates multiple rows into the specified table (based on a unique key).
// Usage: Provide the table name and an array of objects, each representing data for a row. Returns the number of affected rows.

// insertIgnoreOne(tableName: string, data: object)
// Description: Inserts a single row into the specified table, ignoring duplicates.
// Usage: Provide the table name and an object containing the data. Returns the number of affected rows.

// insertIgnoreMany(tableName: string, data: array)
// Description: Inserts multiple rows into the specified table, ignoring duplicates.
// Usage: Provide the table name and an array of objects, each representing data for a row. Returns the number of affected rows.

// executeDirect(query: string)
// Description: Executes a custom SQL query directly on the database without expecting any specific result.
// Usage: Provide a valid SQL query for execution.

import 'dotenv/config';
import mysql from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2';

type DBRow = RowDataPacket[];
type DBResult = ResultSetHeader & { insertId?: number };

type OptionType = {
  useIndex?: string;
  columns?: string;
};

type ObjectType = Record<string, any>;

let _DB: mysql.Pool;

export const DBConnect = async () => {
  try {
    _DB = await mysql.createPool({
      // eslint-disable-next-line no-undef
      host: process.env.DB_HOST,
      // eslint-disable-next-line no-undef
      user: process.env.DB_USER,
      // eslint-disable-next-line no-undef
      password: process.env.DB_PASSWORD,
      // eslint-disable-next-line no-undef
      database: process.env.DB_DATABASE,
      namedPlaceholders: true,
      waitForConnections: true,
      connectionLimit: 120,
      maxIdle: 50, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 300000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      dateStrings: true,
    });
    // Try acquiring a connection to ensure the pool is working
    const connection = await _DB.getConnection();
    connection.release();

    console.log('New MySQL Connection pool created successfully.');
  } catch (error) {
    console.log('New MySQL Database connection failed.');
    throw error;
  }
};

// Create a new class
export const DBObject = {
  // Method to start a transaction
  async transaction(): Promise<void> {
    // Create a query to start the transaction
    const query = 'START TRANSACTION';
    // Execute the query and store the results in an array
    // eslint-disable-next-line no-undef
    await _DB.query(query);
  },

  // Method to commit a transaction
  async commit(): Promise<void> {
    // Create a query to commit the transaction
    const query = 'COMMIT';
    // Execute the query and store the results in an array
    await _DB.query(query);
  },

  // Method to rollback a transaction
  async rollback(): Promise<void> {
    // Create a query to rollback the transaction
    const query = 'ROLLBACK';
    // Execute the query and store the results in an array
    await _DB.query(query);
  },

  // Method to select multiple rows from the database directly with query
  async query(sql: string): Promise<DBRow[]> {
    if (sql === '') {
      throw new Error('Query is empty');
    }
    // Execute the query and store the results in an array
    try {
      // eslint-disable-next-line no-unused-vars
      const [results]: [DBRow[], FieldPacket[]] = await _DB.query(sql);
      // Return the rows
      return results;
    } catch (err) {
      throw new Error('Query Error.');
    }
  },

  // Method to insert one row into the database
  async insertOne(tableName: string, data: ObjectType): Promise<number> {
    const columns = '`' + Object.keys(data).join('`,`') + '`';
    const placeholders = Object.keys(data)
      .map((col) => {
        return ':' + col;
      })
      .join(',');
    // Create a query to insert into the table
    const query = `INSERT INTO ${tableName} (${columns}) VALUES ( ${placeholders})`;
    // eslint-disable-next-line no-unused-vars
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(query, data);

    // Return the id of the inserted row
    return result.insertId || 0;
  },

  // Method to insert multiple rows into the database
  async insertMany(tableName: string, data: ObjectType[]): Promise<number> {
    const columns = '`' + Object.keys(data[0]).join('`,`') + '`';
    const values: any[] = [];
    // Loop through the data array
    for (let i = 0; i < data.length; i++) {
      const row: any[] = [];
      Object.keys(data[0]).forEach((col) => {
        row.push(data[i][col]);
      });
      values.push(row);
    }
    // Create a query to insert multiple rows into the table
    const query = `INSERT INTO ${tableName} (${columns}) VALUES ?;`;
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.query(query, [
      values,
    ]);
    // Return the number of affected rows
    return result.affectedRows;
  },

  // Method to update one row in the database
  async updateOne(
    tableName: string,
    data: ObjectType,
    condition: ObjectType,
  ): Promise<number> {
    const set = Object.keys(data)
      .map((col) => {
        return '`' + col + '` = :' + col;
      })
      .join(', ');
    const allData = { ...data };
    let query = '';
    if (condition && Object.keys(condition)?.length > 0) {
      const where = Object.keys(condition)
        .map((col) => {
          allData['w_' + col] = condition[col];
          return col + ' = :w_' + col;
        })
        .join(' AND ');
      // Create a query to update one row in the table
      query = `UPDATE ${tableName} SET ${set} WHERE ${where} LIMIT 1`;
    } else query = `UPDATE ${tableName} SET ${set} LIMIT 1`;

    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
      query,
      allData,
    );
    // Return the number of changed rows
    return result.affectedRows;
  },

  // Method to update multiple rows in the database
  async updateMany(
    tableName: string,
    data: ObjectType,
    condition: ObjectType,
  ): Promise<number> {
    const set = Object.keys(data)
      .map((col) => {
        return '`' + col + '` = :' + col;
      })
      .join(', ');
    const allData = { ...data };
    let query = '';
    if (condition && Object.keys(condition)?.length > 0) {
      const where = Object.keys(condition)
        .map((col) => {
          allData['w_' + col] = condition[col];
          return col + ' = :w_' + col;
        })
        .join(' AND ');

      // Create a query to update multiple rows in the table
      query = `UPDATE ${tableName} SET ${set} WHERE ${where}`;
    } else query = `UPDATE ${tableName} SET ${set}`;
    // Execute the query and store the results in an array

    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
      query,
      allData,
    );
    // Return the number of changed rows
    return result.affectedRows;
  },

  async updateDirect(query: string, params?: ObjectType): Promise<number> {
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
      query,
      params,
    );
    // Return the number of changed rows
    return result.affectedRows;
  },

  // Method to delete one row from the database
  async deleteOne(tableName: string, condition: ObjectType): Promise<number> {
    // Create a query to delete one row from the table
    let query = '';
    if (condition && Object.keys(condition)?.length > 0) {
      const where = Object.keys(condition)
        .map((col) => {
          return '`' + col + '` = :' + col;
        })
        .join(' AND ');
      query = `DELETE FROM ${tableName} WHERE ${where} LIMIT 1`;
    } else query = `DELETE FROM ${tableName} LIMIT 1`;
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
      query,
      condition,
    );
    // Return the number of affected rows
    return result.affectedRows;
  },

  // Method to delete multiple rows from the database
  async deleteMany(tableName: string, condition: ObjectType): Promise<number> {
    // Create a query to delete one row from the table
    let query = '';
    if (condition && Object.keys(condition)?.length > 0) {
      const where = Object.keys(condition)
        .map((col) => {
          return '`' + col + '` = :' + col;
        })
        .join(' AND ');
      query = `DELETE FROM ${tableName} WHERE ${where}`;
    } else query = `DELETE FROM ${tableName}`;
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
      query,
      condition,
    );
    // Return the number of affected rows
    return result.affectedRows;
  },

  // Method to delete multiple rows from the database
  async deleteDirect(query: string, condition?: ObjectType): Promise<number> {
    if (condition && Object.keys(condition)?.length > 0) {
      const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
        query,
        condition,
      );
      return result.affectedRows;
    } else {
      const [result]: [DBResult, FieldPacket[]] = await _DB.execute(query);
      return result.affectedRows;
    }
  },

  // Method to select one row from the database
  async findOne(
    tableName: string,
    condition?: ObjectType,
    options?: OptionType,
  ): Promise<DBRow | undefined> {
    let columns = '*';
    if (options?.columns && options.columns.length > 0) {
      columns = options.columns;
    }
    if (condition && Object.keys(condition)?.length > 0) {
      let myIndex = '';
      if (options?.useIndex && options.useIndex.length > 1) {
        myIndex = ` USE INDEX (${options.useIndex}) `;
      }
      const placeholders = Object.keys(condition)
        .map((col) => {
          return '`' + col + '` = :' + col;
        })
        .join(' AND ');
      // Create a query to select one row from the table
      const query = `SELECT ${columns} FROM ${tableName} ${myIndex} WHERE ${placeholders} LIMIT 1`;
      // Execute the query and store the results in an array
      const [result]: [DBResult, FieldPacket[]] = await _DB.execute(
        query,
        condition,
      );
      // Return the row
      return result[0];
    } else {
      // Create a query to select one row from the table
      const query = `SELECT  ${columns} FROM ${tableName} LIMIT 1`;
      // Execute the query and store the results in an array
      const [result]: [DBResult, FieldPacket[]] = await _DB.execute(query);
      // Return the row
      return result[0];
    }
  },
  // Method to select multiple rows from the database
  async findMany(
    tableName: string,
    condition?: ObjectType,
    options?: OptionType,
  ): Promise<DBRow[]> {
    let columns = '*';
    if (options?.columns && options.columns.length > 0) {
      columns = options.columns;
    }

    if (condition && Object.keys(condition)?.length > 0) {
      let myIndex = '';
      if (options?.useIndex && options.useIndex.length > 1) {
        myIndex = ` USE INDEX (${options.useIndex}) `;
      }

      const placeholders = Object.keys(condition)
        .map((col) => {
          return '`' + col + '` = :' + col;
        })
        .join(' AND ');
      // Create a query to select multiple rows from the table
      const query = `SELECT ${columns} FROM ${tableName} ${myIndex} WHERE ${placeholders}`;
      // Execute the query and store the results in an array
      const [result]: [DBRow[], FieldPacket[]] = await _DB.execute(
        query,
        condition,
      );
      // Return the rows
      return result;
    } else {
      const query = `SELECT ${columns} FROM ${tableName}`;
      // Execute the query and store the results in an array
      const [result]: [DBRow[], FieldPacket[]] = await _DB.execute(query);
      // Return the rows
      return result;
    }
  },
  // Method to select multiple rows from the database
  async findDirect(query: string, condition?: ObjectType): Promise<DBRow[]> {
    if (condition && Object.keys(condition)?.length > 0) {
      // Execute the query and store the results in an array
      const [rows]: [DBRow[], FieldPacket[]] = await _DB.execute(
        query,
        condition,
      );

      // Return the rows
      return rows;
    } else {
      // Execute the query and store the results in an array
      const [rows]: [DBRow[], FieldPacket[]] = await _DB.execute(query);
      // Return the rows
      return rows;
    }
  },

  async upsertOne(tableName: string, data: ObjectType): Promise<number> {
    const columns = '`' + Object.keys(data).join('`,`') + '`';
    const placeholders = Object.keys(data)
      .map((col) => {
        return ':' + col;
      })
      .join(',');
    // Create a query to insert into the table
    const query = `REPLACE INTO ${tableName} (${columns}) VALUES ( ${placeholders})`;
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(query, data);

    // Return the number of affected rows
    return result.affectedRows;
  },

  // Method to insert multiple rows into the database
  async upsertMany(tableName: string, data: ObjectType[]): Promise<number> {
    const columns = '`' + Object.keys(data[0]).join('`,`') + '`';
    const values: any[] = [];
    // Loop through the data array
    for (let i = 0; i < data.length; i++) {
      const row: any[] = [];
      Object.keys(data[0]).forEach((col) => {
        row.push(data[i][col]);
      });
      values.push(row);
    }
    // Create a query to insert multiple rows into the table
    const query = `REPLACE INTO ${tableName} (${columns}) VALUES ?;`;
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.query(query, [
      values,
    ]);
    // Return the number of affected rows
    return result.affectedRows;
  },

  async insertIgnoreOne(tableName: string, data: ObjectType): Promise<number> {
    const columns = '`' + Object.keys(data).join('`,`') + '`';
    const placeholders = Object.keys(data)
      .map((col) => {
        return ':' + col;
      })
      .join(',');
    // Create a query to insert into the table
    const query = `INSERT IGNORE INTO ${tableName} (${columns}) VALUES ( ${placeholders})`;
    const [result]: [DBResult, FieldPacket[]] = await _DB.execute(query, data);

    // Return the number of affected rows
    return result.affectedRows;
  },

  // Method to insert multiple rows into the database
  async insertIgnoreMany(
    tableName: string,
    data: ObjectType[],
  ): Promise<number> {
    const columns = '`' + Object.keys(data[0]).join('`,`') + '`';
    const values: any[] = [];
    // Loop through the data array
    for (let i = 0; i < data.length; i++) {
      const row: any[] = [];
      Object.keys(data[0]).forEach((col) => {
        row.push(data[i][col]);
      });
      values.push(row);
    }
    // Create a query to insert multiple rows into the table
    const query = `INSERT IGNORE INTO ${tableName} (${columns}) VALUES ?;`;
    // Execute the query and store the results in an array
    const [result]: [DBResult, FieldPacket[]] = await _DB.query(query, [
      values,
    ]);
    // Return the number of affected rows
    return result.affectedRows;
  },

  async executeDirect(query: string): Promise<void> {
    await _DB.execute(query);
  },
};
