import Link from 'next/link';
import Container from '@/components/Container';
import { useState } from 'react';
import fetcher from '@/lib/fetcher';
import useSWR, { mutate } from 'swr';

export default function Dashboard() {
  const { data: user } = useSWR('/api/user', fetcher);


  const newPost = async (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))

    let r = await fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    let res = await r.json();
    console.log(res)
    e.target.reset()
  }

  return (
    <Container
      title="Dashboard – Felix Koppe"
      description="My personal dashboard, built with Next.js API routes deployed as serverless functions."
    >
      <div className="flex flex-col justify-center items-start w-full max-w-2xl mx-auto mb-16 text-gray-600">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Admin
        </h1>

        {user?.name == "chwzr" ? (
          <>
            {user.name}
            <div className="mb-8 w-full">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              </p>
              <form onSubmit={newPost}>
                <input
                  name="id"
                  aria-label="ID"
                  type="text"
                  placeholder="ID (optional)"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4"
                />
                <input
                  name="title"
                  aria-label="Title"
                  type="text"
                  placeholder="Title"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4"
                />
                <textarea
                  name="summary"
                  aria-label="Summary"
                  type="text"
                  placeholder="Summary"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  name="category"
                  aria-label="Category"
                  type="text"
                  placeholder="Category"
                  list="cats"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 mb-4  focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />

                <datalist id="cats">
                  <option value="design">design</option>
                  <option value="dev">dev</option>
                  <option value="hack">hack</option>
                  <option value=""></option>
                </datalist>
                <input
                  name="url"
                  aria-label="URL"
                  type="text"
                  placeholder="URL"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />

                <textarea
                  name="content"
                  aria-label="Content"
                  type="text"
                  placeholder="Content"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full font-normal rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button className="flex text-white mt-8 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>

              </form>


            </div>
          </>
        ) : (
          <a
            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            href="/api/auth"
          >
            Login
          </a>
        )}



      </div>
    </Container>
  );
}
