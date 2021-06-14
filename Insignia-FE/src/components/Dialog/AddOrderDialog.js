/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { useQueryClient, useMutation } from "react-query";
import { useSnackbar } from "notistack";

const initialOrder = {
  invoiceNumber: "",
  email: "",
  paymentStatus: "",
  fulfillmentStatus: "",
  total: 0,
  createdAt: new Date(),
};

const AddOrderDialog = (props) => {
  const [order, setOrder] = useState(initialOrder);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    mutate(order);
    setOrder(initialOrder);
    handleClose();
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setOrder({ ...order, [name]: value });
  };

  const postOrderData = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    return data;
  };

  const { mutate, isLoading } = useMutation(postOrderData, {
    onSuccess: () => {
      queryClient.invalidateQueries("getAllData");
      enqueueSnackbar("Order Added", { variant: "success" });
    },
  });

  return (
    <div>
      <Tooltip title="Add">
        <Button
          color="primary"
          startIcon={<AddSharpIcon />}
          variant="contained"
          onClick={handleClickOpen}
        >
          ADD ORDERS
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Invoice Number"
            type="number"
            fullWidth
            value={order.invoiceNumber}
            onChange={handleChange("invoiceNumber")}
          />
          <TextField
            margin="dense"
            label="User Email"
            type="text"
            fullWidth
            value={order.email}
            onChange={handleChange("email")}
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="select-payment-status">Payment Status</InputLabel>
            <Select
              labelId="select-payment-status"
              id="demo-simple-select"
              fullWidth
              value={order.paymentStatus}
              onChange={handleChange("paymentStatus")}
            >
              <MenuItem value="UNPAID">UNPAID</MenuItem>
              <MenuItem value="FULLY PAID">FULLY PAID</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="select-fulfillment-status">
              Fulfillment Status
            </InputLabel>
            <Select
              labelId="select-fulfillment-status"
              id="demo-simple-select"
              fullWidth
              value={order.fulfillmentStatus}
              onChange={handleChange("fulfillmentStatus")}
            >
              <MenuItem value="UNFULFILLED">UNFULFILLED</MenuItem>
              <MenuItem value="FULFILLED">FULFILLED</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Total"
            type="number"
            fullWidth
            value={order.total}
            onChange={handleChange("total")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            startIcon={<SendSharpIcon />}
            onClick={handleAdd}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOrderDialog;
