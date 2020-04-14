import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  table: {
    width: "auto",
    tableLayout: "auto"
  },
  rowCount: {
    width: "2rem",
    textAlign: "center",
    borderLeft: "0 !important",
    "& + *": {
      borderLeft: "0 !important"
    }
  },
  rowFocus: {
    backgroundColor: theme.palette.grey[100]
  },
  deleteRow: {
    width: "2rem",
    textAlign: "center",
    padding: 0,
    borderLeft: "0 !important"
  },
  inputCell: {
    padding: 0
  },
  input: {
    padding: theme.spacing(1.5),
    height: "100%",
    "& input": {
      padding: 0
    }
  },
  selectInput: {
    width: "100%",
    border: "0 !important",
    boxShadow: "none !important"
  },
  select: {
    padding: theme.spacing(1.5, 3, 1.5, 1.5),
    border: 0,
    height: "100%",
    width: "100%",
    display: "block"
  },
  selectMenu: {
    "& > ul": {
      padding: 0
    }
  }
}));

const InputCell = ({ colSpan = 1, ...props }) => {
  const classes = useStyles();
  return (
    <TableCell colSpan={colSpan} className={classes.inputCell}>
      <InputBase classes={{ root: classes.input }} {...props} />
    </TableCell>
  );
};
const SelectCell = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <TableCell className={classes.inputCell}>
      <Select
        className={classes.selectInput}
        classes={{ select: classes.select }}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          classes: {
            paper: classes.selectMenu
          }
        }}
        {...props}
      >
        {children}
      </Select>
    </TableCell>
  );
};

const List = ({ total = false }) => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([
    {
      buildingDescription: "30 Lake Road",
      internalArea: 200,
      inUse: "Yes",
      dateLastInUse: "12/08/1999"
    }
  ]);
  const [rowFocus, setRowFocus] = React.useState(null);

  const addRow = () => {
    setRows([
      ...rows,
      {
        buildingDescription: "45 River Way",
        internalArea: 470,
        inUse: "Yes",
        dateLastInUse: "12/08/2019"
      }
    ]);
  };
  const deleteRow = () => {
    const val = rows;
    val.pop();
    setRows([...val]);
  };
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow hover={false}>
            <TableCell className={classes.rowCount} />
            <TableCell>Building description</TableCell>
            <TableCell>
              Internal area in m<sup>2</sup>
            </TableCell>
            <TableCell>In use?</TableCell>
            <TableCell colSpan={2}>Date last in use?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow key={i} className={rowFocus === i && classes.rowFocus}>
                <TableCell className={classes.rowCount}>{i + 1}</TableCell>
                <InputCell
                  placeholder="Add another"
                  value={row.buildingDescription}
                  onFocus={() => setRowFocus(i)}
                  onBlur={() => setRowFocus(null)}
                />
                <InputCell
                  placeholder="Internal area"
                  value={row.internalArea}
                  onFocus={() => setRowFocus(i)}
                  onBlur={() => setRowFocus(null)}
                  endAdornment={
                    <span>
                      m<sup>2</sup>
                    </span>
                  }
                />
                <SelectCell
                  value={row.inUse}
                  onFocus={() => setRowFocus(i)}
                  onBlur={() => setRowFocus(null)}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </SelectCell>
                <InputCell
                  onFocus={() => setRowFocus(i)}
                  onBlur={() => setRowFocus(null)}
                  placeholder="dd / mm / yyyy"
                  value={row.dateLastInUse}
                />
                <TableCell className={classes.deleteRow}>
                  <IconButton size="small" onClick={() => deleteRow()}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow className={rowFocus === "new" && classes.rowFocus}>
            <TableCell className={classes.rowCount}>
              <Box color="#bbb">{rows.length + 1}</Box>
            </TableCell>
            <InputCell
              placeholder="Add another"
              onFocus={() => setRowFocus("new")}
              onBlur={() => setRowFocus(null)}
            />
            <InputCell
              placeholder="Internal area"
              onFocus={() => setRowFocus("new")}
              onBlur={() => setRowFocus(null)}
              endAdornment={
                <span>
                  m<sup>2</sup>
                </span>
              }
            />
            <SelectCell
              placeholder="Internal area"
              onFocus={() => setRowFocus("new")}
              onBlur={() => setRowFocus(null)}
            >
              <MenuItem value="y">Yes</MenuItem>
              <MenuItem value="n">No</MenuItem>
            </SelectCell>
            <InputCell
              colSpan={2}
              placeholder="dd / mm / yyyy"
              onFocus={() => setRowFocus("new")}
              onBlur={() => {
                setRowFocus(null);
                addRow();
              }}
            />
          </TableRow>
        </TableBody>
        {total && (
          <TableFooter>
            <TableRow hover={false}>
              <TableCell className={classes.rowCount} />
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                200 m<sup>2</sup>
              </TableCell>
              <TableCell />
              <TableCell colSpan={2} />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default List;
