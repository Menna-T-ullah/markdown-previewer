import "./App.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [code, setCode] = useLocalStorage("Messages", "## Hello");
  const [compiled, setCompiled] = useLocalStorage(
    "data",
    '<h2 id="hello">Hello</h2>'
  );
  const [writes, setWrite] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/basic_syntax")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWrite(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  const [tabIndex, setTabIndex] = useState(1);
  const [hide, hidePreview] = useState(true);

  const openMD = () => {
    console.log(0);
    hidePreview(true);
  };

  const openPreview = () => {
    console.log(0);
    hidePreview(false);
  };

  const openDocs = () => {
    console.log("Docs");
    hidePreview(true);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={() => setTabIndex(1)} className="btn">
            MarkDown
          </button>
          <button onClick={() => setTabIndex(2)}>Preview</button>
          <button onClick={() => setTabIndex(3)} className="btn">
            Docs
          </button>
        </div>
        {/* {hide ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : (
          <div>
            <textarea value={compiled} />
          </div>
        )} */}
        {/* <div style={hide? {display:"none"} : {display:"block"}}>
          <textarea value={data}/>
        </div> */}
        {tabIndex === 1 && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}
        {tabIndex === 2 && (
          <div>
            <textarea value={compiled} />
          </div>
        )}
        {tabIndex === 3 && (
          <div>
            {writes.map((write) => {
              return (
                <div key={write.id}>
                  <h2 className="textarea">{write.name}</h2>
                  <p className="textarea">{write.description}</p>
                  {write.examples.map((example, e) =>{
                  return(
                    <div key={example.id} className="data">
                      <h3>Example {e+1} :</h3>
                      <h4>-markdown</h4>
                      <p>{example.markdown}</p>
                      <h4>-html</h4>
                      <p>{example.html}</p>
                    </div>
                  );
                })}
                {write.additional_examples.map((add) =>{
                  return(
                    <div key={add.id} className="data">
                      <h3>{add.name}</h3>
                      <p>{add.description}</p>
                      <h4>-markdown</h4>
                      <p>{add.markdown}</p>
                      <h4>-html</h4>
                      <p>{add.html}</p>
                    </div>
                  );
                })}
                </div>
              );
            })}
          </div>
          //  <textarea value={writes}/>
        )}
      </div>
    </>
  );
};

export default App;
