import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

function CoursesPage(props) {
  const [course, setCourse] = useState({ title: '' });

  const handleChange = (event) => {
    setCourse({ title: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions.createCourse(course);
    setCourse({ title: '' });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Courses</h2>
      <h3>Add course</h3>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        value={course.title || ''}
      />
      <input type="Submit" defaultValue="Save" />
      {props.courses.map((course) => (
        <div key={course.title}>{course.title}</div>
      ))}
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
