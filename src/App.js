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
import TablePagination from '@mui/material/TablePagination';
function App() {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

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
  useEffect(() => {
    async function getData() {
      await axios
        .get("https://callsorputs.herokuapp.com/getData")
        .then((response) => {
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

  const mystyle = {
    color: "red",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };

  return (
    <>
      <h1>Hello React!</h1>
      <div>
        {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
        {loadingData ? (
          <p>Loading Please wait...</p>
        ) : (
          // <Table style={mystyle} columns={columns} data={data} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ width: "20px", height: "20px" }}
                  >
                    Description
                  </TableCell>
                  <TableCell align="right">.date_expiration</TableCell>
                  <TableCell align="right">date</TableCell>
                  <TableCell align="right">data</TableCell>
                  <TableCell align="right">underlying_type</TableCell>
                  <TableCell align="right">OPEN INTEREST</TableCell>
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
                  >
                    <TableCell component="th" scope="data">
                      {data.description}
                    </TableCell>

                    <TableCell align="right">{data.date_expiration}</TableCell>
                    <TableCell align="right">{data.date}</TableCell>
                    <TableCell align="right">{data.volume}</TableCell>
                    <TableCell align="right">{data.underlying_type}</TableCell>
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
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    </>
  );
}

export default App;
