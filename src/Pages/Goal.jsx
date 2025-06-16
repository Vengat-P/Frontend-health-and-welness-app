import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Goal = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            
        </div>
    );
};

export default Goal;