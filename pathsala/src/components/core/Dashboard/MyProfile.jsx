import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white bg-gray-800 p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={`${user?.image}`}
          alt={`${user?.firstName}`}
          className="aspect-square w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{user?.firstName + " " + user?.lastName}</p>
          <p>{user?.email}</p>
        </div>
      </div>

      <IconBtn
        text="Edit Profile"
        icon="edit"
        onClick={() => navigate('/dashboard/settings')}
      />

      <div className="mt-8">
        <div className="mb-4">
          <p className="text-xl font-semibold">About</p>
          <IconBtn text="Edit" onClick={() => navigate("/dashboard/settings")} />
        </div>
        <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
      </div>

      <div className="mt-8">
        <div className="mb-4">
          <p className="text-xl font-semibold">Personal Details</p>
          <IconBtn text="Edit" onClick={() => navigate("/dashboard/settings")} />
        </div>

        <div className="grid grid-cols-2 gap-10 w-[700px]">
          <div>
            <p className="font-semibold">First Name</p>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <p className="font-semibold">Last Name</p>
            <p>{user?.lastName}</p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone Number</p>
            <p>{user?.additionalDetails?.contactNumber ?? "Add Phone Number"}</p>
          </div>
          <div>
            <p className="font-semibold">Gender</p>
            <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
