const Header = (props) => {
    return (
        <>
        <h2>{props.course}</h2>
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

const Content = ({parts}) => {
    return (
        <div>
        {parts.map((part)=>
            <Part key={part.name+part.id} part={part.name} exercises={part.exercises}/>
        )}
        </div>
    );
}

const Total = ({course}) => {

    const initialValue = 0;
    const total = course.map((c) => c.exercises).reduce( (s, p) => s + p,initialValue)

    return (
        <>
        <h3>
            Number of exercises {total}
        </h3>
        </>
    );
}

const Course = ({course}) => {
    return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total course={course.parts} />
    </div>
);
}

  export default Course