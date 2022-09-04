import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaEquals, FaTimes } from "react-icons/fa";

const Landing = () => {
  const baseOptions = [
    { name: "two", value: 2 },
    { name: "three", value: 3 },
    { name: "four", value: 4 },
    { name: "five", value: 5 },
    { name: "six", value: 6 },
    { name: "seven", value: 7 },
    { name: "eight", value: 8 },
    { name: "nine", value: 9 },
    { name: "ten", value: 10 },
  ];
  const [details, setDetails] = useState({
    number: 0,
    base: 2,
    baseName: "",
    errorMessage: "",
    answer: "",
    isCalculated: false,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDetails({ ...details, [name]: value });
    if (name === "base") {
      let baseName = baseOptions.find((e) => {
        let object = Number(value) === Number(e.value);
        return object;
      });
      setDetails({ ...details, baseName: baseName.name, [name]: value });
    }
  };
  const convertToBase = (N, B) => {
    let binary = "";
    let initialValue = N;
    do {
      let currentValue = parseInt(initialValue / B);
      let remainder = initialValue - currentValue * B;
      initialValue = currentValue;
      binary = `${binary}${remainder}`;
    } while (initialValue !== 0);
    binary = binary.split("").reverse().join("");
    return binary;
  };
  const clearAlert = () => setDetails({ ...details, errorMessage: "" });
  const clearValues = () =>
    setDetails({
      ...details,
      answer: 0,
      base: 2,
      baseName: "",
      errorMessage: "",
      isCalculated: false,
      number: 0,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { base, number } = details;
    if (!base || number === 0) {
      setDetails({
        ...details,
        errorMessage: "Please provide all values",
      });
      setTimeout(() => clearAlert(), 3000);
      return;
    }
    let answer = convertToBase(number, base);
    setDetails({ ...details, answer, isCalculated: true });
    setTimeout(() => clearAlert(), 10000);
    return;
  };
  return (
    <Wrapper className="container">
      <h3 className="title">Base converter</h3>
      <div className="title-underline"></div>
      <form onSubmit={handleSubmit} className="form">
        <h5 className="title">number to base </h5>
        <div className="title-underline"></div>
        <div
          className={`alert ${details.errorMessage && "alert-danger"} ${
            !details.errorMessage &&
            details.isCalculated === true &&
            "alert-success"
          } `}
        >
          {details.errorMessage
            ? details.errorMessage
            : details.isCalculated
            ? `${details.number} in base ${details.baseName} is  ${details.answer}`
            : ""}
        </div>
        <div className="form-row ">
          <label htmlFor="number" className="form-label">
            Enter number
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="number"
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label htmlFor="number" className="form-label">
            To base
          </label>
          <select
            name="base"
            onChange={handleChange}
            className="form-select base"
          >
            {baseOptions.map((e) => (
              <option key={e.name} name="base" value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-block">
          <FaEquals /> Calculate
        </button>
        <div className="btn-container ">
          <button
            onClick={clearValues}
            type="reset"
            className="btn btn-transparent"
          >
            <FaTimes /> Reset
          </button>
        </div>
      </form>
      <p className="title container">
        <small>
          Designed and developed by
          <i>
            <a href="http://onisabi-portfolio.netlify.app/" target="blank">
              Oniboy
            </a>{" "}
          </i>
        </small>
      </p>
    </Wrapper>
  );
};

export default Landing;
const Wrapper = styled.section`
  .alert {
    margin-top: 1rem;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    margin: auto;
  }
  .base {
    text-transform: capitalize;
  }
  .btn {
    margin-bottom: 1rem;
  }
  .form {
    margin-bottom: 0;
  }
`;
