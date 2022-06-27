import { useState } from "react";

import style from './task.module.css';

import Tags from "../../components/tags/tags";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

const Task = (props) => {
    const [editingState, setEditingState] = useState(true);

    const { data, saveFunc, delTag, delTask, filTag } = props;
    const { tags, title, Id, completed } = data;
    const [checkState, setCheckState] = useState(completed);

    const { check, edit, panel } = style;


    const saveEditing = (key) => {
        let contentVal;
        switch (key) {
            case 'title':
                contentVal = document.getElementById(`${key}_${Id}`).value;
                setEditingState(true);
                break;
            case 'completed':
                contentVal = document.getElementById(`${key}_${Id}`).checked;
                setCheckState(() => contentVal);
                break;
        }
        saveFunc(Id, key, contentVal);
    }

    const deleteTag = (tagId) => {
        delTag(Id, tagId);
    }

    const deleteTask = (taskId) => {
        delTask(taskId);
    }

    const filterTag = (tagId) => {
        filTag(tagId);
    }

    return (<div className={panel}>
        <label htmlFor={`completed_${Id}`}>Completed</label>
        <Input className={check} type='checkbox' isChecked={checkState} id={`completed_${Id}`} value='Completed' onChange={() => { saveEditing('completed') }} />
        <Input value={title} name="title" id={`title_${Id}`} disabled={editingState} />
        <Button className={edit} visible={!editingState} name="Edit" onClick={() => setEditingState(false)} />
        <Button className={edit} visible={!editingState} name="Del" onClick={() => deleteTask(Id)} />
        <Button className={edit} visible={editingState} name="Save" onClick={() => saveEditing('title')} />
        <Tags filtering={true} filterFunc={filterTag} disabled={editingState} data={tags} onDel={deleteTag} />
    </div>)
}

export default Task;