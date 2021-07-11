import React from "react";
import { Table } from "semantic-ui-react";

const style = { cursor: 'pointer' };

export const HeaderCell = (props: { name: string, onClick: () => void }) =>
(<Table.HeaderCell >
    <a onClick={props.onClick} style={style}>
        {props.name}
    </a>
</Table.HeaderCell>)
