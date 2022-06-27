import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from "../../components/button/button";
import Task from "../../components/task/task";

import style from './home.module.css';

import useStorage from "../../hooks/use-storage";


const Home = () => {
    const { home } = style;

    const history = useHistory();
    const storage = useStorage();

    const [storageTaskListState, setStorageTaskListState] = useState([]);
    const [fullTaskListControlState, setFullTaskListControlState] = useState(false);

    useEffect(() => {
        const storageTaskList = storage('get', 'tasks') ?? [];
        setStorageTaskListState(() => storageTaskList);
    }, [fullTaskListControlState])

    const storageManipulation = (func, save) => {
        const prevArr = JSON.stringify(storageTaskListState);
        const newArr = JSON.parse(prevArr);
        let completedArr = []
        completedArr = func(newArr);
        setStorageTaskListState(() => completedArr);
        save && storage('add', 'tasks', [...completedArr]);
    }

    const saveEditing = (Id, key, value) => {
        return storageManipulation((newArr) => {
            newArr.map((item) => {
                if (item.Id === Id) {
                    return item[key] = value;
                }
            });
            return newArr;
        }, true);
    };

    const delTag = (taskId, tagId) => {
        return storageManipulation((newArr) => {
            newArr.map((item) => {
                if (item.Id === taskId) {
                    item.tags = item.tags.filter((tag) => tag.Id !== tagId);
                }
            });
            return newArr;
        }, true)
    }

    const delTask = (taskId) => {
        return storageManipulation((newArr) => {
            return newArr.filter((task) => task.Id !== taskId);
        }, true);
    }


    const filTag = (tagId) => {
        return storageManipulation((newArr) => {
            return newArr.filter((task) => {
                const tagList = task.tags;
                const filteredTag = tagList.filter(tag => tag.Id === tagId);
                if (filteredTag.length > 0) {
                    return task;
                }
            })
        }, false);

    }

    const getFullList = () => {
        setFullTaskListControlState((prev) => !prev);
    }

    const gotoNewTask = () => {
        history.push("/new");
    }

    return (<>
        <div className={home}>
            {storageTaskListState.map((task) => {
                return <Task key={task.Id} data={task} saveFunc={saveEditing} delTag={delTag} delTask={delTask} filTag={filTag} />
            })}
            <Button name="New task" onClick={gotoNewTask} />
            <Button name="Full task list" onClick={getFullList} />
        </div>
    </>)
}

export default Home;