import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import AddLoadForm from "../forms/AddLoadForm";
import Load from "../UI/Load";
import UserContext from "../context/UserContext";

const ShipperLoads = () => {
  const { token } = useContext(UserContext);
  const [loads, setLoads] = useState([]);
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [showAddLoadForm, setShowAddLoadForm] = useState(false);
  const selectRef = useRef();

  const toggleAddLoadForm = () => {
    selectRef.current.value = "ALL";
    setShowAddLoadForm((prevState) => !prevState);
  };

  const fetchLoads = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/loads", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      if (data.loads) {
        const loadsArr = data.loads.map((load) => {
          const createdDate = load.created_date
            .substring(0, 10)
            .split("-")
            .reverse()
            .join("/");
          return {
            id: load._id,
            status: load.status,
            payload: load.payload,
            state: load.state,
            name: load.name,
            pickupAddress: load.pickup_address,
            deliveryAddress: load.delivery_address,
            width: load.dimensions.width,
            length: load.dimensions.length,
            height: load.dimensions.height,
            createdDate: createdDate,
          };
        });
        setLoads(loadsArr);
        setFilteredLoads(loadsArr);
      } else {
        setLoads([]);
      }
    }
  }, [token]);

  const deleteLoadHandler = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you really want to delete load?")) {
      const res = await fetch(`http://localhost:8080/api/loads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && res.status === 200) {
        fetchLoads();
      } else {
        alert(data.message);
      }
    }
  };

  const postLoadHandler = async (id) => {
    const res = await fetch(`http://localhost:8080/api/loads/${id}/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      fetchLoads();
    } else {
      alert(data.message);
    }
  };

  const filterHandler = (event) => {
    event.preventDefault();
    if (event.target.value === "ALL") {
      setFilteredLoads(loads);
    } else {
      setFilteredLoads(
        loads.filter((load) => load.status === event.target.value)
      );
    }
  };

  useEffect(() => {
    fetchLoads();
  }, [showAddLoadForm, fetchLoads]);

  return (
    <div className="table__inner">
      {showAddLoadForm && (
        <AddLoadForm onToggleAddLoadForm={toggleAddLoadForm} />
      )}
      <div className="table__header">
        <button className="table__btn" onClick={toggleAddLoadForm}>
          Create Load +
        </button>
        <form>
          <label className="card__name filter__label" htmlFor="filter">
            Filter by Status:
          </label>
          <select
            ref={selectRef}
            className="form__select form__select--load"
            id="filter"
            onChange={filterHandler}
          >
            <option value="ALL" defaultChecked={true}>
              ALL
            </option>
            <option value="NEW">NEW</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="SHIPPED">SHIPPED</option>
          </select>
        </form>
      </div>
      <div className="cards__block">
        {loads.length === 0 && (
          <p className="truck__info">Loads not Found! Please, add new Load!</p>
        )}
        {filteredLoads.map((load) => (
          <Load
            key={load.id}
            loadData={load}
            onDeleteLoadHandler={deleteLoadHandler}
            onPostLoadHandler={postLoadHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ShipperLoads;
