const Course = ({ courses }) => { 
    return (
      <div>
        {courses.map(course =>
          <Courses key={course.id} course={course} />  
        )}
      </div>
    )
  }
  
const Courses = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}
  
const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />  
        )}
      </div>
    )
}
  
const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
  
const Total = ({ parts }) => {
    const sum = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0,
    )
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

export default Course
