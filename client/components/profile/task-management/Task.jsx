import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Task = ({ text, taskId }) => {
    const [, drag] = useDrag({
        type: 'TASK_ITEM',
        item: { taskId },
    });
    const handleDelete = (taskId) => {
        console.log(`${taskId} Clicked`)
    }

    return (
        <div ref={drag}>
            <ListItem sx={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: "5px" }}>
                <ListItemText primary={text} />
                <IconButton color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(taskId)}  >
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </div>
    );
};

Task.propTypes = {
    text: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
};

export default Task;