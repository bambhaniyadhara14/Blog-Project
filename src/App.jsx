import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const API = "http://localhost:3000/students";

  const [userData, setUserData] = useState([]);

  const [no, setNo] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [id, setId] = useState(null);
  const [isAdd, setIsAdd] = useState(true);


  const getData = () => {

    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  useEffect(() => {
    getData();
  }, []);


  const clearForm = () => {

    setNo("");
    setTitle("");
    setImg("");
    setCategory("");
    setDate("");
    setId(null);
    setIsAdd(true);

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const user = {
      no,
      title,
      img,
      category,
      date
    };


    if (isAdd) {

      fetch(API, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

      })
        .then((res) => res.json())
        .then(() => {

          getData();
          clearForm();

        });

    }


    else {

      fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

      })
        .then((res) => res.json())
        .then(() => {

          getData();
          clearForm();

        });

    }

  };

  const handleDelete = (id) => {

    fetch(`${API}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        getData();
      });

  };


  const handleEdit = (element) => {

    setIsAdd(false);

    setId(element.id);

    setNo(element.no);
    setTitle(element.title);
    setImg(element.img);
    setCategory(element.category);
    setDate(element.date);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  return (
    <>

      <h1 className="main-heading"> Blog Project</h1>

      <div className="main-box">

        <div className="left-box">

          <div className="form-box">

            <h2> {isAdd ? "Add New Data" : "Edit Data"}</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="No." value={no}
                onChange={(e) => setNo(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn" >
                {isAdd ? "Add" : "Update"}
              </button>


              {!isAdd && (

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                > Cancel</button>
              )}

            </form>

          </div>

        </div>

        <div className="right-box">

          {userData.map((element) => (

            <div className="student-card" key={element.id} >

              <div className="number-box">No. {element.no}</div>

              <h2 className="blog-title">{element.title}</h2>

              <div className="image-box">
                <img src={element.img} alt={element.title} />
              </div>

              <div className="category-box">{element.category}</div>

              <div className="date-box"> {element.date}</div>

              <div className="buttons">

                <button className="delete-btn" onClick={() => handleDelete(element.id)} >
                  Delete
                </button>
                <button className="edit-btn" onClick={() => handleEdit(element)} >
                  Edit
                </button>

              </div>
            </div>

          ))}

        </div>

      </div>

    </>
  );

}

export default App;