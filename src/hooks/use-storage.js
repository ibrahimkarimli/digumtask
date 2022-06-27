import { useCallback } from "react";

const useStorage = () => {
    const storage = window.localStorage;

    return useCallback((action, key, value) => {
        switch (action) {
            case "add":
                try {
                    storage.setItem(key, JSON.stringify(value));
                } catch (err) {
                    throw Error(err);
                }
            case "get":
                try {
                    return JSON.parse(storage.getItem(key));
                } catch (err) {
                    throw Error(err);
                }

        }
    }, []);

}

export default useStorage;