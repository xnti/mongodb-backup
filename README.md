### MongoDB Backup App
This project is a simple MongoDB Backup application that backups all collection in all databases from provided MongoDB Connection URI and saves them into `backup\` folder in `.json` file seperately.

## Dependencies
- nodejs (if you want to run it with node)

## Libraries that used
- vercel\pkg
- mongodb

# How to use compiled release ?
- Download [release version](https://github.com/xnti/mongodb-backup/releases/tag/Release).
- Unzip it to a folder.
- Usage: `backup.exe <mongodb_connection_uri>`
- Downloaded collection will be same directory with the backup.exe

### How to compile it to work with other platforms ?
- `pkg -t node18-win-x64 backup.js` - for windows x64
- `pkg -t node18-linux-x64 backup.js` - for linux x64
- `pkg -t node18-macos-x64 backup.js` - for macos x64
- or just use `node backup.js` without compiling the app with pkg
