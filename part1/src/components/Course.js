import React from 'react'

const Catalog = (props) => {
	const rows = () => (props.catalog_arg.catalog_arg).map((course_row) => 
		<Course key={course_row.id} courses={course_row} />
	)

  return (
    <div>
	  {rows()}
    </div>
  )
}

const Course = ({ courses }) => {
  return (
	  <div>
		<Header course_arg={courses}	/>
		<Content course_arg={courses}	/>
		<Footer course_arg={courses}	/>
	  </div>
  )
}

const Header = (props) => {
  return (
    <div>
	  <h1>{props.course_arg['name']}</h1>
    </div>
  )
}

const Content = (props) => {
	const rows = () => (props.course_arg.parts).map(course_row =>
		<p key={course_row.id}>{course_row.name}: {course_row.exercises}</p>
    )
	
	return (
		<div>
			{rows()}
		</div>
	)
}

const Footer = (props) => {
	var initialValue = 0;
	const total = (props.course_arg.parts).reduce( (acc, cur) => {
//		console.log('what is happening', acc, cur.exercises)
		return acc + cur.exercises
	}, initialValue )
  
  return (
    <div>
		<p>Number of exercises {total}</p>
    </div>
  )
}

export default Catalog