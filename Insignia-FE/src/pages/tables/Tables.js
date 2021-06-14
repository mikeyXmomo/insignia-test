import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";
import moment from "moment";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Chip } from "@material-ui/core";
import AddOrderDialog from "../../components/Dialog/AddOrderDialog";

const columns = [
  {
    name: "invoiceNumber",
    label: "Invoice Number",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "createdAt",
    label: "Date",
    options: {
      filter: false,
      sort: true,
      searchable: false,
      customBodyRender: (value) => {
        return moment(value).fromNow();
      },
    },
  },
  {
    name: "email",
    label: "User",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: "fulfillmentStatus",
    label: "Fulfillment Status",
    options: {
      filter: false,
      sort: false,
      searchable: false,
      customBodyRender: (value) => {
        if (value === "FULFILLED") {
          return <Chip label={value} color="primary" />;
        } else {
          return <Chip label={value} color="secondary" />;
        }
      },
    },
  },
  {
    name: "paymentStatus",
    label: "Payment Status",
    options: {
      filter: true,
      sort: false,
      searchable: false,
      customBodyRender: (value) => {
        if (value === "FULLY PAID") {
          return <Chip label={value} color="primary" />;
        } else {
          return <Chip label={value} color="secondary" />;
        }
      },
    },
  },
  {
    name: "total",
    label: "Total Amount",
    options: {
      filter: false,
      sort: false,
      searchable: false,
      customBodyRender: (value) => {
        const nf = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });

        return nf.format(value);
      },
    },
  },
];

export default function Tables() {
  const getAllData = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/orders`, {
      method: "GET",
    });

    const data = await response.json();
    return data.data;
  };

  const { data } = useQuery("getAllData", getAllData);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <PageTitle title="Orders" />
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AddOrderDialog />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Order List"
            data={data}
            columns={columns}
            options={{
              filterType: "checkbox",
              print: "false",
              download: "false",
              viewColumns: "false",
              selectableRows: "none",
              searchPlaceholder: "Invoice number or User",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
