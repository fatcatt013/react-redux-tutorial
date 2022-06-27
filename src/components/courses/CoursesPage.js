import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

function CoursesPage(props) {
  useEffect(() => {
    if (props.courses.length === 0) {
      props.actions.loadCourses().catch((err) => {
        console.error(err);
      });
    }
    if (props.authors.length === 0) {
      props.actions.loadAuthors().catch((err) => {
        console.error(err);
      });
    }
  }, []);
  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={props.courses} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
