import React,{useState,useEffect} from "react"



const Checkbox = ({categories,handleFilters}) =>{

        const [checked,setChecked] = useState([])

        const handleChange = (c) => () => {
            // return -1 if current category not in list else return index
            const currentCategoryIndex = checked.indexOf(c) 
            const existingCategories = [...checked] 
            if(currentCategoryIndex === -1){
                existingCategories.push(c)
            }else{
                existingCategories.splice(currentCategoryIndex,1); //remove the current category (splice method removes specified number of elements from given index)
            }
            // console.log(existingCategories);
            setChecked(existingCategories) //add or remove (based on toggle on/off)
            handleFilters(existingCategories) //passing to parent 
        }

    return (
       categories.map((category,index) => {
            return (
                <li key={index} className="list-unstyled">
                    <input onChange={handleChange(category._id)} value={checked.indexOf(category._id) === -1} type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">{category.name}</label>
                </li>
            )
       })
    )
}

export default Checkbox