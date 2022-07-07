import React, {useState, useEffect} from 'react';

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
                
                const {firstName, lastName, dateofBirth, bloodGroup,colorId} = employee;
                const styles ={
                    border: '3px solid rgba(0,0,0,'+colorId+')'
                }
                return (
                    <div key={index}>
                        <article>
                            <div style={styles} className="employeeavatar">
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
                        </article>
                    </div>
                )
            })}
        </div> 
        )}
        </>
    )
}
export default Employees;