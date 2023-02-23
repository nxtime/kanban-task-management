import { useState } from "react"
import ListSelect from "../molecules/Select"

const Showcase = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1")
  return (
    <div className="p-6 flex flex-col gap-4">
      <h2>Hello World</h2>
      <div className="flex gap-2 items-center">
        <button type="button" className="btn btn-primary" >Button</button>
        <button type="button" className="btn btn-sm btn-primary" >Button</button>
        <button type="button" className="btn btn-sm btn-secondary" >Button</button>
        <button type="button" className="btn btn-sm btn-danger" >Button</button>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Checkbox</label>
      </div>
      <div className="textfield" data-error="Can't be empty" >
        <label htmlFor="textfield">Textfield</label>
        <input type="text" id="textfield" placeholder="Textfield" />
      </div>
      <ListSelect
        title="Select"
        options={["Option 1", "Option 2", "Option 3"]}
        selectedOption={selectedOption}
        setSelectedOption={(value) => {
          setSelectedOption(value)
        }}
      />
    </div>
  )
}

export default Showcase
