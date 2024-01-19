import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../../api/api';
import { RegisterState } from '@/interface/interface';

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<RegisterState | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Set the auth token from localStorage
        const token = localStorage.getItem('authToken');
        setAuthToken(token);

        // Make a request to fetch the user profile by ID
        const response = await axiosInstance.get(`/users/${id}`);
        setUserProfile(response.data);
      } catch (error) {
        // Handle error, e.g., redirect to login if unauthorized
        console.error('Error fetching user profile:', error);
        window.location.href = `/auth/login`;
      }
    };

    fetchUserProfile();
  }, [id]); // Only re-run the effect if id changes

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <section className='h-full w-full flex justify-center items-center'>
      {userProfile.firstName}
    </section>
  );
}
