import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-2">Welcome to NextAuth !</h1>
      <p className="text-2xl  mb-8">A simple authentication app</p>
      <div className="flex space-x-4">
        <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        </Link>
        <Link href="/signup">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Signup
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;