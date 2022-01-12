import Sideabar from "./Sidebar/Sideabar";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { usePayments } from "../../redux/payment/selectors";
import { loadPayments } from "../../redux/payment/operation";
import MaterialTable from 'material-table'


export default function ViewPayments() {
    const dispatch = useDispatch();
    const payments = usePayments();

    const columns = [{ title: 'Amount', field: 'amount' }, { title: 'Sent by', field: 'send_channel' }, { title: 'Received', field: 'receive_channel' }, { title: 'Reason', field: 'reason' }]

    useEffect(() => {
        if (payments.length === 0) dispatch(loadPayments());
    }, [])
  return (
      <Sideabar active='/payments'>
          <div style={{padding: "10px"}}>
            <MaterialTable columns={columns} data={payments} title='Transfers' />
          </div>
      </Sideabar>
  );
}