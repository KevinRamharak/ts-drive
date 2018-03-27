class Folder extends DriveObject {
    constructor(readonly folder: GoogleAppsScript.Drive.Folder) {
        super(folder);
    }

    get files(): File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.folder.getFiles(),
            function (this: File[], file: GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }
}
