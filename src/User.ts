class User {
    constructor(readonly user: GoogleAppsScript.Drive.User) { }

    get domain(): string {
        return this.user.getDomain();
    }

    get email(): string {
        return this.user.getEmail();
    }

    get name(): string {
        return this.user.getName() || '';
    }

    get photo(): string {
        return this.user.getPhotoUrl() || '';
    }

    toString() {
        return this.name;
    }
}
