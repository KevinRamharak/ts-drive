class File extends DriveObject {
    constructor(readonly file: GoogleAppsScript.Drive.File) {
        super(file);
    }
}
