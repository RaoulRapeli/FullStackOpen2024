const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercises}
      </p>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
      <Part part={props.course.parts[3].name} exercises={props.course.parts[3].exercises}/>
    </div>
  );
}

const Total = (props) => {
  return (
    <>
      <h3>
        Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises + props.course.parts[3].exercises}
      </h3>
    </>
  );
}

const Course = ({course}) => {
    return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App