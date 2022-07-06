import React, {useState, useEffect} from 'react';

const API_URL = '/employee';

const Employees = () => {
    const [employees, setEmployees] = useState([]); // 
    const [searchInput, setSearchInput] = useState(''); //
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => { 
        const fetchEmployees = async () => {
            const response = await fetch(API_URL);
            console.log(response.json());
            const employees = response.json();
            setEmployees(employees);
            setIsLoading(false);
        }
        fetchEmployees();
    }); //

    return(
        <>
        {isLoading ? (<div className="loading">Loading...</div>) : (
        <div className="employees">
            {employees.map((employee) => {
                const {first_name, last_name, date_of_birth, blood_group, color_id} = employee;
                return (
                    <article bordered="true" style="bordercolor:{color_id}">
                        <div className="employee-avatar">
                            <img src="https://via.placeholder.com/150" alt={first_name}></img>
                        </div>
                        <div className="details">
                            <h2 className="employee-name">
                                {first_name} {last_name}
                            </h2>
                            <h4>
                                DOB: {date_of_birth}
                            </h4>
                            <h4>
                                Blood Group: {blood_group}
                            </h4>
                        </div>
                    </article>
                )
            })}
        </div> 
        )}
        </>
    )
}
export default Employees;