import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import ChuckNorris from "./App";

export default function ChuckNorriss({ fetchedData }) {
  return (
    <div>
      <h1>Some might say he is a legend</h1>
      <h3>What do you think?</h3>
      <getChuckNorrisJokes fetchedData={fetchedData} />
    </div>
  );
}

function getChuckNorrisJokes({ fetchedData }) {
  return (
    <div>
      <h3>YOYOYOYO suck it </h3>
      <table style={{ width: 100 }}>
        <thead>
          <tr>
            <th> Categories</th>
            <th> Created_at</th>
            <th> Icon_url</th>
            <th> Id </th>
            <th> pdated_at</th>
            <th> Url </th>
            <th> Value</th>
          </tr>
        </thead>
        <tbody>{fetchChuckNorrisJoke(fetchedData)}</tbody>
      </table>
    </div>
  );

  function fetchChuckNorrisJoke() {
    let returned = fetchedData.ChuckJoke.map((data) => {
      return (
        <tr key={data.categories}>
          <td> {data.categories} </td>
          <td>{data.created_at}</td>
          <td> {data.icon_url}</td>
          <td> {data.id} </td>
          <td> {data.updated_at} </td>
          <td> {data.url} </td>
          <td>{data.value}</td>
        </tr>
      );
    });
    return returned;
  }
}
