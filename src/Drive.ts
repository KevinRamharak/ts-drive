class Drive {
    constructor(readonly drive: GoogleAppsScript.Drive.DriveApp = DriveApp) {
    }

    addFile(file: File): this {
        this.drive.addFile(file.file);
        return this;
    }

    addFiles(files: File[]): this {
        files.forEach(this.addFile, this);
        return this;
    }

    addFolder(folder: Folder): this {
        this.drive.addFolder(folder.folder);
        return this;
    }

    addFolders(folders: Folder[]): this {
        folders.forEach(this.addFolder, this);
        return this;
    }

    addItems(items: (File | Folder)[]): this {
        items.forEach(function (this: Drive, item: File | Folder) {
            if (item instanceof File) {
                this.addFile(item);
            } else {
                this.addFolder(item);
            }
        }.bind(this));
        return this;
    }

    add(file: File): this;
    add(folder: Folder): this;
    add(files: File[]): this;
    add(folders: Folder[]): this;
    add(items: (File | Folder)[]): this;
    add(itemOrItems: File | Folder | (File | Folder)[]): this {
        if (Array.isArray(itemOrItems)) {
            this.addItems(itemOrItems);
        } else {
            if (itemOrItems instanceof File) {
                this.addFile(itemOrItems);
            } else {
                this.addFolder(itemOrItems);
            }
        }
        return this;
    }

    createFile(blob : GoogleAppsScript.Base.BlobSource) : File;
    createFile(name : string, content : string) : File;
    createFile(name : string, content : string, mimeType : MimeType) : File;
    createFile(nameOrBlob : GoogleAppsScript.Base.BlobSource | string, content? : string, mimeType? : MimeType) : File {
        return new File(this.drive.createFile.apply(this.drive, arguments));
    }

    createFolder(name : string) : Folder {
        return new Folder(this.drive.createFolder(name));
    }

    get files() : File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.drive.getFiles(),
            function(this : File[], file : GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    fileById(id : string) : File {
        return new File(this.drive.getFileById(id));
    }

    filesByName(name : string) : File[]{
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.drive.getFilesByName(name),
            function(this : File[], file : GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    filesByType(mimeType : MimeType) : File[]{
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            //@ts-ignore - enum is not typed as string
            this.drive.getFilesByType(mimeType),
            function(this : File[], file : GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    get folders() : Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.drive.getFolders(),
            function(this : Folder[], folder : GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    folderById(id : string) : Folder {
        return new Folder(this.drive.getFolderById(id));
    }

    foldersByName(name : string) : Folder[] {
        return iterate(
            this.drive.getFoldersByName(name),
            function(this : Folder[], folder : GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    get root() : Folder {
        return new Folder(this.drive.getRootFolder());
    }

    get storageLimit() : number {
        return this.drive.getStorageLimit();
    }

    get storageUsed() : number {
        return this.drive.getStorageUsed();
    }

    get trash() : (File|Folder)[] {
        return (<(File|Folder)[]>this.trashedFolders).concat(this.trashedFiles);
    }

    get trashedFolders() : Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.drive.getTrashedFolders(),
            function(this : Folder[], folder : GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    get trashedFiles() : File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.drive.getTrashedFiles(),
            function(this : File[], file : GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    removeFile(file : File) : this {
        this.drive.removeFile(file.file);
        return this;
    }

    removeFiles(files : File[]) : this {
        files.forEach(this.removeFile, this);
        return this;
    }

    removeFolder(folder : Folder) : this {
        this.drive.removeFolder(folder.folder);
        return this;
    }

    removeFolders(folders : Folder[]) : this {
        folders.forEach(this.removeFolder, this);
        return this;
    }

    removeItems(items : (File|Folder)[]) : this {
        items.forEach(function(item : File|Folder) {

        }, this);
        return this;
    }

    remove(file: File): this;
    remove(folder: Folder): this;
    remove(files: File[]): this;
    remove(folders: Folder[]): this;
    remove(items: (File | Folder)[]): this;
    remove(itemOrItems: File | Folder | (File | Folder)[]): this {
        if (Array.isArray(itemOrItems)) {
            this.removeItems(itemOrItems);
        } else {
            if (itemOrItems instanceof File) {
                this.removeFile(itemOrItems);
            } else {
                this.removeFolder(itemOrItems);
            }
        }
        return this;
    }

    searchFiles(pattern : string) : File[] {
        return iterate<GoogleAppsScript.Drive.File, File[]>(
            this.drive.searchFiles(pattern),
            function(this : File[], file : GoogleAppsScript.Drive.File) {
                this.push(new File(file));
            },
            []
        );
    }

    searchFolders(pattern : string) : Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.drive.searchFolders(pattern),
            function(this : Folder[], folder : GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder));
            },
            []
        );
    }

    search(pattern : string) : (File|Folder)[] {
        return (<(File|Folder)[]>this.searchFolders(pattern)).concat(this.searchFiles(pattern));
    }
}
