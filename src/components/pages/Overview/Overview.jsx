import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Overview.css';
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';
import { Card } from '../../common/Card/Card';

//REDUX
import { connect } from 'react-redux'
import getDoctorInfo from './doctorInfo.json'
//import { getDoctorInfo } from '../../../actions/getDoctorInfo'
import { fetchPosts } from '../../../actions/postActions';
import { getDoctorAppointments } from '../../../actions/getDoctorAppointments';

//DoctorInfoBlock
import Avatar from '@material-ui/core/Avatar';
import doctorLogo from '../../../assets/images/person1.jpg';

import Button from '@material-ui/core/Button';


class Overview extends Component {

    componentWillMount() {
        this.props.getDoctorAppointments();
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        let nextPatient = this.props.currentDayAppointments[0];

        return (
            <div>
                <h1 className='Overview-WelcomeMessage'> Welcome Back! </h1>
                <div className='Overview-Summary' >
                    <div className='Overview-DoctorInfoBlock'>
                        <img src={doctorLogo} className='Overview-DoctorAvatar' />
                        <div className='Overview-DoctorInfo' >
                            <StyledTitle fontSize='25px'> Dr. John House </StyledTitle>
                            <StyledContent fontSize='18px' style={{marginTop: '18px'}}> Resident General Practioner </StyledContent>  
                        </div>
                    </div>
                    { this.props.currentDayAppointments.length > 0 &&
                        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <div className='Overview-NextPatientInfo'>
                                <StyledTitle fontSize='25px'> NextPatient: </StyledTitle>
                                <StyledTitle fontSize='18px' style={{marginTop: '10px'}}> {nextPatient.patientName} </StyledTitle>
                                <StyledContent fontSize='18px'> {nextPatient.appointmentTime} </StyledContent>
                                <div class = 'Overview-NextPatientAttributes'>
                                    <StyledTitle fontSize='16px'> Visit Status: </StyledTitle>
                                    <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {nextPatient.visitStatus} </StyledContent>
                                </div>
                                <div class = 'Overview-NextPatientAttributes'>
                                    <StyledTitle fontSize='16px'> Details: </StyledTitle>
                                    <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {nextPatient.patientDetails} </StyledContent>
                                </div>
                                <div class = 'Overview-NextPatientAttributes'>
                                    <StyledTitle fontSize='16px'>  Last Appt: </StyledTitle>
                                    <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {nextPatient.lastAppt} </StyledContent>
                                </div>
                            </div>
                            <div className='Overview-NextPatientBlock-Right'>
                                <img src={doctorLogo} className='Overview-NextPatientAvator'/>
                                <Button color="primary">
                                    More Details
                                </Button>
                            </div>
                        </Card>
                    }
                    { this.props.currentDayAppointments.length > 0 &&
                        <Card style={{ flex: 1 }}>
                            <div className='Overview-TodayOverviewBlock'>
                                <StyledTitle fontSize='25px'> Today's Overview: </StyledTitle>
                                <StyledTitle fontSize='25px'> <span style={{ color: '#25AED9' }}> 2 </span> Completed Appointments </StyledTitle>
                                <StyledTitle fontSize='25px'> <span style={{ color: '#FEBB26' }}> {this.props.currentDayAppointments.length} </span> Total Appointments </StyledTitle>
                            </div>
                        </Card>
                    }
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentDayAppointments: state.currentDayAppointments.currentDayAppointments,
        results: state.results,
        posts: state.posts.items,
    }
}

const mapDispatchToProps = () => {
    return {
        getDoctorAppointments,
        getDoctorInfo,
        fetchPosts
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Overview);