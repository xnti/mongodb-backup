const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.argv[2]; // Get MongoDB URI from command line argument

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



const backupDatabases = async () => {
    if (!uri) {
        console.log("Please provide a MongoDB connection URI.");
        console.log(`Example: ${process.title.replace(process.cwd() + "\\", "")} mongodb://127.0.0.1:27017`);
        await delay(5000)
        process.exit(1);
    }
    console.log("Connecting to: ", uri)

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const databasesList = await client.db().admin().listDatabases();

        const backupDir = path.join(path.dirname(process.execPath), 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        for (const dbInfo of databasesList.databases) {
            const dbName = dbInfo.name;
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();

            for (const collInfo of collections) {
                const collection = db.collection(collInfo.name);
                const documents = await collection.find({}).toArray();
                const json = JSON.stringify(documents, null, 2);
                const filename = `${dbName}-${collInfo.name}.json`;
                fs.writeFileSync(path.join(path.dirname(process.execPath), 'backups', filename), json);
            }
        }

        console.log("Backup completed successfully.");
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        await client.close();
    }
};

backupDatabases();
