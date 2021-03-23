import Link from 'next/link';
import useSWR from 'swr';
import format from 'comma-number';

import fetcher from '@/lib/fetcher';

const BlogPost = (props) => {
  const { title, summary, slug, category, type, url } = props
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;



  const countClick = async (e) => {
    // e.preventDefault();
    console.log("CLICK")
    let k = await fetch(`/api/views/${slug}`, {
      method: 'POST'
    });
    let o = await k.json()
    console.log(o)
  }

  if (type == 'link') {
    return (

      <a className="w-full" target="_blank" rel="noopener noreferrer" href={url} onClick={countClick}>
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-2 text-gray-900 dark:text-gray-100">
              <span className="sr-only">External Link</span>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
                </g>
              </svg>
              <h4 className="text-lg md:text-xl font-medium w-full text-gray-900 dark:text-gray-100">
                {title}
              </h4>
            </div>

            <p className="text-gray-500 text-left md:text-right w-64 mb-4 md:mb-0">
                {`${category ? category + ' • ' : ''} ${views ? format(views) : '–––'} clicks`} 
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-thin">{summary}</p>
        </div>
      </a>
    )
  }

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full">
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="text-gray-500 text-left md:text-right w-64 mb-4 md:mb-0">
              {`${category ? category + ' • ' : ''} ${views ? format(views) : '–––'} views`} 
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-thin">{summary}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
