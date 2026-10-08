import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const { userInfo } = useContext(AuthContext);

  return (
    <div>
      <h1>dashboard</h1>
      <h1>{userInfo?.name}</h1>
      <h1>{userInfo?.email}</h1>
      <h1>{userInfo?.photo}</h1>
      <h1>{userInfo?.created_at}</h1>
    </div>
  );
}
