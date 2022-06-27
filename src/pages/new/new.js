import { useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router-dom';

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Tags from "../../components/tags/tags";
import List from "../../components/list/list";

import useStorage from "../../hooks/use-storage";

import style from './new.module.css';

const New = () => {
    const { body } = style;

    const storage = useStorage();
    const history = useHistory();

    const [tagListState, setTagListState] = useState([]);
    const [tagTitleState, setTagTitleState] = useState('');
    const [searchingState, setSeachingState] = useState([]);
    const [searchTagListVisibilityState, setSearchTagListVisibilityState] = useState(false);
    const [storageTaskListState, setStorageTaskListState] = useState([]);
    const [storageTagListState, setStorageTagListState] = useState([]);

    useEffect(() => {
        if (searchingState.length > 0 && tagTitleState) {
            setSearchTagListVisibilityState(() => true);
        } else {
            setSearchTagListVisibilityState(() => false);
        }

    }, [searchingState]);

    useEffect(() => {
        const storageTaskList = storage('get', 'tasks') ?? [];
        setStorageTaskListState(() => storageTaskList);
    }, [])

    useEffect(() => {
        const storageTagList = storage('get', 'tags') ?? [];
        setStorageTagListState(() => storageTagList);
    }, [])

    const searching = (event) => {
        const text = event.target.value;
        const filtered = storageTagListState.filter((tag) => {
            return tag['Title'].toLowerCase().indexOf(text.toLowerCase()) >= 0
        });
        setSeachingState(() => filtered);
        setTagTitleState(() => text)
    }

    const addTag = () => {
        const Id = new Date().getTime();
        if (tagTitleState) {
            document.getElementById('tagtitle').value = "";
            setTagListState((prev) => [...prev, { 'Id': Id, 'Title': tagTitleState }]);
        }
    }

    const delTag = (Id) => {
        setTagListState((prev) => prev.filter((tag) => tag.Id !== Id));
    }

    const addTask = () => {
        const Id = new Date().getTime();
        const taskTitle = document.getElementById('tasktitle').value;
        const value = { 'Id': Id, 'title': taskTitle, 'tags': tagListState, 'completed': false };
        const newTaskList = [...storageTaskListState, value];
        storage('add', 'tasks', newTaskList);
    }

    const unifyTags = () => {
        const concatTags = [...storageTagListState, ...tagListState].map((tag) => JSON.stringify(tag));
        const setting = new Set(concatTags);
        const unifying = [...setting].map((tag) => JSON.parse(tag));
        storage('add', 'tags', unifying);
    }

    const completeTask = () => {
        addTask();
        unifyTags();
        history.push("/");
    }

    const tagSelect = (Id, Title) => {
        setTagListState((prev) => [...prev, { 'Id': Id, 'Title': Title }]);
        setSeachingState(() => []);
        document.getElementById('tagtitle').value = "";
    }

    return (<>
        <div className={body}>
            <div>
                <label>New task</label>
            </div>
            <div>
                <Input placeholder="Task title" name="tasktitle" id="tasktitle" />
            </div>
            <div>
                <Input placeholder="Tag title" name="tagtitle" id="tagtitle" onChange={searching} />
                <Button name="Add tag" onClick={addTag} />
                <List visible={searchTagListVisibilityState} data={searchingState} onClick={tagSelect} />
                <Tags data={tagListState} onDel={delTag} />
                <Button name="Save task" onClick={completeTask} />
            </div>

        </div>
    </>)
}

export default New;