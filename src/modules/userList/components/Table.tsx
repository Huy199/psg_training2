import * as React from "react";
import { IUsers } from "../../../models/users";

export interface Props {
  admins?: IUsers[];
}

export default function Table(props: Props) {
  const { admins } = props;
  console.log("admins: ", admins);
  return (
    <div style={{ height: "400px", width: "100%", marginTop: "16px" }}>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked />
            </th>
            <th scope="col">Login/Email</th>
            <th scope="col">Name</th>
            <th scope="col">Access level</th>
            <th scope="col">Products</th>
            <th scope="col">Order</th>
            <th scope="col">Wishlist</th>
            <th scope="col">Created</th>
            <th scope="col">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin: IUsers, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{admin.vendor}</td>
              <td>
                {admin.fistName} {admin.lastName}
              </td>
              <td>{admin.access_level}</td>
              <td>{admin.product}</td>
              <td>{admin?.order.order_as_buyer}</td>
              <td>{admin.wishlist}</td>
              <td>{admin.created}</td>
              <td>{admin.last_login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
