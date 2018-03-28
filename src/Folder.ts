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

    addFile(file: File): this {
        this.folder.addFile(file.file);
        return this;
    }

    addFiles(files: File[]): this {
        files.forEach(this.addFile, this);
        return this;
    }

    addFolder(folder: Folder): this {
        this.folder.addFolder(folder.folder);
        return this;
    }

    addFolders(folders: Folder[]): this {
        folders.forEach(this.addFolder, this);
        return this;
    }

    createFile(blob: GoogleAppsScript.Base.BlobSource): File;
    createFile(name: string, content: string): File;
    createFile(name: string, content: string, mimeType: GoogleAppsScript.Base.MimeType): File;
    createFile(nameOrBlob: GoogleAppsScript.Base.BlobSource | string, content?: string, mimeType?: GoogleAppsScript.Base.MimeType): File {
        // @TODO: these runetime checks are extra overhead, just passing the arguments would probably work as expected
        if (!content) {
            return new File(this.folder.createFile(<GoogleAppsScript.Base.BlobSource>nameOrBlob))
        } else {
            if (!mimeType) {
                return new File(this.folder.createFile(<string>nameOrBlob, content));
            } else {
                return new File(this.folder.createFile(<string>nameOrBlob, content,
                    //@ts-ignore - the enum is not declared as a string
                    <string>mimeType
                ));
            }
        }
    }

    createFolder(name: string): Folder {
        return new Folder(this.folder.createFolder(name));
    }
}
