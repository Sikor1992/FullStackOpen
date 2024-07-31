const Persons = (props) => {
  return (
    <div>
      {props.person.name + " "}   
      {props.person.number + " "}
      <button onClick={props.onClick}
                  id={props.person.id}
                  name={props.person.name}
          >
            delete
          </button>
    </div>  
  )
}

export default Persons
