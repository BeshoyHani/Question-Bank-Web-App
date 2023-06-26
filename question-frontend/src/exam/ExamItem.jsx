import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ReactCardFlip from 'react-card-flip';
import { getAssignedStudents } from './ExamAPI';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useState } from 'react';
import Roles from './../common/Roles';
import { Link } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(270deg)' : 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ExamItem({ exam, openStudentList, role }) {
    const [expanded, setExpanded] = useState(false);
    const [isFlipped, setisFlipped] = useState(false);
    const [students, setStudents] = useState([]);

    const handleExpandClick = async (e) => {
        e.preventDefault();
        setExpanded(!expanded);
        setisFlipped(!isFlipped);
        if (!isFlipped) {
            await fetchStudentOfExam();
        }
    };

    const fetchStudentOfExam = async () => {
        try {
            const _students = await getAssignedStudents(exam.id);
            setStudents(_students || []);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <React.Fragment>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.asbmb.org/getmedia/0eadf1db-e5ac-445a-8e39-95abaac3a4a4/480x270-certification-exam.jpg?width=480&height=270&ext=.jpg"
                        title={exam.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {exam.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Duration: {exam.duration} h <br />
                            Passing Score: {exam.passing_score} <br />
                            {
                                role === Roles.STUDENT &&
                                `Exam Data: ${exam.start_time}`
                            }
                        </Typography>
                    </CardContent>
                    {
                        role !== Roles.STUDENT ?
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>


                                <Button size="small" variant='contained' sx={{ textTransform: 'none' }} onClick={() => openStudentList(exam.id)}>Assign</Button>
                                <Button size="small">
                                    <IconButton aria-label="delete" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Button>

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            :
                            <CardActions sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                                <Button size="small" variant='contained'
                                    disabled={exam.is_started}
                                    sx={{ textTransform: 'none' }}>
                                    <Link to={`/exams/${exam.name}/try/${exam.id}`} className='link-text'>
                                        {exam.is_started ? 'Ended' : 'Start'}
                                    </Link>
                                </Button>

                            </CardActions>
                    }

                </React.Fragment>
                {
                    role !== Roles.STUDENT &&
                    <React.Fragment >
                        <CardContent sx={{ height: '240px', overflow: 'auto' }}>
                            <Typography paragraph>Students:</Typography>
                            {
                                students.map((student, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar >
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={student} />
                                        </ListItem>

                                    )
                                })
                            }
                        </CardContent>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </React.Fragment>
                }
            </ReactCardFlip>
        </Card>
    );
}
