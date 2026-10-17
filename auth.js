// Katalyst Secure Authentication
// Sifreler GitHub uzerinde asla acik metin olarak tutulmaz.
// Tum parolalar tek yonlu kriptografik SHA-256 Hash ile saklanir.
const ACCOUNT_HASHES = {
    "admin": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
    "Kohryu": "49048fc3bb279728276e3942c9d655ac214023d2aa9dd6a6568bc6c93d688f8f",
    "Hasanizm": "3935321093ed182b3957252126549cf27a64404ced60abb6145e4e7e0059813e",
    "adamxiv": "1adb67b7b5aaa30c39757fa1f017217655b7ed017b8244b511c604c7d02261ba",
    "Katalyst1": "cd1050a8fa51fd33ddc8aac4e1c3454d672385c7de72482942295e405a686046",
    "Katalyst2": "144a279a3df55e25d3e7e8a2661cd9fb1213536e50ce0b88f32e11718750eb02",
    "Katalyst3": "865019d9f2d6d00e136656f57530508f9dc267ef1755653d653e10d9b7c54aa3",
    "Katalyst4": "5492d6ce04cb5f3a04c1864d238767788bd0229f8bed7d88bacb1655200b4d69",
    "Katalyst5": "d504738f7727afd8573e52418a0babc297350622a79ba82f33d959d7b5f1ec15",
    "Katalyst6": "aca72eb025ddb4012578065b943f368ee0f58899ef3c8ee18ea30e93ca4442a9",
    "Katalyst7": "f8bcc5018440b2e6f40c6b080910f7b94cfaf0d4fb16a82d63484489d5888e72",
    "Katalyst8": "73bfc034d8f1308ad659f6baf0566f72a4b8ed63d64870c16482bc2ef6d665d7",
    "Katalyst9": "89148b15afa8352492d86fce540bb89ac986a00f168fc43246ba0c8c8b4203d2",
    "Katalyst10": "d9780dd8bfeedb0ec8c701f69657a045ea4278bb4edb536c0c88eaf0f59950a4",
    "Katalyst11": "78f18fca145ec2b9f8c34f554c6546f1227bd2298cd6c2d6c2621d3c8b1dc5f8",
    "Katalyst12": "e748ecf89b6d851be391ee291adf239276e3602f108c2a5a4783ee8a36a278c9",
    "Katalyst13": "4a56455dac7545802d41e4de6e172a15cf85479e8f0678d6d31e8bbf46e15342",
    "Katalyst14": "43b9231919848b668531aa92cf9dafad6dbbe0b12ae97dde9b13068c289d9033",
    "Katalyst15": "d416e3e13f83efa3c5314240f18f562dd65a06e4afcbcc7dd16b8f1f5a8affcf",
    "Katalyst16": "e917435334f10ec71c9d3e73280f85c7d33ef8e0fce9cb577da697a5d3f086e2",
    "Katalyst17": "0f25d38f4e0331133a148890b68de954fddaab9aacf4139319db0b2e7b9b5f98",
    "Katalyst18": "df25ae997371c0627f8b7f786ad2995202331aed95e6c50555bc6f047e029aa4",
    "Katalyst19": "e7bf0e8ec8d643445e5cb8a61bdb28696e2172a18c3b687eb50b55980e1a7d58",
    "Katalyst20": "77441ad59930af8248ec07ebfc69f320b1cf77d0ab3ca874c2a6490198d7fb09"
};

const Auth = {
    // Tarayicinin yerel crypto kutuphanesiyle girilen sifrenin SHA-256 ozetini cikarir
    async sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    getCurrentUser() {
        return localStorage.getItem('katalyst_session_user');
    },

    isLoggedIn() {
        return !!this.getCurrentUser();
    },

    async login(username, password) {
        if (!username || !password) {
            return { success: false, message: "Please fill all fields." };
        }

        const trimmedUser = username.trim();
        const expectedHash = ACCOUNT_HASHES[trimmedUser];

        if (!expectedHash) {
            return { success: false, message: "Invalid username or password." };
        }

        const inputHash = await this.sha256(password);

        if (inputHash === expectedHash) {
            localStorage.setItem('katalyst_session_user', trimmedUser);
            return { success: true, user: trimmedUser };
        }

        return { success: false, message: "Invalid username or password." };
    },

    logout() {
        localStorage.removeItem('katalyst_session_user');
    }
};
