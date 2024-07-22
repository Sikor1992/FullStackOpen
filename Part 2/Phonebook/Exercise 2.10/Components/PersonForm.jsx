const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <div>name:
          <input
            value={props.valueOne}
            onChange={props.onChangeOne}
          />
        </div>
        <div>number:
          <input
            value={props.valueTwo}
            onChange={props.onChangeTwo}
          />
        </div> 
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}        

export default PersonForm
