import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/Admin/widget/Widget";

import Chart from "../../../components/Admin/chart/Chart";

import WeeklyChart from "../../../components/Admin/WeeklyChart/WeeklyChart";
import YearlyChart from "../../../components/Admin/YearlyChart/YearlyChart"
import DailyChart from "../../../components/Admin/DailyChart/DailyChart";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/adminSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const Logout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar Logout={Logout} />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Chart title="Monthly Revenue" aspect={2 / 1} />
          <WeeklyChart title="Weekly Revenue" aspect={2 / 1} />
        </div>
        <div className="charts">
          <YearlyChart title='Yearly Revenue' aspect={2 / 1} />
          <DailyChart title='Daily Revenue' aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
