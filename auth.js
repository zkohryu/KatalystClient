// Katalyst User Database (Hardcoded Accounts)
// Yeni hesap eklemek istediğinde bu listeye ekleyebilirsin:
const ACCOUNTS = {
    "admin": "admin123",
    "Kohryu": "malessek123",
    "Hasanizm": "sus123456ibne",
    "Katalyst1": "Xv#7mQpL9r",
    "Katalyst2": "Tz@4nKwR8j",
    "Katalyst3": "Bq!2sYhF5m",
    "Katalyst4": "Wc$6dNvA3k",
    "Katalyst5": "Rp%9eJuG7x",
    "Katalyst6": "Gm&1fLzC4y",
    "Katalyst7": "Hn*3gMbD6t",
    "Katalyst8": "Jk^5hPsE2w",
    "Katalyst9": "Lf=8iQtB0v",
    "Katalyst10": "Yd+7jRuC1s",
    "Katalyst11": "Sc#4kSwF9n",
    "Katalyst12": "Vb@2lTxG6p",
    "Katalyst13": "Ue!9mUyH3q",
    "Katalyst14": "Pa$6nVzI8r",
    "Katalyst15": "Nw%1oWaJ5t",
    "Katalyst16": "Mx&7pXbK2u",
    "Katalyst17": "Kz*4qYcL0v",
    "Katalyst18": "Ir^3rZdM7w",
    "Katalyst19": "Hq=5sAeN4x",
    "Katalyst20": "Gp+8tBfO1y"
};

const Auth = {
    getCurrentUser() {
        return localStorage.getItem('katalyst_session_user');
    },

    isLoggedIn() {
        return !!this.getCurrentUser();
    },

    login(username, password) {
        if (!username || !password) {
            return { success: false, message: "Please fill all fields." };
        }

        const trimmedUser = username.trim();
        const expectedPass = ACCOUNTS[trimmedUser];

        if (expectedPass && expectedPass === password) {
            localStorage.setItem('katalyst_session_user', trimmedUser);
            return { success: true, user: trimmedUser };
        }

        return { success: false, message: "Invalid username or password." };
    },

    logout() {
        localStorage.removeItem('katalyst_session_user');
    }
};
