import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {

    const navigate = useNavigate();

    const [loading, setloading] = useState(true);
    const [employees, setEmployees] = useState(null);

    useEffect(() =>{
       const fetchData = async () => {
        setloading(true);
        try{
            const response = await EmployeeService.getEmployees();
            setEmployees(response.data);
        }catch(error){
            console.log(error);
        }
        setloading(false);
       };
       fetchData();

    }, []);



    const deleteEmployee =(e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then((res) => {
            if(employees){
            setEmployees((pervElement) => {
                return pervElement.filter((employee) => employee.id !== id);
            });
        }
        });
              
    };

    return(
        <div className="container mx-auto my-8">
            <div className="h-12">
                <button 
                onClick={() => navigate("/addEmployee")}
                className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
                    Add Employee
                </button>
            </div>
            <div className="flex shadow border-b ">
                <table className='min-w-full'>
                    <thead className="bg-yellow-200 ">
                        <tr>
                            <th className="text-left font-medium text-gray-800 uppercase tracking-wider py-3 px-6">
                                First Name
                            </th>
                            <th className="text-left font-medium text-gray-800 uppercase tracking-wider py-3 px-6">
                                Last Name
                            </th>
                            <th className="text-left font-medium text-gray-800 uppercase tracking-wider py-3 px-6">
                                Email ID
                            </th>
                            <th className="text-right font-medium text-gray-800 uppercase tracking-wider py-3 px-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {!loading && (
                    <tbody className="bg-white">
                        {employees.map((employee) => (
                        <Employee employee={employee} deleteEmployee={deleteEmployee} key={employee.id}></Employee>
                        ))}
                    </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;