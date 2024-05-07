import { Grid, Box, List, Typography } from '@mui/material';
import TaskStatus from '../../components/profile/task-management/TaskStatus';
import Task from '../../components/profile/task-management/Task';

const TaskManager = () => {
    const handleDropTodo = () => {
        console.log("Handle Drop Clicked")
    }
    const handleDropOngoing = () => {
        console.log("Handle Drop On Going Clicked")
    }
    const handleDropCompleted = () => {
        console.log("Handle Drop Completed Clicked")
    }
    const todo = [
        {
            _id: "1",
            title: "Hello"
        }
    ]
    const ongoing = [
        {
            _id: "1",
            title: "Hello"
        }
    ]
    const completed = [
        {
            _id: "1",
            title: "Hello"
        }
    ]
    return (
        <>
            {/* <Typography variant="h2" textAlign="center" sx={{ mb: "16px", fontWeight: "bold" }}>Coordination of Work</Typography> */}
            <Grid container spacing={3}>
                <Grid item xs>
                    <Box bgcolor="primary.main" color="primary.contrastText" p={2} sx={{ borderRadius: '5px', }}>
                        <TaskStatus status="todo" onDrop={handleDropTodo} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box bgcolor="secondary.main" color="secondary.contrastText" p={2} sx={{ borderRadius: '5px', }}>
                        <TaskStatus status="ongoing" onDrop={handleDropOngoing} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box bgcolor="warning.main" color="warning.contrastText" p={2} sx={{ borderRadius: '5px', }}>
                        <TaskStatus status="completed" onDrop={handleDropCompleted} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ minHeight: "70vh" }} spacing={3}>
                <Grid item xs>
                    <List>
                        {
                            todo.map((item) => (
                                <Task key={item._id} text={item.title} taskId={item._id} />
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                        {
                            ongoing.map((item) => (
                                <Task key={item._id} text={item.title} taskId={item._id} />
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                        {
                            completed.map((item) => (
                                <Task key={item._id} text={item.title} taskId={item._id} />
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
        </>
    )
}

export default TaskManager