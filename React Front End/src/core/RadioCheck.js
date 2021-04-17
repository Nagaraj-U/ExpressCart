import React,{useState,useEffect, Fragment} from "react"


const RadioCheck = ({prices,handleFilters}) =>{

    const [value,setValue] = useState(0);
    const handleChange = (event)=>{
        handleFilters(event.target.value)
        setValue(event.target.value)  
    }
    return (
        prices.map((p,i) => {
            return (
                <div key={i}>
                   <input  onChange={handleChange}  type="radio" className="ml-4 mr-2" name={p} value={`${p._id}`}/>
                   <label className="form-check-label">{p.name}</label>
                </div>
            )
        })
    )
}

export default RadioCheck