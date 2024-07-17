import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // 또는 sessionStorage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
      {/* 기타 프로필 정보 */}
    </div>
  );
};

export default Profile;
