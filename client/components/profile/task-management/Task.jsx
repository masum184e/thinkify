import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Task = ({ text, taskId, handleDelete }) => {
    const [, drag] = useDrag({
        type: 'TASK_ITEM',
        item: { taskId },
    });

    return (
        <div ref={drag}>
            <ListItem sx={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: "5px", cursor:"pointer" }}>
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
    handleDelete: PropTypes.func.isRequired,
};

export default Task;