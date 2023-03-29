import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

interface UserData {
  fullName: string;
  city: string;
  age: number;
  avatar: string;
  _id: string;
}

interface UsersData {
  count: number;
  users: UserData[];
}

const baseUrl: string = "http://localhost:3001";

function App() {
  const [data, setData] = useState<UsersData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${baseUrl}/user`);
      console.log(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <p>Downloading</p>
  ) : (
    <>
      {data?.users.map((user) => {
        return (
          <div key={user._id}>
            <p> {user.fullName}</p>
            <img src={user.avatar} alt="avatar"></img>
          </div>
        );
      })}
    </>
  );
}

export default App;
