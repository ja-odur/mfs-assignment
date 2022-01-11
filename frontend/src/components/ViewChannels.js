import Sideabar from "./Sidebar/Sideabar";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {useChannels } from "../../redux/channel/selectors";
import {loadChannels} from "../../redux/channel/operation";
import {loadAllChannels} from "../../redux/channel/operation";
import MaterialTable from 'material-table'


export default function ViewChannels() {
    const dispatch = useDispatch();
    const channels = useChannels();

    const columns = [{ title: 'Type', field: 'type' }, { title: 'Name', field: 'name' }, { title: 'Amount', field: 'amount' }, { title: 'Currency', field: 'currency' }]

    useEffect(() => {
        if (channels.length === 0) {
            dispatch(loadChannels());
            dispatch(loadAllChannels());
        };
    }, [])
  return (
      <Sideabar active='/channels'>
          <div style={{padding: "10px"}}>
           <MaterialTable columns={columns} data={channels} title='Payment Channels' />
          </div>
      </Sideabar>
  );
}