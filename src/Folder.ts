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

    filesByName(name: string): File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.folder.getFilesByName(name),
            function (this: File[], file: GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    fileByType(type: MimeType): File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.folder.getFilesByType(type),
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

    createFile(blob: GoogleAppsScript.Base.BlobSource): File;
    createFile(name: string, content: string): File;
    createFile(name: string, content: string, mimeType: MimeType): File;
    createFile(nameOrBlob: GoogleAppsScript.Base.BlobSource | string, content?: string, mimeType?: MimeType): File {
        return new File(this.folder.createFile.apply(this.folder, arguments));
    }

    removeFile(file: File): this {
        this.folder.removeFile(file.file);
        return this;
    }

    get folders(): Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.folder.getFolders(),
            function (this: Folder[], folder: GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    foldersByName(name: string): Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.folder.getFoldersByName(name),
            function (this: Folder[], folder: GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    addFolder(folder: Folder): this {
        this.folder.addFolder(folder.folder);
        return this;
    }

    addFolders(folders: Folder[]): this {
        folders.forEach(this.addFolder, this);
        return this;
    }

    createFolder(name: string): Folder {
        return new Folder(this.folder.createFolder(name));
    }

    removeFolder(folder: Folder): this {
        this.folder.removeFolder(folder.folder);
        return this;
    }

    //@TODO: some kind of pattern builder|factory class
    searchFiles(pattern: string): File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.folder.searchFiles(pattern),
            function (this: File[], file: GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    searchFolders(pattern: string): Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.folder.searchFolders(pattern),
            function (this: Folder[], folder: GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    search(pattern: string): (File | Folder)[] {
        const folders = this.searchFolders(pattern);
        const files = this.searchFiles(pattern);
        return (<(Folder | File)[]>folders).concat(files);
    }

    add(file: File): this;
    add(folder: Folder): this;
    add(files: File[]): this;
    add(folders: Folder[]): this;
    add(items: (File | Folder)[]): this;
    add(itemOrItems: File | Folder | (File | Folder)[]) {
        if (Array.isArray(itemOrItems)) {
            itemOrItems.forEach(function (this: Folder, item: File | Folder) {
                if (item instanceof File) {
                    this.addFile(item);
                } else {
                    this.addFolder(item);
                }
            }.bind(this));
        } else {
            if (itemOrItems instanceof File) {
                this.addFile(itemOrItems);
            } else {
                this.addFolder(itemOrItems);
            }
        }
        return this;
    }
}
