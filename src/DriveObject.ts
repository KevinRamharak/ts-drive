abstract class DriveObject {
    constructor(private readonly driveObject : GoogleAppsScript.Drive.Folder | GoogleAppsScript.Drive.File) {

    }

    get id(): string {
        return this.driveObject.getId();
    }

    get starred(): boolean {
        return this.driveObject.isStarred();
    }

    set starred(val: boolean) {
        this.driveObject.setStarred(val);
    }

    get trashed(): boolean {
        return this.driveObject.isTrashed();
    }

    set trashed(val: boolean) {
        this.driveObject.setTrashed(val);
    }

    get name() : string {
        return this.driveObject.getName();
    }

    set name(val) {
        this.driveObject.setName(val);
    }

    get description() : string {
        return this.driveObject.getDescription();
    }

    set description(val) {
        this.driveObject.setDescription(val);
    }

    //@ts-ignore - 'get' and 'set' have to be of the same type
    get owner() : User {
        return new User(this.driveObject.getOwner());
    }

    //@ts-ignore - 'get' and 'set' have to be of the same type => have to use '@ts-ignore' when setting with string
    set owner(val : string|User) {
        (typeof val === 'string') ? this.driveObject.setOwner(val) : this.driveObject.setOwner(val.user);
    }

    get parents() : Folder[] {
        return iterate<GoogleAppsScript.Drive.Folder, Folder[]>(
            this.driveObject.getParents(),
            function (this : Folder[], folder : GoogleAppsScript.Drive.Folder) {
                this.push(new Folder(folder))
            },
            []
        );
    }

    get editors() : User[] {
        return this.driveObject.getEditors().map(function(user : GoogleAppsScript.Drive.User) {
            return new User(user);
        });
    }

    addEditor(editor : User|string) {
        (typeof editor === 'string') ? this.driveObject.addEditor(editor) : this.driveObject.addEditor(editor.user);
    }

    addEditors(editors : (User|string)[]) {
        editors.forEach(this.addEditor, this);
    }

    removeEditor(editor : User|string) {
        (typeof editor === 'string') ? this.driveObject.removeEditor(editor) : this.driveObject.removeEditor(editor.user);
    }

    removeEditors(editors : (User|string)[]) {
        editors.forEach(this.removeEditor, this);
    }

    get viewers() : User[] {
        return this.driveObject.getViewers().map(function(user : GoogleAppsScript.Drive.User) {
            return new User(user);
        });
    }

    addViewer(viewer : User|string) {
        (typeof viewer === 'string') ? this.driveObject.addViewer(viewer) : this.driveObject.addViewer(viewer.user);
    }

    addViewers(viewers : (User|string)[]) {
        viewers.forEach(this.addViewer, this);
    }

    removeViewer(viewer : User|string) {
        (typeof viewer === 'string') ? this.driveObject.removeViewer(viewer) : this.driveObject.removeViewer(viewer.user);
    }

    removeViewers(viewers : (User|string)[]) {
        viewers.forEach(this.removeViewer, this);
    }

    get created() : Date {
        return this.driveObject.getDateCreated();
    }

    get updated() : Date {
        return this.driveObject.getLastUpdated();
    }

    get url() : string {
        return this.driveObject.getUrl();
    }

    get size() : number {
        return this.driveObject.getSize();
    }

    get sharingPermission() : GoogleAppsScript.Drive.Permission {
        return this.driveObject.getSharingPermission();
    }

    get sharingAccess() : GoogleAppsScript.Drive.Access {
        return this.driveObject.getSharingAccess();
    }

    get isShareableByEditors() : boolean {
        return this.driveObject.isShareableByEditors();
    }

    set isShareableByEditors(val) {
        this.driveObject.setShareableByEditors(val);
    }

    getAccessOf(user : User|string) : GoogleAppsScript.Drive.Permission {
        return (typeof user === 'string') ? this.driveObject.getAccess(user) : this.driveObject.getAccess(user.user);
    }

    setSharing(access : GoogleAppsScript.Drive.Access, permission : GoogleAppsScript.Drive.Permission) {
        this.driveObject.setSharing(access, permission);
    }

    revokePermissions(user : User|string) {
        (typeof user === 'string') ? this.driveObject.revokePermissions(user) : this.driveObject.revokePermissions(user.user);
    }
}
