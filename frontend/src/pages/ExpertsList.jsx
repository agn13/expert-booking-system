import { useEffect, useState, useCallback } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ExpertsList() {

  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

const fetchExperts = useCallback(async () => {

  try {

    setLoading(true);

    const res = await API.get("/experts", {
      params: { search, category, page }
    });

    setExperts(res.data);
    setError("");

  }
  catch {
    setError("Failed to fetch experts");
  }
  finally {
    setLoading(false);
  }

}, [search, category, page]);

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);


  if (loading)
    return (
      <div className="page">
        <div className="container">
          <h2>Loading experts...</h2>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="page">
        <div className="container">
          <h2 style={{ color: "red" }}>{error}</h2>
        </div>
      </div>
    );


  return (

    <div className="page">

      <div className="container">

        <h2>Find an Expert</h2>

        <div className="card">

          <input
            placeholder="Search expert..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="Career Coach">Career Coach</option>
            <option value="Fitness Trainer">Fitness Trainer</option>
          </select>

        </div>


        {experts.length === 0 &&
          <div className="card">No experts found</div>
        }


        {experts.map(expert => (

          <div
            key={expert._id}
            className="card"
            onClick={() =>
              navigate(`/expert/${expert._id}`)
            }
            style={{ cursor: "pointer" }}
          >

            <h3>{expert.name}</h3>

            <p><strong>Category:</strong> {expert.category}</p>

            <p><strong>Experience:</strong> {expert.experience} years</p>

            <p><strong>Rating:</strong> ⭐ {expert.rating}</p>

          </div>

        ))}


        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px"
        }}>

          <button
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 15px" }}>
            Page {page}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );

}