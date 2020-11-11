export default function StarWars({ fetchedData }) {
  return (
    <div>
      <h1>This is not a Star Wars Page... This is A New Hope Page</h1>
      <h2>{fetchedData.title}</h2>
      <h5>{fetchedData.opening_crawl}</h5>
      <GetCharacters fetchedData={fetchedData} />
      <GetPlanets fetchedData={fetchedData} />
    </div>
  );
}

function GetCharacters({ fetchedData }) {
  return (
    <div>
      <h3>Characters included in {fetchedData.title}</h3>
      <table style={{ width: 100 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Mass</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>{fetchCharacters(fetchedData)}</tbody>
      </table>
    </div>
  );
  function fetchCharacters() {
    let returned = fetchedData.characterInfo.map((data) => {
      return (
        <tr key={data.name}>
          <td> {data.name} </td>
          <td>{data.gender}</td>
          <td> {data.birth_year}</td>
          <td> {data.mass} </td>
          <td>{data.height}</td>
        </tr>
      );
    });
    return returned;
  }
}

function GetPlanets({ fetchedData }) {
  return (
    <div>
      <h3>Planets included in {fetchedData.title}</h3>
      <table style={{ width: 100 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
          </tr>
        </thead>
        <tbody>{getPlanets(fetchedData)}</tbody>
      </table>
    </div>
  );
  function getPlanets() {
    let returned = fetchedData.planetInfo.map((data) => {
      return (
        <tr key={data.name}>
          <td>{data.name}</td>
          <td>{data.population}</td>
          <td>{data.gravity}</td>
          <td>{data.terrain}</td>
          <td>{data.orbital_period}</td>
          <td>{data.rotation_period}</td>
        </tr>
      );
    });
    return returned;
  }
}
