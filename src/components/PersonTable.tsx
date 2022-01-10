import React, {FC, useState} from "react";
import {IAllPersons} from "../interfaces/IAllPersons";
import {FaSort} from "react-icons/fa";



const PersonTable: FC = () => {

    //init local states
    const [personState, setPersonState] = useState<IAllPersons>({
        person: {
            firstName: "",
            lastName: "",
            age: "",
        },
        allPersons: []
    })

    const [sortOrder, setSortOrder] = useState<string>("ASC");


    //form input handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPersonState({
            ...personState,
            person: {
                ...personState.person, [e.target.name]: e.target.value
            }
        })
    }

    // save person to table
    const addPerson = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        setPersonState({
            person: {
                firstName: "",
                lastName: "",
                age: "",
            }, allPersons: [...personState.allPersons, personState.person]
        })

    }

    // functions to sort table columns

    //sort by first name
    //I didn't find a way to make this work with parameter, so I had to make three different functions(one for each row) instead of one.
    const sortByFirstName = () => {

        if (sortOrder === "ASC") {
            let sorted = personState.allPersons.sort((a, b) => {
                return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("DSC");
        }
        if (sortOrder === "DSC") {
            let sorted = [...personState.allPersons].sort((a, b) => {
                return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("ASC");
        }
    }


    //sort by lastname
    const sortByLastName = () => {

        if (sortOrder === "ASC") {
            let sorted = personState.allPersons.sort((a, b) => {
                return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("DSC");
        }
        if (sortOrder === "DSC") {
            let sorted = [...personState.allPersons].sort((a, b) => {
                return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("ASC");
        }
    }


    //sort by age
    const sortByAge = () => {


        if (sortOrder === "ASC") {

            let sorted = personState.allPersons.sort((a, b) => {
                return a.age > b.age ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("DSC");
        }
        if (sortOrder === "DSC") {
            let sorted = [...personState.allPersons].sort((a, b) => {
                return a.age < b.age ? 1 : -1;
            })
            setPersonState({...personState, allPersons: sorted})
            setSortOrder("ASC");
        }
    }


    //delete person from table
    const deletePerson = (id: number) => {
        let new_persons = personState.allPersons.filter((person, i) => id !== i);
        setPersonState({...personState, allPersons: new_persons});
    }


    return (
        //input form for user to set person data into table
            <div className="table-container">
                <form onSubmit={addPerson} className="input">
                    <input
                        required
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={personState.person.firstName}
                        placeholder="First Name*"
                        onChange={handleChange}
                    />
                    <input
                        required
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={personState.person.lastName}
                        placeholder="Last Name*"
                        onChange={handleChange}
                    />
                    <input
                        required
                        id="personAge"
                        type="number"
                        min={1}
                        name="age"
                        value={personState.person.age}
                        placeholder="Age*"
                        onChange={handleChange}
                    />
                    <button type="submit">Add Person</button>
                </form>
                <table className="personTable">
                    <thead>
                    <tr>
                        <th>
                            First Name:
                            <FaSort className="sort-icon" onClick={sortByFirstName}/>
                        </th>
                        <th>
                            Last Name:
                            <FaSort className="sort-icon" onClick={sortByLastName}/>
                        </th>
                        <th>
                            Age:
                            <FaSort className="sort-icon" onClick={sortByAge}/>
                        </th>
                        <th>Actions:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {personState.allPersons.map((person, index) => (
                        <tr key={index}>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.age}</td>
                            <td>
                                <button
                                    // onClick={() => deletePerson(person.firstName, person.lastName, person.age)}
                                    onClick={() => deletePerson(index)}
                                    className="delete-button"
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    );


}

export default PersonTable