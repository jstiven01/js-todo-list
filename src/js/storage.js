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

    return {
        create, update
    }

}
)();

export default storage