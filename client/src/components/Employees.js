import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
const API_URL = '/employee';

const Employees = () => {
    const [employees, setEmployees] = useState([]); // 
    const [searchInput, setSearchInput] = useState(''); //
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => { 
        const fetchEmployees = async () => {
            const response = await fetch(API_URL);
            const employees = await response.json();
            setEmployees(employees);
            setIsLoading(false);
        }
        fetchEmployees();
    },[]); //

    return(
        <>
        {isLoading ? (<div className="loading">Loading...</div>) : (
        <div className="employees">
            {employees.message.map((employee,index) => {
                
                const {id,firstName, lastName, dateofBirth, bloodGroup,colorId} = employee;
                const colorList = ['','','','#2986cc','#000000','#FFC0CB','#FF83EE','#FF0000',''];
                const avatarStyle ={
                    backgroundColor: colorList[colorId]
                }
                return (
                    <div key={index}>
                        <Link to={`/employee/timeoff/${id}`}>
                        <div className="employee">
                            <div style={avatarStyle} className="employeeavatar">
                                <img src="https://via.placeholder.com/150" alt={firstName}></img>
                            </div>
                            <div className="details">
                                <h2 className="employee-name">
                                    {firstName} {lastName}
                                </h2>
                                <h4>
                                    DOB: {dateofBirth}
                                </h4>
                                <h4>
                                    Blood Group: {bloodGroup}
                                </h4>
                            </div>
                        </div>
                        </Link>
                    </div>
                )
            })}
        </div> 
        )}
        </>
    )
}
export default Employees;