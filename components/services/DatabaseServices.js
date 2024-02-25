import * as SQLite from 'expo-sqlite';

/**
 * Opens the database
 */
export const openDatabase = () => {
    return SQLite.openDatabase('4sur4.db', "1.0");
};

/**
 * Initializes the database
 */
export const initDatabase = async () => {
    const database = openDatabase();
    return executeQuery(database, "CREATE TABLE IF NOT EXISTS `CachedImage` ( \
        `uri` TEXT, \
        `base64` TEXT, \
        `created_at` INTEGER);");
};

export const executeQuery = async (database, query, params = []) => {
    return new Promise(resolve => {
        database.transaction((tx) => {
            console.log(`[executeQuery] ${query}`);
            tx.executeSql(query, params,
                (_, results) => {
                    console.log(`[executeQuery] Resolving ${query}`);
                    resolve(results);
                },
                (_, error) => {
                    console.log(`[executeQuery] Error! ${error}`);
                    resolve(null);
                }
            );
        });
    });
};