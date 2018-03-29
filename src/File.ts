class File extends DriveObject {
    constructor(readonly file: GoogleAppsScript.Drive.File) {
        super(file);
    }

    get downloadUrl(): string {
        return this.file.getDownloadUrl();
    }

    get blob(): GoogleAppsScript.Base.Blob {
        return this.file.getBlob();
    }

    get mimeType(): MimeType {
        return this.file.getMimeType();
    }

    get thumbnail(): GoogleAppsScript.Base.Blob {
        return this.file.getThumbnail();
    }

    as(contentType: MimeType): GoogleAppsScript.Base.Blob {
        return this.file.getAs(contentType);
    }

    get commenters(): User[] {
        return this.viewers.filter(function (this: File, user: User) {
            return this.getAccessOf(user) === GoogleAppsScript.Drive.Permission.COMMENT;
        }.bind(this));
    }

    addCommenter(user: User | string): this {
        (typeof user === 'string') ? this.file.addCommenter(user) : this.file.addCommenter(user.user);
        return this;
    }

    addCommenters(users: (User | string)[]): this {
        users.forEach(this.addCommenter, this);
        return this;
    }

    removeCommenter(user: User | string): this {
        (typeof user === 'string') ? this.file.removeCommenter(user) : this.file.removeCommenter(user.user);
        return this;
    }

    removeCommenters(users: (User | string)[]): this {
        users.forEach(this.removeCommenter, this);
        return this;
    }

    copy(): File;
    copy(name: string): File;
    copy(destination: Folder): File;
    copy(name: string, destination: Folder): File;
    copy(nameOrDestination?: string | Folder, destination?: Folder): File {
        return new File(this.file.makeCopy.apply(this.file, arguments));
    }
}
