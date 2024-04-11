import React, { useState } from "react";
import Nav from "./Nav";
import hogs from "../porkers_data";

function App() {
  const [selectedHog, setSelectedHog] = useState(null);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [hiddenHogs, setHiddenHogs] = useState([]);
  const [newHog, setNewHog] = useState({});

  const toggleHogDetails = (hog) => {
    setSelectedHog(selectedHog === hog ? null : hog);
  };

  const hideHog = (hog) => {
    setHiddenHogs([...hiddenHogs, hog]);
  };

  const handleFormChange = (e) => {
    setNewHog({ ...newHog, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    // Add validation logic here if required
    hogs.push(newHog);
    setNewHog({});
  };

  const filteredHogs = hogs.filter(
    (hog) => !greasedOnly || hog.greased
  ).filter((hog) => !hiddenHogs.includes(hog));

  const sortedHogs = filteredHogs.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "weight") {
      return a.weight - b.weight;
    }
    return 0;
  });

  return (
    <div className="App">
      <Nav />
      <div className="filterWrapper">
        <label>
          <input
            type="checkbox"
            checked={greasedOnly}
            onChange={() => setGreasedOnly(!greasedOnly)}
          />
          Show Greased Hogs Only
        </label>
      </div>
      <div className="filterWrapper">
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </label>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="filterWrapper">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newHog.name || ""}
            onChange={handleFormChange}
          />
          <input
            type="text"
            placeholder="Specialty"
            name="specialty"
            value={newHog.specialty || ""}
            onChange={handleFormChange}
          />
          <input
            type="number"
            placeholder="Weight"
            name="weight"
            value={newHog.weight || ""}
            onChange={handleFormChange}
          />
          <input
            type="text"
            placeholder="Highest Medal Achieved"
            name="highestMedalAchieved"
            value={newHog.highestMedalAchieved || ""}
            onChange={handleFormChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={newHog.image || ""}
            onChange={handleFormChange}
          />
          <button type="submit">Add Hog</button>
        </div>
      </form>
      <div className="indexWrapper ui grid container">
        {sortedHogs.map((hog) => (
          <div className="pigTile ui four wide column">
          	<div key={hog.name} className="ui card">
	            <h3>{hog.name}</h3>
	            <img src={hog.image} className="minPigTile" alt={hog.name} />
	            <p>{hog.specialty}</p>
	            {selectedHog === hog && (
	              <div>
	                <p>Weight: {hog.weight} kg</p>
	                <p>Greased: {hog.greased ? "Yes" : "No"}</p>
	                <p>Highest Medal Achieved: {hog["highest medal achieved"]}</p>
	              </div>
	            )}
	            <button onClick={() => toggleHogDetails(hog)}>
	              {selectedHog === hog ? "Hide Details" : "Show Details"}
	            </button>
	            <button onClick={() => hideHog(hog)}>Hide Hog</button>
	          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
