const setData = async (key:any, value:any) => {
    try {
        await localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        return err;
    }
};

const getData = async (key:any )=> {
    try {
        const value = localStorage.getItem(key);

        return JSON.parse(value!);
    } catch (err) {
        return err;
    }
};

const removeData = async (key:any) => {
    try {
        await localStorage.removeItem(key);

    } catch (err) {
        return err;
    }
};

const AsyncStorageService = {
    setData,
    getData,
    removeData,
};

export default AsyncStorageService;