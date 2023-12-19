import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { dispatch, Budget, Location } = useContext(AppContext);

  const submitBudget = (val) => {
    dispatch({
      type: "CHG_Budget",
      payload: val,
    });
  };

  return (
    <div className="alert alert-secondary">
      {" "}
      Budget {Location.charAt(0)}{" "}
      {
        <input
          type="number"
          value={Budget}
          onChange={(e) => {
            submitBudget(e.target.value);
          }}
          className="form-control-sm col-8"
        />
      }
    </div>
  );
};

export default Budget;
