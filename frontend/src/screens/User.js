import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { deleteUser } from "../actions/userActions";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const User = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPost] = useState(users);
  const [postsPerPage] = useState(6);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  const editHandler = (id) => {
    navigate(`/edituser/${id}`);
  };

  const createHandler = () => {
    navigate(`/createuser`);
  };

  useEffect(() => {
    setSearchText(searchTerm);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            {userInfo && userInfo.isAdmin && (
              <th>
                <Button onClick={createHandler}>Create user</Button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentPost
            .filter((val) => {
              if (searchText === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                {userInfo.isAdmin && (
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => editHandler(user._id)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
    </>
  );
};

export default User;
