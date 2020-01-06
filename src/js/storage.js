const storage = (() => {

    const create = (key, data) => {
        if (Object.keys(localStorage).includes(key)) {
            return false;
        } else {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }
    }

    const update = (key, data) => {
        if (Object.keys(localStorage).includes(key)) {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } else {
            return false;
        }

    }

    const read = (key) => {
        if (Object.keys(localStorage).includes(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return false;
        }
    }

    const remove = (key) => {
        if (Object.keys(localStorage).includes(key)) {
            localStorage.removeItem(key);
            return true;
        } else {
            return false;
        }
    }

    return {
        create, update, read, remove
    }

}
)();

export default storage