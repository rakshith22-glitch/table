import React, { useMemo, useState, useEffect } from "react";
// import Table from "./Table";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
function App() {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    data: null,
    error: false,
    loading: true,
  });
  console.log(data);
  const columns = useMemo(() => [
    {
      Header: "DTE",
      accessor: "DTE",
    },
    {
      Header: "aggressor_ind",
      accessor: "aggressor_ind",
    },
    // {
    //   Header: "ask",
    //   accessor: "ask",
    // },
    // {
    //   Header: "bid",
    //   accessor: "bid",
    // },

    {
      Header: "chan_filter",
      accessor: "chan_filter",
    },
    {
      Header: "cost_basis",
      accessor: "cost_basis",
    },
    {
      Header: "date",
      accessor: "date",
    },
    {
      Header: "date_expiration",
      accessor: "date_expiration",
    },
    {
      Header: "description",
      accessor: "description",
    },
    // {
    //   Header: "fill",
    //   accessor: "fill",
    // },
    // {
    //   Header: "id",
    //   accessor: "id",
    // },
    {
      Header: "midpoint",
      accessor: "midpoint",
    },
    {
      Header: "open_interest",
      accessor: "open_interest",
    },
    {
      Header: "option_activity_type",
      accessor: "option_activity_type",
    },
    {
      Header: "option_symbol",
      accessor: "option_symbol",
    },
    {
      Header: "percent_move",
      accessor: "percent_move",
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "put_call",
      accessor: "put_call",
    },
    {
      Header: "sentiment",
      accessor: "sentiment",
    },
    {
      Header: "sentiment_flipped",
      accessor: "sentiment_flipped",
    },
    {
      Header: "size",
      accessor: "size",
    },
    {
      Header: "spot",
      accessor: "spot",
    },
    {
      Header: "strike_price",
      accessor: "strike_price",
    },
    {
      Header: "ticker",
      accessor: "ticker",
    },
    {
      Header: "time",
      accessor: "time",
    },
    {
      Header: "underlying_type",
      accessor: "underlying_type",
    },
    {
      Header: "trade_count",
      accessor: "trade_count",
    },
    {
      Header: "updated",
      accessor: "updated",
    },
    {
      Header: "volume",
      accessor: "volume",
    },
  ]);
  const url = "https://callsorputs.herokuapp.com/getData";
  useEffect(() => {
    async function getData() {
      await axios.get(url).then((response) => {
        // check if the data is populated
        console.log(response.data);
        setData(response.data.items);
        // you tell it that you had the result
        setLoadingData(false);
      });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      setState((state) => ({ data: state.data, error: false, loading: true }));
      axios
        .get(url)
        .then((data) => data.json())
        .then((obj) =>
          Object.keys(obj).map((key) => {
            let newData = obj[key];
            newData.key = key;
            return newData;
          })
        )
        .then((newData) =>
          setState({ data: newData, error: false, loading: false })
        )
        .catch(function (error) {
          console.log(error);
          setState({ data: null, error: true, loading: false });
        });
    }, 5000);

    return () => clearInterval(intervalId); //This is important
  }, [url, useState]);

  const mystyle = {
    color: "red",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  function GoldenSweeps() {
    let golden_sweeps = [];
    let individualElements = data.forEach((elements) => {
      if (elements.chan_filter === "GOLDEN") golden_sweeps.push(elements);
      console.log(golden_sweeps);
      setData(golden_sweeps);
    });
  }

  function allCalls() {
    let calls = [];
    let individualElements = data.forEach((elements) => {
      if (elements.put_call === "CALL") calls.push(elements);
      setData(calls);
    });
  }

  function allPuts() {
    let puts = [];
    let individualElements = data.forEach((elements) => {
      if (elements.put_call === "PUT") puts.push(elements);
      setData(puts);
    });
  }
  function Regular() {
    window.location.reload(false);
  }

  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    // 👇️ value of input field
    console.log("handleClick 👉️", message);
    let search_stocks = [];
    let individualElements = data.forEach((elements) => {
      if (elements.ticker === message) search_stocks.push(elements);
      setData(search_stocks);
    });
  };

  return (
    <>
      <div style={{ marginLeft: "40%", marginTop: "50px" }}>
        <Button
          style={{ backgroundColor: "gold", marginLeft: "20px" }}
          onClick={GoldenSweeps}
        >
          GOLDEN
        </Button>

        <Button
          style={{ backgroundColor: "lightblue", marginLeft: "20px" }}
          onClick={Regular}
        >
          ALL OPTIONS
        </Button>

        <Button
          style={{ backgroundColor: "orange", marginLeft: "20px" }}
          onClick={allPuts}
        >
          PUTS
        </Button>

        <Button
          style={{ backgroundColor: "lightgreen", marginLeft: "20px" }}
          onClick={allCalls}
        >
          CALLS
        </Button>

        <div>
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message}
            autoComplete="off"
          />
          <Button onClick={handleClick}>Search</Button>
        </div>
      </div>
      <div>
        {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
        {loadingData ? (
          <p>Loading Please wait...</p>
        ) : (
          // <Table style={mystyle} columns={columns} data={data} />
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              style={{
                marginTop: "100px",

                fontSize: "10px",
              }}
            >
              <TableHead
                style={{
                  backgroundColor: "gray",
                }}
              >
                <TableRow>
                  <TableCell style={{ width: "50px" }} align="left">
                    Description
                  </TableCell>
                  <TableCell align="right">DATE_EXP</TableCell>
                  <TableCell align="right">DATE</TableCell>
                  {/* <TableCell align="right">data</TableCell> */}
                  <TableCell align="right">TICKER</TableCell>
                  <TableCell align="right">INTEREST</TableCell>
                  <TableCell align="right">size</TableCell>
                  <TableCell align="right">spot</TableCell>
                  <TableCell align="right">FILTER</TableCell>
                  <TableCell align="right">put_call</TableCell>
                  <TableCell align="right">sentiment</TableCell>
                  <TableCell align="right">price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => (
                  <TableRow
                    key={data.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={
                      data.chan_filter === "GOLDEN"
                        ? { backgroundColor: "gold" }
                        : {}
                    }
                  >
                    <TableCell component="th" scope="data">
                      {data.description}
                    </TableCell>

                    <TableCell align="right">{data.date_expiration}</TableCell>
                    <TableCell align="right">{data.date}</TableCell>
                    <TableCell align="right">{data.volume}</TableCell>
                    {/* <TableCell align="right">{data.tocker}</TableCell> */}
                    <TableCell align="right">{data.open_interest}</TableCell>
                    <TableCell align="right">{data.size}</TableCell>
                    <TableCell align="right">{data.spot}</TableCell>
                    <TableCell align="right">{data.chan_filter}</TableCell>
                    <TableCell align="right">{data.put_call}</TableCell>
                    <TableCell align="right">{data.sentiment}</TableCell>
                    <TableCell align="right">{data.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          //   <TablePagination
          //   rowsPerPageOptions={[5, 10, 25]}
          //   component="div"
          //   count={data.length}
          //   rowsPerPage={rowsPerPage}
          //   page={page}
          //   onPageChange={handleChangePage}
          //   onRowsPerPageChange={handleChangeRowsPerPage}
          // />
        )}
      </div>
    </>
  );
}

export default App;
