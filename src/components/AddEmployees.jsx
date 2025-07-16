import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const AddEmployees = ()=>{
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [roleNames, setRoles] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
    async function addNewEmployee(e) {
    e.preventDefault();
   if (!token) {
    alert("You are not logged in. Please log in to continue.");
    navigate('/login'); // Redirect to login page
    return;
   }
    const roleArray = roleNames.split(",").map((role) => role.trim());
    try {
      const req = await axios.post("http://localhost:8080/employee/add",
    {
        name,
        email,
        password,
        userName,
        roleNames: roleArray,
    },
    {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
      
      if (req.data) {
        alert(req.data);
        navigate('/getemployees');
      } else {
        alert("Error during Add employee");
      }
    } catch (error) {
      console.error("Protected route", error);
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      alert("Authorization failed. Only admins can add employees.");
    } else {
      alert("An error occurred. Please try again.");
    }
    }
  }
    return(
        <>
      <Navbar />
      <section className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Add New Employee</h3>
                <form onSubmit={addNewEmployee}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Employee Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roleNames" className="form-label">Roles (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="roleNames"
                      value={roleNames}
                      onChange={(e) => setRoles(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">ADD EMPLOYEE</button>
                </form>
                <p className="mt-3 text-center">
                  Already a user? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddEmployees;