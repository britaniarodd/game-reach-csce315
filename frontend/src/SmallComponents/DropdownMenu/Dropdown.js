import * as React from 'react';
import "./Dropdown.css";


//BELOW IS AN EXAMPLE APP

// //make it to a controlled thing
// const App = () => {
//   const options = [
//     {label: 'All Statuses', value: 'All Statuses'},
//     {label: 'Closed', value: 'Closed'},
//     {label: 'Open', value: 'Open'},
//     {label: 'Mentoring', value: 'Mentoring'},
//   ];

//   //using useState, first value in array is the value of initial state
//   //second value is a function that updates the state AKA state update function 
//   const [value, setValue] = React.useState('All Statuses');

//   const handleChange = (event)=>{
//     setValue(event.target.value);
//   };

//   return (
//     <div className = "DropDown_Background">
//       <Dropdown
//         label = "Select Status: "
//         options = {options}
//         value = {value}
//         onChange = {handleChange}
//         />
//         <p>you chose {value}</p>
//     </div>

//   );
// };


//BELOW IS THE ACTUAL DROPDOWN FUNCTINALITY, WHICH CAN BE REUSED
const Dropdown = ({label, value, options, onChange}) => {
  return (
    <div className = 'DropDown_Background'>
    <label className = 'labelEdit'>
      {label}
      <select value = {value} onChange = {onChange}>
        {/*creates some options by mapping value and label into new array*/}
        {options.map((option) => (
          <option value = {option.value}>  {option.label}  </option>
        ))}
      </select>
    </label>
    </div>
  );
};

export default Dropdown;